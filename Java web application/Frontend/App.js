import { InscriptionForm } from "./components/InscriptionForm.js";
import { ResultForm } from "./components/ResultForm.js";
import { ClientService } from "./services/ClientService.js";
import { AnalysisService } from "./services/AnalysisService.js";
import { Client } from "./models/Client.js";
import { showAlert } from "./services/ShowAlert.js";

export class App {
    constructor() {
        this.inscriptionForm = new InscriptionForm(document.querySelector(".divInscription"));
        this.resultForm = new ResultForm(document.querySelector(".divResult"));
        this.clientService = new ClientService();
        this.analysisService = new AnalysisService();
        this.currentUserName = null;
        this.currentResult = null;
    }

    start() {
        this.inscriptionForm.render();
        this.inscriptionForm.onSubmitClick(() => this.handleRegister());
        this.inscriptionForm.onAnalyzeClick(() => this.handleAnalyze());
    }

    async handleRegister() {
        const data = this.inscriptionForm.getFormData();
        const client = new Client(
            data.name, data.lastName, data.userName,
            data.city, data.state, data.zipCode, data.password
        );

        const result = await this.clientService.registerAndLogin(client);

        if (result.success) {
            this.currentUserName = client.userName;
            this.inscriptionForm.disableClientFields();
            this.inscriptionForm.enableAnalyzeButton();
        } else if (result.reason === "login") {
            showAlert("No se pudo iniciar sesión automáticamente. Intente de nuevo.");
        }
    }

    async handleAnalyze() {
        this.resultForm.render();
        const text = document.getElementById("inpText").value;

        this.currentResult = await this.analysisService.analyze(text);
        this.resultForm.print(this.currentResult);
        this.inscriptionForm.disableTextFields();

        this.resultForm.onSaveClick(() => this.handleSaveResult());
    }

    async handleSaveResult() {
        if (!this.currentResult || !this.currentUserName) return;
        await this.analysisService.saveResult(this.currentUserName, this.currentResult);
    }
}