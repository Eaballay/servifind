import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IProyecto, Proyecto } from 'app/shared/model/proyecto.model';
import { ProyectoService } from './proyecto.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-proyecto-update',
  templateUrl: './proyecto-update.component.html'
})
export class ProyectoUpdateComponent implements OnInit {
  isSaving: boolean;

  clientes: ICliente[];

  dominios: IDominio[];

  editForm = this.fb.group({
    id: [],
    nroDeProyecto: [null, [Validators.required]],
    descripcion: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    fechaDeInicio: [],
    fechaDeFinalizacion: [],
    fechaDeCreacion: [null, [Validators.required]],
    cliente: [],
    estado: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected proyectoService: ProyectoService,
    protected clienteService: ClienteService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ proyecto }) => {
      this.updateForm(proyecto);
    });
    this.clienteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICliente[]>) => response.body)
      )
      .subscribe((res: ICliente[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.dominioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDominio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDominio[]>) => response.body)
      )
      .subscribe((res: IDominio[]) => (this.dominios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(proyecto: IProyecto) {
    this.editForm.patchValue({
      id: proyecto.id,
      nroDeProyecto: proyecto.nroDeProyecto,
      descripcion: proyecto.descripcion,
      direccion: proyecto.direccion,
      fechaDeInicio: proyecto.fechaDeInicio != null ? proyecto.fechaDeInicio.format(DATE_TIME_FORMAT) : null,
      fechaDeFinalizacion: proyecto.fechaDeFinalizacion != null ? proyecto.fechaDeFinalizacion.format(DATE_TIME_FORMAT) : null,
      fechaDeCreacion: proyecto.fechaDeCreacion != null ? proyecto.fechaDeCreacion.format(DATE_TIME_FORMAT) : null,
      cliente: proyecto.cliente,
      estado: proyecto.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const proyecto = this.createFromForm();
    if (proyecto.id !== undefined) {
      this.subscribeToSaveResponse(this.proyectoService.update(proyecto));
    } else {
      this.subscribeToSaveResponse(this.proyectoService.create(proyecto));
    }
  }

  private createFromForm(): IProyecto {
    return {
      ...new Proyecto(),
      id: this.editForm.get(['id']).value,
      nroDeProyecto: this.editForm.get(['nroDeProyecto']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      direccion: this.editForm.get(['direccion']).value,
      fechaDeInicio:
        this.editForm.get(['fechaDeInicio']).value != null
          ? moment(this.editForm.get(['fechaDeInicio']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaDeFinalizacion:
        this.editForm.get(['fechaDeFinalizacion']).value != null
          ? moment(this.editForm.get(['fechaDeFinalizacion']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaDeCreacion:
        this.editForm.get(['fechaDeCreacion']).value != null
          ? moment(this.editForm.get(['fechaDeCreacion']).value, DATE_TIME_FORMAT)
          : undefined,
      cliente: this.editForm.get(['cliente']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProyecto>>) {
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

  trackClienteById(index: number, item: ICliente) {
    return item.id;
  }

  trackDominioById(index: number, item: IDominio) {
    return item.id;
  }
}
