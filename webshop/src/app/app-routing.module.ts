import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './page/editor/editor.component';
import { HomeComponent } from './page/home/home.component';
import { ListComponent } from './page/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'list/:type',
    component: ListComponent,
  },
  {
    path: 'edit/:id',
    component: EditorComponent,
  },
  {
    path: 'create/:id',
    component: EditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
