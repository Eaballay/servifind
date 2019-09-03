package com.tesis.servifind.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A DetalleDeOrdenDeCompra.
 */
@Entity
@Table(name = "detalle_de_orden_de_compra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DetalleDeOrdenDeCompra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "cantidad", nullable = false)
    private Long cantidad;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @OneToOne
    @JoinColumn(unique = true)
    private OrdenDeCompra ordenDeCompra;

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

    public DetalleDeOrdenDeCompra cantidad(Long cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public DetalleDeOrdenDeCompra descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public OrdenDeCompra getOrdenDeCompra() {
        return ordenDeCompra;
    }

    public DetalleDeOrdenDeCompra ordenDeCompra(OrdenDeCompra ordenDeCompra) {
        this.ordenDeCompra = ordenDeCompra;
        return this;
    }

    public void setOrdenDeCompra(OrdenDeCompra ordenDeCompra) {
        this.ordenDeCompra = ordenDeCompra;
    }

    public Dominio getUnidad() {
        return unidad;
    }

    public DetalleDeOrdenDeCompra unidad(Dominio dominio) {
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
        if (!(o instanceof DetalleDeOrdenDeCompra)) {
            return false;
        }
        return id != null && id.equals(((DetalleDeOrdenDeCompra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DetalleDeOrdenDeCompra{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
