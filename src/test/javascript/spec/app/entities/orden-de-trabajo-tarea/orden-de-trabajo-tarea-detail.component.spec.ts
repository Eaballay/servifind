/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { OrdenDeTrabajoTareaDetailComponent } from 'app/entities/orden-de-trabajo-tarea/orden-de-trabajo-tarea-detail.component';
import { OrdenDeTrabajoTarea } from 'app/shared/model/orden-de-trabajo-tarea.model';

describe('Component Tests', () => {
  describe('OrdenDeTrabajoTarea Management Detail Component', () => {
    let comp: OrdenDeTrabajoTareaDetailComponent;
    let fixture: ComponentFixture<OrdenDeTrabajoTareaDetailComponent>;
    const route = ({ data: of({ ordenDeTrabajoTarea: new OrdenDeTrabajoTarea(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [OrdenDeTrabajoTareaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrdenDeTrabajoTareaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdenDeTrabajoTareaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ordenDeTrabajoTarea).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
