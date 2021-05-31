import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesListPageComponent } from './recipes-list-page/recipes-list-page.component';


const routes: Routes = [
  {
    path: '',
    component: RecipesListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
