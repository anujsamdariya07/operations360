const Vendor = require('../models/Vendor');

const createVendor = async (req, res) => {
  try {
    const { name, email, phone, gst, address } = req.body;
    const { orgId } = req.user.orgId;

    if (!name || !email || !phone || !gst || !address) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingEmail = await Vendor.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const existingGST = await Vendor.findOne({ gst });
    if (existingGST) {
      return res.status(409).json({ message: 'GST number already exists.' });
    }

    const vendor = await Vendor.create({
      orgId,
      name,
      email,
      phone,
      gst,
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
    const { orgId } = req.user.id;

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

module.exports = {
  createVendor,
  getVendorsByOrgId,
};
