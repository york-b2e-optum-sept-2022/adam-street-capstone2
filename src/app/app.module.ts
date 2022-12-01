import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ProcessListComponent } from './process-list/process-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProcessEditorComponent } from './process-editor/process-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessListComponent,
    ProcessEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
