package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.Client;
import com.example.demo.model.ResultAnalysis;
import com.example.demo.repositories.IClientRepositoy;
import com.example.demo.repositories.IResultAnalysisRepository;

@Service
public class ResultAnalysisService {

    private final IResultAnalysisRepository resultAnalysisRepository;
    private final IClientRepositoy clientRepositoy;

    public ResultAnalysisService(IResultAnalysisRepository resultAnalysisRepository, IClientRepositoy clientRepositoy) {
        this.resultAnalysisRepository = resultAnalysisRepository;
        this.clientRepositoy = clientRepositoy;
    }

    public ResultAnalysis saveResult(String userName, ResultAnalysis result) {
        Client client = this.clientRepositoy.getByUserName(userName);
        if (client == null) {
            throw new ResourceNotFoundException("Client with username " + userName + " does not exist");
        }
        result.setClient(client);
        return this.resultAnalysisRepository.save(result);
    }
}