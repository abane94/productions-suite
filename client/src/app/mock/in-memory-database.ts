import { Injectable } from '@angular/core';
import { getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { applyContext } from 'src/types/context.types';
import { Process } from 'src/types/models/processes.types';
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
                },
                priceMap: {
                    "values": [
                        [
                            {
                                "cost": 1,
                                "supplierSku": "sadfgdfg",
                                "colorFamily": "dfgsdfg",
                                "colorSwatchImage": "sdfgsdfgfd"
                            },
                            {},
                            {}
                        ],
                        [
                            {},
                            {},
                            {}
                        ],
                        [
                            {},
                            {},
                            {}
                        ]
                    ],
                    "rows": [
                        "red",
                        "blue",
                        "green"
                    ],
                    "columns": [
                        "s",
                        "m",
                        "l"
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
        let processes: Process[] = [
            {
                id: 1,
                name: 'Single Color screen print',
                description: 'fdgdfsgljdsglkfdjlfdg',
                useParentQuantity: true,
                hours: 0.25,
                applyTimeToQuantity: true,
                price: 2.2,
                applyPriceToQuantity: true
            }
        ];
        return { materials, processes };
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
        });
    }

    patch(req: RequestInfo) {
        console.log(req);
        const id = req.id;
        const contextStr = req.query.get('context')?.shift();
        const context = contextStr ? JSON.parse(contextStr) : null;
        const data = id ? req.utils.findById(req.collection, id)
                : applyContext(req.collection, context);
        console.log('before');
        console.log(data);
        Object.assign(data, (req.req as any).body);
        console.log('after');
        console.log(data);
        return req.utils.createResponse$(() => {
            // const data = id ? req.utils.findById(req.collection, id)
            //     : applyContext(req.collection, context);
            const dataEncapsulation = req.utils.getConfig().dataEncapsulation;

            const options: ResponseOptions = data ?
                { body: dataEncapsulation ? { data } : data, status: STATUS.OK } :
                { body: { error: `'Villains' with id='${id}' not found` }, status: STATUS.NOT_FOUND };

            return this.finishOptions(options, req);
        });
    }

    private finishOptions(options: ResponseOptions, { headers, url }: RequestInfo) {
        options.statusText = options.status == null ? undefined : getStatusText(options.status);
        options.headers = headers;
        options.url = url;
        return options;
    }
}
