import { useState, useMemo, useRef, useEffect, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { sections, getAllSubsections } from '../data/sections';
import {
  BookOpen, LayoutDashboard, LogOut, Menu, X, ChevronRight, User,
  Rocket, Calendar, Users, Shield, DollarSign, Wrench, Zap,
  Code, Target, Award, Library, Search,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket, Calendar, Users, Shield, DollarSign, Wrench, Zap,
  Code, Target, Award, Library,
};

function ProgressRing({ percent, size = 32 }: { percent: number; size?: number }) {
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor"
        strokeWidth={stroke} className="text-steel-100" />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-brand-500 transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { profile, signOut } = useAuth();
  const { getSectionProgress, getTotalCompleted } = useProgress();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const totalSubs = sections.reduce((acc, s) => acc + s.subsections.length, 0);
  const completed = getTotalCompleted();
  const overallPercent = totalSubs > 0 ? Math.round((completed / totalSubs) * 100) : 0;

  const allSubsections = useMemo(() => getAllSubsections(), []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const term = searchQuery.toLowerCase();

  const filteredSections = searchQuery
    ? sections.filter(s =>
        s.title.toLowerCase().includes(term) ||
        s.subsections.some(sub => sub.title.toLowerCase().includes(term))
      )
    : sections;

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return allSubsections
      .filter(sub =>
        sub.title.toLowerCase().includes(term) ||
        sub.sectionTitle.toLowerCase().includes(term)
      )
      .slice(0, 8);
  }, [searchQuery, term, allSubsections]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-steel-50">
      <div
        className={`fixed inset-0 z-40 bg-steel-950/60 backdrop-blur-sm transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[280px] bg-white/95 backdrop-blur-xl border-r border-steel-200/60 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 flex-shrink-0">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-steel-900 leading-none block">FRC</span>
              <span className="text-[10px] font-semibold text-brand-600 uppercase tracking-wider">Toolkit</span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg text-steel-400 hover:bg-steel-100 hover:text-steel-600 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 pb-3 flex-shrink-0" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-steel-400" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full pl-9 pr-3 py-2 bg-steel-50 border-0 rounded-xl text-sm text-steel-700 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all"
            />
            {showDropdown && searchResults.length > 0 && searchQuery.length >= 2 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-steel-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {searchResults.map((result) => (
                  <button
                    key={`${result.sectionId}-${result.subsectionId}`}
                    className="w-full text-left px-3 py-2.5 hover:bg-steel-50 transition-colors border-b border-steel-100 last:border-b-0"
                    onClick={() => {
                      navigate(`/section/${result.sectionId}`);
                      setShowDropdown(false);
                      setSearchQuery('');
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="block text-sm font-medium text-steel-800 truncate">{result.title}</span>
                    <span className="block text-[11px] text-steel-400 truncate">{result.sectionTitle}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3">
          <Link
            to="/dashboard"
            className={`nav-item mb-1 ${location.pathname === '/dashboard' ? 'nav-item-active' : 'nav-item-inactive'}`}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">Dashboard</span>
            <div className="flex items-center gap-1.5">
              <ProgressRing percent={overallPercent} size={22} />
              <span className="text-[10px] font-bold text-steel-400">{overallPercent}%</span>
            </div>
          </Link>

          <div className="mt-4 mb-2 px-3 text-[10px] font-bold text-steel-400 uppercase tracking-[0.1em]">
            Learning Modules
          </div>

          {filteredSections.map((section, i) => {
            const Icon = iconMap[section.icon] || Rocket;
            const isActive = location.pathname === `/section/${section.id}`;
            const progress = getSectionProgress(section.id, section.subsections.length);

            return (
              <Link
                key={section.id}
                to={`/section/${section.id}`}
                className={`nav-item mb-0.5 group relative ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
                onClick={() => setSidebarOpen(false)}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  isActive ? 'bg-brand-100' : progress === 100 ? 'bg-success-50' : 'bg-steel-100 group-hover:bg-steel-200'
                }`}>
                  <Icon className={`w-3.5 h-3.5 ${
                    isActive ? 'text-brand-600' : progress === 100 ? 'text-success-600' : 'text-steel-500'
                  }`} />
                </div>
                <span className="flex-1 truncate text-[13px]">{section.title}</span>
                {progress === 100 ? (
                  <span className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : progress > 0 ? (
                  <ProgressRing percent={progress} size={20} />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-steel-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-3 border-t border-steel-100 flex-shrink-0">
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-steel-50 transition-colors">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-100 to-brand-200 rounded-xl flex items-center justify-center">
              <User className="w-4 h-4 text-brand-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-steel-900 truncate">
                {profile?.display_name || 'Mentor'}
              </p>
              {profile?.team_number && (
                <p className="text-[11px] text-steel-400 font-medium">Team {profile.team_number}</p>
              )}
            </div>
            <button onClick={handleSignOut} className="p-1.5 rounded-lg text-steel-400 hover:text-danger-500 hover:bg-danger-50 transition-all" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[280px] min-h-screen flex flex-col">
        <header className="h-14 bg-white/80 backdrop-blur-xl border-b border-steel-200/60 flex items-center px-4 lg:px-8 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mr-3 p-2 rounded-xl text-steel-600 hover:bg-steel-100 hover:text-steel-900 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-xs text-steel-400 font-medium">
            <div className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
            {completed} of {totalSubs} topics completed
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
