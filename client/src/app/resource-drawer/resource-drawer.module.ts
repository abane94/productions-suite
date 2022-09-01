import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceDrawerComponent } from './resource-drawer/resource-drawer.component';
import { ClarityModule } from '@clr/angular';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '../forms/forms.module';


@NgModule({
  declarations: [
    ResourceDrawerComponent,
  ],
  imports: [
    CommonModule,
    ClarityModule,
    DragDropModule,
    ClarityModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    ResourceDrawerComponent,
  ]
})
export class ResourceDrawerModule { }
