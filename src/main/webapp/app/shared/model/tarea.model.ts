import { Moment } from 'moment';
import { IDominio } from 'app/shared/model/dominio.model';

export interface ITarea {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precioPorUnidad?: string;
  fechaDeCreacion?: Moment;
  fechaDeModificacion?: Moment;
  actividad?: IDominio;
  unidad?: IDominio;
  estado?: IDominio;
}

export class Tarea implements ITarea {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string,
    public precioPorUnidad?: string,
    public fechaDeCreacion?: Moment,
    public fechaDeModificacion?: Moment,
    public actividad?: IDominio,
    public unidad?: IDominio,
    public estado?: IDominio
  ) {}
}
