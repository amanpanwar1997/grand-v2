import { Facebook, Users, TrendingUp, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

export function FacebookMarketingPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' }, { name: 'Services', path: '/services' },
    { name: 'Social Media', path: '/services/social-media-marketing' }, { name: 'Facebook', path: '/services/social-media-marketing/facebook' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead title="Facebook Marketing Services | Ads & Page Management" description="Expert Facebook marketing services. Ad campaigns, page management, community building, and lead generation." keywords={['Facebook marketing', 'Facebook ads', 'social media ads']} canonicalUrl="/services/social-media/facebook" />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'Facebook Marketing Services', description: 'Grow your business on Facebook.', slug: 'services/social-media/facebook' })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} showHomeIcon={true} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <Facebook className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Facebook Marketing Services</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Reach 2.9 billion users on Facebook. Targeted ad campaigns, page management, community building, and lead generation strategies.
            </p>
            <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
              Start Facebook Campaign <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <OutlinedText text="FACEBOOK" direction="left" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Users className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Grow Your Facebook Presence</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Get a free Facebook marketing strategy and ad account audit.
          </p>
          <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
            Get Free Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}