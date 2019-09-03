/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { TareaComponent } from 'app/entities/tarea/tarea.component';
import { TareaService } from 'app/entities/tarea/tarea.service';
import { Tarea } from 'app/shared/model/tarea.model';

describe('Component Tests', () => {
  describe('Tarea Management Component', () => {
    let comp: TareaComponent;
    let fixture: ComponentFixture<TareaComponent>;
    let service: TareaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [TareaComponent],
        providers: []
      })
        .overrideTemplate(TareaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TareaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TareaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tarea(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tareas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
