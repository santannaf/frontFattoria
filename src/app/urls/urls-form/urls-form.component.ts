import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { UrlsService } from '../urls.service';

@Component({
  selector: 'app-urls-form',
  templateUrl: './urls-form.component.html',
  styleUrls: ['./urls-form.component.css']
})
export class UrlsFormComponent implements OnInit {

  form: FormGroup;
  submitted: Boolean = false;

  constructor(private fb: FormBuilder, private service: UrlsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      urlOriginal: [null, [Validators.required]]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.createShortUrl(this.form.value).subscribe(
        success => console.log('success'),
        error => console.log(error)
      );
    }
  }

  onCancel() {
    this.submitted = false;
    console.log('cancel');
    this.form.reset();
  }

}
