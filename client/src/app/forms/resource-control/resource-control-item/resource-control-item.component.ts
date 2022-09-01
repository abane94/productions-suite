import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ValueStateService } from 'src/app/data/state/value-state.service';
import { UserDefinedFormViewerComponent, FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
import { ID } from 'src/types/util/util';


export abstract class ControlWrapper<T extends ControlValueAccessor> implements ControlValueAccessor {
  protected abstract valueAccessor: T

  writeValue(obj: any) {
    this.valueAccessor.writeValue(obj);
  }

  registerOnChange(fn: any) {
    this.valueAccessor.registerOnChange(fn);
  }

  registerOnTouched(fn: any) {
    this.valueAccessor.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean) {
    this.valueAccessor.setDisabledState(isDisabled);
  }
}


@Component({
  selector: 'app-resource-control-item',
  templateUrl: './resource-control-item.component.html',
  styleUrls: ['./resource-control-item.component.scss']
})
export class ResourceControlItemComponent<T extends ID> extends ControlWrapper<UserDefinedFormViewerComponent> implements AfterContentChecked {

  @ViewChild(UserDefinedFormViewerComponent)
  public valueAccessor: UserDefinedFormViewerComponent;

  @Input()
  formDef: FormDefinition = {
    key: 'dgsdfgsfdh',
    fields: [
      // {
      //   type: 'HIDDEN',
      //   key: 'id',
      //   label: 'ID'
      // },
      {
        type: 'TEXT',
        key: 'name',
        label: 'Name',
        placeholder: '',
        required: true
      },
      {
        type: 'NUMBER',
        key: 'quantity',
        label: 'Quantity',
        placeholder: '',
        required: true
      },
    ]
  };

  @Input()
  item: ValueStateService<T>;

  isOpen = false;

  get val() {
    return this.valueAccessor?.value || {};
  }

  constructor(private cdr: ChangeDetectorRef) { super(); }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();  // this prevents errors when adding an item to the list, having to do with change checking
  }

}
