import { PenTool, FileText, TrendingUp, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

export function CopywritingPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' }, { name: 'Services', path: '/services' },
    { name: 'Content', path: '/services/content-marketing' }, { name: 'Copywriting', path: '/services/content-marketing/copywriting' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead title="Professional Copywriting Services | Conversion-Focused Content" description="Expert copywriting services. Website copy, sales pages, email campaigns, ad copy, and SEO content that converts." keywords={['copywriting', 'content writing', 'sales copy', 'conversion copywriting']} canonicalUrl="/services/content/copywriting" />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'Professional Copywriting Services', description: 'Conversion-focused copywriting.', slug: 'services/content/copywriting' })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} showHomeIcon={true} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <PenTool className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Professional Copywriting Services</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Conversion-focused copywriting that sells. Website copy, sales pages, email campaigns, ad copy, and SEO content written by expert copywriters.
            </p>
            <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
              Get Expert Copy <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <OutlinedText text="COPYWRITING" direction="right" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <FileText className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Words That Sell</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Get a free content audit and copywriting sample.
          </p>
          <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
            Request Sample <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}