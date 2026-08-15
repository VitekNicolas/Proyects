package com.example.demo.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.example.demo.exceptions.AnalysisException;
import com.example.demo.model.AnalysisResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AnalysisService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.model}")
    private String model;

    public AnalysisService(@Value("${groq.api.url}") @NonNull String apiUrl) {
        this.restClient = RestClient.create(apiUrl);
    }

    public AnalysisResponseDto analyze(String text) {
        String prompt = buildPrompt(text);
        String requestBody = """
                {
                  "model": "%s",
                  "temperature": 0,
                  "messages": [
                    {"role": "user", "content": %s}
                  ]
                }
                """.formatted(model, toJsonString(prompt));

        String rawResponse;
        try {
            rawResponse = restClient.post()
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .body((Object) requestBody)
                    .retrieve()
                    .body(String.class);
        } catch (Exception e) {
            throw new AnalysisException("Unable to connect to the analytics service (Groq)", e);
        }

        return parseGroqResponse(rawResponse);
    }

    private String buildPrompt(String text) {
        return """
                Analyze the sentiment of the following text and respond ONLY with valid JSON, \
                without additional text, explanations, or Markdown, in exactly this format:
                                {
                                  "scoreTag": "P" | "N" | "NEU" | "NONE",
                                  "irony": "IRONIC" | "NONIRONIC",
                                  "subjectivity": "SUBJECTIVE" | "OBJECTIVE",
                                  "agreement": "AGREEMENT" | "DISAGREEMENT",
                                  "confidence": <integer between 0 and 100>
                                }

                                Donde:
                                - scoreTag: P = positive, N = negative, NEU = neutral, NONE = no clear sentiment
                                - irony: if the text uses irony or sarcasm
                                - subjectivity: if it is a personal opinion (SUBJECTIVE) or an objective fact (OBJECTIVE)
                                - agreement: if the text expresses agreement or disagreement with something
                                - confidence: how confident you are in this analysis

                                Text to be analyzed: "%s"
                                """.formatted(text);
    }

    private AnalysisResponseDto parseGroqResponse(String rawResponse) {
        try {
            JsonNode root = objectMapper.readTree(rawResponse);
            String content = root.path("choices").get(0).path("message").path("content").asText();

            String cleanJson = extractJson(content);
            JsonNode resultNode = objectMapper.readTree(cleanJson);

            return new AnalysisResponseDto(
                    resultNode.path("scoreTag").asText("NONE"),
                    resultNode.path("irony").asText("NONIRONIC"),
                    resultNode.path("subjectivity").asText("OBJECTIVE"),
                    resultNode.path("agreement").asText("AGREEMENT"),
                    resultNode.path("confidence").asInt(0));
        } catch (JsonProcessingException e) {
            throw new AnalysisException("The AI ​​returned a response that could not be interpreted", e);
        }
    }

    private String extractJson(String content) {
        int start = content.indexOf('{');
        int end = content.lastIndexOf('}');
        if (start == -1 || end == -1 || end < start) {
            throw new AnalysisException("The AI ​​did not return a valid JSON: " + content);
        }
        return content.substring(start, end + 1);
    }

    private String toJsonString(String text) {
        try {
            return objectMapper.writeValueAsString(text);
        } catch (JsonProcessingException e) {
            throw new AnalysisException("Internal error while building the request to Groq", e);
        }
    }
}