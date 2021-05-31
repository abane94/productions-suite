import { Injectable } from '@angular/core';
import { Recipe } from 'src/types/recipes.types';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];

  constructor() { }

  async getRecipes() {
    return this.recipes;
  }

  async addRecipe(recipe: Recipe) {
    if (recipe.id) {
      console.error('Adding recipe that already has ID');
    } else {
      recipe.id = this.recipes.length;
      this.recipes.push(recipe);
    }
  }
}
