import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-steel-200/80 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-steel-50/80 hover:bg-steel-100/80 transition-all duration-200 text-left group"
      >
        <span className="font-semibold text-sm text-steel-800 group-hover:text-steel-900 transition-colors">{title}</span>
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${open ? 'bg-brand-100 rotate-180' : 'bg-steel-200/60 group-hover:bg-steel-200'}`}>
          <ChevronDown className={`w-3.5 h-3.5 transition-colors duration-200 ${open ? 'text-brand-600' : 'text-steel-400'}`} />
        </div>
      </button>
      <div className={`transition-all duration-300 ${open ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-5 border-t border-steel-100/80">
          {children}
        </div>
      </div>
    </div>
  );
}
