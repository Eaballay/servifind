/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleDePresupuestoComponent } from 'app/entities/detalle-de-presupuesto/detalle-de-presupuesto.component';
import { DetalleDePresupuestoService } from 'app/entities/detalle-de-presupuesto/detalle-de-presupuesto.service';
import { DetalleDePresupuesto } from 'app/shared/model/detalle-de-presupuesto.model';

describe('Component Tests', () => {
  describe('DetalleDePresupuesto Management Component', () => {
    let comp: DetalleDePresupuestoComponent;
    let fixture: ComponentFixture<DetalleDePresupuestoComponent>;
    let service: DetalleDePresupuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleDePresupuestoComponent],
        providers: []
      })
        .overrideTemplate(DetalleDePresupuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleDePresupuestoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleDePresupuestoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DetalleDePresupuesto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.detalleDePresupuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
