import ProductService from "../services/product.service.js";
import sendResponse from "../../../utils/response.js";

const ProductController = {
  async getAllProducts(req, res) {
    const products = await ProductService.getAllProducts();
    sendResponse(res, 200, "Products retrieved successfully", products);
  },

  async getProductById(req, res) {
    const product = await ProductService.getProductById(req.params.id);
    sendResponse(res, 200, "Product retrieved successfully", product);
  },

  async createProduct(req, res) {
    const product = await ProductService.createProduct(req.body);
    sendResponse(res, 201, "Product created successfully", product);
  },

  async updateProduct(req, res) {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    sendResponse(res, 200, "Product updated successfully", product);
  },

  async deleteProduct(req, res) {
    await ProductService.deleteProduct(req.params.id);
    sendResponse(res, 200, "Product deleted successfully");
  }
};

export default ProductController;
