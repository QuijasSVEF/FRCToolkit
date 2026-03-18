import { useParams, Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { sections } from '../data/sections';
import {
  ArrowLeft, ArrowRight, CheckCircle2, BookOpen,
  Rocket, Calendar, Users, Shield, DollarSign, Wrench, Zap,
  Code, Target, Award, Library,
} from 'lucide-react';
import ProgressCheckbox from '../components/ProgressCheckbox';

import GettingStartedContent from '../content/GettingStartedContent';
import SeasonTimelineContent from '../content/SeasonTimelineContent';
import TeamOrganizationContent from '../content/TeamOrganizationContent';
import SafetyComplianceContent from '../content/SafetyComplianceContent';
import FundingGrantsContent from '../content/FundingGrantsContent';
import MechanicalContent from '../content/MechanicalContent';
import ElectricalContent from '../content/ElectricalContent';
import ProgrammingContent from '../content/ProgrammingContent';
import StrategyScoutingContent from '../content/StrategyScoutingContent';
import AwardsContent from '../content/AwardsContent';
import ResourcesContent from '../content/ResourcesContent';

const contentMap: Record<string, React.ComponentType> = {
  'getting-started': GettingStartedContent,
  'season-timeline': SeasonTimelineContent,
  'team-organization': TeamOrganizationContent,
  'safety-compliance': SafetyComplianceContent,
  'funding-grants': FundingGrantsContent,
  'mechanical': MechanicalContent,
  'electrical': ElectricalContent,
  'programming': ProgrammingContent,
  'strategy-scouting': StrategyScoutingContent,
  'awards': AwardsContent,
  'resources': ResourcesContent,
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket, Calendar, Users, Shield, DollarSign, Wrench, Zap,
  Code, Target, Award, Library,
};

const gradientMap: Record<string, string> = {
  Rocket: 'from-blue-500 to-cyan-500',
  Calendar: 'from-teal-500 to-emerald-500',
  Users: 'from-sky-500 to-blue-500',
  Shield: 'from-amber-500 to-orange-500',
  DollarSign: 'from-emerald-500 to-green-500',
  Wrench: 'from-slate-500 to-gray-600',
  Zap: 'from-yellow-500 to-amber-500',
  Code: 'from-blue-600 to-brand-500',
  Target: 'from-rose-500 to-red-500',
  Award: 'from-yellow-400 to-amber-500',
  Library: 'from-brand-500 to-blue-600',
};

function MiniProgressRing({ percent }: { percent: number }) {
  const size = 48;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#eceef2" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          stroke={percent === 100 ? '#10b981' : '#2577eb'}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {percent === 100 ? (
          <CheckCircle2 className="w-5 h-5 text-success-500" />
        ) : (
          <span className="text-[11px] font-bold text-steel-700">{percent}%</span>
        )}
      </div>
    </div>
  );
}

export default function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const { toggleSubsection, isCompleted, getSectionProgress } = useProgress();

  const section = sections.find((s) => s.id === sectionId);
  if (!section) {
    return (
      <div className="text-center py-20">
        <p className="text-steel-500">Section not found.</p>
        <Link to="/dashboard" className="text-brand-600 font-medium mt-2 inline-block hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const currentIndex = sections.indexOf(section);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  const progress = getSectionProgress(section.id, section.subsections.length);
  const completedCount = section.subsections.filter(sub => isCompleted(section.id, sub.id)).length;

  const ContentComponent = contentMap[section.id];
  const SectionIcon = iconMap[section.icon] || BookOpen;
  const gradient = gradientMap[section.icon] || 'from-brand-500 to-brand-600';

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-steel-400 hover:text-brand-600 transition-colors mb-4 group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl border border-steel-200/80 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <SectionIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-steel-900">{section.title}</h1>
                  <p className="text-steel-500 mt-1 text-sm leading-relaxed">{section.description}</p>
                </div>
                <div className="hidden sm:block flex-shrink-0">
                  <MiniProgressRing percent={progress} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-xs font-semibold text-steel-500 whitespace-nowrap">
                  {completedCount} / {section.subsections.length} topics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr,260px] gap-6">
        <div className="space-y-8">
          {ContentComponent && <ContentComponent />}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-steel-200/80 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-steel-800">Progress Checklist</h3>
                <span className={`badge text-[10px] ${progress === 100 ? 'bg-success-50 text-success-600 border border-success-100' : 'bg-brand-50 text-brand-600 border border-brand-100'}`}>
                  {progress}%
                </span>
              </div>
              <div className="space-y-0.5">
                {section.subsections.map((sub) => (
                  <ProgressCheckbox
                    key={sub.id}
                    checked={isCompleted(section.id, sub.id)}
                    onChange={() => toggleSubsection(section.id, sub.id)}
                    label={sub.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden mt-8 bg-white rounded-2xl border border-steel-200/80 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-steel-800">Progress Checklist</h3>
          <span className={`badge text-[10px] ${progress === 100 ? 'bg-success-50 text-success-600 border border-success-100' : 'bg-brand-50 text-brand-600 border border-brand-100'}`}>
            {progress}%
          </span>
        </div>
        <div className="space-y-0.5">
          {section.subsections.map((sub) => (
            <ProgressCheckbox
              key={sub.id}
              checked={isCompleted(section.id, sub.id)}
              onChange={() => toggleSubsection(section.id, sub.id)}
              label={sub.title}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-stretch gap-4 border-t border-steel-100 pt-8">
        {prevSection ? (
          <Link
            to={`/section/${prevSection.id}`}
            className="flex-1 flex items-center gap-3 px-5 py-4 bg-white rounded-2xl border border-steel-200/80 hover:border-steel-300 hover:shadow-md transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 text-steel-400 group-hover:-translate-x-0.5 transition-transform" />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-steel-400 uppercase tracking-wider">Previous</p>
              <p className="text-sm font-semibold text-steel-700 truncate group-hover:text-brand-600 transition-colors">{prevSection.title}</p>
            </div>
          </Link>
        ) : <div className="flex-1" />}
        {nextSection ? (
          <Link
            to={`/section/${nextSection.id}`}
            className="flex-1 flex items-center justify-end gap-3 px-5 py-4 bg-gradient-to-r from-brand-50 to-brand-100/50 rounded-2xl border border-brand-200/60 hover:shadow-md hover:shadow-brand-500/10 transition-all duration-200 group"
          >
            <div className="min-w-0 text-right">
              <p className="text-[10px] font-semibold text-brand-500 uppercase tracking-wider">Next Module</p>
              <p className="text-sm font-semibold text-brand-700 truncate">{nextSection.title}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-brand-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : (
          <Link
            to="/dashboard"
            className="flex-1 flex items-center justify-end gap-3 px-5 py-4 bg-gradient-to-r from-success-50 to-success-100/50 rounded-2xl border border-success-200/60 hover:shadow-md transition-all duration-200 group"
          >
            <div className="min-w-0 text-right">
              <p className="text-[10px] font-semibold text-success-500 uppercase tracking-wider">All Done</p>
              <p className="text-sm font-semibold text-success-700">Back to Dashboard</p>
            </div>
            <ArrowRight className="w-4 h-4 text-success-500 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
