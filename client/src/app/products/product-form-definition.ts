import { ResourceSelectOptions } from "src/types/util/util";
import { TypedFormDef, OptionDefinition } from "../forms/user-defined-form-viewer/user-defined-form-viewer.component";
import { Product } from "src/types/models/product.types";

export default function ProductFormDefinition(categories: OptionDefinition[], classes: OptionDefinition[]): TypedFormDef<Product> {
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
            baseHours: {
                type: 'NUMBER',
                key: 'baseHours',
                label: 'Base Hours',
                placeholder: '',
                required: true
            },
            useQuantity: {
                type: 'CHECK',
                key: 'useQuantity',
                label: 'Quantity?',
            },
            quantity: {
                type: 'NUMBER',
                key: 'quantity',
                label: 'Quantity',
                required: false,
                disabled: {
                    type: 'EQ',
                    field: 'useQuantity',
                    value: true
                }
            },
            minComplexity: {
                type: 'NUMBER',
                key: 'minComplexity',
                label: 'Minimum Complexity',
                placeholder: '',
                required: true
            },
            maxComplexity: {
                type: 'NUMBER',
                key: 'maxComplexity',
                label: 'Maximum Complexity',
                placeholder: '',
                required: true
            },
            materials: {
                type: 'RESOURCE',
                key: 'materials',
                resource: 'Material'
            },
            processes: {
                type: 'RESOURCE',
                key: 'processes',
                resource: 'Process'
            },
            materialStubs: {
                type: 'NESTED',
                key: 'materialStubs',
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
                    }
                }
            }
            // TODO: product stubs?
        },
    };
}
