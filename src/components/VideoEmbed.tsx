import { Play, ExternalLink } from 'lucide-react';
import type { VideoResource } from '../types';

export default function VideoEmbed({ video }: { video: VideoResource }) {
  if (video.embedUrl) {
    return (
      <div className="space-y-3">
        <div className="video-embed rounded-2xl ring-1 ring-steel-200/50 shadow-lg">
          <iframe
            src={video.embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="flex items-center justify-between px-1">
          <p className="text-sm font-semibold text-steel-800">{video.title}</p>
          {video.duration && (
            <span className="text-[10px] font-semibold text-steel-400 bg-steel-100 px-2 py-0.5 rounded-full">{video.duration}</span>
          )}
        </div>
        {video.description && <p className="text-xs text-steel-500 px-1">{video.description}</p>}
      </div>
    );
  }

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-gradient-to-r from-steel-900 to-steel-800 rounded-2xl text-white hover:from-steel-800 hover:to-steel-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
    >
      <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 group-hover:scale-105 transition-all duration-200">
        <Play className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{video.title}</p>
        {video.description && <p className="text-xs text-white/50 mt-0.5 truncate">{video.description}</p>}
      </div>
      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </a>
  );
}
