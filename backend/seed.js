require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mockcart';

const products = [
  { name: 'Vintage T-Shirt', description: '100% cotton vintage tee', price: 299, image: '/images/tshirt.png' },
  { name: 'Classic Sneakers', description: 'Comfortable everyday sneakers', price: 2499, image: '/images/sneakers.png' },
  { name: 'Minimal Backpack', description: 'Durable lightweight backpack', price: 1499, image: '/images/backpack.png' },
  { name: 'Wireless Earbuds', description: 'Noise-isolating earbuds', price: 1999, image: '/images/earbuds.png' },
  { name: 'Coffee Mug', description: 'Ceramic mug 350ml', price: 399, image: '/images/mug.png' },
  { name: 'Notebook', description: 'Hardcover notebook 200 pages', price: 299, image: '/images/notebook.png' }
];

(async () => {
  await mongoose.connect(MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ Sample products seeded.');
  mongoose.disconnect();
})();
