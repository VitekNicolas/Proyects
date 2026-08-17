import { ApiClient } from "../api/ApiClient.js";

export class CartService {
  static async getMyCart() {
    return ApiClient.get("/cart");
  }

  static async addProduct(productId, amount) {
    return ApiClient.post("/productcart", { productId, amount });
  }

  static async updateProduct(productId, amount) {
    return ApiClient.patch("/productcart", { productId, amount });
  }

  static async removeProduct(productId) {
    return ApiClient.delete(`/productcart/${productId}`);
  }
}