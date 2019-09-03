import { IUser } from 'app/core/user/user.model';
import { IDominio } from 'app/shared/model/dominio.model';

export interface IPersona {
  id?: number;
  cuil?: string;
  direccion?: string;
  nombre?: string;
  telefono?: string;
  user?: IUser;
  localidad?: IDominio;
}

export class Persona implements IPersona {
  constructor(
    public id?: number,
    public cuil?: string,
    public direccion?: string,
    public nombre?: string,
    public telefono?: string,
    public user?: IUser,
    public localidad?: IDominio
  ) {}
}
