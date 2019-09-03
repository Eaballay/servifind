/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeTrabajoDetailComponent } from 'app/entities/orden-de-trabajo/orden-de-trabajo-detail.component';
import { OrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';

describe('Component Tests', () => {
  describe('OrdenDeTrabajo Management Detail Component', () => {
    let comp: OrdenDeTrabajoDetailComponent;
    let fixture: ComponentFixture<OrdenDeTrabajoDetailComponent>;
    const route = ({ data: of({ ordenDeTrabajo: new OrdenDeTrabajo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeTrabajoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrdenDeTrabajoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdenDeTrabajoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ordenDeTrabajo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
