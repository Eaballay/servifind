package com.tesis.servifind.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A OrdenDeTrabajo.
 */
@Entity
@Table(name = "orden_de_trabajo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrdenDeTrabajo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "fecha_de_realizacion", nullable = false)
    private Instant fechaDeRealizacion;

    @Column(name = "horas_estimadas")
    private Long horasEstimadas;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @OneToOne
    @JoinColumn(unique = true)
    private Proyecto proyecto;

    @OneToOne
    @JoinColumn(unique = true)
    private Asociado asociado;

    @ManyToOne
    @JsonIgnoreProperties("ordenDeTrabajos")
    private Dominio estado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaDeRealizacion() {
        return fechaDeRealizacion;
    }

    public OrdenDeTrabajo fechaDeRealizacion(Instant fechaDeRealizacion) {
        this.fechaDeRealizacion = fechaDeRealizacion;
        return this;
    }

    public void setFechaDeRealizacion(Instant fechaDeRealizacion) {
        this.fechaDeRealizacion = fechaDeRealizacion;
    }

    public Long getHorasEstimadas() {
        return horasEstimadas;
    }

    public OrdenDeTrabajo horasEstimadas(Long horasEstimadas) {
        this.horasEstimadas = horasEstimadas;
        return this;
    }

    public void setHorasEstimadas(Long horasEstimadas) {
        this.horasEstimadas = horasEstimadas;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public OrdenDeTrabajo descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public OrdenDeTrabajo proyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
        return this;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public Asociado getAsociado() {
        return asociado;
    }

    public OrdenDeTrabajo asociado(Asociado asociado) {
        this.asociado = asociado;
        return this;
    }

    public void setAsociado(Asociado asociado) {
        this.asociado = asociado;
    }

    public Dominio getEstado() {
        return estado;
    }

    public OrdenDeTrabajo estado(Dominio dominio) {
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
        if (!(o instanceof OrdenDeTrabajo)) {
            return false;
        }
        return id != null && id.equals(((OrdenDeTrabajo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrdenDeTrabajo{" +
            "id=" + getId() +
            ", fechaDeRealizacion='" + getFechaDeRealizacion() + "'" +
            ", horasEstimadas=" + getHorasEstimadas() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
