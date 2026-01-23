import { Eye, Target, TrendingUp, ChevronRight, ArrowRight, CheckCircle, Users, Zap, BarChart, Image, MousePointer, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const coreServices = [
  { icon: Image, title: 'Banner Ad Design', desc: 'Eye-catching responsive display banners optimized for all devices and placements.' },
  { icon: Target, title: 'Audience Targeting', desc: 'Reach the right people using demographics, interests, behaviors, and intent signals.' },
  { icon: RefreshCw, title: 'Smart Remarketing', desc: 'Re-engage website visitors with personalized ads across 2M+ websites.' },
  { icon: MousePointer, title: 'Display Network Ads', desc: 'Advertise on Google Display Network reaching 90% of internet users worldwide.' },
  { icon: Zap, title: 'Dynamic Remarketing', desc: 'Show personalized product ads to shoppers who viewed but didn\'t purchase.' },
  { icon: BarChart, title: 'Campaign Optimization', desc: 'Continuous A/B testing, bid adjustments, and performance improvements.' }
];

const benefits = [
  { icon: Eye, title: '2M+ Websites', desc: 'Reach across the Google Display Network', stat: '2M+' },
  { icon: Users, title: '90% Internet', desc: 'Coverage of all internet users globally', stat: '90%' },
  { icon: TrendingUp, title: '70% Lower CPC', desc: 'Compared to search ads', stat: '-70%' },
  { icon: Target, title: '5x Better ROI', desc: 'With strategic remarketing campaigns', stat: '5x' }
];

const process = [
  { step: '01', title: 'Audience Research', desc: 'Identify your ideal customers using demographics, interests, and browsing behavior.' },
  { step: '02', title: 'Creative Design', desc: 'Design high-converting banner ads in all sizes (responsive, static, animated).' },
  { step: '03', title: 'Campaign Setup', desc: 'Create display campaigns with proper targeting, bidding, and budget allocation.' },
  { step: '04', title: 'Remarketing Setup', desc: 'Install tracking pixels and create audience lists for remarketing.' },
  { step: '05', title: 'A/B Testing', desc: 'Test different ad creatives, headlines, and calls-to-action.' },
  { step: '06', title: 'Optimization', desc: 'Refine targeting, bids, and placements based on performance data.' }
];

const features = [
  'Google Display Network Campaigns',
  'Responsive Display Ads',
  'Static Banner Design (All Sizes)',
  'Animated HTML5 Banners',
  'Remarketing Campaigns',
  'Dynamic Remarketing',
  'Custom Audience Creation',
  'Affinity Audience Targeting',
  'In-Market Audience Targeting',
  'Similar Audiences',
  'Demographic Targeting',
  'Interest-Based Targeting',
  'Contextual Targeting',
  'Placement Targeting',
  'Topic Targeting',
  'Keyword Targeting',
  'Managed Placements',
  'Site Category Exclusions',
  'Frequency Capping',
  'Ad Scheduling',
  'Device Targeting',
  'Geographic Targeting',
  'Conversion Tracking',
  'Performance Reporting'
];

const adSizes = [
  '300x250 (Medium Rectangle)',
  '728x90 (Leaderboard)',
  '300x600 (Half Page)',
  '160x600 (Wide Skyscraper)',
  '320x50 (Mobile Banner)',
  '320x100 (Large Mobile Banner)',
  'Responsive (All Sizes)',
  'Custom Sizes'
];

const faqs = [
  {
    q: 'What are Display Ads?',
    a: 'Display ads are visual banner advertisements that appear on websites across the Google Display Network (GDN). They can be images, animations, or videos shown on 2 million+ websites, reaching 90% of internet users. Perfect for brand awareness and remarketing.'
  },
  {
    q: 'How much do Display Ads cost?',
    a: 'Display ads are typically 50-70% cheaper than search ads. Average CPC ranges from ₹2-15. You can start with as little as ₹500/day budget. Our management fee starts at ₹15,000/month including creative design.'
  },
  {
    q: 'Display Ads vs Search Ads - which is better?',
    a: 'Search ads capture high-intent users actively searching. Display ads build awareness and retarget previous visitors. Best strategy: Use both! Search for conversions, Display for remarketing and brand building. We typically see 5x better ROI when combining both.'
  },
  {
    q: 'What is remarketing?',
    a: 'Remarketing shows ads to people who previously visited your website. It\'s highly effective because you\'re targeting warm leads who already know your brand. Remarketing typically gets 2-3x higher conversion rates than standard display ads.'
  },
  {
    q: 'Do you design the banner ads?',
    a: 'Yes! We create professional, high-converting banner ads in all required sizes. This includes responsive ads, static images, and animated HTML5 banners. All banner design is included in our management fee - no extra cost.'
  },
  {
    q: 'How long to see results from Display Ads?',
    a: 'Display ads work best for awareness and remarketing, not immediate conversions. You\'ll see immediate impressions and clicks within days. Remarketing campaigns typically show strong ROI within 2-4 weeks. Brand awareness campaigns need 30-60 days to measure impact.'
  }
];

export function DisplayAdsPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'PPC', path: '/services/ppc-google-ads' },
    { name: 'Display Ads', path: '/services/ppc-google-ads/display-ads' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Display Advertising Services | Google Display Network & Remarketing"
        description="Professional display advertising services. Reach 90% of internet users across Google Display Network. Expert banner design, remarketing, and campaign management."
        keywords={['display advertising', 'banner ads', 'remarketing campaigns', 'Google Display Network', 'GDN ads', 'retargeting']}
        canonicalUrl="/services/ppc/display-ads"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Display Advertising Services - Banner Ads & Remarketing Campaigns',
        description: 'Reach millions with Google Display Network banner ads and smart remarketing strategies.',
        slug: 'services/ppc/display-ads'
      })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} showHomeIcon={true} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass-yellow px-4 py-2 rounded-full mb-6">
              <Eye className="w-5 h-5 text-yellow-500" />
              <span className="text-[13px] font-medium text-yellow-500">Visual Advertising</span>
            </div>
            
            <h1 className="text-[30px] md:text-[42px] font-medium mb-6 leading-tight">
              Reach <span className="text-yellow-500">90% of Internet Users</span> with Display Ads
            </h1>
            
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 leading-relaxed">
              Advertise across 2 million+ websites with the Google Display Network. Our expert display advertising services combine stunning banner design, strategic targeting, and powerful remarketing to build brand awareness, drive traffic, and recapture lost customers with 5x ROI.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Start Display Campaign <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="glass border border-white/10 px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                See Banner Examples <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">2M+</div>
                <div className="text-[13px] text-gray-400">Websites</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">90%</div>
                <div className="text-[13px] text-gray-400">Internet Reach</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">70%</div>
                <div className="text-[13px] text-gray-400">Lower CPC</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">5x</div>
                <div className="text-[13px] text-gray-400">ROI Boost</div>
              </div>
            </div>
          </div>
        </div>

        <OutlinedText text="DISPLAY" direction="left" delay={0} stopPosition={20} parallax={true} parallaxSpeed={0.2} />
      </section>

      {/* Core Services */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Complete Display Advertising Services</h2>
            <p className="text-[15px] text-gray-400">
              From banner design to campaign optimization - full-service display advertising management.
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

      {/* Benefits */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Why Choose Display Advertising?</h2>
            <p className="text-[15px] text-gray-400">
              Massive reach, visual impact, and cost-effective brand building.
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
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Our Display Ads Process</h2>
            <p className="text-[15px] text-gray-400">
              Strategic approach to launch high-performing display campaigns.
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

      {/* Banner Sizes */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Banner Sizes We Design</h2>
            <p className="text-[15px] text-gray-400">
              All standard IAB ad sizes plus custom formats for your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {adSizes.map((size, i) => (
              <div key={i} className="glass-card p-4 text-center hover:border-yellow-500/20 transition-all">
                <p className="text-[15px] font-medium">{size}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Everything Included</h2>
            <p className="text-[15px] text-gray-400">
              Complete display advertising management with creative design included.
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
              Ready to Reach Millions with Display Ads?
            </h2>
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 max-w-2xl mx-auto">
              Get a free display advertising strategy consultation. We'll design 3 banner ads for free and show you how to achieve 5x ROI with remarketing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Get Free Banner Design <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="glass border border-white/10 px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                Schedule Call <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}