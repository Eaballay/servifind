package com.tesis.servifind.repository;

import com.tesis.servifind.domain.DetalleDePresupuesto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DetalleDePresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetalleDePresupuestoRepository extends JpaRepository<DetalleDePresupuesto, Long> {

}
