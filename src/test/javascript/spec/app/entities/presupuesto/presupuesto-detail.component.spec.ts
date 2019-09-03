/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { PresupuestoDetailComponent } from 'app/entities/presupuesto/presupuesto-detail.component';
import { Presupuesto } from 'app/shared/model/presupuesto.model';

describe('Component Tests', () => {
  describe('Presupuesto Management Detail Component', () => {
    let comp: PresupuestoDetailComponent;
    let fixture: ComponentFixture<PresupuestoDetailComponent>;
    const route = ({ data: of({ presupuesto: new Presupuesto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [PresupuestoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PresupuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PresupuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.presupuesto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
