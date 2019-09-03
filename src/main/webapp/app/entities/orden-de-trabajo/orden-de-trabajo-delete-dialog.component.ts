import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';
import { OrdenDeTrabajoService } from './orden-de-trabajo.service';

@Component({
  selector: 'jhi-orden-de-trabajo-delete-dialog',
  templateUrl: './orden-de-trabajo-delete-dialog.component.html'
})
export class OrdenDeTrabajoDeleteDialogComponent {
  ordenDeTrabajo: IOrdenDeTrabajo;

  constructor(
    protected ordenDeTrabajoService: OrdenDeTrabajoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ordenDeTrabajoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ordenDeTrabajoListModification',
        content: 'Deleted an ordenDeTrabajo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-orden-de-trabajo-delete-popup',
  template: ''
})
export class OrdenDeTrabajoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordenDeTrabajo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrdenDeTrabajoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ordenDeTrabajo = ordenDeTrabajo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/orden-de-trabajo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/orden-de-trabajo', { outlets: { popup: null } }]);
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
