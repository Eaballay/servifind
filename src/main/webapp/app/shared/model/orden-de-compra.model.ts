import { Moment } from 'moment';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { IDominio } from 'app/shared/model/dominio.model';

export interface IOrdenDeCompra {
  id?: number;
  nroOrdenDeCompra?: number;
  fechaDeCreacion?: Moment;
  presupuesto?: IPresupuesto;
  empleado?: IEmpleado;
  estado?: IDominio;
}

export class OrdenDeCompra implements IOrdenDeCompra {
  constructor(
    public id?: number,
    public nroOrdenDeCompra?: number,
    public fechaDeCreacion?: Moment,
    public presupuesto?: IPresupuesto,
    public empleado?: IEmpleado,
    public estado?: IDominio
  ) {}
}
