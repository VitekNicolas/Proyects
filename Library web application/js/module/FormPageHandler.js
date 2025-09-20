import { BasePageHandler } from "./BasePageHandler.js";

export class FormPageHandler extends BasePageHandler {

    constructor() {
        super();
        this.liFormPage = document.getElementById("liFormPage");
    }
    AddEventHandler = () => {
        this.liFormPage.addEventListener("click", () => {
            this.divFormContainer.removeAttribute("hidden");
            this.container.setAttribute("hidden", "");
            this.ShowPage();
        });
    }

    ShowPage = () => { }
}