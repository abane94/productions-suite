import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor() { }


  async getMaterials() {
    return this.materials;
  }

  async addMaterial(material: any) {
    if (material.id) {
      console.error('Adding material that already has ID');
    } else {
      material.id = this.materials.length;
      this.materials.push(material);
    }
  }


  private materials = [
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
}
