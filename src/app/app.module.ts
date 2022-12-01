import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CreateProcessComponent} from './create-process/create-process.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ProcessListComponent } from './process-list/process-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProcessComponent,
    ProcessListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
