export class AnalysisResult {
    constructor(json) {
        this.score_tag = json.score_tag;
        this.irony = json.irony;
        this.subjectivity = json.subjectivity;
        this.agreement = json.agreement;
        this.confidence = json.confidence;
    }

    getRaw() {
        return {
            score_tag: this.score_tag,
            irony: this.irony,
            subjectivity: this.subjectivity,
            agreement: this.agreement,
            confidence: this.confidence,
        };
    }

    getTranslated() {
        return {
            score_tag: this._translateScoreTag(),
            irony: this._translateIrony(),
            subjectivity: this._translateSubjectivity(),
            agreement: this._translateAgreement(),
            confidence: this.confidence,
        };
    }

    _translateScoreTag() {
        switch (this.score_tag) {
            case "P": return "Positivo";
            case "NEU": return "Neutral";
            case "N": return "Negativo";
            case "NONE": return "Sin polaridad";
            default: return this.score_tag;
        }
    }

    _translateIrony() {
        switch (this.irony) {
            case "NONIRONIC": return "No es ironico";
            case "IRONIC": return "Es ironico";
            default: return this.irony;
        }
    }

    _translateSubjectivity() {
        switch (this.subjectivity) {
            case "OBJECTIVE": return "Es objetivo";
            case "SUBJECTIVE": return "Es subjetivo";
            default: return this.subjectivity;
        }
    }

    _translateAgreement() {
        switch (this.agreement) {
            case "AGREEMENT": return "Esta de acuerdo";
            case "DISAGREEMENT": return "Esta en desacuerdo";
            default: return this.agreement;
        }
    }
}