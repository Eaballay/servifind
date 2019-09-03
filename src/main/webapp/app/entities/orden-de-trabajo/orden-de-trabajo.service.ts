import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';

type EntityResponseType = HttpResponse<IOrdenDeTrabajo>;
type EntityArrayResponseType = HttpResponse<IOrdenDeTrabajo[]>;

@Injectable({ providedIn: 'root' })
export class OrdenDeTrabajoService {
  public resourceUrl = SERVER_API_URL + 'api/orden-de-trabajos';

  constructor(protected http: HttpClient) {}

  create(ordenDeTrabajo: IOrdenDeTrabajo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordenDeTrabajo);
    return this.http
      .post<IOrdenDeTrabajo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ordenDeTrabajo: IOrdenDeTrabajo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordenDeTrabajo);
    return this.http
      .put<IOrdenDeTrabajo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrdenDeTrabajo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrdenDeTrabajo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ordenDeTrabajo: IOrdenDeTrabajo): IOrdenDeTrabajo {
    const copy: IOrdenDeTrabajo = Object.assign({}, ordenDeTrabajo, {
      fechaDeRealizacion:
        ordenDeTrabajo.fechaDeRealizacion != null && ordenDeTrabajo.fechaDeRealizacion.isValid()
          ? ordenDeTrabajo.fechaDeRealizacion.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaDeRealizacion = res.body.fechaDeRealizacion != null ? moment(res.body.fechaDeRealizacion) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ordenDeTrabajo: IOrdenDeTrabajo) => {
        ordenDeTrabajo.fechaDeRealizacion = ordenDeTrabajo.fechaDeRealizacion != null ? moment(ordenDeTrabajo.fechaDeRealizacion) : null;
      });
    }
    return res;
  }
}
