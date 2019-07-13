import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UrlsRoutingModule } from "./urls-routing.module";
import { UrlsListaComponent } from "./urls-lista/urls-lista.component";
import { UrlsFormComponent } from "./urls-form/urls-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [UrlsListaComponent, UrlsFormComponent],
  imports: [
    CommonModule,
    UrlsRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class UrlsModule {}
