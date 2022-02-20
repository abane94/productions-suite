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
  protected value: ValueStateService<T>[];
  protected total = 0;
  protected pageSize = 10;

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

  private setList(list: T[]) {
    // this.clear();\
    this.clearSubs();
    for (const item of list) {
      const state = new ValueStateService<T>();
      // set the state's data store ??
      state.set(item);
      this.subs.push(state.onDelete.subscribe({
        next: x => console.log('Element deleted'),  // TODO: remove from list
      }));
      this.value.push(state);
    }
  }

  private retrieveData() {
    const sub = this.data.get(this.context).subscribe({
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

  // save(idx) {

  // }

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

@Injectable()
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
