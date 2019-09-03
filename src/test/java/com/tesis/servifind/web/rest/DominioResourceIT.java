package com.tesis.servifind.web.rest;

import com.tesis.servifind.ServiFindApp;
import com.tesis.servifind.domain.Dominio;
import com.tesis.servifind.repository.DominioRepository;
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

import com.tesis.servifind.domain.enumeration.TipoDeDominio;
/**
 * Integration tests for the {@link DominioResource} REST controller.
 */
@SpringBootTest(classes = ServiFindApp.class)
public class DominioResourceIT {

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    private static final String DEFAULT_ETIQUETA = "AAAAAAAAAA";
    private static final String UPDATED_ETIQUETA = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final TipoDeDominio DEFAULT_TIPO_DE_DOMINIO = TipoDeDominio.PAIS;
    private static final TipoDeDominio UPDATED_TIPO_DE_DOMINIO = TipoDeDominio.PROVINCIA;

    @Autowired
    private DominioRepository dominioRepository;

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

    private MockMvc restDominioMockMvc;

    private Dominio dominio;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DominioResource dominioResource = new DominioResource(dominioRepository);
        this.restDominioMockMvc = MockMvcBuilders.standaloneSetup(dominioResource)
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
    public static Dominio createEntity(EntityManager em) {
        Dominio dominio = new Dominio()
            .valor(DEFAULT_VALOR)
            .etiqueta(DEFAULT_ETIQUETA)
            .descripcion(DEFAULT_DESCRIPCION)
            .tipoDeDominio(DEFAULT_TIPO_DE_DOMINIO);
        return dominio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dominio createUpdatedEntity(EntityManager em) {
        Dominio dominio = new Dominio()
            .valor(UPDATED_VALOR)
            .etiqueta(UPDATED_ETIQUETA)
            .descripcion(UPDATED_DESCRIPCION)
            .tipoDeDominio(UPDATED_TIPO_DE_DOMINIO);
        return dominio;
    }

    @BeforeEach
    public void initTest() {
        dominio = createEntity(em);
    }

    @Test
    @Transactional
    public void createDominio() throws Exception {
        int databaseSizeBeforeCreate = dominioRepository.findAll().size();

        // Create the Dominio
        restDominioMockMvc.perform(post("/api/dominios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dominio)))
            .andExpect(status().isCreated());

        // Validate the Dominio in the database
        List<Dominio> dominioList = dominioRepository.findAll();
        assertThat(dominioList).hasSize(databaseSizeBeforeCreate + 1);
        Dominio testDominio = dominioList.get(dominioList.size() - 1);
        assertThat(testDominio.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testDominio.getEtiqueta()).isEqualTo(DEFAULT_ETIQUETA);
        assertThat(testDominio.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testDominio.getTipoDeDominio()).isEqualTo(DEFAULT_TIPO_DE_DOMINIO);
    }

    @Test
    @Transactional
    public void createDominioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dominioRepository.findAll().size();

        // Create the Dominio with an existing ID
        dominio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDominioMockMvc.perform(post("/api/dominios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dominio)))
            .andExpect(status().isBadRequest());

        // Validate the Dominio in the database
        List<Dominio> dominioList = dominioRepository.findAll();
        assertThat(dominioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = dominioRepository.findAll().size();
        // set the field null
        dominio.setValor(null);

        // Create the Dominio, which fails.

        restDominioMockMvc.perform(post("/api/dominios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dominio)))
            .andExpect(status().isBadRequest());

        List<Dominio> dominioList = dominioRepository.findAll();
        assertThat(dominioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEtiquetaIsRequired() throws Exception {
        int databaseSizeBeforeTest = dominioRepository.findAll().size();
        // set the field null
        dominio.setEtiqueta(null);

        // Create the Dominio, which fails.

        restDominioMockMvc.perform(post("/api/dominios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dominio)))
            .andExpect(status().isBadRequest());

        List<Dominio> dominioList = dominioRepository.findAll();
        assertThat(dominioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = dominioRepository.findAll().size();
        // set the field null
        dominio.setDescripcion(null);

        // Create the Dominio, which fails.

        restDominioMockMvc.perform(post("/api/dominios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dominio)))
            .andExpect(status().isBadRequest());

        List<Dominio> dominioList = dominioRepository.findAll();
        assertThat(dominioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTipoDeDominioIsRequired() throws Exception {
        int databaseSizeBeforeTest = dominioRepository.findAll().size();
        // set the field null
        dominio.setTipoDeDominio(null);

        // Create the Dominio, which fails.

        restDominioMockMvc.perform(post("/api/dominios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dominio)))
            .andExpect(status().isBadRequest());

        List<Dominio> dominioList = dominioRepository.findAll();
        assertThat(dominioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDominios() throws Exception {
        // Initialize the database
        dominioRepository.saveAndFlush(dominio);

        // Get all the dominioList
        restDominioMockMvc.perform(get("/api/dominios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dominio.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.toString())))
            .andExpect(jsonPath("$.[*].etiqueta").value(hasItem(DEFAULT_ETIQUETA.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].tipoDeDominio").value(hasItem(DEFAULT_TIPO_DE_DOMINIO.toString())));
    }
    
    @Test
    @Transactional
    public void getDominio() throws Exception {
        // Initialize the database
        dominioRepository.saveAndFlush(dominio);

        // Get the dominio
        restDominioMockMvc.perform(get("/api/dominios/{id}", dominio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dominio.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.toString()))
            .andExpect(jsonPath("$.etiqueta").value(DEFAULT_ETIQUETA.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.tipoDeDominio").value(DEFAULT_TIPO_DE_DOMINIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDominio() throws Exception {
        // Get the dominio
        restDominioMockMvc.perform(get("/api/dominios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDominio() throws Exception {
        // Initialize the database
        dominioRepository.saveAndFlush(dominio);

        int databaseSizeBeforeUpdate = dominioRepository.findAll().size();

        // Update the dominio
        Dominio updatedDominio = dominioRepository.findById(dominio.getId()).get();
        // Disconnect from session so that the updates on updatedDominio are not directly saved in db
        em.detach(updatedDominio);
        updatedDominio
            .valor(UPDATED_VALOR)
            .etiqueta(UPDATED_ETIQUETA)
            .descripcion(UPDATED_DESCRIPCION)
            .tipoDeDominio(UPDATED_TIPO_DE_DOMINIO);

        restDominioMockMvc.perform(put("/api/dominios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDominio)))
            .andExpect(status().isOk());

        // Validate the Dominio in the database
        List<Dominio> dominioList = dominioRepository.findAll();
        assertThat(dominioList).hasSize(databaseSizeBeforeUpdate);
        Dominio testDominio = dominioList.get(dominioList.size() - 1);
        assertThat(testDominio.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testDominio.getEtiqueta()).isEqualTo(UPDATED_ETIQUETA);
        assertThat(testDominio.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testDominio.getTipoDeDominio()).isEqualTo(UPDATED_TIPO_DE_DOMINIO);
    }

    @Test
    @Transactional
    public void updateNonExistingDominio() throws Exception {
        int databaseSizeBeforeUpdate = dominioRepository.findAll().size();

        // Create the Dominio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDominioMockMvc.perform(put("/api/dominios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dominio)))
            .andExpect(status().isBadRequest());

        // Validate the Dominio in the database
        List<Dominio> dominioList = dominioRepository.findAll();
        assertThat(dominioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDominio() throws Exception {
        // Initialize the database
        dominioRepository.saveAndFlush(dominio);

        int databaseSizeBeforeDelete = dominioRepository.findAll().size();

        // Delete the dominio
        restDominioMockMvc.perform(delete("/api/dominios/{id}", dominio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Dominio> dominioList = dominioRepository.findAll();
        assertThat(dominioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dominio.class);
        Dominio dominio1 = new Dominio();
        dominio1.setId(1L);
        Dominio dominio2 = new Dominio();
        dominio2.setId(dominio1.getId());
        assertThat(dominio1).isEqualTo(dominio2);
        dominio2.setId(2L);
        assertThat(dominio1).isNotEqualTo(dominio2);
        dominio1.setId(null);
        assertThat(dominio1).isNotEqualTo(dominio2);
    }
}
