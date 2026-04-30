import { AppError } from "../../../middlewares/error.middleware.js";

export class ProductNotFoundException extends AppError {
  constructor(message = "Product not found") {
    super(message, 404);
  }
}

export class CategoryNotFoundException extends AppError {
  constructor(message = "Category not found") {
    super(message, 404);
  }
}

export class CategoryAlreadyExistsException extends AppError {
  constructor(message = "Category already exists") {
    super(message, 400);
  }
}

export class InsufficientStockException extends AppError {
  constructor(message = "Insufficient stock for this product") {
    super(message, 400);
  }
}
