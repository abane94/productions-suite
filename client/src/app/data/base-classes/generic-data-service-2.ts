import { ClrDatagridStateInterface, ClrDatagridComparatorInterface } from "@clr/angular";
import {Observable, of} from "rxjs";

interface IdContext {
    id: number;
}

interface SortOption<T> {
    field: keyof T;
    direction: 'ace' | 'ACE' | 'dec' | 'DEC' | 1 | -1;
}

interface ListContext<T> {
    page?: {
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
    filters?: any[]
}


// TODO: is there a way to do an option generic argument, or accept a list of generic types like a rest operator????
interface IGenericDataService<T extends {id: number}, G=null> {  // would never work instead of null? maybe undefined?
    get: (context: ListContext<T>) => Observable<{items: T[], total: number}>;
    getOne: (context: T | IdContext | G) => Observable<T>;
    add(item: Omit<T, 'id'>): Observable<T>
    update(T): Observable<T>;
    delete(T): Observable<T>;
}


export abstract class GenericDataService<T extends {id: number}, G=null> implements IGenericDataService<T, G> {
    abstract items: T[] = [];

    constructor() { }

    // returns the items with filters/sorting/paging applied, and the total that fit the criteria
    get(state?: ListContext<T>): Observable<{items: T[], total: number}> {
        if (!state) {
            return of({items: this.items, total: this.items.length});  // TODO: should probably be some default page size
          }
          let itemList =  this.items;
          if (state.filters) {
            itemList = itemList.filter(m => {
            state.filters.every(f => ('' + m[f.property]).toLocaleLowerCase().indexOf(('' + f.value).toLowerCase()) > -1)
            });
          }
          if (state.sort) {
            itemList = itemList.sort((m1, m2) => state.sort.reverse ? (m1[state.sort.by.toString()] - m2[state.sort.by.toString()]) : (m2[state.sort.by.toString()] - m1[state.sort.by.toString()]))
          }
          const total = itemList.length;
          if (state.page) {
            itemList = itemList.slice(state.page.from, state.page.to + 1);
          }

          return of({items: itemList, total});
    }

    getOne(context: T | IdContext | G) {
        if (context.hasOwnProperty('id')) {
            let id = (context as T | IdContext).id;
            return of(this.items.find(i => i.id === id));
        }
        throw Error('Generic find criteria not yet implemented');
    }

    add(item: T) {
        if (item.id) {
            console.error('Adding item that already has ID');
        } else {
            item.id = this.items.length;
            this.items.push(item);
        }
        return of(item);
    }

    update(item: T) {
      const idx = this.items.findIndex(i => i.id === item.id);
      this.items[idx] = item;
      return of(item);
    }

    delete(item: T) {
        const idx = this.items.findIndex(i => i.id === item.id);
        // const item = this.items[idx];
        if (idx > -1) {
            this.items.splice(idx, 1);
        }
        return of(item);
    }
}
