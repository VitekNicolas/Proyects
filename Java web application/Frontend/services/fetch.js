import { showAlert } from "../functions/ShowAlert.js";

const clientUrl = "http://localhost:8080/client";
const resultUrl = "http://localhost:8080/result";
const authUrl = "http://localhost:8080/auth/login";
const analyzeUrl = "http://localhost:8080/analyze";
const API_KEY = "una-clave-larga-y-dificil-de-adivinar";

let authToken = null;

export const registerClient = async (
  name,
  lastName,
  userName,
  city,
  state,
  zipCode,
  password
) => {
  const response = await fetch(clientUrl, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      name: name,
      lastName: lastName,
      userName: userName,
      city: city,
      state: state,
      zipCode: zipCode,
      password: password,
    }),
  });

  if (response.ok) {
    return true;
  }

  if (response.status === 400) {
    const error = await response.json();
    showAlert("Datos inválidos: " + JSON.stringify(error));
  } else {
    showAlert("No se pudo registrar el cliente. Intente con otro nombre de usuario.");
  }
  return false;
};

export const loginClient = async (userName, password) => {
  const response = await fetch(authUrl, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ userName, password }),
  });

  if (response.ok) {
    const json = await response.json();
    authToken = json.token;
    return true;
  }

  console.error("Login fallido");
  return false;
};

export const registerResult = async (
  userName,
  scoreTag,
  irony,
  subjectivity,
  agreement,
  confidence
) => {
  if (!authToken) {
    showAlert("Sesión no iniciada. Vuelva a registrarse.");
    return;
  }

  await fetch(`${resultUrl}/${userName}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
    },
    method: "POST",
    body: JSON.stringify({
      scoreTag: scoreTag,
      irony: irony,
      subjectivity: subjectivity,
      agreement: agreement,
      confidence: confidence,
    }),
  })
    .then((httpResponse) => {
      if (httpResponse.ok) {
        return httpResponse.json();
      }
      if (httpResponse.status === 401) {
        showAlert("Sesión expirada. Vuelva a registrarse.");
      }
    })
    .then(() => console.log("Resultado agregado"));
};

export const analizeText = async (text, callback) => {
  await fetch(analyzeUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify({ text: text }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      callback({
        score_tag: json.scoreTag,
        irony: json.irony,
        subjectivity: json.subjectivity,
        agreement: json.agreement,
        confidence: json.confidence,
      });
    })
    .catch((error) => {
      console.error("Error al hacer la solicitud:", error);
      showAlert("No se pudo analizar el texto. Intente de nuevo.");
    });
};