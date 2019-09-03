/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleDePresupuestoDetailComponent } from 'app/entities/detalle-de-presupuesto/detalle-de-presupuesto-detail.component';
import { DetalleDePresupuesto } from 'app/shared/model/detalle-de-presupuesto.model';

describe('Component Tests', () => {
  describe('DetalleDePresupuesto Management Detail Component', () => {
    let comp: DetalleDePresupuestoDetailComponent;
    let fixture: ComponentFixture<DetalleDePresupuestoDetailComponent>;
    const route = ({ data: of({ detalleDePresupuesto: new DetalleDePresupuesto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleDePresupuestoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DetalleDePresupuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleDePresupuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detalleDePresupuesto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
