export class PrintKeyValues {
  static execute(values, container) {
    const text = `El análisis del texto ha arrojado los siguientes resultados:
        - Sentimiento: ${values.score_tag}
        - Ironía: ${values.irony}
        - Subjetividad: ${values.subjectivity}
        - Acuerdo: ${values.agreement}
        - Nivel de confianza: ${values.confidence}`;
    container.value = text;
  }
}