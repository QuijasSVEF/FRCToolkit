import { ExternalLink, FileText, Video, Link as LinkIcon, Wrench } from 'lucide-react';
import type { Resource } from '../types';

const typeIcons = {
  link: LinkIcon,
  video: Video,
  pdf: FileText,
  tool: Wrench,
};

const typeStyles = {
  link: { card: 'hover:border-brand-200 hover:bg-brand-50/50', iconBg: 'bg-brand-100 text-brand-600', label: 'text-brand-500' },
  video: { card: 'hover:border-danger-200 hover:bg-danger-50/50', iconBg: 'bg-danger-100 text-danger-500', label: 'text-danger-400' },
  pdf: { card: 'hover:border-warning-200 hover:bg-warning-50/50', iconBg: 'bg-warning-100 text-warning-600', label: 'text-warning-500' },
  tool: { card: 'hover:border-success-200 hover:bg-success-50/50', iconBg: 'bg-success-100 text-success-600', label: 'text-success-500' },
};

const typeLabels = { link: 'Link', video: 'Video', pdf: 'PDF', tool: 'Tool' };

export default function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = typeIcons[resource.type];
  const style = typeStyles[resource.type];

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border border-steel-200/80 bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-px group ${style.card}`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${style.iconBg} transition-transform duration-200 group-hover:scale-110`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-steel-800 truncate group-hover:text-steel-900">{resource.title}</p>
        {resource.description && (
          <p className="text-xs text-steel-400 mt-0.5 truncate">{resource.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${style.label} hidden sm:block`}>{typeLabels[resource.type]}</span>
        <ExternalLink className="w-3.5 h-3.5 text-steel-300 opacity-0 group-hover:opacity-100 transition-all duration-200" />
      </div>
    </a>
  );
}
