import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListPageComponent } from './recipes-list-page/recipes-list-page.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { FormsModule } from '../forms/forms.module';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';




@NgModule({
  declarations: [RecipesListPageComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    ClarityModule,
    FormsModule,
    ngFormsModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
