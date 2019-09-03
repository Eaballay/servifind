/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ServiFindTestModule } from '../../../test.module';
import { EvaluacionDeProyectoDeleteDialogComponent } from 'app/entities/evaluacion-de-proyecto/evaluacion-de-proyecto-delete-dialog.component';
import { EvaluacionDeProyectoService } from 'app/entities/evaluacion-de-proyecto/evaluacion-de-proyecto.service';

describe('Component Tests', () => {
  describe('EvaluacionDeProyecto Management Delete Component', () => {
    let comp: EvaluacionDeProyectoDeleteDialogComponent;
    let fixture: ComponentFixture<EvaluacionDeProyectoDeleteDialogComponent>;
    let service: EvaluacionDeProyectoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [EvaluacionDeProyectoDeleteDialogComponent]
      })
        .overrideTemplate(EvaluacionDeProyectoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EvaluacionDeProyectoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EvaluacionDeProyectoService);
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
