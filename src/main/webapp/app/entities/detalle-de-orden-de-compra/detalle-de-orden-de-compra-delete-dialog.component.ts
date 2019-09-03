import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetalleDeOrdenDeCompra } from 'app/shared/model/detalle-de-orden-de-compra.model';
import { DetalleDeOrdenDeCompraService } from './detalle-de-orden-de-compra.service';

@Component({
  selector: 'jhi-detalle-de-orden-de-compra-delete-dialog',
  templateUrl: './detalle-de-orden-de-compra-delete-dialog.component.html'
})
export class DetalleDeOrdenDeCompraDeleteDialogComponent {
  detalleDeOrdenDeCompra: IDetalleDeOrdenDeCompra;

  constructor(
    protected detalleDeOrdenDeCompraService: DetalleDeOrdenDeCompraService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.detalleDeOrdenDeCompraService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'detalleDeOrdenDeCompraListModification',
        content: 'Deleted an detalleDeOrdenDeCompra'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-detalle-de-orden-de-compra-delete-popup',
  template: ''
})
export class DetalleDeOrdenDeCompraDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detalleDeOrdenDeCompra }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DetalleDeOrdenDeCompraDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.detalleDeOrdenDeCompra = detalleDeOrdenDeCompra;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/detalle-de-orden-de-compra', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/detalle-de-orden-de-compra', { outlets: { popup: null } }]);
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
