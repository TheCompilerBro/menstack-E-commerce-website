import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const LoginPage = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('demo@store.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main className="form-wrap">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Sign in</button>
      </form>
      <p>
        Need an account? <Link to="/register">Create one</Link>
      </p>
    </main>
  );
};

export default LoginPage;
