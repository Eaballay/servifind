package com.tesis.servifind.repository;

import com.tesis.servifind.domain.Tarea;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tarea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {

}
