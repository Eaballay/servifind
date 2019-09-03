import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEvaluacionDeProyecto } from 'app/shared/model/evaluacion-de-proyecto.model';

type EntityResponseType = HttpResponse<IEvaluacionDeProyecto>;
type EntityArrayResponseType = HttpResponse<IEvaluacionDeProyecto[]>;

@Injectable({ providedIn: 'root' })
export class EvaluacionDeProyectoService {
  public resourceUrl = SERVER_API_URL + 'api/evaluacion-de-proyectos';

  constructor(protected http: HttpClient) {}

  create(evaluacionDeProyecto: IEvaluacionDeProyecto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(evaluacionDeProyecto);
    return this.http
      .post<IEvaluacionDeProyecto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(evaluacionDeProyecto: IEvaluacionDeProyecto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(evaluacionDeProyecto);
    return this.http
      .put<IEvaluacionDeProyecto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEvaluacionDeProyecto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEvaluacionDeProyecto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(evaluacionDeProyecto: IEvaluacionDeProyecto): IEvaluacionDeProyecto {
    const copy: IEvaluacionDeProyecto = Object.assign({}, evaluacionDeProyecto, {
      fechaDeCreacion:
        evaluacionDeProyecto.fechaDeCreacion != null && evaluacionDeProyecto.fechaDeCreacion.isValid()
          ? evaluacionDeProyecto.fechaDeCreacion.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaDeCreacion = res.body.fechaDeCreacion != null ? moment(res.body.fechaDeCreacion) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((evaluacionDeProyecto: IEvaluacionDeProyecto) => {
        evaluacionDeProyecto.fechaDeCreacion =
          evaluacionDeProyecto.fechaDeCreacion != null ? moment(evaluacionDeProyecto.fechaDeCreacion) : null;
      });
    }
    return res;
  }
}
