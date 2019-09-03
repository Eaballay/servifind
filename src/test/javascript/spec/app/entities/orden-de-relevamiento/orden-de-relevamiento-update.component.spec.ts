/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeRelevamientoUpdateComponent } from 'app/entities/orden-de-relevamiento/orden-de-relevamiento-update.component';
import { OrdenDeRelevamientoService } from 'app/entities/orden-de-relevamiento/orden-de-relevamiento.service';
import { OrdenDeRelevamiento } from 'app/shared/model/orden-de-relevamiento.model';

describe('Component Tests', () => {
  describe('OrdenDeRelevamiento Management Update Component', () => {
    let comp: OrdenDeRelevamientoUpdateComponent;
    let fixture: ComponentFixture<OrdenDeRelevamientoUpdateComponent>;
    let service: OrdenDeRelevamientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeRelevamientoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrdenDeRelevamientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdenDeRelevamientoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeRelevamientoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrdenDeRelevamiento(123);
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
        const entity = new OrdenDeRelevamiento();
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
