import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../api/api';
import { useStore } from '../context/StoreContext';

const emptyProduct = {
  name: '',
  price: 0,
  image: 'https://placehold.co/900x600/e8e8e8/111111?text=New+Product',
  description: '',
  category: '',
  stock: 1
};

const AdminPage = () => {
  const { auth } = useStore();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [productsRes, usersRes, ordersRes] = await Promise.all([
        api.get('/products'),
        api.get('/auth/users'),
        api.get('/orders')
      ]);
      setProducts(productsRes.data);
      setUsers(usersRes.data);
      setOrders(ordersRes.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admin data');
    }
  };

  useEffect(() => {
    if (auth?.isAdmin) {
      loadData();
    }
  }, [auth]);

  if (!auth) return <Navigate to="/login?redirect=/admin" replace />;
  if (!auth.isAdmin) return <Navigate to="/" replace />;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await api.post('/products', { ...form, price: Number(form.price), stock: Number(form.stock) });
    setForm(emptyProduct);
    loadData();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    loadData();
  };

  const deleteUser = async (id) => {
    await api.delete(`/auth/users/${id}`);
    loadData();
  };

  return (
    <main>
      <h2>Admin Panel</h2>
      {error && <p className="error">{error}</p>}

      <section className="admin-section">
        <h3>Add product</h3>
        <form onSubmit={handleAddProduct}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
          <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
          <button type="submit">Add product</button>
        </form>
      </section>

      <section className="admin-section">
        <h3>Products</h3>
        {products.map((product) => (
          <article key={product._id} className="admin-row">
            <span>{product.name}</span>
            <button type="button" onClick={() => deleteProduct(product._id)}>Delete</button>
          </article>
        ))}
      </section>

      <section className="admin-section">
        <h3>Users</h3>
        {users.map((user) => (
          <article key={user._id} className="admin-row">
            <span>{user.name} ({user.email}) {user.isAdmin ? '[Admin]' : ''}</span>
            {!user.isAdmin && (
              <button type="button" onClick={() => deleteUser(user._id)}>Delete</button>
            )}
          </article>
        ))}
      </section>

      <section className="admin-section">
        <h3>Orders</h3>
        {orders.map((order) => (
          <article key={order._id} className="admin-row">
            <span>{order.user?.email || 'unknown'} - ${order.totalPrice.toFixed(2)} - {new Date(order.createdAt).toLocaleDateString()}</span>
          </article>
        ))}
      </section>
    </main>
  );
};

export default AdminPage;
