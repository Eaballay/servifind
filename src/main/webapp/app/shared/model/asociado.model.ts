import { IPersona } from 'app/shared/model/persona.model';

export interface IAsociado {
  id?: number;
  nroDeAsociado?: number;
  persona?: IPersona;
}

export class Asociado implements IAsociado {
  constructor(public id?: number, public nroDeAsociado?: number, public persona?: IPersona) {}
}
