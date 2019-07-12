import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlsRoutingModule } from './urls-routing.module';
import { UrlsListaComponent } from './urls-lista/urls-lista.component';
import { UrlsFormComponent } from './urls-form/urls-form.component';
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [UrlsListaComponent, UrlsFormComponent],
  imports: [
    CommonModule,
    UrlsRoutingModule,
    ReactiveFormsModule
  ]
})
export class UrlsModule { }
