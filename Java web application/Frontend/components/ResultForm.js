export class ResultForm {
    constructor(container) {
        this.container = container;
    }

    render() {
        const form = `
            <div class="form-group">
                <label for="txtResult">Resultados</label>
                <textarea class="form-control" id="txtResult" rows="3" readonly></textarea>
            </div>
            <button class="btn btn-info" id="btnResult" type="button">Guardar datos</button>
        `;
        this.container.innerHTML += form;
    }

    print(analysisResult) {
        const translated = analysisResult.getTranslated();
        const textarea = document.getElementById("txtResult");
        textarea.value = `El análisis del texto ha arrojado los siguientes resultados:
        - Sentimiento: ${translated.score_tag}
        - Ironía: ${translated.irony}
        - Subjetividad: ${translated.subjectivity}
        - Acuerdo: ${translated.agreement}
        - Nivel de confianza: ${translated.confidence}`;
    }

    onSaveClick(handler) {
        document.querySelector("#btnResult").addEventListener("click", async (event) => {
            event.preventDefault();
            await handler();
        });
    }
}