package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.DetalleDeOrdenDeCompra;
import com.tesis.servifind.repository.DetalleDeOrdenDeCompraRepository;
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
import java.util.List;

import static com.tesis.servifind.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DetalleDeOrdenDeCompraResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class DetalleDeOrdenDeCompraResourceIT {

    private static final Long DEFAULT_CANTIDAD = 1L;
    private static final Long UPDATED_CANTIDAD = 2L;
    private static final Long SMALLER_CANTIDAD = 1L - 1L;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private DetalleDeOrdenDeCompraRepository detalleDeOrdenDeCompraRepository;

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

    private MockMvc restDetalleDeOrdenDeCompraMockMvc;

    private DetalleDeOrdenDeCompra detalleDeOrdenDeCompra;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DetalleDeOrdenDeCompraResource detalleDeOrdenDeCompraResource = new DetalleDeOrdenDeCompraResource(detalleDeOrdenDeCompraRepository);
        this.restDetalleDeOrdenDeCompraMockMvc = MockMvcBuilders.standaloneSetup(detalleDeOrdenDeCompraResource)
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
    public static DetalleDeOrdenDeCompra createEntity(EntityManager em) {
        DetalleDeOrdenDeCompra detalleDeOrdenDeCompra = new DetalleDeOrdenDeCompra()
            .cantidad(DEFAULT_CANTIDAD)
            .descripcion(DEFAULT_DESCRIPCION);
        return detalleDeOrdenDeCompra;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleDeOrdenDeCompra createUpdatedEntity(EntityManager em) {
        DetalleDeOrdenDeCompra detalleDeOrdenDeCompra = new DetalleDeOrdenDeCompra()
            .cantidad(UPDATED_CANTIDAD)
            .descripcion(UPDATED_DESCRIPCION);
        return detalleDeOrdenDeCompra;
    }

    @BeforeEach
    public void initTest() {
        detalleDeOrdenDeCompra = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetalleDeOrdenDeCompra() throws Exception {
        int databaseSizeBeforeCreate = detalleDeOrdenDeCompraRepository.findAll().size();

        // Create the DetalleDeOrdenDeCompra
        restDetalleDeOrdenDeCompraMockMvc.perform(post("/api/detalle-de-orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleDeOrdenDeCompra)))
            .andExpect(status().isCreated());

        // Validate the DetalleDeOrdenDeCompra in the database
        List<DetalleDeOrdenDeCompra> detalleDeOrdenDeCompraList = detalleDeOrdenDeCompraRepository.findAll();
        assertThat(detalleDeOrdenDeCompraList).hasSize(databaseSizeBeforeCreate + 1);
        DetalleDeOrdenDeCompra testDetalleDeOrdenDeCompra = detalleDeOrdenDeCompraList.get(detalleDeOrdenDeCompraList.size() - 1);
        assertThat(testDetalleDeOrdenDeCompra.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testDetalleDeOrdenDeCompra.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createDetalleDeOrdenDeCompraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detalleDeOrdenDeCompraRepository.findAll().size();

        // Create the DetalleDeOrdenDeCompra with an existing ID
        detalleDeOrdenDeCompra.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetalleDeOrdenDeCompraMockMvc.perform(post("/api/detalle-de-orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleDeOrdenDeCompra)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleDeOrdenDeCompra in the database
        List<DetalleDeOrdenDeCompra> detalleDeOrdenDeCompraList = detalleDeOrdenDeCompraRepository.findAll();
        assertThat(detalleDeOrdenDeCompraList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = detalleDeOrdenDeCompraRepository.findAll().size();
        // set the field null
        detalleDeOrdenDeCompra.setCantidad(null);

        // Create the DetalleDeOrdenDeCompra, which fails.

        restDetalleDeOrdenDeCompraMockMvc.perform(post("/api/detalle-de-orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleDeOrdenDeCompra)))
            .andExpect(status().isBadRequest());

        List<DetalleDeOrdenDeCompra> detalleDeOrdenDeCompraList = detalleDeOrdenDeCompraRepository.findAll();
        assertThat(detalleDeOrdenDeCompraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = detalleDeOrdenDeCompraRepository.findAll().size();
        // set the field null
        detalleDeOrdenDeCompra.setDescripcion(null);

        // Create the DetalleDeOrdenDeCompra, which fails.

        restDetalleDeOrdenDeCompraMockMvc.perform(post("/api/detalle-de-orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleDeOrdenDeCompra)))
            .andExpect(status().isBadRequest());

        List<DetalleDeOrdenDeCompra> detalleDeOrdenDeCompraList = detalleDeOrdenDeCompraRepository.findAll();
        assertThat(detalleDeOrdenDeCompraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDetalleDeOrdenDeCompras() throws Exception {
        // Initialize the database
        detalleDeOrdenDeCompraRepository.saveAndFlush(detalleDeOrdenDeCompra);

        // Get all the detalleDeOrdenDeCompraList
        restDetalleDeOrdenDeCompraMockMvc.perform(get("/api/detalle-de-orden-de-compras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalleDeOrdenDeCompra.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getDetalleDeOrdenDeCompra() throws Exception {
        // Initialize the database
        detalleDeOrdenDeCompraRepository.saveAndFlush(detalleDeOrdenDeCompra);

        // Get the detalleDeOrdenDeCompra
        restDetalleDeOrdenDeCompraMockMvc.perform(get("/api/detalle-de-orden-de-compras/{id}", detalleDeOrdenDeCompra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(detalleDeOrdenDeCompra.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDetalleDeOrdenDeCompra() throws Exception {
        // Get the detalleDeOrdenDeCompra
        restDetalleDeOrdenDeCompraMockMvc.perform(get("/api/detalle-de-orden-de-compras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetalleDeOrdenDeCompra() throws Exception {
        // Initialize the database
        detalleDeOrdenDeCompraRepository.saveAndFlush(detalleDeOrdenDeCompra);

        int databaseSizeBeforeUpdate = detalleDeOrdenDeCompraRepository.findAll().size();

        // Update the detalleDeOrdenDeCompra
        DetalleDeOrdenDeCompra updatedDetalleDeOrdenDeCompra = detalleDeOrdenDeCompraRepository.findById(detalleDeOrdenDeCompra.getId()).get();
        // Disconnect from session so that the updates on updatedDetalleDeOrdenDeCompra are not directly saved in db
        em.detach(updatedDetalleDeOrdenDeCompra);
        updatedDetalleDeOrdenDeCompra
            .cantidad(UPDATED_CANTIDAD)
            .descripcion(UPDATED_DESCRIPCION);

        restDetalleDeOrdenDeCompraMockMvc.perform(put("/api/detalle-de-orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetalleDeOrdenDeCompra)))
            .andExpect(status().isOk());

        // Validate the DetalleDeOrdenDeCompra in the database
        List<DetalleDeOrdenDeCompra> detalleDeOrdenDeCompraList = detalleDeOrdenDeCompraRepository.findAll();
        assertThat(detalleDeOrdenDeCompraList).hasSize(databaseSizeBeforeUpdate);
        DetalleDeOrdenDeCompra testDetalleDeOrdenDeCompra = detalleDeOrdenDeCompraList.get(detalleDeOrdenDeCompraList.size() - 1);
        assertThat(testDetalleDeOrdenDeCompra.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testDetalleDeOrdenDeCompra.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingDetalleDeOrdenDeCompra() throws Exception {
        int databaseSizeBeforeUpdate = detalleDeOrdenDeCompraRepository.findAll().size();

        // Create the DetalleDeOrdenDeCompra

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleDeOrdenDeCompraMockMvc.perform(put("/api/detalle-de-orden-de-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleDeOrdenDeCompra)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleDeOrdenDeCompra in the database
        List<DetalleDeOrdenDeCompra> detalleDeOrdenDeCompraList = detalleDeOrdenDeCompraRepository.findAll();
        assertThat(detalleDeOrdenDeCompraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDetalleDeOrdenDeCompra() throws Exception {
        // Initialize the database
        detalleDeOrdenDeCompraRepository.saveAndFlush(detalleDeOrdenDeCompra);

        int databaseSizeBeforeDelete = detalleDeOrdenDeCompraRepository.findAll().size();

        // Delete the detalleDeOrdenDeCompra
        restDetalleDeOrdenDeCompraMockMvc.perform(delete("/api/detalle-de-orden-de-compras/{id}", detalleDeOrdenDeCompra.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetalleDeOrdenDeCompra> detalleDeOrdenDeCompraList = detalleDeOrdenDeCompraRepository.findAll();
        assertThat(detalleDeOrdenDeCompraList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetalleDeOrdenDeCompra.class);
        DetalleDeOrdenDeCompra detalleDeOrdenDeCompra1 = new DetalleDeOrdenDeCompra();
        detalleDeOrdenDeCompra1.setId(1L);
        DetalleDeOrdenDeCompra detalleDeOrdenDeCompra2 = new DetalleDeOrdenDeCompra();
        detalleDeOrdenDeCompra2.setId(detalleDeOrdenDeCompra1.getId());
        assertThat(detalleDeOrdenDeCompra1).isEqualTo(detalleDeOrdenDeCompra2);
        detalleDeOrdenDeCompra2.setId(2L);
        assertThat(detalleDeOrdenDeCompra1).isNotEqualTo(detalleDeOrdenDeCompra2);
        detalleDeOrdenDeCompra1.setId(null);
        assertThat(detalleDeOrdenDeCompra1).isNotEqualTo(detalleDeOrdenDeCompra2);
    }
}
