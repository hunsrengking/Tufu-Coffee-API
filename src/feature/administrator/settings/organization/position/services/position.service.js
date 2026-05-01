import Position from "../models/position.model.js";

const PositionService = {
  async getAll() {
    return await Position.getAll();
  },
  async getById(id) {
    return await Position.findById(id);
  },
  async create(data) {
    return await Position.create(data);
  },
  async update(id, data) {
    return await Position.update(id, data);
  },
  async delete(id) {
    return await Position.delete(id);
  }
};

export default PositionService;
