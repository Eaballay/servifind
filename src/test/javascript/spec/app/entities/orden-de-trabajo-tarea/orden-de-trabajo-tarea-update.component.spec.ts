/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeTrabajoTareaUpdateComponent } from 'app/entities/orden-de-trabajo-tarea/orden-de-trabajo-tarea-update.component';
import { OrdenDeTrabajoTareaService } from 'app/entities/orden-de-trabajo-tarea/orden-de-trabajo-tarea.service';
import { OrdenDeTrabajoTarea } from 'app/shared/model/orden-de-trabajo-tarea.model';

describe('Component Tests', () => {
  describe('OrdenDeTrabajoTarea Management Update Component', () => {
    let comp: OrdenDeTrabajoTareaUpdateComponent;
    let fixture: ComponentFixture<OrdenDeTrabajoTareaUpdateComponent>;
    let service: OrdenDeTrabajoTareaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeTrabajoTareaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrdenDeTrabajoTareaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdenDeTrabajoTareaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeTrabajoTareaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrdenDeTrabajoTarea(123);
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
        const entity = new OrdenDeTrabajoTarea();
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
