import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import {
  LayoutDashboard,
  Upload,
  FolderOpen,
  CreditCard,
  Receipt,
  LogOut,
  Menu,
  X,
  Share2,
  ChevronRight,
  Settings,
  Globe,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', indexNum: '01', icon: LayoutDashboard },
  { path: '/upload', label: 'Upload Files', indexNum: '02', icon: Upload },
  { path: '/myfiles', label: 'File Registry', indexNum: '03', icon: FolderOpen },
  { path: '/subscription', label: 'Subscription', indexNum: '04', icon: CreditCard },
  { path: '/transactions', label: 'Transactions', indexNum: '05', icon: Receipt },
  { path: '/settings', label: 'Settings', indexNum: '06', icon: Settings },
];

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isOAuthUser = !authService.getRefreshToken();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const currentNav = navItems.find((item) => item.path === location.pathname) || {
    label: 'Console',
    indexNum: '00',
  };

  return (
    <div className="h-screen bg-[#111827] text-[#F5F3EB] flex overflow-hidden font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0A0E17]/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0E1522] border-r border-[#E5E3DA]/10 flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E3DA]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#111827] border border-[#D7FF64]/40 flex items-center justify-center text-[#D7FF64] shadow-sm">
              <Share2 size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base tracking-tight text-[#FFFFFF]">
                  VECTOR<span className="text-[#D7FF64]">SHARE</span>
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-[#737373] uppercase">
                SECURE ARCHITECTURE
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#737373] hover:text-[#FFFFFF] p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* System Telemetry Tag */}
        <div className="px-6 py-3 bg-[#111827]/60 border-b border-[#E5E3DA]/5 flex items-center justify-between text-[11px] font-mono text-[#737373]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF64]"></span>
            NODE: VAULT-01
          </span>
          <span className="text-[#E5E3DA]/40">AES-256</span>
        </div>

        {/* Navigation Ledger */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto" data-lenis-prevent>
          {navItems.map(({ path, label, indexNum, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3.5 py-3 rounded-md text-sm font-medium transition-all duration-200 outline-none
                ${
                  isActive
                    ? 'bg-[#151F2E] text-[#FFFFFF] border border-[#E5E3DA]/20 shadow-sm'
                    : 'text-[#737373] hover:text-[#F5F3EB] hover:bg-[#141C2B] border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#D7FF64] rounded-r" />
                  )}
                  <Icon
                    size={18}
                    className={`transition-colors ${
                      isActive ? 'text-[#D7FF64]' : 'text-[#737373] group-hover:text-[#F5F3EB]'
                    }`}
                  />
                  <span className="flex-1 tracking-tight">{label}</span>
                  <span className="text-[10px] font-mono text-[#737373]/70 group-hover:text-[#737373]">
                    {indexNum}
                  </span>
                  {isActive && <ChevronRight size={13} className="text-[#D7FF64]/70" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Dossier Section */}
        <div className="p-4 border-t border-[#E5E3DA]/10 bg-[#0B101A]">
          <div className="flex items-center gap-3 p-2.5 rounded-md bg-[#141C2B] border border-[#E5E3DA]/10">
            <div className="w-8 h-8 rounded bg-[#111827] border border-[#D7FF64]/30 flex items-center justify-center text-[#D7FF64] font-display font-bold text-xs">
              {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-semibold text-[#FFFFFF] truncate">{user?.name || 'User'}</p>
                {isOAuthUser ? (
                  <Globe size={11} className="text-[#D7FF64] shrink-0" title="Google Account" />
                ) : (
                  <KeyRound size={11} className="text-[#737373] shrink-0" title="Email Account" />
                )}
              </div>
              <p className="text-[11px] font-mono text-[#737373] truncate">{user?.email || ''}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded text-[#737373] hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Logout"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Stage */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#111827]">
        {/* Top Telemetry Bar */}
        <header className="sticky top-0 z-30 bg-[#111827]/90 backdrop-blur-md border-b border-[#E5E3DA]/10">
          <div className="flex items-center justify-between px-6 py-3.5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded text-[#737373] hover:text-[#FFFFFF] hover:bg-[#151F2E] transition-colors"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-2 text-xs font-mono text-[#737373]">
                <span className="text-[#D7FF64] font-semibold">{currentNav.indexNum}</span>
                <span>/</span>
                <span className="text-[#F5F3EB] uppercase tracking-wider">{currentNav.label}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-[#151F2E] border border-[#E5E3DA]/10 text-xs font-mono text-[#737373]">
                <ShieldCheck size={13} className="text-[#D7FF64]" />
                <span className="text-[#F5F3EB]/80">E2E ENCRYPTED</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#151F2E] border border-[#E5E3DA]/10 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#D7FF64] animate-pulse"></span>
                <span className="text-[#F5F3EB] text-[11px]">ACTIVE</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto" data-lenis-prevent>
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
