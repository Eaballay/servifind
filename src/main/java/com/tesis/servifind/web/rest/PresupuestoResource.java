package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.Presupuesto;
import com.tesis.servifind.repository.PresupuestoRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.Presupuesto}.
 */
@RestController
@RequestMapping("/api")
public class PresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(PresupuestoResource.class);

    private static final String ENTITY_NAME = "presupuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PresupuestoRepository presupuestoRepository;

    public PresupuestoResource(PresupuestoRepository presupuestoRepository) {
        this.presupuestoRepository = presupuestoRepository;
    }

    /**
     * {@code POST  /presupuestos} : Create a new presupuesto.
     *
     * @param presupuesto the presupuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new presupuesto, or with status {@code 400 (Bad Request)} if the presupuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/presupuestos")
    public ResponseEntity<Presupuesto> createPresupuesto(@Valid @RequestBody Presupuesto presupuesto) throws URISyntaxException {
        log.debug("REST request to save Presupuesto : {}", presupuesto);
        if (presupuesto.getId() != null) {
            throw new BadRequestAlertException("A new presupuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Presupuesto result = presupuestoRepository.save(presupuesto);
        return ResponseEntity.created(new URI("/api/presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /presupuestos} : Updates an existing presupuesto.
     *
     * @param presupuesto the presupuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated presupuesto,
     * or with status {@code 400 (Bad Request)} if the presupuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the presupuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/presupuestos")
    public ResponseEntity<Presupuesto> updatePresupuesto(@Valid @RequestBody Presupuesto presupuesto) throws URISyntaxException {
        log.debug("REST request to update Presupuesto : {}", presupuesto);
        if (presupuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Presupuesto result = presupuestoRepository.save(presupuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, presupuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /presupuestos} : get all the presupuestos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of presupuestos in body.
     */
    @GetMapping("/presupuestos")
    public List<Presupuesto> getAllPresupuestos() {
        log.debug("REST request to get all Presupuestos");
        return presupuestoRepository.findAll();
    }

    /**
     * {@code GET  /presupuestos/:id} : get the "id" presupuesto.
     *
     * @param id the id of the presupuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the presupuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/presupuestos/{id}")
    public ResponseEntity<Presupuesto> getPresupuesto(@PathVariable Long id) {
        log.debug("REST request to get Presupuesto : {}", id);
        Optional<Presupuesto> presupuesto = presupuestoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(presupuesto);
    }

    /**
     * {@code DELETE  /presupuestos/:id} : delete the "id" presupuesto.
     *
     * @param id the id of the presupuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/presupuestos/{id}")
    public ResponseEntity<Void> deletePresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete Presupuesto : {}", id);
        presupuestoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
