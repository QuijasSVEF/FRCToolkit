import { AlertTriangle, Info, CheckCircle2, Lightbulb, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type Variant = 'info' | 'warning' | 'success' | 'tip';

const variants: Record<Variant, { bg: string; border: string; icon: LucideIcon; iconColor: string; iconBg: string; textColor: string }> = {
  info: { bg: 'bg-brand-50/70', border: 'border-brand-200/60', icon: Info, iconColor: 'text-brand-600', iconBg: 'bg-brand-100', textColor: 'text-brand-800' },
  warning: { bg: 'bg-warning-50/70', border: 'border-warning-200/60', icon: AlertTriangle, iconColor: 'text-warning-600', iconBg: 'bg-warning-100', textColor: 'text-warning-800' },
  success: { bg: 'bg-success-50/70', border: 'border-success-200/60', icon: CheckCircle2, iconColor: 'text-success-600', iconBg: 'bg-success-100', textColor: 'text-success-800' },
  tip: { bg: 'bg-amber-50/70', border: 'border-amber-200/60', icon: Lightbulb, iconColor: 'text-amber-600', iconBg: 'bg-amber-100', textColor: 'text-amber-900' },
};

export default function InfoBox({ variant = 'info', title, children }: { variant?: Variant; title?: string; children: ReactNode }) {
  const v = variants[variant];
  const Icon = v.icon;

  return (
    <div className={`${v.bg} ${v.border} border rounded-2xl p-4`}>
      <div className="flex gap-3">
        <div className={`w-8 h-8 ${v.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${v.iconColor}`} />
        </div>
        <div className="flex-1 pt-0.5">
          {title && <p className={`font-bold text-sm ${v.textColor} mb-1`}>{title}</p>}
          <div className={`text-sm ${v.textColor} leading-relaxed opacity-90`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
