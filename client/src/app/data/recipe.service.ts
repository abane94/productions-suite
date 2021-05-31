import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: any[] = [];

  constructor() { }

  async getRecipes() {
    return this.recipes;
  }

  async addRecipe(recipe: any) {
    if (recipe.id) {
      console.error('Adding recipe that already has ID');
    } else {
      recipe.id = this.recipes.length;
      this.recipes.push(recipe);
    }
  }
}
