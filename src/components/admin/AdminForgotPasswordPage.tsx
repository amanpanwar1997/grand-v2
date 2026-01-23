import { useState } from 'react';
import { useAdminAuth } from '../../utils/adminAuth';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export function AdminForgotPasswordPage() {
  const { resetPassword } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email) {
      setError('Email address is required');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(email);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="glass p-8 rounded-xl border border-white/10 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-[22px] font-bold text-white mb-3">Check Your Email</h1>
            <p className="text-[15px] text-white/70 mb-6">
              We've sent password reset instructions to <span className="text-white font-medium">{email}</span>
            </p>
            <p className="text-[14px] text-white/60 mb-8">
              Please check your inbox and follow the link to reset your password. The link will expire in 1 hour.
            </p>
            <a
              href="/admin/login"
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[30px] font-medium text-white mb-2">Reset Password</h1>
          <p className="text-[15px] text-white/60">Enter your email to receive reset instructions</p>
        </div>

        {/* Form */}
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

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-[14px] text-red-500">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <a
                href="/admin/login"
                className="inline-flex items-center gap-2 text-[14px] text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
