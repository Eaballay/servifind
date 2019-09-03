import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdenDeRelevamiento } from 'app/shared/model/orden-de-relevamiento.model';

type EntityResponseType = HttpResponse<IOrdenDeRelevamiento>;
type EntityArrayResponseType = HttpResponse<IOrdenDeRelevamiento[]>;

@Injectable({ providedIn: 'root' })
export class OrdenDeRelevamientoService {
  public resourceUrl = SERVER_API_URL + 'api/orden-de-relevamientos';

  constructor(protected http: HttpClient) {}

  create(ordenDeRelevamiento: IOrdenDeRelevamiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordenDeRelevamiento);
    return this.http
      .post<IOrdenDeRelevamiento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ordenDeRelevamiento: IOrdenDeRelevamiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordenDeRelevamiento);
    return this.http
      .put<IOrdenDeRelevamiento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrdenDeRelevamiento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrdenDeRelevamiento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ordenDeRelevamiento: IOrdenDeRelevamiento): IOrdenDeRelevamiento {
    const copy: IOrdenDeRelevamiento = Object.assign({}, ordenDeRelevamiento, {
      fecha: ordenDeRelevamiento.fecha != null && ordenDeRelevamiento.fecha.isValid() ? ordenDeRelevamiento.fecha.toJSON() : null,
      hora: ordenDeRelevamiento.hora != null && ordenDeRelevamiento.hora.isValid() ? ordenDeRelevamiento.hora.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
      res.body.hora = res.body.hora != null ? moment(res.body.hora) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ordenDeRelevamiento: IOrdenDeRelevamiento) => {
        ordenDeRelevamiento.fecha = ordenDeRelevamiento.fecha != null ? moment(ordenDeRelevamiento.fecha) : null;
        ordenDeRelevamiento.hora = ordenDeRelevamiento.hora != null ? moment(ordenDeRelevamiento.hora) : null;
      });
    }
    return res;
  }
}
