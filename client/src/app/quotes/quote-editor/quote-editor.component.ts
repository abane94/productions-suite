import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MaterialService } from 'src/app/data/material.service';
import { RecipeService } from 'src/app/data/recipe.service';

@Component({
  selector: 'app-quote-editor',
  templateUrl: './quote-editor.component.html',
  styleUrls: ['./quote-editor.component.scss']
})
export class QuoteEditorComponent implements OnInit {

  public val = {
    "quantity": 8,
    "recipe": "0",
    "recipeObj": {
        "id": "0",
        "name": "Screen Printed Shirt",
        "description": "A screen with Images",
        "baseHours": 1,
        "hoursPerUnit": 0.2,
        "setup": false,
        "setUpCost": 30,
        "minComplexity": 5,
        "maxComplexity": 20,
        "materials": {
            "items": [
                {
                    "material": "shirt",
                    "perUnity": 1,
                    "perSetup": 1
                }
            ]
        }
    },
    "materials": {
        "TShirt": {
            "Size": "S",
            "Color": "TIE DYE"
        }
    }
  };

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private materialService: MaterialService) {}

  ngOnInit(): void {

  }

  dump() {
    console.log(this.val);
  }

}
