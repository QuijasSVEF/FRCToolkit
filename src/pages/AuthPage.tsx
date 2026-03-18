import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get('mode') === 'signup';
  const [mode, setMode] = useState<'signin' | 'signup'>(isSignUp ? 'signup' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'signup') {
      const { error: err } = await signUp(email, password, displayName);
      if (err) {
        setError(err);
        setLoading(false);
        return;
      }
    } else {
      const { error: err } = await signIn(email, password);
      if (err) {
        setError(err);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-steel-50 flex flex-col">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-steel-500 hover:text-steel-700 text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-600 rounded-xl mb-4">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-steel-900">
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="mt-2 text-steel-500 text-sm">
              {mode === 'signup'
                ? 'Start your FRCToolkit learning journey'
                : 'Sign in to continue your progress'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-steel-200 p-6 space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-steel-700 mb-1.5">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-steel-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="mentor@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-steel-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Min 6 characters"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-steel-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg text-sm text-danger-600">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Loading...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-steel-500">
            {mode === 'signup' ? (
              <>Already have an account?{' '}
                <button onClick={() => { setMode('signin'); setError(''); }} className="text-brand-600 font-medium hover:underline">
                  Sign in
                </button>
              </>
            ) : (
              <>New mentor?{' '}
                <button onClick={() => { setMode('signup'); setError(''); }} className="text-brand-600 font-medium hover:underline">
                  Create an account
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
