import { BasePageHandler } from "./BasePageHandler.js";
import { AlertModal } from "../component/AlertModal.js";
import { FormModal } from "../component/FormModal.js";

export class FormPageHandler extends BasePageHandler {
  constructor() {
    super();
    this.$containerForm = $(".containerForm");
    this.$liFormPage = $("#liFormPage");
    this.$form = $(".form");
    this.$btnReset = this.$containerForm.find("#btnReset");
    this.$btnSubmit = this.$containerForm.find("#btnSubmit");
    this.$btnCancel = this.$containerForm.find("#btnCancel");
    this.$options = this.$containerForm.find('input[type="radio"]');
    this.$cancelModal = this.$containerForm.find(".cancelModal");
    this.alertMessage = [];
    this.formModal = new FormModal();
    this.alertModal = new AlertModal();
    this.alertModal.AssignEventHandler();
  }

  ShowPage = () => {
    this.$liFormPage.on("click", () => {
      this.CleanForm();
      this.DisplayContainer([this.containerForm]);
      $(".formModal").remove();
    });
  };

  AddEventHandler = () => {
    this.$btnSubmit.on("click", (event) => {
      event.preventDefault();
      this.Validations();
      let message = this.alertMessage.join("\n");
      this.formModal.Create(message);
      this.formModal.Append();
      this.formModal.AssignEventHandler();
      this.alertMessage = [];
    });

    this.$btnReset.on("click", (event) => {
      event.preventDefault();
      this.CleanForm();
    });
    this.$btnCancel.on("click", (event) => {
      event.preventDefault();
      this.alertModal.Append();
    });
  };

  CleanForm = () => {
    this.$containerForm.find(".text-input").val("");
    this.$containerForm.find('input[type="radio"]').prop("checked", false);
  }

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
    if (!this.ValidateRadioInputs("sexo")) {
      this.alertMessage.push("Debe seleccionar un sexo.");
    } else {
      const valorSexo = this.$containerForm.find('input[name="sexo"]:checked').val();
      this.alertMessage.push(`El campo sexo fue seleccionado correctamente: ${valorSexo}.`);
    }
    if (!this.ValidateRadioInputs("valoracion")) {
      this.alertMessage.push("Debe seleccionar una valoración.");
    } else {
      const valorValoracion = this.$containerForm.find('input[name="valoracion"]:checked').val();
      this.alertMessage.push(`El campo valoración fue seleccionada correctamente: ${valorValoracion}.`);
    }
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