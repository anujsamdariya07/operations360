const { z } = require('zod');

const employeeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  mobile: z
    .string()
    .regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  role: z.enum(['admin', 'manager', 'employee']),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
});

const employeeUpdateSchema = employeeSchema.partial();

module.exports = { employeeSchema, employeeUpdateSchema };
