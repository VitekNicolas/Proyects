export class translateKeyValues {
  constructor(json) {
    this.score_tag = json.score_tag;
    this.irony = json.irony;
    this.subjectivity = json.subjectivity;
    this.agreement = json.agreement;
    this.confidence = json.confidence;
  }
  translateScoreTag() {
    switch (this.score_tag) {
      case "P+":
        this.score_tag = "Muy positivo";
        break;
      case "P":
        this.score_tag = "Positivo";
        break;
      case "NEU":
        this.score_tag = "Neutral";
        break;
      case "N":
        this.score_tag = "Negativo";
        break;
      case "N+":
        this.score_tag = "Muy negativo";
        break;
      case "NONE":
        this.score_tag = "Sin polaridad";
        break;
      default:
        break;
    }
    return this.score_tag;
  }
  translateIrony() {
    switch (this.irony) {
      case "NONIRONIC":
        this.irony = "No es ironico";
        break;
      case "IRONIC":
        this.irony = "Es ironico";
        break;
      default:
        break;
    }
    return this.irony;
  }
  translateSubjectivity() {
    switch (this.subjectivity) {
      case "OBJECTIVE":
        this.subjectivity = "Es objetivo";
        break;
      case "SUBJECTIVE":
        this.subjectivity = "Es subjetivo";
        break;
      default:
        break;
    }
    return this.subjectivity;
  }
  translateAgreement() {
    switch (this.agreement) {
      case "AGREEMENT":
        this.agreement = "Esta de acuerdo";
        break;
      case "DISAGREEMENT":
        this.agreement = "Esta en desacuerdo";
        break;
      default:
        break;
    }
    return this.agreement;
  }
  getJsonValues() {
    return {
      score_tag: this.score_tag,
      irony: this.irony,
      subjectivity: this.subjectivity,
      agreement: this.agreement,
      confidence: this.confidence,
    };
  }
  getTranslatedValues() {
    return {
      score_tag: this.translateScoreTag(),
      irony: this.translateIrony(),
      subjectivity: this.translateSubjectivity(),
      agreement: this.translateAgreement(),
      confidence: this.confidence,
    };
  }
}
