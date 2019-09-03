import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdenDeTrabajoTarea } from 'app/shared/model/orden-de-trabajo-tarea.model';

type EntityResponseType = HttpResponse<IOrdenDeTrabajoTarea>;
type EntityArrayResponseType = HttpResponse<IOrdenDeTrabajoTarea[]>;

@Injectable({ providedIn: 'root' })
export class OrdenDeTrabajoTareaService {
  public resourceUrl = SERVER_API_URL + 'api/orden-de-trabajo-tareas';

  constructor(protected http: HttpClient) {}

  create(ordenDeTrabajoTarea: IOrdenDeTrabajoTarea): Observable<EntityResponseType> {
    return this.http.post<IOrdenDeTrabajoTarea>(this.resourceUrl, ordenDeTrabajoTarea, { observe: 'response' });
  }

  update(ordenDeTrabajoTarea: IOrdenDeTrabajoTarea): Observable<EntityResponseType> {
    return this.http.put<IOrdenDeTrabajoTarea>(this.resourceUrl, ordenDeTrabajoTarea, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrdenDeTrabajoTarea>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrdenDeTrabajoTarea[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
