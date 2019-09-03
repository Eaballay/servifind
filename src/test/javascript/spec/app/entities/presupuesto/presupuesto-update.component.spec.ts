/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { PresupuestoUpdateComponent } from 'app/entities/presupuesto/presupuesto-update.component';
import { PresupuestoService } from 'app/entities/presupuesto/presupuesto.service';
import { Presupuesto } from 'app/shared/model/presupuesto.model';

describe('Component Tests', () => {
  describe('Presupuesto Management Update Component', () => {
    let comp: PresupuestoUpdateComponent;
    let fixture: ComponentFixture<PresupuestoUpdateComponent>;
    let service: PresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [PresupuestoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PresupuestoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PresupuestoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PresupuestoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Presupuesto(123);
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
        const entity = new Presupuesto();
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
