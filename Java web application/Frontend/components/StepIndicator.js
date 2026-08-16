export class StepIndicator {
    constructor(container) {
        this.container = container;
    }

    render() {
        const html = `
        <div class="wizard-container">
            <div class="step-indicator">
                <div class="step active" id="stepOne">
                    <div class="step-circle">1</div>
                    <span class="step-label">Datos personales</span>
                </div>
                <div class="step-connector" id="stepConnector"></div>
                <div class="step" id="stepTwo">
                    <div class="step-circle">2</div>
                    <span class="step-label">Analizar texto</span>
                </div>
            </div>
        </div>`;
        this.container.innerHTML += html;
    }

    goToStepTwo() {
        const stepOne = document.getElementById("stepOne");
        stepOne.classList.remove("active");
        stepOne.classList.add("done");
        stepOne.querySelector(".step-circle").innerHTML = '<i class="ti ti-check"></i>';
        document.getElementById("stepConnector").classList.add("done");
        document.getElementById("stepTwo").classList.add("active");
    }
}