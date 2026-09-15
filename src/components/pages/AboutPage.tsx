import { Link } from 'react-router';
import {
  ArrowRight,
  Award,
  CheckCircle,
  Target,
  TrendingUp,
  Shield,
  Users,
  Star,
  Clock,
  Globe,
  Play,
  Code,
  Palette,
  Camera,
  Trophy,
  Zap,
  BarChart3,
  Heart,
  Sparkles,
  Rocket,
  MapPin,
  BriefcaseBusiness,
  Lightbulb,
  Search,
  Megaphone,
  Monitor,
  Layers3,
  Handshake,
  Building2
} from 'lucide-react';

import { useState } from 'react';

import { AutoCarousel } from '../ui/AutoCarousel';
import { BentoGrid2 } from '../layout/BentoGrid2';
import { OutlinedText } from '../ui/OutlinedText';
import { AnimatedSection } from '../ui/AnimatedSection';
import { EarthGlobe } from '../ui/EarthGlobe';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHeadSSG } from '../SEOHeadSSG';

import {
  useSEO,
  StructuredData,
  organizationSchema,
  getWebPageSchema,
  getBreadcrumbSchema
} from '../../utils/seo-system';


export function AboutPage() {

  const seo = useSEO();

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


  /*
  |--------------------------------------------------------------------------
  | WHO WE ARE
  |--------------------------------------------------------------------------
  */

  const whoWeAreFeatures = [
    {
      icon: Target,
      label: 'Business-First Thinking',
      description:
        'We begin with the business objective, not the marketing channel. Every strategy is shaped around your market, audience, positioning and commercial priorities.',
    },

    {
      icon: Lightbulb,
      label: 'Strategic Creativity',
      description:
        'Creative work should do more than look good. We combine ideas, communication and design to build campaigns and brand experiences with a clear purpose.',
    },

    {
      icon: BarChart3,
      label: 'Performance Mindset',
      description:
        'Marketing decisions are supported by data, testing and meaningful performance indicators so campaigns can continuously improve.',
    },

    {
      icon: Code,
      label: 'Technology Capability',
      description:
        'From high-performance websites and e-commerce experiences to technical SEO and digital infrastructure, technology is an integral part of how we build brands.',
    },

    {
      icon: Handshake,
      label: 'Long-Term Partnerships',
      description:
        'We aim to work as an extension of the businesses we serve — understanding their challenges, opportunities and long-term growth ambitions.',
    },

    {
      icon: Globe,
      label: 'Growing Presence',
      description:
        'Built in Indore and expanding to Pune in September 2026, Inchtomilez continues to grow its reach while maintaining one integrated agency approach.',
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | CORE CAPABILITIES
  |--------------------------------------------------------------------------
  */

  const capabilities = [
    {
      icon: Target,
      label: 'Strategy',
      description:
        'Market understanding, digital strategy, audience planning, campaign architecture, competitive analysis and growth roadmaps.',
    },

    {
      icon: Palette,
      label: 'Creative',
      description:
        'Brand communication, campaign concepts, graphic design, social media creatives, advertising assets and visual storytelling.',
    },

    {
      icon: Megaphone,
      label: 'Performance',
      description:
        'SEO, Google Ads, Meta Ads, lead generation, conversion-focused campaigns and ongoing performance optimization.',
    },

    {
      icon: Monitor,
      label: 'Technology',
      description:
        'Website development, e-commerce, landing pages, technical optimization and digital experiences built around performance.',
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | WORKING PRINCIPLES
  |--------------------------------------------------------------------------
  */

  const workingPrinciples = [
    {
      icon: Search,
      label: 'Understand Before Execution',
      description:
        'Before recommending campaigns or platforms, we understand the business model, customer journey, competition and growth objective.',
    },

    {
      icon: Target,
      label: 'Clear Strategic Direction',
      description:
        'Every engagement should have a defined purpose, measurable priorities and a clear understanding of what success means.',
    },

    {
      icon: CheckCircle,
      label: 'Disciplined Execution',
      description:
        'Strategy only creates value when it is executed properly. We focus on consistency, quality control and attention to detail.',
    },

    {
      icon: TrendingUp,
      label: 'Continuous Improvement',
      description:
        'Marketing is never truly finished. We analyze performance, learn from results and continuously refine what can work better.',
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | VALUES
  |--------------------------------------------------------------------------
  */

  const values = [
    {
      icon: Shield,
      label: 'Clarity',
      description:
        'We communicate what we are doing, why we are doing it and what the business should realistically expect.',
    },

    {
      icon: Award,
      label: 'Quality',
      description:
        'We believe strong work comes from thoughtful planning, skilled execution and attention to the details that influence perception and performance.',
    },

    {
      icon: BarChart3,
      label: 'Accountability',
      description:
        'We believe marketing should connect back to meaningful outcomes rather than existing only as activity or vanity metrics.',
    },

    {
      icon: Users,
      label: 'Collaboration',
      description:
        'The strongest outcomes come when agency expertise and client knowledge work together as one connected team.',
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | WHAT MAKES US DIFFERENT
  |--------------------------------------------------------------------------
  */

  const differenceFactors = [
    {
      label: 'Business Before Channels',
      sublabel: 'We solve the business problem before selecting the marketing platform',
    },

    {
      label: 'Strategy + Execution',
      sublabel: 'Planning and implementation work together under one agency',
    },

    {
      label: 'Creative + Performance',
      sublabel: 'Brand building and measurable marketing are treated as connected disciplines',
    },

    {
      label: 'Marketing + Technology',
      sublabel: 'Campaigns, websites, SEO and digital experiences are built to work together',
    },

    {
      label: 'Clear Communication',
      sublabel: 'Clients should always understand priorities, progress and next steps',
    },

    {
      label: 'Built for Long-Term Growth',
      sublabel: 'We focus on systems and strategies that can continue creating value',
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | SPECIALIST DISCIPLINES
  |--------------------------------------------------------------------------
  */

  const specialistTeams = [
    {
      icon: Target,
      label: 'Strategy & Consulting',
      description:
        'Business understanding, positioning, marketing strategy, campaign planning and growth roadmaps.',
    },

    {
      icon: TrendingUp,
      label: 'Performance Marketing',
      description:
        'Google Ads, Meta Ads, lead generation, campaign management, optimization and performance analysis.',
    },

    {
      icon: Search,
      label: 'SEO & Organic Growth',
      description:
        'Search strategy, technical SEO, content optimization, local visibility and sustainable organic acquisition.',
    },

    {
      icon: Palette,
      label: 'Creative & Branding',
      description:
        'Brand identity, graphic design, advertising creatives, communication systems and campaign concepts.',
    },

    {
      icon: Code,
      label: 'Web & Technology',
      description:
        'Websites, landing pages, e-commerce development, digital infrastructure and conversion-focused experiences.',
    },

    {
      icon: Handshake,
      label: 'Client Success',
      description:
        'Project coordination, communication, reporting and continuous alignment between agency execution and business goals.',
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | TRACK RECORD
  |--------------------------------------------------------------------------
  */

  const stats = [
    {
      number: '96+',
      label: 'Clients Served',
    },

    {
      number: '100+',
      label: 'Brands Worked With',
    },

    {
      number: '60+',
      label: 'Websites Delivered',
    },

    {
      number: '74+',
      label: 'Marketing Campaigns',
    },

    {
      number: '12+',
      label: 'Industries',
    },

    {
      number: '13+',
      label: 'International Campaigns',
    },

    {
      number: '2',
      label: 'City Presence',
    },

    {
      number: '1',
      label: 'Integrated Agency',
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | WHY CHOOSE US
  |--------------------------------------------------------------------------
  */

  const whyChooseReasons = [
    {
      icon: BriefcaseBusiness,
      label: 'Commercial Understanding',
      description:
        'We look beyond impressions and clicks to understand how marketing connects with the wider business.',
    },

    {
      icon: Layers3,
      label: 'Integrated Capabilities',
      description:
        'Strategy, creative, performance marketing, SEO and technology can work together instead of operating in separate silos.',
    },

    {
      icon: Trophy,
      label: 'Hands-On Experience',
      description:
        'Our approach has been shaped through practical execution across businesses, campaigns, websites and multiple industries.',
    },

    {
      icon: Zap,
      label: 'Agile Execution',
      description:
        'We respond to performance, market changes and new opportunities without losing sight of the larger strategy.',
    },

    {
      icon: BarChart3,
      label: 'Measurable Progress',
      description:
        'We prioritize meaningful business metrics and continuous optimization over activity for the sake of activity.',
    },

    {
      icon: Heart,
      label: 'Partnership Mindset',
      description:
        'We aim to build relationships in which the agency grows alongside the businesses and brands it supports.',
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | PROCESS
  |--------------------------------------------------------------------------
  */

  const processSteps = [
    {
      number: '01',
      label: 'Discover',
      description:
        'We understand the business, audience, market, competition, existing digital presence and the problem that needs to be solved.',
    },

    {
      number: '02',
      label: 'Strategize',
      description:
        'We define priorities, channels, positioning, campaign direction, deliverables, performance indicators and the execution roadmap.',
    },

    {
      number: '03',
      label: 'Create',
      description:
        'Strategy is translated into campaigns, content, designs, websites, landing pages and communication assets.',
    },

    {
      number: '04',
      label: 'Execute',
      description:
        'Campaigns and digital initiatives are launched systematically with proper implementation, testing and quality control.',
    },

    {
      number: '05',
      label: 'Measure & Scale',
      description:
        'Performance is reviewed continuously so successful initiatives can be optimized, improved and scaled intelligently.',
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | INDUSTRIES
  |--------------------------------------------------------------------------
  */

  const industries = [
    {
      label: 'Healthcare',
      sublabel: 'Clinics, hospitals, doctors, healthcare services and wellness brands',
    },

    {
      label: 'Real Estate',
      sublabel: 'Developers, commercial properties, residential projects and property marketing',
    },

    {
      label: 'Education',
      sublabel: 'Institutions, education brands, professional programs and learning businesses',
    },

    {
      label: 'E-Commerce',
      sublabel: 'Online stores, product brands, marketplaces and direct-to-consumer businesses',
    },

    {
      label: 'Automotive',
      sublabel: 'Automotive businesses, products, services and customer acquisition campaigns',
    },

    {
      label: 'Professional Services',
      sublabel: 'Consulting, service businesses, B2B organizations and growing enterprises',
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | TESTIMONIALS
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  | Replace these only with verified real client testimonials.
  |
  */

  const testimonials = [
    {
      quote:
        'What we value most is the ability to look at marketing from both a business and execution perspective. Communication remains clear and the team stays focused on practical improvements.',
      name: 'Client Partner',
      title: 'Business & Marketing Collaboration',
    },

    {
      quote:
        'The approach is structured, practical and focused on building the digital presence properly rather than chasing short-term activity.',
      name: 'Client Partner',
      title: 'Digital Growth Engagement',
    },

    {
      quote:
        'From creative work to digital campaigns and website execution, having multiple capabilities coordinated together makes the overall process much more effective.',
      name: 'Client Partner',
      title: 'Integrated Digital Engagement',
    },
  ];


  return (

    <div>

      {/* ================================================================ */}
      {/* SEO */}
      {/* ================================================================ */}

      <SEOHeadSSG {...seo.meta} />


      <StructuredData
        data={[
          organizationSchema,

          getWebPageSchema(
            seo.meta.title,
            seo.meta.description,
            '/about',
            breadcrumbs
          ),

          getBreadcrumbSchema(breadcrumbs),
        ]}
      />


      {/* ================================================================ */}
      {/* BREADCRUMBS */}
      {/* ================================================================ */}

      <Breadcrumbs
        items={breadcrumbs}
        showHomeIcon={true}
      />


      {/* ================================================================ */}
      {/* HERO */}
      {/* ================================================================ */}

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 md:min-h-[100vh] flex flex-col justify-center relative overflow-hidden">


        {/* Background typography */}

        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 text-[10rem] md:text-[14rem] pointer-events-none font-bold text-outlined-visible-full select-none whitespace-nowrap"
          aria-hidden="true"
        >
          OUR STORY
        </div>


        {/* Earth Globe */}

        <div className="absolute top-[15%] md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[3%] pointer-events-none z-0 opacity-50 md:opacity-100">

          <AnimatedSection animation="fadeIn" delay={0.6}>

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


          <AnimatedSection animation="fadeInUp" delay={0.1}>

            <p
              className="leading-relaxed mb-6 text-gray-300"
              style={{
                fontSize: 50,
                lineHeight: 1.6
              }}
            >
              Hello.
            </p>

          </AnimatedSection>


          <AnimatedSection animation="fadeInUp" delay={0.2}>

            <h1 className="text-[30px] md:text-[36px] font-medium tracking-tight mb-8 leading-[1.3]">
              {seo.h1}
            </h1>

          </AnimatedSection>


          <AnimatedSection animation="fadeInUp" delay={0.3}>

            <p
              className="text-[1rem] md:text-[1.0625rem] leading-relaxed text-gray-300 mb-5 max-w-3xl md:max-w-2xl mx-auto md:mx-0"
              style={{ lineHeight: 1.7 }}
            >
              We are an independent digital marketing and advertising agency
              bringing together
              <span className="text-yellow-500 font-semibold">
                {' '}strategy, creativity, performance and technology
              </span>
              {' '}to help businesses move forward.
            </p>

          </AnimatedSection>


          <AnimatedSection animation="fadeInUp" delay={0.4}>

            <p
              className="text-[0.9375rem] leading-relaxed text-gray-400 mb-8 max-w-3xl md:max-w-2xl mx-auto md:mx-0"
              style={{ lineHeight: 1.7 }}
            >
              Founded by Aman Panwar in Indore and expanding to Pune in
              September 2026, Inchtomilez continues to grow with one clear
              objective — building stronger brands and better digital
              businesses.
            </p>

          </AnimatedSection>


          <AnimatedSection animation="fadeInUp" delay={0.5}>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

              <Link
                to="/services"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold shadow-lg hover:shadow-yellow-500/30 hover:scale-105"
              >
                Explore Our Services

                <ArrowRight className="w-5 h-5" />
              </Link>


              <Link
                to="/contact"
                className="glass-card px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold hover:scale-105"
              >
                Talk to Our Team
              </Link>

            </div>

          </AnimatedSection>

        </div>

      </section>


      {/* ================================================================ */}
      {/* WHO WE ARE */}
      {/* ================================================================ */}

      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative">


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


            <AnimatedSection animation="fadeInUp" delay={0.1}>

              <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
                WHO WE ARE
              </p>

            </AnimatedSection>


            <AnimatedSection animation="fadeInUp" delay={0.2}>

              <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
                Strategy, Creativity & Technology Under One Roof
              </h2>

            </AnimatedSection>


            <AnimatedSection animation="fadeInUp" delay={0.3}>

              <p
                className="text-[0.9375rem] leading-relaxed text-gray-300 max-w-4xl mx-auto mb-16 text-center"
                style={{ lineHeight: 1.7 }}
              >
                Inchtomilez is a
                <span className="text-yellow-500 font-semibold">
                  {' '}founder-led digital marketing and advertising agency
                </span>
                {' '}working across strategy, branding, performance marketing,
                SEO, content, creative, website development and digital
                technology.
              </p>

            </AnimatedSection>


            <BentoGrid2
              cards={whoWeAreFeatures}
              mode="uniform"
              columns={3}
              showCTA={false}
              ariaLabel="Who we are"
            />

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* FOUNDER */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24 relative overflow-hidden">


        <OutlinedText
          text="FOUNDER"
          className="absolute top-[18%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-5xl mx-auto relative z-10">


            <AnimatedSection animation="fadeInUp" delay={0.1}>

              <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
                FOUNDER&apos;S STORY
              </p>

            </AnimatedSection>


            <AnimatedSection animation="fadeInUp" delay={0.2}>

              <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-10 text-center">
                Built From Experience. Driven by Execution.
              </h2>

            </AnimatedSection>


            <AnimatedSection animation="fadeInUp" delay={0.3}>

              <div className="glass-strong rounded-2xl p-8 md:p-12">

                <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-14 items-center">


                  {/* Founder identity */}

                  <div>

                    <p className="text-yellow-500 text-[13px] font-medium uppercase tracking-wide mb-4">
                      Founder
                    </p>


                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                      Aman Panwar
                    </h3>


                    <p className="text-[0.9375rem] text-gray-400 leading-relaxed mb-6">
                      Founder — Inchtomilez Digital Marketing & Advertising Agency
                    </p>


                    <div className="space-y-3 text-[0.8125rem] text-gray-400">

                      <div className="flex items-start gap-3">

                        <CheckCircle className="w-4 h-4 mt-1 text-yellow-500 flex-shrink-0" />

                        <span>
                          Hands-on background in website development and SEO
                        </span>

                      </div>


                      <div className="flex items-start gap-3">

                        <CheckCircle className="w-4 h-4 mt-1 text-yellow-500 flex-shrink-0" />

                        <span>
                          Experience across strategy, search, advertising and digital growth
                        </span>

                      </div>


                      <div className="flex items-start gap-3">

                        <CheckCircle className="w-4 h-4 mt-1 text-yellow-500 flex-shrink-0" />

                        <span>
                          Built Inchtomilez from Indore into an expanding multi-city agency
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* Founder story */}

                  <div>

                    <p
                      className="text-[0.9375rem] text-gray-300 leading-relaxed mb-5"
                      style={{ lineHeight: 1.8 }}
                    >
                      Inchtomilez began with one founder — Aman Panwar — and a
                      hands-on understanding of how websites, search visibility,
                      digital marketing and business growth connect.
                    </p>


                    <p
                      className="text-[0.9375rem] text-gray-300 leading-relaxed mb-5"
                      style={{ lineHeight: 1.8 }}
                    >
                      What started as focused digital work in Indore gradually
                      evolved into an integrated agency capable of supporting
                      brands across strategy, creative, performance marketing,
                      branding, SEO, technology and digital experiences.
                    </p>


                    <p
                      className="text-[0.9375rem] text-gray-300 leading-relaxed"
                      style={{ lineHeight: 1.8 }}
                    >
                      The philosophy remains practical: understand the business
                      first, build the right strategy, execute with discipline,
                      measure what matters and continuously improve.
                    </p>

                  </div>

                </div>


                {/* Founder Quote */}

                <div className="mt-10 pt-10 border-t border-white/10">

                  <p className="text-xl md:text-2xl font-medium text-white leading-relaxed text-center">
                    “Duniya Brands Ke Peeche,
                    <span className="text-yellow-500">
                      {' '}Aur Brands Marketing Ke Peeche.
                    </span>
                    ”
                  </p>


                  <p className="text-[0.8125rem] text-gray-500 text-center mt-4">
                    — Aman Panwar, Founder — Inchtomilez
                  </p>

                </div>

              </div>

            </AnimatedSection>

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* CAPABILITIES */}
      {/* ================================================================ */}

      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative">


        <OutlinedText
          text="CAPABILITY"
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />


        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">

          <div className="max-w-6xl mx-auto relative z-10">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              WHAT WE BRING TOGETHER
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              Four Disciplines. One Growth Engine.
            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              The strongest digital businesses are rarely built through a
              single channel. We connect
              <span className="text-yellow-500 font-semibold">
                {' '}strategy, creative, performance and technology
              </span>
              {' '}so every discipline supports the next.
            </p>


            <BentoGrid2
              cards={capabilities}
              mode="uniform"
              columns={4}
              showCTA={false}
              ariaLabel="Agency capabilities"
            />

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* HOW WE THINK */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24 relative">


        <OutlinedText
          text="THINKING"
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto relative z-10">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              HOW WE THINK
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              Marketing Should Start With Understanding
            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              Better execution begins with better questions. We try to
              understand the business before deciding what the business should
              advertise, build or optimize.
            </p>


            <BentoGrid2
              cards={workingPrinciples}
              mode="uniform"
              columns={4}
              showCTA={false}
              ariaLabel="How we work"
            />

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* OUR VALUES */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24 relative">


        <OutlinedText
          text="VALUES"
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto relative z-10">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              OUR VALUES
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              The Principles Behind the Work
            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              Good agency relationships are built through
              <span className="text-yellow-500 font-semibold">
                {' '}clarity, accountability, quality and collaboration.
              </span>
            </p>


            <BentoGrid2
              cards={values}
              mode="uniform"
              columns={4}
              showCTA={false}
              ariaLabel="Agency values"
            />

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* INDore + Pune EXPANSION */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24 relative overflow-hidden">


        <OutlinedText
          text="EXPANSION"
          className="absolute top-[15%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto relative z-10">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              OUR PRESENCE
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              Built in Indore. Expanding to Pune.
            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              September 2026 marks an important step for Inchtomilez as we
              expand our presence into Pune while continuing to strengthen the
              agency built in Indore.
            </p>


            <div className="grid md:grid-cols-2 gap-6">


              {/* Indore */}

              <AnimatedSection animation="fadeInUp" delay={0.1}>

                <div className="glass-strong rounded-2xl p-8 md:p-10 h-full">

                  <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center mb-6">

                    <Building2 className="w-6 h-6 text-black" />

                  </div>


                  <p className="text-[13px] uppercase tracking-wide text-yellow-500 font-medium mb-3">
                    Our Foundation
                  </p>


                  <h3 className="text-xl font-semibold text-white mb-4">
                    Indore
                  </h3>


                  <p
                    className="text-[0.9375rem] text-gray-300 mb-6"
                    style={{ lineHeight: 1.7 }}
                  >
                    Indore is where Inchtomilez was founded, built and shaped.
                    It remains an important operational base and the foundation
                    of our agency culture.
                  </p>


                  <div className="flex items-start gap-3 text-[0.8125rem] text-gray-400">

                    <MapPin className="w-4 h-4 mt-1 text-yellow-500 flex-shrink-0" />

                    <span>
                      Vijay Nagar,
                      <br />
                      Indore, Madhya Pradesh
                    </span>

                  </div>

                </div>

              </AnimatedSection>


              {/* Pune */}

              <AnimatedSection animation="fadeInUp" delay={0.2}>

                <div className="glass-strong rounded-2xl p-8 md:p-10 h-full">

                  <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center mb-6">

                    <Rocket className="w-6 h-6 text-black" />

                  </div>


                  <p className="text-[13px] uppercase tracking-wide text-yellow-500 font-medium mb-3">
                    September 2026
                  </p>


                  <h3 className="text-xl font-semibold text-white mb-4">
                    Pune
                  </h3>


                  <p
                    className="text-[0.9375rem] text-gray-300 mb-6"
                    style={{ lineHeight: 1.7 }}
                  >
                    Our Pune expansion brings Inchtomilez closer to one of
                    India&apos;s most active ecosystems across technology,
                    healthcare, real estate, education, manufacturing,
                    professional services and growing businesses.
                  </p>


                  <div className="flex items-start gap-3 text-[0.8125rem] text-gray-400">

                    <MapPin className="w-4 h-4 mt-1 text-yellow-500 flex-shrink-0" />

                    <span>
                      Gera&apos;s Imperium Gateway,
                      <br />
                      Nashik Phata, Pimpri-Chinchwad, Pune
                    </span>

                  </div>

                </div>

              </AnimatedSection>

            </div>


            <AnimatedSection animation="fadeInUp" delay={0.3}>

              <p
                className="text-[0.9375rem] leading-relaxed text-gray-400 mt-10 text-center max-w-4xl mx-auto"
                style={{ lineHeight: 1.7 }}
              >
                Two cities. One agency. One connected approach to strategy,
                creative, technology and performance.
              </p>

            </AnimatedSection>

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* WHAT MAKES US DIFFERENT */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24 relative overflow-hidden">


        <OutlinedText
          text="DIFFERENT"
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto relative z-10">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              WHY INCHTOMILEZ
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-16 text-center">
              What Makes Our Approach Different
            </h2>


            <BentoGrid2
              cards={differenceFactors}
              mode="uniform"
              columns={3}
              showCTA={false}
              ariaLabel="What makes Inchtomilez different"
            />

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* SPECIALISTS */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24 relative">


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

          <div className="max-w-6xl mx-auto relative z-10">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              OUR EXPERTISE
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              Specialists Across the Digital Ecosystem
            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              Different challenges require different expertise. Our work spans
              multiple disciplines that can operate independently or come
              together as one integrated engagement.
            </p>


            <BentoGrid2
              cards={specialistTeams}
              mode="uniform"
              columns={3}
              showCTA={false}
              ariaLabel="Agency expertise"
            />

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* STATS */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              OUR TRACK RECORD
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              Experience Built Through Execution
            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              Every website, campaign and client engagement has contributed to
              the knowledge and systems we use today.
            </p>


            <BentoGrid2
              cards={stats}
              mode="uniform"
              columns={4}
              showCTA={false}
              ariaLabel="Inchtomilez track record"
            />

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* INDUSTRIES */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24 relative">


        <OutlinedText
          text="INDUSTRIES"
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto relative z-10">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              INDUSTRY EXPERIENCE
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              Different Markets. Different Challenges.
            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              There is no universal marketing formula. Strategy should reflect
              the economics, buying behavior and competitive dynamics of each
              industry.
            </p>


            <BentoGrid2
              cards={industries}
              mode="uniform"
              columns={3}
              showCTA={false}
              ariaLabel="Industries we work with"
            />


            <div className="text-center mt-10">

              <Link
                to="/industries"
                className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors text-[0.9375rem] font-medium"
              >
                Explore Industries

                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* WHY CHOOSE US */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              WHY WORK WITH US
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-16 text-center">
              More Than Marketing Execution
            </h2>


            <BentoGrid2
              cards={whyChooseReasons}
              mode="uniform"
              columns={3}
              showCTA={false}
              ariaLabel="Why choose Inchtomilez"
            />

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* PROCESS */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              HOW WE WORK
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              From Understanding to Scale
            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              A structured process keeps strategy, creativity and execution
              connected from the first conversation to ongoing optimization.
            </p>


            <BentoGrid2
              cards={processSteps}
              mode="uniform"
              columns={5}
              showCTA={false}
              ariaLabel="Our process"
            />

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* CLIENT PERSPECTIVE */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24 overflow-hidden">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">


          <div className="max-w-6xl mx-auto mb-12">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">
              CLIENT PERSPECTIVE
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">
              Built Around Strong Working Relationships
            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              Strong agency relationships depend on communication, alignment,
              consistent execution and a shared understanding of the business
              objective.
            </p>

          </div>


          <AutoCarousel speed="slow">

            {testimonials.map((testimonial, index) => (

              <div
                key={index}
                className="glass-card min-w-[300px] sm:min-w-[380px] max-w-[420px] flex-shrink-0 snap-center p-6"
              >

                <div className="flex gap-1 mb-4">

                  {[...Array(5)].map((_, i) => (

                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                    />

                  ))}

                </div>


                <p
                  className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6 italic"
                  style={{ lineHeight: 1.7 }}
                >
                  &quot;{testimonial.quote}&quot;
                </p>


                <div className="pt-4 mt-4 border-t border-white/10">

                  <p className="text-[0.9375rem] leading-relaxed font-semibold">
                    {testimonial.name}
                  </p>

                  <p className="text-[0.8125rem] text-yellow-500">
                    {testimonial.title}
                  </p>

                </div>

              </div>

            ))}

          </AutoCarousel>

        </div>

      </section>


      {/* ================================================================ */}
      {/* NEWSLETTER */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-4xl mx-auto">


            <div className="glass-strong p-8 md:p-12 rounded-2xl text-center">


              <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4">
                Ideas Worth Taking Back to Your Business
              </h2>


              <p
                className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-2xl mx-auto"
                style={{ lineHeight: 1.7 }}
              >
                Join our newsletter for practical perspectives on marketing,
                advertising, branding, SEO, technology and digital growth.
              </p>


              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >

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


              <p className="text-[0.8125rem] text-gray-500 mt-4">
                Unsubscribe anytime. We respect your inbox.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================ */}
      {/* FINAL CTA */}
      {/* ================================================================ */}

      <section className="py-16 md:py-24">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-4xl mx-auto text-center">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6">
              LET&apos;S BUILD WHAT&apos;S NEXT
            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-6">
              Your Next Mile Starts Here.
            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto"
              style={{ lineHeight: 1.7 }}
            >
              Whether you&apos;re building a new brand, improving an existing
              digital presence, generating demand or looking for a long-term
              marketing partner, we&apos;d like to understand where you want
              the business to go next.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center">


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
                Explore Our Services
              </Link>


            </div>

          </div>

        </div>

      </section>


    </div>
  );
}
