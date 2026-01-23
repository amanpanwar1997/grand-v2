import { ShoppingCart, TrendingUp, Target, ChevronRight, ArrowRight, CheckCircle, DollarSign, Package, Users, Zap, BarChart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const coreServices = [
  { icon: ShoppingCart, title: 'Product Feed Optimization', desc: 'Optimize product titles, descriptions, and attributes for maximum visibility and clicks.' },
  { icon: Target, title: 'Shopping Campaign Setup', desc: 'Create high-performing Standard and Smart Shopping campaigns with proper structure.' },
  { icon: BarChart, title: 'Bid Management', desc: 'Strategic bidding to maximize ROAS while staying within your budget constraints.' },
  { icon: Package, title: 'Merchant Center Setup', desc: 'Complete Google Merchant Center configuration with feed management and compliance.' },
  { icon: Zap, title: 'Performance Max Campaigns', desc: 'Leverage Google\'s AI with Performance Max for shopping to reach more customers.' },
  { icon: Star, title: 'Product Review Integration', desc: 'Display star ratings and reviews to increase click-through rates by 17%.' }
];

const benefits = [
  { icon: DollarSign, title: '400% ROAS', desc: 'Average return on ad spend for eCommerce clients', stat: '400%' },
  { icon: TrendingUp, title: '3.5x More Sales', desc: 'Increased online revenue within 90 days', stat: '3.5x' },
  { icon: Users, title: '200% Traffic', desc: 'More qualified shoppers visiting product pages', stat: '200%' },
  { icon: Target, title: '35% Lower CPC', desc: 'Reduced cost-per-click through optimization', stat: '-35%' }
];

const process = [
  { step: '01', title: 'Account Audit', desc: 'Review current Shopping campaigns, product feeds, and Merchant Center setup.' },
  { step: '02', title: 'Feed Optimization', desc: 'Optimize product data: titles, descriptions, images, GTINs, categories.' },
  { step: '03', title: 'Campaign Structure', desc: 'Build strategic campaign architecture with proper segmentation and priorities.' },
  { step: '04', title: 'Bid Strategy', desc: 'Implement smart bidding strategies: Target ROAS, Maximize Conversion Value.' },
  { step: '05', title: 'Negative Keywords', desc: 'Add negative keywords to prevent wasted spend on irrelevant searches.' },
  { step: '06', title: 'Optimization & Scaling', desc: 'Continuous testing, optimization, and budget scaling for profitable growth.' }
];

const features = [
  'Google Merchant Center Setup',
  'Product Feed Optimization',
  'XML Feed Creation & Management',
  'Shopping Campaign Creation',
  'Performance Max Shopping Campaigns',
  'Smart Shopping Campaigns',
  'Standard Shopping Campaigns',
  'Product Review Integration',
  'Price & Availability Updates',
  'Negative Keyword Management',
  'Bid Optimization (Target ROAS)',
  'Budget Management',
  'Product Segmentation',
  'High-Priority Product Promotion',
  'Seasonal Campaign Adjustments',
  'Remarketing Lists for Shopping',
  'Competitor Price Monitoring',
  'Feed Error Fixes',
  'Custom Label Implementation',
  'Multi-country Campaigns',
  'Local Inventory Ads',
  'Showcase Shopping Ads',
  'Conversion Tracking Setup',
  'Weekly Performance Reports'
];

const industries = [
  'Fashion & Apparel',
  'Electronics & Gadgets',
  'Home & Garden',
  'Beauty & Cosmetics',
  'Sports & Fitness',
  'Jewelry & Accessories',
  'Toys & Games',
  'Books & Stationery',
  'Automotive Parts',
  'Health & Wellness'
];

const faqs = [
  {
    q: 'What are Google Shopping Ads?',
    a: 'Google Shopping Ads (Product Listing Ads) display your products directly in Google Search with images, prices, and merchant names. They appear above organic results and in the Shopping tab, making them highly visible to ready-to-buy customers.'
  },
  {
    q: 'How much do Google Shopping Ads cost?',
    a: 'Shopping Ads use a pay-per-click (PPC) model. Costs vary by industry and competition - typically ₹5-50 per click. Most eCommerce businesses see 300-500% ROAS, meaning every ₹1 spent returns ₹3-5 in revenue. Our management fee starts at ₹20,000/month.'
  },
  {
    q: 'What\'s the difference between Shopping and Search Ads?',
    a: 'Search Ads are text-based and keyword-targeted. Shopping Ads are product-based with images, prices, and details, automatically matched to searches. Shopping Ads typically get 2-3x higher conversion rates for eCommerce because they show exactly what customers are searching for.'
  },
  {
    q: 'Do I need a Google Merchant Center account?',
    a: 'Yes! Merchant Center is required for Shopping Ads. It stores your product feed and syncs with Google Ads. We handle the entire setup: account creation, product feed configuration, policy compliance, and ongoing feed management.'
  },
  {
    q: 'How long to see results from Shopping Ads?',
    a: 'Shopping Ads can drive sales within days of launch. Initial setup takes 1-2 weeks. You\'ll see early results in week 1, with optimization improving performance over 4-8 weeks. Most clients achieve target ROAS within 60-90 days.'
  },
  {
    q: 'What is Performance Max for Shopping?',
    a: 'Performance Max uses Google\'s AI to show your products across all Google channels: Search, Shopping, YouTube, Gmail, Display. It\'s the newest, most automated campaign type, often delivering better ROAS than Standard Shopping for established stores.'
  }
];

export function GoogleShoppingAdsPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'PPC', path: '/services/ppc-google-ads' },
    { name: 'Google Shopping Ads', path: '/services/ppc-google-ads/google-shopping' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Google Shopping Ads Management | 400% ROAS eCommerce PPC"
        description="Expert Google Shopping Ads management for eCommerce. Get 400% ROAS with optimized product feeds, Smart Shopping, and Performance Max campaigns. Free audit included."
        keywords={['Google Shopping Ads', 'product listing ads', 'eCommerce PPC', 'Merchant Center', 'shopping campaigns', 'ROAS']}
        canonicalUrl="/services/ppc/google-shopping"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Google Shopping Ads Management - Drive eCommerce Sales with 400% ROAS',
        description: 'Professional Google Shopping campaign management with product feed optimization and smart bidding.',
        slug: 'services/ppc/google-shopping'
      })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} showHomeIcon={true} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass-yellow px-4 py-2 rounded-full mb-6">
              <ShoppingCart className="w-5 h-5 text-yellow-500" />
              <span className="text-[13px] font-medium text-yellow-500">eCommerce Advertising</span>
            </div>
            
            <h1 className="text-[30px] md:text-[42px] font-medium mb-6 leading-tight">
              Dominate Google Shopping with <span className="text-yellow-500">400% ROAS</span>
            </h1>
            
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 leading-relaxed">
              Turn browsers into buyers with expert Google Shopping Ads management. We optimize product feeds, create high-performing campaigns, and deliver 400% average ROAS for eCommerce stores. Get your products in front of ready-to-buy customers at the exact moment they're searching.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Get Free Shopping Audit <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="glass border border-white/10 px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                View Case Studies <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">400%</div>
                <div className="text-[13px] text-gray-400">Avg ROAS</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">3.5x</div>
                <div className="text-[13px] text-gray-400">Sales Increase</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">200%</div>
                <div className="text-[13px] text-gray-400">More Traffic</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">35%</div>
                <div className="text-[13px] text-gray-400">Lower CPC</div>
              </div>
            </div>
          </div>
        </div>

        <OutlinedText text="SHOPPING" direction="right" delay={0} stopPosition={20} parallax={true} parallaxSpeed={0.2} />
      </section>

      {/* Core Services */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Complete Google Shopping Management</h2>
            <p className="text-[15px] text-gray-400">
              Full-service Shopping Ads management from feed optimization to campaign scaling.
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
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Proven Shopping Ads Results</h2>
            <p className="text-[15px] text-gray-400">
              Data-driven campaigns that maximize revenue while minimizing wasted ad spend.
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
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Our Shopping Ads Process</h2>
            <p className="text-[15px] text-gray-400">
              Proven methodology to launch profitable Shopping campaigns in 14 days.
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

      {/* Features */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Everything Included</h2>
            <p className="text-[15px] text-gray-400">
              Complete Shopping Ads management with no hidden costs.
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

      {/* Industries */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">eCommerce Industries We Serve</h2>
            <p className="text-[15px] text-gray-400">
              Specialized Shopping Ads strategies for every product category.
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
              Ready to Scale Your eCommerce Sales?
            </h2>
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 max-w-2xl mx-auto">
              Get a free Google Shopping Ads audit worth ₹7,000. We'll analyze your current campaigns and show you exactly how to achieve 400% ROAS.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Get Free Shopping Audit <ArrowRight className="w-5 h-5" />
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