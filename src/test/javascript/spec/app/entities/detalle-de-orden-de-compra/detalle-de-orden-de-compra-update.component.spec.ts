/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleDeOrdenDeCompraUpdateComponent } from 'app/entities/detalle-de-orden-de-compra/detalle-de-orden-de-compra-update.component';
import { DetalleDeOrdenDeCompraService } from 'app/entities/detalle-de-orden-de-compra/detalle-de-orden-de-compra.service';
import { DetalleDeOrdenDeCompra } from 'app/shared/model/detalle-de-orden-de-compra.model';

describe('Component Tests', () => {
  describe('DetalleDeOrdenDeCompra Management Update Component', () => {
    let comp: DetalleDeOrdenDeCompraUpdateComponent;
    let fixture: ComponentFixture<DetalleDeOrdenDeCompraUpdateComponent>;
    let service: DetalleDeOrdenDeCompraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleDeOrdenDeCompraUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DetalleDeOrdenDeCompraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleDeOrdenDeCompraUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleDeOrdenDeCompraService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetalleDeOrdenDeCompra(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetalleDeOrdenDeCompra();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
