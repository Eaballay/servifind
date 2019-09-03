/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { EvaluacionDeProyectoUpdateComponent } from 'app/entities/evaluacion-de-proyecto/evaluacion-de-proyecto-update.component';
import { EvaluacionDeProyectoService } from 'app/entities/evaluacion-de-proyecto/evaluacion-de-proyecto.service';
import { EvaluacionDeProyecto } from 'app/shared/model/evaluacion-de-proyecto.model';

describe('Component Tests', () => {
  describe('EvaluacionDeProyecto Management Update Component', () => {
    let comp: EvaluacionDeProyectoUpdateComponent;
    let fixture: ComponentFixture<EvaluacionDeProyectoUpdateComponent>;
    let service: EvaluacionDeProyectoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [EvaluacionDeProyectoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EvaluacionDeProyectoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EvaluacionDeProyectoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EvaluacionDeProyectoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EvaluacionDeProyecto(123);
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
        const entity = new EvaluacionDeProyecto();
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
