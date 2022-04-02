import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessListPageComponent } from './process-list-page/process-list-page.component';


const routes: Routes = [
  {
    path: '',
    component: ProcessListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
