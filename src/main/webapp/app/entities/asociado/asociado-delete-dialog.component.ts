import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAsociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from './asociado.service';

@Component({
  selector: 'jhi-asociado-delete-dialog',
  templateUrl: './asociado-delete-dialog.component.html'
})
export class AsociadoDeleteDialogComponent {
  asociado: IAsociado;

  constructor(protected asociadoService: AsociadoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.asociadoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'asociadoListModification',
        content: 'Deleted an asociado'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-asociado-delete-popup',
  template: ''
})
export class AsociadoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asociado }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AsociadoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.asociado = asociado;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/asociado', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/asociado', { outlets: { popup: null } }]);
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
