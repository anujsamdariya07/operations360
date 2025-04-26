const { z } = require('zod');

const organizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  email: z.string().email('Invalid email format'),
  address: z.string().min(1, 'Address is required'),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, 'Contact number must be exactly 10 digits'),
});

const organizationUpdateSchema = organizationSchema.partial();

module.exports = { organizationSchema, organizationUpdateSchema };
