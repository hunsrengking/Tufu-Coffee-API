import EmployeeService from "../services/employee.service.js";
import sendResponse from "../../../utils/response.js";

const EmployeeController = {
  async getAllEmployees(req, res) {
    const data = await EmployeeService.getAllEmployees();
    sendResponse(res, 200, "Employees retrieved successfully", data);
  },

  async getEmployeeById(req, res) {
    const data = await EmployeeService.getEmployeeById(req.params.id);
    sendResponse(res, 200, "Employee found", data);
  },

  async createEmployee(req, res) {
    const data = await EmployeeService.createEmployee(req.body);
    sendResponse(res, 201, "Employee created successfully", data);
  },

  async updateEmployee(req, res) {
    const data = await EmployeeService.updateEmployee(req.params.id, req.body);
    sendResponse(res, 200, "Employee updated successfully", data);
  },

  async deleteEmployee(req, res) {
    await EmployeeService.deleteEmployee(req.params.id);
    sendResponse(res, 204, "Employee deleted successfully");
  }
};

export default EmployeeController;
