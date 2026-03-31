import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { Section } from '../types';
import { sections as fallbackSections, quizSections as fallbackQuizSections } from '../data/sections';

interface SectionsContextType {
  sections: Section[];
  quizSections: string[];
  loading: boolean;
  refresh: () => Promise<void>;
  getAllSubsections: () => { sectionId: string; subsectionId: string; title: string; sectionTitle: string }[];
  getTotalSubsections: () => number;
}

const SectionsContext = createContext<SectionsContextType | undefined>(undefined);

export function SectionsProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<Section[]>(fallbackSections);
  const [quizSections, setQuizSections] = useState<string[]>(fallbackQuizSections);
  const [loading, setLoading] = useState(true);

  const fetchSections = useCallback(async () => {
    try {
      const { data: sectionRows, error: sErr } = await supabase
        .from('sections')
        .select('*')
        .order('sort_order', { ascending: true });

      if (sErr || !sectionRows || sectionRows.length === 0) {
        setSections(fallbackSections);
        setQuizSections(fallbackQuizSections);
        setLoading(false);
        return;
      }

      const { data: subRows, error: subErr } = await supabase
        .from('subsections')
        .select('*')
        .order('sort_order', { ascending: true });

      if (subErr) {
        setSections(fallbackSections);
        setQuizSections(fallbackQuizSections);
        setLoading(false);
        return;
      }

      const subMap: Record<string, { id: string; title: string }[]> = {};
      for (const sub of subRows || []) {
        if (!subMap[sub.section_id]) subMap[sub.section_id] = [];
        subMap[sub.section_id].push({ id: sub.id, title: sub.title });
      }

      const mapped: Section[] = sectionRows.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
        estimatedMinutes: s.estimated_minutes,
        subsections: subMap[s.id] || [],
      }));

      const quizIds = sectionRows.filter(s => s.has_quiz).map(s => s.id);

      setSections(mapped);
      setQuizSections(quizIds);
    } catch {
      setSections(fallbackSections);
      setQuizSections(fallbackQuizSections);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSections(); }, [fetchSections]);

  const getAllSubsections = useCallback(() => {
    const result: { sectionId: string; subsectionId: string; title: string; sectionTitle: string }[] = [];
    for (const section of sections) {
      for (const sub of section.subsections) {
        result.push({
          sectionId: section.id,
          subsectionId: sub.id,
          title: sub.title,
          sectionTitle: section.title,
        });
      }
    }
    return result;
  }, [sections]);

  const getTotalSubsections = useCallback(() => {
    return sections.reduce((total, section) => total + section.subsections.length, 0);
  }, [sections]);

  return (
    <SectionsContext.Provider value={{ sections, quizSections, loading, refresh: fetchSections, getAllSubsections, getTotalSubsections }}>
      {children}
    </SectionsContext.Provider>
  );
}

export function useSections() {
  const ctx = useContext(SectionsContext);
  if (!ctx) throw new Error('useSections must be used within SectionsProvider');
  return ctx;
}
