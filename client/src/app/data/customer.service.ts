import { Injectable } from '@angular/core';
import { Customer } from 'src/types/customers.types';
import { GenericDataService } from './generic-data-service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService extends GenericDataService<Customer> {
  items: Customer[] = [];
}
