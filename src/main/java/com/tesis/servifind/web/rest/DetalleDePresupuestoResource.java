package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.DetalleDePresupuesto;
import com.tesis.servifind.repository.DetalleDePresupuestoRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.DetalleDePresupuesto}.
 */
@RestController
@RequestMapping("/api")
public class DetalleDePresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(DetalleDePresupuestoResource.class);

    private static final String ENTITY_NAME = "detalleDePresupuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetalleDePresupuestoRepository detalleDePresupuestoRepository;

    public DetalleDePresupuestoResource(DetalleDePresupuestoRepository detalleDePresupuestoRepository) {
        this.detalleDePresupuestoRepository = detalleDePresupuestoRepository;
    }

    /**
     * {@code POST  /detalle-de-presupuestos} : Create a new detalleDePresupuesto.
     *
     * @param detalleDePresupuesto the detalleDePresupuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detalleDePresupuesto, or with status {@code 400 (Bad Request)} if the detalleDePresupuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalle-de-presupuestos")
    public ResponseEntity<DetalleDePresupuesto> createDetalleDePresupuesto(@Valid @RequestBody DetalleDePresupuesto detalleDePresupuesto) throws URISyntaxException {
        log.debug("REST request to save DetalleDePresupuesto : {}", detalleDePresupuesto);
        if (detalleDePresupuesto.getId() != null) {
            throw new BadRequestAlertException("A new detalleDePresupuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetalleDePresupuesto result = detalleDePresupuestoRepository.save(detalleDePresupuesto);
        return ResponseEntity.created(new URI("/api/detalle-de-presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalle-de-presupuestos} : Updates an existing detalleDePresupuesto.
     *
     * @param detalleDePresupuesto the detalleDePresupuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detalleDePresupuesto,
     * or with status {@code 400 (Bad Request)} if the detalleDePresupuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detalleDePresupuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalle-de-presupuestos")
    public ResponseEntity<DetalleDePresupuesto> updateDetalleDePresupuesto(@Valid @RequestBody DetalleDePresupuesto detalleDePresupuesto) throws URISyntaxException {
        log.debug("REST request to update DetalleDePresupuesto : {}", detalleDePresupuesto);
        if (detalleDePresupuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetalleDePresupuesto result = detalleDePresupuestoRepository.save(detalleDePresupuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detalleDePresupuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /detalle-de-presupuestos} : get all the detalleDePresupuestos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detalleDePresupuestos in body.
     */
    @GetMapping("/detalle-de-presupuestos")
    public List<DetalleDePresupuesto> getAllDetalleDePresupuestos() {
        log.debug("REST request to get all DetalleDePresupuestos");
        return detalleDePresupuestoRepository.findAll();
    }

    /**
     * {@code GET  /detalle-de-presupuestos/:id} : get the "id" detalleDePresupuesto.
     *
     * @param id the id of the detalleDePresupuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detalleDePresupuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalle-de-presupuestos/{id}")
    public ResponseEntity<DetalleDePresupuesto> getDetalleDePresupuesto(@PathVariable Long id) {
        log.debug("REST request to get DetalleDePresupuesto : {}", id);
        Optional<DetalleDePresupuesto> detalleDePresupuesto = detalleDePresupuestoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(detalleDePresupuesto);
    }

    /**
     * {@code DELETE  /detalle-de-presupuestos/:id} : delete the "id" detalleDePresupuesto.
     *
     * @param id the id of the detalleDePresupuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalle-de-presupuestos/{id}")
    public ResponseEntity<Void> deleteDetalleDePresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete DetalleDePresupuesto : {}", id);
        detalleDePresupuestoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
