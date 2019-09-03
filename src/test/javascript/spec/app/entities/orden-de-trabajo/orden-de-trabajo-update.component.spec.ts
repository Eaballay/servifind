/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeTrabajoUpdateComponent } from 'app/entities/orden-de-trabajo/orden-de-trabajo-update.component';
import { OrdenDeTrabajoService } from 'app/entities/orden-de-trabajo/orden-de-trabajo.service';
import { OrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';

describe('Component Tests', () => {
  describe('OrdenDeTrabajo Management Update Component', () => {
    let comp: OrdenDeTrabajoUpdateComponent;
    let fixture: ComponentFixture<OrdenDeTrabajoUpdateComponent>;
    let service: OrdenDeTrabajoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeTrabajoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrdenDeTrabajoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdenDeTrabajoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeTrabajoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrdenDeTrabajo(123);
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
        const entity = new OrdenDeTrabajo();
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
