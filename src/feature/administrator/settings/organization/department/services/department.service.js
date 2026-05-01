import Department from "../models/department.model.js";

const DepartmentService = {
  async getAll() {
    return await Department.getAll();
  },
  async getById(id) {
    return await Department.findById(id);
  },
  async create(data) {
    return await Department.create(data);
  },
  async update(id, data) {
    return await Department.update(id, data);
  },
  async delete(id) {
    return await Department.delete(id);
  }
};

export default DepartmentService;
