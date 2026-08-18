import "./auth-guard.js";
import { AuthService } from "./services/AuthService.js";
import { CartService } from "./services/CartService.js";
import { OrderService } from "./services/OrderService.js";
import { ProductsPage } from "./pages/ProductsPage.js";
import { CartPage } from "./pages/CartPage.js";
import { OrdersPage } from "./pages/OrdersPage.js";
import { InvoiceModal } from "./components/InvoiceModal.js";
import { showToast } from "./utils/toast.js";

const tabs = document.querySelectorAll(".navbar-tab");
const sections = document.querySelectorAll(".section");
const navUserName = document.getElementById("navUserName");
const btnLogout = document.getElementById("btnLogout");
const cartFloatBar = document.getElementById("cartFloatBar");
const cartFloatCount = document.getElementById("cartFloatCount");
const cartFloatTotal = document.getElementById("cartFloatTotal");
const btnCheckout = document.getElementById("btnCheckout");

const showSection = (name) => {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.section === name));
  sections.forEach((section) => section.classList.toggle("active", section.id === `section-${name}`));
};

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
const cartPage = new CartPage({ onCartChanged: updateCartFloatBar });
const ordersPage = new OrdersPage();
const invoiceModal = new InvoiceModal();

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showSection(tab.dataset.section);
    if (tab.dataset.section === "cart") cartPage.load();
    if (tab.dataset.section === "orders") ordersPage.load();
  });
});

btnLogout.addEventListener("click", () => AuthService.logout());

const client = AuthService.getClient();
if (client) {
  navUserName.textContent = `${client.firstName ?? ""}`.trim();
}

btnCheckout.addEventListener("click", async () => {
  btnCheckout.disabled = true;
  btnCheckout.textContent = "Procesando...";
  try {
    await OrderService.createOrder();
    const orders = await OrderService.getMyOrders();
    const lastOrderRows = orders.filter((row) => row.orderId === orders[0].orderId);
    const lastOrder = {
      date: lastOrderRows[0].date,
      total: lastOrderRows[0].total,
      items: lastOrderRows.map((row) => ({
        productName: row.productName,
        amount: row.productAmount,
        subTotal: row.subTotal,
      })),
    };
    invoiceModal.show(lastOrder);
    await updateCartFloatBar();
    await cartPage.load();
  } catch (error) {
    showToast(error.message || "No pudimos confirmar la compra.");
  } finally {
    btnCheckout.disabled = false;
    btnCheckout.textContent = "Confirmar compra";
  }
});

productsPage.load();
updateCartFloatBar();