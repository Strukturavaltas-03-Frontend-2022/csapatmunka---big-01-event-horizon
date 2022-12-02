import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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

import { FilterPipe } from './common/data-table/filter.pipe';
import { SortPipe } from './common/data-table/sort.pipe';
import { TickerComponent } from './util/ticker/ticker.component';

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
    FilterPipe,
    SortPipe,
    TickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
