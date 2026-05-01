import jwt from "jsonwebtoken";
import User from "../feature/user/models/user.model.js";
import { AppError } from "./error.middleware.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new AppError("User belonging to this token no longer exists", 401));
      }

      if (!user.is_active) {
        return next(new AppError("User account is inactive", 401));
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return next(new AppError("Invalid token. Please log in again.", 401));
    }

  }

  if (!token) {
    return next(new AppError("You are not logged in. Please provide a token.", 401));
  }
};

export const hasPermission = (permissionPath) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new AppError("Not authorized", 401));
      }

      // 1. Admin Bypass: If the user is an admin, they have all permissions.
      if (req.user.role_name === "Admin" || req.user.role_name === "admin") {
        return next();
      }

      // 2. Fragment permissionPath (e.g., 'user.read' -> resource: 'USER', action: 'READ')
      const [resource, action] = permissionPath.split(".");

      const hasPerm = await User.checkPermission(req.user.id, {
        resource: resource?.toUpperCase(),
        action: action?.toUpperCase()
      });

      if (hasPerm) {
        next();
      } else {
        next(new AppError(`Access forbidden: ${permissionPath} required`, 403));
      }
    } catch (error) {
      next(error);
    }
  };
};

export const isAdmin = async (req, res, next) => {
  if (req.user && (req.user.role_name === "Admin" || req.user.role_name === "admin")) {
    next();
  } else {
    next(new AppError("Access forbidden: Admin privilege required", 403));
  }
};
