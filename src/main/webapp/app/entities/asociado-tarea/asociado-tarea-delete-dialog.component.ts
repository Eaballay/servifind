import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAsociadoTarea } from 'app/shared/model/asociado-tarea.model';
import { AsociadoTareaService } from './asociado-tarea.service';

@Component({
  selector: 'jhi-asociado-tarea-delete-dialog',
  templateUrl: './asociado-tarea-delete-dialog.component.html'
})
export class AsociadoTareaDeleteDialogComponent {
  asociadoTarea: IAsociadoTarea;

  constructor(
    protected asociadoTareaService: AsociadoTareaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.asociadoTareaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'asociadoTareaListModification',
        content: 'Deleted an asociadoTarea'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-asociado-tarea-delete-popup',
  template: ''
})
export class AsociadoTareaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asociadoTarea }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AsociadoTareaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.asociadoTarea = asociadoTarea;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/asociado-tarea', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/asociado-tarea', { outlets: { popup: null } }]);
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
