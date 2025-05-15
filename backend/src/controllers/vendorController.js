const Vendor = require('../models/vendor.model');
const generateVendorId = require('../utils/generateVendorId');

const createVendor = async (req, res) => {
  try {
    const { name, email, phone, gstNo, address, status } = req.body;
    const orgId = req.user.orgId;

    if (!name || !email || !phone || !gstNo || !address) {
      console.log(req.body)
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingEmail = await Vendor.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const existingGST = await Vendor.findOne({ gstNo });
    if (existingGST) {
      return res.status(409).json({ message: 'GST number already exists.' });
    }

    const id = await generateVendorId(orgId)

    const vendor = await Vendor.create({
      orgId,
      id,
      name,
      email,
      phone,
      gstNo,
      status: 'active',
      address,
    });
    res.status(201).json({ message: 'Vendor Successfully Created!', vendor });
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ message: 'Server error.', error });
  }
};

const getVendorsByOrgId = async (req, res) => {
  try {
    const orgId = req.user.orgId;

    if (!orgId) {
      return res.status(400).json({ message: 'orgId is required.' });
    }

    const vendors = await Vendor.find({ orgId }).sort({ createdAt: -1 });
    res.status(200).json({ vendors });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getVendorById = async (req, res) => {
  try {
    const orgId = req.user.orgId; 
    const { id } = req.params;
    
    if (!orgId || !id) {
      return res.status(400).json({
        message: 'Missing required parameters: orgId or vendor id.',
      });
    }
    
    const vendor = await Vendor.findOne({ orgId, id });
    
// console.log(server-6')
    if (!vendor) {
  // console.log(server-7')
      return res.status(404).json({
        message: 'Vendor not found within your organization.',
      });
    }
    
// console.log(server-8')
    return res.status(200).json({
      message: 'Vendor fetched successfully!',
      vendor,
    });
  } catch (error) {
    console.error('Error fetching vendor by id:', error);
    return res.status(500).json({
      message: 'Server error.',
      error: error.message,
    });
  }
};


module.exports = {
  createVendor,
  getVendorsByOrgId,
  getVendorById
};
