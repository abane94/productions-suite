import { Injectable } from '@angular/core';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { ListContext, SortOption } from 'src/types/context.types';
import { Filter } from 'src/types/filter.types';
import { Id, ID, NoId } from 'src/types/util/util';
import { IGenericData } from '../base-classes/generic-data.type';
import { ValueStateService } from './value-state.service';

interface IListStateService<T extends { id: Id }, G = null> {
  constructor(data: IGenericData<T, G>);
  value?: T[] | NoId<T>[];  // This should be a behavior subject I think
  clear();  // clears the value;
  sort(context: SortOption<T> | null);  // null clears the sort??
  filter(context: Filter<T>): number;  // returns the idx of the filter added
  removeFilter(idx: number);
  // reorderFilters(idxs: number[]);
  save(idx: number);
  getContext(): ListContext<T>
  delete(idx: number): Id;
}

export abstract class GenericListStateService<T extends ID> {
  protected data: IGenericData<T, Partial<T>>
  public value: ValueStateService<T>[] = [];
  public total = 0;
  public pageSize = 10;

  public sort: ListContext<T>['sort'];
  public filters: ListContext<T>['filters'] = [];
  public page: ListContext<T>['page'];  // TODO: helper functions to manipulate pages?

  private subs: Subscription[] = [];

  //#region Events
  private _handleClear: Subject<null> = new Subject();
  public get onClear(): Observable<null> {
      return this._handleClear.asObservable();
  }

  private _handleNewData: Subject<null> = new Subject();
  public get onNewData(): Observable<null> {
      return this._handleNewData.asObservable();
  }

  private _handleDelete: Subject<null> = new Subject();
  public get onDelete(): Observable<null> {
      return this._handleDelete.asObservable();
  }
  //#endregion

  constructor() { }

  get context(): ListContext<T> {
    return {
      sort: this.sort,
      page: this.page,
      filters: this.filters
    };
  }

  get numPages(): number {
    return this.total / this.pageSize;
  }

  clear() {
    this.value = []; // TODO: should this be an empty list or null?
  }

  private clearSubs() {
    while(this.subs.length) {
      this.subs.pop().unsubscribe();
    }
  }

  private initStateElement(item: Partial<T>) {
    const state = new ValueStateService<T>();
      state.setData(this.data);
      state.set(item as T);
      this.subs.push(state.onDelete.subscribe({
        next: x => console.log('Element deleted'),  // TODO: remove from list
      }));
      return state;
  }

  private setList(list: T[]) {
    this.clear();
    this.clearSubs();
    for (const item of list) {
      const state = this.initStateElement(item);
      this.value.push(state);
    }
  }

  private retrieveData() {
    const obs = this.data.get(this.context);
    const sub = obs.subscribe({
      next: x => {
        this.setList(x.items);
        this.total = x.total;
      },
      error: e => console.error(e),
      complete: () => {
        this._handleNewData.next();
        sub.unsubscribe();
      }
    });

    return obs;
  }


  setSort(context: ListContext<T>['sort'] | null) {
    this.sort = context;
    this.retrieveData();
  }

  addFilter(context: Filter<T>) {
    this.filters.push(context);
    this.retrieveData();
  }

  removeFilter(idx: number) {
    this.filters.splice(idx, 1);
    this.retrieveData();
  }

  setContext(c: ListContext<T>) {
    if (c.page?.size) {
      this.pageSize = c.page.size;
    }
    this.page = c.page;
    this.filters = c.filters || [];
    this.sort = c.sort;
    return this.retrieveData();
  }

  // save(idx) {

  // }

  add(el: Partial<T>) {
    const state = this.initStateElement(el);
    this.value.push(state);
    return state;
  }

  //#region Page operations
  setPageSize(n: number) {
    this.pageSize = n;
  }

  get hasNextPage() {
    return (this.page.current < (this.numPages + 1));
  }

  get hasPrevPage() {
    return this.page.current > 1;
  }

  nextPage() {
    if (this.hasNextPage) {
      const page = this.page.current - 1 + 1;  // 0 indexed, next
      this.page = {
        from: page * this.pageSize,
        to: page * this.pageSize + this.pageSize,
        size: this.pageSize,
        current: page + 1  // 1 idx
      }
    }
    this.retrieveData();
  }

  prevPage() {
    if (this.hasPrevPage) {
      const page = this.page.current - 1 - 1;  // 0 indexed, prev
      this.page = {
        from: page * this.pageSize,
        to: page * this.pageSize + this.pageSize,
        size: this.pageSize,
        current: page + 1  // 1 idx
      }
    }
    this.retrieveData();
  }

  goToPage(/** 1 indexed */n: number) {
    if (n = this.page.current) { return; }
    if (n < 0 && n <= this.numPages) {
      const page = n - 1;  // 0 indexed
      this.page = {
        from: page * this.pageSize,
        to: page * this.pageSize + this.pageSize,
        size: this.pageSize,
        current: n
      }
    }
    this.retrieveData();
  }
  //#endregion
}

@Injectable({
  providedIn: 'any'  // TODO: thismight not be what I want, this cant be a singleton, and it needs to be able to have multiple names versions injected
})
export class ListStateService<T extends ID> extends GenericListStateService<T> {
  setData(data: IGenericData<T, Partial<T>>) {
    this.data = data;
  }
}

// @Injectable()
// export class CustomerListStateService<T extends ID> extends GenericListStateService<T> {
//   constructor(protected data: CustomerDataService) {
//     super();
//   }
// }
