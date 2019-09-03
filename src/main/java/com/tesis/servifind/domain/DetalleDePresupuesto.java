package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A DetalleDePresupuesto.
 */
@Entity
@Table(name = "detalle_de_presupuesto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DetalleDePresupuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "cantidad", nullable = false)
    private Long cantidad;

    @NotNull
    @Column(name = "valor_por_unidad", nullable = false)
    private String valorPorUnidad;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToOne
    @JoinColumn(unique = true)
    private Presupuesto presupuesto;

    @OneToOne
    @JoinColumn(unique = true)
    private Dominio unidad;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public DetalleDePresupuesto cantidad(Long cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public String getValorPorUnidad() {
        return valorPorUnidad;
    }

    public DetalleDePresupuesto valorPorUnidad(String valorPorUnidad) {
        this.valorPorUnidad = valorPorUnidad;
        return this;
    }

    public void setValorPorUnidad(String valorPorUnidad) {
        this.valorPorUnidad = valorPorUnidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public DetalleDePresupuesto descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Presupuesto getPresupuesto() {
        return presupuesto;
    }

    public DetalleDePresupuesto presupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
        return this;
    }

    public void setPresupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
    }

    public Dominio getUnidad() {
        return unidad;
    }

    public DetalleDePresupuesto unidad(Dominio dominio) {
        this.unidad = dominio;
        return this;
    }

    public void setUnidad(Dominio dominio) {
        this.unidad = dominio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetalleDePresupuesto)) {
            return false;
        }
        return id != null && id.equals(((DetalleDePresupuesto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DetalleDePresupuesto{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", valorPorUnidad='" + getValorPorUnidad() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
