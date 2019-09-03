import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';

type EntityResponseType = HttpResponse<IPresupuesto>;
type EntityArrayResponseType = HttpResponse<IPresupuesto[]>;

@Injectable({ providedIn: 'root' })
export class PresupuestoService {
  public resourceUrl = SERVER_API_URL + 'api/presupuestos';

  constructor(protected http: HttpClient) {}

  create(presupuesto: IPresupuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(presupuesto);
    return this.http
      .post<IPresupuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(presupuesto: IPresupuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(presupuesto);
    return this.http
      .put<IPresupuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPresupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPresupuesto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(presupuesto: IPresupuesto): IPresupuesto {
    const copy: IPresupuesto = Object.assign({}, presupuesto, {
      fechaDeCreacion:
        presupuesto.fechaDeCreacion != null && presupuesto.fechaDeCreacion.isValid() ? presupuesto.fechaDeCreacion.toJSON() : null,
      fechaDeVencimiento:
        presupuesto.fechaDeVencimiento != null && presupuesto.fechaDeVencimiento.isValid() ? presupuesto.fechaDeVencimiento.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaDeCreacion = res.body.fechaDeCreacion != null ? moment(res.body.fechaDeCreacion) : null;
      res.body.fechaDeVencimiento = res.body.fechaDeVencimiento != null ? moment(res.body.fechaDeVencimiento) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((presupuesto: IPresupuesto) => {
        presupuesto.fechaDeCreacion = presupuesto.fechaDeCreacion != null ? moment(presupuesto.fechaDeCreacion) : null;
        presupuesto.fechaDeVencimiento = presupuesto.fechaDeVencimiento != null ? moment(presupuesto.fechaDeVencimiento) : null;
      });
    }
    return res;
  }
}
