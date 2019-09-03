import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from './presupuesto.service';

@Component({
  selector: 'jhi-presupuesto-delete-dialog',
  templateUrl: './presupuesto-delete-dialog.component.html'
})
export class PresupuestoDeleteDialogComponent {
  presupuesto: IPresupuesto;

  constructor(
    protected presupuestoService: PresupuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.presupuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'presupuestoListModification',
        content: 'Deleted an presupuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-presupuesto-delete-popup',
  template: ''
})
export class PresupuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ presupuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PresupuestoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.presupuesto = presupuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/presupuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/presupuesto', { outlets: { popup: null } }]);
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
