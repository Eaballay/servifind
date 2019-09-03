/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeTrabajoTareaComponent } from 'app/entities/orden-de-trabajo-tarea/orden-de-trabajo-tarea.component';
import { OrdenDeTrabajoTareaService } from 'app/entities/orden-de-trabajo-tarea/orden-de-trabajo-tarea.service';
import { OrdenDeTrabajoTarea } from 'app/shared/model/orden-de-trabajo-tarea.model';

describe('Component Tests', () => {
  describe('OrdenDeTrabajoTarea Management Component', () => {
    let comp: OrdenDeTrabajoTareaComponent;
    let fixture: ComponentFixture<OrdenDeTrabajoTareaComponent>;
    let service: OrdenDeTrabajoTareaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeTrabajoTareaComponent],
        providers: []
      })
        .overrideTemplate(OrdenDeTrabajoTareaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdenDeTrabajoTareaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdenDeTrabajoTareaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrdenDeTrabajoTarea(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ordenDeTrabajoTareas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
