/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeRelevamientoComponent } from 'app/entities/orden-de-relevamiento/orden-de-relevamiento.component';
import { OrdenDeRelevamientoService } from 'app/entities/orden-de-relevamiento/orden-de-relevamiento.service';
import { OrdenDeRelevamiento } from 'app/shared/model/orden-de-relevamiento.model';

describe('Component Tests', () => {
  describe('OrdenDeRelevamiento Management Component', () => {
    let comp: OrdenDeRelevamientoComponent;
    let fixture: ComponentFixture<OrdenDeRelevamientoComponent>;
    let service: OrdenDeRelevamientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeRelevamientoComponent],
        providers: []
      })
        .overrideTemplate(OrdenDeRelevamientoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdenDeRelevamientoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeRelevamientoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrdenDeRelevamiento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ordenDeRelevamientos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
