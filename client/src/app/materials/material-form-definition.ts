import { Material } from "src/types/models/materials.types";
import { TypedFormDef, OptionDefinition } from "../forms/user-defined-form-viewer/user-defined-form-viewer.component";

export default function MaterialFormDefinition(categories: OptionDefinition[], classes: OptionDefinition[]): TypedFormDef<Material> {
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
      //   {
      //     type: 'TEXT',
      //     key: 'category',
      //     label: 'Category',
      //     placeholder: '',
      //     required: true
      //   },
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
      class: {
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
      supplier: {
        type: 'TEXT',
        key: 'supplier',
        label: 'Supplier',
        placeholder: '',
        required: true
      },
      supplierItemUrl: {
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
      priceMap: {
        type: 'OBJECT_GRID',
        displayField: 'supplierSku',
        key: 'priceMap',
        formDef: {
          key: 'sdgdf',
          fields: {
            cost: {
              type: 'NUMBER',
              key: 'cost',
              label: 'cost',
              placeholder: '',
              required: true
            },
            supplierSku: {
              type: 'TEXT',
              key: 'supplierSku',
              label: 'supplierSku',
              placeholder: '',
              required: true
            },
            colorFamily: {
              type: 'TEXT',
              key: 'colorFamily',
              label: 'colorFamily',
              placeholder: '',
              required: true
            },
            colorSwatchImage: {
              type: 'TEXT',
              key: 'colorSwatchImage',
              label: 'colorSwatchImage',
              placeholder: '',
              required: true
            }
          }
        }
      }
    },
  };
}
