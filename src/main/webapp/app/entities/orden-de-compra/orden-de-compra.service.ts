import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdenDeCompra } from 'app/shared/model/orden-de-compra.model';

type EntityResponseType = HttpResponse<IOrdenDeCompra>;
type EntityArrayResponseType = HttpResponse<IOrdenDeCompra[]>;

@Injectable({ providedIn: 'root' })
export class OrdenDeCompraService {
  public resourceUrl = SERVER_API_URL + 'api/orden-de-compras';

  constructor(protected http: HttpClient) {}

  create(ordenDeCompra: IOrdenDeCompra): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordenDeCompra);
    return this.http
      .post<IOrdenDeCompra>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ordenDeCompra: IOrdenDeCompra): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordenDeCompra);
    return this.http
      .put<IOrdenDeCompra>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrdenDeCompra>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrdenDeCompra[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ordenDeCompra: IOrdenDeCompra): IOrdenDeCompra {
    const copy: IOrdenDeCompra = Object.assign({}, ordenDeCompra, {
      fechaDeCreacion:
        ordenDeCompra.fechaDeCreacion != null && ordenDeCompra.fechaDeCreacion.isValid() ? ordenDeCompra.fechaDeCreacion.toJSON() : null
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
      res.body.forEach((ordenDeCompra: IOrdenDeCompra) => {
        ordenDeCompra.fechaDeCreacion = ordenDeCompra.fechaDeCreacion != null ? moment(ordenDeCompra.fechaDeCreacion) : null;
      });
    }
    return res;
  }
}
