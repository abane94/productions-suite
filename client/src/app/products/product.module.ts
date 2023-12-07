import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListPageComponent } from './product-list-page/product-list-page.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '../forms/forms.module';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProductPaneModule } from '../product-pane/product-pane.module';

@NgModule({
  declarations: [ProductListPageComponent, ProductEditorComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ClarityModule,
    FormsModule,
    ngFormsModule,
    ReactiveFormsModule,
    // ProductPaneModule
  ]
})
export class ProductModule { }
