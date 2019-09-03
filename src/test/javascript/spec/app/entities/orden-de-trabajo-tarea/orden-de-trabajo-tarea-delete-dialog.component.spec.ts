/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeTrabajoTareaDeleteDialogComponent } from 'app/entities/orden-de-trabajo-tarea/orden-de-trabajo-tarea-delete-dialog.component';
import { OrdenDeTrabajoTareaService } from 'app/entities/orden-de-trabajo-tarea/orden-de-trabajo-tarea.service';

describe('Component Tests', () => {
  describe('OrdenDeTrabajoTarea Management Delete Component', () => {
    let comp: OrdenDeTrabajoTareaDeleteDialogComponent;
    let fixture: ComponentFixture<OrdenDeTrabajoTareaDeleteDialogComponent>;
    let service: OrdenDeTrabajoTareaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeTrabajoTareaDeleteDialogComponent]
      })
        .overrideTemplate(OrdenDeTrabajoTareaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdenDeTrabajoTareaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeTrabajoTareaService);
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
