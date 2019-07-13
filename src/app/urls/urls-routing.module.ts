import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlsListaComponent } from './urls-lista/urls-lista.component';
import { UrlsFormComponent } from './urls-form/urls-form.component';
import { UrlResolverGuard } from './url-resolver.guard';


const routes: Routes = [
  {path: '', component: UrlsListaComponent},
  {path: 'nova', component: UrlsFormComponent, resolve: {
    url: UrlResolverGuard
  }},
  {path: 'editar/:id', component: UrlsFormComponent, resolve: {
    url: UrlResolverGuard
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrlsRoutingModule { }
