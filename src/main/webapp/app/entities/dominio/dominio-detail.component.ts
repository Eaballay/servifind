import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDominio } from 'app/shared/model/dominio.model';

@Component({
  selector: 'jhi-dominio-detail',
  templateUrl: './dominio-detail.component.html'
})
export class DominioDetailComponent implements OnInit {
  dominio: IDominio;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dominio }) => {
      this.dominio = dominio;
    });
  }

  previousState() {
    window.history.back();
  }
}
