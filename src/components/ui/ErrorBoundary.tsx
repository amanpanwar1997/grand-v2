/**
 * ============================================================================
 * ERROR BOUNDARY
 * ============================================================================
 * 
 * Catches React errors and displays fallback UI
 * Prevents entire app from crashing
 * Logs errors for debugging
 * 
 * ============================================================================
 */

import { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Update state
    this.setState({
      error,
      errorInfo,
    });
    
    // Call custom error handler
    this.props.onError?.(error, errorInfo);
    
    // Log to error tracking service (e.g., Sentry)
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            {/* Error Card */}
            <div className="bg-[#0a0a0a] border border-red-500/50 rounded-xl p-8 md:p-12">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-500/20 rounded-full">
                  <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-[26px] md:text-[30px] font-medium text-white text-center mb-4">
                Oops! Something went wrong
              </h1>

              {/* Description */}
              <p className="text-[15px] text-white/70 text-center mb-8">
                We're sorry, but something unexpected happened. Don't worry, our team has been notified and we're working on a fix.
              </p>

              {/* Error Details (Development only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-6 bg-black/50 border border-white/10 rounded-lg">
                  <p className="text-[13px] font-bold text-red-500 mb-2">
                    Error Details (Development Only):
                  </p>
                  <p className="text-[13px] text-white/60 font-mono mb-4">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="text-[13px] text-white/50 font-mono">
                      <summary className="cursor-pointer hover:text-white/70 mb-2">
                        Component Stack
                      </summary>
                      <pre className="overflow-x-auto whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg transition-colors font-semibold text-[15px]"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0a0a0a] hover:bg-white/5 border border-white/20 text-white rounded-lg transition-colors font-semibold text-[15px]"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </button>
              </div>

              {/* Support Link */}
              <div className="mt-8 text-center">
                <p className="text-[13px] text-white/50">
                  Need help?{' '}
                  <a 
                    href="/contact" 
                    className="text-yellow-500 hover:text-yellow-400 transition-colors"
                  >
                    Contact our support team
                  </a>
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-[13px] text-white/40">
                Error ID: {Date.now().toString(36)}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Usage:
 * 
 * // Wrap your entire app
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * 
 * // Wrap specific sections
 * <ErrorBoundary fallback={<div>Section failed to load</div>}>
 *   <ComplexComponent />
 * </ErrorBoundary>
 * 
 * // With custom error handler
 * <ErrorBoundary onError={(error) => logToService(error)}>
 *   <App />
 * </ErrorBoundary>
 */
