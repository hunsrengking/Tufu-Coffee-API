import Joi from "joi";

const roleValidation = {
  getAll: Joi.object({}),

  findById: Joi.object({
    id: Joi.number().integer().required()
  }),

  create: Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().allow('', null),
    permissionIds: Joi.array().items(Joi.number().integer()).optional()
  }),

  update: Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().max(50),
    description: Joi.string().allow('', null),
    permissionIds: Joi.array().items(Joi.number().integer()).optional()
  }),

  disable: Joi.object({
    id: Joi.number().integer().required()
  }),

  enable: Joi.object({
    id: Joi.number().integer().required()
  }),

  delete: Joi.object({
    id: Joi.number().integer().required()
  }),

  assignPermission: Joi.object({
    id: Joi.number().integer().required(),
    permissionId: Joi.number().integer().required()
  }),

  unassignPermission: Joi.object({
    id: Joi.number().integer().required(),
    permissionId: Joi.number().integer().required()
  })
};

export default roleValidation;
