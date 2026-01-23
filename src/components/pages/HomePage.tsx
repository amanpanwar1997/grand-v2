import { Link } from 'react-router-dom';
import { ArrowRight, Star, Phone, Mail, MapPin, CheckCircle, Target, Zap, Users, TrendingUp, Award, BarChart3, Shield, Clock, Sparkles, Rocket, Globe, MessageSquare, Play, Trophy, Brain, Lightbulb, LineChart, Gauge, HeartHandshake, Lock, FileCheck, Timer, ChartBar, Search, Megaphone, Tv, Radio, Package, Aperture, Film, Newspaper, Users2, Building2, Vote, MapPinned, Eye, Wifi, Settings, Monitor, Briefcase, Palette, Code, Layers, Boxes, Share2, Laptop, Server, Camera, Heart, GraduationCap, Home, ShoppingCart, Cpu, DollarSign, Hotel, Car, Shirt, Scale, Factory, Utensils } from 'lucide-react';
import { useState } from 'react';
import { AutoCarousel } from '../ui/AutoCarousel';
import { BentoGrid2 } from '../layout/BentoGrid2';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { AnimatedSection } from '../ui/AnimatedSection';
import { OutlinedText } from '../ui/OutlinedText';
import { TextReveal } from '../ui/TextReveal';
import { TextScramble } from '../ui/TextScramble';
import { CountUpNumber } from '../ui/CountUpNumber';
import { MagneticButton } from '../ui/MagneticButton';
import { VideoBackground } from '../ui/VideoBackground';
import { useSEO, StructuredData, organizationSchema, localBusinessSchema, websiteSchema } from '../../utils/seo-system';

