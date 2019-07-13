import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlsService } from '../urls.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-urls-form',
  templateUrl: './urls-form.component.html',
  styleUrls: ['./urls-form.component.css']
})
export class UrlsFormComponent implements OnInit {

  form: FormGroup;
  submitted: Boolean = false;

  constructor(private fb: FormBuilder,
              private service: UrlsService,
              private modal: AlertModalService,
              private localtion: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const url = this.route.snapshot.data.url;

    this.form = this.fb.group({
      id: [url.id],
      urlOriginal: [url.fullUrl, [Validators.required]]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.value.id) {
        this.service.updatedUrl(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('URL atualizada com sucesso !');
            this.localtion.back();
          },
          error => this.modal.showAlertDanger('Erro ao atualizar uma URL, tente novamente')
        );
      } else {
        this.service.createShortUrl(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('URL criada com sucesso !');
            this.localtion.back();
          },
          error => this.modal.showAlertDanger('Erro ao criar uma URL, tente novamente')
        );
      }
    }
  }

  onCancel() {
    this.submitted = false;
    console.log('cancel');
    this.form.reset();
  }

}
