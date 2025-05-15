const Vendor = require('../models/vendor.model.js');

const generateVendorId = async (orgId) => {
  const vendors = await Vendor.find({ orgId });

  const ids = vendors
    .map((vendor) => {
      const match = vendor.id?.match(/^Vendor-(\d+)$/);
      return match ? parseInt(match[1]) : null;
    })
    .filter((num) => num !== null);

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  return `Vendor-${maxId + 1}`;
};

module.exports = generateVendorId;
