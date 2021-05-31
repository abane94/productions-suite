import { Injectable } from '@angular/core';
import { Material } from 'src/types/materials.types';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor() { }


  async getMaterials() {
    return this.materials;
  }

  async addMaterial(material: Material) {
    if (material.id) {
      console.error('Adding material that already has ID');
    } else {
      material.id = this.materials.length;
      this.materials.push(material);
    }
  }

  async getMaterialClasses() {
    const classList = this.materials.map(m => m['class'] as string);
    return classList.filter((c, i, self) => self.indexOf(c) === i)
  }


  private materials: Material[] = [
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
