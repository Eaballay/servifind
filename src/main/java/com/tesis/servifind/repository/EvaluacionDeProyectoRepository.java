package com.tesis.servifind.repository;

import com.tesis.servifind.domain.EvaluacionDeProyecto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EvaluacionDeProyecto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EvaluacionDeProyectoRepository extends JpaRepository<EvaluacionDeProyecto, Long> {

}
