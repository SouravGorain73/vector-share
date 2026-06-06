import { useAuth } from '../context/AuthContext';
import {
  Settings as SettingsIcon,
  User,
  Mail,
  Shield,
  Globe,
  KeyRound,
  Bell,
  Trash2,
} from 'lucide-react';
import authService from '../services/authService';

function Settings() {
  const { user } = useAuth();

  // Determine auth provider from token

  const isOAuthUser = !authService.getRefreshToken(); // OAuth users don't have refresh token in localStorage

  return (
    <div className="page-enter max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
          <SettingsIcon size={28} className="text-purple-400" />
          Settings
        </h1>
        <p className="mt-1 text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="glass-card p-6 mb-6 animate-fade-in-up stagger-1">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <User size={18} className="text-purple-400" />
          Profile Information
        </h2>

        <div className="space-y-5">
          {/* Avatar & Name */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/20">
              {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{user?.name || 'User'}</h3>
              <p className="text-gray-400 text-sm flex items-center gap-1.5 mt-1">
                <Mail size={14} />
                {user?.email || 'No email'}
              </p>
            </div>
          </div>

          {/* Auth Provider */}
          <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isOAuthUser ? (
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
                    <Globe size={18} className="text-blue-400" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                    <KeyRound size={18} className="text-emerald-400" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-200">Authentication Method</p>
                  <p className="text-xs text-gray-500">{isOAuthUser ? 'Google OAuth' : 'Email & Password'}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isOAuthUser
                  ? 'bg-blue-500/15 text-blue-400'
                  : 'bg-emerald-500/15 text-emerald-400'
              }`}>
                {isOAuthUser ? 'Google' : 'Local'}
              </span>
            </div>
          </div>

          {/* Info fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
              <p className="text-xs text-gray-500 mb-1">Full Name</p>
              <p className="text-white font-medium">{user?.name || 'Not set'}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
              <p className="text-xs text-gray-500 mb-1">Email Address</p>
              <p className="text-white font-medium">{user?.email || 'Not set'}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
              <p className="text-xs text-gray-500 mb-1">User ID</p>
              <p className="text-white font-medium">#{user?.id || '—'}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
              <p className="text-xs text-gray-500 mb-1">Account Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <p className="text-emerald-400 font-medium">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="glass-card p-6 mb-6 animate-fade-in-up stagger-2">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Shield size={18} className="text-purple-400" />
          Security
        </h2>

        <div className="space-y-3">
          {!isOAuthUser && (
            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-800/40 border border-gray-700/30 hover:border-purple-500/30 text-gray-200 hover:text-white transition-all duration-200 group">
              <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center group-hover:bg-purple-500/25 transition-colors">
                <KeyRound size={18} className="text-purple-400" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm">Change Password</p>
                <p className="text-xs text-gray-500">Update your password periodically for security</p>
              </div>
              <span className="text-xs text-gray-600 px-2.5 py-1 bg-gray-800/60 rounded-full">Coming soon</span>
            </button>
          )}

          <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-800/40 border border-gray-700/30 hover:border-purple-500/30 text-gray-200 hover:text-white transition-all duration-200 group">
            <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center group-hover:bg-blue-500/25 transition-colors">
              <Shield size={18} className="text-blue-400" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-sm">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <span className="text-xs text-gray-600 px-2.5 py-1 bg-gray-800/60 rounded-full">Coming soon</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card p-6 mb-6 animate-fade-in-up stagger-3">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Bell size={18} className="text-purple-400" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
            <div>
              <p className="text-sm font-medium text-gray-200">Email Notifications</p>
              <p className="text-xs text-gray-500">Receive updates about your files and account</p>
            </div>
            <div className="relative">
              <div className="w-11 h-6 bg-purple-500/30 rounded-full cursor-pointer">
                <div className="w-5 h-5 bg-purple-400 rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
            <div>
              <p className="text-sm font-medium text-gray-200">File Access Alerts</p>
              <p className="text-xs text-gray-500">Get notified when someone accesses your shared files</p>
            </div>
            <div className="relative">
              <div className="w-11 h-6 bg-gray-700 rounded-full cursor-pointer">
                <div className="w-5 h-5 bg-gray-500 rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6 animate-fade-in-up stagger-4" style={{ borderColor: 'rgba(239, 68, 68, 0.15)' }}>
        <h2 className="text-lg font-semibold text-red-400 mb-6 flex items-center gap-2">
          <Trash2 size={18} />
          Danger Zone
        </h2>
        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-200">Delete Account</p>
              <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
            </div>
            <button className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-500/20 transition-all">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
