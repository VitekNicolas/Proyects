package com.example.demo;
import com.example.demo.model.Client;
import com.example.demo.services.ClientService;
import com.example.demo.repositories.IClientRepositoy;
import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.runner.RunWith;
import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ClientServiceTest {
    @Autowired
    private ClientService clientService;

    @Autowired
    private IClientRepositoy clientRepository;
    
    @Before
    public void setUp() {
        clientRepository.deleteAll();
        Client client = new Client();
        client.setId(1);
        client.setUserName("Nicolas");
        clientRepository.save(client);
    }
    @Test
    public void testGetClientByUserName() {
        Client result = clientService.getClientByUserName("Nicolas");
        assertNotNull(result);
        assertEquals("Nicolas", result.getUserName());
    }
    @After
    public void tearDown() {
        clientRepository.deleteAll();
    }
}