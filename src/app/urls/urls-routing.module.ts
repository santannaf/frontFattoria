import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlsListaComponent } from './urls-lista/urls-lista.component';
import { UrlsFormComponent } from './urls-form/urls-form.component';


const routes: Routes = [
  {path: '', component: UrlsListaComponent},
  {path: 'nova', component: UrlsFormComponent},
  {path: 'editar/:id', component: UrlsFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrlsRoutingModule { }
