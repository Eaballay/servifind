package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.Proyecto;
import com.tesis.servifind.repository.ProyectoRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.Proyecto}.
 */
@RestController
@RequestMapping("/api")
public class ProyectoResource {

    private final Logger log = LoggerFactory.getLogger(ProyectoResource.class);

    private static final String ENTITY_NAME = "proyecto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProyectoRepository proyectoRepository;

    public ProyectoResource(ProyectoRepository proyectoRepository) {
        this.proyectoRepository = proyectoRepository;
    }

    /**
     * {@code POST  /proyectos} : Create a new proyecto.
     *
     * @param proyecto the proyecto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proyecto, or with status {@code 400 (Bad Request)} if the proyecto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proyectos")
    public ResponseEntity<Proyecto> createProyecto(@Valid @RequestBody Proyecto proyecto) throws URISyntaxException {
        log.debug("REST request to save Proyecto : {}", proyecto);
        if (proyecto.getId() != null) {
            throw new BadRequestAlertException("A new proyecto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Proyecto result = proyectoRepository.save(proyecto);
        return ResponseEntity.created(new URI("/api/proyectos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proyectos} : Updates an existing proyecto.
     *
     * @param proyecto the proyecto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proyecto,
     * or with status {@code 400 (Bad Request)} if the proyecto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proyecto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proyectos")
    public ResponseEntity<Proyecto> updateProyecto(@Valid @RequestBody Proyecto proyecto) throws URISyntaxException {
        log.debug("REST request to update Proyecto : {}", proyecto);
        if (proyecto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Proyecto result = proyectoRepository.save(proyecto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, proyecto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /proyectos} : get all the proyectos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of proyectos in body.
     */
    @GetMapping("/proyectos")
    public List<Proyecto> getAllProyectos() {
        log.debug("REST request to get all Proyectos");
        return proyectoRepository.findAll();
    }

    /**
     * {@code GET  /proyectos/:id} : get the "id" proyecto.
     *
     * @param id the id of the proyecto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proyecto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proyectos/{id}")
    public ResponseEntity<Proyecto> getProyecto(@PathVariable Long id) {
        log.debug("REST request to get Proyecto : {}", id);
        Optional<Proyecto> proyecto = proyectoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(proyecto);
    }

    /**
     * {@code DELETE  /proyectos/:id} : delete the "id" proyecto.
     *
     * @param id the id of the proyecto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proyectos/{id}")
    public ResponseEntity<Void> deleteProyecto(@PathVariable Long id) {
        log.debug("REST request to delete Proyecto : {}", id);
        proyectoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
