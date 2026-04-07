import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../api/api';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : null;
  });
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (auth?.token) {
      setAuthToken(auth.token);
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      setAuthToken(null);
      localStorage.removeItem('auth');
    }
  }, [auth]);


  useEffect(() => {
    const syncProfile = async () => {
      if (!auth?.token || auth?.isAdmin !== undefined) return;

      try {
        const { data } = await api.get('/auth/profile');
        setAuth((prev) => ({ ...prev, isAdmin: data.isAdmin, name: data.name, email: data.email, _id: data._id }));
      } catch {
        setAuth(null);
      }
    };

    syncProfile();
  }, [auth]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: Math.min(item.qty + 1, product.stock) } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((item) => (item._id === id ? { ...item, qty: Number(qty) } : item)));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setAuth(data);
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    setAuth(data);
  };

  const logout = () => setAuth(null);

  const value = useMemo(
    () => ({ auth, cart, addToCart, updateQty, removeFromCart, clearCart, login, register, logout }),
    [auth, cart]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used in StoreProvider');
  }
  return ctx;
};
