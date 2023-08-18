import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceOptions } from 'src/app/resource-drawer/resource-drawer.service';
import { PriceMap } from 'src/types/models/materials.types';
import { ID } from 'src/types/util/util';
import { GenericControlProvider, GenericControlValueAccessor } from '../GenericControlValueAccessor';
import { NamedTemplateDirective } from '../named-template/named-template.directive';
import { compare, FormComparison } from './form-reflection';

/**
 * TODO:
 *    add a way to do conditional logic, maybe just something simple like { fieldname: value }, the if that is true, the field is shown
 *    add a regex field that is optional, angular material supports this (?) so maybe clarity will also?
 */

// helper methods to cast the fields in the template
export const castOptionsField = (f: FormFieldDefinition) => (f as MultiFormFieldDefinition);
export const castNestedField = (f: FormFieldDefinition) => (f as NestedFormFieldDefinition);
export const castGridField = (f: FormFieldDefinition) => (f as ObjectGridFormField);
export const castResourceField = (f: FormFieldDefinition) => (f as ResourceFormField);

export interface FormFieldDefinitionBase<T> {
  type: 'TEXT' | 'NUMBER' | 'CHECK' | 'RADIO' | 'TOGGLE' |'DATE' | 'AUTOCOMPLETE' /** Combo? */ | 'SELECT' | 'RANGE' | 'TEXTAREA' | 'NESTED' | 'HIDDEN' | 'OBJECT_GRID' | 'RESOURCE';  // TODO could have phone and email options, or those could be validators. HTML might have input types of these...
  key: string;
  label?: string;
  placeholder?: string;
  default?: T;
  required?: boolean;
  helperText?: string;
  disabled?: FormComparison;
  // validators: any; // TODO: define valadators that a user can pick from a multi select
}

interface HiddenFormField extends FormFieldDefinitionBase<any> {
  type: 'HIDDEN';
}

interface TextFormFieldDefinition extends FormFieldDefinitionBase<string> {
  type: 'TEXT' | 'TEXTAREA';
}

interface DateFormFieldDefinition extends FormFieldDefinitionBase<Date> {
  type: 'DATE';
}

interface NumberFormFieldDefinition extends FormFieldDefinitionBase<number> {
  type: 'NUMBER';
  step?: number;
  // min and max can be done with validators
}

interface BoolFormFieldDefinition extends FormFieldDefinitionBase<boolean> {
  type: 'CHECK' | 'TOGGLE'
  // TODO: will this work, using the same interface, because there might not be a reason to seperate
  // TODO: alternative the one reason to seperate could be tri-state fields, but that might still be achievable with the same interface
  // TODO: Update: toggle might be for binary options that are not on/off / yes/no types of things
}

interface NestedFormFieldDefinition extends FormFieldDefinitionBase<any> {
  type: 'NESTED',
  innerForm: FormDefinition;
}

interface ObjectGridFormField extends FormFieldDefinitionBase<PriceMap> {
  type: 'OBJECT_GRID';
  formDef: FormDefinition;
  displayField: string;
}

interface ResourceFormField extends FormFieldDefinitionBase<ID> {
  type: 'RESOURCE',
  // multiple: false,
  resource: ResourceOptions
  // key: string;
  // label?: string;
  // placeholder?: string;
  // default?: T;
  // required?: boolean;
  // helperText?: string;
  // disabled?: FormComparison;
}

// TODO: implement a switch in the control to allow only one of many
// interface ResourceFormField extends FormFieldDefinitionBase<ID[]> {
//   type: 'RESOURCE_LIST',
//   multiple: true,
//   // key: string;
//   // label?: string;
//   // placeholder?: string;
//   // default?: T;
//   // required?: boolean;
//   // helperText?: string;
//   // disabled?: FormComparison;
// }

export interface OptionDefinition {
  value: string;
  display: string;
  default?: boolean;
}

interface OptionsSource {
  type: 'PLAINTEXT';  // TODO: other could be possible, like loading from db somehow
  options: OptionDefinition[];
}

