import { ApiClient } from "../api/ApiClient.js";

export class OrderService {
  static async createOrder() {
    return ApiClient.post("/order", null);
  }

  static async getMyOrders() {
    return ApiClient.get("/order/my-orders");
  }

  static async getBalance(from, to) {
    const params = new URLSearchParams({ from, to });
    return ApiClient.get(`/order?${params.toString()}`, { auth: false });
  }
}