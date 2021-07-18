import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/data/customer.service';
import { MaterialService } from 'src/app/data/material.service';
import { RecipeService } from 'src/app/data/recipe.service';
import { GenericControlValueAccessor } from 'src/app/forms/GenericControlValueAccessor';
import { Customer, CustomerContact } from 'src/types/customers.types';

interface Quote {
  customer: number;
  contact: number;
  items: any[];
  total: number;
  description: string;
  due: string;
  createdBy: string;
  created: string;
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

  get totalPrice(): number {
    const total = this.itemsForm.controls.reduce((sum, item) => sum + (item?.value?.price || 0), 0);
    this._form.patchValue({total})
    return total;
  }

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

  print() {
    const quote: Quote = this._form.value;
    const customer = quote.customer as any as Customer;
    const contact = quote.contact as any as CustomerContact;
    const html =
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Invoice</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>
          @media print {
            @page {
              size: A4;
            }
          }
          ul {
            padding: 0;
            margin: 0 0 1rem 0;
            list-style: none;
          }
          body {
            font-family: "Inter", sans-serif;
            margin: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table,
          table th,
          table td {
            border: 1px solid silver;
          }
          table th,
          table td {
            text-align: right;
            padding: 8px;
          }
          h1,
          h4,
          p {
            margin: 0;
          }

          .container {
            padding: 20px 0;
            width: 1400px;
            max-width: 90%;
            margin: 0 auto;
          }

          .inv-title {
            padding: 10px;
            border: 1px solid silver;
            text-align: center;
            margin-bottom: 30px;
          }

          .inv-logo {
            width: 150px;
            display: block;
            margin: 0 auto;
            margin-bottom: 40px;
          }

          /* header */
          .inv-header {
            display: flex;
            margin-bottom: 20px;
          }
          .inv-header > :nth-child(1) {
            flex: 2;
          }
          .inv-header > :nth-child(2) {
            flex: 1;
          }
          .inv-header h2 {
            font-size: 20px;
            margin: 0 0 0.3rem 0;
          }
          .inv-header ul li {
            font-size: 15px;
            padding: 3px 0;
          }

          /* body */
          .inv-body table th,
          .inv-body table td {
            text-align: left;
          }
          .inv-body {
            margin-bottom: 30px;
          }

          /* footer */
          .inv-footer {
            display: flex;
            flex-direction: row;
          }
          .inv-footer > :nth-child(1) {
            flex: 2;
          }
          .inv-footer > :nth-child(2) {
            flex: 1;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="inv-title">
            <h1>Quote</h1>
          </div>
          <img src="./ZAF.jpg" class="inv-logo" />
          <div class="inv-header">
            <div>
              <h2>ExecuPrint</h2>
              <ul>
                <li>Heartland WI, 53029</li>
                <li>(262) 367 0391 | steve@execu-print.com</li>
              </ul>
            </div>
            <div>
            <h2>${customer.name}</h2>
            <ul>
              ${contact.name !== customer.name ? `<li>${contact.name }</li>` : ''}
              <li>${contact.primaryPhone } - ${contact.ext }</li>
              <li>${contact.email}</li>
            </ul>
            </div>
          </div>
          <div class="inv-body">
            <p>${quote.description}</p>
            <table>
              <thead>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </thead>
              <tbody>

                ${quote.items.map(item => `
                  <tr>
                    <td>
                      <h4>${item.recipeObj.name}</h4>
                      <p>
                        ${Object.keys(item.materials).map(materialName => `
                          ${materialName}
                          <br/>
                          ${Object.keys(item.materials[materialName]).map(key => `
                            &nbsp;${key}: ${item.materials[materialName][key]}
                          `).join('<br/>')}
                        `).join('<br/>')}
                      </p>
                    </td>
                    <td>${item.quantity}</td>
                    <td>${item.price /* TODO: use the currency pipe */}</td>
                  </tr>
                `).join('')}

              </tbody>
            </table>
          </div>
          <div class="inv-footer">
            <div><!-- required --></div>
            <div>
              <table>
                <tr>
                  <th>Sub total</th>
                  <td>${quote.total /* TODO: use currency pipe */}</td>
                </tr>
                <!--
                  <tr>
                    <th>Sales tax</th>
                    <td>200</td>
                  </tr>
                  <tr>
                    <th>Grand total</th>
                    <td>1200</td>
                  </tr>
                -->
              </table>
            </div>
          </div>
        </div>
        <script>
          window.print()
        </script>
      </body>
    </html>
    `;

    var win = window.open('', 'Quote', "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" + (screen.height-400) + ",left=" + (screen.width-840));
    win.document.body.innerHTML = html;


  }

}
