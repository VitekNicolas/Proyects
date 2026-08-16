export class ResultForm {
    constructor(container) {
        this.container = container;
    }

    render(userName) {
        const html = `
        <div class="wizard-container d-none" id="step2">
            <div class="user-chip">
                <div class="avatar">${this._initials(userName)}</div>
                <span>Hola, <strong>${userName}</strong></span>
                <i class="ti ti-check" style="color: #198754;"></i>
            </div>
            <div class="wizard-card">
                <p class="wizard-card-title">Escribi tu texto</p>
                <p class="wizard-card-subtitle">Lo vamos a analizar con IA.</p>
                <textarea class="form-control" id="inpText" rows="3" placeholder="Escribi el texto que queres analizar..." required></textarea>
                <button class="btn btn-primary btn-block mt-3" id="btnAnalize" type="button">
                    Analizar texto
                </button>
                <div id="resultArea" class="d-none">
                    <div class="result-grid" id="resultGrid"></div>
                    <button class="btn btn-outline-secondary btn-block" id="btnResult" type="button">
                        Guardar resultado
                    </button>
                </div>
            </div>
        </div>`;
        this.container.innerHTML += html;
    }

    show() {
        document.getElementById("step2").classList.remove("d-none");
    }

    print(analysisResult) {
        const translated = analysisResult.getTranslated();

        const sentiment = this._sentimentCard(analysisResult.score_tag, translated.score_tag);
        const irony = this._ironyCard(analysisResult.irony, translated.irony);

        const grid = document.getElementById("resultGrid");
        grid.innerHTML = `
            <div class="result-card ${sentiment.cssClass}">
                <i class="ti ${sentiment.icon}"></i>
                <p>${translated.score_tag}</p>
            </div>
            <div class="result-card ${irony.cssClass}">
                <i class="ti ${irony.icon}"></i>
                <p>${translated.irony}</p>
            </div>
            <div class="result-card neutral">
                <i class="ti ti-user"></i>
                <p>${translated.subjectivity}</p>
            </div>
            <div class="result-card neutral">
                <i class="ti ti-gauge"></i>
                <p>${translated.confidence}% confianza</p>
            </div>
        `;

        document.getElementById("resultArea").classList.remove("d-none");
    }

    onAnalyzeClick(handler) {
        document.querySelector("#btnAnalize").addEventListener("click", async (event) => {
            event.preventDefault();
            await handler();
        });
    }

    onSaveClick(handler) {
        document.querySelector("#btnResult").addEventListener("click", async (event) => {
            event.preventDefault();
            await handler();
        });
    }

    _sentimentCard(rawValue, label) {
        switch (rawValue) {
            case "P": return { cssClass: "success", icon: "ti-mood-smile" };
            case "N": return { cssClass: "danger", icon: "ti-mood-sad" };
            case "NEU": return { cssClass: "neutral", icon: "ti-mood-neutral" };
            default: return { cssClass: "neutral", icon: "ti-mood-empty" };
        }
    }

    _ironyCard(rawValue, label) {
        return rawValue === "IRONIC"
            ? { cssClass: "info", icon: "ti-mask" }
            : { cssClass: "info", icon: "ti-message-circle" };
    }

    _initials(userName) {
        return userName ? userName.substring(0, 2).toUpperCase() : "??";
    }
}