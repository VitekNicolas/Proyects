export class ApiClient {
  static baseUrl = window.__API_BASE_URL__ || "http://localhost:7062/api";

  static getToken() {
    return localStorage.getItem("token");
  }

  static setToken(token) {
    localStorage.setItem("token", token);
  }

  static clearToken() {
    localStorage.removeItem("token");
  }

  static isLoggedIn() {
    return !!this.getToken();
  }

  static async request(path, { method = "GET", body = null, auth = true } = {}) {
    const headers = { "Content-Type": "application/json" };

    if (auth) {
      const token = this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (response.status === 401) {
      this.clearToken();
      window.location.href = "./login.html";
      throw new Error("Sesión expirada. Iniciá sesión de nuevo.");
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(errorText || `Error ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    return this.unwrapRefs(data);
  }

  static get(path, options = {}) {
    return this.request(path, { ...options, method: "GET" });
  }

  static post(path, body, options = {}) {
    return this.request(path, { ...options, method: "POST", body });
  }

  static patch(path, body, options = {}) {
    return this.request(path, { ...options, method: "PATCH", body });
  }

  static delete(path, options = {}) {
    return this.request(path, { ...options, method: "DELETE" });
  }

  static unwrapRefs(data) {
    if (Array.isArray(data)) {
      return data.map((item) => this.unwrapRefs(item));
    }
    if (data && typeof data === "object") {
      if ("$values" in data) {
        return this.unwrapRefs(data.$values);
      }
      const clean = {};
      for (const key in data) {
        if (key === "$id" || key === "$ref") continue;
        clean[key] = this.unwrapRefs(data[key]);
      }
      return clean;
    }
    return data;
  }
}