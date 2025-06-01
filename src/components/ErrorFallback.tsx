import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-red-700 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-700 mb-4">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Go to Home
          </Button>
          <Button 
            onClick={resetErrorBoundary}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
