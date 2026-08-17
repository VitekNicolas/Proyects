import "./auth-guard.js";
import { AuthService } from "./services/AuthService.js";
import { CartService } from "./services/CartService.js";
import { ProductsPage } from "./pages/ProductsPage.js";

const tabs = document.querySelectorAll(".navbar-tab");
const sections = document.querySelectorAll(".section");
const navUserName = document.getElementById("navUserName");
const btnLogout = document.getElementById("btnLogout");
const cartFloatBar = document.getElementById("cartFloatBar");
const cartFloatCount = document.getElementById("cartFloatCount");
const cartFloatTotal = document.getElementById("cartFloatTotal");

const showSection = (name) => {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.section === name));
  sections.forEach((section) => section.classList.toggle("active", section.id === `section-${name}`));
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showSection(tab.dataset.section));
});

btnLogout.addEventListener("click", () => AuthService.logout());

const client = AuthService.getClient();
if (client) {
  navUserName.textContent = `${client.firstName ?? ""}`.trim();
}

const updateCartFloatBar = async () => {
  try {
    const cart = await CartService.getMyCart();
    const count = cart.items.reduce((sum, item) => sum + item.amount, 0);
    cartFloatCount.textContent = `${count} producto${count === 1 ? "" : "s"}`;
    cartFloatTotal.textContent = `$${cart.total}`;
    cartFloatBar.classList.toggle("visible", count > 0);
    return cart;
  } catch {
    cartFloatBar.classList.remove("visible");
    return null;
  }
};

const productsPage = new ProductsPage({ onCartChanged: updateCartFloatBar });

document.addEventListener("DOMContentLoaded", () => {
  productsPage.load();
  updateCartFloatBar();
});

window.__app = { updateCartFloatBar, showSection };