/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiFindTestModule } from '../../../test.module';
import { DominioDetailComponent } from 'app/entities/dominio/dominio-detail.component';
import { Dominio } from 'app/shared/model/dominio.model';

describe('Component Tests', () => {
  describe('Dominio Management Detail Component', () => {
    let comp: DominioDetailComponent;
    let fixture: ComponentFixture<DominioDetailComponent>;
    const route = ({ data: of({ dominio: new Dominio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ServiFindTestModule],
        declarations: [DominioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DominioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DominioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dominio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
