package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.OrdenDeRelevamiento;
import com.tesis.servifind.repository.OrdenDeRelevamientoRepository;
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
 * Integration tests for the {@link OrdenDeRelevamientoResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class OrdenDeRelevamientoResourceIT {

    private static final String DEFAULT_COMENTARIO = "AAAAAAAAAA";
    private static final String UPDATED_COMENTARIO = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_HORA = Instant.ofEpochMilli(-1L);

    @Autowired
    private OrdenDeRelevamientoRepository ordenDeRelevamientoRepository;

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

    private MockMvc restOrdenDeRelevamientoMockMvc;

    private OrdenDeRelevamiento ordenDeRelevamiento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdenDeRelevamientoResource ordenDeRelevamientoResource = new OrdenDeRelevamientoResource(ordenDeRelevamientoRepository);
        this.restOrdenDeRelevamientoMockMvc = MockMvcBuilders.standaloneSetup(ordenDeRelevamientoResource)
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
    public static OrdenDeRelevamiento createEntity(EntityManager em) {
        OrdenDeRelevamiento ordenDeRelevamiento = new OrdenDeRelevamiento()
            .comentario(DEFAULT_COMENTARIO)
            .fecha(DEFAULT_FECHA)
            .hora(DEFAULT_HORA);
        return ordenDeRelevamiento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrdenDeRelevamiento createUpdatedEntity(EntityManager em) {
        OrdenDeRelevamiento ordenDeRelevamiento = new OrdenDeRelevamiento()
            .comentario(UPDATED_COMENTARIO)
            .fecha(UPDATED_FECHA)
            .hora(UPDATED_HORA);
        return ordenDeRelevamiento;
    }

    @BeforeEach
    public void initTest() {
        ordenDeRelevamiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdenDeRelevamiento() throws Exception {
        int databaseSizeBeforeCreate = ordenDeRelevamientoRepository.findAll().size();

        // Create the OrdenDeRelevamiento
        restOrdenDeRelevamientoMockMvc.perform(post("/api/orden-de-relevamientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeRelevamiento)))
            .andExpect(status().isCreated());

        // Validate the OrdenDeRelevamiento in the database
        List<OrdenDeRelevamiento> ordenDeRelevamientoList = ordenDeRelevamientoRepository.findAll();
        assertThat(ordenDeRelevamientoList).hasSize(databaseSizeBeforeCreate + 1);
        OrdenDeRelevamiento testOrdenDeRelevamiento = ordenDeRelevamientoList.get(ordenDeRelevamientoList.size() - 1);
        assertThat(testOrdenDeRelevamiento.getComentario()).isEqualTo(DEFAULT_COMENTARIO);
        assertThat(testOrdenDeRelevamiento.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testOrdenDeRelevamiento.getHora()).isEqualTo(DEFAULT_HORA);
    }

    @Test
    @Transactional
    public void createOrdenDeRelevamientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordenDeRelevamientoRepository.findAll().size();

        // Create the OrdenDeRelevamiento with an existing ID
        ordenDeRelevamiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdenDeRelevamientoMockMvc.perform(post("/api/orden-de-relevamientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeRelevamiento)))
            .andExpect(status().isBadRequest());

        // Validate the OrdenDeRelevamiento in the database
        List<OrdenDeRelevamiento> ordenDeRelevamientoList = ordenDeRelevamientoRepository.findAll();
        assertThat(ordenDeRelevamientoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordenDeRelevamientoRepository.findAll().size();
        // set the field null
        ordenDeRelevamiento.setFecha(null);

        // Create the OrdenDeRelevamiento, which fails.

        restOrdenDeRelevamientoMockMvc.perform(post("/api/orden-de-relevamientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeRelevamiento)))
            .andExpect(status().isBadRequest());

        List<OrdenDeRelevamiento> ordenDeRelevamientoList = ordenDeRelevamientoRepository.findAll();
        assertThat(ordenDeRelevamientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHoraIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordenDeRelevamientoRepository.findAll().size();
        // set the field null
        ordenDeRelevamiento.setHora(null);

        // Create the OrdenDeRelevamiento, which fails.

        restOrdenDeRelevamientoMockMvc.perform(post("/api/orden-de-relevamientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeRelevamiento)))
            .andExpect(status().isBadRequest());

        List<OrdenDeRelevamiento> ordenDeRelevamientoList = ordenDeRelevamientoRepository.findAll();
        assertThat(ordenDeRelevamientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrdenDeRelevamientos() throws Exception {
        // Initialize the database
        ordenDeRelevamientoRepository.saveAndFlush(ordenDeRelevamiento);

        // Get all the ordenDeRelevamientoList
        restOrdenDeRelevamientoMockMvc.perform(get("/api/orden-de-relevamientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordenDeRelevamiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].comentario").value(hasItem(DEFAULT_COMENTARIO.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(DEFAULT_HORA.toString())));
    }
    
    @Test
    @Transactional
    public void getOrdenDeRelevamiento() throws Exception {
        // Initialize the database
        ordenDeRelevamientoRepository.saveAndFlush(ordenDeRelevamiento);

        // Get the ordenDeRelevamiento
        restOrdenDeRelevamientoMockMvc.perform(get("/api/orden-de-relevamientos/{id}", ordenDeRelevamiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordenDeRelevamiento.getId().intValue()))
            .andExpect(jsonPath("$.comentario").value(DEFAULT_COMENTARIO.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.hora").value(DEFAULT_HORA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdenDeRelevamiento() throws Exception {
        // Get the ordenDeRelevamiento
        restOrdenDeRelevamientoMockMvc.perform(get("/api/orden-de-relevamientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdenDeRelevamiento() throws Exception {
        // Initialize the database
        ordenDeRelevamientoRepository.saveAndFlush(ordenDeRelevamiento);

        int databaseSizeBeforeUpdate = ordenDeRelevamientoRepository.findAll().size();

        // Update the ordenDeRelevamiento
        OrdenDeRelevamiento updatedOrdenDeRelevamiento = ordenDeRelevamientoRepository.findById(ordenDeRelevamiento.getId()).get();
        // Disconnect from session so that the updates on updatedOrdenDeRelevamiento are not directly saved in db
        em.detach(updatedOrdenDeRelevamiento);
        updatedOrdenDeRelevamiento
            .comentario(UPDATED_COMENTARIO)
            .fecha(UPDATED_FECHA)
            .hora(UPDATED_HORA);

        restOrdenDeRelevamientoMockMvc.perform(put("/api/orden-de-relevamientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdenDeRelevamiento)))
            .andExpect(status().isOk());

        // Validate the OrdenDeRelevamiento in the database
        List<OrdenDeRelevamiento> ordenDeRelevamientoList = ordenDeRelevamientoRepository.findAll();
        assertThat(ordenDeRelevamientoList).hasSize(databaseSizeBeforeUpdate);
        OrdenDeRelevamiento testOrdenDeRelevamiento = ordenDeRelevamientoList.get(ordenDeRelevamientoList.size() - 1);
        assertThat(testOrdenDeRelevamiento.getComentario()).isEqualTo(UPDATED_COMENTARIO);
        assertThat(testOrdenDeRelevamiento.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testOrdenDeRelevamiento.getHora()).isEqualTo(UPDATED_HORA);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdenDeRelevamiento() throws Exception {
        int databaseSizeBeforeUpdate = ordenDeRelevamientoRepository.findAll().size();

        // Create the OrdenDeRelevamiento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrdenDeRelevamientoMockMvc.perform(put("/api/orden-de-relevamientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeRelevamiento)))
            .andExpect(status().isBadRequest());

        // Validate the OrdenDeRelevamiento in the database
        List<OrdenDeRelevamiento> ordenDeRelevamientoList = ordenDeRelevamientoRepository.findAll();
        assertThat(ordenDeRelevamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrdenDeRelevamiento() throws Exception {
        // Initialize the database
        ordenDeRelevamientoRepository.saveAndFlush(ordenDeRelevamiento);

        int databaseSizeBeforeDelete = ordenDeRelevamientoRepository.findAll().size();

        // Delete the ordenDeRelevamiento
        restOrdenDeRelevamientoMockMvc.perform(delete("/api/orden-de-relevamientos/{id}", ordenDeRelevamiento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrdenDeRelevamiento> ordenDeRelevamientoList = ordenDeRelevamientoRepository.findAll();
        assertThat(ordenDeRelevamientoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrdenDeRelevamiento.class);
        OrdenDeRelevamiento ordenDeRelevamiento1 = new OrdenDeRelevamiento();
        ordenDeRelevamiento1.setId(1L);
        OrdenDeRelevamiento ordenDeRelevamiento2 = new OrdenDeRelevamiento();
        ordenDeRelevamiento2.setId(ordenDeRelevamiento1.getId());
        assertThat(ordenDeRelevamiento1).isEqualTo(ordenDeRelevamiento2);
        ordenDeRelevamiento2.setId(2L);
        assertThat(ordenDeRelevamiento1).isNotEqualTo(ordenDeRelevamiento2);
        ordenDeRelevamiento1.setId(null);
        assertThat(ordenDeRelevamiento1).isNotEqualTo(ordenDeRelevamiento2);
    }
}
