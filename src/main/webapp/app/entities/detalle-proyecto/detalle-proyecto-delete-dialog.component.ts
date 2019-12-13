import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetalleProyecto } from 'app/shared/model/detalle-proyecto.model';
import { DetalleProyectoService } from './detalle-proyecto.service';

@Component({
  selector: 'jhi-detalle-proyecto-delete-dialog',
  templateUrl: './detalle-proyecto-delete-dialog.component.html'
})
export class DetalleProyectoDeleteDialogComponent {
  detalleProyecto: IDetalleProyecto;

  constructor(
    protected detalleProyectoService: DetalleProyectoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.detalleProyectoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'detalleProyectoListModification',
        content: 'Deleted an detalleProyecto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-detalle-proyecto-delete-popup',
  template: ''
})
export class DetalleProyectoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detalleProyecto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DetalleProyectoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.detalleProyecto = detalleProyecto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/detalle-proyecto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/detalle-proyecto', { outlets: { popup: null } }]);
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
