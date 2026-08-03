import Image from 'next/image';
import Link from 'next/link';
import type { Guide } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';

interface TravelGuidesProps {
  guides: Guide[];
}

export function TravelGuides({ guides }: TravelGuidesProps) {
  if (!guides?.length) return null;

  return (
    <section className="py-20 w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-monsoon-slate mb-4">
              Travel Guides
            </h2>
            <p className="text-lg text-monsoon-slate/70 font-body">
              Expert insights for your Bangladesh journey
            </p>
          </div>
          <Link 
            href="/guides" 
            className="text-sundarbans font-medium hover:underline font-body flex items-center gap-2 justify-center md:justify-end"
          >
            View all guides
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.slice(0, 4).map((guide) => (
            <article key={guide.id} className="group flex flex-col bg-river-mist rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/guides/${guide.slug}`} className="block relative h-64 overflow-hidden image-zoom-container">
                <Image
                  src={guide.heroImage.url}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10">
                  {guide.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} className="text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Link>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-monsoon-slate/60 font-body uppercase tracking-wider mb-3">
                  <span>{new Date(guide.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="w-1 h-1 rounded-full bg-monsoon-slate/30" />
                  <span>{guide.readingTime} min read</span>
                </div>
                
                <Link href={`/guides/${guide.slug}`} className="block group-hover:text-sundarbans transition-colors">
                  <h3 className="text-2xl font-display font-bold text-monsoon-slate mb-3 line-clamp-2">
                    {guide.title}
                  </h3>
                </Link>
                
                <p className="text-monsoon-slate/70 font-body line-clamp-3 mb-6 flex-grow">
                  {guide.excerpt}
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-monsoon-slate/10">
                    <div className="w-full h-full flex items-center justify-center text-monsoon-slate font-display font-bold text-sm">
                      {guide.author.charAt(0)}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-monsoon-slate font-body">
                    {guide.author}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
