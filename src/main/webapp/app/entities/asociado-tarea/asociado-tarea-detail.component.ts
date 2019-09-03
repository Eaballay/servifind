import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsociadoTarea } from 'app/shared/model/asociado-tarea.model';

@Component({
  selector: 'jhi-asociado-tarea-detail',
  templateUrl: './asociado-tarea-detail.component.html'
})
export class AsociadoTareaDetailComponent implements OnInit {
  asociadoTarea: IAsociadoTarea;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ asociadoTarea }) => {
      this.asociadoTarea = asociadoTarea;
    });
  }

  previousState() {
    window.history.back();
  }
}
