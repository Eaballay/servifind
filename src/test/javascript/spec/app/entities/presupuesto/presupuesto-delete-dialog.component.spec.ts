/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ServiFindTestModule } from '../../../test.module';
import { PresupuestoDeleteDialogComponent } from 'app/entities/presupuesto/presupuesto-delete-dialog.component';
import { PresupuestoService } from 'app/entities/presupuesto/presupuesto.service';

describe('Component Tests', () => {
  describe('Presupuesto Management Delete Component', () => {
    let comp: PresupuestoDeleteDialogComponent;
    let fixture: ComponentFixture<PresupuestoDeleteDialogComponent>;
    let service: PresupuestoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [PresupuestoDeleteDialogComponent]
      })
        .overrideTemplate(PresupuestoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PresupuestoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PresupuestoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
