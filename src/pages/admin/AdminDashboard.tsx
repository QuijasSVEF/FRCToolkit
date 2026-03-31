import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, CheckCircle, BookMarked, FileText, TrendingUp, ArrowRight } from 'lucide-react';
import { adminApi, type Analytics } from '../../lib/adminApi';
import { useSections } from '../../contexts/SectionsContext';

function StatCard({ label, value, icon: Icon, color }: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    steel: 'bg-steel-100 text-steel-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-steel-200/80 p-5 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl font-bold text-steel-900">{value.toLocaleString()}</p>
      <p className="text-sm text-steel-500 mt-0.5">{label}</p>
    </div>
  );
}

function MiniBarChart({ data, label }: { data: { date: string; count: number }[]; label: string }) {
  const max = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-white rounded-2xl border border-steel-200/80 p-5">
      <h3 className="text-sm font-semibold text-steel-700 mb-4">{label}</h3>
      <div className="flex items-end gap-[3px] h-32">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
            <div
              className="w-full bg-brand-500 rounded-t-sm transition-all duration-300 group-hover:bg-brand-600 min-h-[2px]"
              style={{ height: `${Math.max((d.count / max) * 100, 2)}%` }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block">
              <div className="bg-steel-900 text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap">
                {d.date.slice(5)}: {d.count}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-steel-400">
        <span>{data[0]?.date.slice(5)}</span>
        <span>{data[data.length - 1]?.date.slice(5)}</span>
      </div>
    </div>
  );
}

function SectionLeaderboard({ completions, sections }: { completions: Record<string, number>; sections: { id: string; title: string }[] }) {
  const sorted = sections
    .map(s => ({ id: s.id, title: s.title, count: completions[s.id] || 0 }))
    .sort((a, b) => b.count - a.count);

  const max = Math.max(...sorted.map(s => s.count), 1);

  return (
    <div className="bg-white rounded-2xl border border-steel-200/80 p-5">
      <h3 className="text-sm font-semibold text-steel-700 mb-4">Module Completion Leaderboard</h3>
      <div className="space-y-2.5">
        {sorted.map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <span className="text-xs text-steel-600 font-medium w-36 truncate flex-shrink-0">{s.title}</span>
            <div className="flex-1 h-5 bg-steel-50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-700"
                style={{ width: `${Math.max((s.count / max) * 100, 2)}%` }}
              />
            </div>
            <span className="text-xs font-bold text-steel-500 w-8 text-right">{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { sections } = useSections();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi.getAnalytics()
      .then(setAnalytics)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger-50 border border-danger-200 rounded-2xl p-6 text-center">
        <p className="text-danger-600 font-medium">{error}</p>
      </div>
    );
  }

  if (!analytics) return null;

  const totalSubsections = sections.reduce((a, s) => a + s.subsections.length, 0);
  const avgCompletionRate = analytics.totalUsers > 0
    ? Math.round((analytics.completedTopics / (analytics.totalUsers * totalSubsections)) * 100)
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-steel-900">Admin Dashboard</h1>
          <p className="text-sm text-steel-500 mt-1">Platform analytics and overview</p>
        </div>
        <Link to="/admin/users" className="btn-primary text-sm">
          Manage Users <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Users" value={analytics.totalUsers} icon={Users} color="brand" />
        <StatCard label="Active Learners" value={analytics.activeUsers} icon={TrendingUp} color="success" />
        <StatCard label="Topics Completed" value={analytics.completedTopics} icon={CheckCircle} color="warning" />
        <StatCard label="Bookmarks Saved" value={analytics.totalBookmarks} icon={BookMarked} color="steel" />
        <StatCard label="Notes Written" value={analytics.totalNotes} icon={FileText} color="brand" />
      </div>

      <div className="bg-white rounded-2xl border border-steel-200/80 p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-steel-700">Average Completion Rate</p>
            <p className="text-xs text-steel-400">{totalSubsections} total topics across {sections.length} modules</p>
          </div>
          <div className="ml-auto">
            <span className="text-3xl font-bold text-brand-600">{avgCompletionRate}%</span>
          </div>
        </div>
        <div className="mt-3 h-3 bg-steel-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-1000"
            style={{ width: `${avgCompletionRate}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <MiniBarChart data={analytics.dailyCompletions} label="Daily Topic Completions (Last 30 Days)" />
        <MiniBarChart data={analytics.dailySignups} label="Daily Signups (Last 30 Days)" />
      </div>

      <SectionLeaderboard completions={analytics.sectionCompletions} sections={sections} />
    </div>
  );
}
