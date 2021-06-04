import { Component, OnInit } from '@angular/core';
import { DataGridHandlerService } from 'src/app/data/data-grid-handler.service';
import { RecipeService } from 'src/app/data/recipe.service';
import { NestedDisplayFields } from 'src/app/forms/user-defined-form-data-display/user-defined-form-data-display.component';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
import { Customer } from 'src/types/customers.types';
import CustomerFormDefinition from '../customer-form-definition';

@Component({
  selector: 'app-customers-list-page',
  templateUrl: './customers-list-page.component.html',
  styleUrls: ['./customers-list-page.component.scss']
})
export class CustomersListPageComponent implements OnInit {

  addModalIsOpen = false;
  nestedDisplayField: NestedDisplayFields = {
    CustomerOptions: {
      field: 'name',
      nested: {
        SelectionsInnerForm: {
          field: 'display'
        }
      }
    }
  };

  formDef: FormDefinition;
  customers: Customer[] = [];

  selected!: Customer[];
  constructor(private CustomerService: RecipeService, public gridHandler: DataGridHandlerService<Customer>) {
    gridHandler.setService(CustomerService);
    gridHandler.onItems$.subscribe(customers => this.customers = customers );
    this.setup();
  }

  async setup() {
    this.customers = (await this.CustomerService.get()).items;
    this.formDef = CustomerFormDefinition();
  }

  onSave($event: Customer) {
    console.log('Saved!');
    console.log($event);

    let idx = -1;
    for (let i = 0; i < this.customers.length; i++) {
      const Customer = this.customers[i];
      if (Customer.name === $event.name) {
        idx = i;
        break;
      }
    }

    if (idx > -1) {
      // this.customers[idx] = $event;  // TODO: fix angular error when saving, maybe needs the trackby function in ngFor
    }
  }

  ngOnInit(): void {
  }

  async addCustomer(Customer) {
    this.addModalIsOpen = false;
    await this.CustomerService.add(Customer);
    this.customers = (await this.CustomerService.get()).items;
  }

}
