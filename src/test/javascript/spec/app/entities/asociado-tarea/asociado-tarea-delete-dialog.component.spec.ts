/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ServiFindTestModule } from '../../../test.module';
import { AsociadoTareaDeleteDialogComponent } from 'app/entities/asociado-tarea/asociado-tarea-delete-dialog.component';
import { AsociadoTareaService } from 'app/entities/asociado-tarea/asociado-tarea.service';

describe('Component Tests', () => {
  describe('AsociadoTarea Management Delete Component', () => {
    let comp: AsociadoTareaDeleteDialogComponent;
    let fixture: ComponentFixture<AsociadoTareaDeleteDialogComponent>;
    let service: AsociadoTareaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [AsociadoTareaDeleteDialogComponent]
      })
        .overrideTemplate(AsociadoTareaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsociadoTareaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsociadoTareaService);
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
