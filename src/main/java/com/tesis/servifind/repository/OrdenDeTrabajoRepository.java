package com.tesis.servifind.repository;

import com.tesis.servifind.domain.OrdenDeTrabajo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrdenDeTrabajo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdenDeTrabajoRepository extends JpaRepository<OrdenDeTrabajo, Long> {

}
