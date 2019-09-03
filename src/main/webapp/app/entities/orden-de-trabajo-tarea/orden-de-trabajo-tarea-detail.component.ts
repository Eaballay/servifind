import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrdenDeTrabajoTarea } from 'app/shared/model/orden-de-trabajo-tarea.model';

@Component({
  selector: 'jhi-orden-de-trabajo-tarea-detail',
  templateUrl: './orden-de-trabajo-tarea-detail.component.html'
})
export class OrdenDeTrabajoTareaDetailComponent implements OnInit {
  ordenDeTrabajoTarea: IOrdenDeTrabajoTarea;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordenDeTrabajoTarea }) => {
      this.ordenDeTrabajoTarea = ordenDeTrabajoTarea;
    });
  }

  previousState() {
    window.history.back();
  }
}
