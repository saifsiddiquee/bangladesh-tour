'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { generateFaqJsonLd } from '@/lib/seo';

export const FAQS = [
  {
    question: 'What are the best tourist places to visit on a Bangladesh tour?',
    answer:
      'The top places to visit on a Bangladesh tour include Cox\'s Bazar (the world\'s longest natural sea beach), the Sundarbans (largest mangrove forest and home of the Royal Bengal Tiger), Sylhet\'s lush tea gardens and Jaflong, the ancient archaeological ruins of Mahasthangarh & Paharpur, and Saint Martin\'s Coral Island.',
  },
  {
    question: 'When is the best time for Bangladesh travel?',
    answer:
      'The ideal time for Bangladesh travel is during the winter season (November to March), when temperatures are cool, comfortable (18°C–28°C), and rain is minimal. This is perfect for beach trips, jungle safaris, and heritage tours.',
  },
  {
    question: 'How can international tourists get a visa for Bangladesh tourism?',
    answer:
      'Tourists can apply for a Bangladesh tourist visa at any Bangladesh Embassy/Consulate overseas or get a Visa on Arrival (VoA) at Hazrat Shahjalal International Airport (Dhaka) if eligible (available for citizens of US, UK, Canada, EU, Australia, Japan, and several other countries).',
  },
  {
    question: 'What are the recommended Bangladesh tour itineraries for first-time travelers?',
    answer:
      'A popular 7-day Bangladesh tour itinerary includes 2 days exploring Old Dhaka & Sonargaon, 2 days cruising the Sundarbans mangrove wilderness, 2 days relaxing in Cox\'s Bazar, and 1 day exploring Sylhet tea gardens.',
  },
  {
    question: 'Is Bangladesh safe for solo and foreign travelers?',
    answer:
      'Yes, Bangladesh is warmly welcoming to international tourists and travelers. Local hospitality is world-famous. Basic travel safety precautions and respecting local customs will ensure a smooth and memorable journey.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqJsonLd = generateFaqJsonLd(FAQS);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-monsoon-slate/40 border-t border-slate-100 dark:border-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-wider text-sundarbans uppercase mb-2 block">
            Frequently Asked Questions
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-monsoon-slate dark:text-white">
            Bangladesh Tourism & Travel FAQs
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg">
            Everything you need to plan your trip, tour packages, and travel itineraries in Bangladesh.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-display font-semibold text-lg text-monsoon-slate dark:text-white hover:text-sundarbans transition-colors bg-slate-50/50 dark:bg-monsoon-slate/80"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 ml-4 shrink-0 text-sundarbans transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 py-4 text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-monsoon-slate/40 border-t border-slate-100 dark:border-slate-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
