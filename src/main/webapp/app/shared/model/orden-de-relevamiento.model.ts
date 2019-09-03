import { Moment } from 'moment';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { IDominio } from 'app/shared/model/dominio.model';

export interface IOrdenDeRelevamiento {
  id?: number;
  comentario?: string;
  fecha?: Moment;
  hora?: Moment;
  proyecto?: IProyecto;
  estado?: IDominio;
}

export class OrdenDeRelevamiento implements IOrdenDeRelevamiento {
  constructor(
    public id?: number,
    public comentario?: string,
    public fecha?: Moment,
    public hora?: Moment,
    public proyecto?: IProyecto,
    public estado?: IDominio
  ) {}
}
