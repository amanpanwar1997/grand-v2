import { MapPin, TrendingUp, Star, ChevronRight, ArrowRight, CheckCircle, Target, Users, Clock, Award, BarChart, Smartphone, Search, Navigation, Phone, Mail, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const coreServices = [
  { icon: MapPin, title: 'Google Business Profile', desc: 'Complete GBP optimization, posting, and management for maximum visibility.' },
  { icon: Search, title: 'Local Keyword Research', desc: 'Identify high-intent local search terms your customers are actually using.' },
  { icon: Building, title: 'Citation Building', desc: 'Build consistent NAP (Name, Address, Phone) across 100+ directories.' },
  { icon: Star, title: 'Review Management', desc: 'Generate, monitor, and respond to customer reviews across all platforms.' },
  { icon: Navigation, title: 'Google Maps Optimization', desc: 'Rank higher in Google Maps for "near me" and local searches.' },
  { icon: Target, title: 'Local Link Building', desc: 'Earn authoritative local backlinks from Indore businesses and directories.' }
];

const benefits = [
  { icon: TrendingUp, title: '300%+ Lead Increase', desc: 'Average increase in local inquiries within 3 months', stat: '300%' },
  { icon: MapPin, title: 'Top 3 Map Pack', desc: 'Rank in Google\'s coveted "Local 3-Pack" results', stat: 'Top 3' },
  { icon: Users, title: '5x More Foot Traffic', desc: 'Drive actual customers to your physical location', stat: '5x' },
  { icon: Phone, title: '400% More Calls', desc: 'Increase in direct phone call inquiries', stat: '400%' }
];

const process = [
  { step: '01', title: 'Local SEO Audit', desc: 'Comprehensive analysis of your current local presence, citations, and rankings.' },
  { step: '02', title: 'Competitor Research', desc: 'Analyze top local competitors and identify ranking opportunities.' },
  { step: '03', title: 'GBP Optimization', desc: 'Optimize your Google Business Profile with keywords, images, and posts.' },
  { step: '04', title: 'Citation Cleanup', desc: 'Fix inconsistent NAP data across all directories and platforms.' },
  { step: '05', title: 'Content Creation', desc: 'Create geo-targeted landing pages and local content.' },
  { step: '06', title: 'Monitoring & Reporting', desc: 'Track rankings, traffic, and conversions with monthly reports.' }
];

const features = [
  'Google My Business Optimization',
  'Local Citation Building (100+ sites)',
  'Review Generation & Management',
  'Local Schema Markup Implementation',
  'Geo-Targeted Landing Pages',
  'NAP Consistency Cleanup',
  'Local Link Building Campaigns',
  'Google Maps Ranking Optimization',
  'Voice Search Optimization',
  'Mobile Local Search Optimization',
  '"Near Me" Search Optimization',
  'Local Competitor Analysis',
  'Multi-Location SEO (if applicable)',
  'Local Social Media Integration',
  'Local Content Marketing',
  'Monthly Ranking Reports'
];

const industries = [
  'Restaurants & Cafes',
  'Medical & Healthcare',
  'Legal Services',
  'Home Services',
  'Retail Stores',
  'Real Estate',
  'Automotive Services',
  'Fitness & Wellness',
  'Beauty & Salons',
  'Professional Services'
];

const faqs = [
  {
    q: 'What is Local SEO?',
    a: 'Local SEO is the practice of optimizing your online presence to attract more customers from local searches on Google. It focuses on improving visibility in Google Maps, local pack results, and location-based searches like "near me" queries.'
  },
  {
    q: 'How long does it take to see results?',
    a: 'Most businesses see initial improvements within 4-8 weeks, with significant results by 3-6 months. Google My Business optimizations can show faster results, while citation building and ranking improvements take longer.'
  },
  {
    q: 'Do I need a physical location for Local SEO?',
    a: 'While having a physical location helps, service area businesses (plumbers, electricians, etc.) can also benefit from local SEO by defining their service areas in Google Business Profile.'
  },
  {
    q: 'How much does Local SEO cost?',
    a: 'Our local SEO packages start from ₹15,000/month for single locations. Pricing varies based on competition level, number of locations, and service scope. Contact us for a custom quote.'
  },
  {
    q: 'Can you help with multiple locations?',
    a: 'Yes! We specialize in multi-location local SEO. We can optimize individual Google Business Profiles for each location and create location-specific landing pages.'
  },
  {
    q: 'What\'s included in review management?',
    a: 'We help generate new reviews through automated requests, monitor all review platforms, respond to reviews professionally, and address negative feedback promptly.'
  }
];

export function LocalSEOPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'SEO', path: '/services/search-engine-optimization-seo' },
    { name: 'Local SEO', path: '/services/search-engine-optimization-seo/local-seo' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Local SEO Services Indore | Rank #1 in Google Maps & Local Search"
        description="Expert local SEO services in Indore. Dominate Google Maps, rank in the Local 3-Pack, and get 300%+ more customer inquiries. Free local SEO audit included."
        keywords={['local SEO Indore', 'Google My Business optimization', 'local search marketing', 'Google Maps ranking', 'citation building', 'review management']}
        canonicalUrl="/services/seo/local-seo"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Local SEO Services - Dominate Local Search in Indore',
        description: 'Professional local SEO services to rank #1 in Google Maps and local search results.',
        slug: 'services/seo/local-seo'
      })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} showHomeIcon={true} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass-yellow px-4 py-2 rounded-full mb-6">
              <MapPin className="w-5 h-5 text-yellow-500" />
              <span className="text-[13px] font-medium text-yellow-500">Local Search Optimization</span>
            </div>
            
            <h1 className="text-[30px] md:text-[42px] font-medium mb-6 leading-tight">
              Dominate Local Search & <span className="text-yellow-500">Google Maps</span> in Indore
            </h1>
            
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 leading-relaxed">
              Get found by customers searching "near me" and local services in Indore. Our proven local SEO strategies help you rank #1 in Google Maps, appear in the Local 3-Pack, and drive 300%+ more foot traffic, calls, and inquiries to your business.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Get Free Local SEO Audit <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="glass border border-white/10 px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                View Pricing <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">300%</div>
                <div className="text-[13px] text-gray-400">Lead Increase</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">Top 3</div>
                <div className="text-[13px] text-gray-400">Map Pack Ranking</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">100+</div>
                <div className="text-[13px] text-gray-400">Citations Built</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">4.9★</div>
                <div className="text-[13px] text-gray-400">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        <OutlinedText text="LOCAL SEO" direction="right" delay={0} stopPosition={20} parallax={true} parallaxSpeed={0.2} />
      </section>

      {/* Core Services */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Complete Local SEO Services</h2>
            <p className="text-[15px] text-gray-400">
              Our comprehensive local SEO strategies cover every aspect of local search optimization to maximize your visibility in Indore and surrounding areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="glass-card p-6 hover:bg-white/5 transition-all group">
                  <div className="p-3 glass-yellow rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <h3 className="text-[18px] font-medium mb-3">{service.title}</h3>
                  <p className="text-[15px] text-gray-400 leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Benefits */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Proven Local SEO Results</h2>
            <p className="text-[15px] text-gray-400">
              Our local SEO campaigns deliver measurable results that directly impact your bottom line.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="glass-card p-6 text-center hover:border-yellow-500/20 transition-all group">
                  <Icon className="w-12 h-12 text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-[32px] font-bold text-yellow-500 mb-2">{benefit.stat}</div>
                  <h3 className="text-[18px] font-medium mb-2">{benefit.title}</h3>
                  <p className="text-[15px] text-gray-400">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Our Local SEO Process</h2>
            <p className="text-[15px] text-gray-400">
              A proven 6-step methodology to dominate local search results in Indore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, i) => (
              <div key={i} className="glass-card p-6 hover:border-yellow-500/20 transition-all">
                <div className="text-[36px] font-bold text-yellow-500/20 mb-4">{item.step}</div>
                <h3 className="text-[18px] font-medium mb-3">{item.title}</h3>
                <p className="text-[15px] text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Features List */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Everything Included</h2>
            <p className="text-[15px] text-gray-400">
              Comprehensive local SEO features to ensure maximum local visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="glass p-4 flex items-start gap-3 hover:bg-white/5 transition-all">
                <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="text-[15px] text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Industries We Serve in Indore</h2>
            <p className="text-[15px] text-gray-400">
              Specialized local SEO strategies for every business type.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((industry, i) => (
              <div key={i} className="glass-card p-4 text-center hover:border-yellow-500/20 transition-all">
                <p className="text-[15px] font-medium">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="glass-card p-6">
                  <h3 className="text-[18px] font-medium mb-3 text-yellow-500">{faq.q}</h3>
                  <p className="text-[15px] text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">
              Ready to Dominate Local Search in Indore?
            </h2>
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 max-w-2xl mx-auto">
              Get a free local SEO audit worth ₹5,000 and discover exactly how to outrank your competitors in Google Maps and local search results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Get Free SEO Audit <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="glass border border-white/10 px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                Schedule Consultation <Phone className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}