/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiFindTestModule } from '../../../test.module';
import { DominioComponent } from 'app/entities/dominio/dominio.component';
import { DominioService } from 'app/entities/dominio/dominio.service';
import { Dominio } from 'app/shared/model/dominio.model';

describe('Component Tests', () => {
  describe('Dominio Management Component', () => {
    let comp: DominioComponent;
    let fixture: ComponentFixture<DominioComponent>;
    let service: DominioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DominioComponent],
        providers: []
      })
        .overrideTemplate(DominioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DominioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DominioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Dominio(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dominios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
