import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
  const { auth, cart, logout } = useStore();
  const navigate = useNavigate();
  const itemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        mono.store
      </Link>
      <nav>
        <NavLink to="/">Shop</NavLink>
        <NavLink to="/cart">Cart ({itemsCount})</NavLink>
        {auth ? (
          <>
            <NavLink to="/orders">Orders</NavLink>
            {auth.isAdmin && <NavLink to="/admin-dashboard">Admin</NavLink>}
            <button className="link-button" onClick={handleLogout} type="button">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
