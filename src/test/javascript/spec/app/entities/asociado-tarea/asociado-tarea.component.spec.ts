/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { AsociadoTareaComponent } from 'app/entities/asociado-tarea/asociado-tarea.component';
import { AsociadoTareaService } from 'app/entities/asociado-tarea/asociado-tarea.service';
import { AsociadoTarea } from 'app/shared/model/asociado-tarea.model';

describe('Component Tests', () => {
  describe('AsociadoTarea Management Component', () => {
    let comp: AsociadoTareaComponent;
    let fixture: ComponentFixture<AsociadoTareaComponent>;
    let service: AsociadoTareaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [AsociadoTareaComponent],
        providers: []
      })
        .overrideTemplate(AsociadoTareaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsociadoTareaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsociadoTareaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AsociadoTarea(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.asociadoTareas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
