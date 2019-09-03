import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdenDeCompra } from 'app/shared/model/orden-de-compra.model';
import { OrdenDeCompraService } from './orden-de-compra.service';

@Component({
  selector: 'jhi-orden-de-compra-delete-dialog',
  templateUrl: './orden-de-compra-delete-dialog.component.html'
})
export class OrdenDeCompraDeleteDialogComponent {
  ordenDeCompra: IOrdenDeCompra;

  constructor(
    protected ordenDeCompraService: OrdenDeCompraService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ordenDeCompraService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ordenDeCompraListModification',
        content: 'Deleted an ordenDeCompra'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-orden-de-compra-delete-popup',
  template: ''
})
export class OrdenDeCompraDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordenDeCompra }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrdenDeCompraDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ordenDeCompra = ordenDeCompra;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/orden-de-compra', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/orden-de-compra', { outlets: { popup: null } }]);
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
