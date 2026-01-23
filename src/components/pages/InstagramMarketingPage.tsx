import { Instagram, Heart, TrendingUp, ChevronRight, ArrowRight, CheckCircle, Users, Camera, Share2, Target, Video, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const coreServices = [
  { icon: Camera, title: 'Content Creation', desc: 'Professional photos, Reels, Stories, and carousel posts that stop the scroll.' },
  { icon: Target, title: 'Instagram Ads', desc: 'High-converting Instagram ad campaigns (Feed, Stories, Reels, Explore).' },
  { icon: Users, title: 'Influencer Marketing', desc: 'Partner with relevant Instagram influencers to reach targeted audiences.' },
  { icon: Share2, title: 'Community Management', desc: 'Engage with followers, respond to DMs/comments, build loyal community.' },
  { icon: TrendingUp, title: 'Growth Strategy', desc: 'Organic growth tactics: hashtags, engagement pods, strategic following.' },
  { icon: Video, title: 'Reels & Stories', desc: 'Create viral-worthy Reels and engaging Stories for maximum reach.' }
];

const benefits = [
  { icon: Users, title: '500%+ Follower Growth', desc: 'Average follower increase in 6 months', stat: '500%' },
  { icon: Heart, title: '10x Engagement', desc: 'Higher engagement than Facebook', stat: '10x' },
  { icon: TrendingUp, title: '3M+ Reach', desc: 'Monthly reach for our managed accounts', stat: '3M+' },
  { icon: MessageCircle, title: '70% Response Rate', desc: 'To customer DMs and comments', stat: '70%' }
];

const process = [
  { step: '01', title: 'Audit & Strategy', desc: 'Analyze current Instagram presence, competitors, and create custom growth strategy.' },
  { step: '02', title: 'Content Planning', desc: 'Develop content calendar with mix of posts, Reels, Stories, and carousel content.' },
  { step: '03', title: 'Content Creation', desc: 'Professional photography, video editing, graphic design, and copywriting.' },
  { step: '04', title: 'Posting & Engagement', desc: 'Strategic posting times, hashtag research, and active community engagement.' },
  { step: '05', title: 'Instagram Ads', desc: 'Create and optimize Instagram ad campaigns for brand awareness and conversions.' },
  { step: '06', title: 'Analytics & Reporting', desc: 'Track growth, engagement, reach, and provide monthly insights reports.' }
];

const features = [
  'Instagram Account Audit',
  'Custom Content Strategy',
  'Professional Photo Shoots',
  'Reels Production & Editing',
  'Stories Creation & Management',
  'Carousel Post Design',
  'Caption Writing & Hashtags',
  'Instagram Feed Curation',
  'Instagram Ads Management',
  'Story Ads Campaigns',
  'Reels Ads Campaigns',
  'Explore Ads',
  'Shopping Tag Setup',
  'Influencer Outreach',
  'UGC Campaign Management',
  'Engagement Strategy',
  'DM Response Management',
  'Comment Moderation',
  'Follower Growth Tactics',
  'Hashtag Research & Strategy',
  'Competitor Analysis',
  'Instagram Analytics',
  'Monthly Performance Reports',
  'A/B Testing'
];

const contentTypes = [
  'Product Photography',
  'Lifestyle Content',
  'Behind-the-Scenes',
  'User-Generated Content',
  'Educational Carousels',
  'Viral Reels',
  'Interactive Stories',
  'Testimonial Posts',
  'Before/After Content',
  'Meme Marketing'
];

const faqs = [
  {
    q: 'Why is Instagram important for businesses?',
    a: 'Instagram has 2+ billion active users with high engagement rates. It\'s visual-first format is perfect for brand storytelling. 81% of users research products on Instagram, and 50% become more interested in brands after seeing Instagram ads. Perfect for B2C businesses, eCommerce, and visual brands.'
  },
  {
    q: 'How much does Instagram marketing cost?',
    a: 'Our Instagram marketing packages start at ₹25,000/month including content creation, posting, and community management. Instagram ads budget varies - we recommend minimum ₹500/day (₹15,000/month). Total investment: ₹40,000/month for full-service Instagram marketing.'
  },
  {
    q: 'Do you create content or do we provide it?',
    a: 'We handle everything! Our team creates all content: professional photos, Reels, Stories, graphics. We can also work with your existing content or UGC. Content creation is included in our management packages - no extra photography costs.'
  },
  {
    q: 'How many posts per week?',
    a: 'We recommend: 3-5 Feed posts, 5-7 Stories per day, 3-4 Reels per week. Exact frequency depends on your package and industry. Quality matters more than quantity - we focus on high-engagement content over post volume.'
  },
  {
    q: 'How long to grow followers on Instagram?',
    a: 'Organic growth takes 3-6 months to see significant results (500-5,000 new followers). Paid Instagram ads can drive immediate followers. We typically achieve 20-30% monthly follower growth with our combined organic + paid strategy.'
  },
  {
    q: 'What are Instagram Reels?',
    a: 'Reels are short-form vertical videos (15-90 seconds) similar to TikTok. They\'re Instagram\'s fastest-growing content format with 200x more reach than regular posts. Reels are critical for growth - we create 3-4 viral-worthy Reels weekly for clients.'
  }
];

export function InstagramMarketingPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Social Media', path: '/services/social-media-marketing' },
    { name: 'Instagram Marketing', path: '/services/social-media-marketing/instagram' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Instagram Marketing Services | 500% Follower Growth & Engagement"
        description="Expert Instagram marketing services: content creation, Reels, Stories, ads, and influencer marketing. Grow followers 500%+ and boost engagement with our proven strategies."
        keywords={['Instagram marketing', 'Instagram ads', 'Reels creation', 'Instagram growth', 'influencer marketing', 'Instagram content']}
        canonicalUrl="/services/social-media/instagram"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Instagram Marketing Services - Grow Followers & Engagement',
        description: 'Professional Instagram marketing with content creation, ads, and community management.',
        slug: 'services/social-media/instagram'
      })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} showHomeIcon={true} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 relative z-10">

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass-yellow px-4 py-2 rounded-full mb-6">
              <Instagram className="w-5 h-5 text-yellow-500" />
              <span className="text-[13px] font-medium text-yellow-500">Instagram Marketing</span>
            </div>
            
            <h1 className="text-[30px] md:text-[42px] font-medium mb-6 leading-tight">
              Grow Your Instagram with <span className="text-yellow-500">500%+ Followers</span>
            </h1>
            
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 leading-relaxed">
              Transform your Instagram into a powerful sales channel. Our expert Instagram marketing services combine viral Reels, stunning content, strategic ads, and influencer partnerships to skyrocket your followers, engagement, and revenue. Stop scrolling, start selling.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Get Free Instagram Audit <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="glass border border-white/10 px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                See Our Portfolio <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">500%</div>
                <div className="text-[13px] text-gray-400">Follower Growth</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">10x</div>
                <div className="text-[13px] text-gray-400">Engagement</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">3M+</div>
                <div className="text-[13px] text-gray-400">Monthly Reach</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-[24px] font-bold text-yellow-500 mb-1">70%</div>
                <div className="text-[13px] text-gray-400">Response Rate</div>
              </div>
            </div>
          </div>
        </div>

        <OutlinedText text="INSTAGRAM" direction="right" delay={0} stopPosition={20} parallax={true} parallaxSpeed={0.2} />
      </section>

      {/* Core Services */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Complete Instagram Marketing Services</h2>
            <p className="text-[15px] text-gray-400">
              From content creation to influencer marketing - everything you need to dominate Instagram.
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
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Real Instagram Results</h2>
            <p className="text-[15px] text-gray-400">
              Data-driven strategies that deliver massive follower growth and engagement.
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
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Our Instagram Marketing Process</h2>
            <p className="text-[15px] text-gray-400">
              Strategic approach to Instagram growth and engagement.
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

      {/* Content Types */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Content We Create</h2>
            <p className="text-[15px] text-gray-400">
              Diverse content formats to keep your Instagram feed fresh and engaging.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {contentTypes.map((type, i) => (
              <div key={i} className="glass-card p-4 text-center hover:border-yellow-500/20 transition-all">
                <p className="text-[15px] font-medium">{type}</p>
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
              Complete Instagram management with content creation, ads, and community building.
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
              Ready to Grow Your Instagram?
            </h2>
            <p className="text-[15px] md:text-[16px] text-gray-400 mb-8 max-w-2xl mx-auto">
              Get a free Instagram audit worth ₹5,000. We'll analyze your account and create a custom growth strategy to 10x your followers and engagement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-yellow-500 text-black px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-all inline-flex items-center gap-2 hover:gap-3"
              >
                Get Free Instagram Audit <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact" 
                className="glass border border-white/10 px-8 py-4 text-[15px] font-semibold rounded-lg hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                View Portfolio <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}