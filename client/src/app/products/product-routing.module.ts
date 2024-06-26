import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListPageComponent } from './product-list-page/product-list-page.component';


const routes: Routes = [
  {
    path: '',
    component: ProductListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
