package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.OrdenDeTrabajo;
import com.tesis.servifind.repository.OrdenDeTrabajoRepository;
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
 * Integration tests for the {@link OrdenDeTrabajoResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class OrdenDeTrabajoResourceIT {

    private static final Instant DEFAULT_FECHA_DE_REALIZACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_DE_REALIZACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_DE_REALIZACION = Instant.ofEpochMilli(-1L);

    private static final Long DEFAULT_HORAS_ESTIMADAS = 1L;
    private static final Long UPDATED_HORAS_ESTIMADAS = 2L;
    private static final Long SMALLER_HORAS_ESTIMADAS = 1L - 1L;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private OrdenDeTrabajoRepository ordenDeTrabajoRepository;

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

    private MockMvc restOrdenDeTrabajoMockMvc;

    private OrdenDeTrabajo ordenDeTrabajo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdenDeTrabajoResource ordenDeTrabajoResource = new OrdenDeTrabajoResource(ordenDeTrabajoRepository);
        this.restOrdenDeTrabajoMockMvc = MockMvcBuilders.standaloneSetup(ordenDeTrabajoResource)
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
    public static OrdenDeTrabajo createEntity(EntityManager em) {
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo()
            .fechaDeRealizacion(DEFAULT_FECHA_DE_REALIZACION)
            .horasEstimadas(DEFAULT_HORAS_ESTIMADAS)
            .descripcion(DEFAULT_DESCRIPCION);
        return ordenDeTrabajo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrdenDeTrabajo createUpdatedEntity(EntityManager em) {
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo()
            .fechaDeRealizacion(UPDATED_FECHA_DE_REALIZACION)
            .horasEstimadas(UPDATED_HORAS_ESTIMADAS)
            .descripcion(UPDATED_DESCRIPCION);
        return ordenDeTrabajo;
    }

    @BeforeEach
    public void initTest() {
        ordenDeTrabajo = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdenDeTrabajo() throws Exception {
        int databaseSizeBeforeCreate = ordenDeTrabajoRepository.findAll().size();

        // Create the OrdenDeTrabajo
        restOrdenDeTrabajoMockMvc.perform(post("/api/orden-de-trabajos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeTrabajo)))
            .andExpect(status().isCreated());

        // Validate the OrdenDeTrabajo in the database
        List<OrdenDeTrabajo> ordenDeTrabajoList = ordenDeTrabajoRepository.findAll();
        assertThat(ordenDeTrabajoList).hasSize(databaseSizeBeforeCreate + 1);
        OrdenDeTrabajo testOrdenDeTrabajo = ordenDeTrabajoList.get(ordenDeTrabajoList.size() - 1);
        assertThat(testOrdenDeTrabajo.getFechaDeRealizacion()).isEqualTo(DEFAULT_FECHA_DE_REALIZACION);
        assertThat(testOrdenDeTrabajo.getHorasEstimadas()).isEqualTo(DEFAULT_HORAS_ESTIMADAS);
        assertThat(testOrdenDeTrabajo.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createOrdenDeTrabajoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordenDeTrabajoRepository.findAll().size();

        // Create the OrdenDeTrabajo with an existing ID
        ordenDeTrabajo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdenDeTrabajoMockMvc.perform(post("/api/orden-de-trabajos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeTrabajo)))
            .andExpect(status().isBadRequest());

        // Validate the OrdenDeTrabajo in the database
        List<OrdenDeTrabajo> ordenDeTrabajoList = ordenDeTrabajoRepository.findAll();
        assertThat(ordenDeTrabajoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFechaDeRealizacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordenDeTrabajoRepository.findAll().size();
        // set the field null
        ordenDeTrabajo.setFechaDeRealizacion(null);

        // Create the OrdenDeTrabajo, which fails.

        restOrdenDeTrabajoMockMvc.perform(post("/api/orden-de-trabajos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeTrabajo)))
            .andExpect(status().isBadRequest());

        List<OrdenDeTrabajo> ordenDeTrabajoList = ordenDeTrabajoRepository.findAll();
        assertThat(ordenDeTrabajoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordenDeTrabajoRepository.findAll().size();
        // set the field null
        ordenDeTrabajo.setDescripcion(null);

        // Create the OrdenDeTrabajo, which fails.

        restOrdenDeTrabajoMockMvc.perform(post("/api/orden-de-trabajos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeTrabajo)))
            .andExpect(status().isBadRequest());

        List<OrdenDeTrabajo> ordenDeTrabajoList = ordenDeTrabajoRepository.findAll();
        assertThat(ordenDeTrabajoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrdenDeTrabajos() throws Exception {
        // Initialize the database
        ordenDeTrabajoRepository.saveAndFlush(ordenDeTrabajo);

        // Get all the ordenDeTrabajoList
        restOrdenDeTrabajoMockMvc.perform(get("/api/orden-de-trabajos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordenDeTrabajo.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDeRealizacion").value(hasItem(DEFAULT_FECHA_DE_REALIZACION.toString())))
            .andExpect(jsonPath("$.[*].horasEstimadas").value(hasItem(DEFAULT_HORAS_ESTIMADAS.intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getOrdenDeTrabajo() throws Exception {
        // Initialize the database
        ordenDeTrabajoRepository.saveAndFlush(ordenDeTrabajo);

        // Get the ordenDeTrabajo
        restOrdenDeTrabajoMockMvc.perform(get("/api/orden-de-trabajos/{id}", ordenDeTrabajo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordenDeTrabajo.getId().intValue()))
            .andExpect(jsonPath("$.fechaDeRealizacion").value(DEFAULT_FECHA_DE_REALIZACION.toString()))
            .andExpect(jsonPath("$.horasEstimadas").value(DEFAULT_HORAS_ESTIMADAS.intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdenDeTrabajo() throws Exception {
        // Get the ordenDeTrabajo
        restOrdenDeTrabajoMockMvc.perform(get("/api/orden-de-trabajos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdenDeTrabajo() throws Exception {
        // Initialize the database
        ordenDeTrabajoRepository.saveAndFlush(ordenDeTrabajo);

        int databaseSizeBeforeUpdate = ordenDeTrabajoRepository.findAll().size();

        // Update the ordenDeTrabajo
        OrdenDeTrabajo updatedOrdenDeTrabajo = ordenDeTrabajoRepository.findById(ordenDeTrabajo.getId()).get();
        // Disconnect from session so that the updates on updatedOrdenDeTrabajo are not directly saved in db
        em.detach(updatedOrdenDeTrabajo);
        updatedOrdenDeTrabajo
            .fechaDeRealizacion(UPDATED_FECHA_DE_REALIZACION)
            .horasEstimadas(UPDATED_HORAS_ESTIMADAS)
            .descripcion(UPDATED_DESCRIPCION);

        restOrdenDeTrabajoMockMvc.perform(put("/api/orden-de-trabajos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdenDeTrabajo)))
            .andExpect(status().isOk());

        // Validate the OrdenDeTrabajo in the database
        List<OrdenDeTrabajo> ordenDeTrabajoList = ordenDeTrabajoRepository.findAll();
        assertThat(ordenDeTrabajoList).hasSize(databaseSizeBeforeUpdate);
        OrdenDeTrabajo testOrdenDeTrabajo = ordenDeTrabajoList.get(ordenDeTrabajoList.size() - 1);
        assertThat(testOrdenDeTrabajo.getFechaDeRealizacion()).isEqualTo(UPDATED_FECHA_DE_REALIZACION);
        assertThat(testOrdenDeTrabajo.getHorasEstimadas()).isEqualTo(UPDATED_HORAS_ESTIMADAS);
        assertThat(testOrdenDeTrabajo.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdenDeTrabajo() throws Exception {
        int databaseSizeBeforeUpdate = ordenDeTrabajoRepository.findAll().size();

        // Create the OrdenDeTrabajo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrdenDeTrabajoMockMvc.perform(put("/api/orden-de-trabajos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeTrabajo)))
            .andExpect(status().isBadRequest());

        // Validate the OrdenDeTrabajo in the database
        List<OrdenDeTrabajo> ordenDeTrabajoList = ordenDeTrabajoRepository.findAll();
        assertThat(ordenDeTrabajoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrdenDeTrabajo() throws Exception {
        // Initialize the database
        ordenDeTrabajoRepository.saveAndFlush(ordenDeTrabajo);

        int databaseSizeBeforeDelete = ordenDeTrabajoRepository.findAll().size();

        // Delete the ordenDeTrabajo
        restOrdenDeTrabajoMockMvc.perform(delete("/api/orden-de-trabajos/{id}", ordenDeTrabajo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrdenDeTrabajo> ordenDeTrabajoList = ordenDeTrabajoRepository.findAll();
        assertThat(ordenDeTrabajoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrdenDeTrabajo.class);
        OrdenDeTrabajo ordenDeTrabajo1 = new OrdenDeTrabajo();
        ordenDeTrabajo1.setId(1L);
        OrdenDeTrabajo ordenDeTrabajo2 = new OrdenDeTrabajo();
        ordenDeTrabajo2.setId(ordenDeTrabajo1.getId());
        assertThat(ordenDeTrabajo1).isEqualTo(ordenDeTrabajo2);
        ordenDeTrabajo2.setId(2L);
        assertThat(ordenDeTrabajo1).isNotEqualTo(ordenDeTrabajo2);
        ordenDeTrabajo1.setId(null);
        assertThat(ordenDeTrabajo1).isNotEqualTo(ordenDeTrabajo2);
    }
}
