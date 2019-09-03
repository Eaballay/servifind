/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleDeOrdenDeCompraDetailComponent } from 'app/entities/detalle-de-orden-de-compra/detalle-de-orden-de-compra-detail.component';
import { DetalleDeOrdenDeCompra } from 'app/shared/model/detalle-de-orden-de-compra.model';

describe('Component Tests', () => {
  describe('DetalleDeOrdenDeCompra Management Detail Component', () => {
    let comp: DetalleDeOrdenDeCompraDetailComponent;
    let fixture: ComponentFixture<DetalleDeOrdenDeCompraDetailComponent>;
    const route = ({ data: of({ detalleDeOrdenDeCompra: new DetalleDeOrdenDeCompra(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleDeOrdenDeCompraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DetalleDeOrdenDeCompraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleDeOrdenDeCompraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detalleDeOrdenDeCompra).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
