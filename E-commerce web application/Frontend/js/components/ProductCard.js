export class ProductCard {
  constructor(product) {
    this.product = product;
  }

  render() {
    const { productId, image, name, brand, price, description } = this.product;
    const el = document.createElement("div");
    el.className = "product-card";
    el.innerHTML = `
      <img src="${image}" alt="${name}" />
      <h3>${name}</h3>
      <p class="brand">${brand ?? ""}</p>
      <p class="price">$${price}</p>
      <div class="amount-control">
        <button type="button" data-action="decrease">-</button>
        <input type="number" min="0" value="0" readonly data-role="amount" />
        <button type="button" data-action="increase">+</button>
      </div>
      <button class="btn-outline" type="button" data-action="add" disabled>Agregar al carrito</button>
    `;

    const input = el.querySelector('[data-role="amount"]');
    const addBtn = el.querySelector('[data-action="add"]');
    const decreaseBtn = el.querySelector('[data-action="decrease"]');

    el.querySelector('[data-action="increase"]').addEventListener("click", () => {
      input.value = parseInt(input.value, 10) + 1;
      addBtn.disabled = false;
      decreaseBtn.disabled = false;
    });

    decreaseBtn.addEventListener("click", () => {
      const newValue = Math.max(parseInt(input.value, 10) - 1, 0);
      input.value = newValue;
      addBtn.disabled = newValue === 0;
      decreaseBtn.disabled = newValue === 0;
    });

    addBtn.addEventListener("click", async () => {
      const amount = parseInt(input.value, 10);
      if (amount > 0 && this.onAdd) {
        addBtn.disabled = true;
        addBtn.textContent = "Agregando...";
        await this.onAdd(productId, amount);
        addBtn.textContent = "Agregado ✓";
        setTimeout(() => {
          addBtn.textContent = "Agregar al carrito";
          addBtn.disabled = input.value === "0";
        }, 1200);
      }
    });
    return el;
  }
}