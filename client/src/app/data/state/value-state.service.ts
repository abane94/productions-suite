import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Id, ID, NoId } from 'src/types/util/util';
import { IGenericData } from '../base-classes/generic-data.type';

// interface IUnitStateService<T extends { id: Id }, G = null> {
//   constructor(data: IGenericData<T, G>);
//   value?: T | NoId<T>;  // This should be a behavior subject I think
//   clear();  // clears the value;
//   get(context: ListContext<T>);
//   save();
//   delete();
//   isNew(): boolean;
// }

@Injectable()
export class ValueStateService<T extends ID> {
  protected data: IGenericData<T, Partial<T>>
  public value?: T;
  protected isNew: boolean = false; // TODO is there a reason this was null?
  protected original?: T;

  //#region Events
  private _handleClear: Subject<null> = new Subject();
  public get onClear(): Observable<null> {
      return this._handleClear.asObservable();
  }

  private _handleSet: Subject<T | undefined> = new Subject();
  public get onSet(): Observable<T | undefined> {
      return this._handleSet.asObservable();
  }

  private _handleLoad: Subject<T> = new Subject();
  public get onLoad(): Observable<T> {
      return this._handleLoad.asObservable();
  }

  private _handleSave: Subject<T | undefined> = new Subject();
  public get onSave(): Observable<T | undefined> {
      return this._handleSave.asObservable();
  }

  private _handleDelete: Subject<ValueStateService<T>> = new Subject();  // onDelete is of type 'this' so the list state can compare to remove
  public get onDelete(): Observable<ValueStateService<T>> {
      return this._handleDelete.asObservable();
  }
  //#endregion

  constructor() { }

  // TODO: is this right, could copy generic vs non patter of list state...
  setData(data: IGenericData<T, Partial<T>>) {
    this.data = data;
  }

  private _set(v: T | undefined) {
    this.value = v;
    this.original = Object.assign({}, v);  // TODO: deep copy
    this._handleSet.next(this.value);
  }

  // public set triggers the observable, private does not
  set(v: T) {  // the only reason this is not private is so that, the list state can set the value instead of having each on reload itself
    this._set(v);
    this._handleSet.next(this.value);
  }

  // TODO: if clear is not needed, value and original should not be optional, this will remove the need to ?. in several places
  clear() {
    this.value = undefined;
    this.original = undefined;
    this._handleClear.next(null);
  }

  load(context: Id | Partial<T>) {
    // TODO: should this throw an error if there are unsaved changes??
    // TODO: how to differentiate id vs partial object, what if Id is an Object like mongo OId?
    const obs = this.data.getOne({id: (context as Id)}).subscribe({
      next: x => this._set(x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        // this._handleLoad.next(this.value); // this is done in _set which is called from the next handler
        obs.unsubscribe();
      },
    });
  }

  save(): Observable<Id> {
    let obs: Observable<T>;
    let sub: Subscription;
    if (this.isNew) {
      if (!this.value) {
        const e = 'trying to save new null value';
        console.error(e);
        throw new Error(e)
      }
      obs = this.data.add(this.value);
      sub = obs.subscribe({
        next: x => { this._set(x); this.isNew = false; },
        error: err => console.error('Observer got an error: ' + err),
        complete: () => {
          this._handleSave.next(this.value);
          sub.unsubscribe();
        },
      });
    } else {
      if (!this.value) {
        const e = 'trying to save null value';
        console.error(e);
        throw new Error(e)
      }
      // TODO: is this optimization needed?
      const diff: Partial<T> & ID = { id: (this.value.id as Id) } as any; // this needs to be the new ID, in case there is some sort of copy things going on
      // need fields from both original and current in case fields have been added/removed
      const fields = new Set([...Object.keys(this.original || {}), ...Object.keys(this.value)]);
      for (const field of (Object.keys(this.value)) as Array<keyof T>) {
        diff[field] = this.value[field];  // TODO: make sure that nulling out removed fields will remove them in the db
      }
      diff['id'] = this.value.id;  // this needs to be the new ID, in case there is some sort of copy things going on
      obs = this.data.update(diff);
      sub = obs.subscribe({
        next: x => { this._set(x); this.isNew = false; },
        error: err => console.error('Observer got an error: ' + err),
        complete: () => {
          this._handleSave.next(this.value);
          sub.unsubscribe();
        },
      })
    }
    return obs.pipe(
      map(x => x.id)
    );
  }

  delete(): Observable<Id> {
    if (!this.value) {
      const e = 'trying to delete null value';
      console.error(e);
      throw new Error(e)
    }
    const obs = this.data.delete(this.value);
    const sub = obs.subscribe({
      next: x => { this._set(undefined); this.isNew = true; },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        this._handleDelete.next(this);
        sub.unsubscribe()
      },
    });

    return obs.pipe(
      map(x => x.id)
    );
  }
}
