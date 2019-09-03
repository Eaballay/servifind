export const enum TipoDeDominio {
  PAIS = 'PAIS',
  PROVINCIA = 'PROVINCIA',
  CIUDAD = 'CIUDAD',
  RUBRO = 'RUBRO',
  ACTIVIDAD = 'ACTIVIDAD',
  ROL = 'ROL',
  UNIDAD = 'UNIDAD'
}

export interface IDominio {
  id?: number;
  valor?: string;
  etiqueta?: string;
  descripcion?: string;
  tipoDeDominio?: TipoDeDominio;
}

export class Dominio implements IDominio {
  constructor(
    public id?: number,
    public valor?: string,
    public etiqueta?: string,
    public descripcion?: string,
    public tipoDeDominio?: TipoDeDominio
  ) {}
}
