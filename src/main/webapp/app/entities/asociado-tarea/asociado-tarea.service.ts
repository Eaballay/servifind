import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAsociadoTarea } from 'app/shared/model/asociado-tarea.model';

type EntityResponseType = HttpResponse<IAsociadoTarea>;
type EntityArrayResponseType = HttpResponse<IAsociadoTarea[]>;

@Injectable({ providedIn: 'root' })
export class AsociadoTareaService {
  public resourceUrl = SERVER_API_URL + 'api/asociado-tareas';

  constructor(protected http: HttpClient) {}

  create(asociadoTarea: IAsociadoTarea): Observable<EntityResponseType> {
    return this.http.post<IAsociadoTarea>(this.resourceUrl, asociadoTarea, { observe: 'response' });
  }

  update(asociadoTarea: IAsociadoTarea): Observable<EntityResponseType> {
    return this.http.put<IAsociadoTarea>(this.resourceUrl, asociadoTarea, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAsociadoTarea>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAsociadoTarea[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
