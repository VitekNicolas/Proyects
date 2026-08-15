package com.example.demo.services;

import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.Client;
import com.example.demo.repositories.IClientRepositoy;

@Service
public class ClientService {
    private final IClientRepositoy clientRepository;
    private final PasswordEncoder passwordEncoder;

    public ClientService(IClientRepositoy clientRepository, PasswordEncoder passwordEncoder) {
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Client getClient(int id) {
        Client client = this.clientRepository.findById(id).orElse(null);
        if (client == null) {
            throw new ResourceNotFoundException("Client with id " + id + " not found");
        }
        return client;
    }

    public Client saveClient(@NonNull Client client) {
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        return this.clientRepository.save(client);
    }

    public Client getClientByUserName(String userName) {
        Client client = this.clientRepository.getByUserName(userName);
        if (client == null) {
            throw new ResourceNotFoundException("Client with username " + userName + " not found");
        }
        return client;
    }
}