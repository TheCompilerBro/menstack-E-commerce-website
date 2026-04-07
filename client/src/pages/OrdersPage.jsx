import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useStore } from '../context/StoreContext';

const OrdersPage = () => {
  const { auth } = useStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!auth) {
      navigate('/login?redirect=/orders');
      return;
    }

    const fetchOrders = async () => {
      const { data } = await api.get('/orders/my');
      setOrders(data);
    };

    fetchOrders();
  }, [auth, navigate]);

  return (
    <main>
      <h2>Your orders</h2>
      {orders.length === 0 ? (
        <p>
          No orders yet. <Link to="/">Shop now</Link>
        </p>
      ) : (
        <section className="order-list">
          {orders.map((order) => (
            <article key={order._id} className="order-card">
              <p>Order ID: {order._id}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.totalPrice.toFixed(2)}</p>
              <p>Items: {order.orderItems.length}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default OrdersPage;
