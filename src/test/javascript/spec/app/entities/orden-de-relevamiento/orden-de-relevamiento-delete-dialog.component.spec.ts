/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeRelevamientoDeleteDialogComponent } from 'app/entities/orden-de-relevamiento/orden-de-relevamiento-delete-dialog.component';
import { OrdenDeRelevamientoService } from 'app/entities/orden-de-relevamiento/orden-de-relevamiento.service';

describe('Component Tests', () => {
  describe('OrdenDeRelevamiento Management Delete Component', () => {
    let comp: OrdenDeRelevamientoDeleteDialogComponent;
    let fixture: ComponentFixture<OrdenDeRelevamientoDeleteDialogComponent>;
    let service: OrdenDeRelevamientoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeRelevamientoDeleteDialogComponent]
      })
        .overrideTemplate(OrdenDeRelevamientoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdenDeRelevamientoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeRelevamientoService);
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
