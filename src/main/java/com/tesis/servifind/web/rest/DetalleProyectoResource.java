package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.DetalleProyecto;
import com.tesis.servifind.repository.DetalleProyectoRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.DetalleProyecto}.
 */
@RestController
@RequestMapping("/api")
public class DetalleProyectoResource {

    private final Logger log = LoggerFactory.getLogger(DetalleProyectoResource.class);

    private static final String ENTITY_NAME = "detalleProyecto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetalleProyectoRepository detalleProyectoRepository;

    public DetalleProyectoResource(DetalleProyectoRepository detalleProyectoRepository) {
        this.detalleProyectoRepository = detalleProyectoRepository;
    }

    /**
     * {@code POST  /detalle-proyectos} : Create a new detalleProyecto.
     *
     * @param detalleProyecto the detalleProyecto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detalleProyecto, or with status {@code 400 (Bad Request)} if the detalleProyecto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalle-proyectos")
    public ResponseEntity<DetalleProyecto> createDetalleProyecto(@RequestBody DetalleProyecto detalleProyecto) throws URISyntaxException {
        log.debug("REST request to save DetalleProyecto : {}", detalleProyecto);
        if (detalleProyecto.getId() != null) {
            throw new BadRequestAlertException("A new detalleProyecto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetalleProyecto result = detalleProyectoRepository.save(detalleProyecto);
        return ResponseEntity.created(new URI("/api/detalle-proyectos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalle-proyectos} : Updates an existing detalleProyecto.
     *
     * @param detalleProyecto the detalleProyecto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detalleProyecto,
     * or with status {@code 400 (Bad Request)} if the detalleProyecto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detalleProyecto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalle-proyectos")
    public ResponseEntity<DetalleProyecto> updateDetalleProyecto(@RequestBody DetalleProyecto detalleProyecto) throws URISyntaxException {
        log.debug("REST request to update DetalleProyecto : {}", detalleProyecto);
        if (detalleProyecto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetalleProyecto result = detalleProyectoRepository.save(detalleProyecto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detalleProyecto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /detalle-proyectos} : get all the detalleProyectos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detalleProyectos in body.
     */
    @GetMapping("/detalle-proyectos")
    public List<DetalleProyecto> getAllDetalleProyectos() {
        log.debug("REST request to get all DetalleProyectos");
        return detalleProyectoRepository.findAll();
    }

    /**
     * {@code GET  /detalle-proyectos/:id} : get the "id" detalleProyecto.
     *
     * @param id the id of the detalleProyecto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detalleProyecto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalle-proyectos/{id}")
    public ResponseEntity<DetalleProyecto> getDetalleProyecto(@PathVariable Long id) {
        log.debug("REST request to get DetalleProyecto : {}", id);
        Optional<DetalleProyecto> detalleProyecto = detalleProyectoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(detalleProyecto);
    }

    /**
     * {@code DELETE  /detalle-proyectos/:id} : delete the "id" detalleProyecto.
     *
     * @param id the id of the detalleProyecto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalle-proyectos/{id}")
    public ResponseEntity<Void> deleteDetalleProyecto(@PathVariable Long id) {
        log.debug("REST request to delete DetalleProyecto : {}", id);
        detalleProyectoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
