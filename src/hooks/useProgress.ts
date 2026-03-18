import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { SectionProgress } from '../types';

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<SectionProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setProgress([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('section_progress')
      .select('*')
      .eq('user_id', user.id);
    setProgress(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const toggleSubsection = useCallback(async (sectionId: string, subsectionId: string) => {
    if (!user) return;

    const existing = progress.find(
      (p) => p.section_id === sectionId && p.subsection_id === subsectionId
    );

    if (existing) {
      if (existing.completed) {
        await supabase
          .from('section_progress')
          .update({ completed: false, completed_at: null })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('section_progress')
          .update({ completed: true, completed_at: new Date().toISOString() })
          .eq('id', existing.id);
      }
    } else {
      await supabase.from('section_progress').insert({
        user_id: user.id,
        section_id: sectionId,
        subsection_id: subsectionId,
        completed: true,
        completed_at: new Date().toISOString(),
      });
    }

    await fetchProgress();
  }, [user, progress, fetchProgress]);

  const isCompleted = useCallback((sectionId: string, subsectionId: string) => {
    return progress.some(
      (p) => p.section_id === sectionId && p.subsection_id === subsectionId && p.completed
    );
  }, [progress]);

  const getSectionProgress = useCallback((sectionId: string, totalSubsections: number) => {
    const completed = progress.filter(
      (p) => p.section_id === sectionId && p.completed
    ).length;
    return totalSubsections > 0 ? Math.round((completed / totalSubsections) * 100) : 0;
  }, [progress]);

  const getTotalCompleted = useCallback(() => {
    return progress.filter((p) => p.completed).length;
  }, [progress]);

  return { progress, loading, toggleSubsection, isCompleted, getSectionProgress, getTotalCompleted };
}
