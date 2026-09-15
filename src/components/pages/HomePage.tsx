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
    { label: 'Strategy Before Media' },
    { label: 'Creative With Purpose' },
    { label: 'Digital + Physical' },
    { label: 'Built Around The Brand' },
  ];

  // Core Services - 14 services with proper icons
  const coreServices = [
    {
      title: 'Digital Marketing',
      description: 'Search, social, content and performance working as one connected digital ecosystem.',
      icon: Rocket,
      link: '/services/digital-marketing',
    },
    {
      title: 'Advertising',
      description: 'Ideas and media built to travel across search, social, video and high-intent moments.',
      icon: Megaphone,
      link: '/services/advertising',
    },
    {
      title: 'Branding & Strategy',
      description: 'Positioning, identity and communication systems that make the brand unmistakably itself.',
      icon: Sparkles,
      link: '/services/branding',
    },
    {
      title: 'BTL Activations',
      description: 'Real-world brand experiences built for participation, interaction and lasting recall.',
      icon: Users2,
      link: '/services/btl-activations',
    },
    {
      title: 'OOH Advertising',
      description: 'Hoardings, transit, retail and premium placements that take the brand beyond the screen.',
      icon: MapPinned,
      link: '/services/ooh-advertising',
    },
    {
      title: 'Websites & Digital Experiences',
      description: 'Websites, commerce and digital products designed around clarity, speed and action.',
      icon: Monitor,
      link: '/services/website-development',
    },
    {
      title: 'Software Development',
      description: 'Business software, dashboards and automation designed to remove friction and scale smarter.',
      icon: Code,
      link: '/services/software-development',
    },
    {
      title: 'Public Relations',
      description: 'Media communication, digital PR and influence that give the brand credibility beyond advertising.',
      icon: MessageSquare,
      link: '/services/public-relations',
    },
    {
      title: 'Political Campaigns',
      description: 'Integrated public communication built around audience insight, media and on-ground reach.',
      icon: Vote,
      link: '/services/political-campaigns',
    },
    {
      title: 'Product Marketing',
      description: 'Positioning, go-to-market thinking and launch systems that build desire around the product.',
      icon: Package,
      link: '/services/product-marketing',
    },
    {
      title: 'Graphic Design',
      description: 'Campaign, social, print and brand design created to communicate before it decorates.',
      icon: Palette,
      link: '/services/graphic-design',
    },
    {
      title: 'Media Production',
      description: 'Films, photography and short-form content built around the idea, not just the equipment.',
      icon: Camera,
      link: '/services/media-production',
    },
  ];

  // Why We're Different - 6 principles
  const differentiators = [
    {
      icon: FileCheck,
      title: 'Strategy Before Spending',
      description: 'We decide what the brand actually needs before deciding where the budget should go.',
    },
    {
      icon: Shield,
      title: 'Ideas Before Noise',
      description: 'A stronger idea beats a louder media plan. We build the message before we amplify it.',
    },
    {
      icon: Clock,
      title: 'One Brand. One Direction.',
      description: 'Strategy, creative, media and technology work toward the same brand objective.',
    },
    {
      icon: Award,
      title: 'Digital + Physical Thinking',
      description: 'The customer does not live in one channel. Neither should the brand experience.',
    },
    {
      icon: Users,
      title: 'Clear Conversations',
      description: 'No unnecessary jargon between you and your own marketing. Clear thinking, clearly communicated.',
    },
    {
      icon: Target,
      title: "Improve, Don't Autopilot",
      description: 'Launch, learn, improve and scale. Good marketing should become smarter as it moves.',
    },
  ];

  // Digital Marketing Deep Dive
  const digitalMarketingServices = [
    {
      icon: Search,
      title: 'Search Visibility',
      description: 'Build the technical, content and authority signals that help the right audience discover you.',
    },
    {
      icon: MapPin,
      title: 'Local Discovery',
      description: 'Own the moments when nearby customers search, compare and decide where to go next.',
    },
    {
      icon: Target,
      title: 'High-Intent Search',
      description: 'Meet demand at the moment people are actively searching for what you offer.',
    },
    {
      icon: Share2,
      title: 'Paid Social & Discovery',
      description: 'Turn scrolling into discovery through sharper audiences, stronger creative and smarter iteration.',
    },
    {
      icon: Mail,
      title: 'Lifecycle & Automation',
      description: 'Keep the conversation moving after the first click with useful, timely communication.',
    },
    {
      icon: BarChart3,
      title: 'Measurement & Learning',
      description: 'Understand what moved, what stalled and what the next decision should be.',
    },
  ];

  // OOH Advertising Details
  const oohServices = [
    {
      icon: Building2,
      title: 'Billboards & Hoardings',
      description: 'High-visibility placements selected around audience movement, context and brand impact.',
    },
    {
      icon: Tv,
      title: 'Transit Media',
      description: 'Take the message through the city with media that moves where the audience moves.',
    },
    {
      icon: Globe,
      title: 'Airport Branding',
      description: 'Premium environments for brands that need scale, stature and high-value attention.',
    },
    {
      icon: Boxes,
      title: 'Mall & Retail Media',
      description: 'Turn high-footfall retail spaces into memorable brand moments close to purchase.',
    },
  ];

  // BTL Activations Examples
  const btlActivations = [
    {
      icon: Users2,
      title: 'Mall & Retail Activations',
      description: "Put the product in people's hands and turn passive audiences into participants.",
    },
    {
      icon: Trophy,
      title: 'Campus & Roadshows',
      description: 'Take the idea to communities, campuses and streets through live brand experiences.',
    },
    {
      icon: Building2,
      title: 'Trade Exhibitions',
      description: 'Build exhibition experiences that attract, explain and create meaningful conversations.',
    },
    {
      icon: Boxes,
      title: 'Society-Level Branding',
      description: 'Bring the brand into neighbourhoods through relevant, high-contact community experiences.',
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
      description: 'Understand the business, audience, market and real problem to solve.',
      duration: 'UNDERSTAND',
    },
    {
      step: '02',
      icon: FileCheck,
      title: 'Strategy & Planning',
      description: 'Define the opportunity, objective, message and channel role before execution begins.',
      duration: 'DEFINE',
    },
    {
      step: '03',
      icon: Lightbulb,
      title: 'Creative Production',
      description: 'Turn the strategy into an idea, visual language, message and experience.',
      duration: 'CREATE',
    },
    {
      step: '04',
      icon: Rocket,
      title: 'Campaign Execution',
      description: 'Launch the work across the right touchpoints with one connected direction.',
      duration: 'LAUNCH',
    },
    {
      step: '05',
      icon: TrendingUp,
      title: 'Analysis & Improvement',
      description: 'Read the response, learn what changed, improve the work and scale what earns it.',
      duration: 'LEARN + SCALE',
    },
  ];

  // Real Success Metrics
  const successMetrics = [
    {
      metric: 'ATTENTION',
      industry: 'Get Seen',
      description: 'Creative and media should earn the first look — not assume it.',
    },
    {
      metric: 'MEMORY',
      industry: 'Get Remembered',
      description: 'Recognition is built when every brand touchpoint feels connected.',
    },
    {
      metric: 'ACTION',
      industry: 'Get Chosen',
      description: 'Attention matters more when the experience gives people a reason to move.',
    },
    {
      metric: 'Digital + Physical Thinking',
      industry: 'Go Further',
      description: 'Learn from the response, improve the system and take what works further.',
    },
  ];

  // What Great Work Should Leave Behind
  const testimonials = [
    {
      quote: 'Attention gets the first look. Consistency is what turns that look into memory.',
      name: 'ATTENTION → MEMORY',
      title: 'Brand Principle 01',
      result: 'GET REMEMBERED',
      rating: 5,
    },
    {
      quote: 'A campaign gets stronger when the idea survives every format, platform and location.',
      name: 'IDEA → SYSTEM',
      title: 'Brand Principle 02',
      result: 'ONE DIRECTION',
      rating: 5,
    },
    {
      quote: 'The customer never experiences your departments. They experience one brand.',
      name: 'CHANNELS → BRAND',
      title: 'Brand Principle 03',
      result: 'STAY CONNECTED',
      rating: 5,
    },
    {
      quote: 'Good marketing does not run on autopilot. It learns, adapts and gets sharper.',
      name: 'LAUNCH → LEARN',
      title: 'Brand Principle 04',
      result: 'KEEP IMPROVING',
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
      








      {/* ============================================================
          1. HOME HERO SECTION — FIXED, RESPONSIVE, THEME-ALIGNED
          Only Section 1 is changed. Sections 2+ remain untouched.
      ============================================================ */}
      <section
        className="relative min-h-screen w-full overflow-hidden bg-black"
        style={{ minHeight: '100vh' }}
        aria-labelledby="home-hero-heading"
      >
        {/* Background video */}
        <VideoBackground
          src="https://orange-woodcock-416561.hostingersite.com/wp-content/uploads/2024/09/Sequence-01_2.mp4"
          overlayOpacity={0.14}
          startTime={0}
        />

        {/* Readability overlays */}
        <div className="absolute inset-0 z-[1] bg-black/25 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 34%, rgba(0,0,0,0.46) 60%, rgba(0,0,0,0.14) 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.36) 24%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,0.16) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Subtle brand glow */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 18% 70%, rgba(234,179,8,0.10) 0%, rgba(234,179,8,0.025) 28%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        {/* Main content shell — same horizontal geometry used throughout HomePage */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto w-full pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-32 md:pb-20 lg:pt-28 lg:pb-20">
            <div className="max-w-4xl">

              {/* Positioning badge */}
              <AnimatedSection animation="fadeInUp" delay={0.08}>
                <div className="mb-5 sm:mb-6">
                  <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-yellow-500/30 bg-black/35 px-3.5 py-2 backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" fill="currentColor" />
                    <span className="text-[9px] min-[380px]:text-[10px] sm:text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.08em] sm:tracking-[0.11em] text-white/90 whitespace-nowrap">
                      DIGITAL • CREATIVE • ADVERTISING • TECHNOLOGY
                    </span>
                  </div>
                </div>
              </AnimatedSection>

              {/* Main headline */}
              <AnimatedSection animation="fadeInUp" delay={0.14}>
                <h1
                  id="home-hero-heading"
                  className="max-w-4xl text-white font-medium tracking-[-0.03em] mb-5 sm:mb-6"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    lineHeight: 1.08,
                  }}
                >
                  Duniya <span className="text-yellow-500">Brands</span> Ke Peeche,
                  <br className="hidden md:block" />
                  <span className="md:block md:mt-1">Aur Brands Marketing Aur Advertising Ke!</span>
                </h1>
              </AnimatedSection>

              {/* Supporting statement */}
              <AnimatedSection animation="fadeInUp" delay={0.2}>
                <h2
                  className="max-w-3xl text-[17px] sm:text-[18px] md:text-[20px] lg:text-[21px] font-semibold leading-[1.45] mb-3 sm:mb-4"
                  style={{
                    color: '#ffffff',
                    background: 'none',
                    backgroundImage: 'none',
                    WebkitBackgroundClip: 'initial',
                    WebkitTextFillColor: '#ffffff',
                  }}
                >
                  We Create Brands People Notice. Campaigns People Remember. Experiences People Choose.
                </h2>
              </AnimatedSection>

              {/* Description */}
              <AnimatedSection animation="fadeInUp" delay={0.25}>
                <p className="max-w-2xl text-[14px] sm:text-[15px] leading-[1.7] text-white/65 mb-6 sm:mb-7">
                  We build ideas, campaigns and digital experiences that make people look, remember and choose.
                </p>
              </AnimatedSection>

              {/* Quick facts */}
              <AnimatedSection animation="fadeInUp" delay={0.3}>
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-7 sm:mb-8">
                  {quickFacts.map((fact, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 backdrop-blur-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                      <span className="text-[11px] sm:text-[12px] md:text-[13px] font-medium text-white/75 whitespace-nowrap">
                        {fact.label}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* CTAs — direct Links intentionally used here to keep exact compact sizing */}
              <AnimatedSection animation="fadeInUp" delay={0.36}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-7 sm:mb-8">
                  <Link
                    to="/contact"
                    className="group sm:w-fit inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 px-6 sm:px-7 py-3.5 text-[14px] sm:text-[15px] font-semibold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Start Something
                    <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/services"
                    className="group sm:w-fit inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.10] hover:border-yellow-500/40 backdrop-blur-md px-6 sm:px-7 py-3.5 text-[14px] sm:text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Explore Inchtomilez
                    <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimatedSection>

              {/* Contact strip */}
              <AnimatedSection animation="fadeInUp" delay={0.42}>
                <div className="max-w-3xl border-t border-white/10 pt-5 flex flex-col min-[520px]:flex-row min-[520px]:flex-wrap items-start min-[520px]:items-center gap-y-3 gap-x-5 md:gap-x-6">
                  <a
                    href="tel:+919669988666"
                    className="group inline-flex items-center gap-2 text-[12px] sm:text-[13px] text-white/55 hover:text-yellow-500 transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0 text-white/40 group-hover:text-yellow-500 transition-colors" />
                    <span>+91 966-998-8666</span>
                  </a>

                  <a
                    href="mailto:inchtomilez@gmail.com"
                    className="group inline-flex items-center gap-2 text-[12px] sm:text-[13px] text-white/55 hover:text-yellow-500 transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0 text-white/40 group-hover:text-yellow-500 transition-colors" />
                    <span>inchtomilez@gmail.com</span>
                  </a>

                  <div className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] text-white/55">
                    <MapPin className="w-4 h-4 flex-shrink-0 text-white/40" />
                    <span>Indore • Pune • India</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Bottom separator */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* 2. Who We Are - V4.0 3D PARALLAX ENHANCED */}
      <section className="min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden" style={{ perspective: '1000px' }}>
        {/* 3D MULTI-LAYER DEPTH - Background to Foreground */}
        
        {/* Background Layer: Far depth with blur */}
        <OutlinedText 
          text="IDEAS" 
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
          text="BEHAVIOUR" 
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
          text="BRAND" 
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
                  Part agency. Part creative lab. Part growth engine.
                </p>
                <p className="text-[0.9375rem] leading-relaxed text-[var(--muted-foreground)]" style={{ lineHeight: 1.7 }}>
                  We bring strategy, creativity, media and technology into one connected system — one brand, one direction, many ways to move it forward.
                </p>
              </div>

              {/* Value Props Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="glass p-6 rounded-xl hover:glass-yellow transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Target className="text-yellow-500 icon-md" />
                  </div>
                  <h3 className="text-[1.125rem] font-medium mb-3 text-[var(--foreground)]">Think Before Spending</h3>
                  <p className="text-[0.875rem] text-[var(--muted-foreground)] leading-relaxed">
                    We start with the problem, not the platform. The channel comes after the thinking.
                  </p>
                </div>

                <div className="glass p-6 rounded-xl hover:glass-yellow transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Shield className="text-yellow-500 icon-md" />
                  </div>
                  <h3 className="text-[1.125rem] font-medium mb-3 text-[var(--foreground)]">Create With Purpose</h3>
                  <p className="text-[0.875rem] text-[var(--muted-foreground)] leading-relaxed">
                    Creative should communicate before it decorates — and give people a reason to remember.
                  </p>
                </div>

                <div className="glass p-6 rounded-xl hover:glass-yellow transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Sparkles className="text-yellow-500 icon-md" />
                  </div>
                  <h3 className="text-[1.125rem] font-medium mb-3 text-[var(--foreground)]">Build For The Journey</h3>
                  <p className="text-[0.875rem] text-[var(--muted-foreground)] leading-relaxed">
                    From first impression to digital experience, every touchpoint should feel like the same brand.
                  </p>
                </div>
              </div>

              {/* How We Think */}
              <div className="glass p-8 rounded-xl mb-10">
                <h3 className="text-[1.125rem] font-medium mb-6 text-[var(--foreground)]">How We Think</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Understand Before We Execute</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">Business, audience, category and context come before tactics.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Ideas Before Formats</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">We build the central idea first, then let it travel across formats.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">Launch. Learn. Improve.</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">We read the response and keep sharpening what the audience actually experiences.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 icon-sm flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[var(--foreground)] mb-1">One Team Around The Brand</p>
                      <p className="text-[0.8125rem] text-[var(--muted-foreground)]">Strategy, creative, media and technology move together instead of working in silos.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                  Know Inchtomilez
                  <ArrowRight className="icon-xs" />
                </Link>
                <Link to="/contact" className="px-6 py-3 bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border)] rounded-xl transition-colors inline-flex items-center gap-2 text-[0.9375rem] font-semibold">
                  <Mail className="icon-xs" />
                  Explore Our Work
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
          text="THINK" 
          className="absolute top-[10%] left-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.3}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="MOVE" 
          className="absolute top-[36%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.5}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="BUILD" 
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
                Brands are not built by chance. They are built through <span className="text-yellow-500 font-semibold">strategy, creativity and consistency</span>.
              </p>
              
              <p className="text-[0.9375rem] leading-relaxed text-[var(--foreground)] font-semibold text-lg max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
                Big never starts big. One stronger idea, one better decision, one move forward — inch by inch, until the distance starts looking like miles.
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
          text="STRATEGY" 
          className="absolute top-[8%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="CREATIVE" 
          className="absolute top-[34%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="MEDIA" 
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
                We Don't Start With A Platform
              </h2>
              
              <p className="text-[0.9375rem] font-normal leading-relaxed text-[var(--muted-foreground)] max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
                We start with the problem, the audience and the opportunity — then build <span className="text-yellow-500 font-semibold">the right system around the brand</span>.
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
                          Built To Move
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
                ONE BRAND. ONE DIRECTION.
              </p>
              
              <AutoCarousel
                items={[
                  { icon: Award, metric: 'THINK', label: 'Strategy Before Media' },
                  { icon: Star, metric: 'CREATE', label: 'Ideas Before Formats' },
                  { icon: Users, metric: 'BUILD', label: 'One Brand Experience' },
                  { icon: Trophy, metric: 'MOVE', label: 'Digital + Physical' },
                  { icon: Clock, metric: 'LEARN', label: 'Improve Continuously' },
                  { icon: Target, metric: 'FOCUS', label: 'Clear Objectives' },
                  { icon: TrendingUp, metric: 'SCALE', label: 'Take What Works Further' },
                  { icon: Zap, metric: 'ADAPT', label: 'Built For Change' },
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
                HOW THE WORK MOVES
              </p>
              
              <AutoCarousel
                items={[
                  { icon: Shield, title: 'Strategy First', text: 'Know what needs to change before choosing the channel' },
                  { icon: HeartHandshake, title: 'One Connected Team', text: 'Brand, creative, media and technology moving together' },
                  { icon: Target, title: 'Think Before Spending', text: 'Measure what changes behaviour, demand and action' },
                  { icon: Lock, title: 'Data Security', text: 'Build responsibly around the systems your business depends on' },
                  { icon: FileCheck, title: 'Clear Direction', text: 'Clear objectives, roles, decisions and next moves' },
                  { icon: Timer, title: 'Real Work, Real Pace', text: 'Quality needs clarity, focus and proper execution' },
                  { icon: ChartBar, title: 'Learn From The Response', text: 'Use performance to make the next decision smarter' },
                  { icon: Lightbulb, title: 'Built To Adapt', text: 'Platforms change. Strong thinking travels with them' },
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
                  <span>Know Inchtomilez</span>
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
          text="THINK" 
          className="absolute top-[10%] left-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="IDEAS" 
          className="absolute top-[36%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="AMPLIFY" 
          className="absolute top-[62%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">ONE BRAND. MANY WAYS TO MOVE IT.</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              <TextScramble 
                text="Think. Create. Build. Amplify."
                speed={1.5}
                delay={200}
                triggerOnView={true}
              />
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Strategy, creative, media and technology work together — from <span className="text-yellow-500 font-semibold">first idea to final experience</span>.
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
                Explore Capabilities
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
          text="DISCOVERY" 
          className="absolute top-[60%] left-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.6}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">SEARCH. SCROLL. WATCH. SHOP. DECIDE.</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Your Audience Is Already Online
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              We connect the moments where people discover, compare and choose — from <span className="text-yellow-500 font-semibold">search visibility to paid discovery</span>. 
              Don't chase every platform. Own the right moments.
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
          text="SEARCH" 
          className="absolute top-[10%] left-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="FOUND" 
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
                Consumers Search For The Best
              </h2>
              
              <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                Someone nearby is searching right now. Our job is to make your brand <span className="text-yellow-500 font-semibold">part of that decision</span>.
              </p>
              
              <p className="text-[0.9375rem] leading-relaxed text-gray-300" style={{ lineHeight: 1.6 }}>
                Search presence, maps, content and local signals work together — 
                <span className="text-yellow-500 font-semibold"> helping people find you before they find someone else</span>.
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
          text="NEXT" 
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
              Media Puts You There. The Idea Makes People Care.
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Paid media works when audience, message, medium and moment work together. 
              <span className="text-yellow-500 font-semibold"> We test what earns attention and improve what earns action.</span>
            </p>
            
            <p className="text-[0.9375rem] leading-relaxed text-white font-semibold text-center mb-12">
              Every impression should have a reason to exist.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <Target className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Search Ads</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Meet people at the exact moment they are actively searching for what you offer.</p>
              </div>
              
              <div className="glass-card p-6">
                <Eye className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Display & Discovery</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Build discovery through visual media across relevant audiences and contexts.</p>
              </div>
              
              <div className="glass-card p-6">
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Performance Max</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Use automation where it improves reach, learning and campaign efficiency.</p>
              </div>
              
              <div className="glass-card p-6">
                <Play className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">YouTube Video Ads</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Use sight, sound and story to turn passive viewing into active interest.</p>
              </div>
              
              <div className="glass-card p-6">
                <Users className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Retargeting & Remarketing</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Stay relevant after the first interaction and bring interested audiences back.</p>
              </div>
              
              <div className="glass-card p-6">
                <BarChart3 className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[1.375rem] font-medium mb-2 leading-[1.4]">Analytics & Optimization</h3>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed">Learn from behaviour, sharpen the campaign and scale what earns the next step.</p>
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
          text="DISCOVER" 
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
              Be Found Before They Find Someone Else
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8" style={{ lineHeight: 1.6 }}>
              Search starts before the click. We build the technical and content foundation that makes your website <span className="text-yellow-500 font-semibold">easy to discover and understand</span> - fast, crawlable, and indexed correctly.
            </p>

            <div className="glass-card p-8 text-left">
              <h3 className="text-[1.375rem] font-medium mb-6 leading-[1.4]">The Search Foundation:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Google Search Console (Webmaster Tools)</p>
                    <p className="text-[0.8125rem] text-gray-400">Understand how search engines discover, index and interpret your website</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Bing Webmaster</p>
                    <p className="text-[0.8125rem] text-gray-400">Extend discoverability beyond one search ecosystem</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">SEMrush / Ahrefs</p>
                    <p className="text-[0.8125rem] text-gray-400">Understand demand, competition, content gaps and authority signals</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Site Speed & Schema Optimization</p>
                    <p className="text-[0.8125rem] text-gray-400">Build speed, structure and machine-readable context into the experience</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold">Search Learning & Improvement</p>
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
          text="CULTURE" 
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
              The Feed Never Stops. Give People A Reason To.
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              <span className="text-yellow-500 font-semibold">Social is culture happening in real time.</span> 
              We combine ideas, behaviour, design, content and media to make the brand feel native to the platforms people actually use.
            </p>

            <div className="inline-block glass-card p-6 mb-12">
              <h3 className="text-[1.375rem] font-medium mb-4 leading-[1.4]">Where The Conversation Happens:</h3>
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
          text="STREETS" 
          className="absolute top-[8%] left-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="FOUND" 
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
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">LOOK UP FROM THE SCREEN</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              From Screens To Streets
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Cities, stores, transport and public spaces are media too — 
              <span className="text-yellow-500 font-semibold"> we take the idea into the physical world</span> with context, scale and presence.
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
                <h3 className="text-[1.375rem] font-medium mb-6 text-center leading-[1.4]">How We Think About Placement:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold mb-2">Location & Context</p>
                    <p className="text-[0.8125rem] text-gray-400">Choose environments where audience movement and brand relevance intersect</p>
                  </div>
                  
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold mb-2">Audience Opportunity</p>
                    <p className="text-[0.8125rem] text-gray-400">Understand traffic, visibility and the role each placement should play</p>
                  </div>
                  
                  <div className="text-center">
                    <Settings className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-[0.9375rem] leading-relaxed text-white font-semibold mb-2">Connected Campaign Thinking</p>
                    <p className="text-[0.8125rem] text-gray-400">Keep outdoor, digital and activation working as one campaign system</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/services/ooh-advertising"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-[0.9375rem] font-semibold shadow-lg hover:scale-105"
              >
                Explore OOH Advertising
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
          text="EXPERIENCE" 
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
          text="PARTICIPATE" 
          className="absolute top-[62%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">BRANDS SHOULD BE EXPERIENCED</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Turn Attention Into Participation
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Take the idea off the screen through <span className="text-yellow-500 font-semibold">real-world brand experiences</span>. 
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
                Explore Brand Experiences
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
          text="BUILD" 
          className="absolute top-[8%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Stops at 25% */}
        <OutlinedText 
          text="TOOLS" 
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
              {/* Websites & Digital Experiences */}
              <div className="glass-card p-8">
                <Monitor className="w-12 h-12 text-yellow-500 mb-6" />
                <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Websites & Digital Experiences</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                  The campaign earns the click. The experience has to earn the next move. We build <span className="text-yellow-500 font-semibold">clear, fast and useful digital experiences</span>.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  From corporate platforms to commerce and applications, every screen is designed around the person using it.
                </p>
                <Link
                  to="/services/website-development"
                  className="inline-flex items-center gap-2 text-[0.8125rem] text-yellow-500 hover:text-yellow-400 font-semibold transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Technology Behind The Experience */}
              <div className="glass-card p-8">
                <Code className="w-12 h-12 text-yellow-500 mb-6" />
                <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Technology Behind The Experience</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                  Business systems should remove friction. We build software, dashboards and <span className="text-yellow-500 font-semibold">automation that makes work simpler</span>.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  Useful technology stays out of the way while making the business work better behind it.
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
          text="STORY" 
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
                <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Some Stories Need More Than Words</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                  From six-second attention to full campaign films, we create <span className="text-yellow-500 font-semibold">visual stories built around the idea</span>, 
                   from concept to production.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  Shoot less content. Create more impact.
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
                <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Reach Can Be Bought. Trust Has To Be Built.</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6" style={{ lineHeight: 1.6 }}>
                  We shape the conversations around brands through communication designed to <span className="text-yellow-500 font-semibold">earn credibility</span> and maintain credibility.
                </p>
                <p className="text-[0.8125rem] text-gray-400 mb-4">
                  Across media, digital and influence, what others say about the brand carries weight.
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
          text="DEFINE" 
          className="absolute top-[36%] right-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.5}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="LAUNCH" 
          className="absolute top-[62%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.7}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">FROM QUESTION TO IMPACT</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Think First. Move Smart. Improve Always.
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              A <span className="text-yellow-500 font-semibold">connected process</span> built to keep strategy, creative and execution moving in one direction. 
              Understand. Define. Create. Launch. Learn. Scale.
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
          text="BEHAVIOUR" 
          className="absolute top-[36%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Stops at 25% */}
        <OutlinedText 
          text="MARKETS" 
          className="absolute top-[62%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">DIFFERENT MARKETS. DIFFERENT REASONS TO CHOOSE.</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              One Formula Doesn't Fit Every Brand
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              <span className="text-yellow-500 font-semibold">Healthcare needs trust. Technology needs clarity. Fashion needs desire. Real estate needs conviction. The category changes — the strategy should too.</span>
            </p>

            <BentoGrid2 
              cards={industries.map(industry => ({
                icon: industry.icon,
                label: industry.name,
                sublabel: 'Built around the category'
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
                Explore Industries
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
          text="TOOLS" 
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
          text="SYSTEM" 
          className="absolute top-[60%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto mb-12 relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">THE STACK BEHIND THE WORK</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Tools Don't Make Strategy
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              <span className="text-yellow-500 font-semibold">The right platforms</span> help us research, create, build, measure and improve the work — but the thinking comes first.
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
          text="BUILD" 
          className="absolute top-[4%] right-[3%] text-[18rem] md:text-[22rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.1}
          rotation={-9}
          delay={0}
        />
        
        {/* Layer 2: Mid Ground - Fast with Heavy Scale */}
        <OutlinedText 
          text="MEMORY" 
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
          text="NEXT" 
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
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">{'WORK > WORDS'}</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              What Strong Work Should Do
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              We would rather show <span className="text-yellow-500 font-semibold">the challenge, the thinking and what changed</span> than fill this page with unsupported vanity numbers.
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
          text="PRINCIPLES" 
          className="absolute top-[10%] left-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.25}
          delay={0}
        />
        
        {/* Text 2: Slides from RIGHT edge - Fully visible at right */}
        <OutlinedText 
          text="BRAND" 
          className="absolute top-[36%] right-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="right"
          parallax={true}
          parallaxSpeed={0.45}
          delay={0.2}
        />
        
        {/* Text 3: Slides from LEFT edge - Fully visible at left */}
        <OutlinedText 
          text="STANDARDS" 
          className="absolute top-[62%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          parallax={true}
          parallaxSpeed={0.65}
          delay={0.4}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto mb-12 relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-4 text-center">BRAND PRINCIPLES</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              What Great Work Should Leave Behind
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Not manufactured testimonials. These are <span className="text-yellow-500 font-semibold">the standards we build the work around</span> — attention, memory, consistency and improvement.
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

      {/* 20. The Standard We Hold Ourselves To - Pattern: Cross Convergence */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* TRIPLE-LAYER PARALLAX SYSTEM */}
        
        {/* Layer 1: Far Background - Medium Diagonal with Fade */}
        <OutlinedText 
          text="STANDARD" 
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
          text="FOCUS" 
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
          text="CRAFT" 
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
                The Standard We Hold Ourselves To
              </h2>
              
              <p className="text-[0.9375rem] leading-relaxed text-white font-semibold text-lg mb-4" style={{ lineHeight: 1.6 }}>
                No inflated pitch. No copy-paste plan. No platform-first thinking.
              </p>
              
              <p className="text-[0.9375rem] leading-relaxed text-gray-300" style={{ lineHeight: 1.6 }}>
                We value <span className="text-yellow-500 font-semibold">work that gets sharper over time</span> and ideas strong enough to travel beyond one campaign.
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
          text="IDEAS" 
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
          text="THINKING" 
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
          text="NOTES" 
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
              
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">Ideas Worth Opening</h2>
              <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
                Occasional thinking on brands, advertising, digital behaviour, technology and the ideas shaping attention. 
                <span className="text-yellow-500 font-semibold"> No recycled hacks. No inbox noise. Only something worth reading.</span>
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
                  Send Me The Good Stuff
                </button>
              </form>
              
              <p className="text-[0.8125rem] text-gray-500 mt-4" style={{ lineHeight: 1.6 }}>Leave whenever you want. No hard feelings.</p>
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
          text="BEYOND" 
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
              Built Here. Designed To Travel.
            </h2>
            
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-4" style={{ lineHeight: 1.6 }}>
              Built in Indore. Expanding through Pune. Thinking beyond both.
            </p>
            
            <p className="text-[0.9375rem] leading-relaxed text-white font-semibold text-lg" style={{ lineHeight: 1.6 }}>
              A strong idea should survive a new market, a new medium and a new audience without losing what made it powerful.
            </p>
          </div>
        </div>
      </section>

      {/* 23. Final CTA - Pattern: Climactic Convergence */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative overflow-hidden">
        {/* TRIPLE-LAYER PARALLAX SYSTEM */}
        
        {/* Layer 1: Far Background - Medium Left Dramatic */}
        <OutlinedText 
          text="NEXT" 
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
          text="MOVE" 
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
          text="START" 
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
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">What Do You Want People To Remember?</h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
              A new brand. A launch. A campaign. A digital experience. Or an idea that deserves to become much bigger. 
              <span className="text-yellow-500 font-semibold"> Bring us the ambition. We'll bring the thinking.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/contact"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold shadow-xl hover:shadow-yellow-500/50 hover:scale-105"
              >
                Start Something
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="glass-card px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold hover:scale-105"
              >
                Explore Capabilities
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
