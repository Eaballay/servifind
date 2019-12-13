import { IProyecto } from 'app/shared/model/proyecto.model';
import { IDominio } from 'app/shared/model/dominio.model';

export interface IDetalleProyecto {
  id?: number;
  proyecto?: IProyecto;
  rubro?: IDominio;
  dimension?: IDominio;
  tipoDeTarea?: IDominio;
}

export class DetalleProyecto implements IDetalleProyecto {
  constructor(
    public id?: number,
    public proyecto?: IProyecto,
    public rubro?: IDominio,
    public dimension?: IDominio,
    public tipoDeTarea?: IDominio
  ) {}
}
