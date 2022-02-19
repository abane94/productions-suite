import { Observable } from "rxjs";
import { ListContext } from "src/types/context.types";
import { ID, IdContext, NoId } from "src/types/util/util";

export interface ListResult<T> {
  items: T[];
  total: number;
}

export interface IGenericData<T extends ID, /** Type that describes the object needed to select one item*/G = Partial<T> >{  // would 'never' work instead of null? maybe undefined?
  get(context?: ListContext<T>): Observable<ListResult<T>>;
  getOne(context: T | IdContext | G): Observable<T>;
  add(item: NoId<T>): Observable<T>
  update(item: Partial<T> & ID): Observable<T>;
  delete(item: T): Observable<T>;
}
