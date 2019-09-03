import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDetalleDeOrdenDeCompra } from 'app/shared/model/detalle-de-orden-de-compra.model';

type EntityResponseType = HttpResponse<IDetalleDeOrdenDeCompra>;
type EntityArrayResponseType = HttpResponse<IDetalleDeOrdenDeCompra[]>;

@Injectable({ providedIn: 'root' })
export class DetalleDeOrdenDeCompraService {
  public resourceUrl = SERVER_API_URL + 'api/detalle-de-orden-de-compras';

  constructor(protected http: HttpClient) {}

  create(detalleDeOrdenDeCompra: IDetalleDeOrdenDeCompra): Observable<EntityResponseType> {
    return this.http.post<IDetalleDeOrdenDeCompra>(this.resourceUrl, detalleDeOrdenDeCompra, { observe: 'response' });
  }

  update(detalleDeOrdenDeCompra: IDetalleDeOrdenDeCompra): Observable<EntityResponseType> {
    return this.http.put<IDetalleDeOrdenDeCompra>(this.resourceUrl, detalleDeOrdenDeCompra, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetalleDeOrdenDeCompra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetalleDeOrdenDeCompra[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
