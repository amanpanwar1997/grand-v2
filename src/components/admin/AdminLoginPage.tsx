import { useState, useEffect } from 'react';
import { useAdminAuth } from '../../utils/adminAuth';
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react';

export function AdminLoginPage() {
  const { login, isAuthenticated } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect') || '/admin';
      window.location.href = redirect;
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          const params = new URLSearchParams(window.location.search);
          const redirect = params.get('redirect') || '/admin';
          window.location.href = redirect;
        }, 1000);
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-[30px] font-medium text-white mb-2">Inchtomilez Admin</h1>
          <p className="text-[15px] text-white/60">Sign in to manage your website</p>
        </div>

        {/* Login Form */}
        <div className="glass p-8 rounded-xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[14px] font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@inchtomilez.com"
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[14px] font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-11 pr-12 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-[14px] text-red-500">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-[14px] text-green-500">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <a
                href="/admin/forgot-password"
                className="text-[14px] text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </form>
        </div>

        {/* Demo Credentials (Remove in production) */}
        <div className="mt-6 glass p-4 rounded-lg border border-white/10">
          <p className="text-[13px] text-white/60 mb-2 font-medium">Demo Credentials:</p>
          <div className="space-y-1 text-[13px] text-white/50">
            <p>Admin: admin@inchtomilez.com / admin123</p>
            <p>Editor: editor@inchtomilez.com / editor123</p>
            <p>Viewer: viewer@inchtomilez.com / viewer123</p>
          </div>
        </div>
      </div>
    </div>
  );
}