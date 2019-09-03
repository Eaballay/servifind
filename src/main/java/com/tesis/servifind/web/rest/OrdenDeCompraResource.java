package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.OrdenDeCompra;
import com.tesis.servifind.repository.OrdenDeCompraRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.OrdenDeCompra}.
 */
@RestController
@RequestMapping("/api")
public class OrdenDeCompraResource {

    private final Logger log = LoggerFactory.getLogger(OrdenDeCompraResource.class);

    private static final String ENTITY_NAME = "ordenDeCompra";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrdenDeCompraRepository ordenDeCompraRepository;

    public OrdenDeCompraResource(OrdenDeCompraRepository ordenDeCompraRepository) {
        this.ordenDeCompraRepository = ordenDeCompraRepository;
    }

    /**
     * {@code POST  /orden-de-compras} : Create a new ordenDeCompra.
     *
     * @param ordenDeCompra the ordenDeCompra to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ordenDeCompra, or with status {@code 400 (Bad Request)} if the ordenDeCompra has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/orden-de-compras")
    public ResponseEntity<OrdenDeCompra> createOrdenDeCompra(@Valid @RequestBody OrdenDeCompra ordenDeCompra) throws URISyntaxException {
        log.debug("REST request to save OrdenDeCompra : {}", ordenDeCompra);
        if (ordenDeCompra.getId() != null) {
            throw new BadRequestAlertException("A new ordenDeCompra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdenDeCompra result = ordenDeCompraRepository.save(ordenDeCompra);
        return ResponseEntity.created(new URI("/api/orden-de-compras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /orden-de-compras} : Updates an existing ordenDeCompra.
     *
     * @param ordenDeCompra the ordenDeCompra to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ordenDeCompra,
     * or with status {@code 400 (Bad Request)} if the ordenDeCompra is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ordenDeCompra couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/orden-de-compras")
    public ResponseEntity<OrdenDeCompra> updateOrdenDeCompra(@Valid @RequestBody OrdenDeCompra ordenDeCompra) throws URISyntaxException {
        log.debug("REST request to update OrdenDeCompra : {}", ordenDeCompra);
        if (ordenDeCompra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrdenDeCompra result = ordenDeCompraRepository.save(ordenDeCompra);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ordenDeCompra.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /orden-de-compras} : get all the ordenDeCompras.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ordenDeCompras in body.
     */
    @GetMapping("/orden-de-compras")
    public List<OrdenDeCompra> getAllOrdenDeCompras() {
        log.debug("REST request to get all OrdenDeCompras");
        return ordenDeCompraRepository.findAll();
    }

    /**
     * {@code GET  /orden-de-compras/:id} : get the "id" ordenDeCompra.
     *
     * @param id the id of the ordenDeCompra to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ordenDeCompra, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/orden-de-compras/{id}")
    public ResponseEntity<OrdenDeCompra> getOrdenDeCompra(@PathVariable Long id) {
        log.debug("REST request to get OrdenDeCompra : {}", id);
        Optional<OrdenDeCompra> ordenDeCompra = ordenDeCompraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ordenDeCompra);
    }

    /**
     * {@code DELETE  /orden-de-compras/:id} : delete the "id" ordenDeCompra.
     *
     * @param id the id of the ordenDeCompra to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/orden-de-compras/{id}")
    public ResponseEntity<Void> deleteOrdenDeCompra(@PathVariable Long id) {
        log.debug("REST request to delete OrdenDeCompra : {}", id);
        ordenDeCompraRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
