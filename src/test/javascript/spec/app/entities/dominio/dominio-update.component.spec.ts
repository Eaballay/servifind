/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { DominioUpdateComponent } from 'app/entities/dominio/dominio-update.component';
import { DominioService } from 'app/entities/dominio/dominio.service';
import { Dominio } from 'app/shared/model/dominio.model';

describe('Component Tests', () => {
  describe('Dominio Management Update Component', () => {
    let comp: DominioUpdateComponent;
    let fixture: ComponentFixture<DominioUpdateComponent>;
    let service: DominioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DominioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DominioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DominioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DominioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dominio(123);
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
        const entity = new Dominio();
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
