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
  ShieldAlert,
} from 'lucide-react';
import authService from '../services/authService';

function Settings() {
  const { user } = useAuth();
  const isOAuthUser = !authService.getRefreshToken();

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in font-sans">
      
      {/* Dossier Header */}
      <div className="pb-6 border-b border-[#E5E3DA]/10">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#D7FF64] mb-1">
          [GOVERNANCE // PREFERENCES]
        </div>
        <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#FFFFFF] tracking-tight flex items-center gap-3">
          <SettingsIcon size={26} className="text-[#D7FF64]" />
          VAULT SETTINGS & IDENTITY
        </h1>
        <p className="mt-1 text-xs text-[#737373] font-mono">
          MANAGE IDENTITY MATRIX • CRYPTOGRAPHIC POLICIES • REPOSITORY DELETION
        </p>
      </div>

      {/* Profile Dossier Section */}
      <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E3DA]/10">
          <h2 className="font-display font-bold text-base text-[#FFFFFF] flex items-center gap-2">
            <User size={18} className="text-[#D7FF64]" />
            OPERATOR IDENTITY RECORD
          </h2>
          <span className="text-[10px] font-mono text-[#737373] uppercase">SYS_REF: #{user?.id || 'LOCAL'}</span>
        </div>

        {/* Identity Avatar & Details */}
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded bg-[#151F2E] border border-[#D7FF64]/40 flex items-center justify-center text-[#D7FF64] font-display font-bold text-2xl">
            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-[#FFFFFF]">{user?.name || 'Authorized Operator'}</h3>
            <p className="text-xs font-mono text-[#737373] flex items-center gap-1.5 mt-0.5">
              <Mail size={13} className="text-[#D7FF64]" />
              {user?.email || 'No email attached'}
            </p>
          </div>
        </div>

        {/* Auth Provider Specification */}
        <div className="p-4 rounded bg-[#111827] border border-[#E5E3DA]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#151F2E] flex items-center justify-center text-[#D7FF64]">
              {isOAuthUser ? <Globe size={16} /> : <KeyRound size={16} />}
            </div>
            <div>
              <p className="text-xs font-mono text-[#FFFFFF] font-bold">
                {isOAuthUser ? 'GOOGLE OAUTH2 FEDERATION' : 'CRYPTOGRAPHIC PASSWORD KEY'}
              </p>
              <p className="text-[10px] font-mono text-[#737373]">
                {isOAuthUser ? 'Identity verified through Google IDP token' : 'Local salted digest verification'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#D7FF64]/10 border border-[#D7FF64]/30 text-[10px] font-mono font-bold text-[#D7FF64] uppercase">
            {isOAuthUser ? 'OAUTH_2.0' : 'LOCAL_DIGEST'}
          </span>
        </div>

        {/* Tabular Identity Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-[#111827] border border-[#E5E3DA]/10 rounded">
            <span className="text-[10px] text-[#737373] uppercase">OPERATOR NAME</span>
            <p className="text-[#FFFFFF] font-bold mt-0.5">{user?.name || 'Anonymous'}</p>
          </div>
          <div className="p-3 bg-[#111827] border border-[#E5E3DA]/10 rounded">
            <span className="text-[10px] text-[#737373] uppercase">ROUTING EMAIL</span>
            <p className="text-[#FFFFFF] font-bold mt-0.5 truncate">{user?.email || 'Unspecified'}</p>
          </div>
          <div className="p-3 bg-[#111827] border border-[#E5E3DA]/10 rounded">
            <span className="text-[10px] text-[#737373] uppercase">VAULT ENTITY ID</span>
            <p className="text-[#D7FF64] font-bold mt-0.5">#{user?.id || 'COMMUNITY-NODE'}</p>
          </div>
          <div className="p-3 bg-[#111827] border border-[#E5E3DA]/10 rounded">
            <span className="text-[10px] text-[#737373] uppercase">ACCOUNT STATUS</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF64] animate-pulse"></span>
              <span className="text-[#D7FF64] font-bold">VERIFIED_ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Policies */}
      <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E3DA]/10">
          <h2 className="font-display font-bold text-base text-[#FFFFFF] flex items-center gap-2">
            <Shield size={18} className="text-[#D7FF64]" />
            ACCESS SECURITY PROTOCOLS
          </h2>
          <span className="text-[10px] font-mono text-[#737373] uppercase">E2E TLS 1.3</span>
        </div>

        <div className="space-y-3">
          {!isOAuthUser && (
            <div className="flex items-center justify-between p-4 rounded bg-[#111827] border border-[#E5E3DA]/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#151F2E] flex items-center justify-center text-[#737373]">
                  <KeyRound size={16} />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-[#FFFFFF]">ROTATE MASTER PASSWORD</p>
                  <p className="text-[10px] text-[#737373]">Issue password revision protocol</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#737373] px-2 py-0.5 bg-[#151F2E] rounded border border-[#E5E3DA]/10">
                [USE FORGOT_PWD]
              </span>
            </div>
          )}

          <div className="flex items-center justify-between p-4 rounded bg-[#111827] border border-[#E5E3DA]/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#151F2E] flex items-center justify-center text-[#737373]">
                <Shield size={16} />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-[#FFFFFF]">MULTI-FACTOR CHALLENGE (MFA)</p>
                <p className="text-[10px] text-[#737373]">Hardware security token or TOTP authenticator</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#737373] px-2 py-0.5 bg-[#151F2E] rounded border border-[#E5E3DA]/10">
              [ROADMAP_Q3]
            </span>
          </div>
        </div>
      </div>

      {/* Dispatch Telemetry & Alerts */}
      <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E3DA]/10">
          <h2 className="font-display font-bold text-base text-[#FFFFFF] flex items-center gap-2">
            <Bell size={18} className="text-[#D7FF64]" />
            DISPATCH TELEMETRY ALERTS
          </h2>
          <span className="text-[10px] font-mono text-[#737373] uppercase">EVENT ROUTING</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded bg-[#111827] border border-[#E5E3DA]/10">
            <div>
              <p className="text-xs font-mono font-bold text-[#FFFFFF]">CONDUIT ACCESS DISPATCHES</p>
              <p className="text-[10px] text-[#737373]">Receive webhook or mail when public tokens are accessed</p>
            </div>
            <div className="w-10 h-5 bg-[#D7FF64] rounded-full relative cursor-pointer shadow-sm">
              <div className="w-4 h-4 bg-[#111827] rounded-full absolute top-0.5 right-0.5"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded bg-[#111827] border border-[#E5E3DA]/10">
            <div>
              <p className="text-xs font-mono font-bold text-[#FFFFFF]">CAPACITY QUOTA THRESHOLDS</p>
              <p className="text-[10px] text-[#737373]">Notify when storage footprint exceeds 85% allotment</p>
            </div>
            <div className="w-10 h-5 bg-[#151F2E] border border-[#E5E3DA]/20 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-[#737373] rounded-full absolute top-0.5 left-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-[#0E1522] border border-red-500/30 rounded-lg p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-red-500/20 text-red-400">
          <h2 className="font-display font-bold text-base flex items-center gap-2">
            <ShieldAlert size={18} />
            DANGER ZONE // PERMANENT EXPUNGE
          </h2>
          <span className="text-[10px] font-mono uppercase">IRREVERSIBLE</span>
        </div>

        <div className="p-4 rounded bg-red-500/5 border border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono font-bold text-[#FFFFFF]">TERMINATE OPERATOR ACCOUNT</p>
            <p className="text-[10px] text-[#737373]">Purge all uploaded assets, public token conduits, and cryptographic keys</p>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 text-xs font-mono font-bold uppercase rounded transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 size={13} />
            <span>Purge Vault</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Settings;
