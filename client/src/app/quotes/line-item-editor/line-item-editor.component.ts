import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/data/material.service';
import { RecipeService } from 'src/app/data/recipe.service';
import { GenericControlProvider, GenericControlValueAccessor } from 'src/app/forms/GenericControlValueAccessor';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
import { Material } from 'src/types/materials.types';
import { Recipe } from 'src/types/models/recipes.types';


interface Quote {
  quantity: number,
  recipe: string,
  recipeObj?: Recipe,
  materialSelections: string[];
  materials?: { [materialName: string]: any }  // TODO: change any
  price: number;
  description: string;
}

@Component({
  selector: 'app-line-item-editor',
  templateUrl: './line-item-editor.component.html',
  styleUrls: ['./line-item-editor.component.scss'],
  providers: [GenericControlProvider(LineItemEditorComponent)]
})
export class LineItemEditorComponent extends GenericControlValueAccessor<Quote> {
  _createFormGroup(): void {

    this._form = this._fb.group({
      quantity: [0, Validators.min(1)],
      materialSelections: this._fb.array([]),
      recipe: '',
      recipeObj: null,
      price: 0,
      description: ''
    })
  }
  @Input() open = true;
  @Output() openChange = new EventEmitter<boolean>();
  recipes: Recipe[];
  materialsPageLoaded = false;
  materialDetailsPageLoaded = false;


  materialForm: FormGroup;


  materialDropDowns: { [materialClass: string]: Material[] } = {};
  materialsLoaded = false;
  recipeFormDefList: FormDefinition[];
  materials: { [materialName: string]: Material } = {};

  constructor(fb: FormBuilder, private recipeService: RecipeService, private materialService: MaterialService) {
    super(fb);
    this.setup();

  }

  private async setup() {
    this.recipes = (await this.recipeService.get()).items;
  }

  reset($event: any) {
    console.log('reset');
    console.log($event);
  }

  async loadMaterialSelectionPage() {
    if (this.materialsPageLoaded) { return; }
    const recipeObj = await this.recipeService.getOne(+this._form.controls.recipe.value);
    this._form.controls.recipeObj.patchValue(recipeObj);
    console.log(this._form.controls.recipe.value);
    const allMaterials = (await this.materialService.get()).items;
    for (const material of recipeObj.materials.items) {
      this.materialDropDowns[material.material] = allMaterials.filter(m => m.class = material.material);
      (this._form.controls.materialSelections as FormArray).push(this._fb.control(this.materialDropDowns[material.material][0].id));
    }

    this.materialsLoaded = true;
    this.materialsPageLoaded = true;
  }

  async loadMaterialDetailSelectionPage() {
    console.log(this._form.controls.materialSelections.value);

    const materialsDefs: Material[] = [];

    if (!this._form.controls.materials) {
      this.materialForm = this._fb.group({});
      this._form.addControl('materials', this.materialForm);
    }

    for (let i = 0; i < this._form.controls.recipeObj.value.materials.items.length; i++) {
      const material = await this.materialService.getOne(+this._form.controls.materialSelections.value[i]);
      this.materials[material.name] = material;
      materialsDefs.push(material);
      if (!this.materialForm.controls[material.name]) {
        const formObj = {};
        for ( const option of material.options.items) {
          formObj[option.name] = option.selections.items[0].value;
        }
        this.materialForm.addControl(material.name, this._fb.control(formObj));
      }
    }



    this.recipeFormDefList = this.materialListToFormDef(materialsDefs);

    console.log(materialsDefs);
    this.materialDetailsPageLoaded = true;
  }

  dumpForm() {
    console.log(this._form.value);
    this.calculatePrice()
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

  calculatePrice(): number {
    // TODO: could separate out perUnit, set up, and total prices
    if (!this._form) { return 0; }
    const val: Quote = this._form.value;
    if (!val.recipeObj) { return 0; }
    let price = 0;
    const recipe = val.recipeObj;
    const setup = false ; // val.setUp;


    if (!val.materials) { return price; }
    for (let i = 0; i < recipe.materials.items.length; i++) {
      const materialRecipeSettings = recipe.materials.items[i];
      const materialInstanceName = this.recipeFormDefList[i].key;
      const selectedMaterialOptions = val.materials[materialInstanceName];
      const materialDef = this.materials[materialInstanceName];
      const totalQuantity = (materialRecipeSettings.perUnity + (setup ? materialRecipeSettings.perSetup : 0)) * val.quantity;

      if (!selectedMaterialOptions) { return; }
      let costPerItem = materialDef.baseCost;
      materialDef.options.items.forEach( availableOption => {
        const selectedOption = selectedMaterialOptions[availableOption.name];
        const selectedOptionDef = availableOption.selections.items.find(option => option.value === selectedOption);
        costPerItem += selectedOptionDef?.priceAdjustment || 0;
      });

      price += (totalQuantity * costPerItem);
    }
    this._form.patchValue({price});

    return price;
  }

  onClose() {
    this.calculatePrice();
    this.openChange.emit(false);
  }

}
