import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProyecto } from 'app/shared/model/proyecto.model';

type EntityResponseType = HttpResponse<IProyecto>;
type EntityArrayResponseType = HttpResponse<IProyecto[]>;

@Injectable({ providedIn: 'root' })
export class ProyectoService {
  public resourceUrl = SERVER_API_URL + 'api/proyectos';

  constructor(protected http: HttpClient) {}

  create(proyecto: IProyecto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proyecto);
    return this.http
      .post<IProyecto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(proyecto: IProyecto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proyecto);
    return this.http
      .put<IProyecto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProyecto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProyecto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(proyecto: IProyecto): IProyecto {
    const copy: IProyecto = Object.assign({}, proyecto, {
      fechaDeInicio: proyecto.fechaDeInicio != null && proyecto.fechaDeInicio.isValid() ? proyecto.fechaDeInicio.toJSON() : null,
      fechaDeFinalizacion:
        proyecto.fechaDeFinalizacion != null && proyecto.fechaDeFinalizacion.isValid() ? proyecto.fechaDeFinalizacion.toJSON() : null,
      fechaDeCreacion: proyecto.fechaDeCreacion != null && proyecto.fechaDeCreacion.isValid() ? proyecto.fechaDeCreacion.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaDeInicio = res.body.fechaDeInicio != null ? moment(res.body.fechaDeInicio) : null;
      res.body.fechaDeFinalizacion = res.body.fechaDeFinalizacion != null ? moment(res.body.fechaDeFinalizacion) : null;
      res.body.fechaDeCreacion = res.body.fechaDeCreacion != null ? moment(res.body.fechaDeCreacion) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((proyecto: IProyecto) => {
        proyecto.fechaDeInicio = proyecto.fechaDeInicio != null ? moment(proyecto.fechaDeInicio) : null;
        proyecto.fechaDeFinalizacion = proyecto.fechaDeFinalizacion != null ? moment(proyecto.fechaDeFinalizacion) : null;
        proyecto.fechaDeCreacion = proyecto.fechaDeCreacion != null ? moment(proyecto.fechaDeCreacion) : null;
      });
    }
    return res;
  }
}
