import Item from '../models/item.model.js'; // Adjust path if needed

export const generateItemId = async (orgId) => {
  const itemCount = await Item.countDocuments({ orgId });
  const newItemId = `Item-${itemCount + 1}`;
  return newItemId;
};
