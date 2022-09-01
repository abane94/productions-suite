import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDefinedFormViewerComponent } from './user-defined-form-viewer/user-defined-form-viewer.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ListItemModalContainerComponent } from './list-item-modal-container/list-item-modal-container.component';
import { MasterDetailControlComponent } from './master-detail-control/master-detail-control.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NamedTemplateDirective } from './named-template/named-template.directive';
import { UserDefinedFormDataDisplayComponent } from './user-defined-form-data-display/user-defined-form-data-display.component';
import { GeneralEditorComponent } from './general-editor/general-editor.component';
import { ObjectGridEditorComponent } from './object-grid-editor/object-grid-editor.component';
import { ResourceControlComponent } from './resource-control/resource-control/resource-control.component';
import { ResourceControlItemComponent } from './resource-control/resource-control-item/resource-control-item.component';

import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    UserDefinedFormViewerComponent,
    ListItemModalContainerComponent,
    MasterDetailControlComponent,
    NamedTemplateDirective,
    UserDefinedFormDataDisplayComponent,
    GeneralEditorComponent,
    ObjectGridEditorComponent,
    ResourceControlComponent,
    ResourceControlItemComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    ngFormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DragDropModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA // Tells Angular we will have custom tags in our templates
  ],
  exports: [UserDefinedFormViewerComponent, ListItemModalContainerComponent, MasterDetailControlComponent, NamedTemplateDirective, UserDefinedFormDataDisplayComponent, GeneralEditorComponent, ObjectGridEditorComponent, ResourceControlComponent]
})
export class FormsModule { }
