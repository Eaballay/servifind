/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { AsociadoTareaDetailComponent } from 'app/entities/asociado-tarea/asociado-tarea-detail.component';
import { AsociadoTarea } from 'app/shared/model/asociado-tarea.model';

describe('Component Tests', () => {
  describe('AsociadoTarea Management Detail Component', () => {
    let comp: AsociadoTareaDetailComponent;
    let fixture: ComponentFixture<AsociadoTareaDetailComponent>;
    const route = ({ data: of({ asociadoTarea: new AsociadoTarea(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [AsociadoTareaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AsociadoTareaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsociadoTareaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.asociadoTarea).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
