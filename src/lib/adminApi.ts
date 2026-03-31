import { supabase } from './supabase';

const API_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-api`;

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');
  return {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
  };
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  profile: {
    display_name: string;
    team_number: string;
    role: string;
  } | null;
  progress: { total: number; completed: number };
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  completedTopics: number;
  totalBookmarks: number;
  totalNotes: number;
  sectionCompletions: Record<string, number>;
  dailyCompletions: { date: string; count: number }[];
  dailySignups: { date: string; count: number }[];
}

export interface UserDetail {
  progress: {
    section_id: string;
    subsection_id: string;
    completed: boolean;
    completed_at: string | null;
  }[];
  bookmarks: { resource_title: string; resource_url: string; section_id: string }[];
  notes: { section_id: string; content: string; updated_at: string }[];
}

export const adminApi = {
  getUsers: () => request<{ users: AdminUser[] }>('users'),
  getAnalytics: () => request<Analytics>('analytics'),
  getUserProgress: (userId: string) => request<UserDetail>(`user-progress/${userId}`),

  createUser: (email: string, password: string, display_name: string) =>
    request<{ user: unknown }>('create-user', {
      method: 'POST',
      body: JSON.stringify({ email, password, display_name }),
    }),

  resetPassword: (userId: string, newPassword: string) =>
    request<{ success: boolean }>('reset-password', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, new_password: newPassword }),
    }),

  deleteUser: (userId: string) =>
    request<{ success: boolean }>(`user/${userId}`, { method: 'DELETE' }),

  updateRole: (userId: string, role: string) =>
    request<{ success: boolean }>('update-role', {
      method: 'PUT',
      body: JSON.stringify({ user_id: userId, role }),
    }),
};
