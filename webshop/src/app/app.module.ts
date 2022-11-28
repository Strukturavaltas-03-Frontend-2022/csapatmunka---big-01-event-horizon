import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { ListComponent } from './page/list/list.component';
import { DataEditorComponent } from './common/data-editor/data-editor.component';
import { EditorComponent } from './page/editor/editor.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { SpinnerComponent } from './util/spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    ListComponent,
    DataEditorComponent,
    EditorComponent,
    DataTableComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
