package com.tesis.servifind.web.rest;

import com.tesis.servifind.domain.Asociado;
import com.tesis.servifind.repository.AsociadoRepository;
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
 * REST controller for managing {@link com.tesis.servifind.domain.Asociado}.
 */
@RestController
@RequestMapping("/api")
public class AsociadoResource {

    private final Logger log = LoggerFactory.getLogger(AsociadoResource.class);

    private static final String ENTITY_NAME = "asociado";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsociadoRepository asociadoRepository;

    public AsociadoResource(AsociadoRepository asociadoRepository) {
        this.asociadoRepository = asociadoRepository;
    }

    /**
     * {@code POST  /asociados} : Create a new asociado.
     *
     * @param asociado the asociado to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asociado, or with status {@code 400 (Bad Request)} if the asociado has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asociados")
    public ResponseEntity<Asociado> createAsociado(@Valid @RequestBody Asociado asociado) throws URISyntaxException {
        log.debug("REST request to save Asociado : {}", asociado);
        if (asociado.getId() != null) {
            throw new BadRequestAlertException("A new asociado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Asociado result = asociadoRepository.save(asociado);
        return ResponseEntity.created(new URI("/api/asociados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asociados} : Updates an existing asociado.
     *
     * @param asociado the asociado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asociado,
     * or with status {@code 400 (Bad Request)} if the asociado is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asociado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asociados")
    public ResponseEntity<Asociado> updateAsociado(@Valid @RequestBody Asociado asociado) throws URISyntaxException {
        log.debug("REST request to update Asociado : {}", asociado);
        if (asociado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Asociado result = asociadoRepository.save(asociado);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, asociado.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /asociados} : get all the asociados.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asociados in body.
     */
    @GetMapping("/asociados")
    public List<Asociado> getAllAsociados() {
        log.debug("REST request to get all Asociados");
        return asociadoRepository.findAll();
    }

    /**
     * {@code GET  /asociados/:id} : get the "id" asociado.
     *
     * @param id the id of the asociado to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asociado, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asociados/{id}")
    public ResponseEntity<Asociado> getAsociado(@PathVariable Long id) {
        log.debug("REST request to get Asociado : {}", id);
        Optional<Asociado> asociado = asociadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(asociado);
    }

    /**
     * {@code DELETE  /asociados/:id} : delete the "id" asociado.
     *
     * @param id the id of the asociado to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asociados/{id}")
    public ResponseEntity<Void> deleteAsociado(@PathVariable Long id) {
        log.debug("REST request to delete Asociado : {}", id);
        asociadoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
