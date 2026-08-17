import { ApiClient } from "../api/ApiClient.js";

export class ProductService {
  static async getAll({ name = "", sort = false } = {}) {
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    params.set("sort", sort);
    return ApiClient.get(`/product?${params.toString()}`);
  }

  static async getById(id) {
    return ApiClient.get(`/product/${id}`);
  }
}