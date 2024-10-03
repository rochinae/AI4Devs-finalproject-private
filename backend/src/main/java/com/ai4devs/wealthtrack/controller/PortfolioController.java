package com.ai4devs.wealthtrack.controller;

import com.ai4devs.wealthtrack.response.PortfolioResponse;
import com.ai4devs.wealthtrack.service.PortfolioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Optional;

@RestController
@RequestMapping("/api/portfolio")
@Slf4j
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping
    public ResponseEntity<PortfolioResponse> getPortfolio(@AuthenticationPrincipal Jwt principal) {
        Long userId = Long.valueOf(1L); // principal.getSubject());
        // TODO change so we can retrieve different users
        // Use userId to fetch the user's portfolio
        log.info("calling of portfolio retrieval");

        Optional<PortfolioResponse> portfolioAndActivesById = portfolioService.getPortfolioAndActivesById(userId);

        log.info("result of portfolio retrieval by id {}: {}", userId,
                portfolioAndActivesById.map(PortfolioResponse::toString));

        return portfolioAndActivesById
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private Long obtenerUsuarioId() {
        // Implementa la lógica para obtener el ID del usuario autenticado
        // Por ejemplo, mapeando el nombre de usuario a un ID
        return 1L; // Placeholder
    }
}
