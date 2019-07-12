import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { Url } from '../url';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-urls-lista',
  templateUrl: './urls-lista.component.html',
  styleUrls: ['./urls-lista.component.css'],
  preserveWhitespaces: true
})
export class UrlsListaComponent implements OnInit {

  bsModalRef: BsModalRef;
  urls$: Observable<Url[]>;
  error$ = new Subject<boolean>();

  constructor(private service: UrlsService, private alertServices: AlertModalService) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.urls$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          this.handleError();
          return empty();
        })
      );
  }

  handleError() {
    this.alertServices.showAlertDanger('Erro ao carregar URLs');
  }

}
