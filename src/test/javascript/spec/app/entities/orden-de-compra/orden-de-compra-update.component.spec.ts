/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeCompraUpdateComponent } from 'app/entities/orden-de-compra/orden-de-compra-update.component';
import { OrdenDeCompraService } from 'app/entities/orden-de-compra/orden-de-compra.service';
import { OrdenDeCompra } from 'app/shared/model/orden-de-compra.model';

describe('Component Tests', () => {
  describe('OrdenDeCompra Management Update Component', () => {
    let comp: OrdenDeCompraUpdateComponent;
    let fixture: ComponentFixture<OrdenDeCompraUpdateComponent>;
    let service: OrdenDeCompraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeCompraUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrdenDeCompraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdenDeCompraUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeCompraService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrdenDeCompra(123);
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
        const entity = new OrdenDeCompra();
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
