import { registerClient, loginClient } from "../services/fetch.js";

export const submitClient = async () => {
    let name = document.getElementById("inpName").value;
    let lastName = document.getElementById("inpLastName").value;
    let userName = document.getElementById("userName").value;
    let city = document.getElementById("inpCity").value;
    let state = document.getElementById("inpState").value;
    let zipCode = document.getElementById("inpZipCode").value;
    let password = document.getElementById("inpPassword").value;
    const registered = await registerClient(name, lastName, userName, city, state, zipCode, password);
    if (registered) {
        const loggedIn = await loginClient(userName, password);
        if (loggedIn) {
            document.querySelector("#btnAnalize").disabled = false;
        } else {
            alert("No se pudo iniciar sesión automáticamente. Intente de nuevo.");
        }
    }
};