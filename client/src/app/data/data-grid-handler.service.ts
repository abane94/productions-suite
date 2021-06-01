import { EventEmitter, Injectable, Output } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subject } from 'rxjs';
import { GenericDataService } from './generic-data-service';

@Injectable({
  providedIn: 'root'
})
export class DataGridHandlerService<T extends {id: number}> {

  private service: GenericDataService<T>;
  loading = true;
  total: number;

  private onItemsSource = new Subject<T[]>();
  onItems$ = this.onItemsSource.asObservable()


  setService(service: GenericDataService<T>) {
    this.service = service;
  }

  refresh(state: ClrDatagridStateInterface) {
    console.log(state);
    this.service.get(state).then(result => {
      this.onItemsSource.next(result.items);
      this.total = result.total;
      this.loading = false;
    });
  }
}
