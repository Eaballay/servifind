import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRolEmpleado } from 'app/shared/model/rol-empleado.model';

type EntityResponseType = HttpResponse<IRolEmpleado>;
type EntityArrayResponseType = HttpResponse<IRolEmpleado[]>;

@Injectable({ providedIn: 'root' })
export class RolEmpleadoService {
  public resourceUrl = SERVER_API_URL + 'api/rol-empleados';

  constructor(protected http: HttpClient) {}

  create(rolEmpleado: IRolEmpleado): Observable<EntityResponseType> {
    return this.http.post<IRolEmpleado>(this.resourceUrl, rolEmpleado, { observe: 'response' });
  }

  update(rolEmpleado: IRolEmpleado): Observable<EntityResponseType> {
    return this.http.put<IRolEmpleado>(this.resourceUrl, rolEmpleado, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRolEmpleado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRolEmpleado[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
