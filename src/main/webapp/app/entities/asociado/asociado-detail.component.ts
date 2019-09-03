import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsociado } from 'app/shared/model/asociado.model';

@Component({
  selector: 'jhi-asociado-detail',
  templateUrl: './asociado-detail.component.html'
})
export class AsociadoDetailComponent implements OnInit {
  asociado: IAsociado;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asociado }) => {
      this.asociado = asociado;
    });
  }

  previousState() {
    window.history.back();
  }
}
