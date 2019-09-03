/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeTrabajoDeleteDialogComponent } from 'app/entities/orden-de-trabajo/orden-de-trabajo-delete-dialog.component';
import { OrdenDeTrabajoService } from 'app/entities/orden-de-trabajo/orden-de-trabajo.service';

describe('Component Tests', () => {
  describe('OrdenDeTrabajo Management Delete Component', () => {
    let comp: OrdenDeTrabajoDeleteDialogComponent;
    let fixture: ComponentFixture<OrdenDeTrabajoDeleteDialogComponent>;
    let service: OrdenDeTrabajoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeTrabajoDeleteDialogComponent]
      })
        .overrideTemplate(OrdenDeTrabajoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdenDeTrabajoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeTrabajoService);
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
