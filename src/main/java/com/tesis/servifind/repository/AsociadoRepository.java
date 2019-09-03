package com.tesis.servifind.repository;

import com.tesis.servifind.domain.Asociado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Asociado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsociadoRepository extends JpaRepository<Asociado, Long> {

}
