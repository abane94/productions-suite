import { Component, OnInit } from '@angular/core';
import { FormDefinition } from '../user-defined-form-viewer/user-defined-form-viewer.component';

// TODO:
// Implement with forms then extends genericControlValuesAccessor

@Component({
  selector: 'app-object-grid-editor',
  templateUrl: './object-grid-editor.component.html',
  styleUrls: ['./object-grid-editor.component.scss']
})
export class ObjectGridEditorComponent implements OnInit {

  columns: string[] = [];
  rows: string[] = [];

  values: object[][] = [];

  rowField: string;
  colField: string;

  showModal = false;
  modalTargetRow: number;
  modalTargetCol: number;

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
  displayField = 'supplierSku';

  get modalTarget() {
    return this.values?.[this.modalTargetRow]?.[this.modalTargetRow];
  }

  constructor() { }

  setModalTarget(row: number, col: number, showModal = false) {
    if (!showModal) {
      this.showModal = showModal
    }
    this.modalTargetCol = col;
    this.modalTargetRow = row;
    if (showModal) {
      this.showModal = showModal
    }
  }

  addColumn(label: string) {
    this.columns.push(label);
    this.colField = '';

    this.values.push(new Array(this.rows.length).fill({}));  // null
  }

  addRow(label: string) {
    this.rows.push(label);
    this.rowField = '';

    for(const ls of this.values) {
      ls.push({});  // null
    }
  }

  // set(x: number, y: number, val: number) {
  //   this.values[x][y] = val;
  // }

  ngOnInit(): void {
  }

  getValue() {
    // const o: { [colName: string]: { [rowName: string]: object }} = {};  // number here to be replaced by the value object
    // for (let i = 0; i < this.columns.length; i++) {
    //   let colName = this.columns[i];
    //   o[colName] = o[colName] || {};
    //   for (let j = 0; j < this.rows.length; j++) {
    //     let rowName = this.rows[j];
    //     o[colName][rowName] = this.values[i][j];
    //   }
    // }

    //  TODO: clean up empty columns and rows

    const o = {
      rows: this.rows,
      columns: this.columns,
      values: this.values
    }

    console.log(o);
    return o;
  }

}
