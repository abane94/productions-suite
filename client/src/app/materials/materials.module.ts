import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsListPageComponent } from './materials-list-page/materials-list-page.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '../forms/forms.module';
import { MaterialEditorComponent } from './material-editor/material-editor.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialPaneModule } from '../material-pane/material-pane.module';

@NgModule({
  declarations: [MaterialsListPageComponent, MaterialEditorComponent],
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    ClarityModule,
    FormsModule,
    ngFormsModule,
    ReactiveFormsModule,
    // MaterialPaneModule
  ]
})
export class MaterialsModule { }
