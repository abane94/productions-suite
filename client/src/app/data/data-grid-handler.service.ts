import { EventEmitter, Injectable, Output } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Subject, Subscription } from 'rxjs';
import { ID } from 'src/types/util/util';
import { ListStateService } from './state/list-state.service';

@Injectable({
  providedIn: 'root',
})
export class DataGridHandlerService<T extends ID> {

  private state: ListStateService<T>;
  loading = true;
  total: number;

  private newDataSubscription: Subscription;

  private onItemsSource = new Subject<T[]>();
  onItems$ = this.onItemsSource.asObservable()


  /** DEPRECATED */
  setStore(state: ListStateService<T>) {
    this.state = state;
  }

  setState(state: ListStateService<T>) {
    this.state = state;
    this.newDataSubscription?.unsubscribe();
    this.newDataSubscription = this.state.onNewData.subscribe({
      next: x => {
        this.total = this.state.total;
        this.loading = false;
      }
    });
  }

  refresh(state: ClrDatagridStateInterface) {
    console.log(state);

    this.loading = true;
    this.state.setContext(state);
  }

  onSave($event: T) {
    console.log('Saved!');
    console.log($event);
    // TODO: this could break down if there are more than one new items in the list (items without ids)
    const idx = this.state.value.findIndex(singleState => singleState.value?.id === $event.id);
    if (idx === -1) {
      console.log('Save idx not found');
    } else {
      this.state.value[idx].set($event);
      this.state.value[idx]?.save();
    }
  }
}
