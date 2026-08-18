export class CartItemRow {
  constructor(item) {
    this.item = item;
  }

  render() {
    const { productId, productName, price, amount, subTotal } = this.item;
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <div class="info">
        <h4>${productName}</h4>
        <p>$${price} x ${amount} = $${subTotal}</p>
      </div>
      <div class="actions">
        <div class="amount-control">
          <button type="button" data-action="decrease">-</button>
          <input type="number" min="1" value="${amount}" readonly data-role="amount" />
          <button type="button" data-action="increase">+</button>
        </div>
        <button class="btn-icon" type="button" data-action="remove" aria-label="Quitar producto">✕</button>
      </div>
    `;

    const input = el.querySelector('[data-role="amount"]');

    el.querySelector('[data-action="increase"]').addEventListener("click", () => {
      input.value = parseInt(input.value, 10) + 1;
      this.onUpdate?.(productId, parseInt(input.value, 10));
    });

    el.querySelector('[data-action="decrease"]').addEventListener("click", () => {
      const newValue = Math.max(parseInt(input.value, 10) - 1, 1);
      input.value = newValue;
      this.onUpdate?.(productId, newValue);
    });

    el.querySelector('[data-action="remove"]').addEventListener("click", () => {
      this.onRemove?.(productId);
    });

    return el;
  }
}