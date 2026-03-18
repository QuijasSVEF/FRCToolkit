import { Copy, Check, Terminal } from 'lucide-react';
import { useState } from 'react';

export default function CodeBlock({ code, language = '' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-steel-950 border border-steel-800/60 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 bg-steel-900/80 border-b border-steel-800/60">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-steel-500" />
          {language && <span className="text-[11px] font-semibold text-steel-400 uppercase tracking-wider">{language}</span>}
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-200 ${
            copied ? 'text-success-400 bg-success-500/10' : 'text-steel-400 hover:text-white hover:bg-steel-800'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-steel-200 leading-relaxed font-mono">{code}</code>
      </pre>
    </div>
  );
}
