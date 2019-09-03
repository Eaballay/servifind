/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { RolEmpleadoComponent } from 'app/entities/rol-empleado/rol-empleado.component';
import { RolEmpleadoService } from 'app/entities/rol-empleado/rol-empleado.service';
import { RolEmpleado } from 'app/shared/model/rol-empleado.model';

describe('Component Tests', () => {
  describe('RolEmpleado Management Component', () => {
    let comp: RolEmpleadoComponent;
    let fixture: ComponentFixture<RolEmpleadoComponent>;
    let service: RolEmpleadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [RolEmpleadoComponent],
        providers: []
      })
        .overrideTemplate(RolEmpleadoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RolEmpleadoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RolEmpleadoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RolEmpleado(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rolEmpleados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
