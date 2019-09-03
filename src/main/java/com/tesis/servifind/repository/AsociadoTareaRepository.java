package com.tesis.servifind.repository;

import com.tesis.servifind.domain.AsociadoTarea;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AsociadoTarea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsociadoTareaRepository extends JpaRepository<AsociadoTarea, Long> {

}
