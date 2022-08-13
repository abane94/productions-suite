import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceDrawerComponent } from './resource-drawer/resource-drawer.component';
import { ClarityModule } from '@clr/angular';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '../forms/forms.module';
import { ResourceControlComponent } from './resource-control/resource-control.component';
import { ResourceControlItemComponent } from './resource-control-item/resource-control-item.component';



@NgModule({
  declarations: [
    ResourceDrawerComponent,
    ResourceControlComponent,
    ResourceControlItemComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    DragDropModule,
    ClarityModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [ResourceDrawerComponent, ResourceControlComponent]
})
export class ResourceDrawerModule { }
