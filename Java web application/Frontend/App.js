import { InscriptionForm } from "./components/InscriptionForm.js";
import { ResultForm } from "./components/ResultForm.js";
import { StepIndicator } from "./components/StepIndicator.js";
import { LoadingButton } from "./components/LoadingButton.js";
import { ClientService } from "./services/ClientService.js";
import { AnalysisService } from "./services/AnalysisService.js";
import { Client } from "./models/Client.js";
import { showAlert } from "./services/showAlert.js";

export class App {
    constructor() {
        this.stepIndicator = new StepIndicator(document.querySelector(".divIndicator"));
        this.inscriptionForm = new InscriptionForm(document.querySelector(".divInscription"));
        this.resultForm = new ResultForm(document.querySelector(".divResult"));
        this.clientService = new ClientService();
        this.analysisService = new AnalysisService();
        this.currentUserName = null;
        this.currentResult = null;
    }

    start() {
        this.stepIndicator.render();
        this.inscriptionForm.render();
        this.inscriptionForm.onSubmitClick(() => this.handleRegister());
    }

    async handleRegister() {
        const btn = new LoadingButton("btnSubmit");
        btn.start();

        const data = this.inscriptionForm.getFormData();
        const client = new Client(
            data.name, data.lastName, data.userName,
            data.city, data.state, data.zipCode, data.password
        );

        const result = await this.clientService.registerAndLogin(client);

        if (result.success) {
            btn.success("Listo");
            this.currentUserName = client.userName;

            setTimeout(() => {
                this.inscriptionForm.hide();
                this.stepIndicator.goToStepTwo();

                this.resultForm.render(client.userName);
                this.resultForm.show();
                this.resultForm.onAnalyzeClick(() => this.handleAnalyze());
                this.resultForm.onSaveClick(() => this.handleSaveResult());
            }, 600);
        } else {
            btn.error();
            if (result.reason === "login") {
                showAlert("No se pudo iniciar sesión automáticamente. Intente de nuevo.");
            }
        }
    }

    async handleAnalyze() {
        const btn = new LoadingButton("btnAnalize");
        btn.start();

        const text = document.getElementById("inpText").value;
        this.currentResult = await this.analysisService.analyze(text);

        btn.success("Analizado");
        this.resultForm.print(this.currentResult);
        setTimeout(() => btn.reset(), 1500);
    }

    async handleSaveResult() {
        if (!this.currentResult || !this.currentUserName) return;

        const btn = new LoadingButton("btnResult");
        btn.start();

        await this.analysisService.saveResult(this.currentUserName, this.currentResult);

        btn.success("Guardado");
        setTimeout(() => btn.reset(), 1500);
    }
}