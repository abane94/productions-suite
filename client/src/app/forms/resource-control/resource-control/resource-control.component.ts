import { moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { GenericControlProvider, GenericControlValueAccessor } from 'src/app/forms/GenericControlValueAccessor';
import { ResourceDrawerService, ResourceOptions } from '../../../resource-drawer/resource-drawer.service';

@Component({
  selector: 'app-resource-control',
  templateUrl: './resource-control.component.html',
  styleUrls: ['./resource-control.component.scss'],
  providers: [GenericControlProvider(ResourceControlComponent)]
})
export class ResourceControlComponent extends GenericControlValueAccessor<object> implements OnInit {
  items: FormArray;
  _createFormGroup(): void {
    this.items = this._fb.array([]);
    this._form = this._fb.group({items: this.items});
  }
  list: any[] = [];

  public guid!: string;
  @Input()
  resource: ResourceOptions = 'Material';

  constructor(fb: FormBuilder, private service: ResourceDrawerService) {
    super(fb);
  }

  ngOnInit(): void {
      super.ngOnInit();
      this.guid = this.service.requestResourceDropId(this.resource);
  }

  ngOnDestroy(): void {
      this.service.destroyResourceDrop(this.guid);
  }

  drop(event: any) {
    const data = event.item.data;
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
