/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeTrabajoComponent } from 'app/entities/orden-de-trabajo/orden-de-trabajo.component';
import { OrdenDeTrabajoService } from 'app/entities/orden-de-trabajo/orden-de-trabajo.service';
import { OrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';

describe('Component Tests', () => {
  describe('OrdenDeTrabajo Management Component', () => {
    let comp: OrdenDeTrabajoComponent;
    let fixture: ComponentFixture<OrdenDeTrabajoComponent>;
    let service: OrdenDeTrabajoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeTrabajoComponent],
        providers: []
      })
        .overrideTemplate(OrdenDeTrabajoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdenDeTrabajoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeTrabajoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrdenDeTrabajo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ordenDeTrabajos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
