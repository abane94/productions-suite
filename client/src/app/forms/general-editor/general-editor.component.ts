import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormFieldDefinition, OptionDefinition } from '../../forms/user-defined-form-viewer/user-defined-form-viewer.component';
// import GeneralFormDefinition from '../general-form-definition';

@Component({
  selector: 'app-general-editor',
  templateUrl: './general-editor.component.html',
  styleUrls: ['./general-editor.component.scss']
})
export class GeneralEditorComponent implements OnInit {
  @Input()
  public formDef!: { key: string, fields: FormFieldDefinition[] };

  control: FormControl;

  @Output()
  save = new EventEmitter<any>();

  @Input()
  public value: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.control = this.fb.control(this.value);
  }

  emitSave() {
    this.save.emit(this.control.value);
  }

  print() {
    console.log(JSON.stringify(this.control.value));
  }

}
