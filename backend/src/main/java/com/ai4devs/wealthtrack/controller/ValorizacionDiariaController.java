package com.ai4devs.wealthtrack.controller;

import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ai4devs.wealthtrack.data.ValorizacionDiaria;
import com.ai4devs.wealthtrack.service.ValorizacionDiariaService;

@Slf4j
@RestController
@RequestMapping("/api/valorizacion-diaria")
public class ValorizacionDiariaController {

    private final ValorizacionDiariaService valorizacionDiariaService;

    public ValorizacionDiariaController(ValorizacionDiariaService valorizacionDiariaService) {
        this.valorizacionDiariaService = valorizacionDiariaService;
    }

    @CrossOrigin(origins = "${app.cors.allowed-origins}")
    @GetMapping("/{portfolioId}")
    public List<ValorizacionDiaria> getValorizacionDiariaByPortfolioId(@PathVariable Long portfolioId) {
        log.info("calling of valorizacion of portfolio {}", portfolioId);

        return valorizacionDiariaService.getValorizacionDiariaByPortfolioId(portfolioId);
                        //.stream().map(ResponseEntity::ok)
                //.orElse(ResponseEntity.notFound().build());

    }
}
