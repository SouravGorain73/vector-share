import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = authService.getToken();
    const savedUser = authService.getUser();
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extractEmailFromToken = (jwtToken) => {
    const payload = authService.decodeToken(jwtToken);
    if (!payload) return null;
    return payload.sub; // email is stored as "sub" in JWT
  };

  const fetchAndSetUser = async (accessToken) => {
    const email = extractEmailFromToken(accessToken);
    if (!email) return null;

    try {
      // Fetch full user data from backend to get name, id, etc.
      const userData = await authService.getUserByEmail(email);
      const userObj = {
        id: userData.id,
        email: userData.email,
        name: userData.name || email.split('@')[0],
      };
      authService.saveUser(userObj);
      setUser(userObj);
      return userObj;
    } catch {
      // Fallback to JWT data if user fetch fails
      const payload = authService.decodeToken(accessToken);
      const userObj = {
        id: payload?.userId,
        email: email,
        name: email.split('@')[0],
      };
      authService.saveUser(userObj);
      setUser(userObj);
      return userObj;
    }
  };

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      const { accessToken, refreshToken } = data;

      authService.saveToken(accessToken);
      authService.saveRefreshToken(refreshToken);
      setToken(accessToken);

      await fetchAndSetUser(accessToken);

      toast.success('Logged in successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || 'Invalid credentials';
      toast.error(typeof message === 'string' ? message : 'Login failed');
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      await authService.register(name, email, password);
      toast.success('Account created! Please login.');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || 'Registration failed';
      toast.error(typeof message === 'string' ? message : 'Registration failed');
      return { success: false, error: message };
    }
  };

  const handleOAuthCallback = async (accessToken) => {
    authService.saveToken(accessToken);
    setToken(accessToken);

    await fetchAndSetUser(accessToken);
    // Note: refresh token is set as HTTPOnly cookie by backend for OAuth
  };

  const logout = async () => {
    try {
      await authService.logoutServer();
    } catch {
      // Continue with local logout even if server call fails
    }
    authService.logout();
    setToken(null);
    setUser(null);
    toast.success('Logged out');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      handleOAuthCallback,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
