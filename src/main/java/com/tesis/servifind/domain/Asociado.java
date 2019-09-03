package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Asociado.
 */
@Entity
@Table(name = "asociado")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Asociado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nro_de_asociado", nullable = false)
    private Long nroDeAsociado;

    @OneToOne
    @JoinColumn(unique = true)
    private Persona persona;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNroDeAsociado() {
        return nroDeAsociado;
    }

    public Asociado nroDeAsociado(Long nroDeAsociado) {
        this.nroDeAsociado = nroDeAsociado;
        return this;
    }

    public void setNroDeAsociado(Long nroDeAsociado) {
        this.nroDeAsociado = nroDeAsociado;
    }

    public Persona getPersona() {
        return persona;
    }

    public Asociado persona(Persona persona) {
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
        if (!(o instanceof Asociado)) {
            return false;
        }
        return id != null && id.equals(((Asociado) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Asociado{" +
            "id=" + getId() +
            ", nroDeAsociado=" + getNroDeAsociado() +
            "}";
    }
}
