import { AuthService } from "../services/AuthService.js";

const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");
const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");
const authError = document.getElementById("authError");

const showTab = (tab) => {
  const isLogin = tab === "login";
  tabLogin.classList.toggle("active", isLogin);
  tabRegister.classList.toggle("active", !isLogin);
  formLogin.classList.toggle("active", isLogin);
  formRegister.classList.toggle("active", !isLogin);
  hideError();
};

const showError = (message) => {
  authError.textContent = message;
  authError.classList.add("visible");
};

const hideError = () => {
  authError.textContent = "";
  authError.classList.remove("visible");
};

const setLoading = (button, loading, idleText) => {
  button.disabled = loading;
  button.textContent = loading ? "Espera..." : idleText;
};

const goToApp = () => {
  window.location.href = "./index.html";
};

tabLogin.addEventListener("click", () => showTab("login"));
tabRegister.addEventListener("click", () => showTab("register"));

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  hideError();
  const btnLogin = document.getElementById("btnLogin");
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  setLoading(btnLogin, true, "Entrar");
  try {
    await AuthService.login({ email, password });
    goToApp();
  } catch (error) {
    showError(error.message || "No pudimos iniciar sesión. Revisá tus datos.");
    setLoading(btnLogin, false, "Entrar");
  }
});

formRegister.addEventListener("submit", async (event) => {
  event.preventDefault();
  hideError();
  const btnRegister = document.getElementById("btnRegister");
  const dni = parseInt(document.getElementById("regDni").value, 10);
  const firstName = document.getElementById("regFirstName").value.trim();
  const lastName = document.getElementById("regLastName").value.trim();
  const address = document.getElementById("regAddress").value.trim();
  const phoneNumber = document.getElementById("regPhoneNumber").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  if (Number.isNaN(dni)) {
    showError("El DNI debe ser un número.");
    return;
  }

  setLoading(btnRegister, true, "Crear cuenta");
  try {
    await AuthService.register({ dni, firstName, lastName, address, phoneNumber, email, password });
    goToApp();
  } catch (error) {
    showError(error.message || "No pudimos crear la cuenta. Revisá tus datos.");
    setLoading(btnRegister, false, "Crear cuenta");
  }
});