import express from "express";
import EmployeeController from "../controllers/employee.controller.js";
import employeeValidation from "../validations/employee.validation.js";
import validate from "../../../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.post("/", validate(employeeValidation.create), EmployeeController.createEmployee);
router.put("/:id", validate(employeeValidation.update), EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

export default router;
