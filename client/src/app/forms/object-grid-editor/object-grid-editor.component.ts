import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { GenericControlProvider, GenericControlValueAccessor } from '../GenericControlValueAccessor';
import { FormDefinition } from '../user-defined-form-viewer/user-defined-form-viewer.component';

@Component({
  selector: 'app-object-grid-editor',
  templateUrl: './object-grid-editor.component.html',
  styleUrls: ['./object-grid-editor.component.scss'],
  providers: [GenericControlProvider(ObjectGridEditorComponent)]
})
export class ObjectGridEditorComponent extends GenericControlValueAccessor<object> {

  _values: FormArray;
  _rows: FormArray;
  _cols: FormArray;
  _createFormGroup(): void {
    this._values = this._fb.array([]);
    this._rows = this._fb.array([]);
    this._cols = this._fb.array([]);
    this._form = this._fb.group({
      values: this._values,
      rows: this._rows,
      columns: this._cols
    });
  }

  writeValue(value: {values: object[][], columns: string[], rows: string[]} | null | undefined): void {
    if (!value) {
      return;
    }

    if (value.columns) {
      for (const col of value.columns) {
        this.addColumn(col);
      }
      this._cols.markAsPristine();
    }
    if (value.rows) {
      for (const row of value.rows) {
        this.addRow(row);
      }
      this._rows.markAsPristine();
    }
    if (value.values) {
      for (let i = 0; i < value.rows.length; i++) {
        for(let j = 0; j < value.columns.length; j++) {
          (this._values.controls[i] as FormArray).controls[j].setValue(value.values[i][j]);
        }
      }
      this._values.markAsPristine();
      this._form.markAsPristine();
    }
  }

  rowField: string;
  colField: string;

  showModal = false;
  modalTargetRow: number;
  modalTargetCol: number;

  tempFormValue: object = {};

  @Input()
  formDef: FormDefinition = {
    key: 'sdgdf',
    fields: [
        {
            type: 'NUMBER',
            key: 'cost',
            label: 'cost',
            placeholder: '',
            required: true
        },
        {
            type: 'TEXT',
            key: 'supplierSku',
            label: 'supplierSku',
            placeholder: '',
            required: true
        },
        {
          type: 'TEXT',
          key: 'colorFamily',
          label: 'colorFamily',
          placeholder: '',
          required: true
      },
      {
          type: 'TEXT',
          key: 'colorSwatchImage',
          label: 'colorSwatchImage',
          placeholder: '',
          required: true
      }
    ]
  }
  @Input()
  displayField = 'supplierSku';

  get modalTarget() {
    return this._values.controls?.[this.modalTargetRow]?.[this.modalTargetRow];  // TODO: is this a typo??? there are 2 modalTargetRows. UPDATE: usability testing seems to indicate it works, test this function specifically
  }

  constructor(protected _fb: FormBuilder) { super(_fb); }

  setModalTarget(row: number, col: number, showModal = false) {
    this.modalTargetCol = col;
    this.modalTargetRow = row;
    if (showModal) {
      this.showModal = showModal
    }
  }

  openModal(row: number, col: number) {
    this.modalTargetCol = col;
    this.modalTargetRow = row;
    this.tempFormValue = (this._values.controls[this.modalTargetRow] as FormArray).controls[this.modalTargetCol].value;

    // make sure the form is empty
    if (!Object.keys(this.tempFormValue).length) {
      this.tempFormValue = {};  // this will keep the empty fields from being added before save is clicked
      for (const field of this.formDef.fields.map(f => f.key)) {
        this.tempFormValue[field] = null;
      }
    }
    this.showModal = true;
  }

  closeModal(save = false) {
    this.showModal = false
    if (save) {
      (this._values.controls[this.modalTargetRow] as FormArray).controls[this.modalTargetCol].patchValue(this.tempFormValue);
    }
    this.modalTargetCol = null;
    this.modalTargetRow = null;
    this.tempFormValue = null;
  }

  addColumn(label: string) {
    this._cols.push(this._fb.control(label));
    this.colField = '';

    const inner = this._fb.array(new Array(this._rows.length).fill({}));  // TODO: this might not be right

    this._values.push(inner);  // null
  }

  addRow(label: string) {
    this._rows.push(this._fb.control(label));
    this.rowField = '';

    for(const ls of this._values.controls) {
      (ls as FormArray).push(this._fb.control({}));  // null
    }
  }

  getValue() {

    const o = {
      rows: this._rows.value,
      columns: this._cols.value,
      values: this._values.value
    };

    console.log(o);
    return o;
  }

}
