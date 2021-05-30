import { Component, OnInit } from '@angular/core';
import { NestedDisplayFields } from 'src/app/forms/user-defined-form-data-display/user-defined-form-data-display.component';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
import MaterialFormDefinition from '../material-form-definition';

interface User {
  id: number;
  name: string;
  creation: Date;
  color: string;
}

@Component({
  selector: 'app-materials-list-page',
  templateUrl: './materials-list-page.component.html',
  styleUrls: ['./materials-list-page.component.scss']
})
export class MaterialsListPageComponent implements OnInit {
  nestedDisplayField: NestedDisplayFields = {
    MaterialOptions: {
      field: 'name',
      nested: {
        SelectionsInnerForm: {
          field: 'display'
        }
      }
    }
  };

  formDef: FormDefinition = MaterialFormDefinition([], []);
  materials: any[] = [
    {
      id: 1,
      name: 'TShirt',
      description: 'A simple tshirt',
      'category': {value: 'clothing', display: 'clothing' },
      'baseCost': 1.45,
      'supplier': 'gilden',
      'supplierItemUrl': 'dsagfds',
      'options': {
        'items': [
          {
            'name': 'Size',
            'selections': {
              'items': [
                {
                  'value': 'M',
                  'display': 'M',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'S',
                  'display': 'S',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'XXL',
                  'display': 'XXL',
                  'img': '',
                  'priceAdjustment': 0.1
                }
              ]
            }
          },
          {
            'name': 'Color',
            'selections': {
              'items': [
                {
                  'value': 'BLUE',
                  'display': 'BLUE',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'RED',
                  'display': 'RED',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'TIE DYE',
                  'display': 'TIE',
                  'img': 'DYE',
                  'priceAdjustment': 0.15
                }
              ]
            }
          }
        ]
      }
    },
    {
      id: 2,
      name: 'Long Sleeve',
      description: 'A simple tshirt',
      'category': {value: 'clothing', display: 'clothing' },
      'baseCost': 1.45,
      'supplier': 'gilden',
      'supplierItemUrl': 'dsagfds',
      'options': {
        'items': [
          {
            'name': 'Size',
            'selections': {
              'items': [
                {
                  'value': 'M',
                  'display': 'M',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'S',
                  'display': 'S',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'XXL',
                  'display': 'XXL',
                  'img': '',
                  'priceAdjustment': 0.1
                }
              ]
            }
          },
          {
            'name': 'Color',
            'selections': {
              'items': [
                {
                  'value': 'BLUE',
                  'display': 'BLUE',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'RED',
                  'display': 'RED',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'TIE DYE',
                  'display': 'TIE',
                  'img': 'DYE',
                  'priceAdjustment': 0.15
                }
              ]
            }
          }
        ]
      }
    },
    {
      id: 3,
      name: 'Hoodie',
      description: 'A simple tshirt',
      'category': {value: 'clothing', display: 'clothing' },
      'baseCost': 1.45,
      'supplier': 'gilden',
      'supplierItemUrl': 'dsagfds',
      'options': {
        'items': [
          {
            'name': 'Size',
            'selections': {
              'items': [
                {
                  'value': 'M',
                  'display': 'M',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'S',
                  'display': 'S',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'XXL',
                  'display': 'XXL',
                  'img': '',
                  'priceAdjustment': 0.1
                }
              ]
            }
          },
          {
            'name': 'Color',
            'selections': {
              'items': [
                {
                  'value': 'BLUE',
                  'display': 'BLUE',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'RED',
                  'display': 'RED',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'TIE DYE',
                  'display': 'TIE',
                  'img': 'DYE',
                  'priceAdjustment': 0.15
                }
              ]
            }
          }
        ]
      }
    }
  ];

  onSave($event: any) {
    console.log('Saved!');
    console.log($event);

    let idx = -1;
    for (let i = 0; i < this.materials.length; i++) {
      const material = this.materials[i];
      if (material.name === $event.name) {
        idx = i;
        break;
      }
    }

    if (idx > -1) {
      // this.materials[idx] = $event;  // TODO: fix angular error when saving, maybe needs the trackby function in ngFor
    }
  }

  selected!: User[];
  constructor() { }

  ngOnInit(): void {
  }

}
