package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.OrdenDeTrabajoTarea;
import com.tesis.servifind.repository.OrdenDeTrabajoTareaRepository;
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
 * Integration tests for the {@link OrdenDeTrabajoTareaResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class OrdenDeTrabajoTareaResourceIT {

    private static final Long DEFAULT_CANTIDAD = 1L;
    private static final Long UPDATED_CANTIDAD = 2L;
    private static final Long SMALLER_CANTIDAD = 1L - 1L;

    private static final String DEFAULT_PRECIO_POR_UNIDAD = "AAAAAAAAAA";
    private static final String UPDATED_PRECIO_POR_UNIDAD = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private OrdenDeTrabajoTareaRepository ordenDeTrabajoTareaRepository;

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

    private MockMvc restOrdenDeTrabajoTareaMockMvc;

    private OrdenDeTrabajoTarea ordenDeTrabajoTarea;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdenDeTrabajoTareaResource ordenDeTrabajoTareaResource = new OrdenDeTrabajoTareaResource(ordenDeTrabajoTareaRepository);
        this.restOrdenDeTrabajoTareaMockMvc = MockMvcBuilders.standaloneSetup(ordenDeTrabajoTareaResource)
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
    public static OrdenDeTrabajoTarea createEntity(EntityManager em) {
        OrdenDeTrabajoTarea ordenDeTrabajoTarea = new OrdenDeTrabajoTarea()
            .cantidad(DEFAULT_CANTIDAD)
            .precioPorUnidad(DEFAULT_PRECIO_POR_UNIDAD)
            .descripcion(DEFAULT_DESCRIPCION);
        return ordenDeTrabajoTarea;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrdenDeTrabajoTarea createUpdatedEntity(EntityManager em) {
        OrdenDeTrabajoTarea ordenDeTrabajoTarea = new OrdenDeTrabajoTarea()
            .cantidad(UPDATED_CANTIDAD)
            .precioPorUnidad(UPDATED_PRECIO_POR_UNIDAD)
            .descripcion(UPDATED_DESCRIPCION);
        return ordenDeTrabajoTarea;
    }

    @BeforeEach
    public void initTest() {
        ordenDeTrabajoTarea = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdenDeTrabajoTarea() throws Exception {
        int databaseSizeBeforeCreate = ordenDeTrabajoTareaRepository.findAll().size();

        // Create the OrdenDeTrabajoTarea
        restOrdenDeTrabajoTareaMockMvc.perform(post("/api/orden-de-trabajo-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeTrabajoTarea)))
            .andExpect(status().isCreated());

        // Validate the OrdenDeTrabajoTarea in the database
        List<OrdenDeTrabajoTarea> ordenDeTrabajoTareaList = ordenDeTrabajoTareaRepository.findAll();
        assertThat(ordenDeTrabajoTareaList).hasSize(databaseSizeBeforeCreate + 1);
        OrdenDeTrabajoTarea testOrdenDeTrabajoTarea = ordenDeTrabajoTareaList.get(ordenDeTrabajoTareaList.size() - 1);
        assertThat(testOrdenDeTrabajoTarea.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testOrdenDeTrabajoTarea.getPrecioPorUnidad()).isEqualTo(DEFAULT_PRECIO_POR_UNIDAD);
        assertThat(testOrdenDeTrabajoTarea.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createOrdenDeTrabajoTareaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordenDeTrabajoTareaRepository.findAll().size();

        // Create the OrdenDeTrabajoTarea with an existing ID
        ordenDeTrabajoTarea.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdenDeTrabajoTareaMockMvc.perform(post("/api/orden-de-trabajo-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeTrabajoTarea)))
            .andExpect(status().isBadRequest());

        // Validate the OrdenDeTrabajoTarea in the database
        List<OrdenDeTrabajoTarea> ordenDeTrabajoTareaList = ordenDeTrabajoTareaRepository.findAll();
        assertThat(ordenDeTrabajoTareaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOrdenDeTrabajoTareas() throws Exception {
        // Initialize the database
        ordenDeTrabajoTareaRepository.saveAndFlush(ordenDeTrabajoTarea);

        // Get all the ordenDeTrabajoTareaList
        restOrdenDeTrabajoTareaMockMvc.perform(get("/api/orden-de-trabajo-tareas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordenDeTrabajoTarea.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())))
            .andExpect(jsonPath("$.[*].precioPorUnidad").value(hasItem(DEFAULT_PRECIO_POR_UNIDAD.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getOrdenDeTrabajoTarea() throws Exception {
        // Initialize the database
        ordenDeTrabajoTareaRepository.saveAndFlush(ordenDeTrabajoTarea);

        // Get the ordenDeTrabajoTarea
        restOrdenDeTrabajoTareaMockMvc.perform(get("/api/orden-de-trabajo-tareas/{id}", ordenDeTrabajoTarea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordenDeTrabajoTarea.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()))
            .andExpect(jsonPath("$.precioPorUnidad").value(DEFAULT_PRECIO_POR_UNIDAD.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdenDeTrabajoTarea() throws Exception {
        // Get the ordenDeTrabajoTarea
        restOrdenDeTrabajoTareaMockMvc.perform(get("/api/orden-de-trabajo-tareas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdenDeTrabajoTarea() throws Exception {
        // Initialize the database
        ordenDeTrabajoTareaRepository.saveAndFlush(ordenDeTrabajoTarea);

        int databaseSizeBeforeUpdate = ordenDeTrabajoTareaRepository.findAll().size();

        // Update the ordenDeTrabajoTarea
        OrdenDeTrabajoTarea updatedOrdenDeTrabajoTarea = ordenDeTrabajoTareaRepository.findById(ordenDeTrabajoTarea.getId()).get();
        // Disconnect from session so that the updates on updatedOrdenDeTrabajoTarea are not directly saved in db
        em.detach(updatedOrdenDeTrabajoTarea);
        updatedOrdenDeTrabajoTarea
            .cantidad(UPDATED_CANTIDAD)
            .precioPorUnidad(UPDATED_PRECIO_POR_UNIDAD)
            .descripcion(UPDATED_DESCRIPCION);

        restOrdenDeTrabajoTareaMockMvc.perform(put("/api/orden-de-trabajo-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdenDeTrabajoTarea)))
            .andExpect(status().isOk());

        // Validate the OrdenDeTrabajoTarea in the database
        List<OrdenDeTrabajoTarea> ordenDeTrabajoTareaList = ordenDeTrabajoTareaRepository.findAll();
        assertThat(ordenDeTrabajoTareaList).hasSize(databaseSizeBeforeUpdate);
        OrdenDeTrabajoTarea testOrdenDeTrabajoTarea = ordenDeTrabajoTareaList.get(ordenDeTrabajoTareaList.size() - 1);
        assertThat(testOrdenDeTrabajoTarea.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testOrdenDeTrabajoTarea.getPrecioPorUnidad()).isEqualTo(UPDATED_PRECIO_POR_UNIDAD);
        assertThat(testOrdenDeTrabajoTarea.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdenDeTrabajoTarea() throws Exception {
        int databaseSizeBeforeUpdate = ordenDeTrabajoTareaRepository.findAll().size();

        // Create the OrdenDeTrabajoTarea

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrdenDeTrabajoTareaMockMvc.perform(put("/api/orden-de-trabajo-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordenDeTrabajoTarea)))
            .andExpect(status().isBadRequest());

        // Validate the OrdenDeTrabajoTarea in the database
        List<OrdenDeTrabajoTarea> ordenDeTrabajoTareaList = ordenDeTrabajoTareaRepository.findAll();
        assertThat(ordenDeTrabajoTareaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrdenDeTrabajoTarea() throws Exception {
        // Initialize the database
        ordenDeTrabajoTareaRepository.saveAndFlush(ordenDeTrabajoTarea);

        int databaseSizeBeforeDelete = ordenDeTrabajoTareaRepository.findAll().size();

        // Delete the ordenDeTrabajoTarea
        restOrdenDeTrabajoTareaMockMvc.perform(delete("/api/orden-de-trabajo-tareas/{id}", ordenDeTrabajoTarea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrdenDeTrabajoTarea> ordenDeTrabajoTareaList = ordenDeTrabajoTareaRepository.findAll();
        assertThat(ordenDeTrabajoTareaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrdenDeTrabajoTarea.class);
        OrdenDeTrabajoTarea ordenDeTrabajoTarea1 = new OrdenDeTrabajoTarea();
        ordenDeTrabajoTarea1.setId(1L);
        OrdenDeTrabajoTarea ordenDeTrabajoTarea2 = new OrdenDeTrabajoTarea();
        ordenDeTrabajoTarea2.setId(ordenDeTrabajoTarea1.getId());
        assertThat(ordenDeTrabajoTarea1).isEqualTo(ordenDeTrabajoTarea2);
        ordenDeTrabajoTarea2.setId(2L);
        assertThat(ordenDeTrabajoTarea1).isNotEqualTo(ordenDeTrabajoTarea2);
        ordenDeTrabajoTarea1.setId(null);
        assertThat(ordenDeTrabajoTarea1).isNotEqualTo(ordenDeTrabajoTarea2);
    }
}
