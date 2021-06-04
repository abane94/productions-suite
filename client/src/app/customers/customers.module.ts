import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersListPageComponent } from './customers-list-page/customers-list-page.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '../forms/forms.module';


@NgModule({
  declarations: [CustomersListPageComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ClarityModule,
    FormsModule,
    ngFormsModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
