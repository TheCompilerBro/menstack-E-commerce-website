import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();
await connectDB();

const products = [
  {
    name: 'Minimal Desk Lamp',
    price: 49,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    description: 'A sleek metal lamp with warm LED tone for modern spaces.',
    category: 'Home',
    stock: 40
  },
  {
    name: 'Monochrome Backpack',
    price: 79,
    image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=900&q=80',
    description: 'Weather-resistant carry with laptop sleeve and hidden pocket.',
    category: 'Accessories',
    stock: 25
  },
  {
    name: 'Concrete Planter',
    price: 35,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80',
    description: 'Hand-cast planter designed for indoor greens and succulents.',
    category: 'Home',
    stock: 18
  },
  {
    name: 'Everyday Tee',
    price: 29,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    description: 'Soft heavyweight cotton shirt with a relaxed silhouette.',
    category: 'Apparel',
    stock: 70
  }
];

await Product.deleteMany();
await User.deleteMany();

await Product.insertMany(products);
await User.create({
  name: 'Demo User',
  email: 'demo@store.com',
  password: 'password123'
});

console.log('Seeded products and demo user');
process.exit(0);
