import { AppError } from "../../../../../middlewares/error.middleware.js";

export class PositionNotFoundException extends AppError {
  constructor(message = "Position not found") {
    super(message, 404);
  }
}

export class PositionAlreadyExistsException extends AppError {
  constructor(message = "Position already exists") {
    super(message, 400);
  }
}

export class InvalidPositionOperationException extends AppError {
  constructor(message = "Invalid operation for this position") {
    super(message, 400);
  }
}
