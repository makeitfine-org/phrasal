import React, { Component, ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-8xl font-mono font-bold text-orange-500 dark:text-orange-400">500</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">Something Went Wrong</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2 max-w-sm">
            An unexpected error occurred. Try refreshing the page.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mb-8 font-mono max-w-sm break-all">
            {this.state.error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
