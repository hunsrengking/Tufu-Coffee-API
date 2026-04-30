import { AppError } from "../../../middlewares/error.middleware.js";

export class EmployeeNotFoundException extends AppError {
  constructor(message = "Employee not found") {
    super(message, 404);
  }
}

export class EmployeeAlreadyExistsException extends AppError {
  constructor(message = "Employee already exists") {
    super(message, 400);
  }
}

export class InvalidEmployeeOperationException extends AppError {
  constructor(message = "Invalid operation for this employee") {
    super(message, 400);
  }
}
