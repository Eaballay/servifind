/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { ProyectoComponent } from 'app/entities/proyecto/proyecto.component';
import { ProyectoService } from 'app/entities/proyecto/proyecto.service';
import { Proyecto } from 'app/shared/model/proyecto.model';

describe('Component Tests', () => {
  describe('Proyecto Management Component', () => {
    let comp: ProyectoComponent;
    let fixture: ComponentFixture<ProyectoComponent>;
    let service: ProyectoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [ProyectoComponent],
        providers: []
      })
        .overrideTemplate(ProyectoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProyectoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProyectoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Proyecto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.proyectos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
