import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRolEmpleado } from 'app/shared/model/rol-empleado.model';

@Component({
  selector: 'jhi-rol-empleado-detail',
  templateUrl: './rol-empleado-detail.component.html'
})
export class RolEmpleadoDetailComponent implements OnInit {
  rolEmpleado: IRolEmpleado;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rolEmpleado }) => {
      this.rolEmpleado = rolEmpleado;
    });
  }

  previousState() {
    window.history.back();
  }
}
