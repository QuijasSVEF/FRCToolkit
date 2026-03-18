import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Bookmark } from '../types';

export function useBookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setBookmarks(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const isBookmarked = useCallback(
    (resourceUrl: string) => bookmarks.some((b) => b.resource_url === resourceUrl),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    async (resourceUrl: string, resourceTitle: string, sectionId: string) => {
      if (!user) return;
      const existing = bookmarks.find((b) => b.resource_url === resourceUrl);
      if (existing) {
        await supabase.from('bookmarks').delete().eq('id', existing.id);
      } else {
        await supabase.from('bookmarks').insert({
          user_id: user.id,
          resource_url: resourceUrl,
          resource_title: resourceTitle,
          section_id: sectionId,
        });
      }
      await fetchBookmarks();
    },
    [user, bookmarks, fetchBookmarks]
  );

  return { bookmarks, loading, isBookmarked, toggleBookmark };
}
