package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Tarea.
 */
@Entity
@Table(name = "tarea")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tarea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @NotNull
    @Column(name = "precio_por_unidad", nullable = false)
    private String precioPorUnidad;

    @NotNull
    @Column(name = "fecha_de_creacion", nullable = false)
    private Instant fechaDeCreacion;

    @NotNull
    @Column(name = "fecha_de_modificacion", nullable = false)
    private Instant fechaDeModificacion;

    @OneToOne
    @JoinColumn(unique = true)
    private Dominio actividad;

    @OneToOne
    @JoinColumn(unique = true)
    private Dominio unidad;

    @OneToOne
    @JoinColumn(unique = true)
    private Dominio estado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Tarea nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Tarea descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPrecioPorUnidad() {
        return precioPorUnidad;
    }

    public Tarea precioPorUnidad(String precioPorUnidad) {
        this.precioPorUnidad = precioPorUnidad;
        return this;
    }

    public void setPrecioPorUnidad(String precioPorUnidad) {
        this.precioPorUnidad = precioPorUnidad;
    }

    public Instant getFechaDeCreacion() {
        return fechaDeCreacion;
    }

    public Tarea fechaDeCreacion(Instant fechaDeCreacion) {
        this.fechaDeCreacion = fechaDeCreacion;
        return this;
    }

    public void setFechaDeCreacion(Instant fechaDeCreacion) {
        this.fechaDeCreacion = fechaDeCreacion;
    }

    public Instant getFechaDeModificacion() {
        return fechaDeModificacion;
    }

    public Tarea fechaDeModificacion(Instant fechaDeModificacion) {
        this.fechaDeModificacion = fechaDeModificacion;
        return this;
    }

    public void setFechaDeModificacion(Instant fechaDeModificacion) {
        this.fechaDeModificacion = fechaDeModificacion;
    }

    public Dominio getActividad() {
        return actividad;
    }

    public Tarea actividad(Dominio dominio) {
        this.actividad = dominio;
        return this;
    }

    public void setActividad(Dominio dominio) {
        this.actividad = dominio;
    }

    public Dominio getUnidad() {
        return unidad;
    }

    public Tarea unidad(Dominio dominio) {
        this.unidad = dominio;
        return this;
    }

    public void setUnidad(Dominio dominio) {
        this.unidad = dominio;
    }

    public Dominio getEstado() {
        return estado;
    }

    public Tarea estado(Dominio dominio) {
        this.estado = dominio;
        return this;
    }

    public void setEstado(Dominio dominio) {
        this.estado = dominio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tarea)) {
            return false;
        }
        return id != null && id.equals(((Tarea) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tarea{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", precioPorUnidad='" + getPrecioPorUnidad() + "'" +
            ", fechaDeCreacion='" + getFechaDeCreacion() + "'" +
            ", fechaDeModificacion='" + getFechaDeModificacion() + "'" +
            "}";
    }
}
