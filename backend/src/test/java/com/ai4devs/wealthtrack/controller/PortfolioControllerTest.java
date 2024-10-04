package com.ai4devs.wealthtrack.controller;

//import com.ai4devs.wealthtrack.data.Portfolio;
//import com.ai4devs.wealthtrack.repository.ValorizacionDiariaRepository;
//import com.ai4devs.wealthtrack.service.PortfolioService;
//import com.ai4devs.wealthtrack.service.ActivoService;
//import com.ai4devs.wealthtrack.repository.ActivoRepository;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.Import;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.security.oauth2.jwt.JwtDecoder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//@WebMvcTest(PortfolioController.class)
//@Import({PortfolioService.class, ActivoService.class, PortfolioControllerTest.TestSecurityConfig.class})
public class PortfolioControllerTest {
//
//    @MockBean
//    private JwtDecoder jwtDecoder;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private PortfolioService portfolioService;
//
//    @MockBean
//    private ActivoRepository activoRepository;
//    @MockBean
//    private ValorizacionDiariaRepository valorizacionDiariaRepository;
//
//    @Configuration
//    static class TestSecurityConfig extends WebSecurityConfigurerAdapter {
//        @Override
//        protected void configure(HttpSecurity http) throws Exception {
//            http.csrf().disable()
//                .authorizeRequests(authorize -> authorize.anyRequest().permitAll())
//                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
//        }
//
//        @Bean
//        public JwtDecoder jwtDecoder() {
//            return token -> {
//                // This is a dummy implementation
//                return null;
//            };
//        }
//    }
//
//    @Test
//    void testGetPortfolio() throws Exception {
//        Portfolio portfolio = new Portfolio();
//        portfolio.setId(1L);
//        portfolio.setNombre("Mi Portfolio");
//
//        Mockito.when(portfolioService.getPortfolioById(anyLong()))
//                .thenReturn(Optional.of(portfolio));
//
//
//        mockMvc.perform(get("/portfolio")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.nombre").value("Mi Portfolio"));
//
//        Mockito.verify(portfolioService, Mockito.times(1)).getPortfolioById(anyLong());
//    }
}
