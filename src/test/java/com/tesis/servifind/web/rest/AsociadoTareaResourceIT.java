package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.AsociadoTarea;
import com.tesis.servifind.repository.AsociadoTareaRepository;
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
 * Integration tests for the {@link AsociadoTareaResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class AsociadoTareaResourceIT {

    @Autowired
    private AsociadoTareaRepository asociadoTareaRepository;

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

    private MockMvc restAsociadoTareaMockMvc;

    private AsociadoTarea asociadoTarea;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AsociadoTareaResource asociadoTareaResource = new AsociadoTareaResource(asociadoTareaRepository);
        this.restAsociadoTareaMockMvc = MockMvcBuilders.standaloneSetup(asociadoTareaResource)
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
    public static AsociadoTarea createEntity(EntityManager em) {
        AsociadoTarea asociadoTarea = new AsociadoTarea();
        return asociadoTarea;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AsociadoTarea createUpdatedEntity(EntityManager em) {
        AsociadoTarea asociadoTarea = new AsociadoTarea();
        return asociadoTarea;
    }

    @BeforeEach
    public void initTest() {
        asociadoTarea = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsociadoTarea() throws Exception {
        int databaseSizeBeforeCreate = asociadoTareaRepository.findAll().size();

        // Create the AsociadoTarea
        restAsociadoTareaMockMvc.perform(post("/api/asociado-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociadoTarea)))
            .andExpect(status().isCreated());

        // Validate the AsociadoTarea in the database
        List<AsociadoTarea> asociadoTareaList = asociadoTareaRepository.findAll();
        assertThat(asociadoTareaList).hasSize(databaseSizeBeforeCreate + 1);
        AsociadoTarea testAsociadoTarea = asociadoTareaList.get(asociadoTareaList.size() - 1);
    }

    @Test
    @Transactional
    public void createAsociadoTareaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asociadoTareaRepository.findAll().size();

        // Create the AsociadoTarea with an existing ID
        asociadoTarea.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsociadoTareaMockMvc.perform(post("/api/asociado-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociadoTarea)))
            .andExpect(status().isBadRequest());

        // Validate the AsociadoTarea in the database
        List<AsociadoTarea> asociadoTareaList = asociadoTareaRepository.findAll();
        assertThat(asociadoTareaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAsociadoTareas() throws Exception {
        // Initialize the database
        asociadoTareaRepository.saveAndFlush(asociadoTarea);

        // Get all the asociadoTareaList
        restAsociadoTareaMockMvc.perform(get("/api/asociado-tareas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asociadoTarea.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAsociadoTarea() throws Exception {
        // Initialize the database
        asociadoTareaRepository.saveAndFlush(asociadoTarea);

        // Get the asociadoTarea
        restAsociadoTareaMockMvc.perform(get("/api/asociado-tareas/{id}", asociadoTarea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(asociadoTarea.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAsociadoTarea() throws Exception {
        // Get the asociadoTarea
        restAsociadoTareaMockMvc.perform(get("/api/asociado-tareas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsociadoTarea() throws Exception {
        // Initialize the database
        asociadoTareaRepository.saveAndFlush(asociadoTarea);

        int databaseSizeBeforeUpdate = asociadoTareaRepository.findAll().size();

        // Update the asociadoTarea
        AsociadoTarea updatedAsociadoTarea = asociadoTareaRepository.findById(asociadoTarea.getId()).get();
        // Disconnect from session so that the updates on updatedAsociadoTarea are not directly saved in db
        em.detach(updatedAsociadoTarea);

        restAsociadoTareaMockMvc.perform(put("/api/asociado-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsociadoTarea)))
            .andExpect(status().isOk());

        // Validate the AsociadoTarea in the database
        List<AsociadoTarea> asociadoTareaList = asociadoTareaRepository.findAll();
        assertThat(asociadoTareaList).hasSize(databaseSizeBeforeUpdate);
        AsociadoTarea testAsociadoTarea = asociadoTareaList.get(asociadoTareaList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAsociadoTarea() throws Exception {
        int databaseSizeBeforeUpdate = asociadoTareaRepository.findAll().size();

        // Create the AsociadoTarea

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsociadoTareaMockMvc.perform(put("/api/asociado-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asociadoTarea)))
            .andExpect(status().isBadRequest());

        // Validate the AsociadoTarea in the database
        List<AsociadoTarea> asociadoTareaList = asociadoTareaRepository.findAll();
        assertThat(asociadoTareaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAsociadoTarea() throws Exception {
        // Initialize the database
        asociadoTareaRepository.saveAndFlush(asociadoTarea);

        int databaseSizeBeforeDelete = asociadoTareaRepository.findAll().size();

        // Delete the asociadoTarea
        restAsociadoTareaMockMvc.perform(delete("/api/asociado-tareas/{id}", asociadoTarea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AsociadoTarea> asociadoTareaList = asociadoTareaRepository.findAll();
        assertThat(asociadoTareaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AsociadoTarea.class);
        AsociadoTarea asociadoTarea1 = new AsociadoTarea();
        asociadoTarea1.setId(1L);
        AsociadoTarea asociadoTarea2 = new AsociadoTarea();
        asociadoTarea2.setId(asociadoTarea1.getId());
        assertThat(asociadoTarea1).isEqualTo(asociadoTarea2);
        asociadoTarea2.setId(2L);
        assertThat(asociadoTarea1).isNotEqualTo(asociadoTarea2);
        asociadoTarea1.setId(null);
        assertThat(asociadoTarea1).isNotEqualTo(asociadoTarea2);
    }
}
