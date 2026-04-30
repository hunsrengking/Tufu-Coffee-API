import Discount from "../models/discount.model.js";

const DiscountService = {
  async getAllDiscounts() {
    return await Discount.getAll();
  },

  async getDiscountByCode(code) {
    return await Discount.findByCode(code);
  },

  async createDiscount(data) {
    return await Discount.create(data);
  },

  async updateDiscount(id, data) {
    return await Discount.update(id, data);
  },

  async validateAndApplyDiscount(code, totalAmount) {
    const discount = await Discount.findByCode(code);
    if (!discount) {
      throw new Error("Invalid discount code or code is no longer active");
    }

    const now = new Date();
    if (discount.start_date && now < new Date(discount.start_date)) {
      throw new Error("Discount code is not yet available");
    }
    if (discount.end_date && now > new Date(discount.end_date)) {
      throw new Error("Discount code has expired");
    }
    if (discount.usage_limit && discount.used_count >= discount.usage_limit) {
      throw new Error("Discount code usage limit exceeded");
    }
    if (totalAmount < discount.min_order_amount) {
      throw new Error(`Minimum order amount of ${discount.min_order_amount} required to use this code`);
    }

    let discountAmount = 0;
    if (discount.type === "percentage") {
      discountAmount = totalAmount * (discount.value / 100);
      if (discount.max_discount_amount && discountAmount > discount.max_discount_amount) {
        discountAmount = discount.max_discount_amount;
      }
    } else if (discount.type === "fixed") {
      discountAmount = discount.value;
    }

    // Ensure discount doesn't exceed total amount
    if (discountAmount > totalAmount) {
      discountAmount = totalAmount;
    }

    return { discount, discountAmount };
  },

  async useDiscount(id) {
    await Discount.incrementUsage(id);
  }
};

export default DiscountService;
