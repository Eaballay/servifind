package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.RolEmpleado;
import com.tesis.servifind.repository.RolEmpleadoRepository;
import com.tesis.servifind.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tesis.servifind.domain.RolEmpleado}.
 */
@RestController
@RequestMapping("/api")
public class RolEmpleadoResource {

    private final Logger log = LoggerFactory.getLogger(RolEmpleadoResource.class);

    private static final String ENTITY_NAME = "rolEmpleado";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RolEmpleadoRepository rolEmpleadoRepository;

    public RolEmpleadoResource(RolEmpleadoRepository rolEmpleadoRepository) {
        this.rolEmpleadoRepository = rolEmpleadoRepository;
    }

    /**
     * {@code POST  /rol-empleados} : Create a new rolEmpleado.
     *
     * @param rolEmpleado the rolEmpleado to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rolEmpleado, or with status {@code 400 (Bad Request)} if the rolEmpleado has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rol-empleados")
    public ResponseEntity<RolEmpleado> createRolEmpleado(@RequestBody RolEmpleado rolEmpleado) throws URISyntaxException {
        log.debug("REST request to save RolEmpleado : {}", rolEmpleado);
        if (rolEmpleado.getId() != null) {
            throw new BadRequestAlertException("A new rolEmpleado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RolEmpleado result = rolEmpleadoRepository.save(rolEmpleado);
        return ResponseEntity.created(new URI("/api/rol-empleados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rol-empleados} : Updates an existing rolEmpleado.
     *
     * @param rolEmpleado the rolEmpleado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rolEmpleado,
     * or with status {@code 400 (Bad Request)} if the rolEmpleado is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rolEmpleado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rol-empleados")
    public ResponseEntity<RolEmpleado> updateRolEmpleado(@RequestBody RolEmpleado rolEmpleado) throws URISyntaxException {
        log.debug("REST request to update RolEmpleado : {}", rolEmpleado);
        if (rolEmpleado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RolEmpleado result = rolEmpleadoRepository.save(rolEmpleado);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rolEmpleado.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rol-empleados} : get all the rolEmpleados.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rolEmpleados in body.
     */
    @GetMapping("/rol-empleados")
    public List<RolEmpleado> getAllRolEmpleados() {
        log.debug("REST request to get all RolEmpleados");
        return rolEmpleadoRepository.findAll();
    }

    /**
     * {@code GET  /rol-empleados/:id} : get the "id" rolEmpleado.
     *
     * @param id the id of the rolEmpleado to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rolEmpleado, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rol-empleados/{id}")
    public ResponseEntity<RolEmpleado> getRolEmpleado(@PathVariable Long id) {
        log.debug("REST request to get RolEmpleado : {}", id);
        Optional<RolEmpleado> rolEmpleado = rolEmpleadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rolEmpleado);
    }

    /**
     * {@code DELETE  /rol-empleados/:id} : delete the "id" rolEmpleado.
     *
     * @param id the id of the rolEmpleado to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rol-empleados/{id}")
    public ResponseEntity<Void> deleteRolEmpleado(@PathVariable Long id) {
        log.debug("REST request to delete RolEmpleado : {}", id);
        rolEmpleadoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
