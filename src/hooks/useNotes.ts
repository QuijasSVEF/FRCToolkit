import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Note } from '../types';

export function useNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    if (!user) {
      setNotes([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });
    setNotes(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const getNote = useCallback(
    (sectionId: string) => notes.find((n) => n.section_id === sectionId),
    [notes]
  );

  const saveNote = useCallback(
    async (sectionId: string, content: string) => {
      if (!user) return;
      const existing = notes.find((n) => n.section_id === sectionId);
      if (existing) {
        await supabase
          .from('notes')
          .update({ content, updated_at: new Date().toISOString() })
          .eq('id', existing.id);
      } else {
        await supabase.from('notes').insert({
          user_id: user.id,
          section_id: sectionId,
          content,
        });
      }
      await fetchNotes();
    },
    [user, notes, fetchNotes]
  );

  const recentNotes = notes.slice(0, 3);

  return { notes, loading, getNote, saveNote, recentNotes };
}
