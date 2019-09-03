package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.DetalleDeOrdenDeCompra;
import com.tesis.servifind.repository.DetalleDeOrdenDeCompraRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.DetalleDeOrdenDeCompra}.
 */
@RestController
@RequestMapping("/api")
public class DetalleDeOrdenDeCompraResource {

    private final Logger log = LoggerFactory.getLogger(DetalleDeOrdenDeCompraResource.class);

    private static final String ENTITY_NAME = "detalleDeOrdenDeCompra";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetalleDeOrdenDeCompraRepository detalleDeOrdenDeCompraRepository;

    public DetalleDeOrdenDeCompraResource(DetalleDeOrdenDeCompraRepository detalleDeOrdenDeCompraRepository) {
        this.detalleDeOrdenDeCompraRepository = detalleDeOrdenDeCompraRepository;
    }

    /**
     * {@code POST  /detalle-de-orden-de-compras} : Create a new detalleDeOrdenDeCompra.
     *
     * @param detalleDeOrdenDeCompra the detalleDeOrdenDeCompra to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detalleDeOrdenDeCompra, or with status {@code 400 (Bad Request)} if the detalleDeOrdenDeCompra has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalle-de-orden-de-compras")
    public ResponseEntity<DetalleDeOrdenDeCompra> createDetalleDeOrdenDeCompra(@Valid @RequestBody DetalleDeOrdenDeCompra detalleDeOrdenDeCompra) throws URISyntaxException {
        log.debug("REST request to save DetalleDeOrdenDeCompra : {}", detalleDeOrdenDeCompra);
        if (detalleDeOrdenDeCompra.getId() != null) {
            throw new BadRequestAlertException("A new detalleDeOrdenDeCompra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetalleDeOrdenDeCompra result = detalleDeOrdenDeCompraRepository.save(detalleDeOrdenDeCompra);
        return ResponseEntity.created(new URI("/api/detalle-de-orden-de-compras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalle-de-orden-de-compras} : Updates an existing detalleDeOrdenDeCompra.
     *
     * @param detalleDeOrdenDeCompra the detalleDeOrdenDeCompra to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detalleDeOrdenDeCompra,
     * or with status {@code 400 (Bad Request)} if the detalleDeOrdenDeCompra is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detalleDeOrdenDeCompra couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalle-de-orden-de-compras")
    public ResponseEntity<DetalleDeOrdenDeCompra> updateDetalleDeOrdenDeCompra(@Valid @RequestBody DetalleDeOrdenDeCompra detalleDeOrdenDeCompra) throws URISyntaxException {
        log.debug("REST request to update DetalleDeOrdenDeCompra : {}", detalleDeOrdenDeCompra);
        if (detalleDeOrdenDeCompra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetalleDeOrdenDeCompra result = detalleDeOrdenDeCompraRepository.save(detalleDeOrdenDeCompra);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detalleDeOrdenDeCompra.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /detalle-de-orden-de-compras} : get all the detalleDeOrdenDeCompras.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detalleDeOrdenDeCompras in body.
     */
    @GetMapping("/detalle-de-orden-de-compras")
    public List<DetalleDeOrdenDeCompra> getAllDetalleDeOrdenDeCompras() {
        log.debug("REST request to get all DetalleDeOrdenDeCompras");
        return detalleDeOrdenDeCompraRepository.findAll();
    }

    /**
     * {@code GET  /detalle-de-orden-de-compras/:id} : get the "id" detalleDeOrdenDeCompra.
     *
     * @param id the id of the detalleDeOrdenDeCompra to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detalleDeOrdenDeCompra, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalle-de-orden-de-compras/{id}")
    public ResponseEntity<DetalleDeOrdenDeCompra> getDetalleDeOrdenDeCompra(@PathVariable Long id) {
        log.debug("REST request to get DetalleDeOrdenDeCompra : {}", id);
        Optional<DetalleDeOrdenDeCompra> detalleDeOrdenDeCompra = detalleDeOrdenDeCompraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(detalleDeOrdenDeCompra);
    }

    /**
     * {@code DELETE  /detalle-de-orden-de-compras/:id} : delete the "id" detalleDeOrdenDeCompra.
     *
     * @param id the id of the detalleDeOrdenDeCompra to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalle-de-orden-de-compras/{id}")
    public ResponseEntity<Void> deleteDetalleDeOrdenDeCompra(@PathVariable Long id) {
        log.debug("REST request to delete DetalleDeOrdenDeCompra : {}", id);
        detalleDeOrdenDeCompraRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
