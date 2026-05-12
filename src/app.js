import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.js";
import { errorHandler, AppError } from "./middlewares/error.middleware.js";
import authRoutes from "./feature/auth/routes/auth.routes.js";
import userRoutes from "./feature/user/routes/user.routes.js";
import employeeRoutes from "./feature/employees/routes/employee.routes.js";
import positionRoutes from "./feature/administrator/settings/organization/position/routes/position.routes.js";
import departmentRoutes from "./feature/administrator/settings/organization/department/routes/department.routes.js";
import clientRoutes from "./feature/client/routes/client.routes.js";
import productRoutes from "./feature/product/routes/product.routes.js";
import categoryRoutes from "./feature/product/routes/category.routes.js";
import orderRoutes from "./feature/order/routes/order.routes.js";
import discountRoutes from "./feature/discount/routes/discount.routes.js";
import roleRoutes from "./feature/administrator/role/routes/role.routes.js";

const app = express();

// HTTP Request Logging
const morganStream = {
  write: (message) => logger.info(message.trim()),
};
app.use(morgan("dev", { stream: morganStream }));

app.use(cors());
app.use(express.json());

// Main Routes
app.get("/", (req, res) => {
  res.json("Welcome to Tufu API");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/roles", roleRoutes);


// Catch 404
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

export default app;