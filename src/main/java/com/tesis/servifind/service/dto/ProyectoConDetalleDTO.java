package com.tesis.servifind.service.dto;

import com.tesis.servifind.domain.DetalleProyecto;

import java.util.List;

public class ProyectoConDetalleDTO {

    private String descripcion;
    private List<DetalleProyecto> listaDeDetalles;

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<DetalleProyecto> getListaDeDetalles() {
        return listaDeDetalles;
    }

    public void setListaDeDetalles(List<DetalleProyecto> listaDeDetalles) {
        this.listaDeDetalles = listaDeDetalles;
    }

}
