import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrdenDeCompra } from 'app/shared/model/orden-de-compra.model';

@Component({
  selector: 'jhi-orden-de-compra-detail',
  templateUrl: './orden-de-compra-detail.component.html'
})
export class OrdenDeCompraDetailComponent implements OnInit {
  ordenDeCompra: IOrdenDeCompra;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordenDeCompra }) => {
      this.ordenDeCompra = ordenDeCompra;
    });
  }

  previousState() {
    window.history.back();
  }
}
