package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A EvaluacionDeProyecto.
 */
@Entity
@Table(name = "evaluacion_de_proyecto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EvaluacionDeProyecto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "comentario")
    private String comentario;

    @Column(name = "calificacion")
    private Long calificacion;

    @Column(name = "fecha_de_creacion")
    private Instant fechaDeCreacion;

    @OneToOne
    @JoinColumn(unique = true)
    private Proyecto proyecto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComentario() {
        return comentario;
    }

    public EvaluacionDeProyecto comentario(String comentario) {
        this.comentario = comentario;
        return this;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Long getCalificacion() {
        return calificacion;
    }

    public EvaluacionDeProyecto calificacion(Long calificacion) {
        this.calificacion = calificacion;
        return this;
    }

    public void setCalificacion(Long calificacion) {
        this.calificacion = calificacion;
    }

    public Instant getFechaDeCreacion() {
        return fechaDeCreacion;
    }

    public EvaluacionDeProyecto fechaDeCreacion(Instant fechaDeCreacion) {
        this.fechaDeCreacion = fechaDeCreacion;
        return this;
    }

    public void setFechaDeCreacion(Instant fechaDeCreacion) {
        this.fechaDeCreacion = fechaDeCreacion;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public EvaluacionDeProyecto proyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
        return this;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EvaluacionDeProyecto)) {
            return false;
        }
        return id != null && id.equals(((EvaluacionDeProyecto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EvaluacionDeProyecto{" +
            "id=" + getId() +
            ", comentario='" + getComentario() + "'" +
            ", calificacion=" + getCalificacion() +
            ", fechaDeCreacion='" + getFechaDeCreacion() + "'" +
            "}";
    }
}
