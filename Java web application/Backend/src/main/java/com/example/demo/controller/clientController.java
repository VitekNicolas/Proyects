package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Client;
import com.example.demo.services.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/client")
@Tag(name = "Client controller", description = "Controller for manage clients")
public class ClientController {

    @Autowired
    ClientService clientService;

    @GetMapping(path = "/id/{id}")
    @Operation(summary = "Get a client", description = "Fetch a client using his id")
    public Client getClient(@PathVariable int id) {
        return this.clientService.getClient(id);
    }

    @GetMapping(path = "/userName/{userName}")
    @Operation(summary = "Get a client", description = "Fetch a client using his user name")
    public Client getClientByUserName(@PathVariable String userName) {
        return this.clientService.getClientByUserName(userName);
    }

    @PostMapping()
    @Operation(summary = "Post a client", description = "Save a client using a request")
    public Client saveClient(@RequestBody Client client) {
        return this.clientService.saveClient(client);
    }
}