import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import VideoEmbed from './VideoEmbed';
import InfoBox from './InfoBox';
import ResourceCard from './ResourceCard';
import CodeBlock from './CodeBlock';
import DataTable from './DataTable';
import CollapsibleSection from './CollapsibleSection';
import QuizBlock from './QuizBlock';
import type { VideoResource, Resource, QuizQuestion } from '../types';

interface ContentBlock {
  id: string;
  block_type: string;
  block_order: number;
  data: Record<string, unknown>;
}

function RenderBlock({ block, sectionId }: { block: ContentBlock; sectionId: string }) {
  const d = block.data;

  switch (block.block_type) {
    case 'heading': {
      const level = (d.level as number) || 2;
      const text = (d.text as string) || '';
      if (level === 2) return <h2 className="text-xl font-bold text-steel-900 mt-8 mb-3">{text}</h2>;
      return <h3 className="text-lg font-semibold text-steel-800 mt-6 mb-2">{text}</h3>;
    }

    case 'text': {
      const content = (d.content as string) || '';
      const paragraphs = content.split(/\n\n+/).filter(Boolean);
      return (
        <div className="space-y-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm text-steel-600 leading-relaxed">{p}</p>
          ))}
        </div>
      );
    }

    case 'list': {
      const items = (d.items as string[]) || [];
      const ordered = d.ordered as boolean;
      const Tag = ordered ? 'ol' : 'ul';
      return (
        <Tag className={`space-y-1.5 ${ordered ? 'list-decimal' : 'list-disc'} list-inside`}>
          {items.filter(Boolean).map((item, i) => (
            <li key={i} className="text-sm text-steel-600 leading-relaxed">{item}</li>
          ))}
        </Tag>
      );
    }

    case 'info_box': {
      const variant = (d.variant as 'info' | 'warning' | 'success' | 'tip') || 'info';
      const title = d.title as string | undefined;
      const content = (d.content as string) || '';
      return <InfoBox variant={variant} title={title || undefined}>{content}</InfoBox>;
    }

    case 'video': {
      const video: VideoResource = {
        title: (d.title as string) || '',
        url: (d.url as string) || '',
        embedUrl: (d.embedUrl as string) || undefined,
        description: (d.description as string) || undefined,
        duration: (d.duration as string) || undefined,
      };
      return <VideoEmbed video={video} />;
    }

    case 'resource': {
      const resource: Resource = {
        title: (d.title as string) || '',
        url: (d.url as string) || '',
        type: (d.type as Resource['type']) || 'link',
        description: (d.description as string) || undefined,
      };
      return <ResourceCard resource={resource} />;
    }

    case 'code_block':
      return <CodeBlock code={(d.code as string) || ''} language={(d.language as string) || ''} />;

    case 'data_table': {
      const columns = (d.columns as { key: string; header: string; width?: string }[]) || [];
      const rows = (d.rows as Record<string, string>[]) || [];
      return <DataTable columns={columns} rows={rows} caption={(d.caption as string) || undefined} />;
    }

    case 'collapsible': {
      const content = (d.content as string) || '';
      return (
        <CollapsibleSection title={(d.title as string) || ''} defaultOpen={d.defaultOpen as boolean}>
          <div className="space-y-2">
            {content.split(/\n\n+/).filter(Boolean).map((p, i) => (
              <p key={i} className="text-sm text-steel-600 leading-relaxed">{p}</p>
            ))}
          </div>
        </CollapsibleSection>
      );
    }

    case 'quiz': {
      const questions = (d.questions as QuizQuestion[]) || [];
      if (questions.length === 0) return null;
      return <QuizBlock questions={questions} sectionId={sectionId} />;
    }

    default:
      return null;
  }
}

export default function ContentRenderer({ sectionId, subsectionId }: {
  sectionId: string;
  subsectionId: string;
}) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('content_blocks')
        .select('*')
        .eq('section_id', sectionId)
        .eq('subsection_id', subsectionId)
        .order('block_order', { ascending: true });
      setBlocks((data || []) as ContentBlock[]);
      setLoading(false);
    };
    load();
  }, [sectionId, subsectionId]);

  if (loading || blocks.length === 0) return null;

  return (
    <div className="space-y-4">
      {blocks.map(block => (
        <RenderBlock key={block.id} block={block} sectionId={sectionId} />
      ))}
    </div>
  );
}
