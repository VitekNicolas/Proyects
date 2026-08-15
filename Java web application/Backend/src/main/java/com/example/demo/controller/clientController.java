package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Client;
import com.example.demo.services.ClientService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@SecurityRequirement(name = "BearerAuth")
@RestController
@RequestMapping("/client")
@Tag(name = "Client controller", description = "Controller for manage clients")

public class ClientController {

    @Autowired
    ClientService clientService;

    @GetMapping(path = "/id/{id}")
    @Operation(summary = "Get a client", description = "Fetch a client using his id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client found"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "404", description = "Client not found")
    })
    public ResponseEntity<Client> getClient(@PathVariable int id) {
        Client client = clientService.getClient(id);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(client);
    }

    @GetMapping(path = "/userName/{userName}")
    @Operation(summary = "Get a client", description = "Fetch a client using his user name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client found"),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT"),
            @ApiResponse(responseCode = "404", description = "Client not found")
    })
    public ResponseEntity<Client> getClientByUserName(@PathVariable String userName) {
        Client client = this.clientService.getClientByUserName(userName);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(client);
    }

    @PostMapping()
    @Operation(summary = "Post a client", description = "Save a client using a request")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Client created"),
            @ApiResponse(responseCode = "400", description = "Validation failed (missing or invalid fields)")
    })
    public Client saveClient(@Valid @RequestBody @NonNull Client client) {
        return this.clientService.saveClient(client);
    }
}