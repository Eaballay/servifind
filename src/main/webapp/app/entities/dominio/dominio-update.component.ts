import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDominio, Dominio } from 'app/shared/model/dominio.model';
import { DominioService } from './dominio.service';

@Component({
  selector: 'jhi-dominio-update',
  templateUrl: './dominio-update.component.html'
})
export class DominioUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    valor: [null, [Validators.required]],
    etiqueta: [null, [Validators.required]],
    descripcion: [null, [Validators.required]],
    tipoDeDominio: [null, [Validators.required]]
  });

  constructor(protected dominioService: DominioService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dominio }) => {
      this.updateForm(dominio);
    });
  }

  updateForm(dominio: IDominio) {
    this.editForm.patchValue({
      id: dominio.id,
      valor: dominio.valor,
      etiqueta: dominio.etiqueta,
      descripcion: dominio.descripcion,
      tipoDeDominio: dominio.tipoDeDominio
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dominio = this.createFromForm();
    if (dominio.id !== undefined) {
      this.subscribeToSaveResponse(this.dominioService.update(dominio));
    } else {
      this.subscribeToSaveResponse(this.dominioService.create(dominio));
    }
  }

  private createFromForm(): IDominio {
    return {
      ...new Dominio(),
      id: this.editForm.get(['id']).value,
      valor: this.editForm.get(['valor']).value,
      etiqueta: this.editForm.get(['etiqueta']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      tipoDeDominio: this.editForm.get(['tipoDeDominio']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDominio>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
