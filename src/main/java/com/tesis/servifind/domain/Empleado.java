package com.tesis.servifind.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Empleado.
 */
@Entity
@Table(name = "empleado")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "fecha_de_contratacion", nullable = false)
    private Instant fechaDeContratacion;

    @NotNull
    @Column(name = "nro_de_legajo", nullable = false)
    private Long nroDeLegajo;

    @ManyToOne
    @JsonIgnoreProperties("empleados")
    private Persona persona;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaDeContratacion() {
        return fechaDeContratacion;
    }

    public Empleado fechaDeContratacion(Instant fechaDeContratacion) {
        this.fechaDeContratacion = fechaDeContratacion;
        return this;
    }

    public void setFechaDeContratacion(Instant fechaDeContratacion) {
        this.fechaDeContratacion = fechaDeContratacion;
    }

    public Long getNroDeLegajo() {
        return nroDeLegajo;
    }

    public Empleado nroDeLegajo(Long nroDeLegajo) {
        this.nroDeLegajo = nroDeLegajo;
        return this;
    }

    public void setNroDeLegajo(Long nroDeLegajo) {
        this.nroDeLegajo = nroDeLegajo;
    }

    public Persona getPersona() {
        return persona;
    }

    public Empleado persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empleado)) {
            return false;
        }
        return id != null && id.equals(((Empleado) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Empleado{" +
            "id=" + getId() +
            ", fechaDeContratacion='" + getFechaDeContratacion() + "'" +
            ", nroDeLegajo=" + getNroDeLegajo() +
            "}";
    }
}
