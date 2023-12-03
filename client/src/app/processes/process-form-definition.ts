import { ResourceSelectOptions } from "src/types/util/util";
import { OptionDefinition, TypedFormDef } from "../forms/user-defined-form-viewer/user-defined-form-viewer.component";
import { Process } from "src/types/models/processes.types";


export default function ProcessFormDefinition(categories: OptionDefinition[], classes: OptionDefinition[]): TypedFormDef<Process> {
    return {
        key: 'dgsdfgsfdh',
        fields: {
            id: {
                type: 'HIDDEN',
                key: 'id',
                label: 'ID'
            },
            name: {
                type: 'TEXT',
                key: 'name',
                label: 'Name',
                placeholder: '',
                required: true
            },
            description: {
                type: 'TEXT',
                key: 'description',
                label: 'Description',
                placeholder: '',
                required: true
            },
            useParentQuantity: {
                type: 'CHECK',
                key: 'useParentQuantity',
                label: 'Use Parent Quantity',
                placeholder: '',
                required: true
            },
            category: {
              type: 'SELECT',
              key: 'category',
              label: 'Category',
              multiple: false,
              options: {
                  type: 'PLAINTEXT',
                  options: categories
                }
            },
            // {
            //   type: 'AUTOCOMPLETE',  // TODO: Auto Complete is not available yet
            //   key: 'class',
            //   label: 'Item Class',
            //   multiple: false,
            //   options: {
            //       type: 'PLAINTEXT',
            //       options: classes
            //     }
            // },
            hours: {
                type: 'NUMBER',
                key: 'hours',
                label: 'Hours',
                placeholder: '',
                required: true
            },
            applyTimeToQuantity: {
                type: 'CHECK',
                key: 'applyTimeToQuantity',
                label: 'Apply time to quantity',
                disabled: {
                    type: 'LT',
                    field: 'quantity',
                    value: '1'
                }
            },
            price: {
                type: 'NUMBER',
                key: 'price',
                label: 'Price',
                placeholder: '',
                required: true
            },
            applyPriceToQuantity: {
                type: 'CHECK',
                key: 'applyPriceToQuantity',
                label: 'Apply price to quantity',
                disabled: {
                    type: 'LT',
                    field: 'quantity',
                    value: '1'
                }
            },
            materials: {
                type: 'RESOURCE',
                key: 'materials',
                resource: 'Material'
            },
            stubs: {
                type: 'NESTED',
                key: 'stubs',
                label: 'Material Stubs',
                innerForm: {
                    key: 'does not matter',
                    fields: {
                        title: {
                            type: 'TEXT',
                            key: 'title',
                            label: 'Title',
                            placeholder: '',
                            required: true
                        },
                        category: {
                          type: 'SELECT',
                          key: 'category',
                          label: 'Category',
                          multiple: false,
                          options: {
                              type: 'PLAINTEXT',
                              options: categories  // TODO: is this correct???
                            }
                        },
                        class: {
                            type: 'TEXT',
                            key: 'class',
                            label: 'Class',
                            placeholder: '',
                            required: false
                        },
                        multiple: {
                            type: 'CHECK',
                            key: 'multiple',
                            label: 'Allow Multiple',
                            default: false
                        },
                        // {
                        //     type: 'SELECT',  // TODO: this select might not be needed, because its implied, by the context???
                        //     key: 'resource',
                        //     label: 'Resource',
                        //     multiple: false,
                        //     options: {
                        //         type: 'PLAINTEXT',
                        //         options: ResourceSelectOptions
                        //       }
                        //   },
                    }
                }
            }
            // {
            //   type: 'TEXT',
            //   key: 'supplierItemUrl',
            //   label: 'supplierItemUrl',
            //   placeholder: '',
            //   required: true
            // },
            // {
            //   type: 'NESTED',
            //   key: 'options',
            //   label: 'Options',
            //   innerForm: {
            //     key: 'ProcessOptions',
            //     fields: [
            //       {
            //         type: 'TEXT',
            //         key: 'name',
            //         label: 'Options Name',
            //         placeholder: '',
            //         required: true
            //       },
            //       {
            //         type: 'NESTED',
            //         key: 'selections',
            //         label: 'Selections',
            //         innerForm: {
            //           key: 'SelectionsInnerForm',
            //           fields: [
            //             {
            //               type: 'TEXT',
            //               key: 'value',
            //               label: 'Value',
            //               placeholder: '',
            //               required: true
            //             },
            //             {
            //               type: 'TEXT',
            //               key: 'display',
            //               label: 'Display',
            //               placeholder: '',
            //               required: true
            //             },
            //             {
            //               type: 'TEXT',
            //               key: 'img',
            //               label: 'Image',
            //               placeholder: '',
            //               required: false
            //             },
            //             {
            //               type: 'NUMBER',
            //               key: 'priceAdjustment',
            //               label: 'Price Adjustment (per unit)',
            //               // placeholder: '',
            //               required: false,
            //               step: 0.01
            //             }
            //           ]
            //         }
            //       }
            //     ]
            //   }
            // }
            // {
            //   type: 'OBJECT_GRID',
            //   displayField: 'supplierSku',
            //   key: 'priceMap',
            //   formDef: {
            //     key: 'sdgdf',
            //     fields: [
            //         {
            //             type: 'NUMBER',
            //             key: 'cost',
            //             label: 'cost',
            //             placeholder: '',
            //             required: true
            //         },
            //         {
            //             type: 'TEXT',
            //             key: 'supplierSku',
            //             label: 'supplierSku',
            //             placeholder: '',
            //             required: true
            //         },
            //         {
            //           type: 'TEXT',
            //           key: 'colorFamily',
            //           label: 'colorFamily',
            //           placeholder: '',
            //           required: true
            //       },
            //       {
            //           type: 'TEXT',
            //           key: 'colorSwatchImage',
            //           label: 'colorSwatchImage',
            //           placeholder: '',
            //           required: true
            //       }
            //     ]
            //   }
            // }
        },
    };
}
