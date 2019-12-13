import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDetalleProyecto } from 'app/shared/model/detalle-proyecto.model';

type EntityResponseType = HttpResponse<IDetalleProyecto>;
type EntityArrayResponseType = HttpResponse<IDetalleProyecto[]>;

@Injectable({ providedIn: 'root' })
export class DetalleProyectoService {
  public resourceUrl = SERVER_API_URL + 'api/detalle-proyectos';

  constructor(protected http: HttpClient) {}

  create(detalleProyecto: IDetalleProyecto): Observable<EntityResponseType> {
    return this.http.post<IDetalleProyecto>(this.resourceUrl, detalleProyecto, { observe: 'response' });
  }

  update(detalleProyecto: IDetalleProyecto): Observable<EntityResponseType> {
    return this.http.put<IDetalleProyecto>(this.resourceUrl, detalleProyecto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetalleProyecto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetalleProyecto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
