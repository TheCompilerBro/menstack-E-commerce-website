import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const RegisterPage = () => {
  const { register } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="form-wrap">
      <h2>Create account</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Create account</button>
      </form>
      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </main>
  );
};

export default RegisterPage;
