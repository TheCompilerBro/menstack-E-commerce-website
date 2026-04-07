import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import sampleProducts from './data/sampleProducts.js';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();
await connectDB();

await Product.deleteMany();
await User.deleteMany();

await Product.insertMany(sampleProducts.map(({ _id, ...product }) => product));
await User.create({
  name: 'Demo User',
  email: 'demo@store.com',
  password: 'password123'
});
await User.create({
  name: 'Admin User',
  email: 'admin@store.com',
  password: 'admin123',
  isAdmin: true
});

console.log('Seeded products, demo user, and admin user');
process.exit(0);
