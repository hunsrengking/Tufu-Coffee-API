import { AppError } from "../../../middlewares/error.middleware.js";

export class UserNotFoundException extends AppError {
  constructor(message = "User not found") {
    super(message, 404);
  }
}

export class UserAlreadyExistsException extends AppError {
  constructor(message = "User already exists with this email") {
    super(message, 400);
  }
}

export class InvalidUserOperationException extends AppError {
  constructor(message = "Invalid operation for this user") {
    super(message, 400);
  }
}
