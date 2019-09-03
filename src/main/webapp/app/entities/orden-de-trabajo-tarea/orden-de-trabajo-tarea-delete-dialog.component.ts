import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdenDeTrabajoTarea } from 'app/shared/model/orden-de-trabajo-tarea.model';
import { OrdenDeTrabajoTareaService } from './orden-de-trabajo-tarea.service';

@Component({
  selector: 'jhi-orden-de-trabajo-tarea-delete-dialog',
  templateUrl: './orden-de-trabajo-tarea-delete-dialog.component.html'
})
export class OrdenDeTrabajoTareaDeleteDialogComponent {
  ordenDeTrabajoTarea: IOrdenDeTrabajoTarea;

  constructor(
    protected ordenDeTrabajoTareaService: OrdenDeTrabajoTareaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ordenDeTrabajoTareaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ordenDeTrabajoTareaListModification',
        content: 'Deleted an ordenDeTrabajoTarea'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-orden-de-trabajo-tarea-delete-popup',
  template: ''
})
export class OrdenDeTrabajoTareaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordenDeTrabajoTarea }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrdenDeTrabajoTareaDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.ordenDeTrabajoTarea = ordenDeTrabajoTarea;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/orden-de-trabajo-tarea', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/orden-de-trabajo-tarea', { outlets: { popup: null } }]);
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
