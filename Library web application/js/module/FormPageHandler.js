import { BasePageHandler } from "./BasePageHandler.js";
import { AlertModal } from "../component/AlertModal.js";

export class FormPageHandler extends BasePageHandler {
  constructor() {
    super();
    this.$containerForm = $(".containerForm");
    this.$liFormPage = $("#liFormPage");
    this.$btnReset = this.$containerForm.find("#btnReset");
    this.$btnSubmit = this.$containerForm.find("#btnSubmit");
    this.$btnCancel = this.$containerForm.find("#btnCancel");
    this.$form = $(".form");
    this.$options = this.$containerForm.find('input[type="radio"]');
    this.$cancelModal = this.$containerForm.find(".cancelModal");
    this.alertMessage = [];
  }

  ShowPage = () => {
    this.$liFormPage.on("click", () => {
      this.DisplayContainer([this.containerForm]);
    });
  };

  AddEventHandler = () => {
    this.$btnSubmit.on("click", (event) => {
      event.preventDefault();
      this.Validations();
      alert(this.alertMessage.join("\n"));
      this.alertMessage = [];
    });

    this.$btnReset.on("click", (event) => {
      event.preventDefault();
      this.$containerForm.find(".text-input").val("");
      this.$containerForm.find('input[type="radio"]').prop("checked", false);
    });

    this.$btnCancel.on("click", (event) => {
      event.preventDefault();
      const alertModal = new AlertModal();
      alertModal.Append();
      alertModal.AssignEventHandler();
    });
  };

  Validations = () => {
    this.$containerForm.find(".text-input").each((_, input) => {
      const $input = $(input);
      if ($input.val().trim() === "") {
        this.alertMessage.push(`El campo ${$input.attr("name")} es obligatorio.`);
      } else {
        if ($input.attr("id") === "inpFirstName" && !this.ValidateInput(`#${$input.attr("id")}`)) {
          this.alertMessage.push("El campo nombre solo debe contener letras.");
        } else if ($input.attr("id") === "inpLastName" && !this.ValidateInput(`#${$input.attr("id")}`)) {
          this.alertMessage.push("El campo apellido solo debe contener letras.");
        } else if ($input.attr("id") === "inpEmail" && !this.ValidateInput(`#${$input.attr("id")}`)) {
          this.alertMessage.push("El campo email no es válido.");
        } else {
          this.alertMessage.push(`El campo ${$input.attr("name")} es correcto: ${$input.val()}.`);
        }
      }
    });
  };

  ValidateRadioInputs = (name) => {
    return this.$containerForm.find(`input[name="${name}"]:checked`).length > 0;
  };

  ValidateInput = (inputName) => {
    const inputValor = this.$containerForm.find(inputName).val().trim();
    const namePattern = /^[a-zA-Z]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputName === "#inpEmail") {
      return emailPattern.test(inputValor);
    } else {
      return namePattern.test(inputValor);
    }
  };
}
