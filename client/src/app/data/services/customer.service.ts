import { Injectable } from '@angular/core';
import { Customer, CustomerContact } from 'src/types/customers.types';
import { DataModule } from '../data.module';
import { GenericDataService } from '../base-classes/generic-data-service-2';


@Injectable({
  providedIn: DataModule
})
export class CustomerService extends GenericDataService<Customer> {
  items: Customer[] = [
    {
      "id": 0,
      "name": "I and A",
      "description": "Ian and Aris' Room"
    }
  ];
  contacts: CustomerContact[] = [
    {
      "id": 0,
      "name": "Aris",
      "description": "Co-founder",
      "email": "abane94@gmail.com",
      "primaryPhone": "2628943004",
      "mobile": "2628943004",
      "ext": "",
      "customerId": 0
    }
  ];

  async addCustomer(item: Customer, contact: CustomerContact) {
    if (item.id) {
      console.error('Adding item that already has ID');
    } else {
      item.id = this.items.length;
      this.items.push(item);

      contact.customerId = item.id;
      contact.id = this.contacts.length;
      this.contacts.push(contact);
    }
  }

  // add(item: Customer): Observable< {
  //   throw new Error('Not Supported, use addCustomer instead.');
  // }

  async addContact(customerId: number, contact: CustomerContact) {
    // contact.customerId = item.id;
    contact.id = this.contacts.length;
    this.contacts.push(contact);
  }

  async getContacts(customerId: number) {
    return this.contacts.filter(c => c.customerId === customerId);
  }
}
