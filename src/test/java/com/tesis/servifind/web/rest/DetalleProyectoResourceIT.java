package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.DetalleProyecto;
import com.tesis.servifind.repository.DetalleProyectoRepository;
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
 * Integration tests for the {@link DetalleProyectoResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class DetalleProyectoResourceIT {

    @Autowired
    private DetalleProyectoRepository detalleProyectoRepository;

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

    private MockMvc restDetalleProyectoMockMvc;

    private DetalleProyecto detalleProyecto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DetalleProyectoResource detalleProyectoResource = new DetalleProyectoResource(detalleProyectoRepository);
        this.restDetalleProyectoMockMvc = MockMvcBuilders.standaloneSetup(detalleProyectoResource)
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
    public static DetalleProyecto createEntity(EntityManager em) {
        DetalleProyecto detalleProyecto = new DetalleProyecto();
        return detalleProyecto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleProyecto createUpdatedEntity(EntityManager em) {
        DetalleProyecto detalleProyecto = new DetalleProyecto();
        return detalleProyecto;
    }

    @BeforeEach
    public void initTest() {
        detalleProyecto = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetalleProyecto() throws Exception {
        int databaseSizeBeforeCreate = detalleProyectoRepository.findAll().size();

        // Create the DetalleProyecto
        restDetalleProyectoMockMvc.perform(post("/api/detalle-proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleProyecto)))
            .andExpect(status().isCreated());

        // Validate the DetalleProyecto in the database
        List<DetalleProyecto> detalleProyectoList = detalleProyectoRepository.findAll();
        assertThat(detalleProyectoList).hasSize(databaseSizeBeforeCreate + 1);
        DetalleProyecto testDetalleProyecto = detalleProyectoList.get(detalleProyectoList.size() - 1);
    }

    @Test
    @Transactional
    public void createDetalleProyectoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detalleProyectoRepository.findAll().size();

        // Create the DetalleProyecto with an existing ID
        detalleProyecto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetalleProyectoMockMvc.perform(post("/api/detalle-proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleProyecto)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleProyecto in the database
        List<DetalleProyecto> detalleProyectoList = detalleProyectoRepository.findAll();
        assertThat(detalleProyectoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDetalleProyectos() throws Exception {
        // Initialize the database
        detalleProyectoRepository.saveAndFlush(detalleProyecto);

        // Get all the detalleProyectoList
        restDetalleProyectoMockMvc.perform(get("/api/detalle-proyectos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalleProyecto.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getDetalleProyecto() throws Exception {
        // Initialize the database
        detalleProyectoRepository.saveAndFlush(detalleProyecto);

        // Get the detalleProyecto
        restDetalleProyectoMockMvc.perform(get("/api/detalle-proyectos/{id}", detalleProyecto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(detalleProyecto.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDetalleProyecto() throws Exception {
        // Get the detalleProyecto
        restDetalleProyectoMockMvc.perform(get("/api/detalle-proyectos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetalleProyecto() throws Exception {
        // Initialize the database
        detalleProyectoRepository.saveAndFlush(detalleProyecto);

        int databaseSizeBeforeUpdate = detalleProyectoRepository.findAll().size();

        // Update the detalleProyecto
        DetalleProyecto updatedDetalleProyecto = detalleProyectoRepository.findById(detalleProyecto.getId()).get();
        // Disconnect from session so that the updates on updatedDetalleProyecto are not directly saved in db
        em.detach(updatedDetalleProyecto);

        restDetalleProyectoMockMvc.perform(put("/api/detalle-proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetalleProyecto)))
            .andExpect(status().isOk());

        // Validate the DetalleProyecto in the database
        List<DetalleProyecto> detalleProyectoList = detalleProyectoRepository.findAll();
        assertThat(detalleProyectoList).hasSize(databaseSizeBeforeUpdate);
        DetalleProyecto testDetalleProyecto = detalleProyectoList.get(detalleProyectoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingDetalleProyecto() throws Exception {
        int databaseSizeBeforeUpdate = detalleProyectoRepository.findAll().size();

        // Create the DetalleProyecto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleProyectoMockMvc.perform(put("/api/detalle-proyectos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleProyecto)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleProyecto in the database
        List<DetalleProyecto> detalleProyectoList = detalleProyectoRepository.findAll();
        assertThat(detalleProyectoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDetalleProyecto() throws Exception {
        // Initialize the database
        detalleProyectoRepository.saveAndFlush(detalleProyecto);

        int databaseSizeBeforeDelete = detalleProyectoRepository.findAll().size();

        // Delete the detalleProyecto
        restDetalleProyectoMockMvc.perform(delete("/api/detalle-proyectos/{id}", detalleProyecto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetalleProyecto> detalleProyectoList = detalleProyectoRepository.findAll();
        assertThat(detalleProyectoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetalleProyecto.class);
        DetalleProyecto detalleProyecto1 = new DetalleProyecto();
        detalleProyecto1.setId(1L);
        DetalleProyecto detalleProyecto2 = new DetalleProyecto();
        detalleProyecto2.setId(detalleProyecto1.getId());
        assertThat(detalleProyecto1).isEqualTo(detalleProyecto2);
        detalleProyecto2.setId(2L);
        assertThat(detalleProyecto1).isNotEqualTo(detalleProyecto2);
        detalleProyecto1.setId(null);
        assertThat(detalleProyecto1).isNotEqualTo(detalleProyecto2);
    }
}
