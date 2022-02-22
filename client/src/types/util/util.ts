// export type Id = string;
export type Id = number;
export type NoId<T extends {id: G}, G = any> = Omit<T, 'id'>;

export interface ID {
  id: Id;
}

export type IdContext = ID;
