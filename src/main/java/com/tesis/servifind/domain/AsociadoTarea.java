package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A AsociadoTarea.
 */
@Entity
@Table(name = "asociado_tarea")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AsociadoTarea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Asociado asociado;

    @OneToOne
    @JoinColumn(unique = true)
    private Tarea tarea;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Asociado getAsociado() {
        return asociado;
    }

    public AsociadoTarea asociado(Asociado asociado) {
        this.asociado = asociado;
        return this;
    }

    public void setAsociado(Asociado asociado) {
        this.asociado = asociado;
    }

    public Tarea getTarea() {
        return tarea;
    }

    public AsociadoTarea tarea(Tarea tarea) {
        this.tarea = tarea;
        return this;
    }

    public void setTarea(Tarea tarea) {
        this.tarea = tarea;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AsociadoTarea)) {
            return false;
        }
        return id != null && id.equals(((AsociadoTarea) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AsociadoTarea{" +
            "id=" + getId() +
            "}";
    }
}
