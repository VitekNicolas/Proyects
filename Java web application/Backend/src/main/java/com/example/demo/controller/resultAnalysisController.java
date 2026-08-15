package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.ResultAnalysis;
import com.example.demo.services.ResultAnalysisService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@SecurityRequirement(name = "BearerAuth")
@RestController
@RequestMapping("/result")
@Tag(name = "Result analysis controller", description = "Controller for manage result analysis")

public class ResultAnalysisController {
    
    @Autowired
    ResultAnalysisService resultAnalysisService;

    @PostMapping(path = "/{userName}")
    @Operation(summary = "Post a result analysis", description = "Save a result analysis using a request and a client user name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Result saved"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "404", description = "Client with the given user name not found")
    })
    public ResultAnalysis saveResult(@PathVariable("userName") String userName, @RequestBody ResultAnalysis result) {
        return this.resultAnalysisService.saveResult(userName, result);
    }
}