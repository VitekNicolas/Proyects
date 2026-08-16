import { analizeText, registerResult } from "./fetch.js";
import { AnalysisResult } from "../models/AnalysisResult.js";

export class AnalysisService {
    analyze(text) {
        return new Promise((resolve) => {
            analizeText(text, (json) => {
                resolve(new AnalysisResult(json));
            });
        });
    }

    async saveResult(userName, analysisResult) {
        const translated = analysisResult.getTranslated();
        return registerResult(
            userName,
            translated.score_tag,
            translated.irony,
            translated.subjectivity,
            translated.agreement,
            translated.confidence
        );
    }
}