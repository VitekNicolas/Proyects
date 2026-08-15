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
    public ResponseEntity<Client> getClient(@PathVariable int id) {
        Client client = clientService.getClient(id);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(client);
    }

    @GetMapping(path = "/userName/{userName}")
    @Operation(summary = "Get a client", description = "Fetch a client using his user name")
    public Client getClientByUserName(@PathVariable String userName) {
        return this.clientService.getClientByUserName(userName);
    }

    @PostMapping()
    @Operation(summary = "Post a client", description = "Save a client using a request")
    public Client saveClient(@Valid @RequestBody @NonNull Client client) {
        return this.clientService.saveClient(client);
    }
}