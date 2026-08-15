package com.example.demo;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import com.example.demo.controller.ClientController;
import com.example.demo.model.Client;
import com.example.demo.services.ClientService;

@ExtendWith(MockitoExtension.class)
public class ClientControllerTest {
    @Mock
    private ClientService clientService;

    @InjectMocks
    private ClientController clientController;

    @Test
    public void testGetClient() {
        Client client = new Client();
        client.setId(1);
        client.setName("Nicolas");

        when(clientService.getClient(1)).thenReturn(client);

        ResponseEntity<Client> result = clientController.getClient(1);
        assertThat(result.getBody()).isEqualTo(client);
    }
}