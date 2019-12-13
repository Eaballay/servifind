import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, LoginModalService } from 'app/core';
import { DominioService } from 'app/entities/dominio';
import { IDominio } from 'app/shared/model/dominio.model';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { IProyecto, Proyecto } from 'app/shared/model/proyecto.model';
import { ProyectoService } from 'app/entities/proyecto';
import * as moment from 'moment';
import { DetalleProyecto, IDetalleProyecto } from 'app/shared/model/detalle-proyecto.model';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
  constructor(
    private titleService: Title,
    private router: Router,
    private loginModalService: LoginModalService,
    private accountService: AccountService,
    private dominioService: DominioService,
    private jhiAlertService: JhiAlertService,
    private proyectoService: ProyectoService
  ) {}

  colors: string[] = ['royalblue', 'slateblue', 'darkcyan', 'slategrey', 'salmon', 'brown', 'yellowgreen', 'goldenrod'];
  //rubros: string[] = ['Carpinteria', 'Plomeria', 'Electricidad', 'Calefacción', 'Construcción', 'Vidrieria'];
  rubrosS: IDominio[];
  //actividades: string[] = ['Interior', 'Exterior', 'Grandes proyectos'];
  actividadesS: IDominio[];
  tareasS: IDominio[];

  modalRef: NgbModalRef;

  isMobile = false;
  showRubros = false;
  loadingRubros = false;
  creandoSolicitud = false;
  showActividades = false;
  showTareas = false;
  showFinal = false;

  proyecto: IProyecto;
  rubroSelecionado: IDominio;
  dimensionSelecionada: IDominio;
  tipoTareaSeleccionada: IDominio;
  listaDeDetalles: IDetalleProyecto[];

  descripcionProyecto: string;
  direccionProyecto: string;

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'serviFindApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });

    var ua = navigator.userAgent;

    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);

    if (this.isMobile) {
      this.loadRubros();
    }
  }

  loadRubros() {
    console.log('Obteniendo rubros');
    this.dominioService
      .getRubros()
      .pipe(
        filter((res: HttpResponse<IDominio[]>) => res.ok),
        map((res: HttpResponse<IDominio[]>) => res.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          this.rubrosS = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  login() {
    if (!this.isAuthenticated()) {
      this.modalRef = this.loginModalService.open();
    } else {
      this.loadingRubros = true;
      this.creandoSolicitud = true;
      setTimeout(() => {
        this.loadingRubros = false;
        this.showRubros = true;
      }, 900);
    }
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  getRandomColor(): string {
    let pos = Math.floor(Math.random() * this.colors.length);
    return this.colors[pos];
  }

  selectRubro(rubro: IDominio) {
    this.showRubros = false;
    this.loadingRubros = true;
    //setTimeout(() => {
    //  this.loadingRubros = false;
    //  this.showActividades = true;
    //}, 900);

    console.log('Obteniendo actividades: ', rubro.etiqueta);
    this.rubroSelecionado = rubro;
    this.dominioService
      .getDimensiones(rubro.valor)
      .pipe(
        filter((res: HttpResponse<IDominio[]>) => res.ok),
        map((res: HttpResponse<IDominio[]>) => res.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          this.actividadesS = res;
          this.showActividades = true;
          this.loadingRubros = false;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  selectActividad(dimension: IDominio) {
    this.showActividades = false;
    this.loadingRubros = true;
    //setTimeout(() => {
    //  this.loadingRubros = false;
    //  this.showActividades = true;
    //}, 900);

    console.log('Obteniendo tareas: ', dimension.etiqueta);
    this.dimensionSelecionada = dimension;
    this.dominioService
      .getTipoTareas(dimension.valor)
      .pipe(
        filter((res: HttpResponse<IDominio[]>) => res.ok),
        map((res: HttpResponse<IDominio[]>) => res.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          this.tareasS = res;
          this.showTareas = true;
          this.loadingRubros = false;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  selectTarea(tipoTarea: IDominio) {
    this.tipoTareaSeleccionada = tipoTarea;
    let detalle = new DetalleProyecto();
    detalle.rubro = this.rubroSelecionado;
    detalle.dimension = this.dimensionSelecionada;
    detalle.tipoDeTarea = this.tipoTareaSeleccionada;

    if (!this.listaDeDetalles) {
      this.listaDeDetalles = [detalle];
    } else {
      this.listaDeDetalles.push(detalle);
    }
    this.showTareas = false;
    this.showFinal = true;
  }

  agregarTarea() {
    this.rubroSelecionado = undefined;
    this.dimensionSelecionada = undefined;
    this.tipoTareaSeleccionada = undefined;
    this.showTareas = false;
    this.showActividades = false;
    this.showFinal = false;
    this.showRubros = true;
  }

  volverAtras() {
    if (this.showActividades) {
      this.showActividades = false;
      this.showRubros = true;
    } else if (this.showTareas) {
      this.showTareas = false;
      this.showActividades = true;
    } else if (this.showFinal) {
      this.showFinal = false;
      this.showTareas = true;
    }
  }

  crearProyecto() {
    this.proyecto = new Proyecto();
    this.proyecto.descripcion = this.direccionProyecto;
    this.proyecto.direccion = this.direccionProyecto;
    this.proyecto.fechaDeCreacion = moment();

    console.log(this.proyecto);
    console.log(this.listaDeDetalles);

    this.proyectoService.createWithDetalle(this.proyecto, this.listaDeDetalles).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  cancelar() {
    this.rubroSelecionado = undefined;
    this.dimensionSelecionada = undefined;
    this.tipoTareaSeleccionada = undefined;
    this.listaDeDetalles = undefined;

    this.showRubros = false;
    this.creandoSolicitud = false;
  }
}
