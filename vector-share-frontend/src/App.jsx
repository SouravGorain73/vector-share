import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layout/DashboardLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuthSuccess from './pages/OAuthSuccess';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import MyFiles from './pages/MyFiles';
import Subsciption from './pages/Subsciption';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import PublicFileView from './pages/PublicFileView';
import LoadingScreen from './components/LoadingScreen';
import Lenis from 'lenis';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/share/:token" element={<PublicFileView />} />

              {/* Protected routes with dashboard layout */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Dashboard />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Upload />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myfiles"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <MyFiles />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subscription"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Subsciption />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Transactions />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Settings />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
