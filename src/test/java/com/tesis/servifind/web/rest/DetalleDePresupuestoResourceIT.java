package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.DetalleDePresupuesto;
import com.tesis.servifind.repository.DetalleDePresupuestoRepository;
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
 * Integration tests for the {@link DetalleDePresupuestoResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class DetalleDePresupuestoResourceIT {

    private static final Long DEFAULT_CANTIDAD = 1L;
    private static final Long UPDATED_CANTIDAD = 2L;
    private static final Long SMALLER_CANTIDAD = 1L - 1L;

    private static final String DEFAULT_VALOR_POR_UNIDAD = "AAAAAAAAAA";
    private static final String UPDATED_VALOR_POR_UNIDAD = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private DetalleDePresupuestoRepository detalleDePresupuestoRepository;

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

    private MockMvc restDetalleDePresupuestoMockMvc;

    private DetalleDePresupuesto detalleDePresupuesto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DetalleDePresupuestoResource detalleDePresupuestoResource = new DetalleDePresupuestoResource(detalleDePresupuestoRepository);
        this.restDetalleDePresupuestoMockMvc = MockMvcBuilders.standaloneSetup(detalleDePresupuestoResource)
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
    public static DetalleDePresupuesto createEntity(EntityManager em) {
        DetalleDePresupuesto detalleDePresupuesto = new DetalleDePresupuesto()
            .cantidad(DEFAULT_CANTIDAD)
            .valorPorUnidad(DEFAULT_VALOR_POR_UNIDAD)
            .descripcion(DEFAULT_DESCRIPCION);
        return detalleDePresupuesto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleDePresupuesto createUpdatedEntity(EntityManager em) {
        DetalleDePresupuesto detalleDePresupuesto = new DetalleDePresupuesto()
            .cantidad(UPDATED_CANTIDAD)
            .valorPorUnidad(UPDATED_VALOR_POR_UNIDAD)
            .descripcion(UPDATED_DESCRIPCION);
        return detalleDePresupuesto;
    }

    @BeforeEach
    public void initTest() {
        detalleDePresupuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetalleDePresupuesto() throws Exception {
        int databaseSizeBeforeCreate = detalleDePresupuestoRepository.findAll().size();

        // Create the DetalleDePresupuesto
        restDetalleDePresupuestoMockMvc.perform(post("/api/detalle-de-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleDePresupuesto)))
            .andExpect(status().isCreated());

        // Validate the DetalleDePresupuesto in the database
        List<DetalleDePresupuesto> detalleDePresupuestoList = detalleDePresupuestoRepository.findAll();
        assertThat(detalleDePresupuestoList).hasSize(databaseSizeBeforeCreate + 1);
        DetalleDePresupuesto testDetalleDePresupuesto = detalleDePresupuestoList.get(detalleDePresupuestoList.size() - 1);
        assertThat(testDetalleDePresupuesto.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testDetalleDePresupuesto.getValorPorUnidad()).isEqualTo(DEFAULT_VALOR_POR_UNIDAD);
        assertThat(testDetalleDePresupuesto.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createDetalleDePresupuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detalleDePresupuestoRepository.findAll().size();

        // Create the DetalleDePresupuesto with an existing ID
        detalleDePresupuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetalleDePresupuestoMockMvc.perform(post("/api/detalle-de-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleDePresupuesto)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleDePresupuesto in the database
        List<DetalleDePresupuesto> detalleDePresupuestoList = detalleDePresupuestoRepository.findAll();
        assertThat(detalleDePresupuestoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = detalleDePresupuestoRepository.findAll().size();
        // set the field null
        detalleDePresupuesto.setCantidad(null);

        // Create the DetalleDePresupuesto, which fails.

        restDetalleDePresupuestoMockMvc.perform(post("/api/detalle-de-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleDePresupuesto)))
            .andExpect(status().isBadRequest());

        List<DetalleDePresupuesto> detalleDePresupuestoList = detalleDePresupuestoRepository.findAll();
        assertThat(detalleDePresupuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValorPorUnidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = detalleDePresupuestoRepository.findAll().size();
        // set the field null
        detalleDePresupuesto.setValorPorUnidad(null);

        // Create the DetalleDePresupuesto, which fails.

        restDetalleDePresupuestoMockMvc.perform(post("/api/detalle-de-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleDePresupuesto)))
            .andExpect(status().isBadRequest());

        List<DetalleDePresupuesto> detalleDePresupuestoList = detalleDePresupuestoRepository.findAll();
        assertThat(detalleDePresupuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDetalleDePresupuestos() throws Exception {
        // Initialize the database
        detalleDePresupuestoRepository.saveAndFlush(detalleDePresupuesto);

        // Get all the detalleDePresupuestoList
        restDetalleDePresupuestoMockMvc.perform(get("/api/detalle-de-presupuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalleDePresupuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())))
            .andExpect(jsonPath("$.[*].valorPorUnidad").value(hasItem(DEFAULT_VALOR_POR_UNIDAD.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getDetalleDePresupuesto() throws Exception {
        // Initialize the database
        detalleDePresupuestoRepository.saveAndFlush(detalleDePresupuesto);

        // Get the detalleDePresupuesto
        restDetalleDePresupuestoMockMvc.perform(get("/api/detalle-de-presupuestos/{id}", detalleDePresupuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(detalleDePresupuesto.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()))
            .andExpect(jsonPath("$.valorPorUnidad").value(DEFAULT_VALOR_POR_UNIDAD.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDetalleDePresupuesto() throws Exception {
        // Get the detalleDePresupuesto
        restDetalleDePresupuestoMockMvc.perform(get("/api/detalle-de-presupuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetalleDePresupuesto() throws Exception {
        // Initialize the database
        detalleDePresupuestoRepository.saveAndFlush(detalleDePresupuesto);

        int databaseSizeBeforeUpdate = detalleDePresupuestoRepository.findAll().size();

        // Update the detalleDePresupuesto
        DetalleDePresupuesto updatedDetalleDePresupuesto = detalleDePresupuestoRepository.findById(detalleDePresupuesto.getId()).get();
        // Disconnect from session so that the updates on updatedDetalleDePresupuesto are not directly saved in db
        em.detach(updatedDetalleDePresupuesto);
        updatedDetalleDePresupuesto
            .cantidad(UPDATED_CANTIDAD)
            .valorPorUnidad(UPDATED_VALOR_POR_UNIDAD)
            .descripcion(UPDATED_DESCRIPCION);

        restDetalleDePresupuestoMockMvc.perform(put("/api/detalle-de-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetalleDePresupuesto)))
            .andExpect(status().isOk());

        // Validate the DetalleDePresupuesto in the database
        List<DetalleDePresupuesto> detalleDePresupuestoList = detalleDePresupuestoRepository.findAll();
        assertThat(detalleDePresupuestoList).hasSize(databaseSizeBeforeUpdate);
        DetalleDePresupuesto testDetalleDePresupuesto = detalleDePresupuestoList.get(detalleDePresupuestoList.size() - 1);
        assertThat(testDetalleDePresupuesto.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testDetalleDePresupuesto.getValorPorUnidad()).isEqualTo(UPDATED_VALOR_POR_UNIDAD);
        assertThat(testDetalleDePresupuesto.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingDetalleDePresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = detalleDePresupuestoRepository.findAll().size();

        // Create the DetalleDePresupuesto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleDePresupuestoMockMvc.perform(put("/api/detalle-de-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleDePresupuesto)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleDePresupuesto in the database
        List<DetalleDePresupuesto> detalleDePresupuestoList = detalleDePresupuestoRepository.findAll();
        assertThat(detalleDePresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDetalleDePresupuesto() throws Exception {
        // Initialize the database
        detalleDePresupuestoRepository.saveAndFlush(detalleDePresupuesto);

        int databaseSizeBeforeDelete = detalleDePresupuestoRepository.findAll().size();

        // Delete the detalleDePresupuesto
        restDetalleDePresupuestoMockMvc.perform(delete("/api/detalle-de-presupuestos/{id}", detalleDePresupuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetalleDePresupuesto> detalleDePresupuestoList = detalleDePresupuestoRepository.findAll();
        assertThat(detalleDePresupuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetalleDePresupuesto.class);
        DetalleDePresupuesto detalleDePresupuesto1 = new DetalleDePresupuesto();
        detalleDePresupuesto1.setId(1L);
        DetalleDePresupuesto detalleDePresupuesto2 = new DetalleDePresupuesto();
        detalleDePresupuesto2.setId(detalleDePresupuesto1.getId());
        assertThat(detalleDePresupuesto1).isEqualTo(detalleDePresupuesto2);
        detalleDePresupuesto2.setId(2L);
        assertThat(detalleDePresupuesto1).isNotEqualTo(detalleDePresupuesto2);
        detalleDePresupuesto1.setId(null);
        assertThat(detalleDePresupuesto1).isNotEqualTo(detalleDePresupuesto2);
    }
}
