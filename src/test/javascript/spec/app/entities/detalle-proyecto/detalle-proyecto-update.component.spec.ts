/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleProyectoUpdateComponent } from 'app/entities/detalle-proyecto/detalle-proyecto-update.component';
import { DetalleProyectoService } from 'app/entities/detalle-proyecto/detalle-proyecto.service';
import { DetalleProyecto } from 'app/shared/model/detalle-proyecto.model';

describe('Component Tests', () => {
  describe('DetalleProyecto Management Update Component', () => {
    let comp: DetalleProyectoUpdateComponent;
    let fixture: ComponentFixture<DetalleProyectoUpdateComponent>;
    let service: DetalleProyectoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleProyectoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DetalleProyectoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleProyectoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleProyectoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetalleProyecto(123);
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
        const entity = new DetalleProyecto();
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
