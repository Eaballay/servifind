/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { RolEmpleadoUpdateComponent } from 'app/entities/rol-empleado/rol-empleado-update.component';
import { RolEmpleadoService } from 'app/entities/rol-empleado/rol-empleado.service';
import { RolEmpleado } from 'app/shared/model/rol-empleado.model';

describe('Component Tests', () => {
  describe('RolEmpleado Management Update Component', () => {
    let comp: RolEmpleadoUpdateComponent;
    let fixture: ComponentFixture<RolEmpleadoUpdateComponent>;
    let service: RolEmpleadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [RolEmpleadoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RolEmpleadoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RolEmpleadoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RolEmpleadoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RolEmpleado(123);
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
        const entity = new RolEmpleado();
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
