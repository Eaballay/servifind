package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A OrdenDeTrabajoTarea.
 */
@Entity
@Table(name = "orden_de_trabajo_tarea")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrdenDeTrabajoTarea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad")
    private Long cantidad;

    @Column(name = "precio_por_unidad")
    private String precioPorUnidad;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToOne
    @JoinColumn(unique = true)
    private OrdenDeTrabajo ordenDeTrabajo;

    @OneToOne
    @JoinColumn(unique = true)
    private Dominio unidad;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public OrdenDeTrabajoTarea cantidad(Long cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public String getPrecioPorUnidad() {
        return precioPorUnidad;
    }

    public OrdenDeTrabajoTarea precioPorUnidad(String precioPorUnidad) {
        this.precioPorUnidad = precioPorUnidad;
        return this;
    }

    public void setPrecioPorUnidad(String precioPorUnidad) {
        this.precioPorUnidad = precioPorUnidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public OrdenDeTrabajoTarea descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public OrdenDeTrabajo getOrdenDeTrabajo() {
        return ordenDeTrabajo;
    }

    public OrdenDeTrabajoTarea ordenDeTrabajo(OrdenDeTrabajo ordenDeTrabajo) {
        this.ordenDeTrabajo = ordenDeTrabajo;
        return this;
    }

    public void setOrdenDeTrabajo(OrdenDeTrabajo ordenDeTrabajo) {
        this.ordenDeTrabajo = ordenDeTrabajo;
    }

    public Dominio getUnidad() {
        return unidad;
    }

    public OrdenDeTrabajoTarea unidad(Dominio dominio) {
        this.unidad = dominio;
        return this;
    }

    public void setUnidad(Dominio dominio) {
        this.unidad = dominio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrdenDeTrabajoTarea)) {
            return false;
        }
        return id != null && id.equals(((OrdenDeTrabajoTarea) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrdenDeTrabajoTarea{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", precioPorUnidad='" + getPrecioPorUnidad() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
