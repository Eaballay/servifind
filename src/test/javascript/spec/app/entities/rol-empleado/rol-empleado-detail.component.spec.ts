/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { RolEmpleadoDetailComponent } from 'app/entities/rol-empleado/rol-empleado-detail.component';
import { RolEmpleado } from 'app/shared/model/rol-empleado.model';

describe('Component Tests', () => {
  describe('RolEmpleado Management Detail Component', () => {
    let comp: RolEmpleadoDetailComponent;
    let fixture: ComponentFixture<RolEmpleadoDetailComponent>;
    const route = ({ data: of({ rolEmpleado: new RolEmpleado(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [RolEmpleadoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RolEmpleadoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RolEmpleadoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rolEmpleado).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
