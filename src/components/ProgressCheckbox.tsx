import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export default function ProgressCheckbox({ checked, onChange, label }: ProgressCheckboxProps) {
  return (
    <button
      onClick={onChange}
      className="checklist-item w-full text-left group"
    >
      <div className="relative flex-shrink-0 mt-0.5">
        {checked ? (
          <CheckCircle2 className="w-5 h-5 text-success-500 transition-all duration-300 scale-100" />
        ) : (
          <Circle className="w-5 h-5 text-steel-300 transition-all duration-200 group-hover:text-brand-400 group-hover:scale-110" />
        )}
      </div>
      <span className={`text-[13px] leading-snug transition-all duration-200 ${
        checked ? 'text-steel-400 line-through decoration-steel-300' : 'text-steel-700 group-hover:text-steel-900'
      }`}>{label}</span>
    </button>
  );
}
