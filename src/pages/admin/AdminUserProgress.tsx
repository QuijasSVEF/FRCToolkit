import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, BookMarked, FileText, ExternalLink } from 'lucide-react';
import { adminApi, type AdminUser, type UserDetail } from '../../lib/adminApi';
import { useSections } from '../../contexts/SectionsContext';

export default function AdminUserProgress() {
  const { userId } = useParams<{ userId: string }>();
  const { sections } = useSections();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [detail, setDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) return;

    Promise.all([
      adminApi.getUsers(),
      adminApi.getUserProgress(userId),
    ])
      .then(([{ users }, detailData]) => {
        setUser(users.find(u => u.id === userId) || null);
        setDetail(detailData);
      })
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, [userId]);

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

  if (!user || !detail) {
    return (
      <div className="text-center py-20">
        <p className="text-steel-400">User not found</p>
      </div>
    );
  }

  const completedSet = new Set(
    detail.progress.filter(p => p.completed).map(p => `${p.section_id}:${p.subsection_id}`)
  );

  const totalSubsections = sections.reduce((a, s) => a + s.subsections.length, 0);
  const totalCompleted = completedSet.size;
  const overallPct = totalSubsections > 0 ? Math.round((totalCompleted / totalSubsections) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/admin/users" className="p-2 rounded-xl hover:bg-steel-100 text-steel-400 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-steel-900">
            {user.profile?.display_name || 'Unknown User'}
          </h1>
          <p className="text-sm text-steel-500">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-steel-200/80 p-4 text-center">
          <p className="text-3xl font-bold text-brand-600">{overallPct}%</p>
          <p className="text-xs text-steel-500 mt-1">Overall Completion</p>
        </div>
        <div className="bg-white rounded-2xl border border-steel-200/80 p-4 text-center">
          <p className="text-3xl font-bold text-steel-900">{totalCompleted}/{totalSubsections}</p>
          <p className="text-xs text-steel-500 mt-1">Topics Completed</p>
        </div>
        <div className="bg-white rounded-2xl border border-steel-200/80 p-4 text-center">
          <p className="text-3xl font-bold text-steel-900">{detail.bookmarks.length}</p>
          <p className="text-xs text-steel-500 mt-1">Bookmarks</p>
        </div>
        <div className="bg-white rounded-2xl border border-steel-200/80 p-4 text-center">
          <p className="text-3xl font-bold text-steel-900">{detail.notes.length}</p>
          <p className="text-xs text-steel-500 mt-1">Notes</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-steel-900">Module Progress</h2>
        {sections.map(section => {
          const sectionCompleted = section.subsections.filter(
            sub => completedSet.has(`${section.id}:${sub.id}`)
          ).length;
          const sectionPct = section.subsections.length > 0
            ? Math.round((sectionCompleted / section.subsections.length) * 100)
            : 0;

          return (
            <div key={section.id} className="bg-white rounded-2xl border border-steel-200/80 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-steel-800">{section.title}</h3>
                  <p className="text-xs text-steel-400">{sectionCompleted} of {section.subsections.length} topics</p>
                </div>
                <span className={`text-sm font-bold ${sectionPct === 100 ? 'text-success-600' : sectionPct > 0 ? 'text-brand-600' : 'text-steel-400'}`}>
                  {sectionPct}%
                </span>
              </div>
              <div className="h-1.5 bg-steel-100 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    sectionPct === 100 ? 'bg-success-500' : 'bg-brand-500'
                  }`}
                  style={{ width: `${sectionPct}%` }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {section.subsections.map(sub => {
                  const done = completedSet.has(`${section.id}:${sub.id}`);
                  return (
                    <div key={sub.id} className="flex items-center gap-2 py-1">
                      {done ? (
                        <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-steel-300 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${done ? 'text-steel-700' : 'text-steel-400'}`}>{sub.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {detail.bookmarks.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-steel-900 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-brand-500" /> Bookmarks
          </h2>
          <div className="bg-white rounded-2xl border border-steel-200/80 divide-y divide-steel-100">
            {detail.bookmarks.map((b, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-steel-800">{b.resource_title}</p>
                  <p className="text-xs text-steel-400">{b.section_id}</p>
                </div>
                <a
                  href={b.resource_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-steel-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {detail.notes.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-steel-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-500" /> Notes
          </h2>
          <div className="space-y-3">
            {detail.notes.map((n, i) => (
              <div key={i} className="bg-white rounded-2xl border border-steel-200/80 p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                    {sections.find(s => s.id === n.section_id)?.title || n.section_id}
                  </span>
                  <span className="text-[10px] text-steel-400">{new Date(n.updated_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-steel-600 whitespace-pre-wrap line-clamp-4">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
