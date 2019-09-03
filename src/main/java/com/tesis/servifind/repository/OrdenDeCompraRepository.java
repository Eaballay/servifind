package com.tesis.servifind.repository;

import com.tesis.servifind.domain.OrdenDeCompra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrdenDeCompra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdenDeCompraRepository extends JpaRepository<OrdenDeCompra, Long> {

}
