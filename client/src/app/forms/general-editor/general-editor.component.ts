import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormDefinition, FormFieldDefinition, OptionDefinition } from '../../forms/user-defined-form-viewer/user-defined-form-viewer.component';
// import GeneralFormDefinition from '../general-form-definition';

@Component({
  selector: 'app-general-editor',
  templateUrl: './general-editor.component.html',
  styleUrls: ['./general-editor.component.scss']
})
export class GeneralEditorComponent<T> implements OnInit {
  @Input()
  public formDef!: FormDefinition;
  @Input()
  public hideSave: boolean = false;

  control: FormControl;

  @Output()
  save = new EventEmitter<T>();

  @Input()
  public value: T;

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

  getValue() {
    return this.control.value;
  }

}
