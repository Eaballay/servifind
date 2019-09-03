/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { AsociadoTareaUpdateComponent } from 'app/entities/asociado-tarea/asociado-tarea-update.component';
import { AsociadoTareaService } from 'app/entities/asociado-tarea/asociado-tarea.service';
import { AsociadoTarea } from 'app/shared/model/asociado-tarea.model';

describe('Component Tests', () => {
  describe('AsociadoTarea Management Update Component', () => {
    let comp: AsociadoTareaUpdateComponent;
    let fixture: ComponentFixture<AsociadoTareaUpdateComponent>;
    let service: AsociadoTareaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [AsociadoTareaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AsociadoTareaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsociadoTareaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsociadoTareaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AsociadoTarea(123);
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
        const entity = new AsociadoTarea();
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
