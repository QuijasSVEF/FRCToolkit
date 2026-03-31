import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Save, X,
  Pencil, BookOpen,
  Rocket, Calendar, Users, Shield, DollarSign, Wrench, Zap,
  Code, Target, Award, Library, Trophy, Heart, Star, Globe, Layers,
  Cpu, Database, Radio, Compass, Map, Flag, Lightbulb, Megaphone,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useSections } from '../../contexts/SectionsContext';

const AVAILABLE_ICONS: { name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: 'Rocket', icon: Rocket },
  { name: 'Calendar', icon: Calendar },
  { name: 'Users', icon: Users },
  { name: 'Shield', icon: Shield },
  { name: 'DollarSign', icon: DollarSign },
  { name: 'Wrench', icon: Wrench },
  { name: 'Zap', icon: Zap },
  { name: 'Code', icon: Code },
  { name: 'Target', icon: Target },
  { name: 'Award', icon: Award },
  { name: 'Library', icon: Library },
  { name: 'Trophy', icon: Trophy },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Heart', icon: Heart },
  { name: 'Star', icon: Star },
  { name: 'Globe', icon: Globe },
  { name: 'Layers', icon: Layers },
  { name: 'Cpu', icon: Cpu },
  { name: 'Database', icon: Database },
  { name: 'Radio', icon: Radio },
  { name: 'Compass', icon: Compass },
  { name: 'Map', icon: Map },
  { name: 'Flag', icon: Flag },
  { name: 'Lightbulb', icon: Lightbulb },
  { name: 'Megaphone', icon: Megaphone },
];

const iconLookup: Record<string, React.ComponentType<{ className?: string }>> = {};
for (const item of AVAILABLE_ICONS) {
  iconLookup[item.name] = item.icon;
}

interface DbSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimated_minutes: number;
  sort_order: number;
  has_quiz: boolean;
}

