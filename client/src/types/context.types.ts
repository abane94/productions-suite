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
        from?: number;
        to?: number;
        size?: number;
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

export function applyContext<T extends ID, G = null>(items: T[], context: ListContext<T>): ListResult<T> {
    let resultList = [];
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
                        return a[field] - b[field]
                    });
                    break;
                default:
                    resultList = resultList.sort((a, b) => {
                        return b[field] - a[field]
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
        // TODO: not sure what current means, it comes from clarity grid state interface
        const from = context.page.from || 0;
        const to = context.page.to || from + context.page.size || 0;

        resultList = resultList.slice(from, to);
    }

    return {items: resultList, total};
}


export function applySingleContext<T>(items: T[], context: Partial<T>) {
    const results =  items.filter(el => {
        const fields = Object.keys(context);
        return fields.every(field => el[field] === context[field]);
    });
    return results.length ? results[0] : null;
}
