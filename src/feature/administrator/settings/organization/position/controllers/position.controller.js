import PositionService from "../services/position.service.js";
import sendResponse from "../../../../../../utils/response.js";

const PositionController = {
  async getAll(req, res) {
    const data = await PositionService.getAll();
    sendResponse(res, 200, "Positions retrieved successfully", data);
  },
  async getById(req, res) {
    const data = await PositionService.getById(req.params.id);
    sendResponse(res, 200, "Position found", data);
  },
  async create(req, res) {
    const data = await PositionService.create(req.body);
    sendResponse(res, 201, "Position created successfully", data);
  },
  async update(req, res) {
    const data = await PositionService.update(req.params.id, req.body);
    sendResponse(res, 200, "Position updated successfully", data);
  },
  async delete(req, res) {
    await PositionService.delete(req.params.id);
    sendResponse(res, 204, "Position deleted successfully");
  }
};

export default PositionController;
