import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, TrendingUp, Target, Heart, Video, Camera, BarChart3, Shield, Zap, MessageCircle, Award, CheckCircle, ArrowRight, Search, FileText, Megaphone } from 'lucide-react';
import { OutlinedText } from '../ui/OutlinedText';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const coreServices = [
  { icon: Search, title: 'Influencer Discovery', desc: 'Find the perfect influencers that match your brand values and target audience.' },
  { icon: Users, title: 'Campaign Strategy', desc: 'Design influencer campaigns that drive authentic engagement and conversions.' },
  { icon: FileText, title: 'Contract Management', desc: 'Handle negotiations, contracts, and deliverable tracking professionally.' },
  { icon: Video, title: 'Content Collaboration', desc: 'Work with influencers to create authentic, branded content that resonates.' },
  { icon: BarChart3, title: 'Performance Tracking', desc: 'Measure reach, engagement, conversions, and ROI from influencer partnerships.' },
  { icon: Shield, title: 'Brand Safety', desc: 'Vet influencers for authenticity, fake followers, and brand alignment.' }
];

const benefits = [
  { icon: Users, title: '11x Higher ROI', desc: 'Than traditional advertising', stat: '11x' },
  { icon: Heart, title: '89% Trust Rate', desc: 'Consumers trust influencer recommendations', stat: '89%' },
  { icon: TrendingUp, title: '300% Reach Increase', desc: 'Average campaign reach growth', stat: '300%' },
  { icon: Award, title: '5.2% Engagement', desc: 'Average influencer engagement rate', stat: '5.2%' }
];

const process = [
  { step: '01', title: 'Strategy & Goals', desc: 'Define campaign objectives, target audience, budget, and success metrics.' },
  { step: '02', title: 'Influencer Research', desc: 'Identify and vet influencers based on audience fit, engagement, and authenticity.' },
  { step: '03', title: 'Outreach & Negotiation', desc: 'Contact influencers, negotiate terms, and finalize contracts and deliverables.' },
  { step: '04', title: 'Content Briefing', desc: 'Provide creative briefs ensuring brand alignment while allowing creative freedom.' },
  { step: '05', title: 'Campaign Execution', desc: 'Monitor content creation, approve posts, and manage campaign timeline.' },
  { step: '06', title: 'Tracking & Reporting', desc: 'Measure performance, calculate ROI, and provide detailed campaign reports.' }
];

const features = [
  'Influencer Database Access',
  'Audience Analysis',
  'Fake Follower Detection',
  'Engagement Rate Verification',
  'Brand Safety Checks',
  'Micro-Influencer Strategy',
  'Macro-Influencer Partnerships',
  'Celebrity Collaborations',
  'Niche Influencer Networks',
  'Campaign Brief Creation',
  'Contract Negotiation',
  'Rate Card Management',
  'Content Approval Workflow',
  'FTC Compliance',
  'Sponsored Post Disclosure',
  'Performance Tracking',
  'ROI Calculation',
  'Competitor Analysis',
  'Long-term Partnerships',
  'Affiliate Programs',
  'Gifting Campaigns',
  'Product Seeding',
  'Event Activations',
  'Influencer Whitelisting'
];

const influencerTypes = [
  { type: 'Nano-Influencers', range: '1K-10K followers', benefit: 'Highest engagement, authentic connections, budget-friendly' },
  { type: 'Micro-Influencers', range: '10K-100K followers', benefit: 'Strong niche authority, engaged communities, cost-effective' },
  { type: 'Macro-Influencers', range: '100K-1M followers', benefit: 'Wide reach, established credibility, content quality' },
  { type: 'Mega-Influencers', range: '1M+ followers', benefit: 'Massive awareness, mainstream appeal, viral potential' },
  { type: 'Celebrity Influencers', range: 'Varies', benefit: 'Brand prestige, instant credibility, media coverage' }
];

const platforms = [
  'Instagram Influencers',
  'YouTube Creators',
  'TikTok Influencers',
  'Facebook Influencers',
  'LinkedIn Thought Leaders',
  'Twitter/X Influencers',
  'Pinterest Creators',
  'Blog Influencers'
];

const faqs = [
  {
    q: 'What is influencer marketing and how does it work?',
    a: 'Influencer marketing involves partnering with social media personalities who have engaged followings to promote your brand. They create authentic content featuring your products/services and share it with their audience. It works because people trust recommendations from influencers they follow more than traditional ads.'
  },
  {
    q: 'How much does influencer marketing cost?',
    a: 'Costs vary widely: Nano-influencers (₹2,000-₹10,000/post), Micro-influencers (₹10,000-₹1,00,000/post), Macro-influencers (₹1,00,000-₹10,00,000/post). Our campaign management starts at ₹50,000/month. Total budget depends on influencer tiers and campaign scope.'
  },
  {
    q: 'How do you find the right influencers for my brand?',
    a: 'We use influencer discovery tools to analyze: audience demographics, engagement rates, content quality, brand alignment, past partnerships, and fake follower detection. We then shortlist 10-20 influencers, vet them manually, and recommend the best 3-5 matches for your campaign.'
  },
  {
    q: 'What ROI can I expect from influencer marketing?',
    a: 'On average, businesses earn ₹11 for every ₹1 spent on influencer marketing. Our campaigns typically generate: 300% reach increase, 5-8% engagement rates, 2-4% conversion rates for e-commerce. Results depend on influencer selection, content quality, and product-market fit.'
  },
  {
    q: 'Micro vs Macro influencers - which is better?',
    a: 'Micro-influencers (10K-100K) have higher engagement (5-8%) and are more cost-effective. Macro-influencers (100K-1M) offer wider reach and polished content. We recommend: Micro for niche products and engagement goals, Macro for brand awareness. Best results come from multi-tier influencer mix.'
  },
  {
    q: 'How do you prevent influencer fraud and fake followers?',
    a: 'We verify influencers using: fake follower detection tools (check for bots), engagement rate analysis (should be 3%+), audience demographics review, comment quality assessment, and past campaign performance. We also check for sudden follower spikes and suspicious engagement patterns.'
  }
];