export function HomePage() {
  const seo = useSEO(); // Auto-loads SEO from centralized config
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  // Quick Facts for Hero
  const quickFacts = [
    { label: '96+ Clients Served' },
    { label: '100+ Brands Managed' },
    { label: '7+ Years of Expertise' },
    { label: '74+ Campaigns Delivered' },
  ];

  // Core Services - 14 services with proper icons
  const coreServices = [
    {
      title: 'Digital Marketing',
      description: 'SEO, SEM, SMM, Email & Content Marketing. Complete digital ecosystems powered by data.',
      icon: Rocket,
      link: '/services/digital-marketing',
    },
    {
      title: 'Advertising',
      description: 'Google, Meta, YouTube, LinkedIn Ads. Multi-channel campaigns with full transparency.',
      icon: Megaphone,
      link: '/services/advertising',
    },
    {
      title: 'Branding & Strategy',
      description: 'Brand positioning, design, identity systems, and messaging frameworks that resonate.',
      icon: Sparkles,
      link: '/services/branding',
    },
    {
      title: 'BTL Activations',
      description: 'Events, exhibitions, retail promotions, and experiential marketing that creates impact.',
      icon: Users2,
      link: '/services/btl-activations',
    },
    {
      title: 'OOH Advertising',
      description: 'Billboards, transit, airport, mall media - visibility where your audience lives.',
      icon: MapPinned,
      link: '/services/ooh-advertising',
    },
    {
      title: 'Website & App Development',
      description: 'UI/UX, E-commerce, Mobile Apps - fast, responsive, conversion-optimized platforms.',
      icon: Monitor,
      link: '/services/website-development',
    },
    {
      title: 'Software Development',
      description: 'CRM, ERP, SaaS, Automation - custom solutions that scale with your business.',
      icon: Code,
      link: '/services/software-development',
    },
    {
      title: 'Public Relations',
      description: 'Media outreach, press coverage, influencer collaborations that build credibility.',
      icon: MessageSquare,
      link: '/services/public-relations',
    },
    {
      title: 'Political Campaigns',
      description: 'Targeted digital advocacy, sentiment mapping, voter analysis with real-time dashboards.',
      icon: Vote,
      link: '/services/political-campaigns',
    },
    {
      title: 'Product Marketing',
      description: 'Launch planning, go-to-market strategy, omnichannel execution for product success.',
      icon: Package,
      link: '/services/product-marketing',
    },
    {
      title: 'Graphic Design',
      description: 'Social media, campaigns, print - professional designs aligned with brand guidelines.',
      icon: Palette,
      link: '/services/graphic-design',
    },
    {
      title: 'Media Production',
      description: 'Video production, photography, drone shoots - cinematic brand storytelling.',
      icon: Camera,
      link: '/services/media-production',
    },
  ];

  // Why We're Different - 6 principles
  const differentiators = [
    {
      icon: FileCheck,
      title: 'Transparent Pricing & Reports',
      description: 'Clear scope, fixed pricing, detailed monthly reports. You know exactly where every rupee goes.',
    },
    {
      icon: Shield,
      title: 'No Exaggerated Claims',
      description: 'We set realistic expectations. SEO takes 3-6 months. Paid ads need testing. No overnight miracles.',
    },
    {
      icon: Clock,
      title: 'Honest Timelines & Measurable KPIs',
      description: 'Proper project timelines with clear milestones. Data-driven KPIs that matter to your business.',
    },
    {
      icon: Award,
      title: '98% Client Retention',
      description: 'Most clients stay for years because we deliver consistent value and honest communication.',
    },
    {
      icon: Users,
      title: 'Weekly Communication & Full Accountability',
      description: 'Regular video calls, live dashboards, open dialogue about what is working and what needs work.',
    },
    {
      icon: Target,
      title: 'Results-First Mindset',
      description: 'We focus on metrics that drive business growth - leads, conversions, revenue, not vanity stats.',
    },
  ];

  // Digital Marketing Deep Dive
  const digitalMarketingServices = [
    {
      icon: Search,
      title: 'SEO (On-page, Off-page, Technical)',
      description: '3-6 months to show results. Content optimization, link building, technical audits.',
    },
    {
      icon: MapPin,
      title: 'Google My Business Optimization',
      description: 'Local visibility on Google Maps. Real photos, reviews, regular updates for store visits.',
    },
    {
      icon: Target,
      title: 'Google Ads & Display Network',
      description: 'Keyword planning, A/B testing, tracked clicks. Every rupee accounted for.',
    },
    {
      icon: Share2,
      title: 'Meta & LinkedIn Campaigns',
      description: 'Targeted social media advertising with continuous optimization for better performance.',
    },
    {
      icon: Mail,
      title: 'Email Marketing Automation',
      description: 'Nurture campaigns, drip sequences, segmented lists for higher engagement.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Performance Reports',
      description: 'Monthly dashboards showing traffic, conversions, ROI with actionable insights.',
    },
  ];

  // OOH Advertising Details
  const oohServices = [
    {
      icon: Building2,
      title: 'Billboards & Hoardings',
      description: 'Strategic placements in high-traffic areas with geo-mapping visibility reports.',
    },
    {
      icon: Tv,
      title: 'Transit Media',
      description: 'Bus wraps, metro ads, cab branding - mobile impressions across the city.',
    },
    {
      icon: Globe,
      title: 'Airport Branding',
      description: 'Premium visibility at airports targeting travelers and business audiences.',
    },
    {
      icon: Boxes,
      title: 'Mall & Retail Media',
      description: 'Shopping center displays, kiosks, in-store branding for retail traffic.',
    },
  ];

  // BTL Activations Examples
  const btlActivations = [
    {
      icon: Users2,
      title: 'Mall & Retail Activations',
      description: 'Product sampling, demos, pop-up stores with measurable lead capture.',
    },
    {
      icon: Trophy,
      title: 'Campus & Roadshows',
      description: 'College tours, city roadshows, mobile brand experiences.',
    },
    {
      icon: Building2,
      title: 'Trade Exhibitions',
      description: 'Booth design, staffing, lead collection with post-event analytics.',
    },
    {
      icon: Boxes,
      title: 'Society-Level Branding',
      description: 'Residential complex activations, community engagement programs.',
    },
  ];

  // Tools & Technologies
  const tools = [
    'Google Analytics 4',
    'Search Console',
    'SEMrush',
    'Ahrefs',
    'HubSpot',
    'Meta Business Suite',
    'Google Ads',
    'Adobe Creative Cloud',
    'WordPress',
    'Shopify Plus',
    'AWS Cloud',
    'MongoDB',
    'Firebase',
    'Mailchimp',
    'Zapier',
    'Tableau',
    'Salesforce',
    'Hotjar',
    'Node.js',
  ];

  // Industries Served
  const industries = [
    { name: 'Healthcare', icon: Heart },
    { name: 'Technology', icon: Cpu },
    { name: 'Real Estate', icon: Home },
    { name: 'E-Commerce', icon: ShoppingCart },
    { name: 'Education', icon: GraduationCap },
    { name: 'Finance', icon: DollarSign },
    { name: 'Hospitality', icon: Hotel },
    { name: 'Automotive', icon: Car },
    { name: 'Fashion', icon: Shirt },
    { name: 'F&B', icon: Utensils },
    { name: 'Legal', icon: Scale },
    { name: 'Manufacturing', icon: Factory },
  ];

  // Process Steps
  const processSteps = [
    {
      step: '01',
      icon: Search,
      title: 'Discovery & Research',
      description: 'Understanding goals, audience, and competition.',
      duration: '5-7 Days',
    },
    {
      step: '02',
      icon: FileCheck,
      title: 'Strategy & Planning',
      description: 'Roadmap, timelines, and KPIs with transparent pricing.',
      duration: '7-10 Days',
    },
    {
      step: '03',
      icon: Lightbulb,
      title: 'Creative Production',
      description: 'Design, copy, and content. Quality takes time.',
      duration: '10-15 Days',
    },
    {
      step: '04',
      icon: Rocket,
      title: 'Campaign Execution',
      description: 'Testing, optimization, and gradual scaling.',
      duration: '3-5 Days',
    },
    {
      step: '05',
      icon: TrendingUp,
      title: 'Analysis & Improvement',
      description: 'Weekly analysis and continuous optimization.',
      duration: 'Ongoing',
    },
  ];

  // Real Success Metrics
  const successMetrics = [
    {
      metric: '300% Inquiry Growth',
      industry: 'Healthcare',
      description: 'GMB optimization + content marketing over 8 months',
    },
    {
      metric: '250% Organic Traffic',
      industry: 'Fashion',
      description: 'SEO campaign with consistent monthly growth',
    },
    {
      metric: '180% ROAS Improvement',
      industry: 'Real Estate',
      description: 'Google Ads testing and refinement over 3 months',
    },
    {
      metric: '98% Client Retention',
      industry: 'All Industries',
      description: 'Long-term partnerships built on trust and results',
    },
  ];

  // Client Testimonials
  const testimonials = [
    {
      quote: 'Their GMB optimization alone increased our clinic footfall by 200%. Worth every rupee.',
      name: 'Dr. Sneha Jain',
      title: 'Prime Healthcare',
      result: '200% Footfall Increase',
      rating: 5,
    },
    {
      quote: 'OOH + Digital combo worked wonders for our retail brand. Strategic visibility everywhere.',
      name: 'Priya Sharma',
      title: 'Fashion Hub',
      result: 'Strong Brand Recall',
      rating: 5,
    },
    {
      quote: 'Honest, data-driven, and dependable. Best agency we have worked with.',
      name: 'Amit Patel',
      title: 'Real Estate Pro',
      result: '180% ROAS',
      rating: 5,
    },
    {
      quote: 'Transparent pricing and weekly updates. We always know what is happening with our campaigns.',
      name: 'Vikram Singh',
      title: 'TechStart Solutions',
      result: 'Complete Transparency',
      rating: 5,
    },
  ];

  return (
    <div className="relative">
      {/* ⚠️ REMOVED bg-black - Using body background with grid pattern */}
      {/* SEO Meta Tags - Auto-loaded from centralized config */}
      <SEOHeadSSG {...seo.meta} />
      
      {/* Structured Data */}
      <StructuredData schema={[organizationSchema, localBusinessSchema, websiteSchema]} />
      

      
      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Video Background - Professional & Safe
            Note: Place your video file in /public/videos/hero-video.mp4
            If video fails to load, component gracefully falls back to solid black background. */}
        <VideoBackground 
          src="/videos/hero-video.mp4"
          overlayOpacity={0.7}
          startTime={9}
        />
        
        <div className="max-w-6xl mx-auto text-center w-full relative z-10">
          {/* Badge */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 text-white" fill="currentColor" />
              <span className="text-[0.8125rem] font-medium uppercase tracking-wide text-yellow-500">Indore's Most Transparent Agency</span>
            </div>
          </AnimatedSection>

          {/* H1 - SEO Optimized (hidden, using seo.h1) */}
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <h1 className="text-[30px] md:text-[42px] font-medium tracking-tight mb-6 leading-[1.3]">
              {seo.h1}
            </h1>
          </AnimatedSection>

          {/* Hindi Tagline - H2 */}
          <AnimatedSection animation="fadeInUp" delay={0.25}>
            <h2 className="text-[20px] md:text-[22px] font-bold text-[var(--muted-foreground)] mb-6 leading-[1.3]">
              Duniya Brands Ke Peeche, Aur Brands Marketing Aur Advertising Ke!
            </h2>
          </AnimatedSection>

          {/* Subtext */}
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <p className="text-[0.9375rem] leading-relaxed text-[var(--muted-foreground)] max-w-4xl mx-auto mb-10" style={{ lineHeight: 1.6 }}>
              The world chases brands - but the smartest brands chase strategy.
            </p>
          </AnimatedSection>
          
          {/* Quick Facts */}
          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
              {quickFacts.map((fact, index) => (
                <div key={index} className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-[0.8125rem] text-[var(--muted-foreground)]">{fact.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* CTAs - Enhanced with Magnetic Buttons */}
          <AnimatedSection animation="fadeInUp" delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <MagneticButton href="/contact" strength={0.3}>
                <span className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-[0.9375rem] font-semibold shadow-2xl">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </span>
              </MagneticButton>
              <MagneticButton href="/services" strength={0.2}>
                <span className="glass-yellow px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-[0.9375rem] font-semibold">
                  Explore Our Services
                  <ArrowRight className="w-5 h-5" />
                </span>
              </MagneticButton>
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection animation="fadeInUp" delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <a href="tel:+919669988666" className="flex items-center gap-2 text-[0.8125rem] text-[var(--muted-foreground)] hover:text-yellow-500 transition-colors">
                <Phone className="w-4 h-4" />
                +91 966-998-8666
              </a>
              <a href="mailto:inchtomilez@gmail.com" className="flex items-center gap-2 text-[0.8125rem] text-[var(--muted-foreground)] hover:text-yellow-500 transition-colors">
                <Mail className="w-4 h-4" />
                inchtomilez@gmail.com
              </a>
              <div className="flex items-center gap-2 text-[0.8125rem] text-[var(--muted-foreground)]">
                <MapPin className="w-4 h-4" />
                Indore, Madhya Pradesh, India
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. Who We Are - V4.0 3D PARALLAX ENHANCED */}
      <section className="min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden" style={{ perspective: '1000px' }}>
        {/* 3D MULTI-LAYER DEPTH - Background to Foreground */}
        
        {/* Background Layer: Far depth with blur */}
        <OutlinedText 
          text="INNOVATION" 
          className="absolute top-[12%] left-0 text-[11rem] md:text-[15rem] pointer-events-none z-[1]"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
          // 🌊 3D ENHANCEMENTS
          zDepth={-300}          // Far background
          depthBlur={4}          // Heavy blur (depth of field)
          depthScale={0.8}       // Smaller (farther away)
          opacity={0.08}         // Extra subtle
        />
        
        {/* Midground Layer: Moderate depth with rotation */}
        <OutlinedText 
          text="EXPERTISE" 
          className="absolute top-[38%] right-0 text-[10rem] md:text-[14rem] pointer-events-none z-[1]"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
          // 🌊 3D ENHANCEMENTS
          zDepth={-150}          // Background
          depthBlur={2}          // Slight blur
          depthScale={0.9}       // Slightly smaller
          rotateOnScroll={true}  // 3D rotation!
          rotateAxis="y"         // Vertical flip
          rotateAmount={10}      // Moderate rotation
        />
        
        {/* Foreground Layer: Close depth with mouse tilt */}
        <OutlinedText 
          text="TRUST" 
          className="absolute top-[64%] left-0 text-[9rem] md:text-[13rem] pointer-events-none z-[1]"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
          // 🌊 3D ENHANCEMENTS
          zDepth={200}           // Foreground
          depthBlur={0}          // Sharp (no blur)
          depthScale={1.1}       // Larger (closer)
          mouseTilt={true}       // Interactive tilt!
          tiltAmount={12}        // Moderate tilt
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-8 leading-[1.3]">
                Who We Are
              </h2>
              
              {/* Main Statement */}
              <div className="glass-strong p-8 md:p-12 rounded-2xl mb-10">
                <p className="text-[1.125rem] md:text-[1.25rem] leading-relaxed text-[var(--foreground)] font-semibold mb-6" style={{ lineHeight: 1.6 }}>
                  We don't sell illusions — we deliver results with data, creativity, and integrity.
                </p>
                <p className="text-[0.9375rem] leading-relaxed text-[var(--muted-foreground)]" style={{ lineHeight: 1.7 }}>
                  Inchtomilez is not another agency where you compare quotes and settle for mediocrity. We're a team of digital strategists, creative minds, and growth hackers who transform ambitious ideas into measurable success stories.
                </p>
              </div>

              {/* Value Props Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="glass p-6 rounded-xl hover:glass-yellow transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Target className="text-yellow-500 icon-md" />
                  </div>
                  <h3 className="text-[1.125rem] font-medium mb-3 text-[var(--foreground)]">Results-Driven</h3>
                  <p className="text-[0.875rem] text-[var(--muted-foreground)] leading-relaxed">
                    Every campaign is designed to hit your KPIs. No vanity metrics, just real business growth.
                  </p>
                </div>

                <div className="glass p-6 rounded-xl hover:glass-yellow transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Shield className="text-yellow-500 icon-md" />
                  </div>
                  <h3 className="text-[1.125rem] font-medium mb-3 text-[var(--foreground)]">100% Transparent</h3>
                  <p className="text-[0.875rem] text-[var(--muted-foreground)] leading-relaxed">
                    Real-time dashboards, detailed reports, and honest conversations about what works.
                  </p>
                </div>

                <div className="glass p-6 rounded-xl hover:glass-yellow transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Sparkles className="text-yellow-500 icon-md" />
                  </div>
                  <h3 className="text-[1.125rem] font-medium mb-3 text-[var(--foreground)]">Premium Quality</h3>
                  <p className="text-[0.875rem] text-[var(--muted-foreground)] leading-relaxed">
                    Ask for samples. Review our portfolio. You'll see why clients choose us over competitors.
                  </p>
                </div>
              </div>

              {/* Our Approach */}
              <div className="glass p-8 rounded-xl mb-10">
                <h3 className="text-[1.125rem] font-medium mb-6 text-[var(--foreground)]">Our Approach</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Data-Backed Strategies</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">Every decision is supported by analytics, market research, and proven frameworks.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Creative Excellence</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">Award-winning designs and campaigns that capture attention and convert.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Agile Execution</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">Fast iterations, continuous optimization, and rapid adaptation to market changes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Long-Term Partnership</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">We grow with you, scaling strategies as your business expands.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                  Learn Our Story
                  <ArrowRight className="icon-xs" />
                </Link>
                <Link to="/contact" className="px-6 py-3 bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border)] rounded-xl transition-colors inline-flex items-center gap-2 text-[0.9375rem] font-semibold">
                  <Mail className="icon-xs" />
                  Request Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Philosophy - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="STRATEGY" 
          className="absolute top-[10%] left-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.3}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="GROWTH" 
          className="absolute top-[36%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.5}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="SUCCESS" 
          className="absolute top-[62%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.7}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="glass-strong p-8 md:p-12 rounded-2xl text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full mb-6">
                <Lightbulb className="w-4 h-4" />
                <span className="text-[0.8125rem] font-semibold uppercase tracking-wide">Our Philosophy</span>
              </div>
              
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">
                Duniya Brands Ke Peeche,<br />
                Aur Brands Marketing Aur Advertising Ke!
              </h2>
              
              <p className="text-[0.9375rem] leading-relaxed text-[var(--muted-foreground)] max-w-3xl mx-auto mb-6" style={{ lineHeight: 1.6 }}>
                We believe great brands are not built by chance - they are built by <span className="text-yellow-500 font-semibold">strategy, communication, and consistency</span>.
              </p>
              
              <p className="text-[0.9375rem] leading-relaxed text-[var(--foreground)] font-semibold text-lg max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
                Our purpose is simple: help your business grow inch by inch until it becomes a mile of success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why We're Different - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="TRANSPARENT" 
          className="absolute top-[8%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="HONEST" 
          className="absolute top-[34%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="RELIABLE" 
          className="absolute top-[60%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.6}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-[0.8125rem] font-semibold uppercase tracking-wide">Why Choose Us</span>
              </div>
              
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">
                Why We Are Different
              </h2>
              
              <p className="text-[0.9375rem] font-normal leading-relaxed text-[var(--muted-foreground)] max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
                We are not another agency making promises. We are <span className="text-yellow-500 font-semibold">partners in your success</span>.
              </p>
            </div>

            {/* Main Differentiators Carousel */}
            <div className="mb-12">
              <AutoCarousel
                items={differentiators.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="glass-card p-6 rounded-2xl min-w-[320px] md:min-w-[380px] h-full flex flex-col gap-4"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-yellow-500" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-[18px] md:text-[18px] font-medium text-white leading-[1.4]">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-[15px] md:text-[15px] font-normal text-gray-400 leading-relaxed flex-1" style={{ lineHeight: 1.6 }}>
                        {item.description}
                      </p>
                      
                      {/* Bottom Badge */}
                      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                        <CheckCircle className="w-4 h-4 text-yellow-500" />
                        <span className="text-[13px] md:text-[13px] font-medium text-yellow-500">
                          Guaranteed
                        </span>
                      </div>
                    </div>
                  );
                })}
                speed={30}
                direction="left"
                pauseOnHover={true}
              />
            </div>

            {/* Trust Metrics Carousel - Faster Speed */}
            <div className="mb-12">
              <p className="text-[13px] md:text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
                Built on Trust & Transparency
              </p>
              
              <AutoCarousel
                items={[
                  { icon: Award, metric: '98%', label: 'Client Retention Rate' },
                  { icon: Star, metric: '4.9/5', label: 'Average Client Rating' },
                  { icon: Users, metric: '96+', label: 'Clients Served' },
                  { icon: Trophy, metric: '74+', label: 'Campaigns Delivered' },
                  { icon: Clock, metric: '7+', label: 'Years of Excellence' },
                  { icon: Target, metric: '100+', label: 'Brands Managed' },
                  { icon: TrendingUp, metric: '300%', label: 'Avg. ROI Growth' },
                  { icon: Zap, metric: '24/7', label: 'Support Available' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="glass-strong p-6 rounded-xl min-w-[240px] md:min-w-[280px] flex items-center gap-4 border border-white/5 hover:border-yellow-500/30 transition-colors"
                    >
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-yellow-500" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col gap-1">
                        <div className="text-[24px] md:text-[24px] font-bold text-white">
                          {item.metric}
                        </div>
                        <div className="text-[13px] md:text-[13px] font-normal text-gray-400">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
                speed={40}
                direction="right"
                pauseOnHover={true}
              />
            </div>

            {/* Core Values Carousel - Slowest for Reading */}
            <div>
              <p className="text-[13px] md:text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
                Our Core Principles
              </p>
              
              <AutoCarousel
                items={[
                  { icon: Shield, title: 'Transparency First', text: 'Every strategy, every rupee, fully visible' },
                  { icon: HeartHandshake, title: 'Partnership Mindset', text: 'Your success is our success' },
                  { icon: Target, title: 'Results-Driven', text: 'Metrics that matter to your business' },
                  { icon: Lock, title: 'Data Security', text: 'Bank-grade protection for your data' },
                  { icon: FileCheck, title: 'Clear Contracts', text: 'No hidden clauses or surprises' },
                  { icon: Timer, title: 'Realistic Timelines', text: 'Honest expectations, achievable goals' },
                  { icon: ChartBar, title: 'Regular Reporting', text: 'Weekly updates, monthly deep dives' },
                  { icon: Lightbulb, title: 'Innovation Ready', text: 'Latest tools and strategies' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="glass-yellow p-6 rounded-xl min-w-[280px] md:min-w-[340px] flex gap-4 border border-yellow-500/20"
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-black" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-[16px] md:text-[16px] font-medium text-white">
                          {item.title}
                        </h4>
                        <p className="text-[14px] md:text-[14px] font-normal text-gray-300" style={{ lineHeight: 1.5 }}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
                speed={25}
                direction="left"
                pauseOnHover={true}
              />
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <MagneticButton>
                <Link 
                  to="/about"
                  className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-full text-[15px] md:text-[15px] font-semibold hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Core Expertise - CORRECTED V3.1 - EDGE POSITIONED + AMBIENT LIGHTING */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden ambient-yellow">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="SOLUTIONS" 
          className="absolute top-[10%] left-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="INNOVATION" 
          className="absolute top-[36%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="EXCELLENCE" 
          className="absolute top-[62%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">COMPREHENSIVE SOLUTIONS</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              <TextScramble 
                text="One Agency. Infinite Possibilities."
                speed={1.5}
                delay={200}
                triggerOnView={true}
              />
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              We unify every vertical of modern marketing under one roof — from <span className="text-yellow-500 font-semibold">digital to physical, strategy to execution</span>.
            </p>

            <BentoGrid2 
              cards={coreServices.map(service => ({
                title: service.title,
                description: service.description,
                icon: service.icon,
                link: service.link
              }))}
              mode="asymmetric"
              showBadges={true}
              showStats={true}
              ariaLabel="Our core services"
            />

            <div className="mt-12 text-center">
              <Link
                to="/services"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-[0.9375rem] font-semibold shadow-lg hover:scale-105"
              >
                View All Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Digital Marketing - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="DIGITAL" 
          className="absolute top-[8%] left-0 text-[12rem] md:text-[16rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="SEO" 
          className="absolute top-[34%] right-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="PERFORMANCE" 
          className="absolute top-[60%] left-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.6}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">DIGITAL ECOSYSTEM</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Digital Marketing That Builds Brands
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Our digital ecosystem covers everything from <span className="text-yellow-500 font-semibold">SEO optimization to paid performance marketing</span>. 
              We do not just drive traffic - we drive trust.
            </p>

            <BentoGrid2 
              cards={digitalMarketingServices.map(service => ({
                title: service.title,
                description: service.description,
                icon: service.icon,
              }))}
              mode="asymmetric"
              showBadges={false}
              showStats={false}
              ariaLabel="Digital marketing services"
            />
          </div>
        </div>
      </section>

      {/* 7. Google My Business - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="LOCAL" 
          className="absolute top-[10%] left-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="VISIBILITY" 
          className="absolute top-[36%] right-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="SEARCH" 
          className="absolute top-[62%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12 text-center relative z-10">
              <MapPin className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
              
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">
                Google My Business & Local Dominance
              </h2>
              
              <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                For local visibility, we make your brand <span className="text-yellow-500 font-semibold">unmissable on Google Maps and search</span>.
              </p>
              
              <p className="text-[0.9375rem] leading-relaxed text-gray-300" style={{ lineHeight: 1.6 }}>
                We optimize your Google Business Profile with real photos, reviews, keywords, and regular updates - 
                <span className="text-yellow-500 font-semibold"> turning searches into store visits</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Google Ads - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="ADVERTISING" 
          className="absolute top-[8%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.3}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="CAMPAIGNS" 
          className="absolute top-[34%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.5}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="RESULTS" 
          className="absolute top-[60%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.7}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 text-center leading-[1.3]">
              Google Ads & Paid Campaigns
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              We manage everything from keyword planning to A/B tested ad creatives. 
              <span className="text-yellow-500 font-semibold"> Every click is tracked. Every rupee is accounted for.</span>
            </p>
            
            <p className="text-[0.9375rem] leading-relaxed text-white font-semibold text-center mb-12">
              Your ROI is our primary metric.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <Target className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Search Ads</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Intent-driven traffic from users actively searching for your solutions.</p>
              </div>
              
              <div className="glass-card p-6">
                <Eye className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Display & Discovery</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Visual reach across Google network with targeted audience segments.</p>
              </div>
              
              <div className="glass-card p-6">
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Performance Max</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">AI-powered campaigns across all Google channels for maximum impact.</p>
              </div>
              
              <div className="glass-card p-6">
                <Play className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">YouTube Video Ads</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Engaging video content that captures attention and drives action.</p>
              </div>
              
              <div className="glass-card p-6">
                <Users className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Retargeting & Remarketing</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Re-engage visitors who showed interest but did not convert yet.</p>
              </div>
              
              <div className="glass-card p-6">
                <BarChart3 className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Analytics & Optimization</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Continuous testing and refinement based on performance data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SEO & Webmaster - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="OPTIMIZATION" 
          className="absolute top-[10%] left-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="SEARCH" 
          className="absolute top-[36%] right-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="SEO" 
          className="absolute top-[62%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Search className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
            
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">
              SEO & Webmaster Tools Management
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8" style={{ lineHeight: 1.6 }}>
              We ensure your website is <span className="text-yellow-500 font-semibold">technically perfect</span> - fast, crawlable, and indexed correctly.
            </p>

            <div className="glass-card p-8 text-left">
              <h3 className="text-[1.375rem] font-medium mb-6 leading-[1.4]">Our Toolkit Includes:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Google Search Console (Webmaster Tools)</p>
                    <p className="text-[0.8125rem] text-gray-400">Monitor indexing, fix crawl errors, optimize search performance</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Bing Webmaster</p>
                    <p className="text-[0.8125rem] text-gray-400">Additional search visibility on Microsoft network</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">SEMrush / Ahrefs</p>
                    <p className="text-[0.8125rem] text-gray-400">Keyword research, competitor analysis, backlink audits</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Site Speed & Schema Optimization</p>
                    <p className="text-[0.8125rem] text-gray-400">Technical SEO for faster load times and better rankings</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Monthly SEO Health Reports</p>
                    <p className="text-[0.8125rem] text-gray-400">Transparent reporting on rankings, traffic, and opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Social Media - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="SOCIAL" 
          className="absolute top-[10%] left-0 text-[12rem] md:text-[16rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.3}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="CONTENT" 
          className="absolute top-[36%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.5}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="ENGAGEMENT" 
          className="absolute top-[62%] left-0 text-[7rem] md:text-[11rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.7}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <Share2 className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
            
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">
              Social Media Marketing
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              <span className="text-yellow-500 font-semibold">Creative storytelling meets analytics.</span> 
              From reels and carousels to paid campaigns, we manage your entire social presence with clarity and consistency.
            </p>

            <div className="inline-block glass-card p-6 mb-12">
              <h3 className="text-[1.375rem] font-medium mb-4 leading-[1.4]">Platforms We Master:</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-[0.8125rem] font-semibold">Instagram</span>
                <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-[0.8125rem] font-semibold">Facebook</span>
                <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-[0.8125rem] font-semibold">LinkedIn</span>
                <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-[0.8125rem] font-semibold">YouTube</span>
                <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-[0.8125rem] font-semibold">X (Twitter)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. OOH Advertising - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="OUTDOOR" 
          className="absolute top-[8%] left-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="VISIBILITY" 
          className="absolute top-[34%] right-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="OOH" 
          className="absolute top-[60%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">OUT-OF-HOME ADVERTISING</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              OOH Advertising - Visibility That Lasts
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Billboards, hoardings, transit media, airport screens, and mall branding - 
              <span className="text-yellow-500 font-semibold"> we plan, place, and monitor every outdoor impression</span> using data-driven heatmaps.
            </p>

            <BentoGrid2 
              cards={oohServices.map(service => ({
                title: service.title,
                description: service.description,
                icon: service.icon,
              }))}
              mode="uniform"
              columns={4}
              ariaLabel="OOH advertising services"
            />

            <div className="mt-12">
              <div className="glass-strong p-8 rounded-2xl">
                <h3 className="text-[1.375rem] font-medium mb-6 text-center leading-[1.4]">OOH Analytics We Provide:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold mb-2">Geo-mapping Visibility Reports</p>
                    <p className="text-[0.8125rem] text-gray-400">See exactly where your ads are placed and their reach</p>
                  </div>
                  
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold mb-2">ROI & Footfall Estimates</p>
                    <p className="text-[0.8125rem] text-gray-400">Data-driven estimates of impressions and impact</p>
                  </div>
                  
                  <div className="text-center">
                    <Settings className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold mb-2">Dynamic Campaign Adjustments</p>
                    <p className="text-[0.8125rem] text-gray-400">Optimize placements based on performance data</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/services/ooh-advertising"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-[0.9375rem] font-semibold shadow-lg hover:scale-105"
              >
                Learn More About OOH
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BTL Activations - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="EXPERIENTIAL" 
          className="absolute top-[10%] left-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="EVENTS" 
          className="absolute top-[36%] right-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="ACTIVATION" 
          className="absolute top-[62%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">EXPERIENTIAL MARKETING</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              BTL Activations - Real-World Brand Engagement
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Bring your brand to life through <span className="text-yellow-500 font-semibold">experiential marketing</span>. 
              Each campaign is fully measurable with lead capture & post-event analytics.
            </p>

            <BentoGrid2 
              cards={btlActivations.map(activation => ({
                title: activation.title,
                description: activation.description,
                icon: activation.icon,
              }))}
              mode="uniform"
              columns={4}
              ariaLabel="BTL activation services"
            />

            <div className="mt-12 text-center">
              <Link
                to="/services/btl-activations"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-[0.9375rem] font-semibold shadow-lg hover:scale-105"
              >
                Explore BTL Activations
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Website & Software Development - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="DEVELOPMENT" 
          className="absolute top-[8%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="TECHNOLOGY" 
          className="absolute top-[34%] right-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="DIGITAL" 
          className="absolute top-[60%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.6}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Website & App Development */}
              <div className="glass-card p-8">
                <Monitor className="w-12 h-12 text-yellow-500 mb-6" />
                <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Website & App Development</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                  Fast, functional, <span className="text-yellow-500 font-semibold">conversion-optimized web ecosystems</span>.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  From corporate websites to e-commerce and app development - we build with design precision and SEO intelligence.
                </p>
                <Link
                  to="/services/website-development"
                  className="inline-flex items-center gap-2 text-[0.8125rem] text-yellow-500 hover:text-yellow-400 font-semibold transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Software & Automation */}
              <div className="glass-card p-8">
                <Code className="w-12 h-12 text-yellow-500 mb-6" />
                <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Software & Automation</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                  Custom software, dashboards, and <span className="text-yellow-500 font-semibold">CRMs that simplify workflows</span>.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  We automate routine tasks and deliver smarter scalability for growing businesses.
                </p>
                <Link
                  to="/services/software-development"
                  className="inline-flex items-center gap-2 text-[0.8125rem] text-yellow-500 hover:text-yellow-400 font-semibold transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Media Production & PR - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="MEDIA" 
          className="absolute top-[10%] left-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="CREATIVE" 
          className="absolute top-[36%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="PRODUCTION" 
          className="absolute top-[62%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Media Production */}
              <div className="glass-card p-8">
                <Camera className="w-12 h-12 text-yellow-500 mb-6" />
                <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Media Production & Creative Design</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                  From product shoots to <span className="text-yellow-500 font-semibold">cinematic brand films</span>, 
                  we handle the full creative process.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  Content that tells stories - not just fills space.
                </p>
                <Link
                  to="/services/media-production"
                  className="inline-flex items-center gap-2 text-[0.8125rem] text-yellow-500 hover:text-yellow-400 font-semibold transition-colors"
                >
                  View Our Work <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Public Relations */}
              <div className="glass-card p-8">
                <MessageSquare className="w-12 h-12 text-yellow-500 mb-6" />
                <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Public Relations & Influence Management</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                  We help brands <span className="text-yellow-500 font-semibold">earn media coverage</span> and maintain credibility.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  Across print, digital, and influencer ecosystems - building trust that lasts.
                </p>
                <Link
                  to="/services/public-relations"
                  className="inline-flex items-center gap-2 text-[0.8125rem] text-yellow-500 hover:text-yellow-400 font-semibold transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Our Process - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="PROCESS" 
          className="absolute top-[10%] left-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.3}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="METHODOLOGY" 
          className="absolute top-[36%] right-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.5}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="EXECUTION" 
          className="absolute top-[62%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.7}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">OUR METHODOLOGY</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Our Process – How We Work
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              A <span className="text-yellow-500 font-semibold">systematic approach</span> refined over 7 years and 74+ campaigns. 
              Clear steps, realistic timelines.
            </p>

            <BentoGrid2 
              cards={processSteps.map(step => ({
                icon: step.icon,
                number: step.step,
                label: step.title,
                sublabel: step.duration,
                description: step.description
              }))}
              mode="uniform"
              columns={5}
              ariaLabel="Our process steps"
            />
          </div>
        </div>
      </section>

      {/* 16. Industries - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="INDUSTRIES" 
          className="absolute top-[10%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="EXPERTISE" 
          className="absolute top-[36%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="SECTORS" 
          className="absolute top-[62%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">INDUSTRY EXPERTISE</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Industries We Serve
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              <span className="text-yellow-500 font-semibold">Healthcare • Tech • Real Estate • E-Commerce • Education • Finance • Hospitality • F&B • Legal • Manufacturing • Automotive</span>
            </p>

            <BentoGrid2 
              cards={industries.map(industry => ({
                icon: industry.icon,
                label: industry.name,
                sublabel: 'Industry expertise'
              }))}
              mode="uniform"
              columns={4}
              ariaLabel="Industries we serve"
            />

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

      {/* 17. Tools - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 overflow-hidden flex items-center relative">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="TECHNOLOGY" 
          className="absolute top-[8%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="TOOLS" 
          className="absolute top-[34%] right-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="STACK" 
          className="absolute top-[60%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto mb-12 relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">TECHNOLOGY STACK</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Tools We Trust
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              <span className="text-yellow-500 font-semibold">Industry-standard platforms</span> and enterprise-grade tools for maximum performance.
            </p>
          </div>

          <AutoCarousel speed="normal">
            {tools.map((tool, index) => (
              <div key={index} className="glass min-w-[180px] sm:min-w-[220px] flex-shrink-0 text-center snap-center">
                <p className="text-[0.9375rem] leading-relaxed font-medium">{tool}</p>
              </div>
            ))}
          </AutoCarousel>
        </div>
      </section>

      {/* 18. Success Metrics - Pattern: Explosive Launch */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* TRIPLE-LAYER PARALLAX SYSTEM */}
        
        {/* Layer 1: Far Background - Ultra-Slow, Massive */}
        <OutlinedText 
          text="SUCCESS" 
          className="absolute top-[4%] right-[3%] text-[18rem] md:text-[22rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.1}
          rotation={-9}
          delay={0}
        />
        
        {/* Layer 2: Mid Ground - Fast with Heavy Scale */}
        <OutlinedText 
          text="METRICS" 
          className="absolute top-[40%] left-[8%] text-[9rem] md:text-[13rem] pointer-events-none"
          direction="right"
          parallax={true}
          parallaxSpeed={0.85}
          rotation={12}
          scale={true}
          delay={0.1}
        />
        
        {/* Layer 3: Near Foreground - Ultra-Fast, Dynamic */}
        <OutlinedText 
          text="RESULTS" 
          className="absolute bottom-[10%] right-[18%] text-[7rem] md:text-[10rem] pointer-events-none"
          direction="top"
          parallax={true}
          parallaxSpeed={0.95}
          rotation={-6}
          fadeEdges={true}
          delay={0.2}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">PROVEN RESULTS</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Real Numbers, Real Success
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Results from <span className="text-yellow-500 font-semibold">96+ client partnerships</span> representing 
              years of consistent effort and optimization.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successMetrics.map((metric, index) => (
                <div key={index} className="glass-card p-8">
                  <div className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-lg mb-4 text-[0.9375rem] font-semibold">
                    {metric.metric}
                  </div>
                  <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">{metric.industry}</h3>
                  <p className="text-[0.8125rem] text-gray-400 leading-relaxed">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 19. Testimonials - CORRECTED V3.1 - EDGE POSITIONED */}
      <section className="md:min-h-[100vh] py-16 md:py-24 overflow-hidden flex items-center relative">
        {/* ALTERNATING LEFT/RIGHT - POSITIONED AT SCREEN EDGES */}
        
        {/* Text 1: Slides from LEFT edge - Fully visible at left */}
        <OutlinedText 
          text="TESTIMONIALS" 
          className="absolute top-[10%] left-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Fully visible at right */}
        <OutlinedText 
          text="TRUST" 
          className="absolute top-[36%] right-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="right"
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Fully visible at left */}
        <OutlinedText 
          text="REVIEWS" 
          className="absolute top-[62%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto mb-12 relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">CLIENT FEEDBACK</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Client Testimonials
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Honest feedback from <span className="text-yellow-500 font-semibold">real clients</span> about their experience working with us.
            </p>
          </div>

          <AutoCarousel speed="slow">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card min-w-[300px] sm:min-w-[380px] max-w-[420px] flex-shrink-0 snap-center p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6 italic" style={{ lineHeight: 1.6 }}>
                  &quot;{testimonial.quote}&quot;
                </p>
                
                {/* Result badge */}
                <div className="inline-block bg-yellow-500 text-black px-3 py-1.5 rounded-lg mb-4 text-[0.8125rem] font-semibold">
                  {testimonial.result}
                </div>
                
                <div className="pt-4">
                  <p className="text-[0.9375rem] leading-relaxed font-semibold">{testimonial.name}</p>
                  <p className="text-[0.8125rem] text-yellow-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </AutoCarousel>
        </div>
      </section>

      {/* 20. Our Promise - Pattern: Cross Convergence */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* TRIPLE-LAYER PARALLAX SYSTEM */}
        
        {/* Layer 1: Far Background - Medium Diagonal with Fade */}
        <OutlinedText 
          text="PROMISE" 
          className="absolute top-[9%] left-[5%] text-[15rem] md:text-[18rem] pointer-events-none"
          direction="right"
          parallax={true}
          parallaxSpeed={0.35}
          rotation={7}
          fadeEdges={true}
          delay={0}
        />
        
        {/* Layer 2: Mid Ground - Medium Counter Diagonal with Fade */}
        <OutlinedText 
          text="COMMITMENT" 
          className="absolute top-[42%] right-[7%] text-[9rem] md:text-[12rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.5}
          rotation={-8}
          fadeEdges={true}
          delay={0.1}
        />
        
        {/* Layer 3: Near Foreground - Fast Cross with Scale */}
        <OutlinedText 
          text="INTEGRITY" 
          className="absolute bottom-[13%] left-[19%] text-[6rem] md:text-[9rem] pointer-events-none"
          direction="bottom"
          parallax={true}
          parallaxSpeed={0.75}
          rotation={5}
          scale={true}
          delay={0.15}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong p-8 md:p-12 rounded-2xl text-center relative z-10">
              <Shield className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
              
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">
                Our Promise
              </h2>
              
              <p className="text-[0.9375rem] leading-relaxed text-white font-semibold text-lg mb-4" style={{ lineHeight: 1.6 }}>
                We will not promise miracles - only measurable progress.
              </p>
              
              <p className="text-[0.9375rem] leading-relaxed text-gray-300" style={{ lineHeight: 1.6 }}>
                We value <span className="text-yellow-500 font-semibold">long-term success</span> over short-term noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 21. Newsletter - Pattern: Rhythmic Pulse */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* TRIPLE-LAYER PARALLAX SYSTEM */}
        
        {/* Layer 1: Far Background - Medium Left Pulse */}
        <OutlinedText 
          text="INSIGHTS" 
          className="absolute top-[10%] left-[8%] text-[14rem] md:text-[17rem] pointer-events-none"
          direction="right"
          parallax={true}
          parallaxSpeed={0.3}
          rotation={-5}
          scale={true}
          delay={0}
        />
        
        {/* Layer 2: Mid Ground - Medium Right Pulse */}
        <OutlinedText 
          text="TRENDS" 
          className="absolute top-[44%] right-[10%] text-[9rem] md:text-[12rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.5}
          rotation={7}
          scale={true}
          delay={0.1}
        />
        
        {/* Layer 3: Near Foreground - Fast Center Rhythm */}
        <OutlinedText 
          text="KNOWLEDGE" 
          className="absolute bottom-[15%] left-[16%] text-[6rem] md:text-[9rem] pointer-events-none"
          direction="bottom"
          parallax={true}
          parallaxSpeed={0.7}
          rotation={-3}
          fadeEdges={true}
          delay={0.2}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong p-8 md:p-12 rounded-2xl text-center relative z-10">
              <Mail className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
              
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Newsletter - Stay Ahead of the Curve</h2>
              <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
                Get monthly insights, trends, and marketing hacks from the InchToMilez team. 
                <span className="text-yellow-500 font-semibold"> No fluff. No spam. Just growth.</span>
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="flex-1 px-6 py-4 bg-black border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors duration-200 text-[0.9375rem]"
                  required
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl transition-all duration-300 text-[0.9375rem] font-semibold whitespace-nowrap shadow-lg hover:scale-105"
                >
                  Subscribe Now
                </button>
              </form>
              
              <p className="text-[0.8125rem] text-gray-500 mt-4" style={{ lineHeight: 1.6 }}>Unsubscribe anytime. We respect your inbox.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 22. Global Vision - Pattern: Panoramic Sweep */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* TRIPLE-LAYER PARALLAX SYSTEM */}
        
        {/* Layer 1: Far Background - Slow Wide Panorama */}
        <OutlinedText 
          text="GLOBAL" 
          className="absolute top-[8%] right-[5%] text-[16rem] md:text-[20rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.28}
          rotation={6}
          delay={0}
        />
        
        {/* Layer 2: Mid Ground - Medium Counter Sweep */}
        <OutlinedText 
          text="VISION" 
          className="absolute top-[40%] left-[10%] text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          parallax={true}
          parallaxSpeed={0.55}
          rotation={-8}
          scale={true}
          delay={0.1}
        />
        
        {/* Layer 3: Near Foreground - Fast Panoramic */}
        <OutlinedText 
          text="WORLDWIDE" 
          className="absolute bottom-[12%] right-[14%] text-[7rem] md:text-[10rem] pointer-events-none"
          direction="top"
          parallax={true}
          parallaxSpeed={0.75}
          rotation={4}
          fadeEdges={true}
          delay={0.15}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Globe className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
            
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">
              Global Vision - Local Expertise
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-4" style={{ lineHeight: 1.6 }}>
              Born in Indore, growing worldwide.
            </p>
            
            <p className="text-[0.9375rem] leading-relaxed text-white font-semibold text-lg" style={{ lineHeight: 1.6 }}>
              Our goal: make transparent, ethical marketing India's biggest export.
            </p>
          </div>
        </div>
      </section>

      {/* 23. Final CTA - Pattern: Climactic Convergence */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* TRIPLE-LAYER PARALLAX SYSTEM */}
        
        {/* Layer 1: Far Background - Medium Left Dramatic */}
        <OutlinedText 
          text="ACTION" 
          className="absolute top-[10%] left-[5%] text-[15rem] md:text-[19rem] pointer-events-none"
          direction="right"
          parallax={true}
          parallaxSpeed={0.35}
          rotation={10}
          scale={true}
          delay={0}
        />
        
        {/* Layer 2: Mid Ground - Medium Right Converging */}
        <OutlinedText 
          text="GROWTH" 
          className="absolute top-[42%] right-[8%] text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.45}
          rotation={-12}
          scale={true}
          delay={0.1}
        />
        
        {/* Layer 3: Near Foreground - Fast Final Push */}
        <OutlinedText 
          text="BEGIN" 
          className="absolute bottom-[14%] left-[20%] text-[7rem] md:text-[10rem] pointer-events-none"
          direction="bottom"
          parallax={true}
          parallaxSpeed={0.65}
          rotation={8}
          fadeEdges={true}
          delay={0.2}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">Ready to Go from Inch to Mile?</h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
              Let us build your next success story together. 
              <span className="text-yellow-500 font-semibold"> Free consultation. No obligations. Just honest insights.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/contact"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold shadow-xl hover:shadow-yellow-500/50 hover:scale-105"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="glass-card px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold hover:scale-105"
              >
                Explore Services
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <a href="tel:+919669988666" className="flex items-center gap-2 text-[0.9375rem] text-gray-300 hover:text-yellow-500 transition-colors font-semibold">
                <Phone className="w-5 h-5" />
                📞 +91 966-998-8666
              </a>
              <a href="mailto:inchtomilez@gmail.com" className="flex items-center gap-2 text-[0.9375rem] text-gray-300 hover:text-yellow-500 transition-colors font-semibold">
                <Mail className="w-5 h-5" />
                inchtomilez@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
