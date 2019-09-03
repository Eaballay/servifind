package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.Asociado;
import com.tesis.servifind.repository.AsociadoRepository;
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
 * Integration tests for the {@link AsociadoResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class AsociadoResourceIT {

    private static final Long DEFAULT_NRO_DE_ASOCIADO = 1L;
    private static final Long UPDATED_NRO_DE_ASOCIADO = 2L;
    private static final Long SMALLER_NRO_DE_ASOCIADO = 1L - 1L;

    @Autowired
    private AsociadoRepository asociadoRepository;

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

    private MockMvc restAsociadoMockMvc;

    private Asociado asociado;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AsociadoResource asociadoResource = new AsociadoResource(asociadoRepository);
        this.restAsociadoMockMvc = MockMvcBuilders.standaloneSetup(asociadoResource)
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
    public static Asociado createEntity(EntityManager em) {
        Asociado asociado = new Asociado()
            .nroDeAsociado(DEFAULT_NRO_DE_ASOCIADO);
        return asociado;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Asociado createUpdatedEntity(EntityManager em) {
        Asociado asociado = new Asociado()
            .nroDeAsociado(UPDATED_NRO_DE_ASOCIADO);
        return asociado;
    }

    @BeforeEach
    public void initTest() {
        asociado = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsociado() throws Exception {
        int databaseSizeBeforeCreate = asociadoRepository.findAll().size();

        // Create the Asociado
        restAsociadoMockMvc.perform(post("/api/asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociado)))
            .andExpect(status().isCreated());

        // Validate the Asociado in the database
        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeCreate + 1);
        Asociado testAsociado = asociadoList.get(asociadoList.size() - 1);
        assertThat(testAsociado.getNroDeAsociado()).isEqualTo(DEFAULT_NRO_DE_ASOCIADO);
    }

    @Test
    @Transactional
    public void createAsociadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asociadoRepository.findAll().size();

        // Create the Asociado with an existing ID
        asociado.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsociadoMockMvc.perform(post("/api/asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociado)))
            .andExpect(status().isBadRequest());

        // Validate the Asociado in the database
        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNroDeAsociadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = asociadoRepository.findAll().size();
        // set the field null
        asociado.setNroDeAsociado(null);

        // Create the Asociado, which fails.

        restAsociadoMockMvc.perform(post("/api/asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociado)))
            .andExpect(status().isBadRequest());

        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAsociados() throws Exception {
        // Initialize the database
        asociadoRepository.saveAndFlush(asociado);

        // Get all the asociadoList
        restAsociadoMockMvc.perform(get("/api/asociados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asociado.getId().intValue())))
            .andExpect(jsonPath("$.[*].nroDeAsociado").value(hasItem(DEFAULT_NRO_DE_ASOCIADO.intValue())));
    }
    
    @Test
    @Transactional
    public void getAsociado() throws Exception {
        // Initialize the database
        asociadoRepository.saveAndFlush(asociado);

        // Get the asociado
        restAsociadoMockMvc.perform(get("/api/asociados/{id}", asociado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(asociado.getId().intValue()))
            .andExpect(jsonPath("$.nroDeAsociado").value(DEFAULT_NRO_DE_ASOCIADO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAsociado() throws Exception {
        // Get the asociado
        restAsociadoMockMvc.perform(get("/api/asociados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsociado() throws Exception {
        // Initialize the database
        asociadoRepository.saveAndFlush(asociado);

        int databaseSizeBeforeUpdate = asociadoRepository.findAll().size();

        // Update the asociado
        Asociado updatedAsociado = asociadoRepository.findById(asociado.getId()).get();
        // Disconnect from session so that the updates on updatedAsociado are not directly saved in db
        em.detach(updatedAsociado);
        updatedAsociado
            .nroDeAsociado(UPDATED_NRO_DE_ASOCIADO);

        restAsociadoMockMvc.perform(put("/api/asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsociado)))
            .andExpect(status().isOk());

        // Validate the Asociado in the database
        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeUpdate);
        Asociado testAsociado = asociadoList.get(asociadoList.size() - 1);
        assertThat(testAsociado.getNroDeAsociado()).isEqualTo(UPDATED_NRO_DE_ASOCIADO);
    }

    @Test
    @Transactional
    public void updateNonExistingAsociado() throws Exception {
        int databaseSizeBeforeUpdate = asociadoRepository.findAll().size();

        // Create the Asociado

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsociadoMockMvc.perform(put("/api/asociados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociado)))
            .andExpect(status().isBadRequest());

        // Validate the Asociado in the database
        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAsociado() throws Exception {
        // Initialize the database
        asociadoRepository.saveAndFlush(asociado);

        int databaseSizeBeforeDelete = asociadoRepository.findAll().size();

        // Delete the asociado
        restAsociadoMockMvc.perform(delete("/api/asociados/{id}", asociado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Asociado.class);
        Asociado asociado1 = new Asociado();
        asociado1.setId(1L);
        Asociado asociado2 = new Asociado();
        asociado2.setId(asociado1.getId());
        assertThat(asociado1).isEqualTo(asociado2);
        asociado2.setId(2L);
        assertThat(asociado1).isNotEqualTo(asociado2);
        asociado1.setId(null);
        assertThat(asociado1).isNotEqualTo(asociado2);
    }
}
