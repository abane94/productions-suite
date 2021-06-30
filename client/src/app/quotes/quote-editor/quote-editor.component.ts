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

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private materialService: MaterialService) {}

  ngOnInit(): void {

  }

}
