export class InscriptionForm {
  static addForm(container) {
    let form = `<h2>Analisis de sentimientos</h2>
    <div id="alertBox" class="alert alert-danger d-none" role="alert"></div>
    <form class="inscriptionForm" id="inscriptionForm">
      <div class="divClientData">
        <div class="form-row">
          <div class="col-md-4 mb-3">
            <label for="inpName">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="inpName"
              placeholder="Nombre"
              autocomplete="given-name"
              required
            />
          </div>
          <div class="col-md-4 mb-3">
            <label for="inpLastName">Apellido</label>
            <input
              type="text"
              class="form-control"
              id="inpLastName"
              placeholder="Apellido"
              autocomplete="family-name"
              required
            />
          </div>
          <div class="col-md-4 mb-3">
            <label for="userName">Nombre de usuario</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inpUserName">@</span>
              </div>
              <input
                type="text"
                class="form-control"
                id="userName"
                placeholder="Nombre de usuario"
                aria-describedby="inputGroupPrepend3"
                autocomplete="username"
                required
              />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="inpPassword">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="inpPassword"
              placeholder="Contraseña"
              autocomplete="new-password"
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6 mb-3">
            <label for="inpCity">Ciudad</label>
            <input
              type="text"
              class="form-control"
              id="inpCity"
              placeholder="Ciudad"
              autocomplete="address-level2"
              required
            />
          </div>
          <div class="col-md-3 mb-3">
            <label for="inpState">Provincia</label>
            <input
              type="text"
              class="form-control"
              id="inpState"
              placeholder="Provincia"
              autocomplete="address-level1"
              required
            />
          </div>
          <div class="col-md-3 mb-3">
            <label for="inpZipCode">Codigo postal</label>
            <input
              type="text"
              class="form-control"
              id="inpZipCode"
              placeholder="Codigo postal"
              autocomplete="postal-code"
              required
            />
          </div>
        </div>
      </div>  
      <div class="form-group">
        <label for="inpText">Texto a analizar</label>
        <textarea
          class="form-control"
          id="inpText"
          rows="3"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="chkConditions"
            value=""
            required
          />
          <label class="form-check-label" for="chkConditions" id="lblConditions">
            Acepta los terminos y condiciones
          </label>
          <div class="invalid-feedback">Debe aceptar antes de continuar</div>
        </div>
      </div>
      <button class="btn btn-primary" id="btnSubmit" type="button">
        Registrar cliente
      </button>
      <button class="btn btn-success" id="btnAnalize" type="button" disabled>
        Analizar texto
      </button>
    </form>`;
    container.innerHTML += form;
  }
  static disableFormElements = (elementsToDisable) => {
    elementsToDisable.forEach(element => {
      element.disabled = true;
    });
  }
  static callDisableFormElements = (dibaleCode) => {
    let elementsToDisable;
    switch (dibaleCode) {
      case 1:
        elementsToDisable = document.querySelectorAll(".divClientData input, #btnSubmit");
        this.disableFormElements(elementsToDisable);
        break;
      case 2:
        elementsToDisable = document.querySelectorAll("#inpText, #lblConditions, #btnAnalize");
        this.disableFormElements(elementsToDisable);
      default:
        break;
    }
  }
}