import { moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { GenericControlProvider, GenericControlValueAccessor } from 'src/app/forms/GenericControlValueAccessor';

// GenericControlValueAccessor
@Component({
  selector: 'app-material-control',
  templateUrl: './material-control.component.html',
  styleUrls: ['./material-control.component.scss'],
  providers: [GenericControlProvider(MaterialControlComponent)]
})
export class MaterialControlComponent extends GenericControlValueAccessor<object> implements OnInit {
  items: FormArray;
  _createFormGroup(): void {
    this.items = this._fb.array([]);
    this._form = this._fb.group({items: this.items});
  }
  list: any[] = [];

  constructor(fb: FormBuilder) {
    super(fb);
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // TODO: if sorting is allowed for the drag/drop, then moveItemInArray will also have to be used for the formArray
      // TODO: (followup) is it? it seems to work without
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.items.insert(event.currentIndex, this._fb.control({}));
    }
    console.log('After drop');
  }

}
