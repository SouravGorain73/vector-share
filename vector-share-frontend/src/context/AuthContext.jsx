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
    // Restore auth state from localStorage on mount
    const savedToken = authService.getToken();
    const savedUser = authService.getUser();
    if (savedToken && savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(savedToken);
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const extractUserFromToken = (jwtToken) => {
    const payload = authService.decodeToken(jwtToken);
    if (!payload) return null;
    return {
      id: payload.userId,
      email: payload.sub,
      name: payload.name || payload.sub?.split('@')[0] || 'User',
    };
  };

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      const { accessToken, refreshToken } = data;

      authService.saveToken(accessToken);
      authService.saveRefreshToken(refreshToken);
      setToken(accessToken);

      const userData = extractUserFromToken(accessToken);
      authService.saveUser(userData);
      setUser(userData);

      toast.success('Logged in successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid credentials';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      await authService.register(name, email, password);
      toast.success('Account created! Logging you in...');
      // Auto-login after registration
      const result = await login(email, password);
      return result;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const handleOAuthCallback = (accessToken) => {
    authService.saveToken(accessToken);
    setToken(accessToken);

    const userData = extractUserFromToken(accessToken);
    if (userData) {
      authService.saveUser(userData);
      setUser(userData);
    }
    // Note: refresh token is set as HTTPOnly cookie by backend for OAuth
    // We won't have it in localStorage, so refresh will rely on re-login
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
