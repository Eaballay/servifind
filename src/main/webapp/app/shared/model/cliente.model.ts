import { IPersona } from 'app/shared/model/persona.model';

export interface ICliente {
  id?: number;
  nroDeLegajo?: number;
  persona?: IPersona;
}

export class Cliente implements ICliente {
  constructor(public id?: number, public nroDeLegajo?: number, public persona?: IPersona) {}
}
