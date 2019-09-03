package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.RolEmpleado;
import com.tesis.servifind.repository.RolEmpleadoRepository;
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
 * Integration tests for the {@link RolEmpleadoResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class RolEmpleadoResourceIT {

    @Autowired
    private RolEmpleadoRepository rolEmpleadoRepository;

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

    private MockMvc restRolEmpleadoMockMvc;

    private RolEmpleado rolEmpleado;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RolEmpleadoResource rolEmpleadoResource = new RolEmpleadoResource(rolEmpleadoRepository);
        this.restRolEmpleadoMockMvc = MockMvcBuilders.standaloneSetup(rolEmpleadoResource)
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
    public static RolEmpleado createEntity(EntityManager em) {
        RolEmpleado rolEmpleado = new RolEmpleado();
        return rolEmpleado;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RolEmpleado createUpdatedEntity(EntityManager em) {
        RolEmpleado rolEmpleado = new RolEmpleado();
        return rolEmpleado;
    }

    @BeforeEach
    public void initTest() {
        rolEmpleado = createEntity(em);
    }

    @Test
    @Transactional
    public void createRolEmpleado() throws Exception {
        int databaseSizeBeforeCreate = rolEmpleadoRepository.findAll().size();

        // Create the RolEmpleado
        restRolEmpleadoMockMvc.perform(post("/api/rol-empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolEmpleado)))
            .andExpect(status().isCreated());

        // Validate the RolEmpleado in the database
        List<RolEmpleado> rolEmpleadoList = rolEmpleadoRepository.findAll();
        assertThat(rolEmpleadoList).hasSize(databaseSizeBeforeCreate + 1);
        RolEmpleado testRolEmpleado = rolEmpleadoList.get(rolEmpleadoList.size() - 1);
    }

    @Test
    @Transactional
    public void createRolEmpleadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rolEmpleadoRepository.findAll().size();

        // Create the RolEmpleado with an existing ID
        rolEmpleado.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRolEmpleadoMockMvc.perform(post("/api/rol-empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolEmpleado)))
            .andExpect(status().isBadRequest());

        // Validate the RolEmpleado in the database
        List<RolEmpleado> rolEmpleadoList = rolEmpleadoRepository.findAll();
        assertThat(rolEmpleadoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRolEmpleados() throws Exception {
        // Initialize the database
        rolEmpleadoRepository.saveAndFlush(rolEmpleado);

        // Get all the rolEmpleadoList
        restRolEmpleadoMockMvc.perform(get("/api/rol-empleados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rolEmpleado.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getRolEmpleado() throws Exception {
        // Initialize the database
        rolEmpleadoRepository.saveAndFlush(rolEmpleado);

        // Get the rolEmpleado
        restRolEmpleadoMockMvc.perform(get("/api/rol-empleados/{id}", rolEmpleado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rolEmpleado.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRolEmpleado() throws Exception {
        // Get the rolEmpleado
        restRolEmpleadoMockMvc.perform(get("/api/rol-empleados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRolEmpleado() throws Exception {
        // Initialize the database
        rolEmpleadoRepository.saveAndFlush(rolEmpleado);

        int databaseSizeBeforeUpdate = rolEmpleadoRepository.findAll().size();

        // Update the rolEmpleado
        RolEmpleado updatedRolEmpleado = rolEmpleadoRepository.findById(rolEmpleado.getId()).get();
        // Disconnect from session so that the updates on updatedRolEmpleado are not directly saved in db
        em.detach(updatedRolEmpleado);

        restRolEmpleadoMockMvc.perform(put("/api/rol-empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRolEmpleado)))
            .andExpect(status().isOk());

        // Validate the RolEmpleado in the database
        List<RolEmpleado> rolEmpleadoList = rolEmpleadoRepository.findAll();
        assertThat(rolEmpleadoList).hasSize(databaseSizeBeforeUpdate);
        RolEmpleado testRolEmpleado = rolEmpleadoList.get(rolEmpleadoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRolEmpleado() throws Exception {
        int databaseSizeBeforeUpdate = rolEmpleadoRepository.findAll().size();

        // Create the RolEmpleado

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolEmpleadoMockMvc.perform(put("/api/rol-empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolEmpleado)))
            .andExpect(status().isBadRequest());

        // Validate the RolEmpleado in the database
        List<RolEmpleado> rolEmpleadoList = rolEmpleadoRepository.findAll();
        assertThat(rolEmpleadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRolEmpleado() throws Exception {
        // Initialize the database
        rolEmpleadoRepository.saveAndFlush(rolEmpleado);

        int databaseSizeBeforeDelete = rolEmpleadoRepository.findAll().size();

        // Delete the rolEmpleado
        restRolEmpleadoMockMvc.perform(delete("/api/rol-empleados/{id}", rolEmpleado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RolEmpleado> rolEmpleadoList = rolEmpleadoRepository.findAll();
        assertThat(rolEmpleadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RolEmpleado.class);
        RolEmpleado rolEmpleado1 = new RolEmpleado();
        rolEmpleado1.setId(1L);
        RolEmpleado rolEmpleado2 = new RolEmpleado();
        rolEmpleado2.setId(rolEmpleado1.getId());
        assertThat(rolEmpleado1).isEqualTo(rolEmpleado2);
        rolEmpleado2.setId(2L);
        assertThat(rolEmpleado1).isNotEqualTo(rolEmpleado2);
        rolEmpleado1.setId(null);
        assertThat(rolEmpleado1).isNotEqualTo(rolEmpleado2);
    }
}
