import { Injectable } from '@angular/core';
import { Recipe } from 'src/types/recipes.types';
import { GenericDataService } from './generic-data-service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends GenericDataService<Recipe> {
  items: Recipe[] = [
    {
      id: 0,
      name: 'Screen Printed Shirt',
      description: 'A screen with Images',
      baseHours: 1,
      hoursPerUnit: 0.2,
      setup: false,
      setUpCost: 30,
      minComplexity: 5,
      maxComplexity: 20,
      materials: {
        items: [
          {
            material: 'shirt',
            perUnity: 1,
            perSetup: 1
          }
        ]
      }
    }
  ];

}
