import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle, Target, TrendingUp, Shield, Users, Star, Clock, Globe, Play, Code, Palette, Camera, Trophy, Zap, BarChart3, Heart, Sparkles, Rocket } from 'lucide-react';
import { useState } from 'react';
import { AutoCarousel } from '../ui/AutoCarousel';
import { BentoGrid2 } from '../layout/BentoGrid2';
import { OutlinedText } from '../ui/OutlinedText';
import { AnimatedSection } from '../ui/AnimatedSection';
import { EarthGlobe } from '../ui/EarthGlobe';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { useSEO, StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/seo-system';

export function AboutPage() {
  const seo = useSEO(); // Auto-loads SEO from centralized config
  const [email, setEmail] = useState('');

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  // Who We Are cards - Updated for BentoGrid2 uniform mode
  const whoWeAreFeatures = [
    {
      icon: Rocket,
      label: 'Our Mission',
      description: 'To help businesses grow through honest digital marketing. We focus on sustainable strategies that deliver measurable results over time.',
    },
    {
      icon: Target,
      label: 'Our Vision',
      description: 'To build lasting partnerships based on transparency and trust. We want to be known for honest communication, not empty promises.',
    },
    {
      icon: Award,
      label: 'Our Values',
      description: 'Integrity first. Realistic expectations. Clear communication. Continuous learning. Client education. No shortcuts or gimmicks.',
    },
    {
      icon: Users,
      label: 'Our Team',
      description: '50+ specialists including strategists, designers, developers, and marketers. Most have 5+ years of experience in their fields.',
    },
    {
      icon: Globe,
      label: 'Our Reach',
      description: 'Serving 96+ clients across 12+ industries in India and internationally. We adapt our approach based on industry dynamics and market conditions.',
    },
    {
      icon: Trophy,
      label: 'Our Recognition',
      description: '7 years of dedicated service. Successfully delivered 74+ marketing campaigns with 13+ international campaigns. Trusted by businesses in Indore and beyond.',
    },
  ];

  // Growth principles - Updated for BentoGrid2 uniform mode
  const growthPrinciples = [
    {
      icon: BarChart3,
      label: 'Data-Informed Decisions',
      description: 'We use analytics to guide strategy, but understand that data is part of the picture, not the whole story.',
    },
    {
      icon: TrendingUp,
      label: 'Sustainable Growth',
      description: 'Building momentum takes time. We focus on strategies that compound over months and years, not just weeks.',
    },
    {
      icon: Target,
      label: 'Clear Objectives',
      description: 'We set specific, measurable goals with realistic timelines. You always know what we\'re working toward.',
    },
    {
      icon: Rocket,
      label: 'Scalable Approach',
      description: 'Starting conservatively and scaling based on results. We don\'t recommend big budgets until we validate what works.',
    },
  ];

  // Simple principles - Updated for BentoGrid2 uniform mode
  const simplePrinciples = [
    {
      icon: CheckCircle,
      label: 'Plain Language',
      description: 'We explain things clearly without marketing jargon. If we use technical terms, we define them.',
    },
    {
      icon: Shield,
      label: 'Transparent Pricing',
      description: 'Fixed pricing with detailed breakdowns. No hidden fees or surprise charges. You see exactly where your budget goes.',
    },
    {
      icon: Award,
      label: 'Simple Agreements',
      description: 'Clear contracts with defined deliverables and timelines. No confusing fine print or lengthy commitments.',
    },
    {
      icon: TrendingUp,
      label: 'Focus on Results',
      description: 'We measure what matters - leads, conversions, revenue. Not vanity metrics like impressions and likes.',
    },
  ];

  // Journey timeline
  const journey = [
    {
      year: '2014',
      title: 'The Beginning',
      description: 'Started in Indore with 3 founders and a vision to provide honest digital marketing services to local businesses. First office in Vijay Nagar.',
    },
    {
      year: '2017',
      title: 'Building Expertise',
      description: 'Team grew to 15+ members. Expanded services to include branding and web development. Started building our reputation through client referrals.',
    },
    {
      year: '2020',
      title: 'Professional Recognition',
      description: 'Expanded service offerings and capabilities. Built strong portfolio with 60+ websites and 74+ campaigns. Invested in professional tools and training for the team.',
    },
    {
      year: '2024',
      title: 'Established Agency',
      description: '7 years of experience, 96+ clients served, 100+ brands managed. Known in Indore for transparent practices and realistic expectations.',
    },
  ];

  // Difference factors - Updated for BentoGrid2 uniform mode
  const differenceFactors = [
    { label: 'Honest Timelines', sublabel: 'SEO takes months, not weeks' },
    { label: 'Fixed Pricing', sublabel: 'No negotiation games' },
    { label: 'Strategic Planning', sublabel: 'Not just task execution' },
    { label: 'Quality Work', sublabel: 'Takes time to do right' },
    { label: 'Open Communication', sublabel: 'Share good and bad news' },
    { label: 'Responsive Support', sublabel: 'Regular check-ins' },
  ];

  // Team stats - Already compatible with BentoGrid2 uniform mode
  const teamStats = [
    { number: '8', label: 'Strategists', sublabel: 'Strategy Team', description: 'Marketing strategists and analysts who develop data-informed strategies and track performance.' },
    { number: '15', label: 'Designers', sublabel: 'Creative Team', description: 'Graphic designers, video editors, and content creators who develop professional creative assets.' },
    { number: '12', label: 'Developers', sublabel: 'Tech Team', description: 'Full-stack developers and SEO specialists building websites and implementing technical improvements.' },
    { number: '10', label: 'Marketers', sublabel: 'Marketing Team', description: 'Digital marketers managing campaigns across search, social, and email channels.' },
    { number: '5', label: 'Account Managers', sublabel: 'Client Success', description: 'Dedicated managers ensuring clear communication and project coordination.' },
    { number: '3', label: 'Founders', sublabel: 'Leadership', description: 'Agency founders with 7 years of combined experience guiding strategic direction.' },
  ];

  // Stats
  const stats = [
    { number: '96+', label: 'Clients Served' },
    { number: '100+', label: 'Brands Managed' },
    { number: '60+', label: 'Websites Built' },
    { number: '74+', label: 'Marketing Campaigns' },
    { number: '12+', label: 'Industries' },
    { number: '7', label: 'Years Experience' },
    { number: '13+', label: 'International Campaigns' },
    { number: '100%', label: 'Commitment' },
  ];

  // Why choose us reasons - Updated for BentoGrid2 uniform mode
  const whyChooseReasons = [
    {
      icon: Target,
      label: 'Realistic Expectations',
      description: 'We tell you upfront what\'s achievable and how long it will take.',
    },
    {
      icon: CheckCircle,
      label: 'Complete Transparency',
      description: 'Detailed reporting, open communication, and honest feedback about what\'s working.',
    },
    {
      icon: Trophy,
      label: 'Proven Experience',
      description: '96+ clients served, 74+ campaigns delivered, 7 years in business.',
    },
    {
      icon: Users,
      label: 'Dedicated Team',
      description: 'Experienced specialists assigned to your account, not junior staff.',
    },
    {
      icon: Sparkles,
      label: 'Continuous Learning',
      description: 'We stay updated on industry changes and platform updates through ongoing training.',
    },
    {
      icon: Heart,
      label: 'Partnership Mindset',
      description: 'We succeed when you succeed. Long-term relationships, not transactional projects.',
    },
  ];

  // Process steps - Updated for BentoGrid2 uniform mode
  const processSteps = [
    {
      number: '01',
      label: 'Discovery & Research',
      description: 'Understanding your business, goals, audience, and competitive landscape. Initial audit of existing marketing efforts.',
    },
    {
      number: '02',
      label: 'Strategy & Proposal',
      description: 'Detailed plan with realistic timelines, clear deliverables, KPIs, and transparent pricing. Setting proper expectations from the start.',
    },
    {
      number: '03',
      label: 'Creative Development',
      description: 'Developing content, designs, and campaigns. Quality takes time - we don\'t rush the creative process.',
    },
    {
      number: '04',
      label: 'Implementation',
      description: 'Careful rollout with testing and monitoring. We start conservatively and scale based on performance.',
    },
    {
      number: '05',
      label: 'Monitoring & Optimization',
      description: 'Regular analysis, monthly reporting, and ongoing refinements based on real performance data.',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: 'Appreciated their honesty from day one. They told us SEO would take 4-6 months, and they were right. Now we have consistent organic traffic. Great communication throughout.',
      name: 'Rajesh Kumar',
      title: 'CEO, Tech Innovations Ltd',
    },
    {
      quote: 'No overpromising, just steady results. They set realistic expectations and delivered on every commitment. Their monthly reports are detailed and easy to understand.',
      name: 'Priya Sharma',
      title: 'Marketing Director, Fashion Hub',
    },
    {
      quote: 'Finally found an agency that speaks plain language. They explain everything clearly and are always available for questions. Worth the investment.',
      name: 'Amit Patel',
      title: 'Founder, Real Estate Pro',
    },
    {
      quote: 'Most transparent agency we\'ve worked with. They share both wins and challenges. Honest about what\'s working and what needs adjustment.',
      name: 'Sneha Jain',
      title: 'Director, Healthcare Solutions',
    },
  ];

  return (
    <div>
      {/* ⚠️ REMOVED bg-black - Using body background with grid pattern */}
      {/* SEO Meta Tags - Auto-loaded from centralized config */}
      <SEOHeadSSG {...seo.meta} />
      
      {/* Structured Data */}
      <StructuredData 
        schema={[
          organizationSchema,
          getWebPageSchema(seo.meta.title, seo.meta.description, '/about', breadcrumbs),
          getBreadcrumbSchema(breadcrumbs),
        ]} 
      />
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} showHomeIcon={true} />
      
      {/* Hero Section with 3D Earth Globe */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 md:min-h-[100vh] flex flex-col justify-center relative overflow-hidden">
        {/* Outlined Background Text - Top Center (Static) */}
        <div 
          className="absolute top-[8%] left-1/2 -translate-x-1/2 text-[10rem] md:text-[14rem] pointer-events-none font-bold text-outlined-visible-full select-none whitespace-nowrap"
          aria-hidden="true"
        >
          OUR STORY
        </div>

        {/* 🌍 3D EARTH GLOBE - Floating on Right Side (Desktop) / Top (Mobile) ⭐ LARGER SIZE */}
        <div className="absolute top-[15%] md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[3%] pointer-events-none z-0 opacity-50 md:opacity-100">
          <AnimatedSection animation="fadeIn" delay={0.6}>
            {/* Mobile: 350px (+70px), Desktop: 550px (+130px) - Using responsive classes ⭐ INCREASED */}
            <div className="block md:hidden">
              <EarthGlobe 
                size={350}
                particleCount={800}
                rotationSpeed={0.0008}
                glowIntensity={0.4}
                className="animate-float"
              />
            </div>
            <div className="hidden md:block">
              <EarthGlobe 
                size={550}
                particleCount={800}
                rotationSpeed={0.0008}
                glowIntensity={0.4}
                className="animate-float"
              />
            </div>
          </AnimatedSection>
        </div>
        
        <div className="max-w-5xl mx-auto text-center md:text-left md:mr-auto md:ml-0 relative z-10">
          {/* P: Guidelines-compliant lead text */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <p className="leading-relaxed mb-6 text-gray-300" style={{ fontSize: 50, lineHeight: 1.6 }}>Hello</p>
          </AnimatedSection>
          {/* H1: SEO-optimized using seoConfig */}
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <h1 className="text-[30px] md:text-[36px] font-medium tracking-tight mb-8 leading-[1.3]">
              {seo.h1}
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-4 max-w-3xl md:max-w-2xl mx-auto md:mx-0" style={{ lineHeight: 1.6 }}>
              Not just another agency to compare estimates
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <p className="text-[0.9375rem] leading-relaxed text-gray-400 mb-8" style={{ lineHeight: 1.6 }}>
              Ask us for work samples to evaluate quality
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={0.5}>
            <p className="text-[0.9375rem] leading-relaxed text-yellow-500 font-medium" style={{ lineHeight: 1.6 }}>
              Professional work. Honest communication. Realistic timelines.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* WHO WE ARE Section */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="IDENTITY" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Section Label: Use p tag with Caption styling */}
            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">WHO WE ARE</p>
            {/* H2: Animated gradient auto-applied with explicit sizing */}
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              Your Partners in Digital Growth
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 max-w-4xl mx-auto mb-16 text-center" style={{ lineHeight: 1.6 }}>
              Inchtomilez is a digital marketing agency based in Indore, Madhya Pradesh. We provide <span className="text-yellow-500 font-semibold">transparent, results-focused services</span> to businesses that value honest partnerships and sustainable growth.
            </p>

            <BentoGrid2 
              cards={whoWeAreFeatures}
              mode="uniform"
              columns={3}
              showCTA={false}
              ariaLabel="Who we are features"
            />
          </div>
        </div>
      </section>

      {/* We Believe In Growth That Is Measurable */}
      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="GROWTH" 
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              We Focus on Sustainable Growth
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              We build strategies for the <span className="text-yellow-500 font-semibold">long term</span>, not quick wins. Results compound over time with consistent effort and optimization.
            </p>

            <BentoGrid2 
              cards={growthPrinciples}
              mode="uniform"
              columns={4}
              showCTA={false}
              ariaLabel="Growth principles"
            />
          </div>
        </div>
      </section>

      {/* We Keep Things Simple */}
      <section className="py-16 md:py-24 relative">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="SIMPLICITY" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              We Keep Things Simple
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Clear communication. <span className="text-yellow-500 font-semibold">Transparent pricing.</span> Simple processes. No confusion or surprises.
            </p>

            <BentoGrid2 
              cards={simplePrinciples}
              mode="uniform"
              columns={4}
              showCTA={false}
              ariaLabel="Simple principles"
            />
          </div>
        </div>
      </section>

      {/* OUR JOURNEY */}
      <section className="py-16 md:py-24 relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="JOURNEY" 
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto relative z-10">
            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">OUR JOURNEY</p>
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-16 text-center">
              From Inches to Miles — Our Story
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 hidden md:block"></div>

              <div className="space-y-12">
                {journey.map((item, index) => (
                  <div key={item.year} className="relative flex gap-8 items-start">
                    {/* Year badge */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold relative z-10">
                      {item.year}
                    </div>

                    {/* Content */}
                    <div className="flex-1 glass-card p-6">
                      <h4 className="text-lg font-medium mb-2 leading-[1.4]">{item.title}</h4>
                      <p className="text-[0.8125rem] text-gray-400 leading-relaxed" style={{ lineHeight: 1.6 }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="UNIQUE" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-16 text-center">
              What Makes Us Different
            </h2>

            <BentoGrid2 
              cards={differenceFactors}
              mode="uniform"
              columns={3}
              showCTA={false}
              ariaLabel="What makes us different"
            />
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="py-16 md:py-24 relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="TEAM" 
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">OUR TEAM</p>
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              50+ Professionals Working for You
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Our team includes <span className="text-yellow-500 font-semibold">experienced specialists</span> across strategy, creative, development, and marketing.
            </p>

            <BentoGrid2 
              cards={teamStats}
              mode="uniform"
              columns={3}
              showCTA={false}
              ariaLabel="Our team structure"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-16 text-center">
              Our Track Record
            </h2>

            <BentoGrid2 
              cards={stats}
              mode="uniform"
              columns={4}
              showCTA={false}
              ariaLabel="Our track record statistics"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">WHY CHOOSE US</p>
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-16 text-center">
              Why Work With Us
            </h2>

            <BentoGrid2 
              cards={whyChooseReasons}
              mode="uniform"
              columns={3}
              showCTA={false}
              ariaLabel="Why choose us"
            />
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">HOW WE WORK</p>
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              Our Process
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              A <span className="text-yellow-500 font-semibold">systematic approach</span> refined over 7 years and 74+ marketing campaigns.
            </p>

            <BentoGrid2 
              cards={processSteps}
              mode="uniform"
              columns={5}
              showCTA={false}
              ariaLabel="Our process steps"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto mb-12">
            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">CLIENT FEEDBACK</p>
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              What Clients Say About Us
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Honest feedback from <span className="text-yellow-500 font-semibold">real clients</span> about their experience working with us.
            </p>
          </div>

          <AutoCarousel speed="slow">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card min-w-[300px] sm:min-w-[380px] max-w-[420px] flex-shrink-0 snap-center p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6 italic" style={{ lineHeight: 1.6 }}>
                  &quot;{testimonial.quote}&quot;
                </p>
                
                <div className="pt-4 mt-4">
                  <p className="text-[0.9375rem] leading-relaxed font-semibold">{testimonial.name}</p>
                  <p className="text-[0.8125rem] text-yellow-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </AutoCarousel>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong p-8 md:p-12 rounded-2xl text-center">
              <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4">Get Marketing Insights</h2>
              <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
                Join our <span className="text-yellow-500 font-semibold">monthly newsletter</span> for practical tips and industry updates. No spam, just value.
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
                  Subscribe
                </button>
              </form>
              
              <p className="text-[0.8125rem] text-gray-500 mt-4" style={{ lineHeight: 1.6 }}>Unsubscribe anytime. We respect your inbox.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-6">Ready to Discuss Your Project?</h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
              Let&apos;s have an honest conversation about your goals and see if we&apos;re the right fit. <span className="text-yellow-500 font-semibold">Free consultation</span> with no pressure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold shadow-xl hover:shadow-yellow-500/50 hover:scale-105"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="glass-card px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold hover:scale-105"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}