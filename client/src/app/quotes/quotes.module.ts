import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuoteEditorComponent } from './quote-editor/quote-editor.component';

import { FormsModule } from '../forms/forms.module';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [QuoteEditorComponent],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    FormsModule,
    ClarityModule,
    FormsModule,
    ngFormsModule,
    ReactiveFormsModule
  ]
})
export class QuotesModule { }
