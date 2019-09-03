import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEvaluacionDeProyecto } from 'app/shared/model/evaluacion-de-proyecto.model';
import { EvaluacionDeProyectoService } from './evaluacion-de-proyecto.service';

@Component({
  selector: 'jhi-evaluacion-de-proyecto-delete-dialog',
  templateUrl: './evaluacion-de-proyecto-delete-dialog.component.html'
})
export class EvaluacionDeProyectoDeleteDialogComponent {
  evaluacionDeProyecto: IEvaluacionDeProyecto;

  constructor(
    protected evaluacionDeProyectoService: EvaluacionDeProyectoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.evaluacionDeProyectoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'evaluacionDeProyectoListModification',
        content: 'Deleted an evaluacionDeProyecto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-evaluacion-de-proyecto-delete-popup',
  template: ''
})
export class EvaluacionDeProyectoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ evaluacionDeProyecto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EvaluacionDeProyectoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.evaluacionDeProyecto = evaluacionDeProyecto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/evaluacion-de-proyecto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/evaluacion-de-proyecto', { outlets: { popup: null } }]);
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
