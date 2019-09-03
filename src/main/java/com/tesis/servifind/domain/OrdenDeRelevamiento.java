package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A OrdenDeRelevamiento.
 */
@Entity
@Table(name = "orden_de_relevamiento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrdenDeRelevamiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "comentario")
    private String comentario;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private Instant fecha;

    @NotNull
    @Column(name = "hora", nullable = false)
    private Instant hora;

    @OneToOne
    @JoinColumn(unique = true)
    private Proyecto proyecto;

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

    public String getComentario() {
        return comentario;
    }

    public OrdenDeRelevamiento comentario(String comentario) {
        this.comentario = comentario;
        return this;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Instant getFecha() {
        return fecha;
    }

    public OrdenDeRelevamiento fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Instant getHora() {
        return hora;
    }

    public OrdenDeRelevamiento hora(Instant hora) {
        this.hora = hora;
        return this;
    }

    public void setHora(Instant hora) {
        this.hora = hora;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public OrdenDeRelevamiento proyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
        return this;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public Dominio getEstado() {
        return estado;
    }

    public OrdenDeRelevamiento estado(Dominio dominio) {
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
        if (!(o instanceof OrdenDeRelevamiento)) {
            return false;
        }
        return id != null && id.equals(((OrdenDeRelevamiento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrdenDeRelevamiento{" +
            "id=" + getId() +
            ", comentario='" + getComentario() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", hora='" + getHora() + "'" +
            "}";
    }
}
