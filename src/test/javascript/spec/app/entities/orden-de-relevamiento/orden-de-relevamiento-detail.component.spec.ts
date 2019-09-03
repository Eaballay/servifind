/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeRelevamientoDetailComponent } from 'app/entities/orden-de-relevamiento/orden-de-relevamiento-detail.component';
import { OrdenDeRelevamiento } from 'app/shared/model/orden-de-relevamiento.model';

describe('Component Tests', () => {
  describe('OrdenDeRelevamiento Management Detail Component', () => {
    let comp: OrdenDeRelevamientoDetailComponent;
    let fixture: ComponentFixture<OrdenDeRelevamientoDetailComponent>;
    const route = ({ data: of({ ordenDeRelevamiento: new OrdenDeRelevamiento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeRelevamientoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrdenDeRelevamientoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdenDeRelevamientoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ordenDeRelevamiento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
