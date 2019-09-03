import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDominio } from 'app/shared/model/dominio.model';

type EntityResponseType = HttpResponse<IDominio>;
type EntityArrayResponseType = HttpResponse<IDominio[]>;

@Injectable({ providedIn: 'root' })
export class DominioService {
  public resourceUrl = SERVER_API_URL + 'api/dominios';

  constructor(protected http: HttpClient) {}

  create(dominio: IDominio): Observable<EntityResponseType> {
    return this.http.post<IDominio>(this.resourceUrl, dominio, { observe: 'response' });
  }

  update(dominio: IDominio): Observable<EntityResponseType> {
    return this.http.put<IDominio>(this.resourceUrl, dominio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDominio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDominio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
