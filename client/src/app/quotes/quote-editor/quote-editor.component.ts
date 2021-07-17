import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/data/customer.service';
import { MaterialService } from 'src/app/data/material.service';
import { RecipeService } from 'src/app/data/recipe.service';
import { GenericControlValueAccessor } from 'src/app/forms/GenericControlValueAccessor';
import { Customer, CustomerContact } from 'src/types/customers.types';

interface Quote {

}
@Component({
  selector: 'app-quote-editor',
  templateUrl: './quote-editor.component.html',
  styleUrls: ['./quote-editor.component.scss']
})
export class QuoteEditorComponent extends GenericControlValueAccessor<Quote> implements OnInit {
  itemsForm: FormArray;
  loaded = false;
  _createFormGroup(): void {
    this.itemsForm = this._fb.array([])
    this._form = this._fb.group({
      customer: -1,
      contact: -1,
      items: this.itemsForm,
      total: 0,
      description: '',
      due: '',
      createdBy: '',
      created: ''
    });
  }
  customers: Customer[];
  contacts: CustomerContact[] = [];
  isOpen: boolean[] = [];

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

  constructor(
    fb: FormBuilder,
    private recipeService: RecipeService,
    private materialService: MaterialService,
    private customerService: CustomerService)
    {
      super(fb);

    }

  ngOnInit(): void {
    super.ngOnInit();
    this.setup();
  }

  async setup() {
    this.customers = (await this.customerService.get()).items;
    this.loaded = true;
    this._form.get('customer').valueChanges.subscribe(async (val: Customer) => {
      if (!val) { return; }
      this.contacts = await this.customerService.getContacts(val.id);
      console.log(val);
    });
  }

  addItem(value?: any) {
    // this.itemsForm.push(this._fb.control(this.val));
    const ctrl = this._fb.control(value || this.val);
    this.itemsForm.push(ctrl);
    this.isOpen = this.isOpen.map(() => false);
    this.isOpen.push(true);
  }

  dump() {
    console.log(this.val);
  }


  onCopy(selected: FormControl, idx: number) {
    this.addItem(selected.value);
  }
  onDelete(selected: FormControl, idx: number) {
    this.itemsForm.removeAt(idx);
  }
  onEdit(selected: FormControl, idx: number) {
    this.isOpen = this.isOpen.map(() => false);
    this.isOpen[idx] = true;  // TODO:  out of bounds checking
  }

}
