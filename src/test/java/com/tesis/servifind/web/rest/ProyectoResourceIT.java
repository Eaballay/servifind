package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.Proyecto;
import com.tesis.servifind.repository.ProyectoRepository;
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
 * Integration tests for the {@link ProyectoResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class ProyectoResourceIT {

    private static final Long DEFAULT_NRO_DE_PROYECTO = 1L;
    private static final Long UPDATED_NRO_DE_PROYECTO = 2L;
    private static final Long SMALLER_NRO_DE_PROYECTO = 1L - 1L;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_DE_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_DE_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_DE_INICIO = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_DE_FINALIZACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_DE_FINALIZACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_DE_FINALIZACION = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_DE_CREACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_DE_CREACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_DE_CREACION = Instant.ofEpochMilli(-1L);

    @Autowired
    private ProyectoRepository proyectoRepository;

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

    private MockMvc restProyectoMockMvc;

    private Proyecto proyecto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProyectoResource proyectoResource = new ProyectoResource(proyectoRepository);
        this.restProyectoMockMvc = MockMvcBuilders.standaloneSetup(proyectoResource)
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
    public static Proyecto createEntity(EntityManager em) {
        Proyecto proyecto = new Proyecto()
            .nroDeProyecto(DEFAULT_NRO_DE_PROYECTO)
            .descripcion(DEFAULT_DESCRIPCION)
            .direccion(DEFAULT_DIRECCION)
            .fechaDeInicio(DEFAULT_FECHA_DE_INICIO)
            .fechaDeFinalizacion(DEFAULT_FECHA_DE_FINALIZACION)
            .fechaDeCreacion(DEFAULT_FECHA_DE_CREACION);
        return proyecto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proyecto createUpdatedEntity(EntityManager em) {
        Proyecto proyecto = new Proyecto()
            .nroDeProyecto(UPDATED_NRO_DE_PROYECTO)
            .descripcion(UPDATED_DESCRIPCION)
            .direccion(UPDATED_DIRECCION)
            .fechaDeInicio(UPDATED_FECHA_DE_INICIO)
            .fechaDeFinalizacion(UPDATED_FECHA_DE_FINALIZACION)
            .fechaDeCreacion(UPDATED_FECHA_DE_CREACION);
        return proyecto;
    }

    @BeforeEach
    public void initTest() {
        proyecto = createEntity(em);
    }

    @Test
    @Transactional
    public void createProyecto() throws Exception {
        int databaseSizeBeforeCreate = proyectoRepository.findAll().size();

        // Create the Proyecto
        restProyectoMockMvc.perform(post("/api/proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isCreated());

        // Validate the Proyecto in the database
        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeCreate + 1);
        Proyecto testProyecto = proyectoList.get(proyectoList.size() - 1);
        assertThat(testProyecto.getNroDeProyecto()).isEqualTo(DEFAULT_NRO_DE_PROYECTO);
        assertThat(testProyecto.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testProyecto.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testProyecto.getFechaDeInicio()).isEqualTo(DEFAULT_FECHA_DE_INICIO);
        assertThat(testProyecto.getFechaDeFinalizacion()).isEqualTo(DEFAULT_FECHA_DE_FINALIZACION);
        assertThat(testProyecto.getFechaDeCreacion()).isEqualTo(DEFAULT_FECHA_DE_CREACION);
    }

    @Test
    @Transactional
    public void createProyectoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = proyectoRepository.findAll().size();

        // Create the Proyecto with an existing ID
        proyecto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProyectoMockMvc.perform(post("/api/proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isBadRequest());

        // Validate the Proyecto in the database
        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNroDeProyectoIsRequired() throws Exception {
        int databaseSizeBeforeTest = proyectoRepository.findAll().size();
        // set the field null
        proyecto.setNroDeProyecto(null);

        // Create the Proyecto, which fails.

        restProyectoMockMvc.perform(post("/api/proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isBadRequest());

        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = proyectoRepository.findAll().size();
        // set the field null
        proyecto.setDescripcion(null);

        // Create the Proyecto, which fails.

        restProyectoMockMvc.perform(post("/api/proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isBadRequest());

        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDireccionIsRequired() throws Exception {
        int databaseSizeBeforeTest = proyectoRepository.findAll().size();
        // set the field null
        proyecto.setDireccion(null);

        // Create the Proyecto, which fails.

        restProyectoMockMvc.perform(post("/api/proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isBadRequest());

        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaDeCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = proyectoRepository.findAll().size();
        // set the field null
        proyecto.setFechaDeCreacion(null);

        // Create the Proyecto, which fails.

        restProyectoMockMvc.perform(post("/api/proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isBadRequest());

        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProyectos() throws Exception {
        // Initialize the database
        proyectoRepository.saveAndFlush(proyecto);

        // Get all the proyectoList
        restProyectoMockMvc.perform(get("/api/proyectos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proyecto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nroDeProyecto").value(hasItem(DEFAULT_NRO_DE_PROYECTO.intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].fechaDeInicio").value(hasItem(DEFAULT_FECHA_DE_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaDeFinalizacion").value(hasItem(DEFAULT_FECHA_DE_FINALIZACION.toString())))
            .andExpect(jsonPath("$.[*].fechaDeCreacion").value(hasItem(DEFAULT_FECHA_DE_CREACION.toString())));
    }
    
    @Test
    @Transactional
    public void getProyecto() throws Exception {
        // Initialize the database
        proyectoRepository.saveAndFlush(proyecto);

        // Get the proyecto
        restProyectoMockMvc.perform(get("/api/proyectos/{id}", proyecto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(proyecto.getId().intValue()))
            .andExpect(jsonPath("$.nroDeProyecto").value(DEFAULT_NRO_DE_PROYECTO.intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.fechaDeInicio").value(DEFAULT_FECHA_DE_INICIO.toString()))
            .andExpect(jsonPath("$.fechaDeFinalizacion").value(DEFAULT_FECHA_DE_FINALIZACION.toString()))
            .andExpect(jsonPath("$.fechaDeCreacion").value(DEFAULT_FECHA_DE_CREACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProyecto() throws Exception {
        // Get the proyecto
        restProyectoMockMvc.perform(get("/api/proyectos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProyecto() throws Exception {
        // Initialize the database
        proyectoRepository.saveAndFlush(proyecto);

        int databaseSizeBeforeUpdate = proyectoRepository.findAll().size();

        // Update the proyecto
        Proyecto updatedProyecto = proyectoRepository.findById(proyecto.getId()).get();
        // Disconnect from session so that the updates on updatedProyecto are not directly saved in db
        em.detach(updatedProyecto);
        updatedProyecto
            .nroDeProyecto(UPDATED_NRO_DE_PROYECTO)
            .descripcion(UPDATED_DESCRIPCION)
            .direccion(UPDATED_DIRECCION)
            .fechaDeInicio(UPDATED_FECHA_DE_INICIO)
            .fechaDeFinalizacion(UPDATED_FECHA_DE_FINALIZACION)
            .fechaDeCreacion(UPDATED_FECHA_DE_CREACION);

        restProyectoMockMvc.perform(put("/api/proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProyecto)))
            .andExpect(status().isOk());

        // Validate the Proyecto in the database
        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeUpdate);
        Proyecto testProyecto = proyectoList.get(proyectoList.size() - 1);
        assertThat(testProyecto.getNroDeProyecto()).isEqualTo(UPDATED_NRO_DE_PROYECTO);
        assertThat(testProyecto.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testProyecto.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testProyecto.getFechaDeInicio()).isEqualTo(UPDATED_FECHA_DE_INICIO);
        assertThat(testProyecto.getFechaDeFinalizacion()).isEqualTo(UPDATED_FECHA_DE_FINALIZACION);
        assertThat(testProyecto.getFechaDeCreacion()).isEqualTo(UPDATED_FECHA_DE_CREACION);
    }

    @Test
    @Transactional
    public void updateNonExistingProyecto() throws Exception {
        int databaseSizeBeforeUpdate = proyectoRepository.findAll().size();

        // Create the Proyecto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProyectoMockMvc.perform(put("/api/proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proyecto)))
            .andExpect(status().isBadRequest());

        // Validate the Proyecto in the database
        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProyecto() throws Exception {
        // Initialize the database
        proyectoRepository.saveAndFlush(proyecto);

        int databaseSizeBeforeDelete = proyectoRepository.findAll().size();

        // Delete the proyecto
        restProyectoMockMvc.perform(delete("/api/proyectos/{id}", proyecto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Proyecto> proyectoList = proyectoRepository.findAll();
        assertThat(proyectoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Proyecto.class);
        Proyecto proyecto1 = new Proyecto();
        proyecto1.setId(1L);
        Proyecto proyecto2 = new Proyecto();
        proyecto2.setId(proyecto1.getId());
        assertThat(proyecto1).isEqualTo(proyecto2);
        proyecto2.setId(2L);
        assertThat(proyecto1).isNotEqualTo(proyecto2);
        proyecto1.setId(null);
        assertThat(proyecto1).isNotEqualTo(proyecto2);
    }
}
