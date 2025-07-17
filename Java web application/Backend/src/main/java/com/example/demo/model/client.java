package com.example.demo.model;
import java.util.List;

import jakarta.persistence.*;

@Entity(name = "Clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private List<ResultAnalysis> results;
    private String name;
    private String lastName;
    private String userName;
    private String city;
    private String state;
    private int zipCode;

    public void setId(Integer id) {
        this.id = id;
    }
    public String getLastName() {
        return lastName;
    }

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public int getZipCode() {
        return zipCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public List<ResultAnalysis> getResultados() {
        return results;
    }
    public Client(String name, String lastName, String userName, String city, String state, int zipCode){
        this.name=name;
        this.lastName=lastName;
        this.userName=userName;
        this.city=city;
        this.state=state;
        this.zipCode=zipCode;
    }
    public Client() {
        super();
    }
}