interface MultiFormFieldDefinition {
  type: 'RADIO' | 'AUTOCOMPLETE' | 'SELECT';
  // TODO: clarity differentiates SELECT and COMBOBOXES where COMBOBOXES are used for filtering autocomplete data-backing options. SELECTS are simple
  required?: boolean;  // this is required here to use this property on the generic FormFieldDefinition
  key: string;
  label: string;
  options: OptionsSource;
  helperText?: string;
  disabled?: FormComparison;
  multiple: boolean;  // TODO check to see which components this is possible on, and the editor will have to make sure it checks out
}


export type FormFieldDefinition = TextFormFieldDefinition | NumberFormFieldDefinition | BoolFormFieldDefinition | MultiFormFieldDefinition | DateFormFieldDefinition | NestedFormFieldDefinition | HiddenFormField | ObjectGridFormField | ResourceFormField;

export interface FormDefinition {
  key: string;
  fields: FormFieldDefinition[];  // this should be a list with a key property instead of {key: FieldDef}, so that the ordering of the fields is consistent
}

@Component({
  selector: 'app-user-defined-form-viewer',
  templateUrl: './user-defined-form-viewer.component.html',
  styleUrls: ['./user-defined-form-viewer.component.scss'],
  providers: [GenericControlProvider(UserDefinedFormViewerComponent)]
})
export class UserDefinedFormViewerComponent extends GenericControlValueAccessor<any> implements OnInit {
  @Input()
  public formDef!: FormDefinition;

  @Input() templates: NamedTemplateDirective[] = [];

  newDate = () => new Date();


  // todo: move query params to a util location
  urlParams = new URLSearchParams(window.location.search);

  // public form: FormGroup;

  compare = compare;
  get Errors() {
    const ret: Record<string, any> = {
      form: this._form.errors
    };
    for (const c of Object.keys(this._form.controls || {})) {
      ret[c] = this._form.controls[c].errors;
    }
    return ret || '';
  }

  get value(): any {
    return this._form.value;
  }
  set value(v: any) {
    console.log(this);
    this._form.setValue(v);
    console.log('After set');
  }


  // helper methods to cast the fields in the template
  castOptionsField = castOptionsField;
  castNestedField = castNestedField;
  castGridField = castGridField;
  castResourceField = castResourceField;

  constructor(_fb: FormBuilder) {
    super(_fb);
  }


  _createFormGroup() {

    const formObj = UserDefinedFormViewerComponent.buildFormObject(this.formDef);
    this._form = this._fb.group(formObj);
  }

  printValue() {
    console.log(this._form?.value);
  }

  static buildFormObject(innerForm: FormDefinition) {

    const defaultItem: Record<string, any> = {};

    for (const formDef of innerForm.fields) {
        switch(formDef.type) {
        case('TEXT'):
        case('TEXTAREA'):
        case('HIDDEN'):
            defaultItem[formDef.key] = formDef.default || '';
            break;
        case('NUMBER'):
            defaultItem[formDef.key] = formDef.default || 0;
            break;
        case('CHECK'):
        case('TOGGLE'):
            defaultItem[formDef.key] = formDef.default || false;
            break;
        case('RADIO'):
        case('AUTOCOMPLETE'):
        case('SELECT'):
            const val = formDef.options.options.find(o => o.default);
            defaultItem[formDef.key] = val?.value || '';
            break;
        case('DATE'):
            defaultItem[formDef.key] = formDef.default || new Date();
            break;
        case('NESTED'):
            defaultItem[formDef.key] = formDef.default || UserDefinedFormViewerComponent.buildFormObject(formDef.innerForm);
            break;
        case('OBJECT_GRID'):
            defaultItem[formDef.key] = formDef.default || { rows: [], columns: [], values: [] };
            break;
          case('RESOURCE'):  // TODO
            defaultItem[formDef.key] = formDef.default || {};
        }
    }

      return defaultItem;
  }

}
