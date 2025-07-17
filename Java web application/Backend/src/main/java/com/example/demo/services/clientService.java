package com.example.demo.services;
import org.springframework.stereotype.Service;
import com.example.demo.model.Client;
import com.example.demo.repositories.IClientRepositoy;

@Service
public class ClientService {
    private final IClientRepositoy clientRepository;
    public ClientService(IClientRepositoy clientRepository) {
        this.clientRepository = clientRepository;
    }
    public Client getClient(int id){
        return this.clientRepository.getById(id);
    }
    public Client saveClient(Client client){
        return this.clientRepository.save(client);
    }
    public Client getClientByUserName(String userName){
        return this.clientRepository.getByUserName(userName);
    }
}
