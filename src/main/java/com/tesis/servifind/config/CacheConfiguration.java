package com.tesis.servifind.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.tesis.servifind.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.tesis.servifind.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.tesis.servifind.domain.User.class.getName());
            createCache(cm, com.tesis.servifind.domain.Authority.class.getName());
            createCache(cm, com.tesis.servifind.domain.User.class.getName() + ".authorities");
            createCache(cm, com.tesis.servifind.domain.Dominio.class.getName());
            createCache(cm, com.tesis.servifind.domain.Persona.class.getName());
            createCache(cm, com.tesis.servifind.domain.Empleado.class.getName());
            createCache(cm, com.tesis.servifind.domain.RolEmpleado.class.getName());
            createCache(cm, com.tesis.servifind.domain.RolEmpleado.class.getName() + ".empleados");
            createCache(cm, com.tesis.servifind.domain.RolEmpleado.class.getName() + ".rols");
            createCache(cm, com.tesis.servifind.domain.Asociado.class.getName());
            createCache(cm, com.tesis.servifind.domain.AsociadoTarea.class.getName());
            createCache(cm, com.tesis.servifind.domain.AsociadoTarea.class.getName() + ".asociados");
            createCache(cm, com.tesis.servifind.domain.AsociadoTarea.class.getName() + ".tareas");
            createCache(cm, com.tesis.servifind.domain.Cliente.class.getName());
            createCache(cm, com.tesis.servifind.domain.Presupuesto.class.getName());
            createCache(cm, com.tesis.servifind.domain.Presupuesto.class.getName() + ".empleados");
            createCache(cm, com.tesis.servifind.domain.DetalleDePresupuesto.class.getName());
            createCache(cm, com.tesis.servifind.domain.Proyecto.class.getName());
            createCache(cm, com.tesis.servifind.domain.Proyecto.class.getName() + ".clientes");
            createCache(cm, com.tesis.servifind.domain.Proyecto.class.getName() + ".estados");
            createCache(cm, com.tesis.servifind.domain.OrdenDeTrabajo.class.getName());
            createCache(cm, com.tesis.servifind.domain.OrdenDeTrabajo.class.getName() + ".estados");
            createCache(cm, com.tesis.servifind.domain.OrdenDeTrabajoTarea.class.getName());
            createCache(cm, com.tesis.servifind.domain.Tarea.class.getName());
            createCache(cm, com.tesis.servifind.domain.OrdenDeCompra.class.getName());
            createCache(cm, com.tesis.servifind.domain.DetalleDeOrdenDeCompra.class.getName());
            createCache(cm, com.tesis.servifind.domain.OrdenDeRelevamiento.class.getName());
            createCache(cm, com.tesis.servifind.domain.EvaluacionDeProyecto.class.getName());
            createCache(cm, com.tesis.servifind.domain.DetalleProyecto.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
