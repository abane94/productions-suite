import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteEditorComponent } from './quote-editor/quote-editor.component';

const routes: Routes = [
  { path: '', component: QuoteEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRoutingModule { }
