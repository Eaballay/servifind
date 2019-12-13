package com.tesis.servifind.repository;

import com.tesis.servifind.domain.DetalleProyecto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DetalleProyecto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetalleProyectoRepository extends JpaRepository<DetalleProyecto, Long> {

}
