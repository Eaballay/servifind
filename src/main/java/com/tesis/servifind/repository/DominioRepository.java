package com.tesis.servifind.repository;

import com.tesis.servifind.domain.Dominio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Dominio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DominioRepository extends JpaRepository<Dominio, Long> {

}
