import { Observable } from "rxjs";
import { ListContext } from "src/types/context.types";
import { ID, NoId } from "src/types/util/util";
import { IGenericData, ListResult } from "./generic-data.type";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";


export abstract class GenericDataService<T extends ID> implements IGenericData<T, Partial<T>> {
  /** the remote url for the model, NOTE: should not end with a slash!! */
  abstract url: string;

  constructor(protected http: HttpClient) { }

  get(context?: ListContext<T>): Observable<ListResult<T>> {
    const url = context ? `${this.url}?${queryParams(context)}` : this.url;
    return this.http.get<ListResult<T>>(url);
  }
  getOne(context: T | ID | Partial<T>): Observable<T> {
    // throw new Error("Method not implemented.");
    if (context.id) {
      return this.http.get<T>(`${this.url}/${context.id}`);
    } else {
      const url = `${this.url}?${queryParams(context)}`;
      return this.http.get<ListResult<T>>(url).pipe(
        map(x => x.items[0])
      );
    }
  }
  add(item: NoId<T, any>): Observable<T> {
    return this.http.post<T>(this.url, item);
  }
  update(item: Partial<T> & ID): Observable<T> {
    return this.http.patch<T>(`${this.url}/${item.id}`, item);
  }
  delete(item: T): Observable<T> {
    return this.http.delete<T>(`${this.url}/${item.id}`);
  }

}


// TODO: move to common location

// does not maintain order
function queryParams(o: object, prefix = ''): string {
  // let flat = {};

  const params = new URLSearchParams([['context', JSON.stringify(o)]]);
  return params.toString();


  let flat = [];
  const objStrings = [];
  for (const field of (Object.keys(o)) || []) {
    const val = (o as any)[field];
    switch (typeof val) {
      case 'bigint':
      case 'symbol':
       flat.push([prefix + field, val.toString()]);
        break;
      case 'boolean':
        if (val) {
          flat.push(field);  // use the field with out the value, only present if true
        }
      case 'number':
        flat.push([prefix + field, val]);
        break;
      case 'string':
        flat.push([prefix + field, val]);
        break;
      case 'object':
        objStrings.push(queryParams(val, `${field}.`));
        break;
      case 'undefined':
        flat.push([prefix + field, null]);
    }
  }

  let str = new URLSearchParams(flat).toString();

  return [str, ...objStrings].join('&');
}
