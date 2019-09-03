import { Moment } from 'moment';
import { IPersona } from 'app/shared/model/persona.model';

export interface IEmpleado {
  id?: number;
  fechaDeContratacion?: Moment;
  nroDeLegajo?: number;
  persona?: IPersona;
}

export class Empleado implements IEmpleado {
  constructor(public id?: number, public fechaDeContratacion?: Moment, public nroDeLegajo?: number, public persona?: IPersona) {}
}
