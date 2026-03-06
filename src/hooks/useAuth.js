import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    const loginTime = sessionStorage.getItem('loginTime');

    if (sessionUser && loginTime) {
      const elapsed = Date.now() - parseInt(loginTime);
      if (elapsed < 300000) {
        setUser(JSON.parse(sessionUser));
      } else {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('loginTime');
      }
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const timer = setTimeout(() => {
      setUser(null);
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('loginTime');
      localStorage.removeItem('cart');
    }, 300000);

    return () => clearTimeout(timer);
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('loginTime', Date.now().toString());
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('loginTime');
    localStorage.removeItem('cart');
  };

  return { user, login, logout };
}
