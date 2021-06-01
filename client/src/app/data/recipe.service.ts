import { Injectable } from '@angular/core';
import { Recipe } from 'src/types/recipes.types';
import { GenericDataService } from './generic-data-service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends GenericDataService<Recipe> {
  items: Recipe[] = [];

}
