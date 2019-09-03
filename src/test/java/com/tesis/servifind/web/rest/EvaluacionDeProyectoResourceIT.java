package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.EvaluacionDeProyecto;
import com.tesis.servifind.repository.EvaluacionDeProyectoRepository;
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
 * Integration tests for the {@link EvaluacionDeProyectoResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class EvaluacionDeProyectoResourceIT {

    private static final String DEFAULT_COMENTARIO = "AAAAAAAAAA";
    private static final String UPDATED_COMENTARIO = "BBBBBBBBBB";

    private static final Long DEFAULT_CALIFICACION = 1L;
    private static final Long UPDATED_CALIFICACION = 2L;
    private static final Long SMALLER_CALIFICACION = 1L - 1L;

    private static final Instant DEFAULT_FECHA_DE_CREACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_DE_CREACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA_DE_CREACION = Instant.ofEpochMilli(-1L);

    @Autowired
    private EvaluacionDeProyectoRepository evaluacionDeProyectoRepository;

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

    private MockMvc restEvaluacionDeProyectoMockMvc;

    private EvaluacionDeProyecto evaluacionDeProyecto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EvaluacionDeProyectoResource evaluacionDeProyectoResource = new EvaluacionDeProyectoResource(evaluacionDeProyectoRepository);
        this.restEvaluacionDeProyectoMockMvc = MockMvcBuilders.standaloneSetup(evaluacionDeProyectoResource)
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
    public static EvaluacionDeProyecto createEntity(EntityManager em) {
        EvaluacionDeProyecto evaluacionDeProyecto = new EvaluacionDeProyecto()
            .comentario(DEFAULT_COMENTARIO)
            .calificacion(DEFAULT_CALIFICACION)
            .fechaDeCreacion(DEFAULT_FECHA_DE_CREACION);
        return evaluacionDeProyecto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EvaluacionDeProyecto createUpdatedEntity(EntityManager em) {
        EvaluacionDeProyecto evaluacionDeProyecto = new EvaluacionDeProyecto()
            .comentario(UPDATED_COMENTARIO)
            .calificacion(UPDATED_CALIFICACION)
            .fechaDeCreacion(UPDATED_FECHA_DE_CREACION);
        return evaluacionDeProyecto;
    }

    @BeforeEach
    public void initTest() {
        evaluacionDeProyecto = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvaluacionDeProyecto() throws Exception {
        int databaseSizeBeforeCreate = evaluacionDeProyectoRepository.findAll().size();

        // Create the EvaluacionDeProyecto
        restEvaluacionDeProyectoMockMvc.perform(post("/api/evaluacion-de-proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluacionDeProyecto)))
            .andExpect(status().isCreated());

        // Validate the EvaluacionDeProyecto in the database
        List<EvaluacionDeProyecto> evaluacionDeProyectoList = evaluacionDeProyectoRepository.findAll();
        assertThat(evaluacionDeProyectoList).hasSize(databaseSizeBeforeCreate + 1);
        EvaluacionDeProyecto testEvaluacionDeProyecto = evaluacionDeProyectoList.get(evaluacionDeProyectoList.size() - 1);
        assertThat(testEvaluacionDeProyecto.getComentario()).isEqualTo(DEFAULT_COMENTARIO);
        assertThat(testEvaluacionDeProyecto.getCalificacion()).isEqualTo(DEFAULT_CALIFICACION);
        assertThat(testEvaluacionDeProyecto.getFechaDeCreacion()).isEqualTo(DEFAULT_FECHA_DE_CREACION);
    }

    @Test
    @Transactional
    public void createEvaluacionDeProyectoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = evaluacionDeProyectoRepository.findAll().size();

        // Create the EvaluacionDeProyecto with an existing ID
        evaluacionDeProyecto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEvaluacionDeProyectoMockMvc.perform(post("/api/evaluacion-de-proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluacionDeProyecto)))
            .andExpect(status().isBadRequest());

        // Validate the EvaluacionDeProyecto in the database
        List<EvaluacionDeProyecto> evaluacionDeProyectoList = evaluacionDeProyectoRepository.findAll();
        assertThat(evaluacionDeProyectoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEvaluacionDeProyectos() throws Exception {
        // Initialize the database
        evaluacionDeProyectoRepository.saveAndFlush(evaluacionDeProyecto);

        // Get all the evaluacionDeProyectoList
        restEvaluacionDeProyectoMockMvc.perform(get("/api/evaluacion-de-proyectos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evaluacionDeProyecto.getId().intValue())))
            .andExpect(jsonPath("$.[*].comentario").value(hasItem(DEFAULT_COMENTARIO.toString())))
            .andExpect(jsonPath("$.[*].calificacion").value(hasItem(DEFAULT_CALIFICACION.intValue())))
            .andExpect(jsonPath("$.[*].fechaDeCreacion").value(hasItem(DEFAULT_FECHA_DE_CREACION.toString())));
    }
    
    @Test
    @Transactional
    public void getEvaluacionDeProyecto() throws Exception {
        // Initialize the database
        evaluacionDeProyectoRepository.saveAndFlush(evaluacionDeProyecto);

        // Get the evaluacionDeProyecto
        restEvaluacionDeProyectoMockMvc.perform(get("/api/evaluacion-de-proyectos/{id}", evaluacionDeProyecto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(evaluacionDeProyecto.getId().intValue()))
            .andExpect(jsonPath("$.comentario").value(DEFAULT_COMENTARIO.toString()))
            .andExpect(jsonPath("$.calificacion").value(DEFAULT_CALIFICACION.intValue()))
            .andExpect(jsonPath("$.fechaDeCreacion").value(DEFAULT_FECHA_DE_CREACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEvaluacionDeProyecto() throws Exception {
        // Get the evaluacionDeProyecto
        restEvaluacionDeProyectoMockMvc.perform(get("/api/evaluacion-de-proyectos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvaluacionDeProyecto() throws Exception {
        // Initialize the database
        evaluacionDeProyectoRepository.saveAndFlush(evaluacionDeProyecto);

        int databaseSizeBeforeUpdate = evaluacionDeProyectoRepository.findAll().size();

        // Update the evaluacionDeProyecto
        EvaluacionDeProyecto updatedEvaluacionDeProyecto = evaluacionDeProyectoRepository.findById(evaluacionDeProyecto.getId()).get();
        // Disconnect from session so that the updates on updatedEvaluacionDeProyecto are not directly saved in db
        em.detach(updatedEvaluacionDeProyecto);
        updatedEvaluacionDeProyecto
            .comentario(UPDATED_COMENTARIO)
            .calificacion(UPDATED_CALIFICACION)
            .fechaDeCreacion(UPDATED_FECHA_DE_CREACION);

        restEvaluacionDeProyectoMockMvc.perform(put("/api/evaluacion-de-proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvaluacionDeProyecto)))
            .andExpect(status().isOk());

        // Validate the EvaluacionDeProyecto in the database
        List<EvaluacionDeProyecto> evaluacionDeProyectoList = evaluacionDeProyectoRepository.findAll();
        assertThat(evaluacionDeProyectoList).hasSize(databaseSizeBeforeUpdate);
        EvaluacionDeProyecto testEvaluacionDeProyecto = evaluacionDeProyectoList.get(evaluacionDeProyectoList.size() - 1);
        assertThat(testEvaluacionDeProyecto.getComentario()).isEqualTo(UPDATED_COMENTARIO);
        assertThat(testEvaluacionDeProyecto.getCalificacion()).isEqualTo(UPDATED_CALIFICACION);
        assertThat(testEvaluacionDeProyecto.getFechaDeCreacion()).isEqualTo(UPDATED_FECHA_DE_CREACION);
    }

    @Test
    @Transactional
    public void updateNonExistingEvaluacionDeProyecto() throws Exception {
        int databaseSizeBeforeUpdate = evaluacionDeProyectoRepository.findAll().size();

        // Create the EvaluacionDeProyecto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEvaluacionDeProyectoMockMvc.perform(put("/api/evaluacion-de-proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluacionDeProyecto)))
            .andExpect(status().isBadRequest());

        // Validate the EvaluacionDeProyecto in the database
        List<EvaluacionDeProyecto> evaluacionDeProyectoList = evaluacionDeProyectoRepository.findAll();
        assertThat(evaluacionDeProyectoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEvaluacionDeProyecto() throws Exception {
        // Initialize the database
        evaluacionDeProyectoRepository.saveAndFlush(evaluacionDeProyecto);

        int databaseSizeBeforeDelete = evaluacionDeProyectoRepository.findAll().size();

        // Delete the evaluacionDeProyecto
        restEvaluacionDeProyectoMockMvc.perform(delete("/api/evaluacion-de-proyectos/{id}", evaluacionDeProyecto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EvaluacionDeProyecto> evaluacionDeProyectoList = evaluacionDeProyectoRepository.findAll();
        assertThat(evaluacionDeProyectoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EvaluacionDeProyecto.class);
        EvaluacionDeProyecto evaluacionDeProyecto1 = new EvaluacionDeProyecto();
        evaluacionDeProyecto1.setId(1L);
        EvaluacionDeProyecto evaluacionDeProyecto2 = new EvaluacionDeProyecto();
        evaluacionDeProyecto2.setId(evaluacionDeProyecto1.getId());
        assertThat(evaluacionDeProyecto1).isEqualTo(evaluacionDeProyecto2);
        evaluacionDeProyecto2.setId(2L);
        assertThat(evaluacionDeProyecto1).isNotEqualTo(evaluacionDeProyecto2);
        evaluacionDeProyecto1.setId(null);
        assertThat(evaluacionDeProyecto1).isNotEqualTo(evaluacionDeProyecto2);
    }
}
