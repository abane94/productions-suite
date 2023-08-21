import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from './forms/forms.module';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { InMemDB } from './mock/in-memory-database';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResourceDrawerModule } from './resource-drawer/resource-drawer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(InMemDB), // TODO: use a 'demo' flag once dev server is ready
    HttpClientModule,
    FlexLayoutModule,
    // MaterialPaneModule,
    ResourceDrawerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
