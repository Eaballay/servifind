import { Moment } from 'moment';
import { IProyecto } from 'app/shared/model/proyecto.model';

export interface IEvaluacionDeProyecto {
  id?: number;
  comentario?: string;
  calificacion?: number;
  fechaDeCreacion?: Moment;
  proyecto?: IProyecto;
}

export class EvaluacionDeProyecto implements IEvaluacionDeProyecto {
  constructor(
    public id?: number,
    public comentario?: string,
    public calificacion?: number,
    public fechaDeCreacion?: Moment,
    public proyecto?: IProyecto
  ) {}
}
