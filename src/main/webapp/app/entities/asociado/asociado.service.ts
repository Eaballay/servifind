import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAsociado } from 'app/shared/model/asociado.model';

type EntityResponseType = HttpResponse<IAsociado>;
type EntityArrayResponseType = HttpResponse<IAsociado[]>;

@Injectable({ providedIn: 'root' })
export class AsociadoService {
  public resourceUrl = SERVER_API_URL + 'api/asociados';

  constructor(protected http: HttpClient) {}

  create(asociado: IAsociado): Observable<EntityResponseType> {
    return this.http.post<IAsociado>(this.resourceUrl, asociado, { observe: 'response' });
  }

  update(asociado: IAsociado): Observable<EntityResponseType> {
    return this.http.put<IAsociado>(this.resourceUrl, asociado, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAsociado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAsociado[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
