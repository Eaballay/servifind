/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleDeOrdenDeCompraComponent } from 'app/entities/detalle-de-orden-de-compra/detalle-de-orden-de-compra.component';
import { DetalleDeOrdenDeCompraService } from 'app/entities/detalle-de-orden-de-compra/detalle-de-orden-de-compra.service';
import { DetalleDeOrdenDeCompra } from 'app/shared/model/detalle-de-orden-de-compra.model';

describe('Component Tests', () => {
  describe('DetalleDeOrdenDeCompra Management Component', () => {
    let comp: DetalleDeOrdenDeCompraComponent;
    let fixture: ComponentFixture<DetalleDeOrdenDeCompraComponent>;
    let service: DetalleDeOrdenDeCompraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleDeOrdenDeCompraComponent],
        providers: []
      })
        .overrideTemplate(DetalleDeOrdenDeCompraComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleDeOrdenDeCompraComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleDeOrdenDeCompraService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DetalleDeOrdenDeCompra(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.detalleDeOrdenDeCompras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
