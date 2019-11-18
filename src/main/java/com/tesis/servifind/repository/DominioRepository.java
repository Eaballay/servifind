package com.tesis.servifind.repository;

import com.tesis.servifind.domain.Dominio;
import com.tesis.servifind.domain.enumeration.TipoDeDominio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Dominio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DominioRepository extends JpaRepository<Dominio, Long> {


    List<Dominio> findByTipoDeDominioEquals(TipoDeDominio tipoDeDominio);

    List<Dominio> findByTipoDeDominioEqualsAndValorStartsWith(TipoDeDominio tipoDeDominio, String startsWith);

}
