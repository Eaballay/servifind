package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.Tarea;
import com.tesis.servifind.repository.TareaRepository;
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
 * Integration tests for the {@link TareaResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class TareaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_PRECIO_POR_UNIDAD = "AAAAAAAAAA";
    private static final String UPDATED_PRECIO_POR_UNIDAD = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_DE_CREACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_DE_CREACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_DE_CREACION = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_FECHA_DE_MODIFICACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_DE_MODIFICACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_DE_MODIFICACION = Instant.ofEpochMilli(-1L);

    @Autowired
    private TareaRepository tareaRepository;

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

    private MockMvc restTareaMockMvc;

    private Tarea tarea;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TareaResource tareaResource = new TareaResource(tareaRepository);
        this.restTareaMockMvc = MockMvcBuilders.standaloneSetup(tareaResource)
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
    public static Tarea createEntity(EntityManager em) {
        Tarea tarea = new Tarea()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .precioPorUnidad(DEFAULT_PRECIO_POR_UNIDAD)
            .fechaDeCreacion(DEFAULT_FECHA_DE_CREACION)
            .fechaDeModificacion(DEFAULT_FECHA_DE_MODIFICACION);
        return tarea;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tarea createUpdatedEntity(EntityManager em) {
        Tarea tarea = new Tarea()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .precioPorUnidad(UPDATED_PRECIO_POR_UNIDAD)
            .fechaDeCreacion(UPDATED_FECHA_DE_CREACION)
            .fechaDeModificacion(UPDATED_FECHA_DE_MODIFICACION);
        return tarea;
    }

    @BeforeEach
    public void initTest() {
        tarea = createEntity(em);
    }

    @Test
    @Transactional
    public void createTarea() throws Exception {
        int databaseSizeBeforeCreate = tareaRepository.findAll().size();

        // Create the Tarea
        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isCreated());

        // Validate the Tarea in the database
        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeCreate + 1);
        Tarea testTarea = tareaList.get(tareaList.size() - 1);
        assertThat(testTarea.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testTarea.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testTarea.getPrecioPorUnidad()).isEqualTo(DEFAULT_PRECIO_POR_UNIDAD);
        assertThat(testTarea.getFechaDeCreacion()).isEqualTo(DEFAULT_FECHA_DE_CREACION);
        assertThat(testTarea.getFechaDeModificacion()).isEqualTo(DEFAULT_FECHA_DE_MODIFICACION);
    }

    @Test
    @Transactional
    public void createTareaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tareaRepository.findAll().size();

        // Create the Tarea with an existing ID
        tarea.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        // Validate the Tarea in the database
        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setNombre(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setDescripcion(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrecioPorUnidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setPrecioPorUnidad(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaDeCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setFechaDeCreacion(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaDeModificacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setFechaDeModificacion(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTareas() throws Exception {
        // Initialize the database
        tareaRepository.saveAndFlush(tarea);

        // Get all the tareaList
        restTareaMockMvc.perform(get("/api/tareas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarea.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].precioPorUnidad").value(hasItem(DEFAULT_PRECIO_POR_UNIDAD.toString())))
            .andExpect(jsonPath("$.[*].fechaDeCreacion").value(hasItem(DEFAULT_FECHA_DE_CREACION.toString())))
            .andExpect(jsonPath("$.[*].fechaDeModificacion").value(hasItem(DEFAULT_FECHA_DE_MODIFICACION.toString())));
    }
    
    @Test
    @Transactional
    public void getTarea() throws Exception {
        // Initialize the database
        tareaRepository.saveAndFlush(tarea);

        // Get the tarea
        restTareaMockMvc.perform(get("/api/tareas/{id}", tarea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tarea.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.precioPorUnidad").value(DEFAULT_PRECIO_POR_UNIDAD.toString()))
            .andExpect(jsonPath("$.fechaDeCreacion").value(DEFAULT_FECHA_DE_CREACION.toString()))
            .andExpect(jsonPath("$.fechaDeModificacion").value(DEFAULT_FECHA_DE_MODIFICACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTarea() throws Exception {
        // Get the tarea
        restTareaMockMvc.perform(get("/api/tareas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTarea() throws Exception {
        // Initialize the database
        tareaRepository.saveAndFlush(tarea);

        int databaseSizeBeforeUpdate = tareaRepository.findAll().size();

        // Update the tarea
        Tarea updatedTarea = tareaRepository.findById(tarea.getId()).get();
        // Disconnect from session so that the updates on updatedTarea are not directly saved in db
        em.detach(updatedTarea);
        updatedTarea
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .precioPorUnidad(UPDATED_PRECIO_POR_UNIDAD)
            .fechaDeCreacion(UPDATED_FECHA_DE_CREACION)
            .fechaDeModificacion(UPDATED_FECHA_DE_MODIFICACION);

        restTareaMockMvc.perform(put("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTarea)))
            .andExpect(status().isOk());

        // Validate the Tarea in the database
        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeUpdate);
        Tarea testTarea = tareaList.get(tareaList.size() - 1);
        assertThat(testTarea.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testTarea.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testTarea.getPrecioPorUnidad()).isEqualTo(UPDATED_PRECIO_POR_UNIDAD);
        assertThat(testTarea.getFechaDeCreacion()).isEqualTo(UPDATED_FECHA_DE_CREACION);
        assertThat(testTarea.getFechaDeModificacion()).isEqualTo(UPDATED_FECHA_DE_MODIFICACION);
    }

    @Test
    @Transactional
    public void updateNonExistingTarea() throws Exception {
        int databaseSizeBeforeUpdate = tareaRepository.findAll().size();

        // Create the Tarea

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTareaMockMvc.perform(put("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        // Validate the Tarea in the database
        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTarea() throws Exception {
        // Initialize the database
        tareaRepository.saveAndFlush(tarea);

        int databaseSizeBeforeDelete = tareaRepository.findAll().size();

        // Delete the tarea
        restTareaMockMvc.perform(delete("/api/tareas/{id}", tarea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tarea.class);
        Tarea tarea1 = new Tarea();
        tarea1.setId(1L);
        Tarea tarea2 = new Tarea();
        tarea2.setId(tarea1.getId());
        assertThat(tarea1).isEqualTo(tarea2);
        tarea2.setId(2L);
        assertThat(tarea1).isNotEqualTo(tarea2);
        tarea1.setId(null);
        assertThat(tarea1).isNotEqualTo(tarea2);
    }
}
