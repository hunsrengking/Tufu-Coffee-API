import { AppError } from "../../../middlewares/error.middleware.js";

export class InvalidCredentialsException extends AppError {
  constructor(message = "Invalid email or password") {
    super(message, 401);
  }
}

export class AccountLockedException extends AppError {
  constructor(message = "Account is locked due to multiple failed login attempts, please contact admin to unlock") {
    super(message, 403);
  }
}

export class AccountInactiveException extends AppError {
  constructor(message = "Your account is deactivated") {
    super(message, 403);
  }
}
