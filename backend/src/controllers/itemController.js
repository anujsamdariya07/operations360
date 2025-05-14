const cloudinary = require('cloudinary');
const Item = require('../models/item.model');
const Employee = require('../models/employee.model');
const Message = require('../models/message.model');
const generateItemId = require('../utils/generateItemId');

const getAllItems = async (req, res) => {
  try {
    const orgId = req.user.orgId;
    console.log('orgId:', orgId);

    const items = await Item.find({ orgId });

    return res.status(200).json({
      message: 'Items fetched successfully.',
      count: items.length,
      items,
    });
  } catch (error) {
    console.error('Get All Items Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const getItem = async (req, res) => {
  try {
    const orgId = req.user.orgId;
    const { id } = req.params;

    const item = await Item.findOne({ id, orgId });

    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    return res.status(200).json({ item });
  } catch (error) {
    console.error('Get Item Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const createItem = async (req, res) => {
  try {
    const {
      name,
      quantity = 0,
      threshold = 10,
      image,
      vendor: vendorName,
      cost,
    } = req.body;

    console.log('req.body', req.body);

    if (!name || cost == null || !vendorName) {
      return res.status(400).json({
        message: 'Name, vendorName and cost are required.',
      });
    }

    if (isNaN(cost)) {
      return res.status(400).json({
        message: 'Cost must be a valid number.',
      });
    }

    const orgId = req.user.orgId;

    if (!orgId) {
      return res.status(403).json({
        message: 'Unauthorized. Organization ID missing.',
      });
    }

    let imageUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6ZeL1Ntu-zwEcgRli39ynixVj9yeQtfjAw&s';

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'inventory-items',
      });
      imageUrl = uploadResponse.secure_url;
    }

    const id = await generateItemId(orgId);

    const newItem = await Item.create({
      orgId,
      id,
      name: name.trim(),
      quantity,
      threshold,
      image: imageUrl,
      updateHistory: [
        {
          vendorName: vendorName.trim(),
          quantityUpdated: quantity,
          cost,
        },
      ],
    });
    console.log('createItem-server');

    return res.status(201).json({
      message: 'Item created successfully.',
      item: newItem,
    });
  } catch (error) {
    console.error('Create Item Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

// const updateItem = async (req, res) => {
//   try {
//     const { id: itemId } = req.params;
//     const { name, quantity, threshold, image, vendorName, cost } = req.body;

//     if (!vendorName || cost == null) {
//       return res.status(400).json({
//         message: 'vendorName and cost are required for updating history.',
//       });
//     }

//     const orgId = req.user.orgId;

//     if (!orgId) {
//       return res
//         .status(403)
//         .json({ message: 'Unauthorized. Organization ID missing.' });
//     }

//     const item = await Item.findOne({ _id: itemId, orgId });

//     if (!item) {
//       return res.status(404).json({ message: 'Item not found.' });
//     }

//     let imageUrl = item.image;
//     if (image) {
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     const quantityUpdated = quantity - item.quantity;

//     item.name = name || item.name;
//     item.quantity = quantity ?? item.quantity;
//     item.threshold = threshold ?? item.threshold;
//     item.image = imageUrl;
//     item.updateHistory.push({
//       vendorName,
//       quantityUpdated,
//       cost,
//     });

//     await item.save();

//     return res.status(200).json({
//       message: 'Item updated successfully.',
//       item,
//     });
//   } catch (error) {
//     console.error('Update Item Error:', error);
//     return res
//       .status(500)
//       .json({ message: 'Server error. Please try again later.' });
//   }
// };

// const updateItem = async (req, res) => {
//   try {
//     const { id: itemId } = req.params;
//     const { name, quantity, threshold, image, vendorName, cost } = req.body;

//     if (!vendorName || cost == null) {
//       return res.status(400).json({
//         message: 'vendorName and cost are required for updating history.',
//       });
//     }

//     console.log('HERE');

//     const orgId = req.user.orgId;

//     if (!orgId) {
//       return res.status(403).json({ message: 'Unauthorized. Organization ID missing.' });
//     }

//     const item = await Item.findOne({ id: itemId, orgId });

//     if (!item) {
//       return res.status(404).json({ message: 'Item not found.' });
//     }

//     let imageUrl = item.image;
//     if (image) {
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     // Calculate the new quantity
//     const oldQuantity = item.quantity;
//     const newQuantity = quantity ? Number(quantity) + Number(oldQuantity) : oldQuantity;

//     // Calculate the quantity updated (difference between new and old quantity)
//     const quantityUpdated = newQuantity - oldQuantity;

//     // Update item properties
//     item.name = name || item.name;
//     item.quantity = newQuantity;
//     item.threshold = threshold ?? item.threshold;
//     item.image = imageUrl;

//     // Add to updateHistory with the new data
//     item.updateHistory.push({
//       vendorName,
//       quantityUpdated,
//       cost,
//     });

//     await item.save();

//     // For low stock alert
//     if (item.quantity < item.threshold) {
//       const orgEmployees = await Employee.find({ orgId });

//       const admin = orgEmployees.find((emp) => emp.role === 'admin');
//       const manager = orgEmployees.find((emp) => emp.role === 'manager');

//       if (admin && manager) {
//         await Message.create({
//           senderId: admin.id,
//           receiverId: manager.id,
//           orgId,
//           content: `⚠️ Alert: Item "${item.name}" quantity (${item.quantity}) is below threshold (${item.threshold}).`,
//         });
//       }
//     }

//     return res.status(200).json({
//       message: 'Item updated successfully.',
//       item,
//     });
//   } catch (error) {
//     console.error('Update Item Error:', error);
//     return res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };

const updateItem = async (req, res) => {
  console.log('req.body', req.body);
  console.log('server-1');
  try {
    console.log('server-2');
    const { id: itemId } = req.params;
    console.log('server-3');
    console.log(itemId);
    const { quantity, threshold, vendor: vendorName, cost } = req.body;
    console.log('server-4');

    if (!vendorName || cost == null) {
      console.log('server-5');
      return res.status(400).json({
        message: 'vendorName and cost are required for updating history.',
      });
    }

    console.log('server-6');

    const orgId = req.user.orgId;
    console.log('server-7');

    if (!orgId) {
      console.log('server-8');
      return res
        .status(403)
        .json({ message: 'Unauthorized. Organization ID missing.' });
    }

    console.log('server-9');
    const item = await Item.findOne({ id: itemId, orgId });

    if (!item) {
      console.log('server-10');
      return res.status(404).json({ message: 'Item not found.' });
    }

    // Calculate the new quantity
    const oldQuantity = item.quantity;
    const newQuantity = quantity
      ? Number(quantity) + Number(oldQuantity)
      : oldQuantity;

    // Calculate the quantity updated (difference between new and old quantity)
    const quantityUpdated = quantity;

    // Update item properties
    item.quantity = newQuantity;
    item.threshold = threshold ?? item.threshold;
    console.log('server-10');

    // Add to updateHistory with the new data
    item.updateHistory.push({
      vendorName,
      quantityUpdated,
      cost,
    });
    console.log('server-11');

    await item.save();
    console.log('server-12');

    // For low stock alert
    if (item.quantity < item.threshold) {
      const orgEmployees = await Employee.find({ orgId });
      console.log('server-12');

      const admin = orgEmployees.find((emp) => emp.role === 'admin');
      const manager = orgEmployees.find((emp) => emp.role === 'manager');

      if (admin && manager) {
        await Message.create({
          senderId: admin.id,
          receiverId: manager.id,
          orgId,
          content: `⚠️ Alert: Item "${item.name}" quantity (${item.quantity}) is below threshold (${item.threshold}).`,
        });
      }
    }

    return res.status(200).json({
      message: 'Item updated successfully.',
      item,
    });
  } catch (error) {
    console.error('Update Item Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const deleteItem = async (req, res) => {
  console.log('server-1');
  try {
    const { id } = req.params;
    const orgId = req.user.orgId;
    console.log('id', id);
    console.log('server-2');

    const item = await Item.findOneAndDelete({ id, orgId });
    console.log('server-4');

    if (!item) {
      console.log('server-5');
      return res.status(404).json({ message: 'Item not found.' });
    }

    console.log('server-6');

    return res.status(200).json({ message: 'Item deleted successfully.' });
  } catch (error) {
    console.error('Delete Item Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
