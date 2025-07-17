package com.example.demo;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.when;
import com.example.demo.controller.ClientController;
import com.example.demo.services.ClientService;
import com.example.demo.model.Client;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
        Client result = clientController.getClient(1);
        assertThat(result).isEqualTo(client);
    }
}