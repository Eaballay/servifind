import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';

@Component({
  selector: 'jhi-orden-de-trabajo-detail',
  templateUrl: './orden-de-trabajo-detail.component.html'
})
export class OrdenDeTrabajoDetailComponent implements OnInit {
  ordenDeTrabajo: IOrdenDeTrabajo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordenDeTrabajo }) => {
      this.ordenDeTrabajo = ordenDeTrabajo;
    });
  }

  previousState() {
    window.history.back();
  }
}
