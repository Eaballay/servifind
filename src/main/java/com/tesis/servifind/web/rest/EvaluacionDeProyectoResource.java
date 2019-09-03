package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.EvaluacionDeProyecto;
import com.tesis.servifind.repository.EvaluacionDeProyectoRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.EvaluacionDeProyecto}.
 */
@RestController
@RequestMapping("/api")
public class EvaluacionDeProyectoResource {

    private final Logger log = LoggerFactory.getLogger(EvaluacionDeProyectoResource.class);

    private static final String ENTITY_NAME = "evaluacionDeProyecto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EvaluacionDeProyectoRepository evaluacionDeProyectoRepository;

    public EvaluacionDeProyectoResource(EvaluacionDeProyectoRepository evaluacionDeProyectoRepository) {
        this.evaluacionDeProyectoRepository = evaluacionDeProyectoRepository;
    }

    /**
     * {@code POST  /evaluacion-de-proyectos} : Create a new evaluacionDeProyecto.
     *
     * @param evaluacionDeProyecto the evaluacionDeProyecto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new evaluacionDeProyecto, or with status {@code 400 (Bad Request)} if the evaluacionDeProyecto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/evaluacion-de-proyectos")
    public ResponseEntity<EvaluacionDeProyecto> createEvaluacionDeProyecto(@RequestBody EvaluacionDeProyecto evaluacionDeProyecto) throws URISyntaxException {
        log.debug("REST request to save EvaluacionDeProyecto : {}", evaluacionDeProyecto);
        if (evaluacionDeProyecto.getId() != null) {
            throw new BadRequestAlertException("A new evaluacionDeProyecto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EvaluacionDeProyecto result = evaluacionDeProyectoRepository.save(evaluacionDeProyecto);
        return ResponseEntity.created(new URI("/api/evaluacion-de-proyectos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /evaluacion-de-proyectos} : Updates an existing evaluacionDeProyecto.
     *
     * @param evaluacionDeProyecto the evaluacionDeProyecto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated evaluacionDeProyecto,
     * or with status {@code 400 (Bad Request)} if the evaluacionDeProyecto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the evaluacionDeProyecto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/evaluacion-de-proyectos")
    public ResponseEntity<EvaluacionDeProyecto> updateEvaluacionDeProyecto(@RequestBody EvaluacionDeProyecto evaluacionDeProyecto) throws URISyntaxException {
        log.debug("REST request to update EvaluacionDeProyecto : {}", evaluacionDeProyecto);
        if (evaluacionDeProyecto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EvaluacionDeProyecto result = evaluacionDeProyectoRepository.save(evaluacionDeProyecto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, evaluacionDeProyecto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /evaluacion-de-proyectos} : get all the evaluacionDeProyectos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of evaluacionDeProyectos in body.
     */
    @GetMapping("/evaluacion-de-proyectos")
    public List<EvaluacionDeProyecto> getAllEvaluacionDeProyectos() {
        log.debug("REST request to get all EvaluacionDeProyectos");
        return evaluacionDeProyectoRepository.findAll();
    }

    /**
     * {@code GET  /evaluacion-de-proyectos/:id} : get the "id" evaluacionDeProyecto.
     *
     * @param id the id of the evaluacionDeProyecto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the evaluacionDeProyecto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/evaluacion-de-proyectos/{id}")
    public ResponseEntity<EvaluacionDeProyecto> getEvaluacionDeProyecto(@PathVariable Long id) {
        log.debug("REST request to get EvaluacionDeProyecto : {}", id);
        Optional<EvaluacionDeProyecto> evaluacionDeProyecto = evaluacionDeProyectoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(evaluacionDeProyecto);
    }

    /**
     * {@code DELETE  /evaluacion-de-proyectos/:id} : delete the "id" evaluacionDeProyecto.
     *
     * @param id the id of the evaluacionDeProyecto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/evaluacion-de-proyectos/{id}")
    public ResponseEntity<Void> deleteEvaluacionDeProyecto(@PathVariable Long id) {
        log.debug("REST request to delete EvaluacionDeProyecto : {}", id);
        evaluacionDeProyectoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
