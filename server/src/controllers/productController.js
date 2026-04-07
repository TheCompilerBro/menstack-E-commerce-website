import sampleProducts from '../data/sampleProducts.js';
import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(`Products fallback activated: ${error.message}`);
    res.json(sampleProducts);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    const sample = sampleProducts.find((item) => item._id === req.params.id);
    if (sample) {
      res.json(sample);
      return;
    }

    res.status(404).json({ message: 'Product not found' });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image, description, category, stock } = req.body;
  const product = await Product.create({
    name,
    price,
    image,
    description,
    category,
    stock
  });
  res.status(201).json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  await product.deleteOne();
  res.json({ message: 'Product removed' });
};
