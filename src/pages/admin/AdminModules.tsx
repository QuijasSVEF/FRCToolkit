import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Trash2, ChevronUp, ChevronDown, Pencil, BookOpen,
  Rocket, Calendar, Users, Shield, DollarSign, Wrench, Zap,
  Code, Target, Award, Library, Trophy, Heart, Star, Globe, Layers,
  Cpu, Database, Radio, Compass, Map, Flag, Lightbulb, Megaphone,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useSections } from '../../contexts/SectionsContext';

const iconLookup: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket, Calendar, Users, Shield, DollarSign, Wrench, Zap,
  Code, Target, Award, Library, Trophy, BookOpen, Heart, Star, Globe,
  Layers, Cpu, Database, Radio, Compass, Map, Flag, Lightbulb, Megaphone,
};

interface DbSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimated_minutes: number;
  sort_order: number;
  has_quiz: boolean;
}

export default function AdminModules() {
  const { refresh } = useSections();
  const [dbSections, setDbSections] = useState<DbSection[]>([]);
  const [subCounts, setSubCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    const { data: sectionData, error: sErr } = await supabase
      .from('sections')
      .select('*')
      .order('sort_order', { ascending: true });

    if (sErr) {
      setError(sErr.message);
      setLoading(false);
      return;
    }
    setDbSections(sectionData || []);

    const { data: allSubs } = await supabase.from('subsections').select('section_id');
    if (allSubs) {
      const counts: Record<string, number> = {};
      allSubs.forEach(s => { counts[s.section_id] = (counts[s.section_id] || 0) + 1; });
      setSubCounts(counts);
    }

    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= dbSections.length) return;

    const updated = [...dbSections];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setDbSections(updated);

    for (let i = 0; i < updated.length; i++) {
      await supabase.from('sections').update({ sort_order: i }).eq('id', updated[i].id);
    }
    await refresh();
  };

  const deleteSection = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}" and all its topics? This cannot be undone.`)) return;
    await supabase.from('subsections').delete().eq('section_id', id);
    await supabase.from('sections').delete().eq('id', id);
    await fetchData();
    await refresh();
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
        <Link to="/admin/modules/new" className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> New Module
        </Link>
      </div>

      <div className="space-y-2">
        {dbSections.map((section, i) => {
          const Icon = iconLookup[section.icon] || BookOpen;
          const topicCount = subCounts[section.id] || 0;

          return (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-steel-200/80 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-steel-300/80 group"
            >
              <div className="flex items-center gap-3 p-4">
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button
                    onClick={() => moveSection(i, 'up')}
                    disabled={i === 0}
                    className="p-0.5 rounded text-steel-300 hover:text-steel-600 disabled:opacity-20 transition-colors"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSection(i, 'down')}
                    disabled={i === dbSections.length - 1}
                    className="p-0.5 rounded text-steel-300 hover:text-steel-600 disabled:opacity-20 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-11 h-11 rounded-xl bg-steel-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-50 transition-colors">
                  <Icon className="w-5 h-5 text-steel-600 group-hover:text-brand-600 transition-colors" />
                </div>

                <Link to={`/admin/modules/${section.id}`} className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-steel-900 group-hover:text-brand-700 transition-colors">{section.title}</h3>
                    {section.has_quiz && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-600">Quiz</span>
                    )}
                  </div>
                  <p className="text-xs text-steel-400 truncate mt-0.5">{section.description}</p>
                </Link>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="hidden sm:flex flex-col items-end gap-0.5">
                    <span className="text-xs text-steel-500 font-medium">{topicCount} topics</span>
                    <span className="text-[10px] text-steel-400">{section.estimated_minutes} min</span>
                  </div>

                  <div className="flex items-center gap-0.5">
                    <Link
                      to={`/admin/modules/${section.id}`}
                      className="p-2 rounded-xl text-steel-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                      title="Edit Module"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteSection(section.id, section.title)}
                      className="p-2 rounded-xl text-steel-400 hover:text-danger-600 hover:bg-danger-50 transition-all"
                      title="Delete Module"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {dbSections.length === 0 && (
        <div className="bg-steel-50 rounded-2xl p-12 text-center">
          <BookOpen className="w-10 h-10 text-steel-300 mx-auto mb-3" />
          <p className="text-steel-500 font-medium">No modules yet</p>
          <p className="text-sm text-steel-400 mt-1 mb-4">Create your first learning module to get started.</p>
          <Link to="/admin/modules/new" className="btn-primary text-sm">
            <Plus className="w-4 h-4" /> Create First Module
          </Link>
        </div>
      )}
    </div>
  );
}
