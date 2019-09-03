/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { EvaluacionDeProyectoComponent } from 'app/entities/evaluacion-de-proyecto/evaluacion-de-proyecto.component';
import { EvaluacionDeProyectoService } from 'app/entities/evaluacion-de-proyecto/evaluacion-de-proyecto.service';
import { EvaluacionDeProyecto } from 'app/shared/model/evaluacion-de-proyecto.model';

describe('Component Tests', () => {
  describe('EvaluacionDeProyecto Management Component', () => {
    let comp: EvaluacionDeProyectoComponent;
    let fixture: ComponentFixture<EvaluacionDeProyectoComponent>;
    let service: EvaluacionDeProyectoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [EvaluacionDeProyectoComponent],
        providers: []
      })
        .overrideTemplate(EvaluacionDeProyectoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EvaluacionDeProyectoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EvaluacionDeProyectoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EvaluacionDeProyecto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.evaluacionDeProyectos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
