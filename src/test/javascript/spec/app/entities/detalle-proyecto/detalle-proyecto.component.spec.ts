/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { DetalleProyectoComponent } from 'app/entities/detalle-proyecto/detalle-proyecto.component';
import { DetalleProyectoService } from 'app/entities/detalle-proyecto/detalle-proyecto.service';
import { DetalleProyecto } from 'app/shared/model/detalle-proyecto.model';

describe('Component Tests', () => {
  describe('DetalleProyecto Management Component', () => {
    let comp: DetalleProyectoComponent;
    let fixture: ComponentFixture<DetalleProyectoComponent>;
    let service: DetalleProyectoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DetalleProyectoComponent],
        providers: []
      })
        .overrideTemplate(DetalleProyectoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleProyectoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleProyectoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DetalleProyecto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.detalleProyectos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
