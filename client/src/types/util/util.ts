// export type Id = string;
export type Id = number;
export type NoId<T extends {id: G}, G = any> = Omit<T, 'id'>;

export interface ID {
  id: Id;
}

export type IdContext = ID;

type Category = { display: string, value: string };
export interface Categorizable {
  category: Category;
  class: string;
}


export enum Resource {
  Material = 'Material',
  Process = 'Process',
  Product = 'Product'
}

export const ResourceSelectOptions = [
  {
    value: Resource.Material,
    display: 'Material'
  },
  {
    value: Resource.Process,
    display: 'Process'
  },
  {
    value: Resource.Product,
    display: 'Product'
  },
];

export interface ResourceStub<R extends Resource> extends Partial<Categorizable> {
  title: string;
  resource: Resource;
  multiple: boolean;
}


type Cons<H, T extends readonly any[]> = H extends any ? T extends any ?
    ((h: H, ...t: T) => void) extends ((...r: infer R) => void) ? R : never : never : never;
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
// illegally recursive, use at your own risk
type UnionToAllPossibleTuples<T, U = T, N extends number = 15> = T extends any ?
    Cons<T, Exclude<U, T> extends infer X ? {
        0: [], 1: UnionToAllPossibleTuples<X, X, Prev[N]>
    }[[X] extends [never] ? 0 : 1] : never> :
    never;

export type AllKeysOf<T> = UnionToAllPossibleTuples<T>;
