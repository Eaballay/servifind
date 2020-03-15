package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.Dominio;
import com.tesis.servifind.domain.enumeration.TipoDeDominio;
import com.tesis.servifind.repository.DominioRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.Dominio}.
 */
@RestController
@RequestMapping("/api")
public class DominioResource {

    private final Logger log = LoggerFactory.getLogger(DominioResource.class);

    private static final String ENTITY_NAME = "dominio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DominioRepository dominioRepository;

    public DominioResource(DominioRepository dominioRepository) {
        this.dominioRepository = dominioRepository;
    }

    /**
     * {@code POST  /dominios} : Create a new dominio.
     *
     * @param dominio the dominio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dominio, or with status {@code 400 (Bad Request)} if the dominio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dominios")
    public ResponseEntity<Dominio> createDominio(@Valid @RequestBody Dominio dominio) throws URISyntaxException {
        log.debug("REST request to save Dominio : {}", dominio);
        if (dominio.getId() != null) {
            throw new BadRequestAlertException("A new dominio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dominio result = dominioRepository.save(dominio);
        return ResponseEntity.created(new URI("/api/dominios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dominios} : Updates an existing dominio.
     *
     * @param dominio the dominio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dominio,
     * or with status {@code 400 (Bad Request)} if the dominio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dominio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dominios")
    public ResponseEntity<Dominio> updateDominio(@Valid @RequestBody Dominio dominio) throws URISyntaxException {
        log.debug("REST request to update Dominio : {}", dominio);
        if (dominio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dominio result = dominioRepository.save(dominio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dominio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dominios} : get all the dominios.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dominios in body.
     */
    @GetMapping("/dominios")
    public List<Dominio> getAllDominios() {
        log.debug("REST request to get all Dominios");
        return dominioRepository.findAll();
    }

    @GetMapping("/dominios/rubros")
    public List<Dominio> getAllDominiosRubros() {
        log.debug("REST request to get all Dominios rubros");
        return dominioRepository.findByTipoDeDominioEquals(TipoDeDominio.RUBRO);
    }

    @GetMapping("/dominios/dimension/{startsWith}")
    public List<Dominio> getAllDominiosDimension(@PathVariable String startsWith) {
        log.debug("REST request to get all Dominios dimension: ", startsWith);
        return dominioRepository.findByTipoDeDominioEqualsAndValorStartsWith(TipoDeDominio.DIMENSION, startsWith);
    }

    @GetMapping("/dominios/actividad/{startsWith}")
    public List<Dominio> getAllDominiosActividad(@PathVariable String startsWith) {
        log.debug("REST request to get all Dominios actividad: ", startsWith);
        return dominioRepository.findByTipoDeDominioEqualsAndValorStartsWith(TipoDeDominio.ACTIVIDAD, startsWith);
    }

    @GetMapping("/dominios/requerimiento/{startsWith}")
    public List<Dominio> getAllDominioRequerimiento(@PathVariable String startsWith) {
        log.debug("REST request to get all Dominios requerimiento: ", startsWith);
        return dominioRepository.findByTipoDeDominioEqualsAndValorStartsWith(TipoDeDominio.REQUERIMIENTO, startsWith);
    }

    @GetMapping("/dominios/tarea/{startsWith}")
    public List<Dominio> getAllDominiosTarea(@PathVariable String startsWith) {
        log.debug("REST request to get all Dominios tarea: ", startsWith);
        return dominioRepository.findByTipoDeDominioEqualsAndValorStartsWith(TipoDeDominio.TAREA, startsWith);
    }

    @GetMapping("/dominios/tipo_tareas/{startsWith}")
    public List<Dominio> getAllDominiosTipoTareas(@PathVariable String startsWith) {
        log.debug("REST request to get all Dominios tipo tarea: ", startsWith);
        return dominioRepository.findByTipoDeDominioEqualsAndValorStartsWith(TipoDeDominio.TIPO_TAREA, startsWith);
    }

    /**
     * {@code GET  /dominios/:id} : get the "id" dominio.
     *
     * @param id the id of the dominio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dominio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dominios/{id}")
    public ResponseEntity<Dominio> getDominio(@PathVariable Long id) {
        log.debug("REST request to get Dominio : {}", id);
        Optional<Dominio> dominio = dominioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dominio);
    }

    /**
     * {@code DELETE  /dominios/:id} : delete the "id" dominio.
     *
     * @param id the id of the dominio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dominios/{id}")
    public ResponseEntity<Void> deleteDominio(@PathVariable Long id) {
        log.debug("REST request to delete Dominio : {}", id);
        dominioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
