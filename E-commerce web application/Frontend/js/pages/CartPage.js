import { CartService } from "../services/CartService.js";
import { CartItemRow } from "../components/CartItemRow.js";
import { showToast } from "../utils/toast.js";

export class CartPage {
  constructor({ onCartChanged }) {
    this.list = document.getElementById("cartList");
    this.onCartChanged = onCartChanged;
  }

  async load() {
    try {
      const cart = await CartService.getMyCart();
      this.render(cart);
    } catch (error) {
      this.list.innerHTML = `<div class="empty-state"><p>${error.message || "No pudimos cargar tu carrito."}</p></div>`;
    }
  }

  render(cart) {
    this.list.innerHTML = "";
    if (!cart.items || cart.items.length === 0) {
      this.list.innerHTML = `<div class="empty-state"><p>Tu carrito está vacío. Agregá productos desde la sección Productos.</p></div>`;
      return;
    }
    cart.items.forEach((item) => {
      const row = new CartItemRow(item);
      row.onUpdate = async (productId, amount) => {
        try {
          await CartService.updateProduct(productId, amount);
          await this.load();
          if (this.onCartChanged) await this.onCartChanged();
        } catch (error) {
          showToast(error.message || "No pudimos actualizar el producto.");
        }
      };
      row.onRemove = async (productId) => {
        try {
          await CartService.removeProduct(productId);
          showToast("Producto quitado del carrito");
          await this.load();
          if (this.onCartChanged) await this.onCartChanged();
        } catch (error) {
          showToast(error.message || "No pudimos quitar el producto.");
        }
      };
      this.list.appendChild(row.render());
    });
  }
}