import { AuthService } from "./services/AuthService.js";

if (!AuthService.isLoggedIn()) {
  window.location.href = "./login.html";
}