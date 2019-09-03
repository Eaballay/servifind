package com.tesis.servifind.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Proyecto.
 */
@Entity
@Table(name = "proyecto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Proyecto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nro_de_proyecto", nullable = false)
    private Long nroDeProyecto;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @NotNull
    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "fecha_de_inicio")
    private Instant fechaDeInicio;

    @Column(name = "fecha_de_finalizacion")
    private Instant fechaDeFinalizacion;

    @NotNull
    @Column(name = "fecha_de_creacion", nullable = false)
    private Instant fechaDeCreacion;

    @ManyToOne
    @JsonIgnoreProperties("proyectos")
    private Cliente cliente;

    @ManyToOne
    @JsonIgnoreProperties("proyectos")
    private Dominio estado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNroDeProyecto() {
        return nroDeProyecto;
    }

    public Proyecto nroDeProyecto(Long nroDeProyecto) {
        this.nroDeProyecto = nroDeProyecto;
        return this;
    }

    public void setNroDeProyecto(Long nroDeProyecto) {
        this.nroDeProyecto = nroDeProyecto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Proyecto descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDireccion() {
        return direccion;
    }

    public Proyecto direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Instant getFechaDeInicio() {
        return fechaDeInicio;
    }

    public Proyecto fechaDeInicio(Instant fechaDeInicio) {
        this.fechaDeInicio = fechaDeInicio;
        return this;
    }

    public void setFechaDeInicio(Instant fechaDeInicio) {
        this.fechaDeInicio = fechaDeInicio;
    }

    public Instant getFechaDeFinalizacion() {
        return fechaDeFinalizacion;
    }

    public Proyecto fechaDeFinalizacion(Instant fechaDeFinalizacion) {
        this.fechaDeFinalizacion = fechaDeFinalizacion;
        return this;
    }

    public void setFechaDeFinalizacion(Instant fechaDeFinalizacion) {
        this.fechaDeFinalizacion = fechaDeFinalizacion;
    }

    public Instant getFechaDeCreacion() {
        return fechaDeCreacion;
    }

    public Proyecto fechaDeCreacion(Instant fechaDeCreacion) {
        this.fechaDeCreacion = fechaDeCreacion;
        return this;
    }

    public void setFechaDeCreacion(Instant fechaDeCreacion) {
        this.fechaDeCreacion = fechaDeCreacion;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Proyecto cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Dominio getEstado() {
        return estado;
    }

    public Proyecto estado(Dominio dominio) {
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
        if (!(o instanceof Proyecto)) {
            return false;
        }
        return id != null && id.equals(((Proyecto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Proyecto{" +
            "id=" + getId() +
            ", nroDeProyecto=" + getNroDeProyecto() +
            ", descripcion='" + getDescripcion() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", fechaDeInicio='" + getFechaDeInicio() + "'" +
            ", fechaDeFinalizacion='" + getFechaDeFinalizacion() + "'" +
            ", fechaDeCreacion='" + getFechaDeCreacion() + "'" +
            "}";
    }
}
