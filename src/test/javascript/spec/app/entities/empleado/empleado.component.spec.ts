/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { EmpleadoComponent } from 'app/entities/empleado/empleado.component';
import { EmpleadoService } from 'app/entities/empleado/empleado.service';
import { Empleado } from 'app/shared/model/empleado.model';

describe('Component Tests', () => {
  describe('Empleado Management Component', () => {
    let comp: EmpleadoComponent;
    let fixture: ComponentFixture<EmpleadoComponent>;
    let service: EmpleadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [EmpleadoComponent],
        providers: []
      })
        .overrideTemplate(EmpleadoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmpleadoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmpleadoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Empleado(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.empleados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
