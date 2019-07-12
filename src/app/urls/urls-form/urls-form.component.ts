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
    let registro = null;
    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadById(id))
    )    
    .subscribe(url => this.updatedForm(url));

    this.form = this.fb.group({
      id: [null],
      urlOriginal: [null, [Validators.required]]
    });
  }

  updatedForm(url) {
    this.form.patchValue({
      id: url.id,
      urlOriginal: url.fullUrl
    });
  };

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.createShortUrl(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('URL criada com sucesso !');
          this.localtion.back();
        },
        error => this.modal.showAlertDanger('Erro ao criar uma URL, tente novamente')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    console.log('cancel');
    this.form.reset();
  }

}
