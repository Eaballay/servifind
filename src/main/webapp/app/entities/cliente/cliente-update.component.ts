import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona';

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html'
})
export class ClienteUpdateComponent implements OnInit {
  isSaving: boolean;

  personas: IPersona[];

  editForm = this.fb.group({
    id: [],
    nroDeLegajo: [null, [Validators.required]],
    persona: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected clienteService: ClienteService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.updateForm(cliente);
    });
    this.personaService
      .query({ filter: 'cliente-is-null' })
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

  updateForm(cliente: ICliente) {
    this.editForm.patchValue({
      id: cliente.id,
      nroDeLegajo: cliente.nroDeLegajo,
      persona: cliente.persona
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  private createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id']).value,
      nroDeLegajo: this.editForm.get(['nroDeLegajo']).value,
      persona: this.editForm.get(['persona']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>) {
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
