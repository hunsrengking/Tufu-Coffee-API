import DepartmentService from "../services/department.service.js";
import sendResponse from "../../../../../../utils/response.js";

const DepartmentController = {
  async getAll(req, res) {
    const data = await DepartmentService.getAll();
    sendResponse(res, 200, "Departments retrieved successfully", data);
  },
  async getById(req, res) {
    const data = await DepartmentService.getById(req.params.id);
    sendResponse(res, 200, "Department found", data);
  },
  async create(req, res) {
    const data = await DepartmentService.create(req.body);
    sendResponse(res, 201, "Department created successfully", data);
  },
  async update(req, res) {
    const data = await DepartmentService.update(req.params.id, req.body);
    sendResponse(res, 200, "Department updated successfully", data);
  },
  async delete(req, res) {
    await DepartmentService.delete(req.params.id);
    sendResponse(res, 204, "Department deleted successfully");
  }
};

export default DepartmentController;
