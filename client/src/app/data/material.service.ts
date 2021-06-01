import { Injectable } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Material } from 'src/types/materials.types';
import { GenericDataService } from './generic-data-service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService extends GenericDataService<Material> {

  async getMaterialClasses() {
    const classList = this.items.map(m => m['class'] as string);
    return classList.filter((c, i, self) => self.indexOf(c) === i)
  }


  items: Material[] = [
    {
      id: 1,
      name: 'TShirt',
      description: 'A simple tshirt',
      'category': {value: 'clothing', display: 'clothing' },
      'baseCost': 1.45,
      class: 'shirt',
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
      class: 'shirt',
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
      class: 'shirt',
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
}
