import { AppError } from "../../../middlewares/error.middleware.js";

export class SlideNotFoundException extends AppError {
    constructor(message = "Slide not found") {
        super(message, 404);
    }
}

export class SlideAlreadyExistsException extends AppError {
    constructor(message = "Slide already exists with this email") {
        super(message, 400);
    }
}

export class InvalidSlideOperationException extends AppError {
    constructor(message = "Invalid operation for this slide") {
        super(message, 400);
    }
}

export class InvalidSlideCredentialsException extends AppError {
    constructor(message = "Invalid email or password") {
        super(message, 401);
    }
}
