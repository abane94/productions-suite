import { Injectable } from '@angular/core';
import { Customer, CustomerContact } from 'src/types/customers.types';
import { CustomerService } from '../services/customer.service';
import { GenericStore } from '../base-classes/generic-store';

@Injectable({
  providedIn: 'root'
})
export class CustomerStoreService extends GenericStore<Customer> {

  constructor(dataService: CustomerService) { super(dataService); }

  async addContact(customerId: number, contact: CustomerContact) {
    // contact.customerId = item.id;
    contact.id = this.contacts.length;
    this.contacts.push(contact);
  }

  add(customerId: number, contact: CustomerContact): Observable<CustomerContact> {

    let obs = this.dataService.add(item);

    obs.subscribe(
            res => {
                this._items.getValue().push(item);
                this._items.next(this._items.getValue());
            });

    return obs;
}

  async getContacts(customerId: number) {
    return this.contacts.filter(c => c.customerId === customerId);
  }
}
