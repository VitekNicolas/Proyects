import { BasePageHandler } from "./BasePageHandler.js";
import { AlertModal } from "../component/AlertModal.js";

export class FormPageHandler extends BasePageHandler {

    constructor() {
        super();
        this.liFormPage = document.getElementById("liFormPage");
        this.btnReset = document.getElementById("btnReset");
        this.btnSubmit = document.getElementById("btnSubmit");
        this.btnCancel = document.getElementById("btnCancel");
        this.form = document.querySelector(".form");
        this.options = document.querySelectorAll('input[type="radio"]');
        this.cancelModal = document.querySelector(".cancelModal");
        this.alertMessage = [];
    }

    ShowPage = () => {
        this.liFormPage.addEventListener("click", () => {
            this.containerForm.removeAttribute("hidden");
            this.containerCatalog.setAttribute("hidden", "");
            this.divBookCartContainer.setAttribute("hidden", "");
            this.containerHome.setAttribute("hidden", "");
            this.AddEventHandler();
        });
    }

    AddEventHandler = () => {
        this.btnSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            this.Validations();
            alert(this.alertMessage.join("\n"));
            this.alertMessage = [];
        });
        this.btnReset.addEventListener("click", (event) => {
            event.preventDefault();
            this.containerForm.querySelectorAll(".text-input").forEach((input) => { input.value = "" });
            this.containerForm.querySelectorAll('input[type="radio"]').forEach((input) => {
                input.checked = false;
            });
        });
        this.btnCancel.addEventListener("click", (event) => {
            event.preventDefault();
            const alertModal = new AlertModal();
            alertModal.Append();
            alertModal.AssignEventHandler();
        });
    }
    Validations = () => {
        this.containerForm.querySelectorAll(".text-input").forEach((input) => {
            if (input.value.trim() === "") {
                this.alertMessage.push(`El campo ${input.name} es obligatorio.`);
            }
            else if (input.value.trim() !== "") {
                if (input.id === "inpFirstName" && !this.ValidateInput(`#${input.id}`)) {
                    this.alertMessage.push("El campo nombre solo debe contener letras.");
                }
                if (input.id === "inpLastName" && !this.ValidateInput(`#${input.id}`)) {
                    this.alertMessage.push("El campo apellido solo debe contener letras.");
                }
                if (input.id === "inpEmail" && !this.ValidateInput(`#${input.id}`)) {
                    this.alertMessage.push("El campo email no es valido.");
                }
                else {
                    this.alertMessage.push(`El campo ${input.name} es correcto: ${input.value}.`);
                }
            }
        });
    }
    ValidateRadioInputs = (name) => {
        const radios = document.getElementsByName(name);
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    ValidateInput = (inputName) => {
        const inputValor = this.containerForm.querySelector(inputName).value.trim();
        const namePattern = /^[a-zA-Z]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (inputName === "#inpEmail") {
            if (emailPattern.test(inputValor)) {
                return true;
            }
            return false;
        }
        else {
            if (namePattern.test(inputValor)) {
                return true;
            }
            return false;
        }
    }
}