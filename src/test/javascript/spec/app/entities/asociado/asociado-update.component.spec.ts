/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { AsociadoUpdateComponent } from 'app/entities/asociado/asociado-update.component';
import { AsociadoService } from 'app/entities/asociado/asociado.service';
import { Asociado } from 'app/shared/model/asociado.model';

describe('Component Tests', () => {
  describe('Asociado Management Update Component', () => {
    let comp: AsociadoUpdateComponent;
    let fixture: ComponentFixture<AsociadoUpdateComponent>;
    let service: AsociadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [AsociadoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AsociadoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsociadoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsociadoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Asociado(123);
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
        const entity = new Asociado();
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
