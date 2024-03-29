import { ResourceSelectOptions } from "src/types/util/util";
import { FormDefinition, FormFieldDefinition, OptionDefinition } from "../forms/user-defined-form-viewer/user-defined-form-viewer.component";


export default function ProcessFormDefinition(categories: OptionDefinition[], classes: OptionDefinition[]): FormDefinition {
    return {
        key: 'dgsdfgsfdh',
        fields: [
            {
                type: 'HIDDEN',
                key: 'id',
                label: 'ID'
            },
            {
                type: 'TEXT',
                key: 'name',
                label: 'Name',
                placeholder: '',
                required: true
            },
            {
                type: 'TEXT',
                key: 'description',
                label: 'Description',
                placeholder: '',
                required: true
            },
            {
                type: 'CHECK',
                key: 'useParentQuantity',
                label: 'Use Parent Quantity',
                placeholder: '',
                required: true
            },
            {
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
            {
                type: 'NUMBER',
                key: 'hours',
                label: 'Hours',
                placeholder: '',
                required: true
            },
            {
                type: 'CHECK',
                key: 'applyTimeToQuantity',
                label: 'Apply time to quantity',
                disabled: {
                    type: 'LT',
                    field: 'quantity',
                    value: '1'
                }
            },
            {
                type: 'NUMBER',
                key: 'price',
                label: 'Price',
                placeholder: '',
                required: true
            },
            {
                type: 'CHECK',
                key: 'applyPriceToQuantity',
                label: 'Apply price to quantity',
                disabled: {
                    type: 'LT',
                    field: 'quantity',
                    value: '1'
                }
            },
            {
                type: 'TEXT',
                key: 'supplier',
                label: 'Supplier',
                placeholder: '',
                required: true
            },
            {
                type: 'RESOURCE',
                key: 'materials',
                resource: 'Material'
            },
            {
                type: 'NESTED',
                key: 'stubs',
                label: 'Material Stubs',
                innerForm: {
                    key: 'does not matter',
                    fields: [
                        {
                            type: 'TEXT',
                            key: 'title',
                            label: 'Title',
                            placeholder: '',
                            required: true
                        },
                        {
                          type: 'SELECT',
                          key: 'category',
                          label: 'Category',
                          multiple: false,
                          options: {
                              type: 'PLAINTEXT',
                              options: categories  // TODO: is this correct???
                            }
                        },
                        {
                            type: 'TEXT',
                            key: 'class',
                            label: 'Class',
                            placeholder: '',
                            required: false
                        },
                        {
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
                    ]
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
        ],
    };
}
