/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { EvaluacionDeProyectoDetailComponent } from 'app/entities/evaluacion-de-proyecto/evaluacion-de-proyecto-detail.component';
import { EvaluacionDeProyecto } from 'app/shared/model/evaluacion-de-proyecto.model';

describe('Component Tests', () => {
  describe('EvaluacionDeProyecto Management Detail Component', () => {
    let comp: EvaluacionDeProyectoDetailComponent;
    let fixture: ComponentFixture<EvaluacionDeProyectoDetailComponent>;
    const route = ({ data: of({ evaluacionDeProyecto: new EvaluacionDeProyecto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [EvaluacionDeProyectoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EvaluacionDeProyectoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EvaluacionDeProyectoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.evaluacionDeProyecto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
