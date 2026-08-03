import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DestinationNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-monsoon-slate dark:to-slate-900" />
      
      <h1 className="font-display mb-4 text-6xl font-bold text-slate-900 dark:text-white sm:text-8xl">
        404
      </h1>
      <h2 className="mb-6 text-2xl font-semibold text-slate-700 dark:text-slate-300">
        Destination Not Found
      </h2>
      <p className="mb-8 max-w-md text-slate-500 dark:text-slate-400">
        We couldn't find the destination you're looking for. It might have been removed or the URL might be incorrect.
      </p>
      
      <Link 
        href="/destinations"
        className="inline-flex items-center rounded-full bg-sundarbans px-6 py-3 font-medium text-white transition-colors hover:bg-sundarbans/90 focus:outline-none focus:ring-2 focus:ring-sundarbans focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Explore All Destinations
      </Link>
    </div>
  );
}
