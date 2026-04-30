import CategoryService from "../services/category.service.js";
import sendResponse from "../../../utils/response.js";

const CategoryController = {
  async getAllCategories(req, res) {
    const categories = await CategoryService.getAllCategories();
    sendResponse(res, 200, "Categories retrieved successfully", categories);
  },

  async getCategoryById(req, res) {
    const category = await CategoryService.getCategoryById(req.params.id);
    sendResponse(res, 200, "Category retrieved successfully", category);
  },

  async createCategory(req, res) {
    const category = await CategoryService.createCategory(req.body);
    sendResponse(res, 201, "Category created successfully", category);
  },

  async updateCategory(req, res) {
    const category = await CategoryService.updateCategory(req.params.id, req.body);
    sendResponse(res, 200, "Category updated successfully", category);
  },

  async deleteCategory(req, res) {
    await CategoryService.deleteCategory(req.params.id);
    sendResponse(res, 200, "Category deleted successfully");
  }
};

export default CategoryController;
