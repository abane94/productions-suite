import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormFieldDefinition, OptionDefinition } from '../../forms/user-defined-form-viewer/user-defined-form-viewer.component';
import MaterialFormDefinition from '../material-form-definition';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  styleUrls: ['./material-editor.component.scss']
})
export class MaterialEditorComponent implements OnInit {
  public formDef!: { key: string, fields: FormFieldDefinition[] };

  control: FormControl;

  @Output()
  save = new EventEmitter<any>();

  @Input()
  public material: any;  //  = {"name":"TShirt","description":"A simple tshirt","category":"clothing","baseCost":1.45,"supplier":"gilden","supplierItemUrl":"dsagfds","options":{"items":[{"name":"Size","selections":{"items":[{"value":"M","display":"M","img":"","priceAdjustment":0},{"value":"S","display":"S","img":"","priceAdjustment":0},{"value":"XXL","display":"XXL","img":"","priceAdjustment":0.1}]}},{"name":"Color","selections":{"items":[{"value":"BLUE","display":"BLUE","img":"","priceAdjustment":0},{"value":"RED","display":"RED","img":"","priceAdjustment":0},{"value":"TIE DYE","display":"TIE","img":"DYE","priceAdjustment":0.15}]}}]}}

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // TODO: get categories and classes from server
    const categories: OptionDefinition[] = [{
      value: 'apparel',
      display: 'Apparel'
    }, {
      value: 'sign',
      display: 'Sign'
    }];
    const classes: OptionDefinition[] = [{
      display: 'Shirt',
      value: 'Shirt'
    }, {
      display: 'Hat',
      value: 'hat'
    }
    ];
    this.formDef = MaterialFormDefinition(categories, classes)
    this.control = this.fb.control(this.material);
  }

  emitSave() {
    this.save.emit(this.control.value);
  }

  print() {
    console.log(JSON.stringify(this.control.value));
  }

}


/*
    Example form

    {
      key: 'MyForm',
      fields: [
        {
          type: 'SELECT',
          key: 'type',
          label: 'Field Type',
          multiple: false,
          // default,
          options: {
            type: 'PLAINTEXT',  // TODO: other could be possible, like loading from db somehow
            options: [
              {
                value: 'TEXT',
                display: 'TEXT',
                default: true,
              },
              {
                value: 'NUMBER',
                display: 'NUMBER',
              },
              {
                value: 'CHECK',
                display: 'CHECK',
              },
              // {
              //   value: 'DATE',
              //   display: 'DATE',
              // },
              {
                value: 'SELECT',
                display: 'SELECT',
              }
            ]
          },
          required: true
        },
        {
          type: 'TEXT',
          key: 'key',
          label: 'Field Key',
          placeholder: 'Field Key',
          required: true,
          default: 'My Field Key'
        },
        {
          type: 'TEXT',
          key: 'label',
          label: 'Field Label',
          placeholder: 'Field Label',
          required: true
        },
        {
          type: 'TEXT',
          key: 'placeholder',
          label: 'Placeholder',
          placeholder: 'Placeholder',
          required: true
        },
        {
          type: 'CHECK',
          key: 'required',
          label: 'Required',
          default: false
        },
        {
          type: 'NESTED',
          key: 'people',
          label: 'People',
          innerForm: {
            key: 'MyInnerForm',
            fields: [
              {
                type: 'SELECT',
                key: 'color',
                label: 'Favorite Color',
                multiple: false,
                options: {
                  type: 'PLAINTEXT',
                  options: [
                    {
                      value: 'Blue',
                      display: 'Blue',
                      default: true,
                    },
                    {
                      value: 'RED',
                      display: 'RED',
                    },
                    {
                      value: 'Yellow',
                      display: 'Yellow',
                    },
                    {
                      value: 'Green',
                      display: 'Green',
                    }
                  ]
                },
                required: true
              },
              {
                type: 'TEXT',
                key: 'firstName',
                label: 'First Name',
                placeholder: 'First Name',
                required: true
              },
              {
                type: 'TEXT',
                key: 'lastName',
                label: 'Last Name',
                placeholder: 'Last Name',
                required: true
              },
              {
                type: 'TEXT',
                key: 'nickName',
                label: 'Nick Name',
                placeholder: 'Nick Name',
                required: true
              },
              {
                type: 'CHECK',
                key: 'required',
                label: 'Are you cool',
                default: false
              },
              {
                type: 'NESTED',
                key: 'friends',
                label: 'Friends',
                innerForm: {
                  key: 'MyFirends',
                  fields: [
                    {
                      type: 'TEXT',
                      key: 'firstName',
                      label: 'First Name',
                      placeholder: 'First Name',
                      required: true
                    },
                    {
                      type: 'TEXT',
                      key: 'lastName',
                      label: 'Last Name',
                      placeholder: 'Last Name',
                      required: true
                    },
                    {
                      type: 'SELECT',
                      key: 'color',
                      label: 'Favorite Color',
                      multiple: false,
                      options: {
                        type: 'PLAINTEXT',
                        options: [
                          {
                            value: 'Blue',
                            display: 'Blue',
                            default: true,
                          },
                          {
                            value: 'RED',
                            display: 'RED',
                          },
                          {
                            value: 'Yellow',
                            display: 'Yellow',
                          },
                          {
                            value: 'Green',
                            display: 'Green',
                          }
                        ]
                      },
                      required: true
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    };

*/
