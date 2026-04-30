import Category from "../models/category.model.js";
import { CategoryNotFoundException, CategoryAlreadyExistsException } from "../exceptions/product.exception.js";

const CategoryService = {
  async getAllCategories() {
    return await Category.getAll();
  },

  async getCategoryById(id) {
    const category = await Category.findById(id);
    if (!category) {
      throw new CategoryNotFoundException();
    }
    return category;
  },

  async createCategory(data) {
    const existing = await Category.findByName(data.name);
    if (existing) {
      throw new CategoryAlreadyExistsException(`Category with name "${data.name}" already exists`);
    }
    return await Category.create(data);
  },

  async updateCategory(id, data) {
    const category = await Category.findById(id);
    if (!category) {
      throw new CategoryNotFoundException();
    }

    if (data.name) {
      const existing = await Category.findByName(data.name);
      if (existing && existing.id !== id) {
        throw new CategoryAlreadyExistsException(`Category with name "${data.name}" already exists`);
      }
    }
    
    return await Category.update(id, data);
  },

  async deleteCategory(id) {
    const category = await Category.findById(id);
    if (!category) {
      throw new CategoryNotFoundException();
    }
    await Category.softDelete(id);
  }
};

export default CategoryService;
