import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Plus, Trash2, ChevronUp, ChevronDown, GripVertical,
  Pencil, X, Check, BookOpen, AlertTriangle,
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

interface TopicRow {
  id: string;
  title: string;
  sort_order: number;
  isNew?: boolean;
  tempKey?: string;
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
  const SelectedIcon = iconLookup[value] || BookOpen;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 border border-steel-200 rounded-xl hover:bg-steel-50 transition-colors text-left"
      >
        <div className="w-9 h-9 rounded-lg bg-steel-100 flex items-center justify-center">
          <SelectedIcon className="w-5 h-5 text-steel-700" />
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium text-steel-800">{value}</span>
          <p className="text-[11px] text-steel-400">Click to change icon</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-steel-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-white border border-steel-200 rounded-xl shadow-2xl z-50 p-3 w-full max-w-sm">
            <p className="text-[10px] font-semibold text-steel-400 uppercase tracking-wider mb-2 px-1">Choose Icon</p>
            <div className="grid grid-cols-5 gap-1.5">
              {AVAILABLE_ICONS.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => { onChange(name); setOpen(false); }}
                  className={`p-2.5 rounded-xl flex flex-col items-center gap-1 transition-all ${
                    value === name
                      ? 'bg-brand-50 text-brand-600 ring-2 ring-brand-500/30'
                      : 'hover:bg-steel-50 text-steel-600'
                  }`}
                  title={name}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[8px] font-medium truncate w-full text-center leading-none">{name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TopicItem({ topic, index, total, editingId, onStartEdit, onCancelEdit, onSaveEdit, editTitle, setEditTitle, onMove, onDelete }: {
  topic: TopicRow;
  index: number;
  total: number;
  editingId: string | null;
  onStartEdit: (id: string, title: string) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: string) => void;
  editTitle: string;
  setEditTitle: (v: string) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  onDelete: (id: string) => void;
}) {
  const isEditing = editingId === (topic.tempKey || topic.id);

  return (
    <div className="flex items-center gap-2 py-2.5 px-3 rounded-xl group hover:bg-steel-50/50 transition-colors">
      <GripVertical className="w-4 h-4 text-steel-300 flex-shrink-0" />
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <button
          onClick={() => onMove(index, 'up')}
          disabled={index === 0}
          className="p-0.5 rounded text-steel-300 hover:text-steel-600 disabled:opacity-20 transition-colors"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onMove(index, 'down')}
          disabled={index === total - 1}
          className="p-0.5 rounded text-steel-300 hover:text-steel-600 disabled:opacity-20 transition-colors"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      <span className="w-6 h-6 rounded-lg bg-steel-100 flex items-center justify-center text-[10px] font-bold text-steel-400 flex-shrink-0">
        {index + 1}
      </span>

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="input-field text-sm flex-1"
            onKeyDown={e => {
              if (e.key === 'Enter') onSaveEdit(topic.tempKey || topic.id);
              if (e.key === 'Escape') onCancelEdit();
            }}
            autoFocus
          />
          <button
            onClick={() => onSaveEdit(topic.tempKey || topic.id)}
            className="p-1.5 rounded-lg text-success-600 hover:bg-success-50 transition-colors"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={onCancelEdit}
            className="p-1.5 rounded-lg text-steel-400 hover:bg-steel-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-steel-800">{topic.title}</span>
            <span className="text-[10px] text-steel-400 font-mono ml-2">{topic.id}</span>
          </div>
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onStartEdit(topic.tempKey || topic.id, topic.title)}
              className="p-1.5 rounded-lg text-steel-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(topic.tempKey || topic.id)}
              className="p-1.5 rounded-lg text-steel-400 hover:text-danger-600 hover:bg-danger-50 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminModuleEditor() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { refresh } = useSections();
  const isNew = moduleId === 'new';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('BookOpen');
  const [estimatedMinutes, setEstimatedMinutes] = useState(15);
  const [hasQuiz, setHasQuiz] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);

  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isNew) {
      supabase
        .from('sections')
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
        .then(({ data }) => {
          setSortOrder((data?.[0]?.sort_order ?? -1) + 1);
        });
      return;
    }

    const load = async () => {
      const { data: sectionData, error: sErr } = await supabase
        .from('sections')
        .select('*')
        .eq('id', moduleId)
        .maybeSingle();

      if (sErr || !sectionData) {
        setError('Module not found');
        setLoading(false);
        return;
      }

      setTitle(sectionData.title);
      setDescription(sectionData.description);
      setIcon(sectionData.icon);
      setEstimatedMinutes(sectionData.estimated_minutes);
      setHasQuiz(sectionData.has_quiz);
      setSortOrder(sectionData.sort_order);

      const { data: subData } = await supabase
        .from('subsections')
        .select('*')
        .eq('section_id', moduleId)
        .order('sort_order', { ascending: true });

      setTopics((subData || []).map(s => ({ id: s.id, title: s.title, sort_order: s.sort_order })));
      setLoading(false);
    };

    load();
  }, [moduleId, isNew]);

  const addTopic = useCallback(() => {
    if (!newTopicTitle.trim()) return;
    const id = slugify(newTopicTitle);
    const tempKey = `new-${Date.now()}`;
    setTopics(prev => [...prev, { id, title: newTopicTitle.trim(), sort_order: prev.length, isNew: true, tempKey }]);
    setNewTopicTitle('');
  }, [newTopicTitle]);

  const deleteTopic = useCallback((idOrKey: string) => {
    setTopics(prev => prev.filter(t => (t.tempKey || t.id) !== idOrKey));
  }, []);

  const startEdit = useCallback((idOrKey: string, currentTitle: string) => {
    setEditingId(idOrKey);
    setEditTitle(currentTitle);
  }, []);

  const saveEdit = useCallback((idOrKey: string) => {
    if (!editTitle.trim()) return;
    setTopics(prev => prev.map(t => {
      if ((t.tempKey || t.id) === idOrKey) {
        const newId = t.isNew ? slugify(editTitle) : t.id;
        return { ...t, title: editTitle.trim(), id: newId };
      }
      return t;
    }));
    setEditingId(null);
  }, [editTitle]);

  const moveTopic = useCallback((index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= topics.length) return;
    const updated = [...topics];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setTopics(updated.map((t, i) => ({ ...t, sort_order: i })));
  }, [topics]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setSaving(true);
    setError('');

    const sectionId = isNew ? slugify(title) : moduleId!;

    if (isNew) {
      const { error: insertErr } = await supabase.from('sections').insert({
        id: sectionId,
        title: title.trim(),
        description: description.trim(),
        icon,
        estimated_minutes: estimatedMinutes,
        sort_order: sortOrder,
        has_quiz: hasQuiz,
      });

      if (insertErr) {
        setError(insertErr.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: updateErr } = await supabase
        .from('sections')
        .update({
          title: title.trim(),
          description: description.trim(),
          icon,
          estimated_minutes: estimatedMinutes,
          has_quiz: hasQuiz,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sectionId);

      if (updateErr) {
        setError(updateErr.message);
        setSaving(false);
        return;
      }

      await supabase.from('subsections').delete().eq('section_id', sectionId);
    }

    if (topics.length > 0) {
      const rows = topics.map((t, i) => ({
        id: t.id,
        section_id: sectionId,
        title: t.title,
        sort_order: i,
      }));

      const { error: subErr } = await supabase.from('subsections').insert(rows);
      if (subErr) {
        setError(subErr.message);
        setSaving(false);
        return;
      }
    }

    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    if (isNew) {
      navigate(`/admin/modules/${sectionId}`, { replace: true });
    }
  };

  const handleDelete = async () => {
    if (!moduleId || isNew) return;
    await supabase.from('subsections').delete().eq('section_id', moduleId);
    await supabase.from('sections').delete().eq('id', moduleId);
    await refresh();
    navigate('/admin/modules', { replace: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error && !title && !isNew) {
    return (
      <div className="space-y-4">
        <Link to="/admin/modules" className="inline-flex items-center gap-1.5 text-sm text-steel-400 hover:text-brand-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Modules
        </Link>
        <div className="bg-danger-50 border border-danger-200 rounded-2xl p-6 text-center">
          <p className="text-danger-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const PreviewIcon = iconLookup[icon] || BookOpen;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/modules" className="p-2 rounded-xl hover:bg-steel-100 text-steel-400 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-steel-900">{isNew ? 'Create Module' : 'Edit Module'}</h1>
            {!isNew && <p className="text-xs text-steel-400 font-mono">{moduleId}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-sm text-success-600 font-medium animate-fade-in">Saved</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="btn-primary text-sm"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isNew ? 'Create Module' : 'Save Changes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-danger-50 border border-danger-200 rounded-xl px-4 py-3 text-sm text-danger-600">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-steel-200/80 p-6 space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-steel-100">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-steel-100 to-steel-200 flex items-center justify-center">
            <PreviewIcon className="w-6 h-6 text-steel-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-steel-900">Module Details</h2>
            <p className="text-xs text-steel-400">Configure the module name, description, and settings</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-steel-700 mb-1.5">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input-field text-base font-medium"
            placeholder="e.g. Advanced Programming Techniques"
          />
          {isNew && title && (
            <p className="text-[11px] text-steel-400 mt-1.5">
              Module ID: <span className="font-mono font-medium text-steel-500">{slugify(title)}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-steel-700 mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="input-field"
            rows={3}
            placeholder="Describe what learners will cover in this module..."
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-steel-700 mb-1.5">Icon</label>
            <IconPicker value={icon} onChange={setIcon} />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-steel-700 mb-1.5">Estimated Time (minutes)</label>
              <input
                type="number"
                value={estimatedMinutes}
                onChange={e => setEstimatedMinutes(parseInt(e.target.value) || 0)}
                className="input-field"
                min={1}
              />
            </div>
            <label className="flex items-center gap-3 p-3 rounded-xl border border-steel-200 hover:bg-steel-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={hasQuiz}
                onChange={e => setHasQuiz(e.target.checked)}
                className="w-4 h-4 rounded border-steel-300 text-brand-600 focus:ring-brand-500"
              />
              <div>
                <span className="text-sm font-medium text-steel-700 block">Has Quiz</span>
                <span className="text-[11px] text-steel-400">Require quiz completion for this module</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-steel-200/80 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-steel-100 mb-4">
          <div>
            <h2 className="text-base font-bold text-steel-900">Topics</h2>
            <p className="text-xs text-steel-400 mt-0.5">
              {topics.length} {topics.length === 1 ? 'topic' : 'topics'} in this module
            </p>
          </div>
        </div>

        {topics.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-steel-50 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-steel-300" />
            </div>
            <p className="text-sm text-steel-400">No topics yet. Add your first topic below.</p>
          </div>
        ) : (
          <div className="space-y-0.5 mb-4">
            {topics.map((topic, i) => (
              <TopicItem
                key={topic.tempKey || topic.id}
                topic={topic}
                index={i}
                total={topics.length}
                editingId={editingId}
                onStartEdit={startEdit}
                onCancelEdit={() => setEditingId(null)}
                onSaveEdit={saveEdit}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                onMove={moveTopic}
                onDelete={deleteTopic}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-3 border-t border-steel-100">
          <input
            type="text"
            value={newTopicTitle}
            onChange={e => setNewTopicTitle(e.target.value)}
            placeholder="New topic title..."
            className="input-field text-sm flex-1"
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTopic(); } }}
          />
          <button
            onClick={addTopic}
            disabled={!newTopicTitle.trim()}
            className="btn-primary text-sm px-4"
          >
            <Plus className="w-4 h-4" /> Add Topic
          </button>
        </div>
      </div>

      {!isNew && (
        <div className="bg-white rounded-2xl border border-danger-200/60 p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-danger-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-steel-900">Danger Zone</h3>
              <p className="text-xs text-steel-500 mt-0.5">
                Permanently delete this module and all its topics. This action cannot be undone.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-sm font-semibold text-danger-600 border border-danger-200 rounded-xl hover:bg-danger-50 transition-colors"
            >
              Delete Module
            </button>
          </div>

          {showDeleteConfirm && (
            <div className="mt-4 p-4 bg-danger-50 rounded-xl border border-danger-200">
              <p className="text-sm text-danger-700 font-medium mb-3">
                Are you sure? This will permanently delete "{title}" and all {topics.length} topics.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn-secondary text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-semibold text-white bg-danger-600 rounded-xl hover:bg-danger-700 transition-colors"
                >
                  Yes, Delete Permanently
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
