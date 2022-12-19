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
                key: 'baseHours',
                label: 'Base Hours',
                placeholder: '',
                required: true
            },
            {
                type: 'CHECK',
                key: 'useQuantity',
                label: 'Quantity?',
            },
            {
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
            {
                type: 'NUMBER',
                key: 'minComplexity',
                label: 'Minimum Complexity',
                placeholder: '',
                required: true
            },
            {
                type: 'NUMBER',
                key: 'maxComplexity',
                label: 'Maximum Complexity',
                placeholder: '',
                required: true
            },
            {
                type: 'RESOURCE',
                key: 'materials',
                resource: 'Material'
            },
            {
                type: 'RESOURCE',
                key: 'processes',
                resource: 'Process'
            },
            {
                type: 'NESTED',
                key: 'materialStubs',
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
                    ]
                }
            }
            // TODO: process stubs?
        ],
    };
}
