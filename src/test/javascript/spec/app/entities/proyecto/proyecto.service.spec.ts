/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProyectoService } from 'app/entities/proyecto/proyecto.service';
import { IProyecto, Proyecto } from 'app/shared/model/proyecto.model';

describe('Service Tests', () => {
  describe('Proyecto Service', () => {
    let injector: TestBed;
    let service: ProyectoService;
    let httpMock: HttpTestingController;
    let elemDefault: IProyecto;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ProyectoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Proyecto(0, 0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            fechaDeInicio: currentDate.format(DATE_TIME_FORMAT),
            fechaDeFinalizacion: currentDate.format(DATE_TIME_FORMAT),
            fechaDeCreacion: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Proyecto', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaDeInicio: currentDate.format(DATE_TIME_FORMAT),
            fechaDeFinalizacion: currentDate.format(DATE_TIME_FORMAT),
            fechaDeCreacion: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaDeInicio: currentDate,
            fechaDeFinalizacion: currentDate,
            fechaDeCreacion: currentDate
          },
          returnedFromService
        );
        service
          .create(new Proyecto(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Proyecto', async () => {
        const returnedFromService = Object.assign(
          {
            nroDeProyecto: 1,
            descripcion: 'BBBBBB',
            direccion: 'BBBBBB',
            fechaDeInicio: currentDate.format(DATE_TIME_FORMAT),
            fechaDeFinalizacion: currentDate.format(DATE_TIME_FORMAT),
            fechaDeCreacion: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaDeInicio: currentDate,
            fechaDeFinalizacion: currentDate,
            fechaDeCreacion: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Proyecto', async () => {
        const returnedFromService = Object.assign(
          {
            nroDeProyecto: 1,
            descripcion: 'BBBBBB',
            direccion: 'BBBBBB',
            fechaDeInicio: currentDate.format(DATE_TIME_FORMAT),
            fechaDeFinalizacion: currentDate.format(DATE_TIME_FORMAT),
            fechaDeCreacion: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaDeInicio: currentDate,
            fechaDeFinalizacion: currentDate,
            fechaDeCreacion: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Proyecto', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
