import { Code, Zap, Shield, ChevronRight, ArrowRight, CheckCircle, TrendingUp, Clock, Award, Search, Server, Smartphone, Gauge, Lock, FileCode, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const coreServices = [
  { icon: Gauge, title: 'Site Speed Optimization', desc: 'Achieve sub-2 second load times with advanced performance optimization techniques.' },
  { icon: Smartphone, title: 'Mobile-First Indexing', desc: 'Ensure perfect mobile experience and Core Web Vitals compliance.' },
  { icon: FileCode, title: 'Schema Markup', desc: 'Implement rich snippets and structured data for enhanced search visibility.' },
  { icon: Server, title: 'Crawl Budget Optimization', desc: 'Help search engines efficiently crawl and index your important pages.' },
  { icon: Lock, title: 'HTTPS & Security', desc: 'Implement SSL, security headers, and protect against SEO vulnerabilities.' },
  { icon: Database, title: 'Site Architecture', desc: 'Build logical URL structures, internal linking, and navigation hierarchies.' }
];

const benefits = [
  { icon: TrendingUp, title: '200% Traffic Increase', desc: 'Average organic traffic growth after technical fixes', stat: '200%' },
  { icon: Gauge, title: '< 2s Load Time', desc: 'Lightning-fast page speeds for better rankings', stat: '<2s' },
  { icon: Smartphone, title: '100% Mobile Score', desc: 'Perfect mobile experience and Core Web Vitals', stat: '100' },
  { icon: Search, title: '50% More Indexing', desc: 'More pages indexed and ranking on Google', stat: '50%' }
];

const process = [
  { step: '01', title: 'Comprehensive Audit', desc: 'Deep technical SEO audit using industry-leading tools (Screaming Frog, GTmetrix, Search Console).' },
  { step: '02', title: 'Issue Prioritization', desc: 'Identify critical issues affecting rankings: crawl errors, speed, mobile issues.' },
  { step: '03', title: 'Speed Optimization', desc: 'Optimize images, minify code, implement caching, CDN setup.' },
  { step: '04', title: 'Mobile Optimization', desc: 'Ensure responsive design, touch elements, viewport optimization.' },
  { step: '05', title: 'Schema Implementation', desc: 'Add structured data for products, articles, breadcrumbs, FAQs.' },
  { step: '06', title: 'Monitoring & Maintenance', desc: 'Ongoing monitoring of Core Web Vitals and technical health.' }
];

const features = [
  'Complete Technical SEO Audit',
  'Core Web Vitals Optimization',
  'Page Speed Optimization (<2s)',
  'Mobile-First Optimization',
  'XML Sitemap Generation',
  'Robots.txt Optimization',
  'Canonical Tag Implementation',
  'Hreflang Setup (Multi-language)',
  'Schema Markup Implementation',
  'SSL/HTTPS Migration',
  'Crawl Error Fixes',
  'Duplicate Content Resolution',
  '404 Error Management',
  'Redirect Chain Fixes',
  'Log File Analysis',
  'JavaScript SEO Optimization',
  'Image Optimization',
  'Internal Linking Strategy',
  'URL Structure Optimization',
  'Breadcrumb Implementation',
  'Pagination Fixes',
  'Faceted Navigation SEO',
  'Server Response Time Optimization',
  'CDN Implementation'
];

const technicalIssues = [
  { issue: 'Slow Page Speed', impact: 'High', solution: 'Image optimization, code minification, caching' },
  { issue: 'Poor Mobile Experience', impact: 'Critical', solution: 'Responsive design, viewport fixes, touch optimization' },
  { issue: 'Crawl Errors', impact: 'High', solution: 'Fix broken links, 404 errors, server errors' },
  { issue: 'Duplicate Content', impact: 'Medium', solution: 'Canonical tags, 301 redirects, content consolidation' },
  { issue: 'Missing Schema', impact: 'Medium', solution: 'Structured data implementation for rich snippets' },
  { issue: 'No HTTPS', impact: 'Critical', solution: 'SSL certificate installation and site migration' }
];

const faqs = [
  {
    q: 'What is Technical SEO?',
    a: 'Technical SEO involves optimizing your website\'s infrastructure for search engine crawling and indexing. It includes site speed, mobile-friendliness, security, architecture, and structured data - all the behind-the-scenes elements that impact rankings.'
  },
  {
    q: 'Why is Technical SEO important?',
    a: 'Even with great content, poor technical SEO can prevent Google from properly crawling, indexing, and ranking your pages. Technical issues like slow speeds, mobile problems, or crawl errors directly hurt your rankings and user experience.'
  },
  {
    q: 'How long does Technical SEO take?',
    a: 'Initial technical fixes typically take 2-4 weeks. Speed improvements can show within days, while indexing and ranking improvements take 4-12 weeks. Technical SEO is also ongoing - new issues need continuous monitoring.'
  },
  {
    q: 'What are Core Web Vitals?',
    a: 'Core Web Vitals are Google\'s page experience metrics: Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). They measure loading speed, interactivity, and visual stability.'
  },
  {
    q: 'Can Technical SEO fix my rankings?',
    a: 'Yes! Technical issues often prevent sites from ranking despite good content. Fixing site speed, mobile issues, crawl errors, and schema markup can dramatically improve rankings - we typically see 50-200% traffic increases.'
  },
  {
    q: 'Do I need Technical SEO if I have a new site?',
    a: 'Absolutely! It\'s easier to build technical SEO correctly from the start than fix issues later. New sites benefit from proper site architecture, speed optimization, and schema implementation from day one.'
  }
];

export function TechnicalSEOPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'SEO', path: '/services/search-engine-optimization-seo' },
    { name: 'Technical SEO', path: '/services/search-engine-optimization-seo/technical-seo' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Technical SEO Services | Fix Site Speed, Mobile & Core Web Vitals"
        description="Expert technical SEO services to optimize site speed, mobile performance, and Core Web Vitals. Fix crawl errors, implement schema markup, and achieve <2s load times."
        keywords={['technical SEO', 'site speed optimization', 'Core Web Vitals', 'mobile SEO', 'schema markup', 'page speed']}
        canonicalUrl="/services/seo/technical-seo"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Technical SEO Services - Speed, Mobile & Core Web Vitals Optimization',
        description: 'Professional technical SEO audits and optimization for better rankings and user experience.',
        slug: 'services/seo/technical-seo'
      })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} showHomeIcon={true} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass-yellow px-4 py-2 rounded-full mb-6">
              <Code className="w-5 h-5 text-yellow-500" />
              <span className="text-[13px] font-medium text-yellow-500">Technical Optimization</span>
            </div>
            
            <h1 className="text-[30px] md:text-[42px] font-medium mb-6 leading-tight">
              Fix Technical Issues & <span className="text-yellow-500">Skyrocket Rankings</span>
            </h1>
            
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 leading-relaxed">
              Your content is great but rankings aren't improving? The problem is likely technical. Our expert technical SEO services fix site speed, mobile issues, crawl errors, and Core Web Vitals to unlock your site's full ranking potential and deliver 200%+ traffic growth.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Get Free Technical Audit <ArrowRight className="w-5 h-5" />
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
                <div className="text-[24px] font-bold text-yellow-500 mb-1">200%</div>
                <div className="text-[13px] text-gray-400">Traffic Growth</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">{'<2s'}</div>
                <div className="text-[13px] text-gray-400">Load Time</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">100</div>
                <div className="text-[13px] text-gray-400">Mobile Score</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">50%</div>
                <div className="text-[13px] text-gray-400">More Indexing</div>
              </div>
            </div>
          </div>
        </div>

        <OutlinedText text="TECHNICAL" direction="right" delay={0} stopPosition={20} parallax={true} parallaxSpeed={0.2} />
      </section>

      {/* Core Services */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Complete Technical SEO Services</h2>
            <p className="text-[15px] text-gray-400">
              From site speed to schema markup - we fix every technical element that impacts your rankings.
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

      {/* Results */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Measurable Technical SEO Results</h2>
            <p className="text-[15px] text-gray-400">
              Technical optimization delivers immediate and long-term ranking improvements.
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

      {/* Process */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Our Technical SEO Process</h2>
            <p className="text-[15px] text-gray-400">
              Systematic approach to identifying and fixing technical issues that hurt rankings.
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

      {/* Common Technical Issues */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Common Technical SEO Issues We Fix</h2>
            <p className="text-[15px] text-gray-400">
              These technical problems could be silently killing your rankings right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalIssues.map((item, i) => (
              <div key={i} className="glass-card p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-medium">{item.issue}</h3>
                  <span className={`text-[13px] px-2 py-1 rounded ${
                    item.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    item.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.impact}
                  </span>
                </div>
                <p className="text-[15px] text-gray-400 leading-relaxed">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Features */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Everything Included</h2>
            <p className="text-[15px] text-gray-400">
              Comprehensive technical SEO coverage for maximum performance and rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="glass p-4 flex items-start gap-3 hover:bg-white/5 transition-all">
                <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="text-[15px] text-gray-300">{feature}</span>
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
              Fix Technical Issues & Unlock Your Ranking Potential
            </h2>
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 max-w-2xl mx-auto">
              Get a free comprehensive technical SEO audit worth ₹8,000. We'll identify every issue preventing your site from ranking #1.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Get Free Technical Audit <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="glass border border-white/10 px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                Schedule Consultation <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}