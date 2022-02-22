import { ClrDatagridComparatorInterface } from "@clr/angular";
import { ListResult } from "src/app/data/base-classes/generic-data.type";
import { applyFilter, Filter } from "./filter.types";
import { ID } from "./util/util";


export interface SortOption<T> {
    field: keyof T;
    direction: 'ace' | 'ACE' | 'dec' | 'DEC' | 1 | -1;
}

export interface ListContext<T> {  // TODO: does this need to be list specific, what would differentiate from UnitContext?
    page?: {  // can page be used for 'count' & 'skip'?  TODO: maybe rework page, or is this copied from a Clarity interface?
        /** Index of the first element */
        from?: number;
        /** index of the last element. Should = from + size */
        to?: number;
        /** Page size Should = to - from */
        size?: number;
        /** Current Page */
        current?: number;
    };
    sort?: {
        by: string | SortOption<T>;  // | ClrDatagridComparatorInterface<T>
        reverse?: boolean;
    } | {
        by: string | ClrDatagridComparatorInterface<T>;
        reverse: boolean;
    }
    filters?: Filter<T>[]
}


// TODO: move to common location that is not a types file

export function applyContext<T extends ID, G = null>(items: T[], context?: ListContext<T>): ListResult<T> {
    if (!context) { return { items, total: items.length } }
    let resultList = [...items];
    for (const filter of context.filters || []) {
        resultList = applyFilter(items, filter);
    }

    if (context.sort) {
        const by = context.sort.by;
        if ((by as ClrDatagridComparatorInterface<T>).compare) {
            // this is the ClrDatagridComparator
            resultList = resultList.sort((by as ClrDatagridComparatorInterface<T>).compare);
        } else if (typeof by === 'string') {
            resultList = resultList.sort((a, b) => {
                return b[by] - a[by]
            });
        } else {
            const field = (by as SortOption<T>).field;
            const direction = (by as SortOption<T>).direction;
            switch(direction) {
                case 'dec':
                case 'DEC':
                case -1:
                    resultList = resultList.sort((a, b) => {
                        return compare(a, b, field);
                    });
                    break;
                default:
                    resultList = resultList.sort((a, b) => {
                        return compare(b, a, field);
                    });
                    break;
            }
        }

        if (context.sort.reverse) {
            resultList = resultList.reverse();
        }
    }


    const total = resultList.length;

    if (context.page) {
        const from = context.page.from || 0;
        let to = (context.page.to || from + context.page.size || 0) + 1;
        to = (to > resultList.length) ? undefined : to;
        resultList = resultList.slice(from, to);
    }

    return {items: resultList, total};
}

function compare<T>(a: T, b: T, f: keyof T) {
    const field: string = f as string;
    if (typeof a[field] === 'number' && typeof b[field] === 'number') {
        return a[field] - b[field];
    }
    if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return (a[field] as string).localeCompare(b[field]);
    }
    return (a[field] as number) - (b[field] as number);
}


export function applySingleContext<T>(items: T[], context: Partial<T>) {
    const results =  items.filter(el => {
        const fields = Object.keys(context);
        return fields.every(field => el[field] === context[field]);
    });
    return results.length ? results[0] : null;
}
