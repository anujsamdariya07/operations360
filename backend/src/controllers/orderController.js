const Order = require('../models/order.model');
const generateOrderId = require('../utils/generateOrderId');

const createOrder = async (req, res) => {
  console.log('server-1')
  try {
    console.log('server-2')
    const { orgId, employeeId } = req.user;
    console.log('req.user', req.user)
    console.log('orgId',orgId)
    console.log('employeeId',employeeId)
    console.log('server-3')
    
    if (!orgId || !employeeId) {
      console.log('server-4')
      return res.status(400).json({
        message: 'User authentication failed. Missing orgId or employeeId.',
      });
    }
    
    console.log('server-5')
    const { customerId, items, notes } = req.body;
    console.log(req.body, {customerId, items, notes})
    console.log('server-6')
    
    if (!customerId || !items || items.length === 0) {
      console.log('server-7')
      return res
      .status(400)
      .json({ message: 'Missing required fields: customerId or items.' });
    }
    
    console.log('server-8')
    const totalAmount = items.reduce((total, item) => {
      if (!item.item || !item.quantity || !item.priceAtOrder) {
        throw new Error(
          'Each item must have item, quantity, and priceAtOrder fields.'
        );
      }
      if (item.quantity <= 0 || item.priceAtOrder <= 0) {
        throw new Error(
          'Item quantity and priceAtOrder must be positive numbers.'
        );
      }
      return total + item.quantity * item.priceAtOrder;
    }, 0);
    console.log('server-9')
    
    if (totalAmount <= 0) {
      console.log('server-10')
      return res.status(400).json({
        message:
        'Total amount cannot be zero or negative. Please check item prices or quantities.',
      });
    }
    
    console.log('server-11')
    const orderId = await generateOrderId(orgId);
    console.log('server-12')
    
    const order = new Order({
      id: orderId,
      orgId,
      customerId,
      employeeId,
      items,
      totalAmount,
      status: 'pending',
      orderDate: new Date(),
      notes,
    });
    console.log('server-13')
    
    await order.save();
    console.log('server-14')

    return res
      .status(201)
      .json({ message: 'Order created successfully!', order });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: err.message || 'An unexpected error occurred.' });
  }
};

const getAllOrdersByOrgId = async (req, res) => {
  try {
    const { orgId } = req.user;

    if (!orgId) {
      return res
        .status(400)
        .json({ message: 'orgId is required for authentication.' });
    }

    const orders = await Order.find({ orgId });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: 'No orders found for this organization.' });
    }

    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message:
        err.message || 'An unexpected error occurred while fetching orders.',
    });
  }
};

// READ ONE
const getOrderById = async (req, res) => {
  try {
    const { orgId } = req.user;
    const { id } = req.params;

    const order = await Order.findOne({ id, orgId });

    if (!order) {
      return res.status(404).json({
        message:
          'Order not found or does not belong to the specified organization.',
      });
    }

    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message:
        err.message || 'An unexpected error occurred while fetching the order.',
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orgId } = req.user;
    const { id } = req.params;

    const allowedFields = ['status', 'items'];
    const updateFields = Object.keys(req.body);

    const invalidFields = updateFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
      return res
        .status(400)
        .json({ message: `Invalid fields: ${invalidFields.join(', ')}` });
    }

    const order = await Order.findOne({ id, orgId });

    if (!order) {
      return res.status(404).json({
        message:
          'Order not found or does not belong to the specified organization.',
      });
    }

    const updateData = {};

    if (req.body.status) {
      updateData.status = req.body.status;
    }

    if (req.body.items && Array.isArray(req.body.items)) {
      const invalidItems = req.body.items.filter(
        (item) =>
          !item.item ||
          typeof item.item !== 'string' ||
          !item.quantity ||
          typeof item.quantity !== 'number' ||
          !item.priceAtOrder ||
          typeof item.priceAtOrder !== 'number'
      );

      if (invalidItems.length > 0) {
        return res.status(400).json({ message: 'Invalid items format.' });
      }

      updateData.items = {
        $push: { $each: req.body.items },
      };
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { id, orgId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(500).json({ message: 'Failed to update the order.' });
    }

    return res
      .status(200)
      .json({ message: 'Order updated successfully!', updatedOrder });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message:
        err.message || 'An unexpected error occurred while updating the order.',
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findOneAndDelete({ id });

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllOrdersByOrgId,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
