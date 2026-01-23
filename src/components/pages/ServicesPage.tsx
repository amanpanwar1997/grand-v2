import { Link } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Users, Zap, Star, Search, Globe, ShoppingCart, Megaphone, Palette, Camera, Newspaper, FileText, PenTool, Video, Award, BarChart3, Mail, MessageSquare, CheckCircle, Rocket, Trophy, Shield, Smartphone, MonitorPlay, Brain, Lightbulb, Code, DollarSign, TrendingDown, Play } from 'lucide-react';
import { Badge } from '../ui/badge';
import { BentoGrid2 } from '../layout/BentoGrid2';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { AutoCarousel } from '../ui/AutoCarousel';
import { OutlinedText } from '../ui/OutlinedText';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { useSEO, StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/seo-system';

export function ServicesPage() {
  const seo = useSEO(); // Auto-loads SEO from centralized config
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];
  
  const featuredServices = [
    {
      title: 'Digital Marketing',
      tagline: 'SEO, PPC, Social Media & Content Marketing',
      description: 'Comprehensive digital marketing including SEO (3-6 month timeline), Google Ads management, social media strategy, content creation, and email marketing.',
      icon: TrendingUp,
      link: '/services/digital-marketing',
      projects: 342,
      badge: 'Most Popular',
      stats: '342 Clients Served',
    },
    {
      title: 'Advertising',
      tagline: 'Multi-Channel Campaign Management',
      description: 'Advertising campaigns across Google Ads, Meta, LinkedIn, YouTube, OOH, and print. Testing and optimization based on performance data.',
      icon: Megaphone,
      link: '/services/advertising',
      projects: 287,
      badge: 'Results-Focused',
      stats: '287 Campaigns Run',
    },
    {
      title: 'Branding',
      tagline: 'Brand Strategy & Identity Design',
      description: 'Complete branding services including strategy, positioning, logo design, visual identity systems, brand guidelines, and voice development.',
      icon: Award,
      link: '/services/branding',
      projects: 156,
      badge: 'Premium',
      stats: '156 Brands Created',
    },
    {
      title: 'Website & App Development',
      tagline: 'Fast, Responsive Web Solutions',
      description: 'Professional website development, e-commerce platforms, and mobile app creation. Focus on speed optimization and user experience.',
      icon: Globe,
      link: '/services/website-development',
      projects: 365,
      badge: 'Essential',
      stats: '365 Projects Delivered',
    },
    {
      title: 'Software Development',
      tagline: 'Custom Software Solutions',
      description: 'Custom SaaS platforms, enterprise software, CRM systems, API integrations, and automation tools built with modern technology stacks.',
      icon: MonitorPlay,
      link: '/services/software-development',
      projects: 142,
      badge: 'Technical',
      stats: '142 Products Built',
    },
    {
      title: 'Graphic Design & Creative',
      tagline: 'Professional Visual Content',
      description: 'Graphic design services including social media graphics, marketing materials, packaging design, motion graphics, and animation work.',
      icon: Palette,
      link: '/services/graphic-design',
      projects: 287,
      badge: 'Creative',
      stats: '12,000+ Designs Created',
    },
    {
      title: 'Media Production',
      tagline: 'Video & Photography Services',
      description: 'Professional video production, commercial photography, drone cinematography, event coverage, and post-production editing.',
      icon: Camera,
      link: '/services/media-production',
      projects: 198,
      badge: 'Professional',
      stats: '198 Projects Completed',
    },
    {
      title: 'Public Relations',
      tagline: 'Strategic PR & Media Relations',
      description: 'PR campaign strategy, media placements, press releases, crisis management, and thought leadership positioning.',
      icon: MessageSquare,
      link: '/services/public-relations',
      projects: 89,
      badge: 'Strategic',
      stats: '89 Campaigns Managed',
    },
    {
      title: 'Political Campaigns',
      tagline: 'Data-Driven Political Strategy',
      description: 'Electoral campaign strategy, voter analysis, digital advocacy, messaging development, and ground operations coordination.',
      icon: Target,
      link: '/services/political-campaigns',
      projects: 34,
      badge: 'Specialized',
      stats: '34 Campaigns Run',
    },
    {
      title: 'OOH Advertising',
      tagline: 'Outdoor & Transit Advertising',
      description: 'Strategic outdoor advertising including billboards, transit ads, mall displays, airport branding, and digital OOH placements.',
      icon: Megaphone,
      link: '/services/ooh-advertising',
      projects: 156,
      badge: 'Traditional',
      stats: '156 Campaigns Placed',
    },
    {
      title: 'Radio & Newspapers',
      tagline: 'Traditional Media Buying',
      description: 'Radio advertising, newspaper placements, magazine features, and traditional media buying with performance tracking.',
      icon: Newspaper,
      link: '/services/radio-newspapers',
      projects: 178,
      badge: 'Classic Media',
      stats: '178 Campaigns Placed',
    },
    {
      title: 'Product Marketing',
      tagline: 'Go-to-Market Strategy',
      description: 'Product positioning, launch strategy, lifecycle marketing, competitive analysis, and pricing strategy development.',
      icon: Rocket,
      link: '/services/product-marketing',
      projects: 97,
      badge: 'Growth-Focused',
      stats: '97 Launches Supported',
    },
    {
      title: 'BTL Activations & On-Ground Marketing',
      tagline: 'Experiential Brand Engagement',
      description: 'Direct consumer engagement through product sampling, mall activations, roadshows, events, and experiential campaigns.',
      icon: Users,
      link: '/services/btl-activations',
      projects: 89,
      badge: '🔥 Core Service',
      stats: '500K+ Consumers Engaged',
    },
    {
      title: 'Creative Concept & Campaign Execution',
      tagline: 'Integrated Campaign Development',
      description: 'End-to-end creative campaigns from strategy to execution across digital, traditional, experiential, and PR channels.',
      icon: Lightbulb,
      link: '/services/creative-campaigns',
      projects: 120,
      badge: '⭐ Core Service',
      stats: '120+ Campaigns Executed',
    },
  ];

  const allServices = [
    { name: 'Digital Marketing', slug: 'digital-marketing', icon: TrendingUp, clients: '74+ Campaigns', description: 'SEO, PPC, Social, Content, Email' },
    { name: 'Advertising', slug: 'advertising', icon: Megaphone, clients: '13+ International', description: 'Google, Social, OOH, Print, Video' },
    { name: 'Branding', slug: 'branding', icon: Award, clients: '100+ Brands', description: 'Strategy, Logo, Identity, Guidelines' },
    { name: 'Website & App Development', slug: 'website-development', icon: Globe, clients: '60+ Websites', description: 'Web, E-commerce, Apps, UI/UX' },
    { name: 'Software Development', slug: 'software-development', icon: MonitorPlay, clients: 'Custom Solutions', description: 'SaaS, Enterprise, CRM, APIs' },
    { name: 'Graphic Design & Creative', slug: 'graphic-design', icon: Palette, clients: 'Creative Studio', description: 'Graphics, Animation, Print, Digital' },
    { name: 'Media Production', slug: 'media-production', icon: Camera, clients: 'Full Production', description: 'Video, Photography, Events, Post' },
    { name: 'Public Relations', slug: 'public-relations', icon: MessageSquare, clients: 'PR Excellence', description: 'PR Strategy, Media, Crisis Management' },
    { name: 'Political Campaigns', slug: 'political-campaigns', icon: Target, clients: 'Strategic Campaigns', description: 'Electoral Strategy, Digital Advocacy' },
    { name: 'OOH Advertising', slug: 'ooh-advertising', icon: Megaphone, clients: 'Outdoor Experts', description: 'Billboards, Transit, Digital OOH' },
    { name: 'Radio & Newspapers', slug: 'radio-newspapers', icon: Newspaper, clients: 'Traditional Media', description: 'Radio Spots, Print, Magazines' },
    { name: 'Product Marketing', slug: 'product-marketing', icon: Rocket, clients: 'Product Launch', description: 'GTM, Positioning, Launches' },
    { name: 'BTL Activations', slug: 'btl-activations', icon: Users, clients: '🔥 Core Service', description: 'Sampling, Events, Experiential' },
    { name: 'Creative Campaigns', slug: 'creative-campaigns', icon: Lightbulb, clients: '⭐ Core Service', description: 'Strategy, Creative, Multi-Channel' },
  ];

  const serviceStats = [
    { number: '14', label: 'Specialized Services', growth: 'Comprehensive solutions', icon: Target },
    { number: '96+', label: 'Clients Served', growth: 'Growing businesses', icon: Users },
    { number: '100+', label: 'Brands Managed', growth: 'Successfully delivered', icon: Rocket },
    { number: '4.9★', label: 'Google Rating', growth: '200+ verified reviews', icon: TrendingUp },
  ];

  const successMetrics = [
    { metric: '96+', label: 'Clients Served', description: 'Across all services and industries', icon: Users },
    { metric: '100+', label: 'Brands Managed', description: 'Successfully delivered', icon: Award },
    { metric: '7', label: 'Years Experience', description: 'Serving businesses since 2018', icon: CheckCircle },
    { metric: '60+', label: 'Websites Built', description: 'Successfully delivered', icon: DollarSign },
    { metric: '98%', label: 'Client Retention', description: 'Long-term partnerships', icon: Star },
    { metric: '4.9★', label: 'Google Rating', description: 'From 200+ verified reviews', icon: Trophy },
  ];

  const pricingData = [
    {
      question: 'How much do your services cost?',
      answer: 'Pricing varies based on service and scope. Digital marketing typically starts at ₹35,000/month, website development from ₹65,000, branding from ₹95,000. We provide detailed proposals based on your specific needs. Schedule a free consultation to discuss pricing.',
    },
    {
      question: 'Do you offer package discounts?',
      answer: 'Yes, we offer bundled service packages with discounts. Clients combining multiple services can save 15-25%. We\'ll discuss package options during your consultation based on your needs and budget.',
    },
    {
      question: 'What is included in digital marketing services?',
      answer: 'Our digital marketing includes SEO (on-page and technical optimization), PPC management, social media strategy and management, content creation, email marketing, analytics tracking, monthly reporting, and regular strategy calls.',
    },
    {
      question: 'What are your contract terms?',
      answer: 'Digital marketing services typically require 6-month minimum commitments as SEO takes 3-6 months to show results. Website and branding are project-based. We don\'t use long lock-in contracts - most clients continue because they see value.',
    },
    {
      question: 'How do you ensure transparency?',
      answer: 'We provide monthly detailed reports, dashboard access for tracking, regular calls to review progress, and clear documentation of all work completed. You\'ll always know what we\'re working on and where your budget is allocated.',
    },
  ];

  const serviceDetails = [
    {
      service: 'SEO Services',
      features: ['Technical SEO audit and fixes', 'Keyword research and analysis', 'On-page optimization', 'Content optimization', 'Link building (white-hat methods)', 'Monthly performance reports'],
      timeline: 'Results in 3-6 months',
      clients: 187,
      pricing: 'From ₹35,000/month',
    },
    {
      service: 'Social Media Marketing',
      features: ['Platform strategy development', 'Content creation and scheduling', 'Community management', 'Paid social advertising', 'Performance tracking', 'Monthly reports and insights'],
      timeline: 'Ongoing optimization',
      clients: 203,
      pricing: 'From ₹30,000/month',
    },
    {
      service: 'Google Ads / PPC',
      features: ['Campaign strategy and setup', 'Ad copy and creative development', 'Keyword research and bidding', 'A/B testing and optimization', 'Conversion tracking', 'Regular performance reviews'],
      timeline: 'Results in 1-2 months',
      clients: 189,
      pricing: 'From ₹25,000/month + ad spend',
    },
    {
      service: 'Website Development',
      features: ['Custom responsive design', 'Speed optimization', 'SEO-friendly structure', 'Security setup and SSL', 'CMS integration', '6 months support included'],
      timeline: '4-8 weeks delivery',
      clients: 156,
      pricing: 'From ₹65,000',
    },
    {
      service: 'Branding Services',
      features: ['Brand strategy development', 'Logo design concepts', 'Visual identity system', 'Brand guidelines document', 'Marketing collateral design', 'Launch support'],
      timeline: '6-8 weeks process',
      clients: 142,
      pricing: 'From ₹95,000',
    },
    {
      service: 'Video Production',
      features: ['Concept and script development', 'Professional filming (4K)', 'Drone footage (if needed)', 'Professional editing', 'Motion graphics', 'Multiple format delivery'],
      timeline: '2-4 weeks per video',
      clients: 98,
      pricing: 'From ₹50,000/video',
    },
  ];

  const industries = [
    { name: 'Healthcare', clients: '67+' },
    { name: 'Technology & SaaS', clients: '52+' },
    { name: 'Education & E-Learning', clients: '43+' },
    { name: 'Real Estate', clients: '89+' },
    { name: 'Finance & Banking', clients: '34+' },
    { name: 'Retail & E-commerce', clients: '78+' },
    { name: 'Automotive', clients: '29+' },
    { name: 'Fashion & Apparel', clients: '41+' },
    { name: 'Food & Beverage', clients: '53+' },
    { name: 'Legal Services', clients: '22+' },
    { name: 'Manufacturing', clients: '31+' },
    { name: 'Sports & Fitness', clients: '18+' },
    { name: 'Entertainment', clients: '27+' },
    { name: 'Non-Profit', clients: '19+' },
    { name: 'Hospitality & Travel', clients: '36+' },
    { name: 'Beauty & Wellness', clients: '45+' },
  ];

  const whyChooseUs = [
    {
      icon: Trophy,
      title: 'Proven Experience',
      description: '1,850+ projects delivered across 12 services with 98% client retention rate over 10+ years.',
    },
    {
      icon: Users,
      title: 'Experienced Team',
      description: '50+ in-house specialists including strategists, designers, developers, and marketers.',
    },
    {
      icon: Target,
      title: 'Results-Focused',
      description: 'We set clear goals and work consistently toward achieving them through ongoing optimization.',
    },
    {
      icon: Shield,
      title: 'Complete Transparency',
      description: 'Monthly reports, dashboard access, regular calls. You always know what we\'re working on.',
    },
    {
      icon: Rocket,
      title: 'Reliable Delivery',
      description: '98% on-time delivery rate. We meet commitments and communicate clearly about timelines.',
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'ISO 9001:2015 certified processes. Professional work with multiple quality checks.',
    },
  ];

  const caseStudies = [
    {
      client: 'Healthcare Startup',
      industry: 'Healthcare',
      challenge: 'New clinic needed to build local visibility and patient inquiries.',
      solution: 'Local SEO, Google My Business optimization, and targeted Google Ads over 6 months.',
      result: 'Grew from zero to 150+ monthly inquiries. Became established in local market.',
    },
    {
      client: 'E-commerce Business',
      industry: 'Retail',
      challenge: 'Online store had traffic but low conversion rates.',
      solution: 'Website redesign, improved product pages, and conversion optimization over 3 months.',
      result: 'Conversion rate improved from 1.2% to 3.8%. Revenue increased accordingly.',
    },
    {
      client: 'Real Estate Agency',
      industry: 'Real Estate',
      challenge: 'Traditional agency needed digital presence and lead generation.',
      solution: 'Website development, SEO, and Facebook advertising over 4 months.',
      result: 'Generated 200+ qualified leads. Digital now accounts for 40% of their business.',
    },
  ];

  return (
    <div>
      {/* ⚠️ REMOVED bg-black - Using body background with grid pattern */}
      {/* SEO Meta Tags - Auto-loaded from centralized config */}
      <SEOHeadSSG {...seo.meta} />
      
      <StructuredData 
        schema={[
          organizationSchema,
          getWebPageSchema(seo.meta.title, seo.meta.description, '/services', breadcrumbs),
          getBreadcrumbSchema(breadcrumbs),
        ]} 
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} showHomeIcon={true} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative overflow-hidden">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="SOLUTIONS" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6">OUR SERVICES</p>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <h1 className="text-[30px] md:text-[36px] font-medium tracking-tight mb-8 leading-[1.3]">
              {seo.h1}
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              From digital marketing to software development, we provide <span className="text-yellow-500 font-semibold">comprehensive services</span> with transparent pricing and realistic timelines.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Services Grid - Bento Grid 2.0 */}
      <section className="border-t border-white/10 py-16 md:py-24 bg-white/[0.02] relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="EXPERTISE" 
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 px-4 py-2 rounded-lg mb-4 text-xs font-semibold uppercase tracking-wide">
                12 Specialized Services
              </div>
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">
                Complete Service Portfolio
              </h2>
              <p className="text-[0.9375rem] leading-relaxed text-gray-300 max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
                Explore our <span className="text-yellow-500 font-semibold">12 specialized services</span> displayed in an advanced 2/6/8 column grid system.
              </p>
            </div>

            {/* BentoGrid2 Component - Asymmetric Mode */}
            <BentoGrid2 
              cards={featuredServices.map(service => ({
                title: service.title,
                description: service.description,
                icon: service.icon,
                link: service.link
              }))}
              mode="asymmetric"
              showBadges={true}
              showStats={true}
              ariaLabel="All services"
            />
          </div>
        </div>
      </section>

      {/* Service Stats */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <BentoGrid2
              cards={serviceStats.map(stat => ({
                icon: stat.icon,
                number: stat.number,
                label: stat.label,
                sublabel: stat.growth
              }))}
              mode="uniform"
              columns={4}
              ariaLabel="Service statistics"
            />
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="border-t border-white/10 py-16 md:py-24 relative">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="TRACK RECORD" 
          className="absolute top-[20%] right-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Our Track Record
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Real numbers from <span className="text-yellow-500 font-semibold">10+ years</span> of serving businesses across industries.
            </p>

            <BentoGrid2
              cards={successMetrics.map(metric => ({
                icon: metric.icon,
                number: metric.metric,
                label: metric.label,
                sublabel: metric.description
              }))}
              mode="uniform"
              columns={3}
              ariaLabel="Success metrics"
            />
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="border-t border-white/10 py-16 md:py-24 relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="DELIVERABLES" 
          className="absolute top-[20%] left-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">DETAILED BREAKDOWN</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              What's Included in Each Service
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              <span className="text-yellow-500 font-semibold">Transparent pricing</span> and clear deliverables for our most popular services.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceDetails.map((detail) => (
                <div key={detail.service} className="glass-card p-6">
                  <h4 className="text-lg font-medium mb-4 leading-[1.4]">{detail.service}</h4>
                  <ul className="space-y-2 mb-6">
                    {detail.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[0.8125rem] text-gray-400" style={{ lineHeight: 1.6 }}>
                        <CheckCircle size={16} className="flex-shrink-0 text-yellow-500 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <p className="text-[0.8125rem] text-gray-300">{detail.timeline}</p>
                    <p className="text-[0.8125rem] text-gray-500">{detail.clients} clients served</p>
                    <p className="text-[0.9375rem] leading-relaxed text-yellow-500 font-semibold">{detail.pricing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="border-t border-white/10 py-16 md:py-24 overflow-hidden relative">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="SUCCESS" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto mb-12 relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">CASE STUDIES</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Real Client Results
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Examples of projects we've completed and the <span className="text-yellow-500 font-semibold">results achieved</span> over time.
            </p>
          </div>

          <AutoCarousel speed="slow">
            {caseStudies.map((study, index) => (
              <div key={index} className="glass-card min-w-[300px] sm:min-w-[380px] max-w-[420px] flex-shrink-0 snap-center p-6">
                <div className="inline-block bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-lg mb-4 text-[0.8125rem] font-semibold">
                  {study.industry}
                </div>
                <h4 className="text-lg font-medium mb-4 leading-[1.4]">{study.client}</h4>
                <div className="space-y-4 text-[0.8125rem]" style={{ lineHeight: 1.6 }}>
                  <div>
                    <p className="text-yellow-500 font-medium mb-1">Challenge:</p>
                    <p className="text-gray-400">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-yellow-500 font-medium mb-1">Solution:</p>
                    <p className="text-gray-400">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-yellow-500 font-medium mb-1">Result:</p>
                    <p className="text-gray-300">{study.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </AutoCarousel>
        </div>
      </section>

      {/* Industries Served */}
      <section className="border-t border-white/10 py-16 md:py-24 relative overflow-hidden">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="INDUSTRIES" 
          className="absolute top-[20%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Industries We Serve
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Experience across <span className="text-yellow-500 font-semibold">16+ industries</span> with specialized strategies for each sector.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((industry, index) => (
                <div key={index} className="glass-card p-4 text-center">
                  <p className="text-[0.9375rem] leading-relaxed font-medium mb-1">{industry.name}</p>
                  <p className="text-[0.8125rem] text-yellow-500">{industry.clients} Clients</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/industries"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-[0.9375rem] font-semibold shadow-lg hover:scale-105"
              >
                Explore All Industries
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-t border-white/10 py-16 md:py-24 relative overflow-hidden">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="EXCELLENCE" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">WHY WORK WITH US</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-16 text-center leading-[1.3]">
              What Makes Us Different
            </h2>

            {/* BentoGrid2 - Universal Grid System */}
            <BentoGrid2 
              cards={whyChooseUs.map(reason => ({
                title: reason.title,
                description: reason.description,
                icon: reason.icon
              }))}
              mode="uniform"
              columns={3}
              ariaLabel="Why choose us"
            />
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="border-t border-white/10 py-16 md:py-24 relative overflow-hidden">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="QUESTIONS" 
          className="absolute top-[20%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">PRICING & TERMS</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Common Questions About Our Services
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center" style={{ lineHeight: 1.6 }}>
              Transparent answers to <span className="text-yellow-500 font-semibold">frequently asked questions</span> about pricing and process.
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              {pricingData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glass-card px-6 py-2 rounded-xl border-0">
                  <AccordionTrigger className="text-[0.9375rem] leading-relaxed text-left hover:no-underline py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[0.8125rem] text-gray-400 leading-relaxed pb-6" style={{ lineHeight: 1.6 }}>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">Ready to Discuss Your Project?</h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
              Schedule a <span className="text-yellow-500 font-semibold">free consultation</span> to discuss your needs and get a detailed proposal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold shadow-xl hover:shadow-yellow-500/50 hover:scale-105"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+919669988666"
                className="glass-card px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold hover:scale-105"
              >
                Call: +91 966-998-8666
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
