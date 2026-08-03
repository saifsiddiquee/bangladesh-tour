import type { Metadata } from 'next';
import { FileText, CheckCircle, AlertTriangle, Compass, Scale } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Terms of Service — Beautiful Bangladesh',
  description:
    'Review the Terms of Service for using Beautiful Bangladesh, covering content usage, intellectual property, travel disclaimers, and user conduct.',
};

export default function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-monsoon py-20 md:py-28 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
            <Scale className="w-8 h-8 text-paddy-gold" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto">
            Please read these terms carefully before exploring the Beautiful Bangladesh website.
          </p>
          <p className="text-white/60 text-sm mt-4">
            Effective Date: August 2, 2026
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <AnimatedSection animation="fadeUp">
          <div className="space-y-12 text-monsoon-slate leading-relaxed">
            {/* Overview Box */}
            <div className="p-6 bg-monsoon-mint/20 border border-monsoon-mint rounded-xl flex items-start gap-4">
              <Compass className="w-8 h-8 text-sundarbans flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-lg text-monsoon-slate mb-1">Welcome to Beautiful Bangladesh</h2>
                <p className="text-sm text-monsoon-slate-light leading-relaxed">
                  By accessing or using Beautiful Bangladesh (&quot;the Service&quot;), you agree to be bound by these Terms of Service. This platform provides travel exploration data, division guides, and geographical details for educational and inspirational purposes.
                </p>
              </div>
            </div>

            {/* Terms Content */}
            <div className="space-y-8 text-lg">
              <div>
                <h2 className="font-display text-2xl font-bold text-monsoon-slate mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-monsoon-slate-light text-base leading-relaxed">
                  By viewing or interacting with any part of this website, you confirm that you have read, understood, and agreed to these Terms of Service. If you do not agree to these terms, please refrain from using the website.
                </p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <h2 className="font-display text-2xl font-bold text-monsoon-slate mb-4">
                  2. Use of Content & Intellectual Property
                </h2>
                <p className="text-monsoon-slate-light text-base leading-relaxed mb-4">
                  All site code, curated destination copy, design systems, and custom graphical components are property of Beautiful Bangladesh unless otherwise specified.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-monsoon-slate-light">
                  <li><strong>Photography:</strong> Photos sourced from Unsplash remain the property of their respective creators and are used under the Unsplash License.</li>
                  <li><strong>Personal Use:</strong> You are granted a non-exclusive license to view, bookmark, and share content for non-commercial personal travel planning.</li>
                </ul>
              </div>

              <hr className="border-gray-200" />

              <div>
                <h2 className="font-display text-2xl font-bold text-monsoon-slate mb-4">
                  3. Travel Information Disclaimer
                </h2>
                <p className="text-monsoon-slate-light text-base leading-relaxed">
                  While we strive to provide accurate travel tips, entry fees, operating hours, and local guidance, conditions on the ground can change. Beautiful Bangladesh does not guarantee that destination information is always fully up-to-date or error-free. Travelers are encouraged to verify travel permits, weather alerts, and local regulations independently prior to departure.
                </p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <h2 className="font-display text-2xl font-bold text-monsoon-slate mb-4">
                  4. Limitation of Liability
                </h2>
                <p className="text-monsoon-slate-light text-base leading-relaxed">
                  Under no circumstances shall Beautiful Bangladesh or its creators be held liable for any direct, indirect, incidental, or consequential damages resulting from your travel decisions, itinerary planning, or reliance on information provided on this platform.
                </p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <h2 className="font-display text-2xl font-bold text-monsoon-slate mb-4">
                  5. Contact & Feedback
                </h2>
                <p className="text-monsoon-slate-light text-base leading-relaxed">
                  For questions or concerns regarding these Terms of Service, please visit our <a href="/contact" className="text-sundarbans underline hover:text-sundarbans-dark">Contact Page</a>.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
