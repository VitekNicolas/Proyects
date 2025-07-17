import { appendContainersToDivMain, createContainer } from "../../component/DivHandler.js";
import { createClient } from "../../service/fetchService.js";

var divRegisterClient;
const liClientForm = document.getElementById("liClientForm");

const createClientForm = () => `
  <form class="clientForm">
    <div class="form-row">
      <h3 class="text-primary" id="hRegisterClientCTitle">Registro de clientes</h3>
      <div class="col-md-4 mb-3">
        <label for="validationServer01">Primer nombre</label>
        <input type="text" class="form-control" id="inpFirstName" placeholder="Primer nombre" required>
      </div>
      <div class="col-md-4 mb-3">
        <label for="validationServer02">Apellido</label>
        <input type="text" class="form-control" id="inpLastName" placeholder="Apellido" required>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="validationServer03">DNI</label>
        <input type="text" id='inpDNI' class="form-control" placeholder="DNI" required>
      </div>
      <div class="col-md-3 mb-3">
        <label for="validationServer04">Dirección</label>
        <input type="text" class="form-control" id="inpAddress" placeholder="Dirección" required>
      </div>
      <div class="col-md-3 mb-3">
        <label for="validationServer05">Número de teléfono</label>
        <input type="text" class="form-control" id="inpPhoneNumber" placeholder="Número de teléfono" required>
      </div>
    </div>
    <button class="btn btn-primary" id="btnRegisterClient" type="button" onClick="registerClient()">Registrar cliente</button>
  </form>
`;

const disableForm = () => {
  const formInputs = document.querySelectorAll("#divRegisterClient input");
  const btnRegisterClient = document.getElementById("btnRegisterClient");
  btnRegisterClient.disabled = true;
  formInputs.forEach(input => {
    input.disabled = true;
  });
};

const getClientData = () => {
  const formFields = ["inpFirstName", "inpLastName", "inpDNI", "inpAddress", "inpPhoneNumber"];
  return formFields.reduce((data, field) => {
    data[field] = document.getElementById(field).value;
    return data;
  }, {});
};

const registerClient = async () => {
  const { inpFirstName: firstName, inpLastName: lastName, inpDNI: dni, inpAddress: address, inpPhoneNumber: phoneNumber } = getClientData();
  try {
    await createClient(dni, firstName, lastName, address, phoneNumber);
    disableForm();
  } catch (error) {
    console.error("Error al crear cliente:", error);
  }
};

window.registerClient = registerClient;

const appendClientFormToDiv = () => {
  divRegisterClient = createContainer('divRegisterClient');
  divRegisterClient.innerHTML = createClientForm();
  appendContainersToDivMain(divRegisterClient);
};

export const initializeClientForm = () => {
  liClientForm.addEventListener("click", appendClientFormToDiv);
};