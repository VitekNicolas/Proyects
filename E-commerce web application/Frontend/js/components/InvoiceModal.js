export class InvoiceModal {
  constructor() {
    this.overlay = document.getElementById("invoiceModal");
    this.dateEl = document.getElementById("invoiceDate");
    this.itemsEl = document.getElementById("invoiceItems");
    this.totalEl = document.getElementById("invoiceTotal");
    document.getElementById("btnCloseInvoice").addEventListener("click", () => this.hide());
  }

  show(order) {
    const date = new Date(order.date);
    this.dateEl.textContent = date.toLocaleString("es-AR");
    this.itemsEl.innerHTML = order.items
      .map(
        (item) => `
        <div class="invoice-item">
          <span>${item.productName} <span class="muted">x${item.amount}</span></span>
          <span>$${item.subTotal}</span>
        </div>`
      )
      .join("");
    this.totalEl.textContent = `$${order.total}`;
    this.overlay.classList.add("visible");
  }

  hide() {
    this.overlay.classList.remove("visible");
  }
}