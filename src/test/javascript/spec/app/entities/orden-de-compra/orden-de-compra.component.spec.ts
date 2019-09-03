/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeCompraComponent } from 'app/entities/orden-de-compra/orden-de-compra.component';
import { OrdenDeCompraService } from 'app/entities/orden-de-compra/orden-de-compra.service';
import { OrdenDeCompra } from 'app/shared/model/orden-de-compra.model';

describe('Component Tests', () => {
  describe('OrdenDeCompra Management Component', () => {
    let comp: OrdenDeCompraComponent;
    let fixture: ComponentFixture<OrdenDeCompraComponent>;
    let service: OrdenDeCompraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeCompraComponent],
        providers: []
      })
        .overrideTemplate(OrdenDeCompraComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdenDeCompraComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeCompraService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrdenDeCompra(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ordenDeCompras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
