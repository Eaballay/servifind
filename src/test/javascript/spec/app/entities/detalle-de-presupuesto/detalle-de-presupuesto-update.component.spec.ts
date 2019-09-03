/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleDePresupuestoUpdateComponent } from 'app/entities/detalle-de-presupuesto/detalle-de-presupuesto-update.component';
import { DetalleDePresupuestoService } from 'app/entities/detalle-de-presupuesto/detalle-de-presupuesto.service';
import { DetalleDePresupuesto } from 'app/shared/model/detalle-de-presupuesto.model';

describe('Component Tests', () => {
  describe('DetalleDePresupuesto Management Update Component', () => {
    let comp: DetalleDePresupuestoUpdateComponent;
    let fixture: ComponentFixture<DetalleDePresupuestoUpdateComponent>;
    let service: DetalleDePresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleDePresupuestoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DetalleDePresupuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleDePresupuestoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleDePresupuestoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetalleDePresupuesto(123);
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
        const entity = new DetalleDePresupuesto();
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
