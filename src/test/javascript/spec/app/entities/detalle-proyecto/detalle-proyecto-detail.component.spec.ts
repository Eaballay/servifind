/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleProyectoDetailComponent } from 'app/entities/detalle-proyecto/detalle-proyecto-detail.component';
import { DetalleProyecto } from 'app/shared/model/detalle-proyecto.model';

describe('Component Tests', () => {
  describe('DetalleProyecto Management Detail Component', () => {
    let comp: DetalleProyectoDetailComponent;
    let fixture: ComponentFixture<DetalleProyectoDetailComponent>;
    const route = ({ data: of({ detalleProyecto: new DetalleProyecto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleProyectoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DetalleProyectoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleProyectoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detalleProyecto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
