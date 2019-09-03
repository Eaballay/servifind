import { Moment } from 'moment';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { IAsociado } from 'app/shared/model/asociado.model';
import { IDominio } from 'app/shared/model/dominio.model';

export interface IOrdenDeTrabajo {
  id?: number;
  fechaDeRealizacion?: Moment;
  horasEstimadas?: number;
  descripcion?: string;
  proyecto?: IProyecto;
  asociado?: IAsociado;
  estado?: IDominio;
}

export class OrdenDeTrabajo implements IOrdenDeTrabajo {
  constructor(
    public id?: number,
    public fechaDeRealizacion?: Moment,
    public horasEstimadas?: number,
    public descripcion?: string,
    public proyecto?: IProyecto,
    public asociado?: IAsociado,
    public estado?: IDominio
  ) {}
}
