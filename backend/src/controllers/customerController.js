const Customer = require('../models/customer.model');
const generateCustomerId = require('../utils/generateCustomerId'); // Adjust path as needed

const createCustomer = async (req, res) => {
  try {
    const orgId = req.user.orgId;
    const { name, phone, email, address, gstNo } = req.body;

    if (!orgId || !name || !phone || !email || !address) {
      return res.status(400).json({
        error:
          'Missing required fields: orgId, name, phone, email, or address.',
      });
    }

    const existingCustomer = await Customer.findOne({
      orgId,
      $or: [{ email }, { gstNo }],
    });

    if (existingCustomer) {
      return res.status(409).json({
        error: 'Customer with the same email or GST number already exists.',
      });
    }

    const customerId = await generateCustomerId(orgId);

    const customer = new Customer({
      id: customerId,
      orgId,
      name,
      phone,
      email,
      address,
      gstNo,
      status: 'active',
      orders: [],
    });

    await customer.save();

    return res.status(201).json({
      message: 'Customer created successfully!',
      customer,
    });
  } catch (err) {
    console.error('Error creating customer:', err);
    return res.status(500).json({
      error:
        err.message ||
        'An unexpected error occurred while creating the customer.',
    });
  }
};

// READ ALL
const getAllCustomersByOrgId = async (req, res) => {
  try {
    const orgId = req.user.orgId;

    if (!orgId) {
      return res.status(403).json({
        error: 'Unauthorized. Organization ID missing.',
      });
    }

    const customers = await Customer.find({ orgId });

    return res.status(200).json({
      message: 'Customers fetched successfully!',
      customers,
    });
  } catch (err) {
    console.error('Error fetching customers by orgId:', err);
    return res.status(500).json({
      error:
        err.message ||
        'An unexpected error occurred while fetching customers.',
    });
  }
};

// READ ONE
const getCustomerById = async (req, res) => {
  // console.log(('server-1')
  try {
    // console.log(('server-2')
    const orgId = req.user.orgId;
    // console.log(('server-3')
    // console.log(('orgId', orgId)
    const { id } = req.params;
    // console.log(('server-4')
    // console.log(('id', id)
    
    if (!orgId || !id) {
      return res.status(400).json({
        error: 'Missing required parameters: orgId or customer id.',
      });
      // console.log((('server-5')
    }
    
    const customer = await Customer.findOne({ orgId, id });
    // console.log((('server-6')
    
    if (!customer) {
      // console.log((('server-7')
      return res.status(404).json({
        error: 'Customer not found within your organization.',
      });
    }

    return res.status(200).json({
      message: 'Customer fetched successfully!',
      customer,
    });
  } catch (err) {
    console.error('Error fetching customer by ID:', err);
    return res.status(500).json({
      error:
        err.message ||
        'An unexpected error occurred while fetching the customer.',
    });
  }
};


// UPDATE
const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomersByOrgId,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
