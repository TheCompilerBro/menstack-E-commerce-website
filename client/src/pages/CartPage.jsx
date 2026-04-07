import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useStore } from '../context/StoreContext';

const CartPage = () => {
  const { auth, cart, updateQty, removeFromCart, clearCart } = useStore();
  const navigate = useNavigate();

  const itemsPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxPrice = Number((itemsPrice * 0.1).toFixed(2));
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const placeOrder = async () => {
    if (!auth) {
      navigate('/login?redirect=/cart');
      return;
    }

    const shippingAddress = {
      address: '123 Minimal Street',
      city: 'San Francisco',
      postalCode: '94105',
      country: 'USA'
    };

    const orderItems = cart.map(({ _id, name, image, qty, price }) => ({
      product: _id,
      name,
      image,
      qty,
      price
    }));

    await api.post('/orders', {
      orderItems,
      shippingAddress,
      paymentMethod: 'Card',
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    clearCart();
    navigate('/orders');
  };

  return (
    <main className="cart-page">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>
          Cart is empty. <Link to="/">Go shopping</Link>
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <article key={item._id} className="cart-item">
<<<<<<< HEAD
                <img src={item.image} alt={item.name} onError={(e) => { e.currentTarget.src = "https://placehold.co/900x600/e8e8e8/111111?text=Product"; }} />
=======
                <img src={item.image} alt={item.name} />
>>>>>>> main
                <div>
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <select value={item.qty} onChange={(e) => updateQty(item._id, e.target.value)}>
                  {Array.from({ length: item.stock }, (_, i) => i + 1).map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </article>
            ))}
          </div>
          <aside className="checkout-box">
            <p>Items: ${itemsPrice.toFixed(2)}</p>
            <p>Tax: ${taxPrice.toFixed(2)}</p>
            <p>Shipping: ${shippingPrice.toFixed(2)}</p>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button type="button" onClick={placeOrder}>
              Place order
            </button>
          </aside>
        </>
      )}
    </main>
  );
};

export default CartPage;
