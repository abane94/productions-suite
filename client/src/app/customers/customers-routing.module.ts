import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersListPageComponent } from './customers-list-page/customers-list-page.component';

const routes: Routes = [
  { path: '', component: CustomersListPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
