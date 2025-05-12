const { z } = require('zod');

const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const vendorSchema = z.object({
  orgId: z.string().min(1, 'Organization ID is required'),
  name: z.string().min(1, 'Vendor name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  gst: z.string().regex(gstRegex, 'Invalid GST number format'),
  address: z.string().min(1, 'Address is required'),
});

const vendorUpdateSchema = vendorSchema.partial();

module.exports = { vendorSchema, vendorUpdateSchema };
