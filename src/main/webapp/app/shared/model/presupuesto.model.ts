import { Moment } from 'moment';
import { IEmpleado } from 'app/shared/model/empleado.model';

export interface IPresupuesto {
  id?: number;
  fechaDeCreacion?: Moment;
  fechaDeVencimiento?: Moment;
  empleado?: IEmpleado;
}

export class Presupuesto implements IPresupuesto {
  constructor(public id?: number, public fechaDeCreacion?: Moment, public fechaDeVencimiento?: Moment, public empleado?: IEmpleado) {}
}
