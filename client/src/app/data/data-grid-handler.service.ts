import { EventEmitter, Injectable, Output } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subject } from 'rxjs';
import { GenericStore } from './base-classes/generic-store';

@Injectable({
  providedIn: 'root'
})
export class DataGridHandlerService<T extends {id: number}> {

  private store: GenericStore<T>;
  loading = true;
  total: number;

  private onItemsSource = new Subject<T[]>();
  onItems$ = this.onItemsSource.asObservable()


  setStore(store: GenericStore<T>) {
    this.store = store;
  }

  refresh(state: ClrDatagridStateInterface) {
    console.log(state);

    // TODO this might be redundant, since I could listen to the item observable once, and let that feed onItems$ (ore replace it entirely)
    this.store.filter(state).subscribe(
      result => {
        this.onItemsSource.next(result.items);
        this.total = result.total;
        this.loading = false;
      },
      err => console.log("Error retrieving Items")
    );
  }
}
