package com.example.demo.controller;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.Client;
import com.example.demo.model.LoginRequest;
import com.example.demo.model.LoginResponse;
import com.example.demo.repositories.IClientRepositoy;
import com.example.demo.services.JwtService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@Tag(name = "Auth controller", description = "Login and JWT token issuance")
public class AuthController {

    private final IClientRepositoy clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(IClientRepositoy clientRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Authenticates a client and returns a JWT token")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        Client client = clientRepository.getByUserName(request.getUserName());

        if (client == null) {
            throw new ResourceNotFoundException("Client with username " + request.getUserName() + " not found");
        }

        if (!passwordEncoder.matches(request.getPassword(), client.getPassword())) {
            throw new BadCredentialsException("Incorrect password");
        }

        String token = jwtService.generateToken(client.getUserName());
        return new LoginResponse(token);
    }
}