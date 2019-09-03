import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetalleDePresupuesto } from 'app/shared/model/detalle-de-presupuesto.model';
import { DetalleDePresupuestoService } from './detalle-de-presupuesto.service';

@Component({
  selector: 'jhi-detalle-de-presupuesto-delete-dialog',
  templateUrl: './detalle-de-presupuesto-delete-dialog.component.html'
})
export class DetalleDePresupuestoDeleteDialogComponent {
  detalleDePresupuesto: IDetalleDePresupuesto;

  constructor(
    protected detalleDePresupuestoService: DetalleDePresupuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.detalleDePresupuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'detalleDePresupuestoListModification',
        content: 'Deleted an detalleDePresupuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-detalle-de-presupuesto-delete-popup',
  template: ''
})
export class DetalleDePresupuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detalleDePresupuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DetalleDePresupuestoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.detalleDePresupuesto = detalleDePresupuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/detalle-de-presupuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/detalle-de-presupuesto', { outlets: { popup: null } }]);
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
