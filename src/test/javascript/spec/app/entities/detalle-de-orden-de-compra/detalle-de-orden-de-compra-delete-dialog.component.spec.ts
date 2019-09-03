/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleDeOrdenDeCompraDeleteDialogComponent } from 'app/entities/detalle-de-orden-de-compra/detalle-de-orden-de-compra-delete-dialog.component';
import { DetalleDeOrdenDeCompraService } from 'app/entities/detalle-de-orden-de-compra/detalle-de-orden-de-compra.service';

describe('Component Tests', () => {
  describe('DetalleDeOrdenDeCompra Management Delete Component', () => {
    let comp: DetalleDeOrdenDeCompraDeleteDialogComponent;
    let fixture: ComponentFixture<DetalleDeOrdenDeCompraDeleteDialogComponent>;
    let service: DetalleDeOrdenDeCompraService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleDeOrdenDeCompraDeleteDialogComponent]
      })
        .overrideTemplate(DetalleDeOrdenDeCompraDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleDeOrdenDeCompraDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleDeOrdenDeCompraService);
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
