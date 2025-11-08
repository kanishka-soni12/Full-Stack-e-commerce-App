require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Product = require('./models/Product');
const CartItem = require('./models/CartItem');
const Receipt = require('./models/Receipt');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mockcart';
mongoose.connect(MONGO_URI).then(() => console.log('✅ MongoDB connected')).catch(console.error);

// Utility: compute cart total
async function getCartWithTotal() {
  const cartItems = await CartItem.find().populate('productId');
  let total = 0;
  const items = cartItems.map(c => {
    const product = c.productId;
    const itemTotal = product.price * c.qty;
    total += itemTotal;
    return {
      cartId: c._id,
      productId: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      qty: c.qty,
      itemTotal
    };
  });
  return { items, total };
}

// ==================== API ROUTES ====================

// GET /api/products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST /api/cart
app.post('/api/cart', async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || qty <= 0) return res.status(400).json({ error: 'Invalid input' });

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  await CartItem.create({ productId, qty });
  const cart = await getCartWithTotal();
  res.status(201).json({ cart });
});

// PUT /api/cart/:id (update qty)
app.put('/api/cart/:id', async (req, res) => {
  const { qty } = req.body;
  const { id } = req.params;
  if (!qty || qty <= 0) return res.status(400).json({ error: 'Invalid qty' });

  const item = await CartItem.findByIdAndUpdate(id, { qty });
  if (!item) return res.status(404).json({ error: 'Cart item not found' });
  const cart = await getCartWithTotal();
  res.json(cart);
});

// DELETE /api/cart/:id
app.delete('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  const del = await CartItem.findByIdAndDelete(id);
  if (!del) return res.status(404).json({ error: 'Not found' });
  const cart = await getCartWithTotal();
  res.json(cart);
});

// GET /api/cart
app.get('/api/cart', async (req, res) => {
  const cart = await getCartWithTotal();
  res.json(cart);
});

// POST /api/checkout
app.post('/api/checkout', async (req, res) => {
  const { customerName, customerEmail } = req.body;
  if (!customerName || !customerEmail)
    return res.status(400).json({ error: 'Name and email required' });

  const cart = await getCartWithTotal();
  if (cart.items.length === 0)
    return res.status(400).json({ error: 'Cart is empty' });

  const receipt = await Receipt.create({
    items: cart.items,
    total: cart.total,
    customerName,
    customerEmail
  });

  // Clear cart
  await CartItem.deleteMany({});

  res.json({
    id: uuidv4(),
    items: cart.items,
    total: cart.total,
    timestamp: receipt.timestamp,
    customerName,
    customerEmail
  });
});

// GET /api/receipts
app.get('/api/receipts', async (req, res) => {
  const receipts = await Receipt.find().sort({ timestamp: -1 });
  res.json(receipts);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
