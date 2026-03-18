import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Rocket, Calendar, Users, Shield, DollarSign, Wrench, Zap,
  Code, Target, Award, Library, ArrowRight, CheckCircle2, BookOpen,
  Play, Star, Sparkles, GraduationCap,
} from 'lucide-react';

const features = [
  { icon: Rocket, title: 'Getting Started', desc: 'Team registration, mentor onboarding, and your first steps in FRC', color: 'from-blue-500 to-cyan-500' },
  { icon: Calendar, title: 'Season Timeline', desc: 'Month-by-month guide from off-season through Championship', color: 'from-teal-500 to-emerald-500' },
  { icon: Users, title: 'Team Organization', desc: 'Roles, subteams, student leadership, and culture building', color: 'from-sky-500 to-blue-500' },
  { icon: Shield, title: 'Safety & Compliance', desc: 'Youth protection, workshop safety, PPE, and battery handling', color: 'from-amber-500 to-orange-500' },
  { icon: DollarSign, title: 'Funding & Grants', desc: 'Budget templates, sponsorship tiers, and grantwriting guides', color: 'from-emerald-500 to-green-500' },
  { icon: Wrench, title: 'Mechanical Systems', desc: 'Drivetrain options, KitBot builds, CAD tools, and fabrication', color: 'from-slate-500 to-gray-600' },
  { icon: Zap, title: 'Electrical & Wiring', desc: 'Power distribution, motor controllers, CAN bus, and radio setup', color: 'from-yellow-500 to-amber-500' },
  { icon: Code, title: 'Programming', desc: 'WPILib, command-based architecture, autonomous, and vision', color: 'from-blue-600 to-brand-500' },
  { icon: Target, title: 'Strategy & Scouting', desc: 'Match strategy, scouting systems, data APIs, and alliance selection', color: 'from-rose-500 to-red-500' },
  { icon: Award, title: 'Awards', desc: 'Every award category, submission tips, Impact Award preparation', color: 'from-yellow-400 to-amber-500' },
  { icon: Library, title: 'Resources & Links', desc: '100+ curated links, embedded videos, official docs, and tools', color: 'from-brand-500 to-blue-600' },
];

const stats = [
  { value: '11', label: 'Learning Modules', icon: BookOpen },
  { value: '65+', label: 'Topics Covered', icon: GraduationCap },
  { value: '100+', label: 'Resource Links', icon: Sparkles },
  { value: 'Free', label: 'Always Free', icon: Star },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-steel-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-steel-900 leading-none block">FRC</span>
              <span className="text-[10px] font-semibold text-brand-600 uppercase tracking-wider">Toolkit</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/dashboard" className="btn-primary text-sm">
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link to="/auth" className="btn-ghost text-sm hidden sm:inline-flex">Sign In</Link>
                <Link to="/auth?mode=signup" className="btn-primary text-sm">Get Started Free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 hero-grid" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-success-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-8 animate-fade-in border border-brand-100">
            <Rocket className="w-4 h-4" />
            The Complete FRC Mentor Toolkit
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-steel-950 leading-[1.1] tracking-tight animate-slide-up">
            Everything a New
            <br />
            FRC Mentor
            <span className="relative inline-block ml-3 sm:ml-4">
              <span className="relative z-10 bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">Needs</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4" stroke="#3b95f6" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-steel-500 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A comprehensive, step-by-step learning platform covering everything from starting a team
            to wiring a robot, writing grants, and winning awards.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to={user ? '/dashboard' : '/auth?mode=signup'}
              className="btn-primary text-base px-8 py-3.5 shadow-xl shadow-brand-600/20"
            >
              Start Learning Free <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#modules" className="btn-secondary text-base px-8 py-3.5 group">
              <Play className="w-4 h-4 text-brand-500 group-hover:scale-110 transition-transform" />
              Explore Modules
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-steel-100 bg-steel-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm border border-steel-100 mb-3">
                  <stat.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div className="text-3xl font-extrabold text-steel-900">{stat.value}</div>
                <div className="mt-1 text-sm text-steel-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="modules" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Complete Curriculum</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-steel-900">11 Deep-Dive Learning Modules</h2>
            <p className="mt-4 text-lg text-steel-500 max-w-2xl mx-auto">
              Each module contains detailed walkthroughs, official resources, embedded videos,
              comparison tables, and interactive checklists.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-in">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative bg-white rounded-2xl border border-steel-200/80 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 hover:border-brand-200"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg shadow-steel-900/5 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-steel-900 group-hover:text-brand-700 transition-colors">{f.title}</h3>
                <p className="mt-2 text-sm text-steel-500 leading-relaxed">{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                  Explore module <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-steel-50/80 border-y border-steel-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Why FRCToolkit</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-steel-900">Built by mentors, for mentors</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Interactive Progress Tracking', desc: 'Check off topics as you learn. Animated progress rings show your completion across all modules in real time.' },
              { title: 'Verified Official Sources', desc: 'Every resource links to FIRST official docs, WPILib, vendor documentation, and verified community resources. No dead links.' },
              { title: 'Step-by-Step Learning Path', desc: 'From "What is FRC?" to advanced autonomous programming. Each topic builds logically so nothing gets skipped.' },
              { title: 'Everything In One Place', desc: 'Stop hunting across dozens of websites. Embedded videos, comparison tables, templates, and walkthroughs organized by topic.' },
            ].map((item, i) => (
              <div key={item.title} className="flex gap-4 p-5 bg-white rounded-2xl border border-steel-200/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-10 h-10 bg-success-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-success-500" />
                </div>
                <div>
                  <h3 className="font-bold text-steel-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-steel-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-steel-900 via-steel-800 to-steel-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur rounded-2xl mb-6 border border-white/10">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-steel-300 text-lg leading-relaxed max-w-xl mx-auto">
            Create a free account and begin your journey as an FRC mentor.
            Track your learning, bookmark resources, and build your team with confidence.
          </p>
          <Link
            to={user ? '/dashboard' : '/auth?mode=signup'}
            className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-steel-900 font-bold rounded-xl hover:bg-brand-50 hover:text-brand-700 transition-all duration-200 shadow-xl"
          >
            {user ? 'Go to Dashboard' : 'Create Free Account'} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-steel-950 text-center">
        <p className="text-steel-500 text-sm">FRCToolkit is a community resource. Not officially affiliated with or endorsed by FIRST.</p>
        <p className="mt-1 text-steel-600 text-xs">All FIRST-related content links to official FIRST sources.</p>
      </footer>
    </div>
  );
}
