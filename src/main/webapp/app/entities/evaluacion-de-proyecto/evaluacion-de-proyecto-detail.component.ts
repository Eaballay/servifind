import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEvaluacionDeProyecto } from 'app/shared/model/evaluacion-de-proyecto.model';

@Component({
  selector: 'jhi-evaluacion-de-proyecto-detail',
  templateUrl: './evaluacion-de-proyecto-detail.component.html'
})
export class EvaluacionDeProyectoDetailComponent implements OnInit {
  evaluacionDeProyecto: IEvaluacionDeProyecto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ evaluacionDeProyecto }) => {
      this.evaluacionDeProyecto = evaluacionDeProyecto;
    });
  }

  previousState() {
    window.history.back();
  }
}
