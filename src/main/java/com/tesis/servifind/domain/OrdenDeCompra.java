package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A OrdenDeCompra.
 */
@Entity
@Table(name = "orden_de_compra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrdenDeCompra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nro_orden_de_compra", nullable = false)
    private Long nroOrdenDeCompra;

    @NotNull
    @Column(name = "fecha_de_creacion", nullable = false)
    private Instant fechaDeCreacion;

    @OneToOne
    @JoinColumn(unique = true)
    private Presupuesto presupuesto;

    @OneToOne
    @JoinColumn(unique = true)
    private Empleado empleado;

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

    public Long getNroOrdenDeCompra() {
        return nroOrdenDeCompra;
    }

    public OrdenDeCompra nroOrdenDeCompra(Long nroOrdenDeCompra) {
        this.nroOrdenDeCompra = nroOrdenDeCompra;
        return this;
    }

    public void setNroOrdenDeCompra(Long nroOrdenDeCompra) {
        this.nroOrdenDeCompra = nroOrdenDeCompra;
    }

    public Instant getFechaDeCreacion() {
        return fechaDeCreacion;
    }

    public OrdenDeCompra fechaDeCreacion(Instant fechaDeCreacion) {
        this.fechaDeCreacion = fechaDeCreacion;
        return this;
    }

    public void setFechaDeCreacion(Instant fechaDeCreacion) {
        this.fechaDeCreacion = fechaDeCreacion;
    }

    public Presupuesto getPresupuesto() {
        return presupuesto;
    }

    public OrdenDeCompra presupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
        return this;
    }

    public void setPresupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public OrdenDeCompra empleado(Empleado empleado) {
        this.empleado = empleado;
        return this;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Dominio getEstado() {
        return estado;
    }

    public OrdenDeCompra estado(Dominio dominio) {
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
        if (!(o instanceof OrdenDeCompra)) {
            return false;
        }
        return id != null && id.equals(((OrdenDeCompra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrdenDeCompra{" +
            "id=" + getId() +
            ", nroOrdenDeCompra=" + getNroOrdenDeCompra() +
            ", fechaDeCreacion='" + getFechaDeCreacion() + "'" +
            "}";
    }
}
