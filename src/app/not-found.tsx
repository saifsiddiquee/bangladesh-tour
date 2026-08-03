import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-monsoon-slate dark:to-slate-900" />
      
      <h1 className="font-display mb-4 text-7xl font-bold text-sundarbans dark:text-sundarbans-400 sm:text-9xl">
        404
      </h1>
      <h2 className="mb-6 text-2xl font-semibold text-slate-800 dark:text-slate-200 sm:text-3xl">
        Page Not Found
      </h2>
      <p className="mb-10 max-w-md text-slate-600 dark:text-slate-400">
        The page you are looking for doesn't exist or has been moved. 
        Let's get you back to exploring beautiful Bangladesh.
      </p>
      
      <Link 
        href="/"
        className="inline-flex items-center rounded-full bg-monsoon-slate px-8 py-4 text-lg font-medium text-white transition-all hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 dark:bg-white dark:text-monsoon-slate dark:hover:bg-slate-100"
      >
        <Home className="mr-2 h-5 w-5" />
        Back to Home
      </Link>
    </div>
  );
}
