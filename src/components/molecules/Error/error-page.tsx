import React from 'react';
import { HomeIcon, AlertCircle, ArrowLeft } from 'lucide-react';

interface ErrorPageProps {
  title?: string;
  message?: string;
  code?: string | number;
  showHome?: boolean;
}

export function ErrorPage({
  title = "Something went wrong",
  message = "We apologize for the inconvenience. Please try again later.",
  code,
  showHome = true
}: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-red-100 animate-pulse"></div>
            <AlertCircle className="relative w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* Error Code */}
        {code && (
          <div className="flex items-center justify-center space-x-4">
            <div className="w-14 h-px bg-gray-200"></div>
            <div className="font-mono text-4xl font-bold text-gray-400">{code}</div>
            <div className="w-14 h-px bg-gray-200"></div>
          </div>
        )}

        {/* Error Title */}
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

        {/* Error Message */}
        <p className="text-gray-600 max-w-sm mx-auto">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A344f] transition-colors w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>

          {showHome && (
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium text-white bg-[#0A344f] hover:bg-[#0a354fd8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A344f] transition-colors w-full sm:w-auto justify-center"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Back to Login
            </button>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 pointer-events-none">
          <div className="blur-[106px] h-56 bg-gradient-to-br from-[#0A344f] to-purple-400"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300"></div>
        </div>
      </div>
    </div>
  );
}