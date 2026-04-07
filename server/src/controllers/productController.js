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
