import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPresupuesto } from 'app/shared/model/presupuesto.model';

@Component({
  selector: 'jhi-presupuesto-detail',
  templateUrl: './presupuesto-detail.component.html'
})
export class PresupuestoDetailComponent implements OnInit {
  presupuesto: IPresupuesto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ presupuesto }) => {
      this.presupuesto = presupuesto;
    });
  }

  previousState() {
    window.history.back();
  }
}
