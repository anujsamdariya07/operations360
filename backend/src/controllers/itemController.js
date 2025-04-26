const cloudinary = require('cloudinary');
const Item = require('../models/item.model');

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

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
    const { id } = req.params;

    const item = await Item.findById(id);

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
      vendorName,
      cost,
    } = req.body;

    if (!name || cost == null || vendorName) {
      return res.status(400).json({
        message: 'Name, vendorName and cost are required.',
      });
    }

    const orgId = req.user.orgId;

    if (!orgId) {
      return res
        .status(403)
        .json({ message: 'Unauthorized. Organization ID missing.' });
    }

    let imageUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6ZeL1Ntu-zwEcgRli39ynixVj9yeQtfjAw&s';

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const id = await generateItemId(orgId);

    const newItem = await Item.create({
      orgId,
      id,
      name,
      quantity,
      threshold,
      image: imageUrl,
      updateHistory: [
        {
          vendorName,
          quantityUpdated: quantity,
          cost,
        },
      ],
    });

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

const updateItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const { name, quantity, threshold, image, vendorName, cost } = req.body;

    if (!vendorName || cost == null) {
      return res
        .status(400)
        .json({
          message: 'vendorName and cost are required for updating history.',
        });
    }

    const orgId = req.user.orgId;

    if (!orgId) {
      return res
        .status(403)
        .json({ message: 'Unauthorized. Organization ID missing.' });
    }

    const item = await Item.findOne({ _id: itemId, orgId });

    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    let imageUrl = item.image;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const quantityUpdated = quantity - item.quantity;

    item.name = name || item.name;
    item.quantity = quantity ?? item.quantity;
    item.threshold = threshold ?? item.threshold;
    item.image = imageUrl;
    item.updateHistory.push({
      vendorName,
      quantityUpdated,
      cost,
    });

    await item.save();

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
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    await Item.findByIdAndDelete(id);

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
