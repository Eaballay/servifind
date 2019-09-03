package com.tesis.servifind.repository;

import com.tesis.servifind.domain.OrdenDeRelevamiento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrdenDeRelevamiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdenDeRelevamientoRepository extends JpaRepository<OrdenDeRelevamiento, Long> {

}
