import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialPaneComponent } from './material-pane/material-pane.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MaterialControlComponent } from './material-control/material-control.component';
import { MaterialControlItemComponent } from './material-control-item/material-control-item.component';
import { ClarityModule } from '@clr/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '../forms/forms.module';


@NgModule({
  declarations: [
    MaterialPaneComponent,
    MaterialControlComponent,
    MaterialControlItemComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ClarityModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [MaterialPaneComponent, MaterialControlComponent]
})
export class MaterialPaneModule { }
