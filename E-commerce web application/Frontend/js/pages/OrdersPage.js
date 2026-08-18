import { OrderService } from "../services/OrderService.js";

export class OrdersPage {
  constructor() {
    this.list = document.getElementById("orderList");
  }

  groupByOrder(rows) {
    const grouped = new Map();
    rows.forEach((row) => {
      if (!grouped.has(row.orderId)) {
        grouped.set(row.orderId, { orderId: row.orderId, date: row.date, total: row.total, items: [] });
      }
      grouped.get(row.orderId).items.push({
        productName: row.productName,
        amount: row.productAmount,
        price: row.productPrice,
        subTotal: row.subTotal,
      });
    });
    return Array.from(grouped.values());
  }

  async load() {
    try {
      const rows = await OrderService.getMyOrders();
      const orders = this.groupByOrder(rows);
      this.render(orders);
    } catch (error) {
      this.list.innerHTML = `<div class="empty-state"><p>${error.message || "No pudimos cargar tu historial."}</p></div>`;
    }
  }

  render(orders) {
    this.list.innerHTML = "";
    if (orders.length === 0) {
      this.list.innerHTML = `<div class="empty-state"><p>Todavía no hiciste ninguna compra.</p></div>`;
      return;
    }
    orders.forEach((order) => {
      const row = document.createElement("div");
      row.className = "order-row";
      const date = new Date(order.date).toLocaleDateString("es-AR");
      row.innerHTML = `
        <div style="display:flex;justify-content:space-between;width:100%">
          <span class="muted">${date} — Orden #${order.orderId}</span>
          <span>$${order.total}</span>
        </div>
      `;
      const details = document.createElement("div");
      details.className = "order-row-details";
      details.innerHTML = order.items
        .map((item) => `<span>${item.productName} x${item.amount} — $${item.subTotal}</span>`)
        .join("");

      row.addEventListener("click", () => details.classList.toggle("visible"));

      const wrapper = document.createElement("div");
      wrapper.appendChild(row);
      wrapper.appendChild(details);
      this.list.appendChild(wrapper);
    });
  }
}