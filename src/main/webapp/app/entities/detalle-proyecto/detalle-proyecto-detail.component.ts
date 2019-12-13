import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetalleProyecto } from 'app/shared/model/detalle-proyecto.model';

@Component({
  selector: 'jhi-detalle-proyecto-detail',
  templateUrl: './detalle-proyecto-detail.component.html'
})
export class DetalleProyectoDetailComponent implements OnInit {
  detalleProyecto: IDetalleProyecto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detalleProyecto }) => {
      this.detalleProyecto = detalleProyecto;
    });
  }

  previousState() {
    window.history.back();
  }
}
