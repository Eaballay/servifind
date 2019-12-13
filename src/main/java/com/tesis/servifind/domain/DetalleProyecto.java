package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A DetalleProyecto.
 */
@Entity
@Table(name = "detalle_proyecto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DetalleProyecto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Proyecto proyecto;

    @OneToOne
    @JoinColumn(unique = true)
    private Dominio rubro;

    @OneToOne
    @JoinColumn(unique = true)
    private Dominio dimension;

    @OneToOne
    @JoinColumn(unique = true)
    private Dominio tipoDeTarea;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public DetalleProyecto proyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
        return this;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public Dominio getRubro() {
        return rubro;
    }

    public DetalleProyecto rubro(Dominio dominio) {
        this.rubro = dominio;
        return this;
    }

    public void setRubro(Dominio dominio) {
        this.rubro = dominio;
    }

    public Dominio getDimension() {
        return dimension;
    }

    public DetalleProyecto dimension(Dominio dominio) {
        this.dimension = dominio;
        return this;
    }

    public void setDimension(Dominio dominio) {
        this.dimension = dominio;
    }

    public Dominio getTipoDeTarea() {
        return tipoDeTarea;
    }

    public DetalleProyecto tipoDeTarea(Dominio dominio) {
        this.tipoDeTarea = dominio;
        return this;
    }

    public void setTipoDeTarea(Dominio dominio) {
        this.tipoDeTarea = dominio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetalleProyecto)) {
            return false;
        }
        return id != null && id.equals(((DetalleProyecto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DetalleProyecto{" +
            "id=" + getId() +
            "}";
    }
}
