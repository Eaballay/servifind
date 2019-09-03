package com.tesis.servifind.repository;

import com.tesis.servifind.domain.OrdenDeTrabajoTarea;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrdenDeTrabajoTarea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdenDeTrabajoTareaRepository extends JpaRepository<OrdenDeTrabajoTarea, Long> {

}
