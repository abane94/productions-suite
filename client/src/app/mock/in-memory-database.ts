import { Injectable } from '@angular/core';
import { getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { applyContext } from 'src/types/context.types';
import { Material } from '../../types/models/materials.types';

@Injectable()
export class InMemDB implements InMemoryDbService {
    createDb() {
        let materials: Material[] = [
            {
                id: 1,
                name: 'TShirt',
                description: 'A simple tshirt',
                'category': { value: 'clothing', display: 'clothing' },
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
                'category': { value: 'clothing', display: 'clothing' },
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
                'category': { value: 'clothing', display: 'clothing' },
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
        return { materials };
    }

    get(req: RequestInfo) {
        console.log(req);
        return req.utils.createResponse$(() => {
            const id = req.id;
            const contextStr = req.query.get('context')?.shift();
            const context = contextStr ? JSON.parse(contextStr) : null;
            const data = id ? req.utils.findById(req.collection, id)
                : applyContext(req.collection, context);
            const dataEncapsulation = req.utils.getConfig().dataEncapsulation;

            const options: ResponseOptions = data ?
                { body: dataEncapsulation ? { data } : data, status: STATUS.OK } :
                { body: { error: `'Villains' with id='${id}' not found` }, status: STATUS.NOT_FOUND };

            return this.finishOptions(options, req);
        })

    }

    private finishOptions(options: ResponseOptions, { headers, url }: RequestInfo) {
        options.statusText = options.status == null ? undefined : getStatusText(options.status);
        options.headers = headers;
        options.url = url;
        return options;
    }
}
