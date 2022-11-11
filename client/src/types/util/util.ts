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