interface DbSubsection {
  id: string;
  section_id: string;
  title: string;
  sort_order: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 border border-steel-200 rounded-xl hover:bg-steel-50 transition-colors"
      >
        {(() => {
          const Icon = iconLookup[value] || BookOpen;
          return <Icon className="w-5 h-5 text-steel-700" />;
        })()}
        <span className="text-sm text-steel-600">{value}</span>
        <ChevronDown className="w-3.5 h-3.5 text-steel-400" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-white border border-steel-200 rounded-xl shadow-xl z-50 p-2 grid grid-cols-5 gap-1 w-64">
            {AVAILABLE_ICONS.map(({ name, icon: Icon }) => (
              <button
                key={name}
                type="button"
                onClick={() => { onChange(name); setOpen(false); }}
                className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-colors ${
                  value === name ? 'bg-brand-50 text-brand-600' : 'hover:bg-steel-50 text-steel-600'
                }`}
                title={name}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] truncate w-full text-center">{name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CreateModuleModal({ onClose, onCreated, nextSortOrder }: {
  onClose: () => void;
  onCreated: () => void;
  nextSortOrder: number;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('BookOpen');
  const [estimatedMinutes, setEstimatedMinutes] = useState(15);
  const [hasQuiz, setHasQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError('');

    const id = slugify(title);
    const { error: err } = await supabase.from('sections').insert({
      id,
      title: title.trim(),
      description: description.trim(),
      icon,
      estimated_minutes: estimatedMinutes,
      sort_order: nextSortOrder,
      has_quiz: hasQuiz,
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-steel-950/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-steel-900">Create New Module</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-steel-100 text-steel-400"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="input-field"
              required
              placeholder="e.g. Advanced Programming"
            />
            {title && <p className="text-[11px] text-steel-400 mt-1">ID: {slugify(title)}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="input-field"
              rows={2}
              placeholder="Brief description of this module"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-steel-700 mb-1">Icon</label>
              <IconPicker value={icon} onChange={setIcon} />
            </div>
            <div>
              <label className="block text-sm font-medium text-steel-700 mb-1">Est. Minutes</label>
              <input
                type="number"
                value={estimatedMinutes}
                onChange={e => setEstimatedMinutes(parseInt(e.target.value) || 0)}
                className="input-field"
                min={1}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasQuiz}
              onChange={e => setHasQuiz(e.target.checked)}
              className="w-4 h-4 rounded border-steel-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-steel-700">Has Quiz</span>
          </label>
          {error && <p className="text-sm text-danger-600 bg-danger-50 rounded-xl px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating...' : 'Create Module'}
          </button>
        </form>
      </div>
    </div>
  );
}

function EditModuleModal({ section, onClose, onSaved }: {
  section: DbSection;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description);
  const [icon, setIcon] = useState(section.icon);
  const [estimatedMinutes, setEstimatedMinutes] = useState(section.estimated_minutes);
  const [hasQuiz, setHasQuiz] = useState(section.has_quiz);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: err } = await supabase
      .from('sections')
      .update({
        title: title.trim(),
        description: description.trim(),
        icon,
        estimated_minutes: estimatedMinutes,
        has_quiz: hasQuiz,
        updated_at: new Date().toISOString(),
      })
      .eq('id', section.id);

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-steel-950/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-steel-900">Edit Module</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-steel-100 text-steel-400"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-1">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="input-field" rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-steel-700 mb-1">Icon</label>
              <IconPicker value={icon} onChange={setIcon} />
            </div>
            <div>
              <label className="block text-sm font-medium text-steel-700 mb-1">Est. Minutes</label>
              <input
                type="number"
                value={estimatedMinutes}
                onChange={e => setEstimatedMinutes(parseInt(e.target.value) || 0)}
                className="input-field"
                min={1}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasQuiz}
              onChange={e => setHasQuiz(e.target.checked)}
              className="w-4 h-4 rounded border-steel-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-steel-700">Has Quiz</span>
          </label>
          <p className="text-[11px] text-steel-400">Module ID: {section.id} (cannot be changed)</p>
          {error && <p className="text-sm text-danger-600 bg-danger-50 rounded-xl px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

function SubsectionManager({ sectionId }: { sectionId: string }) {
  const [subsections, setSubsections] = useState<DbSubsection[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchSubsections = useCallback(async () => {
    const { data } = await supabase
      .from('subsections')
      .select('*')
      .eq('section_id', sectionId)
      .order('sort_order', { ascending: true });
    setSubsections(data || []);
    setLoading(false);
  }, [sectionId]);

  useEffect(() => { fetchSubsections(); }, [fetchSubsections]);

  const addSubsection = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    const id = slugify(newTitle);
    const nextOrder = subsections.length;

    await supabase.from('subsections').insert({
      id,
      section_id: sectionId,
      title: newTitle.trim(),
      sort_order: nextOrder,
    });

    setNewTitle('');
    await fetchSubsections();
    setSaving(false);
  };

  const deleteSubsection = async (id: string) => {
    await supabase.from('subsections').delete().eq('section_id', sectionId).eq('id', id);
    await fetchSubsections();
  };

  const saveEdit = async (id: string) => {
    if (!editTitle.trim()) return;
    await supabase
      .from('subsections')
      .update({ title: editTitle.trim() })
      .eq('section_id', sectionId)
      .eq('id', id);
    setEditingId(null);
    await fetchSubsections();
  };

  const moveSubsection = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= subsections.length) return;

    const updated = [...subsections];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);

    for (let i = 0; i < updated.length; i++) {
      await supabase
        .from('subsections')
        .update({ sort_order: i })
        .eq('section_id', sectionId)
        .eq('id', updated[i].id);
    }

    await fetchSubsections();
  };

  if (loading) {
    return <div className="py-4 text-center text-sm text-steel-400">Loading topics...</div>;
  }

  return (
    <div className="space-y-2">
      {subsections.map((sub, i) => (
        <div key={sub.id} className="flex items-center gap-2 group">
          <GripVertical className="w-4 h-4 text-steel-300 flex-shrink-0" />
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => moveSubsection(i, 'up')}
              disabled={i === 0}
              className="p-0.5 rounded text-steel-300 hover:text-steel-600 disabled:opacity-30 transition-colors"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => moveSubsection(i, 'down')}
              disabled={i === subsections.length - 1}
              className="p-0.5 rounded text-steel-300 hover:text-steel-600 disabled:opacity-30 transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          {editingId === sub.id ? (
            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="input-field text-sm flex-1"
                onKeyDown={e => { if (e.key === 'Enter') saveEdit(sub.id); if (e.key === 'Escape') setEditingId(null); }}
                autoFocus
              />
              <button onClick={() => saveEdit(sub.id)} className="p-1.5 rounded-lg text-success-600 hover:bg-success-50 transition-colors">
                <Save className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg text-steel-400 hover:bg-steel-100 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <span className="flex-1 text-sm text-steel-700">{sub.title}</span>
              <span className="text-[10px] text-steel-400 font-mono">{sub.id}</span>
              <button
                onClick={() => { setEditingId(sub.id); setEditTitle(sub.title); }}
                className="p-1 rounded-lg text-steel-300 hover:text-brand-600 hover:bg-brand-50 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteSubsection(sub.id)}
                className="p-1 rounded-lg text-steel-300 hover:text-danger-600 hover:bg-danger-50 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      ))}

      <div className="flex items-center gap-2 pt-2 border-t border-steel-100">
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Add new topic..."
          className="input-field text-sm flex-1"
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSubsection(); } }}
        />
        <button
          onClick={addSubsection}
          disabled={saving || !newTitle.trim()}
          className="btn-primary text-sm px-3 py-2"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function AdminModules() {
  const { refresh } = useSections();
  const [dbSections, setDbSections] = useState<DbSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editSection, setEditSection] = useState<DbSection | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchSections = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('sections')
      .select('*')
      .order('sort_order', { ascending: true });

    if (err) {
      setError(err.message);
    } else {
      setDbSections(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchSections(); }, [fetchSections]);

  const handleRefresh = async () => {
    await fetchSections();
    await refresh();
  };

  const deleteSection = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this module and all its topics? This cannot be undone.`)) return;

    await supabase.from('subsections').delete().eq('section_id', id);
    await supabase.from('sections').delete().eq('id', id);
    await handleRefresh();
  };

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= dbSections.length) return;

    const updated = [...dbSections];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);

    for (let i = 0; i < updated.length; i++) {
      await supabase
        .from('sections')
        .update({ sort_order: i })
        .eq('id', updated[i].id);
    }

    await handleRefresh();
  };

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

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-steel-900">Module Management</h1>
          <p className="text-sm text-steel-500 mt-1">{dbSections.length} modules configured</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> New Module
        </button>
      </div>

      <div className="space-y-3">
        {dbSections.map((section, i) => {
          const Icon = iconLookup[section.icon] || BookOpen;
          const isExpanded = expandedId === section.id;

          return (
            <div key={section.id} className="bg-white rounded-2xl border border-steel-200/80 overflow-hidden transition-all duration-200 hover:shadow-sm">
              <div className="flex items-center gap-3 p-4">
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button
                    onClick={() => moveSection(i, 'up')}
                    disabled={i === 0}
                    className="p-0.5 rounded text-steel-300 hover:text-steel-600 disabled:opacity-30 transition-colors"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSection(i, 'down')}
                    disabled={i === dbSections.length - 1}
                    className="p-0.5 rounded text-steel-300 hover:text-steel-600 disabled:opacity-30 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-10 h-10 rounded-xl bg-steel-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-steel-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-steel-900 truncate">{section.title}</h3>
                    {section.has_quiz && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-600">Quiz</span>
                    )}
                  </div>
                  <p className="text-xs text-steel-400 truncate">{section.description}</p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-xs text-steel-400 font-mono mr-2">{section.estimated_minutes}min</span>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : section.id)}
                    className="p-1.5 rounded-lg text-steel-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                    title="Manage Topics"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    onClick={() => setEditSection(section)}
                    className="p-1.5 rounded-lg text-steel-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                    title="Edit Module"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSection(section.id)}
                    className="p-1.5 rounded-lg text-steel-400 hover:text-danger-600 hover:bg-danger-50 transition-all"
                    title="Delete Module"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-steel-100">
                  <div className="pt-3">
                    <p className="text-xs font-semibold text-steel-500 uppercase tracking-wider mb-3">Topics</p>
                    <SubsectionManager sectionId={section.id} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {dbSections.length === 0 && (
        <div className="bg-steel-50 rounded-2xl p-12 text-center">
          <BookOpen className="w-10 h-10 text-steel-300 mx-auto mb-3" />
          <p className="text-steel-500 font-medium">No modules yet</p>
          <p className="text-sm text-steel-400 mt-1">Create your first learning module to get started.</p>
        </div>
      )}

      {showCreate && (
        <CreateModuleModal
          onClose={() => setShowCreate(false)}
          onCreated={handleRefresh}
          nextSortOrder={dbSections.length}
        />
      )}
      {editSection && (
        <EditModuleModal
          section={editSection}
          onClose={() => setEditSection(null)}
          onSaved={handleRefresh}
        />
      )}
    </div>
  );
}
