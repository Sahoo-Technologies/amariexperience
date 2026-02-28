import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-lg w-full bg-white border border-stone-200 rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-stone-500 mb-6">
              An unexpected error occurred. Please try again or return to the homepage.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-stone-400 cursor-pointer hover:text-stone-600 transition">
                  Error details
                </summary>
                <pre className="mt-2 p-3 bg-stone-50 rounded-lg text-xs text-stone-600 overflow-x-auto whitespace-pre-wrap">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-amari-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amari-700 transition"
              >
                Try Again
              </button>
              <Link
                to="/"
                onClick={this.handleReset}
                className="bg-white border border-stone-200 text-stone-700 px-6 py-3 rounded-xl font-bold hover:bg-stone-50 transition"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
