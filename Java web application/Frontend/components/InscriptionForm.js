export class InscriptionForm {
    constructor(container) {
        this.container = container;
    }

    render() {
        const form = `
        <div class="wizard-container" id="step1">
            <div class="wizard-card">
                <p class="wizard-card-title">Contanos quien sos</p>
                <p class="wizard-card-subtitle">Con estos datos creamos tu cuenta.</p>
                <div id="alertBox" class="alert alert-danger d-none" role="alert"></div>
                <form id="inscriptionForm">
                    <div class="form-group">
                        <label for="inpName">Nombre</label>
                        <input type="text" class="form-control" id="inpName" placeholder="Nombre" autocomplete="given-name" required />
                    </div>
                    <div class="form-group">
                        <label for="inpLastName">Apellido</label>
                        <input type="text" class="form-control" id="inpLastName" placeholder="Apellido" autocomplete="family-name" required />
                    </div>
                    <div class="form-group">
                        <label for="userName">Nombre de usuario</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inpUserName">@</span>
                            </div>
                            <input type="text" class="form-control" id="userName" placeholder="Nombre de usuario" aria-describedby="inpUserName" autocomplete="username" required />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inpPassword">Contraseña</label>
                        <input type="password" class="form-control" id="inpPassword" placeholder="Contraseña" autocomplete="new-password" required />
                    </div>
                    <div class="form-row">
                        <div class="col-6 form-group">
                            <label for="inpCity">Ciudad</label>
                            <input type="text" class="form-control" id="inpCity" placeholder="Ciudad" autocomplete="address-level2" required />
                        </div>
                        <div class="col-3 form-group">
                            <label for="inpState">Provincia</label>
                            <input type="text" class="form-control" id="inpState" placeholder="Provincia" autocomplete="address-level1" required />
                        </div>
                        <div class="col-3 form-group">
                            <label for="inpZipCode">CP</label>
                            <input type="text" class="form-control" id="inpZipCode" placeholder="CP" autocomplete="postal-code" required />
                        </div>
                    </div>
                    <div class="form-group form-check">
                        <input class="form-check-input" type="checkbox" id="chkConditions" required />
                        <label class="form-check-label" for="chkConditions" id="lblConditions">
                            Acepta los terminos y condiciones
                        </label>
                    </div>
                    <button class="btn btn-primary btn-block" id="btnSubmit" type="button">
                        Continuar
                    </button>
                </form>
            </div>
        </div>`;
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

    hide() {
        document.getElementById("step1").classList.add("d-none");
    }

    onSubmitClick(handler) {
        document.querySelector("#btnSubmit").addEventListener("click", async (event) => {
            event.preventDefault();
            await handler();
        });
    }
}