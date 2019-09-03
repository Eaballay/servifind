import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRolEmpleado } from 'app/shared/model/rol-empleado.model';
import { RolEmpleadoService } from './rol-empleado.service';

@Component({
  selector: 'jhi-rol-empleado-delete-dialog',
  templateUrl: './rol-empleado-delete-dialog.component.html'
})
export class RolEmpleadoDeleteDialogComponent {
  rolEmpleado: IRolEmpleado;

  constructor(
    protected rolEmpleadoService: RolEmpleadoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rolEmpleadoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rolEmpleadoListModification',
        content: 'Deleted an rolEmpleado'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rol-empleado-delete-popup',
  template: ''
})
export class RolEmpleadoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rolEmpleado }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RolEmpleadoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rolEmpleado = rolEmpleado;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/rol-empleado', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/rol-empleado', { outlets: { popup: null } }]);
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
