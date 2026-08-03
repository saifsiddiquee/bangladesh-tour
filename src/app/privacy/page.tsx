import type { Metadata } from 'next';
import { Shield, Eye, Lock, RefreshCw, FileText } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Privacy Policy — Beautiful Bangladesh',
  description:
    'Read our Privacy Policy to understand how Beautiful Bangladesh protects your personal data, privacy, and image attributions.',
};

export default function PrivacyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-monsoon py-20 md:py-28 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-paddy-gold" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto">
            Your privacy and trust are paramount to us. Learn how we handle your data with respect and transparency.
          </p>
          <p className="text-white/60 text-sm mt-4">
            Last Updated: August 2, 2026
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <AnimatedSection animation="fadeUp">
          <div className="space-y-12 text-monsoon-slate leading-relaxed">
            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-monsoon-mint/20 border border-monsoon-mint rounded-xl">
                <Eye className="w-6 h-6 text-sundarbans mb-3" />
                <h3 className="font-bold text-lg mb-2">No Tracking</h3>
                <p className="text-sm text-monsoon-slate-light">
                  We do not track your personal identity or sell your data to third-party advertisers.
                </p>
              </div>
              <div className="p-6 bg-monsoon-mint/20 border border-monsoon-mint rounded-xl">
                <Lock className="w-6 h-6 text-sundarbans mb-3" />
                <h3 className="font-bold text-lg mb-2">Secure Browsing</h3>
                <p className="text-sm text-monsoon-slate-light">
                  All traffic is encrypted over HTTPS using modern web security protocols.
                </p>
              </div>
              <div className="p-6 bg-monsoon-mint/20 border border-monsoon-mint rounded-xl">
                <FileText className="w-6 h-6 text-sundarbans mb-3" />
                <h3 className="font-bold text-lg mb-2">Open Attribution</h3>
                <p className="text-sm text-monsoon-slate-light">
                  All media and photography credits are openly attributed to their original creators.
                </p>
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="space-y-8 text-lg">
              <div>
                <h2 className="font-display text-2xl font-bold text-monsoon-slate mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-monsoon-slate-light text-base mb-4">
                  Beautiful Bangladesh is designed as a public information and showcase platform. We do not collect any data for site operation and response to user inquiries.
                </p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <h2 className="font-display text-2xl font-bold text-monsoon-slate mb-4">
                  2. Cookies and Storage
                </h2>
                <p className="text-monsoon-slate-light text-base leading-relaxed">
                  We use standard local storage and cookies strictly for essential preferences, such as keeping track of interactive filter states or UI settings. We do not use persistent cross-site tracking cookies.
                </p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <h2 className="font-display text-2xl font-bold text-monsoon-slate mb-4">
                  3. Image & Media Attributions
                </h2>
                <p className="text-monsoon-slate-light text-base leading-relaxed mb-3">
                  Photographs featured on Beautiful Bangladesh are sourced from Unsplash under the Unsplash License or shared with permission. Each image includes photographer attribution metadata. If you believe an image is misattributed or violates copyright, please contact us immediately for prompt resolution.
                </p>
              </div>

              <hr className="border-gray-200" />

              <div>
                <h2 className="font-display text-2xl font-bold text-monsoon-slate mb-4">
                  4. Third-Party External Links
                </h2>
                <p className="text-monsoon-slate-light text-base leading-relaxed">
                  Our website contains external links to official tourism bodies, Unsplash photographer profiles, and map services. We are not responsible for the privacy practices or content of third-party external websites.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
