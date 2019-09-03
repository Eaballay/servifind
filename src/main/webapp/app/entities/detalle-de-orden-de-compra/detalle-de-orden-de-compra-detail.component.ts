import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetalleDeOrdenDeCompra } from 'app/shared/model/detalle-de-orden-de-compra.model';

@Component({
  selector: 'jhi-detalle-de-orden-de-compra-detail',
  templateUrl: './detalle-de-orden-de-compra-detail.component.html'
})
export class DetalleDeOrdenDeCompraDetailComponent implements OnInit {
  detalleDeOrdenDeCompra: IDetalleDeOrdenDeCompra;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detalleDeOrdenDeCompra }) => {
      this.detalleDeOrdenDeCompra = detalleDeOrdenDeCompra;
    });
  }

  previousState() {
    window.history.back();
  }
}
