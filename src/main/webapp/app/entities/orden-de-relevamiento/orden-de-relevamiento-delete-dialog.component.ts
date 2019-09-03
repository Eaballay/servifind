import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdenDeRelevamiento } from 'app/shared/model/orden-de-relevamiento.model';
import { OrdenDeRelevamientoService } from './orden-de-relevamiento.service';

@Component({
  selector: 'jhi-orden-de-relevamiento-delete-dialog',
  templateUrl: './orden-de-relevamiento-delete-dialog.component.html'
})
export class OrdenDeRelevamientoDeleteDialogComponent {
  ordenDeRelevamiento: IOrdenDeRelevamiento;

  constructor(
    protected ordenDeRelevamientoService: OrdenDeRelevamientoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ordenDeRelevamientoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ordenDeRelevamientoListModification',
        content: 'Deleted an ordenDeRelevamiento'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-orden-de-relevamiento-delete-popup',
  template: ''
})
export class OrdenDeRelevamientoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordenDeRelevamiento }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrdenDeRelevamientoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.ordenDeRelevamiento = ordenDeRelevamiento;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/orden-de-relevamiento', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/orden-de-relevamiento', { outlets: { popup: null } }]);
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
