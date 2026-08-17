import { ProductService } from "../services/ProductService.js";
import { CartService } from "../services/CartService.js";
import { ProductCard } from "../components/ProductCard.js";
import { showToast } from "../utils/toast.js";

export class ProductsPage {
  constructor({ onCartChanged }) {
    this.grid = document.getElementById("productGrid");
    this.searchInput = document.getElementById("inpSearch");
    this.sortSelect = document.getElementById("selSort");
    this.onCartChanged = onCartChanged;

    this.searchInput.addEventListener("input", this.debounce(() => this.load(), 350));
    this.sortSelect.addEventListener("change", () => this.load());
  }

  debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  async load() {
    try {
      const products = await ProductService.getAll({
        name: this.searchInput.value.trim(),
        sort: this.sortSelect.value === "true",
      });
      this.render(products);
    } catch (error) {
      this.grid.innerHTML = `<div class="empty-state"><p>${error.message || "No pudimos cargar los productos."}</p></div>`;
    }
  }

  render(products) {
    this.grid.innerHTML = "";
    if (!products || products.length === 0) {
      this.grid.innerHTML = `<div class="empty-state"><p>No encontramos productos con ese nombre.</p></div>`;
      return;
    }
    products.forEach((product) => {
      const card = new ProductCard(product);
      card.onAdd = async (productId, amount) => {
        try {
          await CartService.addProduct(productId, amount);
          showToast(`${product.name} agregado al carrito`);
          if (this.onCartChanged) await this.onCartChanged();
        } catch (error) {
          showToast(error.message || "No pudimos agregar el producto.");
        }
      };
      this.grid.appendChild(card.render());
    });
  }
}