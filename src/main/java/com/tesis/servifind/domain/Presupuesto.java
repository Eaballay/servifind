package com.tesis.servifind.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Presupuesto.
 */
@Entity
@Table(name = "presupuesto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Presupuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "fecha_de_creacion", nullable = false)
    private Instant fechaDeCreacion;

    @NotNull
    @Column(name = "fecha_de_vencimiento", nullable = false)
    private Instant fechaDeVencimiento;

    @ManyToOne
    @JsonIgnoreProperties("presupuestos")
    private Empleado empleado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaDeCreacion() {
        return fechaDeCreacion;
    }

    public Presupuesto fechaDeCreacion(Instant fechaDeCreacion) {
        this.fechaDeCreacion = fechaDeCreacion;
        return this;
    }

    public void setFechaDeCreacion(Instant fechaDeCreacion) {
        this.fechaDeCreacion = fechaDeCreacion;
    }

    public Instant getFechaDeVencimiento() {
        return fechaDeVencimiento;
    }

    public Presupuesto fechaDeVencimiento(Instant fechaDeVencimiento) {
        this.fechaDeVencimiento = fechaDeVencimiento;
        return this;
    }

    public void setFechaDeVencimiento(Instant fechaDeVencimiento) {
        this.fechaDeVencimiento = fechaDeVencimiento;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public Presupuesto empleado(Empleado empleado) {
        this.empleado = empleado;
        return this;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Presupuesto)) {
            return false;
        }
        return id != null && id.equals(((Presupuesto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Presupuesto{" +
            "id=" + getId() +
            ", fechaDeCreacion='" + getFechaDeCreacion() + "'" +
            ", fechaDeVencimiento='" + getFechaDeVencimiento() + "'" +
            "}";
    }
}
