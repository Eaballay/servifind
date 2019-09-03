/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { AsociadoDetailComponent } from 'app/entities/asociado/asociado-detail.component';
import { Asociado } from 'app/shared/model/asociado.model';

describe('Component Tests', () => {
  describe('Asociado Management Detail Component', () => {
    let comp: AsociadoDetailComponent;
    let fixture: ComponentFixture<AsociadoDetailComponent>;
    const route = ({ data: of({ asociado: new Asociado(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [AsociadoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AsociadoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsociadoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.asociado).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
