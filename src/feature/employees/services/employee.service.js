import Employee from "../models/employee.model.js";
import { EmployeeNotFoundException, EmployeeAlreadyExistsException } from "../exceptions/employees.exception.js";

const EmployeeService = {
  async getAllEmployees() {
    return await Employee.getAll();
  },

  async getEmployeeById(id) {
    const employee = await Employee.findById(id);
    if (!employee) throw new EmployeeNotFoundException("Employee not found", 404);
    return employee;
  },

  async createEmployee(data) {
    // Check if email exists
    const existing = await Employee.findByEmail(data.email);
    if (existing) throw new EmployeeAlreadyExistsException("Employee with this email already exists", 400);
    
    return await Employee.create(data);
  },

  async updateEmployee(id, data) {
    // If updating email, check uniqueness
    if (data.email) {
      const existing = await Employee.findByEmail(data.email);
      if (existing && existing.id !== parseInt(id)) {
        throw new EmployeeAlreadyExistsException("Email is already in use by another employee", 400);
      }
    }

    const employee = await Employee.findById(id);
    if (!employee) throw new EmployeeNotFoundException("Employee not found", 404);

    return await Employee.update(id, data);
  },

  async deleteEmployee(id) {
    const employee = await Employee.findById(id);
    if (!employee) throw new AppError("Employee not found", 404);
    
    await Employee.delete(id);
  }
};

export default EmployeeService;
