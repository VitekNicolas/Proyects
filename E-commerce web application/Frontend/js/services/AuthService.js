import { ApiClient } from "../api/ApiClient.js";

const CLIENT_KEY = "client";

export class AuthService {
  static async register({ dni, firstName, lastName, address, phoneNumber, email, password }) {
    const data = await ApiClient.post(
      "/auth/register",
      { dni, firstName, lastName, address, phoneNumber, email, password },
      { auth: false }
    );
    ApiClient.setToken(data.token);
    this.setClient(data.client);
    return data.client;
  }

  static async login({ email, password }) {
    const data = await ApiClient.post("/auth/login", { email, password }, { auth: false });
    ApiClient.setToken(data.token);
    this.setClient(data.client);
    return data.client;
  }

  static logout() {
    ApiClient.clearToken();
    localStorage.removeItem(CLIENT_KEY);
    window.location.href = "./login.html";
  }

  static isLoggedIn() {
    return ApiClient.isLoggedIn();
  }

  static setClient(client) {
    localStorage.setItem(CLIENT_KEY, JSON.stringify(client));
  }

  static getClient() {
    const raw = localStorage.getItem(CLIENT_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}