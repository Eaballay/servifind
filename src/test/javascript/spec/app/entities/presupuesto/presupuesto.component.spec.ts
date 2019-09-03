/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { PresupuestoComponent } from 'app/entities/presupuesto/presupuesto.component';
import { PresupuestoService } from 'app/entities/presupuesto/presupuesto.service';
import { Presupuesto } from 'app/shared/model/presupuesto.model';

describe('Component Tests', () => {
  describe('Presupuesto Management Component', () => {
    let comp: PresupuestoComponent;
    let fixture: ComponentFixture<PresupuestoComponent>;
    let service: PresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [PresupuestoComponent],
        providers: []
      })
        .overrideTemplate(PresupuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PresupuestoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PresupuestoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Presupuesto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.presupuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
