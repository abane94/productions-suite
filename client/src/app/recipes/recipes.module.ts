import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListPageComponent } from './recipes-list-page/recipes-list-page.component';
import { RecipesRoutingModule } from './recipes-routing.module';



@NgModule({
  declarations: [RecipesListPageComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
