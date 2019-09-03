package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.OrdenDeTrabajo;
import com.tesis.servifind.repository.OrdenDeTrabajoRepository;
import com.tesis.servifind.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tesis.servifind.domain.OrdenDeTrabajo}.
 */
@RestController
@RequestMapping("/api")
public class OrdenDeTrabajoResource {

    private final Logger log = LoggerFactory.getLogger(OrdenDeTrabajoResource.class);

    private static final String ENTITY_NAME = "ordenDeTrabajo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrdenDeTrabajoRepository ordenDeTrabajoRepository;

    public OrdenDeTrabajoResource(OrdenDeTrabajoRepository ordenDeTrabajoRepository) {
        this.ordenDeTrabajoRepository = ordenDeTrabajoRepository;
    }

    /**
     * {@code POST  /orden-de-trabajos} : Create a new ordenDeTrabajo.
     *
     * @param ordenDeTrabajo the ordenDeTrabajo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ordenDeTrabajo, or with status {@code 400 (Bad Request)} if the ordenDeTrabajo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/orden-de-trabajos")
    public ResponseEntity<OrdenDeTrabajo> createOrdenDeTrabajo(@Valid @RequestBody OrdenDeTrabajo ordenDeTrabajo) throws URISyntaxException {
        log.debug("REST request to save OrdenDeTrabajo : {}", ordenDeTrabajo);
        if (ordenDeTrabajo.getId() != null) {
            throw new BadRequestAlertException("A new ordenDeTrabajo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdenDeTrabajo result = ordenDeTrabajoRepository.save(ordenDeTrabajo);
        return ResponseEntity.created(new URI("/api/orden-de-trabajos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /orden-de-trabajos} : Updates an existing ordenDeTrabajo.
     *
     * @param ordenDeTrabajo the ordenDeTrabajo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ordenDeTrabajo,
     * or with status {@code 400 (Bad Request)} if the ordenDeTrabajo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ordenDeTrabajo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/orden-de-trabajos")
    public ResponseEntity<OrdenDeTrabajo> updateOrdenDeTrabajo(@Valid @RequestBody OrdenDeTrabajo ordenDeTrabajo) throws URISyntaxException {
        log.debug("REST request to update OrdenDeTrabajo : {}", ordenDeTrabajo);
        if (ordenDeTrabajo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrdenDeTrabajo result = ordenDeTrabajoRepository.save(ordenDeTrabajo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ordenDeTrabajo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /orden-de-trabajos} : get all the ordenDeTrabajos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ordenDeTrabajos in body.
     */
    @GetMapping("/orden-de-trabajos")
    public List<OrdenDeTrabajo> getAllOrdenDeTrabajos() {
        log.debug("REST request to get all OrdenDeTrabajos");
        return ordenDeTrabajoRepository.findAll();
    }

    /**
     * {@code GET  /orden-de-trabajos/:id} : get the "id" ordenDeTrabajo.
     *
     * @param id the id of the ordenDeTrabajo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ordenDeTrabajo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/orden-de-trabajos/{id}")
    public ResponseEntity<OrdenDeTrabajo> getOrdenDeTrabajo(@PathVariable Long id) {
        log.debug("REST request to get OrdenDeTrabajo : {}", id);
        Optional<OrdenDeTrabajo> ordenDeTrabajo = ordenDeTrabajoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ordenDeTrabajo);
    }

    /**
     * {@code DELETE  /orden-de-trabajos/:id} : delete the "id" ordenDeTrabajo.
     *
     * @param id the id of the ordenDeTrabajo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/orden-de-trabajos/{id}")
    public ResponseEntity<Void> deleteOrdenDeTrabajo(@PathVariable Long id) {
        log.debug("REST request to delete OrdenDeTrabajo : {}", id);
        ordenDeTrabajoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
