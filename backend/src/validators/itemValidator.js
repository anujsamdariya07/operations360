const { z } = require('zod');

const itemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  description: z.string().optional(),
  quantity: z.number().positive('Quantity must be a positive number'),
  cost: z.number().positive('Cost must be a positive number'),
});

const itemUpdateSchema = itemSchema.partial();

module.exports = { itemSchema, itemUpdateSchema };
