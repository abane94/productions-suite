import { FormDefinition, FormFieldDefinition, OptionDefinition } from "../forms/user-defined-form-viewer/user-defined-form-viewer.component";


export default function CustomerFormDefinition(): FormDefinition {
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
            }
        ]
    }
}


export function CustomerContactFormDefinition(): FormDefinition {
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
                type: 'TEXT',
                key: 'email',
                label: 'Name',
            },
            {
                type: 'TEXT',
                key: 'primaryPhone',
                label: 'Primary Phone',
            },
            {
                type: 'TEXT',
                key: 'mobile',
                label: 'Mobile',
            },
            {
                type: 'TEXT',
                key: 'ext',
                label: 'Ext.',
            }
        ]
    }
}
