// Middleware to get a specific order by ID
async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.order = order;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = getOrder