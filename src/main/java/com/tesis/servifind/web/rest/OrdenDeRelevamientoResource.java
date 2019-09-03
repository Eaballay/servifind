package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.OrdenDeRelevamiento;
import com.tesis.servifind.repository.OrdenDeRelevamientoRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.OrdenDeRelevamiento}.
 */
@RestController
@RequestMapping("/api")
public class OrdenDeRelevamientoResource {

    private final Logger log = LoggerFactory.getLogger(OrdenDeRelevamientoResource.class);

    private static final String ENTITY_NAME = "ordenDeRelevamiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrdenDeRelevamientoRepository ordenDeRelevamientoRepository;

    public OrdenDeRelevamientoResource(OrdenDeRelevamientoRepository ordenDeRelevamientoRepository) {
        this.ordenDeRelevamientoRepository = ordenDeRelevamientoRepository;
    }

    /**
     * {@code POST  /orden-de-relevamientos} : Create a new ordenDeRelevamiento.
     *
     * @param ordenDeRelevamiento the ordenDeRelevamiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ordenDeRelevamiento, or with status {@code 400 (Bad Request)} if the ordenDeRelevamiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/orden-de-relevamientos")
    public ResponseEntity<OrdenDeRelevamiento> createOrdenDeRelevamiento(@Valid @RequestBody OrdenDeRelevamiento ordenDeRelevamiento) throws URISyntaxException {
        log.debug("REST request to save OrdenDeRelevamiento : {}", ordenDeRelevamiento);
        if (ordenDeRelevamiento.getId() != null) {
            throw new BadRequestAlertException("A new ordenDeRelevamiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdenDeRelevamiento result = ordenDeRelevamientoRepository.save(ordenDeRelevamiento);
        return ResponseEntity.created(new URI("/api/orden-de-relevamientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /orden-de-relevamientos} : Updates an existing ordenDeRelevamiento.
     *
     * @param ordenDeRelevamiento the ordenDeRelevamiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ordenDeRelevamiento,
     * or with status {@code 400 (Bad Request)} if the ordenDeRelevamiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ordenDeRelevamiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/orden-de-relevamientos")
    public ResponseEntity<OrdenDeRelevamiento> updateOrdenDeRelevamiento(@Valid @RequestBody OrdenDeRelevamiento ordenDeRelevamiento) throws URISyntaxException {
        log.debug("REST request to update OrdenDeRelevamiento : {}", ordenDeRelevamiento);
        if (ordenDeRelevamiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrdenDeRelevamiento result = ordenDeRelevamientoRepository.save(ordenDeRelevamiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ordenDeRelevamiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /orden-de-relevamientos} : get all the ordenDeRelevamientos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ordenDeRelevamientos in body.
     */
    @GetMapping("/orden-de-relevamientos")
    public List<OrdenDeRelevamiento> getAllOrdenDeRelevamientos() {
        log.debug("REST request to get all OrdenDeRelevamientos");
        return ordenDeRelevamientoRepository.findAll();
    }

    /**
     * {@code GET  /orden-de-relevamientos/:id} : get the "id" ordenDeRelevamiento.
     *
     * @param id the id of the ordenDeRelevamiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ordenDeRelevamiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/orden-de-relevamientos/{id}")
    public ResponseEntity<OrdenDeRelevamiento> getOrdenDeRelevamiento(@PathVariable Long id) {
        log.debug("REST request to get OrdenDeRelevamiento : {}", id);
        Optional<OrdenDeRelevamiento> ordenDeRelevamiento = ordenDeRelevamientoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ordenDeRelevamiento);
    }

    /**
     * {@code DELETE  /orden-de-relevamientos/:id} : delete the "id" ordenDeRelevamiento.
     *
     * @param id the id of the ordenDeRelevamiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/orden-de-relevamientos/{id}")
    public ResponseEntity<Void> deleteOrdenDeRelevamiento(@PathVariable Long id) {
        log.debug("REST request to delete OrdenDeRelevamiento : {}", id);
        ordenDeRelevamientoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
