package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.Tarea;
import com.tesis.servifind.repository.TareaRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.Tarea}.
 */
@RestController
@RequestMapping("/api")
public class TareaResource {

    private final Logger log = LoggerFactory.getLogger(TareaResource.class);

    private static final String ENTITY_NAME = "tarea";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TareaRepository tareaRepository;

    public TareaResource(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    /**
     * {@code POST  /tareas} : Create a new tarea.
     *
     * @param tarea the tarea to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tarea, or with status {@code 400 (Bad Request)} if the tarea has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tareas")
    public ResponseEntity<Tarea> createTarea(@Valid @RequestBody Tarea tarea) throws URISyntaxException {
        log.debug("REST request to save Tarea : {}", tarea);
        if (tarea.getId() != null) {
            throw new BadRequestAlertException("A new tarea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tarea result = tareaRepository.save(tarea);
        return ResponseEntity.created(new URI("/api/tareas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tareas} : Updates an existing tarea.
     *
     * @param tarea the tarea to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tarea,
     * or with status {@code 400 (Bad Request)} if the tarea is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tarea couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tareas")
    public ResponseEntity<Tarea> updateTarea(@Valid @RequestBody Tarea tarea) throws URISyntaxException {
        log.debug("REST request to update Tarea : {}", tarea);
        if (tarea.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tarea result = tareaRepository.save(tarea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tarea.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tareas} : get all the tareas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tareas in body.
     */
    @GetMapping("/tareas")
    public List<Tarea> getAllTareas() {
        log.debug("REST request to get all Tareas");
        return tareaRepository.findAll();
    }

    /**
     * {@code GET  /tareas/:id} : get the "id" tarea.
     *
     * @param id the id of the tarea to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tarea, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tareas/{id}")
    public ResponseEntity<Tarea> getTarea(@PathVariable Long id) {
        log.debug("REST request to get Tarea : {}", id);
        Optional<Tarea> tarea = tareaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tarea);
    }

    /**
     * {@code DELETE  /tareas/:id} : delete the "id" tarea.
     *
     * @param id the id of the tarea to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tareas/{id}")
    public ResponseEntity<Void> deleteTarea(@PathVariable Long id) {
        log.debug("REST request to delete Tarea : {}", id);
        tareaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
