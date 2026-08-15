package com.example.demo.model;

public class AnalysisResponseDto {

    private String scoreTag;
    private String irony;
    private String subjectivity;
    private String agreement;
    private int confidence;

    public AnalysisResponseDto() {
    }

    public AnalysisResponseDto(String scoreTag, String irony, String subjectivity, String agreement, int confidence) {
        this.scoreTag = scoreTag;
        this.irony = irony;
        this.subjectivity = subjectivity;
        this.agreement = agreement;
        this.confidence = confidence;
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
}