import { IEmpleado } from 'app/shared/model/empleado.model';
import { IDominio } from 'app/shared/model/dominio.model';

export interface IRolEmpleado {
  id?: number;
  empleado?: IEmpleado;
  rol?: IDominio;
}

export class RolEmpleado implements IRolEmpleado {
  constructor(public id?: number, public empleado?: IEmpleado, public rol?: IDominio) {}
}
