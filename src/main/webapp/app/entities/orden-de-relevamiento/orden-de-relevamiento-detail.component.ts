import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrdenDeRelevamiento } from 'app/shared/model/orden-de-relevamiento.model';

@Component({
  selector: 'jhi-orden-de-relevamiento-detail',
  templateUrl: './orden-de-relevamiento-detail.component.html'
})
export class OrdenDeRelevamientoDetailComponent implements OnInit {
  ordenDeRelevamiento: IOrdenDeRelevamiento;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordenDeRelevamiento }) => {
      this.ordenDeRelevamiento = ordenDeRelevamiento;
    });
  }

  previousState() {
    window.history.back();
  }
}
