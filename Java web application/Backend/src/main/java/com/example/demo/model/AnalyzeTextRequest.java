package com.example.demo.model;
import jakarta.validation.constraints.NotBlank;

public class AnalyzeTextRequest {

    @NotBlank(message = "El texto a analizar es obligatorio")
    private String text;

    public AnalyzeTextRequest() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}