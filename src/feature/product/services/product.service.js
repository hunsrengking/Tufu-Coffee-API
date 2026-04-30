import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { ProductNotFoundException, CategoryNotFoundException } from "../exceptions/product.exception.js";

const ProductService = {
  async getAllProducts() {
    return await Product.getAll();
  },

  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    return product;
  },

  async createProduct(data) {
    if (data.category_id) {
      const category = await Category.findById(data.category_id);
      if (!category) {
        throw new CategoryNotFoundException();
      }
    }
    return await Product.create(data);
  },

  async updateProduct(id, data) {
    const product = await Product.findById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    
    if (data.category_id) {
      const category = await Category.findById(data.category_id);
      if (!category) {
        throw new CategoryNotFoundException();
      }
    }
    
    return await Product.update(id, data);
  },

  async deleteProduct(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    await Product.softDelete(id);
  }
};

export default ProductService;
