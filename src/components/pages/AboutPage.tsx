import { Link } from 'react-router';

import {
  ArrowRight,
  Award,
  CheckCircle,
  Target,
  TrendingUp,
  Shield,
  Users,
  Globe,
  Code,
  Palette,
  Trophy,
  Zap,
  BarChart3,
  Heart,
  Sparkles,
  Rocket,
  MapPin,
  Megaphone,
  Search,
  Handshake,
  Building2
} from 'lucide-react';

import { useState } from 'react';

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


  /*
  |--------------------------------------------------------------------------
  | BREADCRUMBS
  |--------------------------------------------------------------------------
  */

  const breadcrumbs = [
    {
      name: 'Home',
      path: '/'
    },

    {
      name: 'About',
      path: '/about'
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | NEWSLETTER
  |--------------------------------------------------------------------------
  */

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
      icon: Rocket,

      label: 'Our Purpose',

      description:
        'To help businesses build stronger brands, smarter digital systems and sustainable growth through connected strategy, creativity, marketing and technology.',
    },

    {
      icon: Target,

      label: 'Our Vision',

      description:
        'To build an independent Indian agency known for strategic thinking, quality execution, clear communication and long-term business partnerships.',
    },

    {
      icon: Award,

      label: 'Our Approach',

      description:
        'We understand the business first. Then we decide what combination of strategy, creative, media, SEO, technology and execution can move it forward.',
    },

    {
      icon: Users,

      label: 'Founder-Led',

      description:
        'Inchtomilez was founded by Aman Panwar in Indore and continues to grow with a hands-on, business-first approach to digital marketing and advertising.',
    },

    {
      icon: Globe,

      label: 'Our Presence',

      description:
        'Built in Indore and expanding into Pune in September 2026, we work with businesses across industries, markets and digital growth stages.',
    },

    {
      icon: Trophy,

      label: 'Our Commitment',

      description:
        'Every engagement should create meaningful progress — stronger positioning, better digital experiences, measurable marketing and smarter business decisions.',
    },

  ];


  /*
  |--------------------------------------------------------------------------
  | WHAT DRIVES GROWTH
  |--------------------------------------------------------------------------
  */

  const growthPrinciples = [

    {
      icon: Target,

      label: 'Strategy',

      description:
        'We define the business objective, understand the market, study the audience and build a clear direction before execution begins.',
    },

    {
      icon: Palette,

      label: 'Creative',

      description:
        'Brand communication, campaign concepts, visual design and content should earn attention while strengthening how the business is perceived.',
    },

    {
      icon: TrendingUp,

      label: 'Performance',

      description:
        'Search, paid media, lead generation and digital campaigns are continuously measured, tested and optimized around meaningful outcomes.',
    },

    {
      icon: Code,

      label: 'Technology',

      description:
        'Websites, landing pages, e-commerce and digital experiences form the infrastructure that turns marketing attention into business opportunity.',
    },

  ];


  /*
  |--------------------------------------------------------------------------
  | HOW WE WORK
  |--------------------------------------------------------------------------
  */

  const workingPrinciples = [

    {
      icon: Search,

      label: 'Understand First',

      description:
        'Before recommending channels or budgets, we understand the business model, customer journey, competition and actual growth objective.',
    },

    {
      icon: Shield,

      label: 'Communicate Clearly',

      description:
        'Clients should understand what is being done, why it matters, what the priorities are and what happens next.',
    },

    {
      icon: CheckCircle,

      label: 'Execute Properly',

      description:
        'Good strategy requires disciplined execution, attention to detail and consistent quality across every customer touchpoint.',
    },

    {
      icon: BarChart3,

      label: 'Improve Continuously',

      description:
        'We use performance data, customer response and market learning to continuously improve campaigns, creative and digital experiences.',
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

      sublabel:
        'We understand the problem before recommending the platform'
    },

    {
      label: 'Strategy + Execution',

      sublabel:
        'Planning and implementation remain connected'
    },

    {
      label: 'Creative + Performance',

      sublabel:
        'Brand building and measurable marketing work together'
    },

    {
      label: 'Marketing + Technology',

      sublabel:
        'Campaigns, websites and digital systems support one another'
    },

    {
      label: 'Clear Communication',

      sublabel:
        'You understand priorities, progress and next steps'
    },

    {
      label: 'Long-Term Thinking',

      sublabel:
        'We build systems that can continue creating value'
    },

  ];


  /*
  |--------------------------------------------------------------------------
  | EXPERTISE
  |--------------------------------------------------------------------------
  */

  const expertiseAreas = [

    {
      icon: Target,

      label: 'Strategy & Consulting',

      description:
        'Digital strategy, market understanding, positioning, campaign planning, growth roadmaps and marketing direction.',
    },

    {
      icon: Megaphone,

      label: 'Performance Marketing',

      description:
        'Google Ads, Meta Ads, lead generation, campaign management, optimization and conversion-focused advertising.',
    },

    {
      icon: Search,

      label: 'SEO & Organic Growth',

      description:
        'Technical SEO, local SEO, search strategy, content optimization and sustainable organic visibility.',
    },

    {
      icon: Palette,

      label: 'Creative & Branding',

      description:
        'Brand identity, campaign creative, graphic design, social content, advertising assets and visual communication.',
    },

    {
      icon: Code,

      label: 'Web & Technology',

      description:
        'Business websites, landing pages, e-commerce experiences, development and performance-focused digital infrastructure.',
    },

    {
      icon: Handshake,

      label: 'Client Success',

      description:
        'Clear project coordination, communication, reporting and alignment between agency execution and business priorities.',
    },

  ];


  /*
  |--------------------------------------------------------------------------
  | WHY CHOOSE US
  |--------------------------------------------------------------------------
  */

  const whyChooseReasons = [

    {
      icon: Target,

      label: 'Business-First Thinking',

      description:
        'We focus on what the business needs to achieve before deciding what marketing activity should happen.',
    },

    {
      icon: Sparkles,

      label: 'Integrated Capabilities',

      description:
        'Strategy, creative, performance marketing, SEO and technology can work together as one connected system.',
    },

    {
      icon: Trophy,

      label: 'Hands-On Execution',

      description:
        'Our thinking has been shaped by practical work across websites, campaigns, search, advertising and brand development.',
    },

    {
      icon: Zap,

      label: 'Adaptive Approach',

      description:
        'Markets change. Platforms change. Customer behavior changes. Our strategies evolve with real performance and opportunity.',
    },

    {
      icon: BarChart3,

      label: 'Measurable Progress',

      description:
        'We prioritize meaningful business indicators rather than treating marketing activity itself as the final outcome.',
    },

    {
      icon: Heart,

      label: 'Partnership Mindset',

      description:
        'We aim to become an extension of the businesses we support instead of operating as another disconnected vendor.',
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
        'We understand your business, objectives, audience, competition and current digital presence.',
    },

    {
      number: '02',

      label: 'Strategize',

      description:
        'We define priorities, channels, positioning, creative direction, deliverables and measurable objectives.',
    },

    {
      number: '03',

      label: 'Create',

      description:
        'Strategy becomes campaigns, content, designs, websites, landing pages and communication assets.',
    },

    {
      number: '04',

      label: 'Execute',

      description:
        'Campaigns and digital initiatives are implemented systematically with testing, coordination and quality control.',
    },

    {
      number: '05',

      label: 'Optimize & Scale',

      description:
        'We study performance, improve what works, solve what does not and scale successful initiatives intelligently.',
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

      sublabel:
        'Doctors, clinics, hospitals, healthcare services and wellness brands',
    },

    {
      label: 'Real Estate',

      sublabel:
        'Developers, projects, commercial properties and property marketing',
    },

    {
      label: 'Education',

      sublabel:
        'Institutions, education brands, programs and learning businesses',
    },

    {
      label: 'E-Commerce & Retail',

      sublabel:
        'Online stores, product brands, marketplaces and direct-to-consumer businesses',
    },

    {
      label: 'Automotive',

      sublabel:
        'Automotive businesses, products, services and customer acquisition campaigns',
    },

    {
      label: 'Professional Services',

      sublabel:
        'Consulting, B2B organizations, service businesses and growing enterprises',
    },

  ];


  return (

    <div>


      {/* ================================================================
          SEO
      ================================================================ */}

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


      {/* ================================================================
          BREADCRUMBS
      ================================================================ */}

      <Breadcrumbs
        items={breadcrumbs}
        showHomeIcon={true}
      />


      {/* ================================================================
          HERO
      ================================================================ */}

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 md:min-h-[100vh] flex flex-col justify-center relative overflow-hidden">


        {/* Background outlined text */}

        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 text-[10rem] md:text-[14rem] pointer-events-none font-bold text-outlined-visible-full select-none whitespace-nowrap"
          aria-hidden="true"
        >

          OUR STORY

        </div>


        {/* Globe */}

        <div className="absolute top-[15%] md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[3%] pointer-events-none z-0 opacity-50 md:opacity-100">


          <AnimatedSection
            animation="fadeIn"
            delay={0.6}
          >


            {/* Mobile */}

            <div className="block md:hidden">

              <EarthGlobe
                size={350}
                particleCount={500}
                rotationSpeed={0.0008}
                glowIntensity={0.4}
                className="animate-float"
              />

            </div>


            {/* Desktop */}

            <div className="hidden md:block">

              <EarthGlobe
                size={550}
                particleCount={500}
                rotationSpeed={0.0008}
                glowIntensity={0.4}
                className="animate-float"
              />

            </div>


          </AnimatedSection>


        </div>


        {/* Hero content */}

        <div className="max-w-5xl mx-auto text-center md:text-left md:mr-auto md:ml-0 relative z-10">


          <AnimatedSection
            animation="fadeInUp"
            delay={0.1}
          >

            <p
              className="leading-relaxed mb-6 text-gray-300"
              style={{
                fontSize: 50,
                lineHeight: 1.6
              }}
            >

              Hello

            </p>

          </AnimatedSection>


          <AnimatedSection
            animation="fadeInUp"
            delay={0.2}
          >

            <h1 className="text-[30px] md:text-[36px] font-medium tracking-tight mb-8 leading-[1.3]">

              {seo.h1}

            </h1>

          </AnimatedSection>


          <AnimatedSection
            animation="fadeInUp"
            delay={0.3}
          >

            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-4 max-w-3xl md:max-w-2xl mx-auto md:mx-0"
              style={{
                lineHeight: 1.6
              }}
            >

              An independent digital marketing and advertising agency built in
              Indore — now expanding our presence into Pune.

            </p>

          </AnimatedSection>


          <AnimatedSection
            animation="fadeInUp"
            delay={0.4}
          >

            <p
              className="text-[0.9375rem] leading-relaxed text-gray-400 mb-8 max-w-3xl md:max-w-2xl mx-auto md:mx-0"
              style={{
                lineHeight: 1.6
              }}
            >

              We bring strategy, creative thinking, performance marketing,
              search and technology together to help businesses build stronger
              brands and better digital growth systems.

            </p>

          </AnimatedSection>


          <AnimatedSection
            animation="fadeInUp"
            delay={0.5}
          >

            <p
              className="text-[0.9375rem] leading-relaxed text-yellow-500 font-medium mb-8"
              style={{
                lineHeight: 1.6
              }}
            >

              Strategy. Creativity. Performance. Technology.

            </p>

          </AnimatedSection>


          <AnimatedSection
            animation="fadeInUp"
            delay={0.6}
          >

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">


              <Link
                to="/services"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold shadow-lg hover:shadow-yellow-500/40 hover:scale-105"
              >

                Explore Our Services

                <ArrowRight className="w-5 h-5" />

              </Link>


              <Link
                to="/contact"
                className="glass-card px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold hover:scale-105"
              >

                Start a Conversation

              </Link>


            </div>

          </AnimatedSection>


        </div>


      </section>


      {/* ================================================================
          WHO WE ARE
      ================================================================ */}

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


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">

              WHO WE ARE

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

              More Than a Marketing Agency

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 max-w-4xl mx-auto mb-16 text-center"
              style={{
                lineHeight: 1.6
              }}
            >

              Inchtomilez is a
              <span className="text-yellow-500 font-semibold">
                {' '}founder-led digital marketing and advertising agency
              </span>
              {' '}working across strategy, advertising, branding, SEO,
              performance marketing, creative communication, website
              development and digital technology.

            </p>


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


      {/* ================================================================
          WHAT DRIVES GROWTH
      ================================================================ */}

      <section className="md:min-h-[100vh] py-16 md:py-24 flex items-center relative">


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


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">

              OUR GROWTH SYSTEM

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

              Four Disciplines. One Connected Direction.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Strong digital growth rarely comes from one platform alone.
              We connect
              <span className="text-yellow-500 font-semibold">
                {' '}strategy, creative, performance and technology
              </span>
              {' '}so every part of the brand works towards the same objective.

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


      {/* ================================================================
          HOW WE WORK
      ================================================================ */}

      <section className="py-16 md:py-24 relative">


        <OutlinedText
          text="CLARITY"
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

              HOW WE THINK

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

              Understand First. Execute Better.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Better marketing begins with better understanding.
              Our work is guided by
              <span className="text-yellow-500 font-semibold">
                {' '}clarity, disciplined execution and continuous improvement.
              </span>

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


      {/* ================================================================
          FOUNDER
      ================================================================ */}

      <section className="py-16 md:py-24 relative">


        <OutlinedText
          text="FOUNDER"
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">


          <div className="max-w-5xl mx-auto relative z-10">


            <AnimatedSection
              animation="fadeInUp"
              delay={0.1}
            >


              <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">

                THE FOUNDER

              </p>


            </AnimatedSection>


            <AnimatedSection
              animation="fadeInUp"
              delay={0.2}
            >


              <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

                Built by One Founder. Growing With One Vision.

              </h2>


            </AnimatedSection>


            <AnimatedSection
              animation="fadeInUp"
              delay={0.3}
            >


              <p
                className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
                style={{
                  lineHeight: 1.6
                }}
              >

                Inchtomilez was founded by
                <span className="text-yellow-500 font-semibold">
                  {' '}Aman Panwar
                </span>
                {' '}in Indore with a hands-on foundation in digital marketing,
                search, websites and business growth.

              </p>


            </AnimatedSection>


            <AnimatedSection
              animation="fadeInUp"
              delay={0.4}
            >


              <div className="glass-strong p-8 md:p-12 rounded-2xl">


                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">


                  {/* Founder Identity */}

                  <div>


                    <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-4">

                      FOUNDER

                    </p>


                    <h3 className="text-[22px] md:text-[26px] font-semibold text-white mb-3">

                      Aman Panwar

                    </h3>


                    <p
                      className="text-[0.9375rem] leading-relaxed text-gray-400 mb-6"
                      style={{
                        lineHeight: 1.6
                      }}
                    >

                      Founder — Inchtomilez Digital Marketing & Advertising Agency

                    </p>


                    <div className="space-y-4">


                      <div className="flex items-start gap-3">


                        <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                        <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                          Hands-on background across website development,
                          digital marketing and search.

                        </p>


                      </div>


                      <div className="flex items-start gap-3">


                        <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                        <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                          Experience working across strategy, branding,
                          performance and digital growth.

                        </p>


                      </div>


                      <div className="flex items-start gap-3">


                        <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                        <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                          Built Inchtomilez in Indore and is now leading its
                          expansion into Pune.

                        </p>


                      </div>


                    </div>


                  </div>


                  {/* Founder Story */}

                  <div>


                    <p
                      className="text-[0.9375rem] leading-relaxed text-gray-300 mb-5"
                      style={{
                        lineHeight: 1.8
                      }}
                    >

                      Inchtomilez began with one founder and a simple belief:
                      marketing should make sense for the business before it
                      makes sense on a presentation.

                    </p>


                    <p
                      className="text-[0.9375rem] leading-relaxed text-gray-300 mb-5"
                      style={{
                        lineHeight: 1.8
                      }}
                    >

                      What started with hands-on digital work evolved into an
                      integrated agency working across marketing, advertising,
                      creative, branding, websites, SEO and technology.

                    </p>


                    <p
                      className="text-[0.9375rem] leading-relaxed text-gray-300"
                      style={{
                        lineHeight: 1.8
                      }}
                    >

                      The philosophy remains practical — understand the
                      business, create the right strategy, execute properly and
                      keep improving.

                    </p>


                  </div>


                </div>


                {/* Founder Quote */}

                <div className="mt-10 pt-10 border-t border-white/10">


                  <p className="text-[20px] md:text-[24px] font-medium text-white leading-[1.5] text-center">

                    “Duniya Brands Ke Peeche,
                    <span className="text-yellow-500">
                      {' '}Aur Brands Marketing Ke Peeche.”
                    </span>

                  </p>


                  <p className="text-[0.8125rem] text-gray-500 text-center mt-4">

                    Aman Panwar — Founder, Inchtomilez

                  </p>


                </div>


              </div>


            </AnimatedSection>


          </div>


        </div>


      </section>


      {/* ================================================================
          INDORE + PUNE
      ================================================================ */}

      <section className="py-16 md:py-24 relative">


        <OutlinedText
          text="PRESENCE"
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">


          <div className="max-w-6xl mx-auto relative z-10">


            <AnimatedSection
              animation="fadeInUp"
              delay={0.1}
            >


              <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">

                OUR PRESENCE

              </p>


              <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

                Built in Indore. Expanding Into Pune.

              </h2>


              <p
                className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
                style={{
                  lineHeight: 1.6
                }}
              >

                September 2026 marks an important step for Inchtomilez as we
                expand our presence into Pune while continuing to strengthen
                the agency built in Indore.

              </p>


            </AnimatedSection>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


              {/* Indore */}

              <AnimatedSection
                animation="fadeInUp"
                delay={0.2}
              >


                <div className="glass-card p-8 h-full">


                  <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center mb-6">


                    <Building2 className="w-6 h-6 text-black" />


                  </div>


                  <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-3">

                    OUR FOUNDATION

                  </p>


                  <h3 className="text-[20px] font-semibold text-white mb-4">

                    Indore

                  </h3>


                  <p
                    className="text-[0.9375rem] leading-relaxed text-gray-400 mb-6"
                    style={{
                      lineHeight: 1.7
                    }}
                  >

                    Indore is where Inchtomilez was founded, developed and
                    shaped. It remains the foundation of our agency,
                    relationships and operating philosophy.

                  </p>


                  <div className="flex items-start gap-3">


                    <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                    <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                      Vijay Nagar,
                      <br />
                      Indore, Madhya Pradesh

                    </p>


                  </div>


                </div>


              </AnimatedSection>


              {/* Pune */}

              <AnimatedSection
                animation="fadeInUp"
                delay={0.3}
              >


                <div className="glass-card p-8 h-full">


                  <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center mb-6">


                    <Rocket className="w-6 h-6 text-black" />


                  </div>


                  <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-3">

                    SEPTEMBER 2026

                  </p>


                  <h3 className="text-[20px] font-semibold text-white mb-4">

                    Pune

                  </h3>


                  <p
                    className="text-[0.9375rem] leading-relaxed text-gray-400 mb-6"
                    style={{
                      lineHeight: 1.7
                    }}
                  >

                    Our Pune expansion brings Inchtomilez closer to businesses
                    across one of India&apos;s strongest ecosystems for
                    technology, healthcare, real estate, education,
                    manufacturing and growing enterprises.

                  </p>


                  <div className="flex items-start gap-3">


                    <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                    <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                      Gera&apos;s Imperium Gateway,
                      <br />
                      Nashik Phata, Pimpri-Chinchwad, Pune

                    </p>


                  </div>


                </div>


              </AnimatedSection>


            </div>


            <AnimatedSection
              animation="fadeInUp"
              delay={0.4}
            >


              <div className="text-center mt-10">


                <p className="text-[0.9375rem] text-gray-400 mb-6">

                  Two cities. One agency. One connected approach.

                </p>


                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors text-[0.9375rem] font-medium"
                >

                  Contact Our Team

                  <ArrowRight className="w-4 h-4" />

                </Link>


              </div>


            </AnimatedSection>


          </div>


        </div>


      </section>


      {/* ================================================================
          WHAT MAKES US DIFFERENT
      ================================================================ */}

      <section className="py-16 md:py-24 relative overflow-hidden">


        <OutlinedText
          text="UNIQUE"
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

              WHY INCHTOMILEZ

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

              What Makes Our Approach Different

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              We do not believe every business needs the same campaign,
              platform or formula. Our approach starts with
              <span className="text-yellow-500 font-semibold">
                {' '}understanding the business first.
              </span>

            </p>


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


      {/* ================================================================
          EXPERTISE
      ================================================================ */}

      <section className="py-16 md:py-24 relative">


        <OutlinedText
          text="EXPERTISE"
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

              OUR EXPERTISE

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

              Specialists Across the Digital Ecosystem

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Different business challenges require different disciplines.
              Our capabilities can work independently or come together as
              <span className="text-yellow-500 font-semibold">
                {' '}one integrated digital engagement.
              </span>

            </p>


            <BentoGrid2
              cards={expertiseAreas}
              mode="uniform"
              columns={3}
              showCTA={false}
              ariaLabel="Our expertise"
            />


          </div>


        </div>


      </section>


      {/* ================================================================
          INDUSTRIES
      ================================================================ */}

      <section className="py-16 md:py-24 relative">


        <OutlinedText
          text="INDUSTRIES"
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

              INDUSTRY EXPERIENCE

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

              Different Markets Need Different Strategies

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Customer behavior, sales cycles, competition and digital
              opportunities differ by industry. Our strategy adapts to the
              market rather than forcing every business into the same formula.

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


      {/* ================================================================
          WHY CHOOSE US
      ================================================================ */}

      <section className="py-16 md:py-24">


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">


          <div className="max-w-6xl mx-auto">


            <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">

              WHY WORK WITH US

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

              More Than Marketing Execution

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Our role is not simply to complete marketing tasks.
              We aim to understand the wider business and contribute where
              strategy, execution and digital growth meet.

            </p>


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


      {/* ================================================================
          PROCESS
      ================================================================ */}

      <section className="py-16 md:py-24 relative">


        <OutlinedText
          text="PROCESS"
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

              HOW WE WORK

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

              From Understanding to Scale

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              A
              <span className="text-yellow-500 font-semibold">
                {' '}structured process
              </span>
              {' '}keeps strategy, creative, implementation and optimization
              connected from the first conversation onwards.

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


      {/* ================================================================
          PHILOSOPHY
      ================================================================ */}

      <section className="py-16 md:py-24">


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">


          <div className="max-w-5xl mx-auto">


            <AnimatedSection
              animation="fadeInUp"
              delay={0.1}
            >


              <div className="glass-strong p-8 md:p-12 rounded-2xl text-center">


                <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6">

                  OUR PHILOSOPHY

                </p>


                <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-6">

                  Marketing Should Create Understanding — Not Confusion.

                </h2>


                <p
                  className="text-[0.9375rem] leading-relaxed text-gray-300 max-w-3xl mx-auto mb-8"
                  style={{
                    lineHeight: 1.7
                  }}
                >

                  We believe clients should understand the strategy,
                  opportunity, challenge and reason behind the work.
                  Strong partnerships are built when both agency and client
                  understand where the business is going and what needs to
                  happen next.

                </p>


                <p className="text-yellow-500 font-medium text-[0.9375rem]">

                  Clear thinking. Better execution. Continuous progress.

                </p>


              </div>


            </AnimatedSection>


          </div>


        </div>


      </section>


      {/* ================================================================
          NEWSLETTER
      ================================================================ */}

      <section className="py-16 md:py-24">


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">


          <div className="max-w-4xl mx-auto">


            <div className="glass-strong p-8 md:p-12 rounded-2xl text-center">


              <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4">

                Get Marketing Insights

              </h2>


              <p
                className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-2xl mx-auto"
                style={{
                  lineHeight: 1.6
                }}
              >

                Join our
                <span className="text-yellow-500 font-semibold">
                  {' '}monthly newsletter
                </span>
                {' '}for practical perspectives on marketing, branding,
                advertising, SEO, technology and digital growth.

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


              <p
                className="text-[0.8125rem] text-gray-500 mt-4"
                style={{
                  lineHeight: 1.6
                }}
              >

                Unsubscribe anytime. We respect your inbox.

              </p>


            </div>


          </div>


        </div>


      </section>


      {/* ================================================================
          FINAL CTA
      ================================================================ */}

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
              style={{
                lineHeight: 1.6
              }}
            >

              Whether you&apos;re building a new brand, generating demand,
              improving an existing digital presence or looking for a
              long-term marketing partner, we&apos;d like to understand
              where you want the business to go next.

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

                Explore Services

              </Link>


            </div>


          </div>


        </div>


      </section>


    </div>

  );

}
