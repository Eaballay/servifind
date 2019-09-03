/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { AsociadoComponent } from 'app/entities/asociado/asociado.component';
import { AsociadoService } from 'app/entities/asociado/asociado.service';
import { Asociado } from 'app/shared/model/asociado.model';

describe('Component Tests', () => {
  describe('Asociado Management Component', () => {
    let comp: AsociadoComponent;
    let fixture: ComponentFixture<AsociadoComponent>;
    let service: AsociadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [AsociadoComponent],
        providers: []
      })
        .overrideTemplate(AsociadoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsociadoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsociadoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Asociado(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.asociados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
