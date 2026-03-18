export interface Profile {
  id: string;
  display_name: string;
  team_number: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface SectionProgress {
  id: string;
  user_id: string;
  section_id: string;
  subsection_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  resource_url: string;
  resource_title: string;
  section_id: string;
  created_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  section_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedMinutes?: number;
  subsections: Subsection[];
}

export interface Subsection {
  id: string;
  title: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'link' | 'video' | 'pdf' | 'tool';
  description?: string;
}

export interface VideoResource {
  title: string;
  url: string;
  embedUrl?: string;
  description?: string;
  duration?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
