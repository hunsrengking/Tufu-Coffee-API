import { AppError } from "../../../middlewares/error.middleware.js";

export class OrderNotFoundException extends AppError {
  constructor(message = "Order not found") {
    super(message, 404);
  }
}

export class OrderCannotBeModifiedException extends AppError {
  constructor(message = "Order cannot be modified in current status") {
    super(message, 400);
  }
}

export class OrderPermissionDeniedException extends AppError {
  constructor(message = "Unauthorized to access this order") {
    super(message, 403);
  }
}
