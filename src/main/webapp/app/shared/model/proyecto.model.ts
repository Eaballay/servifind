import { Moment } from 'moment';
import { ICliente } from 'app/shared/model/cliente.model';
import { IDominio } from 'app/shared/model/dominio.model';

export interface IProyecto {
  id?: number;
  nroDeProyecto?: number;
  descripcion?: string;
  direccion?: string;
  fechaDeInicio?: Moment;
  fechaDeFinalizacion?: Moment;
  fechaDeCreacion?: Moment;
  cliente?: ICliente;
  estado?: IDominio;
}

export class Proyecto implements IProyecto {
  constructor(
    public id?: number,
    public nroDeProyecto?: number,
    public descripcion?: string,
    public direccion?: string,
    public fechaDeInicio?: Moment,
    public fechaDeFinalizacion?: Moment,
    public fechaDeCreacion?: Moment,
    public cliente?: ICliente,
    public estado?: IDominio
  ) {}
}
