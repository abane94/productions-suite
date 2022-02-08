import { ClrDatagridComparatorInterface } from "@clr/angular";
import { Filter } from "./filter.types";


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
