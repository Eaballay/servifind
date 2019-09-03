package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.tesis.servifind.domain.enumeration.TipoDeDominio;

/**
 * A Dominio.
 */
@Entity
@Table(name = "dominio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Dominio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "valor", nullable = false)
    private String valor;

    @NotNull
    @Column(name = "etiqueta", nullable = false)
    private String etiqueta;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_de_dominio", nullable = false)
    private TipoDeDominio tipoDeDominio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValor() {
        return valor;
    }

    public Dominio valor(String valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public String getEtiqueta() {
        return etiqueta;
    }

    public Dominio etiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
        return this;
    }

    public void setEtiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Dominio descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public TipoDeDominio getTipoDeDominio() {
        return tipoDeDominio;
    }

    public Dominio tipoDeDominio(TipoDeDominio tipoDeDominio) {
        this.tipoDeDominio = tipoDeDominio;
        return this;
    }

    public void setTipoDeDominio(TipoDeDominio tipoDeDominio) {
        this.tipoDeDominio = tipoDeDominio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dominio)) {
            return false;
        }
        return id != null && id.equals(((Dominio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Dominio{" +
            "id=" + getId() +
            ", valor='" + getValor() + "'" +
            ", etiqueta='" + getEtiqueta() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", tipoDeDominio='" + getTipoDeDominio() + "'" +
            "}";
    }
}
