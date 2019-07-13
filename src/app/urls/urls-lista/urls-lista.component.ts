import { Component, OnInit, ViewChild } from '@angular/core';
import { UrlsService } from '../urls.service';
import { Url } from '../url';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-urls-lista',
  templateUrl: './urls-lista.component.html',
  styleUrls: ['./urls-lista.component.css'],
  preserveWhitespaces: true
})
export class UrlsListaComponent implements OnInit {

  deleteModalRef: BsModalRef;

  @ViewChild('deleteModal', { static: false }) deleteModal;

  urls$: Observable<Url[]>;
  error$ = new Subject<boolean>();

  urlSelected: Url;

  constructor(private service: UrlsService, private alertServices: AlertModalService,
    private router: Router, private route: ActivatedRoute, private modalService: BsModalService) { }

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

  onEdit(id) {
    this.router.navigate([`editar`, id], { relativeTo: this.route });
  }

  onDelete(url) {
    this.urlSelected = url;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onConfirmDelete() {
    console.log(this.urlSelected.id);
    this.service.deleteurl(this.urlSelected.id)
      .subscribe(
        success => this.onRefresh(),
        error => this.alertServices.showAlertDanger('Erro ao excluir URLs'),
        () => this.onDeclineDelete()
      );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
