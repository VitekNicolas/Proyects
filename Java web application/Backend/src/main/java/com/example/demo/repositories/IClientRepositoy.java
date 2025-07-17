package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Client;

@Repository
public interface IClientRepositoy extends JpaRepository<Client, Integer> {
    Client getById(Integer id);
    Client getByUserName(String userName);
}
