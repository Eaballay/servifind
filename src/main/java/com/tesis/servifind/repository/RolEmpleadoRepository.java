package com.tesis.servifind.repository;

import com.tesis.servifind.domain.RolEmpleado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RolEmpleado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolEmpleadoRepository extends JpaRepository<RolEmpleado, Long> {

}
