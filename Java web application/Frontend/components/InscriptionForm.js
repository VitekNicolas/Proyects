export class InscriptionForm {
    constructor(container) {
        this.container = container;
    }

    render() {
        const form = `<h2>Analisis de sentimientos</h2>
        <div id="alertBox" class="alert alert-danger d-none" role="alert"></div>
        <form class="inscriptionForm" id="inscriptionForm">
          <div class="divClientData">
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label for="inpName">Nombre</label>
                <input type="text" class="form-control" id="inpName" placeholder="Nombre" autocomplete="given-name" required />
              </div>
              <div class="col-md-4 mb-3">
                <label for="inpLastName">Apellido</label>
                <input type="text" class="form-control" id="inpLastName" placeholder="Apellido" autocomplete="family-name" required />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Nombre de usuario</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inpUserName">@</span>
                  </div>
                  <input type="text" class="form-control" id="userName" placeholder="Nombre de usuario" aria-describedby="inputGroupPrepend3" autocomplete="username" required />
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="inpPassword">Contraseña</label>
                <input type="password" class="form-control" id="inpPassword" placeholder="Contraseña" autocomplete="new-password" required />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="inpCity">Ciudad</label>
                <input type="text" class="form-control" id="inpCity" placeholder="Ciudad" autocomplete="address-level2" required />
              </div>
              <div class="col-md-3 mb-3">
                <label for="inpState">Provincia</label>
                <input type="text" class="form-control" id="inpState" placeholder="Provincia" autocomplete="address-level1" required />
              </div>
              <div class="col-md-3 mb-3">
                <label for="inpZipCode">Codigo postal</label>
                <input type="text" class="form-control" id="inpZipCode" placeholder="Codigo postal" autocomplete="postal-code" required />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="inpText">Texto a analizar</label>
            <textarea class="form-control" id="inpText" rows="3" required></textarea>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="chkConditions" value="" required />
              <label class="form-check-label" for="chkConditions" id="lblConditions">
                Acepta los terminos y condiciones
              </label>
              <div class="invalid-feedback">Debe aceptar antes de continuar</div>
            </div>
          </div>
          <button class="btn btn-primary" id="btnSubmit" type="button">Registrar cliente</button>
          <button class="btn btn-success" id="btnAnalize" type="button" disabled>Analizar texto</button>
        </form>`;
        this.container.innerHTML += form;
    }

    getFormData() {
        return {
            name: document.getElementById("inpName").value,
            lastName: document.getElementById("inpLastName").value,
            userName: document.getElementById("userName").value,
            city: document.getElementById("inpCity").value,
            state: document.getElementById("inpState").value,
            zipCode: document.getElementById("inpZipCode").value,
            password: document.getElementById("inpPassword").value,
        };
    }

    disableClientFields() {
        document.querySelectorAll(".divClientData input, #btnSubmit")
            .forEach(el => el.disabled = true);
    }

    disableTextFields() {
        document.querySelectorAll("#inpText, #lblConditions, #btnAnalize")
            .forEach(el => el.disabled = true);
    }

    enableAnalyzeButton() {
        document.querySelector("#btnAnalize").disabled = false;
    }

    onSubmitClick(handler) {
        document.querySelector("#btnSubmit").addEventListener("click", async (event) => {
            event.preventDefault();
            await handler();
        });
    }

    onAnalyzeClick(handler) {
        document.querySelector("#btnAnalize").addEventListener("click", async (event) => {
            event.preventDefault();
            await handler();
        });
    }
}