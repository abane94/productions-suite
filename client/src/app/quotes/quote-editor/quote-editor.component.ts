import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/data/material.service';
import { RecipeService } from 'src/app/data/recipe.service';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
import { Material } from 'src/types/materials.types';
import { Recipe } from 'src/types/recipes.types';

@Component({
  selector: 'app-quote-editor',
  templateUrl: './quote-editor.component.html',
  styleUrls: ['./quote-editor.component.scss']
})
export class QuoteEditorComponent implements OnInit {
  recipes: Recipe[];

  //#region example fields
  open = true;
  formPageOneValid = true;
  formPageThreeValid = true;
  pageOneTitle = 'pageOneTitle';
  pageTwoTitle = 'pageTwoTitle';
  pageThreeTitle = 'pageThreeTitle';
  pageFourTitle = 'pageFourTitle';

  model = {
    name: '',
    ht_feet: '',
    ht_inches: '',
    weight: '',
    gender: '',
    color: '',
    power: '',
    weakness: '',
    ranking: ''
  };

  colorLabel = 'colorLabel';
  colorList = ['red', 'blue', 'green'];
  showPowerError = false;
  textsplanationOfPower = ' this is the explanation of power';
  powerSources = ['source 1', 'source 2'];

  textsplanationOfWeakness = 'explanation of weakness';

  powerRankingPunctuation = '!';
  textsplanationOfRanking = 'Explanation of ranking';
  //#endregion


  form: FormGroup;
  materialForm: FormGroup;


  materialDropDowns: { [materialClass: string]: Material[] } = {};
  materialSelections: number[] = [];
  materialsLoaded = false;
  recipeFormDefList: FormDefinition[];
  constructor(private fb: FormBuilder, private recipeService: RecipeService, private materialService: MaterialService) {
    this.setup();

    this.form = fb.group({
      quantity: [0, Validators.min(1)],
      recipe: '',
      recipeObj: null
    })
  }

  ngOnInit(): void {

  }

  private async setup() {
    this.recipes = (await this.recipeService.get()).items;
  }

  reset($event: any) {
    console.log('reset');
    console.log($event);
  }

  //#region example methods
  setPower(a: any) {
    console.log(a);
  }

  setWeakness(w: any) {
    console.log(w);
  }

  createRanking() {

  }

  //#endregion

  async generateMaterialDropDowns() {
    const recipeObj = await this.recipeService.getOne(this.form.controls.recipe.value);
    this.form.controls.recipeObj.patchValue(recipeObj);
    console.log(this.form.controls.recipe.value);
    const allMaterials = (await this.materialService.get()).items;
    for (const material of recipeObj.materials.items) {
      this.materialDropDowns[material.material] = allMaterials.filter(m => m.class = material.material);
    }

    this.materialsLoaded = true;
  }

  async generateRecipeForm() {
    console.log(this.materialSelections);

    const materialsDefs: Material[] = [];

    const materialFormBuilder = {};
    for (let i = 0; i < this.form.controls.recipeObj.value.materials.items.length; i++) {
      // const materialDep = this.form.controls.recipeObj.value.materials.items[i];
      const material = await this.materialService.getOne(+this.materialSelections[i]);
      materialsDefs.push(material);
      // this.form.addControl(material.name, this.fb.control(null));
      materialFormBuilder[material.name] = null;
    }

    this.materialForm = this.fb.group(materialFormBuilder);
    this.form.addControl('materials', this.materialForm);

    this.recipeFormDefList = this.materialListToFormDef(materialsDefs);

    console.log(materialsDefs);
  }

  dumpForm() {
    console.log(this.form.value);
  }

  private materialListToFormDef(materials: Material[]): FormDefinition[] {
    // const formDef: FormDefinition = {
    //   key: 'Materials',
    //   fields: []
    // };

    // for (const material of materials) {
    //   formDef.fields.push({
    //     type: 'NESTED',
    //     label: material.name,
    //     key: material.name,
    //     innerForm: {
    //       key: 'MaterialSelections',
    //       fields: material.options.items.map(option => ({
    //         type: 'SELECT',
    //         multiple: false,
    //         // required?: boolean,
    //         key: option.name,
    //         label: option.name,
    //         options: {
    //           type: 'PLAINTEXT',
    //           options: option.selections.items.map((selection, i) => ({
    //             value: selection.value,
    //             display: selection.display,
    //             default: !i
    //           }))
    //         },
    //         // helperText?: string,
    //       }))
    //     }
    //   })
    // }

    return materials.map( material => {
      return {
              key: material.name,
              fields: material.options.items.map(option => ({
                type: 'SELECT',
                multiple: false,
                // required?: boolean,
                key: option.name,
                label: option.name,
                options: {
                  type: 'PLAINTEXT',
                  options: option.selections.items.map((selection, i) => ({
                    value: selection.value,
                    display: selection.display,
                    default: !i
                  }))
                },
                // helperText?: string,
              }))
            }
    })

    // return formDef;
  }
}
