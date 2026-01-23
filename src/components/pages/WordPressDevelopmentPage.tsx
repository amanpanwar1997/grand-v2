import { Globe, Code, TrendingUp, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

export function WordPressDevelopmentPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' }, { name: 'Services', path: '/services' },
    { name: 'Web Design', path: '/services/web-design-development' }, { name: 'WordPress', path: '/services/web-design-development/wordpress' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead title="WordPress Development Services | Custom Websites" description="Professional WordPress development services. Custom themes, plugins, WooCommerce, SEO optimization, and ongoing maintenance." keywords={['WordPress development', 'WordPress website', 'custom theme', 'WooCommerce']} canonicalUrl="/services/web-design/wordpress" />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'WordPress Development Services', description: 'Custom WordPress websites and development.', slug: 'services/web-design/wordpress' })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} showHomeIcon={true} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <Globe className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">WordPress Development Services</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Custom WordPress websites that perform. Theme development, plugin customization, speed optimization, and enterprise-grade security.
            </p>
            <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
              Build WordPress Site <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <OutlinedText text="WORDPRESS" direction="left" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Code className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Power Your Website with WordPress</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Get a free WordPress consultation and project quote.
          </p>
          <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
            Get Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}