import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessRoutingModule } from './process-routing.module';
import { ProcessListPageComponent } from './process-list-page/process-list-page.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '../forms/forms.module';
import { ProcessEditorComponent } from './process-editor/process-editor.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProcessPaneModule } from '../process-pane/process-pane.module';

@NgModule({
  declarations: [ProcessListPageComponent, ProcessEditorComponent],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    ClarityModule,
    FormsModule,
    ngFormsModule,
    ReactiveFormsModule,
    // ProcessPaneModule
  ]
})
export class ProcessModule { }
