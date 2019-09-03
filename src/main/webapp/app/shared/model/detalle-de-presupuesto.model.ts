import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { IDominio } from 'app/shared/model/dominio.model';

export interface IDetalleDePresupuesto {
  id?: number;
  cantidad?: number;
  valorPorUnidad?: string;
  descripcion?: string;
  presupuesto?: IPresupuesto;
  unidad?: IDominio;
}

export class DetalleDePresupuesto implements IDetalleDePresupuesto {
  constructor(
    public id?: number,
    public cantidad?: number,
    public valorPorUnidad?: string,
    public descripcion?: string,
    public presupuesto?: IPresupuesto,
    public unidad?: IDominio
  ) {}
}
