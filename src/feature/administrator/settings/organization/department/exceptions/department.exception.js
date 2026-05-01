import { AppError } from "../../../../../../middlewares/error.middleware.js";

export class DepartmentNotFoundException extends AppError {
  constructor(message = "Department not found") {
    super(message, 404);
  }
}

export class DepartmentAlreadyExistsException extends AppError {
  constructor(message = "Department already exists") {
    super(message, 400);
  }
}

export class InvalidDepartmentOperationException extends AppError {
  constructor(message = "Invalid operation for this department") {
    super(message, 400);
  }
}

export class DepartmentHeadNotFoundException extends AppError {
  constructor(message = "Department head not found") {
    super(message, 404);
  }
}
