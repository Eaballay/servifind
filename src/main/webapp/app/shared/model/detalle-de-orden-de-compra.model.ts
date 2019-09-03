import { IOrdenDeCompra } from 'app/shared/model/orden-de-compra.model';
import { IDominio } from 'app/shared/model/dominio.model';

export interface IDetalleDeOrdenDeCompra {
  id?: number;
  cantidad?: number;
  descripcion?: string;
  ordenDeCompra?: IOrdenDeCompra;
  unidad?: IDominio;
}

export class DetalleDeOrdenDeCompra implements IDetalleDeOrdenDeCompra {
  constructor(
    public id?: number,
    public cantidad?: number,
    public descripcion?: string,
    public ordenDeCompra?: IOrdenDeCompra,
    public unidad?: IDominio
  ) {}
}
