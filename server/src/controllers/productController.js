import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  res.json(product);
};
