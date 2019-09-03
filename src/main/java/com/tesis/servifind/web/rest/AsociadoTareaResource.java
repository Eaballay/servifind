package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.AsociadoTarea;
import com.tesis.servifind.repository.AsociadoTareaRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.AsociadoTarea}.
 */
@RestController
@RequestMapping("/api")
public class AsociadoTareaResource {

    private final Logger log = LoggerFactory.getLogger(AsociadoTareaResource.class);

    private static final String ENTITY_NAME = "asociadoTarea";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsociadoTareaRepository asociadoTareaRepository;

    public AsociadoTareaResource(AsociadoTareaRepository asociadoTareaRepository) {
        this.asociadoTareaRepository = asociadoTareaRepository;
    }

    /**
     * {@code POST  /asociado-tareas} : Create a new asociadoTarea.
     *
     * @param asociadoTarea the asociadoTarea to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asociadoTarea, or with status {@code 400 (Bad Request)} if the asociadoTarea has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asociado-tareas")
    public ResponseEntity<AsociadoTarea> createAsociadoTarea(@RequestBody AsociadoTarea asociadoTarea) throws URISyntaxException {
        log.debug("REST request to save AsociadoTarea : {}", asociadoTarea);
        if (asociadoTarea.getId() != null) {
            throw new BadRequestAlertException("A new asociadoTarea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AsociadoTarea result = asociadoTareaRepository.save(asociadoTarea);
        return ResponseEntity.created(new URI("/api/asociado-tareas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asociado-tareas} : Updates an existing asociadoTarea.
     *
     * @param asociadoTarea the asociadoTarea to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asociadoTarea,
     * or with status {@code 400 (Bad Request)} if the asociadoTarea is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asociadoTarea couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asociado-tareas")
    public ResponseEntity<AsociadoTarea> updateAsociadoTarea(@RequestBody AsociadoTarea asociadoTarea) throws URISyntaxException {
        log.debug("REST request to update AsociadoTarea : {}", asociadoTarea);
        if (asociadoTarea.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AsociadoTarea result = asociadoTareaRepository.save(asociadoTarea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, asociadoTarea.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /asociado-tareas} : get all the asociadoTareas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asociadoTareas in body.
     */
    @GetMapping("/asociado-tareas")
    public List<AsociadoTarea> getAllAsociadoTareas() {
        log.debug("REST request to get all AsociadoTareas");
        return asociadoTareaRepository.findAll();
    }

    /**
     * {@code GET  /asociado-tareas/:id} : get the "id" asociadoTarea.
     *
     * @param id the id of the asociadoTarea to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asociadoTarea, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asociado-tareas/{id}")
    public ResponseEntity<AsociadoTarea> getAsociadoTarea(@PathVariable Long id) {
        log.debug("REST request to get AsociadoTarea : {}", id);
        Optional<AsociadoTarea> asociadoTarea = asociadoTareaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(asociadoTarea);
    }

    /**
     * {@code DELETE  /asociado-tareas/:id} : delete the "id" asociadoTarea.
     *
     * @param id the id of the asociadoTarea to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asociado-tareas/{id}")
    public ResponseEntity<Void> deleteAsociadoTarea(@PathVariable Long id) {
        log.debug("REST request to delete AsociadoTarea : {}", id);
        asociadoTareaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
