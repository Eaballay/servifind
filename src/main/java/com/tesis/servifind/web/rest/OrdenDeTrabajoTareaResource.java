package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.OrdenDeTrabajoTarea;
import com.tesis.servifind.repository.OrdenDeTrabajoTareaRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.OrdenDeTrabajoTarea}.
 */
@RestController
@RequestMapping("/api")
public class OrdenDeTrabajoTareaResource {

    private final Logger log = LoggerFactory.getLogger(OrdenDeTrabajoTareaResource.class);

    private static final String ENTITY_NAME = "ordenDeTrabajoTarea";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrdenDeTrabajoTareaRepository ordenDeTrabajoTareaRepository;

    public OrdenDeTrabajoTareaResource(OrdenDeTrabajoTareaRepository ordenDeTrabajoTareaRepository) {
        this.ordenDeTrabajoTareaRepository = ordenDeTrabajoTareaRepository;
    }

    /**
     * {@code POST  /orden-de-trabajo-tareas} : Create a new ordenDeTrabajoTarea.
     *
     * @param ordenDeTrabajoTarea the ordenDeTrabajoTarea to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ordenDeTrabajoTarea, or with status {@code 400 (Bad Request)} if the ordenDeTrabajoTarea has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/orden-de-trabajo-tareas")
    public ResponseEntity<OrdenDeTrabajoTarea> createOrdenDeTrabajoTarea(@RequestBody OrdenDeTrabajoTarea ordenDeTrabajoTarea) throws URISyntaxException {
        log.debug("REST request to save OrdenDeTrabajoTarea : {}", ordenDeTrabajoTarea);
        if (ordenDeTrabajoTarea.getId() != null) {
            throw new BadRequestAlertException("A new ordenDeTrabajoTarea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdenDeTrabajoTarea result = ordenDeTrabajoTareaRepository.save(ordenDeTrabajoTarea);
        return ResponseEntity.created(new URI("/api/orden-de-trabajo-tareas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /orden-de-trabajo-tareas} : Updates an existing ordenDeTrabajoTarea.
     *
     * @param ordenDeTrabajoTarea the ordenDeTrabajoTarea to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ordenDeTrabajoTarea,
     * or with status {@code 400 (Bad Request)} if the ordenDeTrabajoTarea is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ordenDeTrabajoTarea couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/orden-de-trabajo-tareas")
    public ResponseEntity<OrdenDeTrabajoTarea> updateOrdenDeTrabajoTarea(@RequestBody OrdenDeTrabajoTarea ordenDeTrabajoTarea) throws URISyntaxException {
        log.debug("REST request to update OrdenDeTrabajoTarea : {}", ordenDeTrabajoTarea);
        if (ordenDeTrabajoTarea.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrdenDeTrabajoTarea result = ordenDeTrabajoTareaRepository.save(ordenDeTrabajoTarea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ordenDeTrabajoTarea.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /orden-de-trabajo-tareas} : get all the ordenDeTrabajoTareas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ordenDeTrabajoTareas in body.
     */
    @GetMapping("/orden-de-trabajo-tareas")
    public List<OrdenDeTrabajoTarea> getAllOrdenDeTrabajoTareas() {
        log.debug("REST request to get all OrdenDeTrabajoTareas");
        return ordenDeTrabajoTareaRepository.findAll();
    }

    /**
     * {@code GET  /orden-de-trabajo-tareas/:id} : get the "id" ordenDeTrabajoTarea.
     *
     * @param id the id of the ordenDeTrabajoTarea to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ordenDeTrabajoTarea, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/orden-de-trabajo-tareas/{id}")
    public ResponseEntity<OrdenDeTrabajoTarea> getOrdenDeTrabajoTarea(@PathVariable Long id) {
        log.debug("REST request to get OrdenDeTrabajoTarea : {}", id);
        Optional<OrdenDeTrabajoTarea> ordenDeTrabajoTarea = ordenDeTrabajoTareaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ordenDeTrabajoTarea);
    }

    /**
     * {@code DELETE  /orden-de-trabajo-tareas/:id} : delete the "id" ordenDeTrabajoTarea.
     *
     * @param id the id of the ordenDeTrabajoTarea to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/orden-de-trabajo-tareas/{id}")
    public ResponseEntity<Void> deleteOrdenDeTrabajoTarea(@PathVariable Long id) {
        log.debug("REST request to delete OrdenDeTrabajoTarea : {}", id);
        ordenDeTrabajoTareaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
