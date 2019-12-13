import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dominio',
        loadChildren: () => import('./dominio/dominio.module').then(m => m.ServiFindDominioModule)
      },
      {
        path: 'persona',
        loadChildren: () => import('./persona/persona.module').then(m => m.ServiFindPersonaModule)
      },
      {
        path: 'empleado',
        loadChildren: () => import('./empleado/empleado.module').then(m => m.ServiFindEmpleadoModule)
      },
      {
        path: 'rol-empleado',
        loadChildren: () => import('./rol-empleado/rol-empleado.module').then(m => m.ServiFindRolEmpleadoModule)
      },
      {
        path: 'asociado',
        loadChildren: () => import('./asociado/asociado.module').then(m => m.ServiFindAsociadoModule)
      },
      {
        path: 'asociado-tarea',
        loadChildren: () => import('./asociado-tarea/asociado-tarea.module').then(m => m.ServiFindAsociadoTareaModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ServiFindClienteModule)
      },
      {
        path: 'presupuesto',
        loadChildren: () => import('./presupuesto/presupuesto.module').then(m => m.ServiFindPresupuestoModule)
      },
      {
        path: 'detalle-de-presupuesto',
        loadChildren: () =>
          import('./detalle-de-presupuesto/detalle-de-presupuesto.module').then(m => m.ServiFindDetalleDePresupuestoModule)
      },
      {
        path: 'proyecto',
        loadChildren: () => import('./proyecto/proyecto.module').then(m => m.ServiFindProyectoModule)
      },
      {
        path: 'orden-de-trabajo',
        loadChildren: () => import('./orden-de-trabajo/orden-de-trabajo.module').then(m => m.ServiFindOrdenDeTrabajoModule)
      },
      {
        path: 'orden-de-trabajo-tarea',
        loadChildren: () => import('./orden-de-trabajo-tarea/orden-de-trabajo-tarea.module').then(m => m.ServiFindOrdenDeTrabajoTareaModule)
      },
      {
        path: 'tarea',
        loadChildren: () => import('./tarea/tarea.module').then(m => m.ServiFindTareaModule)
      },
      {
        path: 'orden-de-compra',
        loadChildren: () => import('./orden-de-compra/orden-de-compra.module').then(m => m.ServiFindOrdenDeCompraModule)
      },
      {
        path: 'detalle-de-orden-de-compra',
        loadChildren: () =>
          import('./detalle-de-orden-de-compra/detalle-de-orden-de-compra.module').then(m => m.ServiFindDetalleDeOrdenDeCompraModule)
      },
      {
        path: 'orden-de-relevamiento',
        loadChildren: () => import('./orden-de-relevamiento/orden-de-relevamiento.module').then(m => m.ServiFindOrdenDeRelevamientoModule)
      },
      {
        path: 'evaluacion-de-proyecto',
        loadChildren: () =>
          import('./evaluacion-de-proyecto/evaluacion-de-proyecto.module').then(m => m.ServiFindEvaluacionDeProyectoModule)
      },
      {
        path: 'detalle-proyecto',
        loadChildren: () => import('./detalle-proyecto/detalle-proyecto.module').then(m => m.ServiFindDetalleProyectoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindEntityModule {}
