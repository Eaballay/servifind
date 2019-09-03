import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDetalleDePresupuesto } from 'app/shared/model/detalle-de-presupuesto.model';

type EntityResponseType = HttpResponse<IDetalleDePresupuesto>;
type EntityArrayResponseType = HttpResponse<IDetalleDePresupuesto[]>;

@Injectable({ providedIn: 'root' })
export class DetalleDePresupuestoService {
  public resourceUrl = SERVER_API_URL + 'api/detalle-de-presupuestos';

  constructor(protected http: HttpClient) {}

  create(detalleDePresupuesto: IDetalleDePresupuesto): Observable<EntityResponseType> {
    return this.http.post<IDetalleDePresupuesto>(this.resourceUrl, detalleDePresupuesto, { observe: 'response' });
  }

  update(detalleDePresupuesto: IDetalleDePresupuesto): Observable<EntityResponseType> {
    return this.http.put<IDetalleDePresupuesto>(this.resourceUrl, detalleDePresupuesto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetalleDePresupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetalleDePresupuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
