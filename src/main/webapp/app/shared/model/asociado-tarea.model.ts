import { IAsociado } from 'app/shared/model/asociado.model';
import { ITarea } from 'app/shared/model/tarea.model';

export interface IAsociadoTarea {
  id?: number;
  asociado?: IAsociado;
  tarea?: ITarea;
}

export class AsociadoTarea implements IAsociadoTarea {
  constructor(public id?: number, public asociado?: IAsociado, public tarea?: ITarea) {}
}
