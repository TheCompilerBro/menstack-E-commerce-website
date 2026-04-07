import { useEffect, useState } from 'react';
import { api } from '../api/api';
import ProductCard from '../components/ProductCard';
import SkeletonGrid from '../components/SkeletonGrid';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch {
        setError('Unable to load products. Is backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <section className="hero">
        <h1>Minimal essentials for daily life.</h1>
        <p>Simple, useful products with calm aesthetics.</p>
      </section>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <SkeletonGrid />
      ) : (
        <section className="grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
};

export default HomePage;
