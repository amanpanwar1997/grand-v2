import { Link } from 'react-router';
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
    { label: 'Founder-Led Agency' },
    { label: 'Indore + Pune Presence' },
    { label: 'Strategy • Creative • Performance' },
    { label: 'Digital • Advertising • Technology' },
  ];

  // Core Services - 14 services with proper icons
  const coreServices = [
    {
      title: 'Digital Marketing',
      description: 'SEO, paid media, social, content and analytics connected around clear business objectives.',
      icon: Rocket,
      link: '/services/digital-marketing',
    },
    {
      title: 'Advertising',
      description: 'Google, Meta, YouTube and LinkedIn campaigns planned, tested and optimized around measurable outcomes.',
      icon: Megaphone,
      link: '/services/advertising',
    },
    {
      title: 'Branding & Strategy',
      description: 'Positioning, identity, messaging and strategic planning that give brands a clear market direction.',
      icon: Sparkles,
      link: '/services/branding',
    },
    {
      title: 'BTL Activations',
      description: 'On-ground activations, exhibitions, retail engagement and experiential campaigns designed for real-world interaction.',
      icon: Users2,
      link: '/services/btl-activations',
    },
    {
      title: 'OOH Advertising',
      description: 'Hoardings, transit, airport and retail media planned around location, audience and campaign context.',
      icon: MapPinned,
      link: '/services/ooh-advertising',
    },
    {
      title: 'Website & App Development',
      description: 'Strategy-led websites, e-commerce and digital products built for speed, usability, visibility and conversion.',
      icon: Monitor,
      link: '/services/website-development',
    },
    {
      title: 'Software Development',
      description: 'Custom dashboards, CRM workflows, automation and business tools designed around real operational needs.',
      icon: Code,
      link: '/services/software-development',
    },
    {
      title: 'Public Relations',
      description: 'Media outreach, brand communications and influence programs designed to build visibility and credibility.',
      icon: MessageSquare,
      link: '/services/public-relations',
    },
    {
      title: 'Political Campaigns',
      description: 'Digital communication, audience strategy, content and campaign coordination for public and political outreach.',
      icon: Vote,
      link: '/services/political-campaigns',
    },
    {
      title: 'Product Marketing',
      description: 'Launch planning, go-to-market strategy, positioning and multi-channel execution for new and growing products.',
      icon: Package,
      link: '/services/product-marketing',
    },
    {
      title: 'Graphic Design',
      description: 'Campaign, social, digital and print design built around consistent brand systems and communication goals.',
      icon: Palette,
      link: '/services/graphic-design',
    },
    {
      title: 'Media Production',
      description: 'Video production, photography, product shoots and short-form content designed for modern brand communication.',
      icon: Camera,
      link: '/services/media-production',
    },
  ];

  // Why We're Different - 6 principles
  const differentiators = [
    {
      icon: Target,
      title: 'Business-First Strategy',
      description: 'We begin with the business objective, audience and market context before recommending channels or campaigns.',
    },
    {
      icon: Layers,
      title: 'Integrated Capabilities',
      description: 'Strategy, creative, media, performance and technology work together instead of operating as separate silos.',
    },
    {
      icon: FileCheck,
      title: 'Clear Scope & Communication',
      description: 'Defined deliverables, practical timelines and straightforward communication keep every engagement aligned.',
    },
    {
      icon: HeartHandshake,
      title: 'Founder-Led Direction',
      description: 'Senior strategic involvement keeps decisions close to the business problem and the quality of execution.',
    },
    {
      icon: ChartBar,
      title: 'Measure. Learn. Improve.',
      description: 'We use meaningful performance signals to understand what is working, what needs refinement and where to scale.',
    },
    {
      icon: Users,
      title: 'Built for Long-Term Partnership',
      description: 'We aim to become an extension of the businesses we work with, not just another vendor completing isolated tasks.',
    },
  ];

  // Digital Marketing Deep Dive
  const digitalMarketingServices = [
    {
      icon: Search,
      title: 'SEO & Organic Search',
      description: 'Technical SEO, on-page optimization, content strategy and authority building for stronger search visibility.',
    },
    {
      icon: MapPin,
      title: 'Google Business Profile & Local Search',
      description: 'Profile optimization, local content, review workflows and visibility improvements for location-led businesses.',
    },
    {
      icon: Target,
      title: 'Google Ads & Paid Search',
      description: 'Intent-led campaign planning, keyword strategy, landing-page alignment, testing and ongoing optimization.',
    },
    {
      icon: Share2,
      title: 'Meta & LinkedIn Campaigns',
      description: 'Audience-led paid social campaigns supported by creative testing, remarketing and performance analysis.',
    },
    {
      icon: Mail,
      title: 'Email & Lifecycle Marketing',
      description: 'Nurture journeys, segmented communication and automation designed around the customer lifecycle.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Performance Intelligence',
      description: 'Reporting that connects traffic, leads, conversions and campaign behavior to practical next steps.',
    },
  ];

  // OOH Advertising Details
  const oohServices = [
    {
      icon: Building2,
      title: 'Billboards & Hoardings',
      description: 'Strategic outdoor placements planned around location, audience movement and campaign visibility.',
    },
    {
      icon: Tv,
      title: 'Transit Media',
      description: 'Bus, cab and mobility-led media formats that extend brand visibility across high-movement routes.',
    },
    {
      icon: Globe,
      title: 'Airport Branding',
      description: 'Premium-format advertising for business and travel audiences in high-attention environments.',
    },
    {
      icon: Boxes,
      title: 'Mall & Retail Media',
      description: 'Retail displays, kiosks and in-store branding designed around footfall and purchase context.',
    },
  ];

  // BTL Activations Examples
  const btlActivations = [
    {
      icon: Users2,
      title: 'Mall & Retail Activations',
      description: 'Product demonstrations, sampling and pop-up experiences designed for direct consumer interaction.',
    },
    {
      icon: Trophy,
      title: 'Campus & Roadshows',
      description: 'On-ground outreach programs that take the brand directly to defined communities and audiences.',
    },
    {
      icon: Building2,
      title: 'Trade Exhibitions',
      description: 'Booth experience, campaign communication and lead capture planned around event objectives.',
    },
    {
      icon: Boxes,
      title: 'Society & Community Activations',
      description: 'Local engagement programs designed for residential communities and hyperlocal audiences.',
    },
  ];

  // Tools & Technologies
  const tools = [
    'Google Analytics 4',
    'Google Search Console',
    'Google Ads',
    'Google Merchant Center',
    'Meta Business Suite',
    'SEMrush',
    'Ahrefs',
    'Adobe Creative Cloud',
    'Figma',
    'WordPress',
    'Shopify',
    'React',
    'Vite',
    'Vercel',
  ];

  // Industries Served
  const industries = [
    { name: 'Healthcare', icon: Heart },
    { name: 'Technology & SaaS', icon: Cpu },
    { name: 'Real Estate', icon: Home },
    { name: 'E-Commerce & Retail', icon: ShoppingCart },
    { name: 'Education', icon: GraduationCap },
    { name: 'FMCG', icon: Package },
    { name: 'Hospitality', icon: Hotel },
    { name: 'Automotive', icon: Car },
    { name: 'Jewellery & Lifestyle', icon: Sparkles },
    { name: 'F&B', icon: Utensils },
    { name: 'Professional Services', icon: Briefcase },
    { name: 'Manufacturing', icon: Factory },
  ];

  // Process Steps
  const processSteps = [
    {
      step: '01',
      icon: Search,
      title: 'Discover',
      description: 'Understand the business, audience, market, competition and current digital presence.',
      duration: 'Foundation',
    },
    {
      step: '02',
      icon: FileCheck,
      title: 'Strategize',
      description: 'Define priorities, channels, messaging, deliverables and the roadmap for execution.',
      duration: 'Direction',
    },
    {
      step: '03',
      icon: Lightbulb,
      title: 'Create',
      description: 'Translate strategy into campaigns, content, design, landing pages and brand communication.',
      duration: 'Build',
    },
    {
      step: '04',
      icon: Rocket,
      title: 'Execute',
      description: 'Launch with structured implementation, testing, coordination and quality control.',
      duration: 'Launch',
    },
    {
      step: '05',
      icon: TrendingUp,
      title: 'Measure & Improve',
      description: 'Review performance, identify learning and continuously improve what can work better.',
      duration: 'Ongoing',
    },
  ];

  // Performance Focus
  const successMetrics = [
    {
      metric: 'Lead Quality',
      industry: 'Performance Marketing',
      description: 'We look beyond lead volume to understand relevance, intent and the quality of customer acquisition.',
    },
    {
      metric: 'Search Visibility',
      industry: 'SEO & Local Search',
      description: 'We track discoverability, organic growth and the search opportunities that matter to the business.',
    },
    {
      metric: 'Conversion Efficiency',
      industry: 'Paid Media & Web',
      description: 'Campaign and landing-page performance are reviewed together to improve the journey from click to action.',
    },
    {
      metric: 'Brand Consistency',
      industry: 'Creative & Communication',
      description: 'We evaluate whether campaigns, content and design are building one clear and recognizable brand experience.',
    },
  ];

  // Partnership Standards
  const testimonials = [
    {
      quote: 'We start with the business problem before deciding the channel, campaign or creative direction.',
      name: 'Business-First Thinking',
      title: 'Our Working Standard',
      result: 'Strategy Before Channels',
      rating: 5,
    },
    {
      quote: 'Creative, media, performance and technology should support one another rather than compete for attention.',
      name: 'Integrated Execution',
      title: 'Our Working Standard',
      result: 'One Connected Approach',
      rating: 5,
    },
    {
      quote: 'Clients should understand the priorities, the work in progress and the reason behind the next decision.',
      name: 'Clear Communication',
      title: 'Our Working Standard',
      result: 'Clarity at Every Stage',
      rating: 5,
    },
    {
      quote: 'We treat optimization as an ongoing discipline — learn from performance, improve the work and scale with context.',
      name: 'Continuous Improvement',
      title: 'Our Working Standard',
      result: 'Measure • Learn • Improve',
      rating: 5,
    },
  ];

  return (
    <div className="relative">
      {/* ⚠️ REMOVED bg-black - Using body background with grid pattern */}
      {/* SEO Meta Tags - Auto-loaded from centralized config */}
      <SEOHeadSSG {...seo.meta} />
      
      {/* Structured Data */}
      <StructuredData data={[organizationSchema, localBusinessSchema, websiteSchema]} />
      

      
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
              <span className="text-[0.8125rem] font-medium uppercase tracking-wide text-yellow-500">Founder-Led • Indore + Pune</span>
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
              Duniya Brands Ke Peeche, Aur Brands Marketing Ke Peeche.
            </h2>
          </AnimatedSection>

          {/* Subtext */}
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <p className="text-[0.9375rem] leading-relaxed text-[var(--muted-foreground)] max-w-4xl mx-auto mb-10" style={{ lineHeight: 1.6 }}>
              We connect strategy, creativity, performance and technology to help ambitious businesses build stronger brands and better digital growth.
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
                  Start a Conversation
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
              <a href="tel:+919009970709" className="flex items-center gap-2 text-[0.8125rem] text-[var(--muted-foreground)] hover:text-yellow-500 transition-colors">
                <Phone className="w-4 h-4" />
                +91 90099 70709
              </a>
              <a href="mailto:info@inchtomilez.com" className="flex items-center gap-2 text-[0.8125rem] text-[var(--muted-foreground)] hover:text-yellow-500 transition-colors">
                <Mail className="w-4 h-4" />
                info@inchtomilez.com
              </a>
              <div className="flex items-center gap-2 text-[0.8125rem] text-[var(--muted-foreground)]">
                <MapPin className="w-4 h-4" />
                Indore • Pune, India
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
                  We bring strategy, creative thinking, media and technology together around one business objective: meaningful growth.
                </p>
                <p className="text-[0.9375rem] leading-relaxed text-[var(--muted-foreground)]" style={{ lineHeight: 1.7 }}>
                  Founded by Aman Panwar, Inchtomilez is an independent digital marketing and advertising agency built in Indore and expanding its presence to Pune in September 2026. We work across marketing, advertising, branding, websites, media and technology through one coordinated approach.
                </p>
              </div>

              {/* Value Props Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="glass p-6 rounded-xl hover:glass-yellow transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Target className="text-yellow-500 icon-md" />
                  </div>
                  <h3 className="text-[1.125rem] font-medium mb-3 text-[var(--foreground)]">Business-First</h3>
                  <p className="text-[0.875rem] text-[var(--muted-foreground)] leading-relaxed">
                    We understand the business objective first, then choose the strategy, channels and execution needed to support it.
                  </p>
                </div>

                <div className="glass p-6 rounded-xl hover:glass-yellow transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Shield className="text-yellow-500 icon-md" />
                  </div>
                  <h3 className="text-[1.125rem] font-medium mb-3 text-[var(--foreground)]">Clear & Accountable</h3>
                  <p className="text-[0.875rem] text-[var(--muted-foreground)] leading-relaxed">
                    Defined scope, clear communication and practical reporting keep clients aligned with what is happening and why.
                  </p>
                </div>

                <div className="glass p-6 rounded-xl hover:glass-yellow transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Sparkles className="text-yellow-500 icon-md" />
                  </div>
                  <h3 className="text-[1.125rem] font-medium mb-3 text-[var(--foreground)]">Integrated Capability</h3>
                  <p className="text-[0.875rem] text-[var(--muted-foreground)] leading-relaxed">
                    Strategy, creative, performance, websites and technology work together instead of operating as disconnected services.
                  </p>
                </div>
              </div>

              {/* How We Work */}
              <div className="glass p-8 rounded-xl mb-10">
                <h3 className="text-[1.125rem] font-medium mb-6 text-[var(--foreground)]">How We Work</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Strategy Before Channels</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">We begin with the business, audience and market context before deciding where and how to execute.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Creative With Purpose</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">Design and content are developed to strengthen communication, attention and the overall brand experience.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Performance With Context</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">Campaigns are tested and refined using the signals that matter to the objective, not activity for its own sake.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Built for Long-Term Partnership</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">We aim to become an extension of the businesses we work with and improve the system as the business evolves.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                  About Inchtomilez
                  <ArrowRight className="icon-xs" />
                </Link>
                <Link to="/contact" className="px-6 py-3 bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border)] rounded-xl transition-colors inline-flex items-center gap-2 text-[0.9375rem] font-semibold">
                  <Mail className="icon-xs" />
                  Discuss a Project
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
          text="PERFORMANCE" 
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
                Aur Brands Marketing Ke Peeche.
              </h2>
              
              <p className="text-[0.9375rem] leading-relaxed text-[var(--muted-foreground)] max-w-3xl mx-auto mb-6" style={{ lineHeight: 1.6 }}>
                Great brands are built when <span className="text-yellow-500 font-semibold">strategy, communication and consistency</span> work together over time.
              </p>
              
              <p className="text-[0.9375rem] leading-relaxed text-[var(--foreground)] font-semibold text-lg max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
                — Aman Panwar, Founder, Inchtomilez. For us, the line reflects a simple idea: strong brands are built through deliberate strategy, communication and consistent execution.
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
                Our difference is not one service. It is the way <span className="text-yellow-500 font-semibold">strategy, creative, performance and technology</span> come together around the business.
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
                          Our Standard
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
                How We Work
              </p>
              
              <AutoCarousel
                items={[
                  { icon: Building2, metric: 'Indore + Pune', label: 'Growing Local Presence' },
                  { icon: Layers, metric: 'Integrated', label: 'Strategy • Creative • Media • Tech' },
                  { icon: Target, metric: 'Business-First', label: 'Objectives Before Channels' },
                  { icon: ChartBar, metric: 'Measured', label: 'Performance-Led Optimization' },
                  { icon: HeartHandshake, metric: 'Collaborative', label: 'Long-Term Working Style' },
                  { icon: Shield, metric: 'Clear', label: 'Scope, Communication & Accountability' },
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
                Principles We Work By
              </p>
              
              <AutoCarousel
                items={[
                  { icon: Target, title: 'Business Context First', text: 'Understand the problem before choosing the channel' },
                  { icon: HeartHandshake, title: 'Partnership Mindset', text: 'Work closely with the people who understand the business best' },
                  { icon: FileCheck, title: 'Clear Scope', text: 'Defined responsibilities, deliverables and next steps' },
                  { icon: ChartBar, title: 'Meaningful Measurement', text: 'Track signals that connect back to business outcomes' },
                  { icon: Timer, title: 'Practical Timelines', text: 'Plan execution around what the work actually requires' },
                  { icon: Lightbulb, title: 'Continuous Learning', text: 'Adapt creative, channels and tactics as the market changes' },
                  { icon: Shield, title: 'Responsible Execution', text: 'Protect brand consistency, quality and client confidence' },
                  { icon: Users, title: 'Connected Teams', text: 'Strategy, creative, performance and technology move together' },
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
                text="One Agency. Connected Capabilities."
                speed={1.5}
                delay={200}
                triggerOnView={true}
              />
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              We bring <span className="text-yellow-500 font-semibold">strategy, advertising, creative, digital, technology and on-ground execution</span> together so brands can work with one connected partner.
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
              Digital Marketing, Built as a System
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              From <span className="text-yellow-500 font-semibold">search and paid media to content, social and analytics</span>, we connect digital channels around the customer journey instead of treating them as isolated activities.
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
                Local Search & Google Business Profile
              </h2>
              
              <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                For location-led businesses, we strengthen <span className="text-yellow-500 font-semibold">visibility across Google Search and Maps</span> where local intent is highest.
              </p>
              
              <p className="text-[0.9375rem] leading-relaxed text-gray-300" style={{ lineHeight: 1.6 }}>
                We improve profile completeness, local relevance, content, review workflows and listing consistency to support stronger discovery and customer action.
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
              Paid Media Built Around Intent & Performance
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              We connect keyword strategy, audience intent, creative, landing pages and conversion tracking so <span className="text-yellow-500 font-semibold">paid media can be evaluated as a complete performance system.</span>
            </p>
            
            <p className="text-[0.9375rem] leading-relaxed text-white font-semibold text-center mb-12">
              The goal is not more ad activity — it is better-informed acquisition and continuous improvement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <Target className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Search Ads</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Reach people actively searching for relevant products, services or solutions.</p>
              </div>
              
              <div className="glass-card p-6">
                <Eye className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Display & Discovery</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Extend awareness and consideration through visual formats and audience-led placements.</p>
              </div>
              
              <div className="glass-card p-6">
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Performance Max</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Use Google’s cross-channel automation where it fits the campaign objective and available conversion data.</p>
              </div>
              
              <div className="glass-card p-6">
                <Play className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">YouTube Video Ads</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Build awareness, consideration and remarketing journeys through video-led advertising.</p>
              </div>
              
              <div className="glass-card p-6">
                <Users className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Retargeting & Remarketing</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Reconnect with audiences who have already interacted with the website, content or campaigns.</p>
              </div>
              
              <div className="glass-card p-6">
                <BarChart3 className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Analytics & Optimization</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Review search terms, audiences, creatives, landing pages and conversion signals to improve campaign decisions.</p>
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
              SEO & Search Performance
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8" style={{ lineHeight: 1.6 }}>
              We strengthen the website&apos;s <span className="text-yellow-500 font-semibold">technical foundation, content relevance and search visibility</span> so it is easier for search engines and users to understand.
            </p>

            <div className="glass-card p-8 text-left">
              <h3 className="text-[1.375rem] font-medium mb-6 leading-[1.4]">Search & Technical Focus:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Google Search Console (Webmaster Tools)</p>
                    <p className="text-[0.8125rem] text-gray-400">Monitor indexing, crawl coverage and search performance</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Bing Webmaster</p>
                    <p className="text-[0.8125rem] text-gray-400">Extend search visibility and technical monitoring beyond Google</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">SEMrush / Ahrefs</p>
                    <p className="text-[0.8125rem] text-gray-400">Keyword research, competitive analysis and authority reviews</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Site Speed & Schema Optimization</p>
                    <p className="text-[0.8125rem] text-gray-400">Improve performance, structured data and technical search readiness</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Monthly SEO Health Reports</p>
                    <p className="text-[0.8125rem] text-gray-400">Review visibility, traffic patterns, technical issues and opportunities</p>
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
              Social Media Strategy & Content
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              <span className="text-yellow-500 font-semibold">Content, community and performance should reinforce the same brand.</span> From reels and campaigns to platform planning, we build social systems around consistency and audience relevance.
            </p>

            <div className="inline-block glass-card p-6 mb-12">
              <h3 className="text-[1.375rem] font-medium mb-4 leading-[1.4]">Platforms We Work Across:</h3>
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
              OOH Advertising — Visibility in the Real World
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              From hoardings and transit to airport and retail media, we plan OOH around <span className="text-yellow-500 font-semibold">location, audience movement, format and campaign context.</span>
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
                <h3 className="text-[1.375rem] font-medium mb-6 text-center leading-[1.4]">OOH Planning & Evaluation:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold mb-2">Placement Mapping</p>
                    <p className="text-[0.8125rem] text-gray-400">Document locations, formats and geographic coverage</p>
                  </div>
                  
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold mb-2">Reach & Footfall Context</p>
                    <p className="text-[0.8125rem] text-gray-400">Use available audience and location data to assess placement potential</p>
                  </div>
                  
                  <div className="text-center">
                    <Settings className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold mb-2">Campaign Optimization</p>
                    <p className="text-[0.8125rem] text-gray-400">Refine formats and placements as campaign learning develops</p>
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
              BTL Activations — Brands in the Real World
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Create direct interaction through <span className="text-yellow-500 font-semibold">experiential and on-ground marketing</span>, with activation planning, lead capture and post-campaign learning built around the objective.
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
                  Fast, usable and <span className="text-yellow-500 font-semibold">business-focused digital experiences</span>.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  From corporate websites to e-commerce and digital products, we connect design, development, search readiness and conversion thinking.
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
                  Custom software, dashboards and <span className="text-yellow-500 font-semibold">automation built around real workflows</span>.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  We identify repeatable processes and build practical systems that reduce friction as operations grow.
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
                  From product shoots and short-form content to <span className="text-yellow-500 font-semibold">brand films and campaign assets</span>, we connect production with the communication objective.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  Content designed to communicate, differentiate and remain consistent with the brand.
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
                <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Public Relations & Brand Influence</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                  We support brands with <span className="text-yellow-500 font-semibold">media communication, outreach and reputation-led visibility</span>.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  Across print, digital and influence ecosystems, the focus remains clear messaging, relevance and credibility.
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
              From Understanding to Execution
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              A <span className="text-yellow-500 font-semibold">structured working process</span> that keeps research, strategy, creative, execution and optimization connected.
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
              Our experience spans <span className="text-yellow-500 font-semibold">healthcare, technology, real estate, e-commerce, education, FMCG, hospitality, automotive, jewellery, F&amp;B, professional services and manufacturing.</span>
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
              Platforms Behind the Work
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              We use a practical mix of <span className="text-yellow-500 font-semibold">analytics, advertising, search, creative, commerce and development platforms</span> based on the work being delivered.
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
          text="PERFORMANCE" 
          className="absolute top-[4%] right-[3%] text-[18rem] md:text-[22rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.1}
          rotation={-9}
          delay={0}
        />
        
        {/* Layer 2: Mid Ground - Fast with Heavy Scale */}
        <OutlinedText 
          text="FOCUS" 
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
          text="IMPROVE" 
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
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">PERFORMANCE FOCUS</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              What We Measure. What We Improve.
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              We focus on <span className="text-yellow-500 font-semibold">business-relevant indicators</span> that help us understand performance, identify friction and make better decisions.
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
          text="PARTNERSHIP" 
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
          text="VALUE" 
          className="absolute top-[62%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto mb-12 relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">PARTNERSHIP STANDARDS</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              What We Value in Every Partnership
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              These are the <span className="text-yellow-500 font-semibold">working standards</span> we bring to strategy, execution and client collaboration.
            </p>
          </div>

          <AutoCarousel speed="slow">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card min-w-[300px] sm:min-w-[380px] max-w-[420px] flex-shrink-0 snap-center p-6">
                {/* Partnership standard markers */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="w-4 h-4 text-yellow-500" />
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
                We commit to clear thinking, responsible execution and continuous improvement.
              </p>
              
              <p className="text-[0.9375rem] leading-relaxed text-gray-300" style={{ lineHeight: 1.6 }}>
                We value <span className="text-yellow-500 font-semibold">strong systems, useful communication and sustainable progress</span> over short-term noise.
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
              
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Ideas Worth Taking Back to Your Business</h2>
              <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
                Get practical perspectives on strategy, advertising, SEO, creative, websites and digital growth from the Inchtomilez team. <span className="text-yellow-500 font-semibold">Useful thinking, without the noise.</span>
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
                  Join the Newsletter
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
          text="INDORE" 
          className="absolute top-[8%] right-[5%] text-[16rem] md:text-[20rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.28}
          rotation={6}
          delay={0}
        />
        
        {/* Layer 2: Mid Ground - Medium Counter Sweep */}
        <OutlinedText 
          text="PUNE" 
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
          text="EXPANSION" 
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
              From Indore to Pune
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-4" style={{ lineHeight: 1.6 }}>
              Inchtomilez was built in Indore. In September 2026, we expanded our presence to Pune.
            </p>
            
            <p className="text-[0.9375rem] leading-relaxed text-white font-semibold text-lg" style={{ lineHeight: 1.6 }}>
              Two cities, one connected agency approach across strategy, creative, performance, advertising and technology.
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
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">Ready to Move Your Brand Forward?</h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
              Tell us where the business is today and where you want it to go. <span className="text-yellow-500 font-semibold">We&apos;ll help you identify the right next move.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/contact"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold shadow-xl hover:shadow-yellow-500/50 hover:scale-105"
              >
                Start a Conversation
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
              <a href="tel:+919009970709" className="flex items-center gap-2 text-[0.9375rem] text-gray-300 hover:text-yellow-500 transition-colors font-semibold">
                <Phone className="w-5 h-5" />
                📞 +91 90099 70709
              </a>
              <a href="mailto:info@inchtomilez.com" className="flex items-center gap-2 text-[0.9375rem] text-gray-300 hover:text-yellow-500 transition-colors font-semibold">
                <Mail className="w-5 h-5" />
                info@inchtomilez.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
