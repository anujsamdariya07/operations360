const Organization = require('../models/organization.model');

const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobileNo, email, gstNo, address } = req.body;

    if (!id) {
      return res.status(400).json({
        message: 'Organization ID is required.',
      });
    }

    const updates = {};
    if (name) updates.name = name;
    if (mobileNo) updates.mobileNo = mobileNo;
    if (email) updates.email = email;
    if (gstNo) updates.gstNo = gstNo;
    if (address) updates.address = address;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No fields provided to update.' });
    }

    const organization = await Organization.findById(id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found.' });
    }

    if (email && email !== organization.email) {
      const existingEmailOrg = await Organization.findOne({ email });
      if (existingEmailOrg) {
        return res.status(409).json({
          message: 'Email is already in use by another organization.',
        });
      }
    }

    if (gstNo && gstNo !== organization.gstNo) {
      const existingGstOrg = await Organization.findOne({ gstNo });
      if (existingGstOrg) {
        return res.status(409).json({
          message: 'GST Number is already in use by another organization.',
        });
      }
    }

    const updatedOrganization = await Organization.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: 'Organization details updated successfully.',
      organization: updatedOrganization,
    });
  } catch (error) {
    console.error('Update Organization Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const getOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Organization ID is required.' });
    }

    const organization = await Organization.findById(id).select('-password'); // Exclude password

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found.' });
    }

    return res.status(200).json({ organization });
  } catch (error) {
    console.error('Get Organization Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Organization ID is required.' });
    }

    const organization = await Organization.findById(id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found.' });
    }

    await Organization.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: 'Organization deleted successfully.' });
  } catch (error) {
    console.error('Delete Organization Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { updateOrganization, getOrganization, deleteOrganization };
