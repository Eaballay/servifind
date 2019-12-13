/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleProyectoDeleteDialogComponent } from 'app/entities/detalle-proyecto/detalle-proyecto-delete-dialog.component';
import { DetalleProyectoService } from 'app/entities/detalle-proyecto/detalle-proyecto.service';

describe('Component Tests', () => {
  describe('DetalleProyecto Management Delete Component', () => {
    let comp: DetalleProyectoDeleteDialogComponent;
    let fixture: ComponentFixture<DetalleProyectoDeleteDialogComponent>;
    let service: DetalleProyectoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleProyectoDeleteDialogComponent]
      })
        .overrideTemplate(DetalleProyectoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleProyectoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleProyectoService);
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
