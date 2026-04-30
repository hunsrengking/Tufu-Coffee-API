import { AppError } from "../../../middlewares/error.middleware.js";

export class ClientNotFoundException extends AppError {
  constructor(message = "Client not found") {
    super(message, 404);
  }
}

export class ClientAlreadyExistsException extends AppError {
  constructor(message = "Client already exists with this email") {
    super(message, 400);
  }
}

export class InvalidClientOperationException extends AppError {
  constructor(message = "Invalid operation for this client") {
    super(message, 400);
  }
}

// Keep UserNotFoundException as fallback if service still uses it
export class UserNotFoundException extends ClientNotFoundException {}

export class InvalidCredentialsException extends AppError {
  constructor(message = "Invalid email or password") {
    super(message, 401);
  }
}
