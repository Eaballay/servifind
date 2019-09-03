import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPersona, Persona } from 'app/shared/model/persona.model';
import { PersonaService } from './persona.service';
import { IUser, UserService } from 'app/core';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-persona-update',
  templateUrl: './persona-update.component.html'
})
export class PersonaUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  localidads: IDominio[];

  editForm = this.fb.group({
    id: [],
    cuil: [],
    direccion: [],
    nombre: [null, [Validators.required]],
    telefono: [null, [Validators.required]],
    user: [],
    localidad: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected personaService: PersonaService,
    protected userService: UserService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ persona }) => {
      this.updateForm(persona);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.dominioService
      .query({ filter: 'persona-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDominio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDominio[]>) => response.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          if (!this.editForm.get('localidad').value || !this.editForm.get('localidad').value.id) {
            this.localidads = res;
          } else {
            this.dominioService
              .find(this.editForm.get('localidad').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDominio>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDominio>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDominio) => (this.localidads = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(persona: IPersona) {
    this.editForm.patchValue({
      id: persona.id,
      cuil: persona.cuil,
      direccion: persona.direccion,
      nombre: persona.nombre,
      telefono: persona.telefono,
      user: persona.user,
      localidad: persona.localidad
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const persona = this.createFromForm();
    if (persona.id !== undefined) {
      this.subscribeToSaveResponse(this.personaService.update(persona));
    } else {
      this.subscribeToSaveResponse(this.personaService.create(persona));
    }
  }

  private createFromForm(): IPersona {
    return {
      ...new Persona(),
      id: this.editForm.get(['id']).value,
      cuil: this.editForm.get(['cuil']).value,
      direccion: this.editForm.get(['direccion']).value,
      nombre: this.editForm.get(['nombre']).value,
      telefono: this.editForm.get(['telefono']).value,
      user: this.editForm.get(['user']).value,
      localidad: this.editForm.get(['localidad']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersona>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackDominioById(index: number, item: IDominio) {
    return item.id;
  }
}
