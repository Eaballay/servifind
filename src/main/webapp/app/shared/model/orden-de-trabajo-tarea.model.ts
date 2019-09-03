import { IOrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';
import { IDominio } from 'app/shared/model/dominio.model';

export interface IOrdenDeTrabajoTarea {
  id?: number;
  cantidad?: number;
  precioPorUnidad?: string;
  descripcion?: string;
  ordenDeTrabajo?: IOrdenDeTrabajo;
  unidad?: IDominio;
}

export class OrdenDeTrabajoTarea implements IOrdenDeTrabajoTarea {
  constructor(
    public id?: number,
    public cantidad?: number,
    public precioPorUnidad?: string,
    public descripcion?: string,
    public ordenDeTrabajo?: IOrdenDeTrabajo,
    public unidad?: IDominio
  ) {}
}
