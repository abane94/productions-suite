import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/data/material.service';
import { RecipeService } from 'src/app/data/recipe.service';
import { NestedDisplayFields } from 'src/app/forms/user-defined-form-data-display/user-defined-form-data-display.component';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
import { Recipe } from 'src/types/recipes.types';
import RecipeFormDefinition from '../recipe-form-definition';

@Component({
  selector: 'app-recipes-list-page',
  templateUrl: './recipes-list-page.component.html',
  styleUrls: ['./recipes-list-page.component.scss']
})
export class RecipesListPageComponent implements OnInit {

  addModalIsOpen = false;
  nestedDisplayField: NestedDisplayFields = {
    RecipeOptions: {
      field: 'name',
      nested: {
        SelectionsInnerForm: {
          field: 'display'
        }
      }
    }
  };

  formDef: FormDefinition;
  recipes: Recipe[] = [];

  selected!: Recipe[];
  constructor(private recipeService: RecipeService, private materialService: MaterialService) {
    this.recipeService.get().then(recipes => this.recipes = recipes);
    this.setup();
  }

  async setup() {
    this.recipes = await this.recipeService.get();
    const materialsClasses = await this.materialService.getMaterialClasses();
    this.formDef = RecipeFormDefinition(materialsClasses.map(m => ({value: m, display: m})));
  }

  onSave($event: Recipe) {
    console.log('Saved!');
    console.log($event);

    let idx = -1;
    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];
      if (recipe.name === $event.name) {
        idx = i;
        break;
      }
    }

    if (idx > -1) {
      // this.recipes[idx] = $event;  // TODO: fix angular error when saving, maybe needs the trackby function in ngFor
    }
  }

  ngOnInit(): void {
  }

  async addRecipe(recipe) {
    this.addModalIsOpen = false;
    await this.recipeService.add(recipe);
    this.recipes = await this.recipeService.get();
  }

}
