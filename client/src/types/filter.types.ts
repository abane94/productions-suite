
interface _Filter {
    filter: 'FIELD_GT'
    | 'FIELD_GTE'
    | 'FIELD_LT'
    | 'FIELD_LTE'
    | 'FIELD_EQ'
    | 'FIELD_INCL'
    | 'FIELD_EXCL'
    | 'INCL'
    | 'EXCL';
}
interface IncludeFilter extends _Filter {
    incl: string;
    filter: 'INCL';
}
interface ExcludeFilter extends _Filter {
    excl: string;
    filter: 'EXCL';
}

type Field<T> = {
    field: keyof T;
}

interface FieldGreaterThan<T> extends _Filter, Field<T> {
    filter: 'FIELD_GT';
    greaterThan: number | string;
}
interface FieldGreaterEqualThan<T> extends _Filter, Field<T> {
    filter: 'FIELD_GTE';
    greaterThanEqual: number | string;
}
interface FieldLessThan<T> extends _Filter, Field<T> {
    filter: 'FIELD_LT';
    lessThan: number | string;
}
interface FieldLessEqualThan<T> extends _Filter, Field<T> {
    filter: 'FIELD_LTE';
    lessThanEqual: number | string;
}
interface FieldEqual<T> extends _Filter, Field<T> {
    filter: 'FIELD_EQ';
    equals: number | string | boolean;
}
interface FieldIncludeFilter<T> extends Field<T>, _Filter {
    filter: 'FIELD_INCL';
    incl: string;
}
interface FieldExcludeFilter<T> extends Field<T>, _Filter {
    filter: 'FIELD_EXCL';
    excl: string;
}


export type Filter<T> = IncludeFilter
    | ExcludeFilter
    | FieldGreaterThan<T>
    | FieldGreaterEqualThan<T>
    | FieldLessThan<T>
    | FieldLessEqualThan<T>
    | FieldEqual<T>
    | FieldIncludeFilter<T>
    | FieldExcludeFilter<T>