export function InfluencerMarketingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Social Media', path: '/services/social-media-marketing' },
    { name: 'Influencer Marketing', path: '/services/social-media-marketing/influencer-marketing' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Influencer Marketing Services | 11x ROI & Authentic Brand Partnerships"
        description="Expert influencer marketing agency in Indore. Connect with the right influencers across Instagram, YouTube, TikTok. Proven campaigns with 11x ROI, authentic engagement, and measurable results."
        keywords={['influencer marketing', 'influencer marketing agency', 'Instagram influencers', 'YouTube influencers', 'micro influencers', 'influencer campaigns', 'brand partnerships', 'Indore']}
        canonicalUrl="/services/influencer-marketing"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Influencer Marketing Services - Authentic Brand Partnerships',
        description: 'Professional influencer marketing with strategy, discovery, campaign management, and ROI tracking.',
        slug: 'services/influencer-marketing'
      })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} showHomeIcon={true} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass-yellow px-4 py-2 rounded-full mb-6">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-[13px] font-medium text-yellow-500">Influencer Marketing</span>
            </div>
            
            <h1 className="text-[30px] md:text-[42px] font-medium mb-6 leading-tight">
              Partner with Influencers. Get <span className="text-yellow-500">11x ROI</span>
            </h1>
            
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 leading-relaxed">
              Connect your brand with the right influencers who drive real results. From nano to mega influencers across Instagram, YouTube, and TikTok - we handle discovery, negotiation, campaign management, and ROI tracking. Authentic partnerships that boost trust, reach, and sales.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Start Influencer Campaign <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/case-studies" 
                className="glass px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                View Campaign Results
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="text-center">
                  <div className="text-[32px] font-bold text-yellow-500 mb-2">{benefit.stat}</div>
                  <div className="text-[15px] font-medium text-white mb-1">{benefit.title}</div>
                  <div className="text-[13px] text-gray-400">{benefit.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outlined Background Text */}
        <OutlinedText 
          text="INFLUENCERS" 
          className="absolute top-[10%] right-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
        />
      </section>

      {/* Core Services */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Complete Influencer Marketing Services</h2>
            <p className="text-[15px] text-gray-400">
              From influencer discovery to campaign reporting - we handle everything for successful influencer partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="glass p-6 rounded-xl hover:bg-white/10 transition-all group">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-all">
                    <Icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <h3 className="text-[18px] font-semibold mb-2">{service.title}</h3>
                  <p className="text-[14px] text-gray-400">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Influencer Types */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Choose the Right Influencer Tier</h2>
            <p className="text-[15px] text-gray-400">
              From nano to mega influencers - each tier serves different campaign objectives and budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {influencerTypes.map((tier, i) => (
              <div key={i} className="glass p-6 rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] font-semibold mb-1">{tier.type}</h3>
                    <p className="text-[13px] text-yellow-500">{tier.range}</p>
                  </div>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-[14px] text-gray-400">{tier.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Our Influencer Campaign Process</h2>
            <p className="text-[15px] text-gray-400">
              Proven 6-step process that ensures successful influencer partnerships and measurable ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, i) => (
              <div key={i} className="glass p-6 rounded-xl">
                <div className="text-[32px] font-bold text-yellow-500/20 mb-4">{item.step}</div>
                <h3 className="text-[18px] font-semibold mb-3">{item.title}</h3>
                <p className="text-[14px] text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Multi-Platform Influencer Network</h2>
            <p className="text-[15px] text-gray-400">
              We connect you with influencers across all major platforms based on where your audience is most active.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((platform, i) => (
              <div key={i} className="glass p-4 rounded-lg text-center hover:bg-white/10 transition-all">
                <p className="text-[14px] font-medium">{platform}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Checklist */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">What's Included</h2>
            <p className="text-[15px] text-gray-400">
              Comprehensive influencer marketing service covering every aspect of campaign success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="text-[14px]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Frequently Asked Questions</h2>
            <p className="text-[15px] text-gray-400">
              Everything you need to know about influencer marketing and our services.
            </p>
          </div>

          <div className="max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <span className="text-[15px] font-medium pr-8">{faq.q}</span>
                  <div className={`text-yellow-500 transition-transform ${openFAQ === i ? 'rotate-180' : ''}`}>
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </div>
                </button>
                {openFAQ === i && (
                  <div className="px-6 pb-6">
                    <p className="text-[14px] text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="glass-yellow rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <Megaphone className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">
              Ready to Launch Your Influencer Campaign?
            </h2>
            <p className="text-[15px] text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's find the perfect influencers for your brand. Get a free campaign strategy and influencer recommendations tailored to your goals and budget.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Get Free Strategy Call <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/case-studies" 
                className="bg-white/10 text-white px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-white/20 transition-all"
              >
                View Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}