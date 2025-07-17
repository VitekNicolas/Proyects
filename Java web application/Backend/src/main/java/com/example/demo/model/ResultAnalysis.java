package com.example.demo.model;

import jakarta.persistence.*;

@Entity(name = "ResultAnalysis")
public class ResultAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client cliente;

    public void setCliente(Client cliente) {
        this.cliente = cliente;
    }

    private String scoreTag, irony, subjectivity, agreement;
    private byte confidence;

    public ResultAnalysis(String scoreTag, String irony, String subjectivity, String agreement, byte confidence) {
        this.scoreTag = scoreTag;
        this.irony = irony;
        this.subjectivity = subjectivity;
        this.agreement = agreement;
        this.confidence = confidence;
    }

    public String getScoreTag() {
        return scoreTag;
    }

    public String getIrony() {
        return irony;
    }

    public String getSubjectivity() {
        return subjectivity;
    }

    public String getAgreement() {
        return agreement;
    }

    public byte getConfidence() {
        return confidence;
    }

    public ResultAnalysis() {
        super();
    }
}