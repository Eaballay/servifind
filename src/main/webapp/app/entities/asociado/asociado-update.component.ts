import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAsociado, Asociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from './asociado.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona';

@Component({
  selector: 'jhi-asociado-update',
  templateUrl: './asociado-update.component.html'
})
export class AsociadoUpdateComponent implements OnInit {
  isSaving: boolean;

  personas: IPersona[];

  editForm = this.fb.group({
    id: [],
    nroDeAsociado: [null, [Validators.required]],
    persona: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected asociadoService: AsociadoService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ asociado }) => {
      this.updateForm(asociado);
    });
    this.personaService
      .query({ filter: 'asociado-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe(
        (res: IPersona[]) => {
          if (!this.editForm.get('persona').value || !this.editForm.get('persona').value.id) {
            this.personas = res;
          } else {
            this.personaService
              .find(this.editForm.get('persona').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPersona>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPersona>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPersona) => (this.personas = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(asociado: IAsociado) {
    this.editForm.patchValue({
      id: asociado.id,
      nroDeAsociado: asociado.nroDeAsociado,
      persona: asociado.persona
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const asociado = this.createFromForm();
    if (asociado.id !== undefined) {
      this.subscribeToSaveResponse(this.asociadoService.update(asociado));
    } else {
      this.subscribeToSaveResponse(this.asociadoService.create(asociado));
    }
  }

  private createFromForm(): IAsociado {
    return {
      ...new Asociado(),
      id: this.editForm.get(['id']).value,
      nroDeAsociado: this.editForm.get(['nroDeAsociado']).value,
      persona: this.editForm.get(['persona']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsociado>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPersonaById(index: number, item: IPersona) {
    return item.id;
  }
}
