import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetalleDePresupuesto } from 'app/shared/model/detalle-de-presupuesto.model';

@Component({
  selector: 'jhi-detalle-de-presupuesto-detail',
  templateUrl: './detalle-de-presupuesto-detail.component.html'
})
export class DetalleDePresupuestoDetailComponent implements OnInit {
  detalleDePresupuesto: IDetalleDePresupuesto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detalleDePresupuesto }) => {
      this.detalleDePresupuesto = detalleDePresupuesto;
    });
  }

  previousState() {
    window.history.back();
  }
}
