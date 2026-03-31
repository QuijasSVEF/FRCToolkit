import { useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  BookOpen, BarChart3, Users, ArrowLeft, LogOut, Menu, X, ShieldCheck,
} from 'lucide-react';

const adminNavItems = [
  { path: '/admin', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/users', label: 'Users', icon: Users },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-steel-50">
      <div
        className={`fixed inset-0 z-40 bg-steel-950/60 backdrop-blur-sm transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[260px] bg-white/95 backdrop-blur-xl border-r border-steel-200/60 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 flex-shrink-0">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-steel-700 to-steel-900 rounded-xl flex items-center justify-center shadow-lg shadow-steel-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-steel-900 leading-none block">Admin</span>
              <span className="text-[10px] font-semibold text-steel-500 uppercase tracking-wider">Panel</span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg text-steel-400 hover:bg-steel-100 hover:text-steel-600 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pt-2 pb-3">
          {adminNavItems.map(item => {
            const isActive = item.path === '/admin'
              ? location.pathname === '/admin'
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item mb-1 ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}

          <div className="mt-6 mb-2 px-3 text-[10px] font-bold text-steel-400 uppercase tracking-[0.1em]">
            Quick Links
          </div>
          <Link
            to="/dashboard"
            className="nav-item nav-item-inactive mb-1"
            onClick={() => setSidebarOpen(false)}
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">Back to App</span>
          </Link>
        </div>

        <div className="p-3 border-t border-steel-100 flex-shrink-0">
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-steel-50 transition-colors">
            <div className="w-9 h-9 bg-gradient-to-br from-steel-200 to-steel-300 rounded-xl flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-steel-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-steel-900 truncate">
                {profile?.display_name || 'Admin'}
              </p>
              <p className="text-[11px] text-steel-400 font-medium">Administrator</p>
            </div>
            <button onClick={handleSignOut} className="p-1.5 rounded-lg text-steel-400 hover:text-danger-500 hover:bg-danger-50 transition-all" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[260px] min-h-screen flex flex-col">
        <header className="h-14 bg-white/80 backdrop-blur-xl border-b border-steel-200/60 flex items-center px-4 lg:px-8 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mr-3 p-2 rounded-xl text-steel-600 hover:bg-steel-100 hover:text-steel-900 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs text-steel-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-steel-500" />
            Admin Portal
          </div>
          <div className="flex-1" />
        </header>
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
