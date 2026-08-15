package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "ResultAnalysis")
public class ResultAnalysis {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    @JsonIgnore
    private Client client;

    public void setClient(Client client) {
        this.client = client;
    }

    public Client getClient() {
        return client;
    }

    private String scoreTag, irony, subjectivity, agreement;
    private int confidence;

    public ResultAnalysis(String scoreTag, String irony, String subjectivity, String agreement, int confidence) {
        this.scoreTag = scoreTag;
        this.irony = irony;
        this.subjectivity = subjectivity;
        this.agreement = agreement;
        this.confidence = confidence;
    }

    public Integer getId() {
        return id;
    }

    public String getScoreTag() {
        return scoreTag;
    }

    public void setScoreTag(String scoreTag) {
        this.scoreTag = scoreTag;
    }

    public String getIrony() {
        return irony;
    }

    public void setIrony(String irony) {
        this.irony = irony;
    }

    public String getSubjectivity() {
        return subjectivity;
    }

    public void setSubjectivity(String subjectivity) {
        this.subjectivity = subjectivity;
    }

    public String getAgreement() {
        return agreement;
    }

    public void setAgreement(String agreement) {
        this.agreement = agreement;
    }

    public int getConfidence() {
        return confidence;
    }

    public void setConfidence(int confidence) {
        this.confidence = confidence;
    }

    public ResultAnalysis() {
        super();
    }
}