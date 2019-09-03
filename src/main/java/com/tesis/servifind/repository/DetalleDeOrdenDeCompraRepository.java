package com.tesis.servifind.repository;

import com.tesis.servifind.domain.DetalleDeOrdenDeCompra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DetalleDeOrdenDeCompra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetalleDeOrdenDeCompraRepository extends JpaRepository<DetalleDeOrdenDeCompra, Long> {

}
