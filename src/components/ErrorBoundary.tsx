import React, { Component, ErrorInfo, ReactNode } from "react";

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
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-light dark:bg-dark p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-dark dark:text-light mb-4">
              Something went wrong
            </h1>
            <p className="text-lg text-dark/75 dark:text-light/75 mb-6">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-dark text-light dark:bg-light dark:text-dark rounded-lg font-semibold hover:opacity-80 transition-opacity"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-8 text-left max-w-2xl mx-auto">
                <summary className="cursor-pointer text-sm text-dark/50 dark:text-light/50 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="bg-dark/5 dark:bg-light/5 p-4 rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

