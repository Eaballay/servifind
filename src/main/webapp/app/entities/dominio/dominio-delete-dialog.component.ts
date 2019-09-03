import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from './dominio.service';

@Component({
  selector: 'jhi-dominio-delete-dialog',
  templateUrl: './dominio-delete-dialog.component.html'
})
export class DominioDeleteDialogComponent {
  dominio: IDominio;

  constructor(protected dominioService: DominioService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dominioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dominioListModification',
        content: 'Deleted an dominio'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-dominio-delete-popup',
  template: ''
})
export class DominioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dominio }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DominioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dominio = dominio;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dominio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dominio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
