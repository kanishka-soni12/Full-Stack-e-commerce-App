const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  timestamp: { type: Date, default: Date.now },
  customerName: String,
  customerEmail: String
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
