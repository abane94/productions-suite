import { FormDefinition, FormFieldDefinition, OptionDefinition } from "../forms/user-defined-form-viewer/user-defined-form-viewer.component";


export default function MaterialFormDefinition(categories: OptionDefinition[], classes: OptionDefinition[]): FormDefinition {
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
        //   {
        //     type: 'TEXT',
        //     key: 'category',
        //     label: 'Category',
        //     placeholder: '',
        //     required: true
        //   },
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
          {
            type: 'AUTOCOMPLETE',  // TODO: Auto Complete is not available yet
            key: 'class',
            label: 'Item Class',
            multiple: false,
            options: {
                type: 'PLAINTEXT',
                options: classes
              }
          },
          // {
          //   type: 'NUMBER',
          //   key: 'baseCost',
          //   label: 'Base Cost',
          //   placeholder: '',
          //   required: true
          // },
          {
            type: 'TEXT',
            key: 'supplier',
            label: 'Supplier',
            placeholder: '',
            required: true
          },
          {
            type: 'TEXT',
            key: 'supplierItemUrl',
            label: 'supplierItemUrl',
            placeholder: '',
            required: true
          },
          // {
          //   type: 'NESTED',
          //   key: 'options',
          //   label: 'Options',
          //   innerForm: {
          //     key: 'MaterialOptions',
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
        ]
      };
}
