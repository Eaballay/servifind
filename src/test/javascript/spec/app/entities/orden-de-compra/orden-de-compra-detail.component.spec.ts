/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeCompraDetailComponent } from 'app/entities/orden-de-compra/orden-de-compra-detail.component';
import { OrdenDeCompra } from 'app/shared/model/orden-de-compra.model';

describe('Component Tests', () => {
  describe('OrdenDeCompra Management Detail Component', () => {
    let comp: OrdenDeCompraDetailComponent;
    let fixture: ComponentFixture<OrdenDeCompraDetailComponent>;
    const route = ({ data: of({ ordenDeCompra: new OrdenDeCompra(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeCompraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrdenDeCompraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdenDeCompraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ordenDeCompra).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
