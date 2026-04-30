import DiscountService from "../services/discount.service.js";
import sendResponse from "../../../utils/response.js";

const DiscountController = {
  async getAllDiscounts(req, res) {
    const discounts = await DiscountService.getAllDiscounts();
    sendResponse(res, 200, "Discounts retrieved successfully", discounts);
  },

  async createDiscount(req, res) {
    const discount = await DiscountService.createDiscount(req.body);
    sendResponse(res, 201, "Discount created successfully", discount);
  },

  async updateDiscount(req, res) {
    const discount = await DiscountService.updateDiscount(req.params.id, req.body);
    sendResponse(res, 200, "Discount updated successfully", discount);
  },

  async validateCode(req, res) {
    const { code, totalAmount } = req.body;
    const { discount, discountAmount } = await DiscountService.validateAndApplyDiscount(code, parseFloat(totalAmount));
    sendResponse(res, 200, "Discount code valid", { code: discount.code, discountAmount, finalAmount: totalAmount - discountAmount });
  }
};

export default DiscountController;
