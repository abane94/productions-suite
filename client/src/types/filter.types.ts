
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


// TODO: move to common location that is not a types file

export function applyFilter<T>(items: T[], filter: Filter<T>): T[] {
    switch(filter.filter) {
        case 'FIELD_GT':
            return items.filter(el => (el[filter.field] as any as string | number) > filter.greaterThan);
            break;
        case 'FIELD_GTE':
            return items.filter(el => (el[filter.field] as any as string | number) >= filter.greaterThanEqual);
        case 'FIELD_LT':
            return items.filter(el => (el[filter.field] as any as string | number) < filter.lessThan);
        case 'FIELD_LTE':
            return items.filter(el => (el[filter.field] as any as string | number) <= filter.lessThanEqual);
        case 'FIELD_EQ':
            return items.filter(el => (el[filter.field] as any as string | number) === filter.equals);
        case 'FIELD_INCL':
            return items.filter(el => ((el[filter.field] as any).toString()).includes(filter.incl));
        case 'FIELD_EXCL':
            return items.filter(el => !((el[filter.field] as any).toString()).includes(filter.excl));
        case 'INCL':
            return items.filter(el => {
                const fields = Object.keys(el as any).filter(field => typeof ((el as any)[field]) === 'string');
                return fields.some(field => field.includes(filter.incl));
            });
            break;
        case 'EXCL':
            return items.filter(el => {
                const fields = Object.keys(el as any).filter(field => typeof (el as any)[field] === 'string');
                return !fields.some(field => field.includes(filter.excl));
            });
        default:
          console.log(`Filter of type ${filter['filter']} is not supported`);
          return [];
      }
}
