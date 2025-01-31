import { createContext, useState } from 'react';
import { Api } from '../libs/Api';
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const cred = localStorage.getItem('auth');
    return cred ? JSON.parse(cred) : null;
  });
  const navigate = useNavigate();

  const login = async (creds) => {
    try {
      const { data } = await Api.post('/api/v1/auth/login', creds);
      const authCred = { token: data.token, ...data.user };
      localStorage.setItem('auth', JSON.stringify(authCred));
      setAuth(authCred);
      navigate('/');
    } catch (error) {
      console.log('Login error: ', error);
      throw error
    }
  };

  const logout = async () => {
    try {
      await Api.post('api/v1/auth/logout');
      console.log('Logout success');
      navigate('/');
      localStorage.removeItem('auth');
      setAuth(null)
    } catch (error) {
      console.log('Logout error: ');
      throw error
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
