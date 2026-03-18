import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { useBookmarks } from '../hooks/useBookmarks';
import { useNotes } from '../hooks/useNotes';
import { sections, getTotalSubsections, quizSections } from '../data/sections';
import { Rocket, Calendar, Users, Shield, DollarSign, Wrench, Zap, Code, Target, Award, Library, ArrowRight, CheckCircle2, CreditCard as Edit3, Save, Flame, Clock, Bookmark as BookmarkIcon, FileText } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket, Calendar, Users, Shield, DollarSign, Wrench, Zap,
  Code, Target, Award, Library,
};

const colorMap: Record<string, string> = {
  Rocket: 'from-blue-500 to-cyan-500',
  Calendar: 'from-teal-500 to-emerald-500',
  Users: 'from-sky-500 to-blue-500',
  Shield: 'from-amber-500 to-orange-500',
  DollarSign: 'from-emerald-500 to-green-500',
  Wrench: 'from-slate-500 to-gray-600',
  Zap: 'from-yellow-500 to-amber-500',
  Code: 'from-blue-600 to-brand-500',
  Target: 'from-rose-500 to-red-500',
  Award: 'from-yellow-400 to-amber-500',
  Library: 'from-brand-500 to-blue-600',
};

function BigProgressRing({ percent }: { percent: number }) {
  const size = 160;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#eceef2"
          strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-[2000ms] ease-out"
          stroke="url(#progress-gradient)"
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2577eb" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-steel-900">{percent}%</span>
        <span className="text-xs font-medium text-steel-400 mt-0.5">complete</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { profile, updateProfile } = useAuth();
  const { getSectionProgress, getTotalCompleted, isCompleted } = useProgress();
  const { bookmarks } = useBookmarks();
  const { recentNotes } = useNotes();
  const totalSubs = getTotalSubsections();
  const completed = getTotalCompleted();
  const overallPercent = totalSubs > 0 ? Math.round((completed / totalSubs) * 100) : 0;

  const [editingProfile, setEditingProfile] = useState(false);
  const [teamNumber, setTeamNumber] = useState(profile?.team_number || '');
  const [displayName, setDisplayName] = useState(profile?.display_name || '');

  const handleSaveProfile = async () => {
    await updateProfile({ display_name: displayName, team_number: teamNumber });
    setEditingProfile(false);
  };

  const inProgressSection = sections.find(s => {
    const p = getSectionProgress(s.id, s.subsections.length);
    return p > 0 && p < 100;
  });
  const nextSection = sections.find(s => getSectionProgress(s.id, s.subsections.length) === 0) || sections[0];

  const getNextIncompleteTopic = (section: typeof sections[0]) => {
    for (const sub of section.subsections) {
      if (!isCompleted(section.id, sub.id)) {
        return sub.title;
      }
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-steel-900">
            Welcome back{profile?.display_name ? `, ${profile.display_name}` : ''}
          </h1>
          <p className="text-steel-500 mt-1 text-sm">Your FRCToolkit learning dashboard</p>
        </div>
        {!editingProfile ? (
          <button onClick={() => setEditingProfile(true)} className="btn-secondary text-sm">
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display name" className="input-field text-sm w-40" />
            <input value={teamNumber} onChange={(e) => setTeamNumber(e.target.value)} placeholder="Team #" className="input-field text-sm w-28" />
            <button onClick={handleSaveProfile} className="btn-primary text-sm"><Save className="w-4 h-4" /> Save</button>
            <button onClick={() => setEditingProfile(false)} className="btn-ghost text-sm">Cancel</button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-steel-200/80 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-md shadow-brand-500/20">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-steel-900">{overallPercent}%</p>
                  <p className="text-[11px] text-steel-500 font-medium">Overall Progress</p>
                </div>
              </div>
              <div className="mt-3 progress-bar">
                <div className="progress-bar-fill" style={{ width: `${overallPercent}%` }} />
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-steel-200/80 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-success-400 to-success-600 rounded-xl flex items-center justify-center shadow-md shadow-success-500/20">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-steel-900">{completed}</p>
                  <p className="text-[11px] text-steel-500 font-medium">Topics Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-steel-200/80 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-warning-400 to-warning-600 rounded-xl flex items-center justify-center shadow-md shadow-warning-500/20">
                  <Library className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-steel-900">{totalSubs - completed}</p>
                  <p className="text-[11px] text-steel-500 font-medium">Topics Remaining</p>
                </div>
              </div>
            </div>
          </div>

          {(inProgressSection || nextSection) && (
            <Link
              to={`/section/${(inProgressSection || nextSection).id}`}
              className="block bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-5 text-white hover:shadow-xl hover:shadow-brand-500/25 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
                {inProgressSection ? 'Continue where you left off' : 'Recommended next module'}
              </p>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{(inProgressSection || nextSection).title}</h3>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-sm text-white/70 mt-1">{(inProgressSection || nextSection).description}</p>
            </Link>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-steel-200/80 p-6 flex flex-col items-center justify-center">
          <BigProgressRing percent={overallPercent} />
          <p className="mt-4 text-sm font-semibold text-steel-700">{completed} of {totalSubs} topics</p>
          <p className="text-xs text-steel-400 mt-1">Keep going! You're doing great.</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-steel-900 mb-4">All Learning Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-in">
          {sections.map((section) => {
            const Icon = iconMap[section.icon] || Rocket;
            const gradient = colorMap[section.icon] || 'from-brand-500 to-brand-600';
            const progress = getSectionProgress(section.id, section.subsections.length);
            const completedCount = Math.round((progress / 100) * section.subsections.length);
            const nextTopic = progress < 100 ? getNextIncompleteTopic(section) : null;
            const hasQuiz = quizSections.includes(section.id);
            const quizDone = hasQuiz && isCompleted(section.id, 'quiz-complete');

            return (
              <Link
                key={section.id}
                to={`/section/${section.id}`}
                className="section-card group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {section.estimatedMinutes && (
                      <span className="flex items-center gap-1 text-[11px] text-steel-400 font-medium">
                        <Clock className="w-3 h-3" />
                        ~{section.estimatedMinutes}min
                      </span>
                    )}
                    {progress === 100 && (
                      <span className="badge bg-success-50 text-success-600 border border-success-100">Complete</span>
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-steel-900 group-hover:text-brand-700 transition-colors">
                  {section.title}
                </h3>
                {nextTopic && (
                  <p className="text-xs text-brand-500 font-medium mt-0.5">Next: {nextTopic}</p>
                )}
                <p className="mt-1 text-sm text-steel-500 leading-relaxed line-clamp-2">
                  {section.description}
                </p>
                {hasQuiz && (
                  <div className="mt-2">
                    {quizDone ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-success-50 text-success-600 border border-success-100">
                        <CheckCircle2 className="w-3 h-3" />
                        Quiz Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                        <FileText className="w-3 h-3" />
                        Quiz Required
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-steel-400 mb-1.5">
                    <span>{completedCount} of {section.subsections.length} topics</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-sm text-brand-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {progress > 0 ? 'Continue' : 'Start'} Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-steel-900 mb-3">Your Bookmarked Resources</h2>
        {bookmarks.length === 0 ? (
          <p className="text-sm text-steel-400 bg-steel-50 rounded-xl p-4 text-center">
            Bookmark resources from any module to save them here.
          </p>
        ) : (
          <div className="space-y-2">
            {bookmarks.map(b => (
              <a
                key={b.id}
                href={b.resource_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-xl border border-steel-200 p-4 hover:shadow-sm transition-shadow"
              >
                <BookmarkIcon className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span className="text-sm font-medium text-steel-800">{b.resource_title}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-steel-900 mb-3">Recent Notes</h2>
        {recentNotes.length === 0 ? (
          <p className="text-sm text-steel-400 bg-steel-50 rounded-xl p-4 text-center">
            Add notes to any module to see them here.
          </p>
        ) : (
          <div className="space-y-2">
            {recentNotes.map(note => {
              const sec = sections.find(s => s.id === note.section_id);
              return (
                <Link key={note.id} to={`/section/${note.section_id}`} className="block bg-white rounded-xl border border-steel-200 p-4 hover:shadow-sm transition-shadow">
                  <p className="text-sm font-semibold text-steel-800">{sec?.title || note.section_id}</p>
                  <p className="text-xs text-steel-400 mt-1 line-clamp-2">{note.content}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
