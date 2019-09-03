package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.OrdenDeCompra;
import com.tesis.servifind.repository.OrdenDeCompraRepository;
import com.tesis.servifind.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.tesis.servifind.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OrdenDeCompraResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class OrdenDeCompraResourceIT {

    private static final Long DEFAULT_NRO_ORDEN_DE_COMPRA = 1L;
    private static final Long UPDATED_NRO_ORDEN_DE_COMPRA = 2L;
    private static final Long SMALLER_NRO_ORDEN_DE_COMPRA = 1L - 1L;

    private static final Instant DEFAULT_FECHA_DE_CREACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_DE_CREACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_DE_CREACION = Instant.ofEpochMilli(-1L);

    @Autowired
    private OrdenDeCompraRepository ordenDeCompraRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restOrdenDeCompraMockMvc;

    private OrdenDeCompra ordenDeCompra;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdenDeCompraResource ordenDeCompraResource = new OrdenDeCompraResource(ordenDeCompraRepository);
        this.restOrdenDeCompraMockMvc = MockMvcBuilders.standaloneSetup(ordenDeCompraResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrdenDeCompra createEntity(EntityManager em) {
        OrdenDeCompra ordenDeCompra = new OrdenDeCompra()
            .nroOrdenDeCompra(DEFAULT_NRO_ORDEN_DE_COMPRA)
            .fechaDeCreacion(DEFAULT_FECHA_DE_CREACION);
        return ordenDeCompra;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrdenDeCompra createUpdatedEntity(EntityManager em) {
        OrdenDeCompra ordenDeCompra = new OrdenDeCompra()
            .nroOrdenDeCompra(UPDATED_NRO_ORDEN_DE_COMPRA)
            .fechaDeCreacion(UPDATED_FECHA_DE_CREACION);
        return ordenDeCompra;
    }

    @BeforeEach
    public void initTest() {
        ordenDeCompra = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdenDeCompra() throws Exception {
        int databaseSizeBeforeCreate = ordenDeCompraRepository.findAll().size();

        // Create the OrdenDeCompra
        restOrdenDeCompraMockMvc.perform(post("/api/orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeCompra)))
            .andExpect(status().isCreated());

        // Validate the OrdenDeCompra in the database
        List<OrdenDeCompra> ordenDeCompraList = ordenDeCompraRepository.findAll();
        assertThat(ordenDeCompraList).hasSize(databaseSizeBeforeCreate + 1);
        OrdenDeCompra testOrdenDeCompra = ordenDeCompraList.get(ordenDeCompraList.size() - 1);
        assertThat(testOrdenDeCompra.getNroOrdenDeCompra()).isEqualTo(DEFAULT_NRO_ORDEN_DE_COMPRA);
        assertThat(testOrdenDeCompra.getFechaDeCreacion()).isEqualTo(DEFAULT_FECHA_DE_CREACION);
    }

    @Test
    @Transactional
    public void createOrdenDeCompraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordenDeCompraRepository.findAll().size();

        // Create the OrdenDeCompra with an existing ID
        ordenDeCompra.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdenDeCompraMockMvc.perform(post("/api/orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeCompra)))
            .andExpect(status().isBadRequest());

        // Validate the OrdenDeCompra in the database
        List<OrdenDeCompra> ordenDeCompraList = ordenDeCompraRepository.findAll();
        assertThat(ordenDeCompraList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNroOrdenDeCompraIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordenDeCompraRepository.findAll().size();
        // set the field null
        ordenDeCompra.setNroOrdenDeCompra(null);

        // Create the OrdenDeCompra, which fails.

        restOrdenDeCompraMockMvc.perform(post("/api/orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeCompra)))
            .andExpect(status().isBadRequest());

        List<OrdenDeCompra> ordenDeCompraList = ordenDeCompraRepository.findAll();
        assertThat(ordenDeCompraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaDeCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordenDeCompraRepository.findAll().size();
        // set the field null
        ordenDeCompra.setFechaDeCreacion(null);

        // Create the OrdenDeCompra, which fails.

        restOrdenDeCompraMockMvc.perform(post("/api/orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeCompra)))
            .andExpect(status().isBadRequest());

        List<OrdenDeCompra> ordenDeCompraList = ordenDeCompraRepository.findAll();
        assertThat(ordenDeCompraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrdenDeCompras() throws Exception {
        // Initialize the database
        ordenDeCompraRepository.saveAndFlush(ordenDeCompra);

        // Get all the ordenDeCompraList
        restOrdenDeCompraMockMvc.perform(get("/api/orden-de-compras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordenDeCompra.getId().intValue())))
            .andExpect(jsonPath("$.[*].nroOrdenDeCompra").value(hasItem(DEFAULT_NRO_ORDEN_DE_COMPRA.intValue())))
            .andExpect(jsonPath("$.[*].fechaDeCreacion").value(hasItem(DEFAULT_FECHA_DE_CREACION.toString())));
    }
    
    @Test
    @Transactional
    public void getOrdenDeCompra() throws Exception {
        // Initialize the database
        ordenDeCompraRepository.saveAndFlush(ordenDeCompra);

        // Get the ordenDeCompra
        restOrdenDeCompraMockMvc.perform(get("/api/orden-de-compras/{id}", ordenDeCompra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordenDeCompra.getId().intValue()))
            .andExpect(jsonPath("$.nroOrdenDeCompra").value(DEFAULT_NRO_ORDEN_DE_COMPRA.intValue()))
            .andExpect(jsonPath("$.fechaDeCreacion").value(DEFAULT_FECHA_DE_CREACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdenDeCompra() throws Exception {
        // Get the ordenDeCompra
        restOrdenDeCompraMockMvc.perform(get("/api/orden-de-compras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdenDeCompra() throws Exception {
        // Initialize the database
        ordenDeCompraRepository.saveAndFlush(ordenDeCompra);

        int databaseSizeBeforeUpdate = ordenDeCompraRepository.findAll().size();

        // Update the ordenDeCompra
        OrdenDeCompra updatedOrdenDeCompra = ordenDeCompraRepository.findById(ordenDeCompra.getId()).get();
        // Disconnect from session so that the updates on updatedOrdenDeCompra are not directly saved in db
        em.detach(updatedOrdenDeCompra);
        updatedOrdenDeCompra
            .nroOrdenDeCompra(UPDATED_NRO_ORDEN_DE_COMPRA)
            .fechaDeCreacion(UPDATED_FECHA_DE_CREACION);

        restOrdenDeCompraMockMvc.perform(put("/api/orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdenDeCompra)))
            .andExpect(status().isOk());

        // Validate the OrdenDeCompra in the database
        List<OrdenDeCompra> ordenDeCompraList = ordenDeCompraRepository.findAll();
        assertThat(ordenDeCompraList).hasSize(databaseSizeBeforeUpdate);
        OrdenDeCompra testOrdenDeCompra = ordenDeCompraList.get(ordenDeCompraList.size() - 1);
        assertThat(testOrdenDeCompra.getNroOrdenDeCompra()).isEqualTo(UPDATED_NRO_ORDEN_DE_COMPRA);
        assertThat(testOrdenDeCompra.getFechaDeCreacion()).isEqualTo(UPDATED_FECHA_DE_CREACION);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdenDeCompra() throws Exception {
        int databaseSizeBeforeUpdate = ordenDeCompraRepository.findAll().size();

        // Create the OrdenDeCompra

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrdenDeCompraMockMvc.perform(put("/api/orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeCompra)))
            .andExpect(status().isBadRequest());

        // Validate the OrdenDeCompra in the database
        List<OrdenDeCompra> ordenDeCompraList = ordenDeCompraRepository.findAll();
        assertThat(ordenDeCompraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrdenDeCompra() throws Exception {
        // Initialize the database
        ordenDeCompraRepository.saveAndFlush(ordenDeCompra);

        int databaseSizeBeforeDelete = ordenDeCompraRepository.findAll().size();

        // Delete the ordenDeCompra
        restOrdenDeCompraMockMvc.perform(delete("/api/orden-de-compras/{id}", ordenDeCompra.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrdenDeCompra> ordenDeCompraList = ordenDeCompraRepository.findAll();
        assertThat(ordenDeCompraList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrdenDeCompra.class);
        OrdenDeCompra ordenDeCompra1 = new OrdenDeCompra();
        ordenDeCompra1.setId(1L);
        OrdenDeCompra ordenDeCompra2 = new OrdenDeCompra();
        ordenDeCompra2.setId(ordenDeCompra1.getId());
        assertThat(ordenDeCompra1).isEqualTo(ordenDeCompra2);
        ordenDeCompra2.setId(2L);
        assertThat(ordenDeCompra1).isNotEqualTo(ordenDeCompra2);
        ordenDeCompra1.setId(null);
        assertThat(ordenDeCompra1).isNotEqualTo(ordenDeCompra2);
    }
}
