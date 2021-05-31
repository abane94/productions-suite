import { FormDefinition, FormFieldDefinition, OptionDefinition } from "../forms/user-defined-form-viewer/user-defined-form-viewer.component";


export default function RecipeFormDefinition(materialClasses: OptionDefinition[]): FormDefinition {
    return {
        key: 'sdgdf',
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
                type: 'NUMBER',
                key: 'baseHours',
                label: 'Base Hours',
                placeholder: '',
                required: true
            },
            {
                type: 'NUMBER',
                key: 'hoursPerUnit',
                label: 'Hours Per Unit',
                placeholder: '',
                required: true
            },
            {
                type: 'CHECK',
                key: 'setup',
                label: 'Include Setup'
            },
            {
                type: 'NUMBER',
                key: 'set Up Cost',
                label: 'Set Up Cost',
                placeholder: '',
                required: true
            },
            {
                type: 'NUMBER',
                key: 'minComplexity',
                label: 'Minimum Complexity Percent',
                placeholder: '',
                required: true
            },
            {
                type: 'NUMBER',
                key: 'maxComplexity',
                label: 'Maximum Complexity Percent',
                placeholder: '',
                required: true
            },
            {
                type: 'NESTED',
                key: 'materials',
                label: 'Materials',
                innerForm: {
                    key: 'MaterialsList',
                    fields: [
                        // {
                        //     type: 'AUTOCOMPLETE',  // TODO: Auto Complete is not available yet
                        //     key: 'material',
                        //     label: 'Material',
                        //     multiple: false,
                        //     options: {
                        //         type: 'PLAINTEXT',
                        //         options: materialClasses
                        //     }
                        // },
                        {
                            type: 'SELECT',
                            key: 'material',
                            label: 'Material',
                            multiple: false,
                            options: {
                                type: 'PLAINTEXT',
                                options: materialClasses
                            }
                        },
                        {
                            type: 'NUMBER',
                            key: 'perUnity',
                            label: 'Amount needed per unit',
                            placeholder: '',
                            required: true,
                            default: 1
                        },
                        {
                            type: 'NUMBER',
                            key: 'perSetup',
                            label: 'Amount needed for Setup',
                            placeholder: '',
                            default: 1
                        }
                    ]
                }
            }
        ]
    }
}
