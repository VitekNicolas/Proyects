package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.AnalysisResponseDto;
import com.example.demo.model.AnalyzeTextRequest;
import com.example.demo.services.AnalysisService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@SecurityRequirement(name = "ApiKeyAuth")
@RestController
@RequestMapping("/analyze")
@Tag(name = "Analysis controller", description = "Controller for text sentiment analysis via Groq AI")
public class AnalysisController {

    @Autowired
    AnalysisService analysisService;

    @PostMapping()
    @Operation(summary = "Analyze text", description = "Analyzes sentiment of a given text using Groq AI")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Text analyzed successfully"),
            @ApiResponse(responseCode = "400", description = "Missing or blank text field"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid API key"),
            @ApiResponse(responseCode = "502", description = "Groq AI service unreachable or returned an unparseable response")
    })
    public AnalysisResponseDto analyze(@Valid @RequestBody AnalyzeTextRequest request) {
        return analysisService.analyze(request.getText());
    }
}