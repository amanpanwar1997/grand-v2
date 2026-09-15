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
        'To connect strategy, advertising, creative, search and technology around one objective: helping businesses build stronger market presence and sustainable growth.',
    },

    {
      icon: Target,

      label: 'Our Vision',

      description:
        'To build a modern independent agency from India that combines sharp strategy, strong creative and accountable execution without losing clarity, speed or personal involvement.',
    },

    {
      icon: Award,

      label: 'Our Approach',

      description:
        'We start with the business problem, not the platform. The channel mix follows the objective, the audience and the opportunity.',
    },

    {
      icon: Users,

      label: 'Founder-Led',

      description:
        'Founded by Aman Panwar in Indore, Inchtomilez remains closely involved in strategy and execution while growing into a broader integrated agency.',
    },

    {
      icon: Globe,

      label: 'Our Presence',

      description:
        'Built in Indore and expanding to Pune in September 2026, we work as one connected agency across locations, disciplines and client requirements.',
    },

    {
      icon: Trophy,

      label: 'Our Commitment',

      description:
        'We want every engagement to leave the business stronger — with clearer positioning, better digital assets, more effective campaigns and better decisions.',
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
        'Positioning, audience, market, offer and growth priorities come first. Strategy gives every channel a reason to exist.',
    },

    {
      icon: Palette,

      label: 'Creative',

      description:
        'Ideas, messaging and design turn strategy into communication people can notice, understand and remember.',
    },

    {
      icon: TrendingUp,

      label: 'Performance',

      description:
        'Paid media, search and lead generation are managed around qualified demand, conversion quality and continuous improvement.',
    },

    {
      icon: Code,

      label: 'Technology',

      description:
        'Websites, landing pages, e-commerce and digital systems make sure attention has somewhere effective to go.',
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
        'We look at the business model, customer journey, market, competition and current digital setup before proposing activity.',
    },

    {
      icon: Shield,

      label: 'Communicate Clearly',

      description:
        'You should always know the objective, the priority, what is being executed and what the next decision depends on.',
    },

    {
      icon: CheckCircle,

      label: 'Execute Properly',

      description:
        'Strategy only matters when the details are right — from creative and media setup to landing pages, tracking and delivery.',
    },

    {
      icon: BarChart3,

      label: 'Improve Continuously',

      description:
        'We review real response, performance and market signals, then refine the work instead of repeating the same plan.',
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
        'The problem comes first; the platform comes later'
    },

    {
      label: 'One Connected Direction',

      sublabel:
        'Strategy, creative, media, search and technology stay aligned'
    },

    {
      label: 'Execution Ownership',

      sublabel:
        'We stay close to the work from planning through implementation'
    },

    {
      label: 'Commercial Awareness',

      sublabel:
        'Marketing decisions are tied back to leads, sales and business priorities'
    },

    {
      label: 'Clear Communication',

      sublabel:
        'Priorities, progress, risks and next steps remain visible'
    },

    {
      label: 'Built to Adapt',

      sublabel:
        'The approach evolves as markets, platforms and customer behaviour change'
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
        'Market understanding, positioning, go-to-market thinking, campaign planning and practical growth roadmaps.',
    },

    {
      icon: Megaphone,

      label: 'Digital Advertising',

      description:
        'Google Ads, Meta Ads, paid media planning, lead generation, retargeting and conversion-led optimization.',
    },

    {
      icon: Search,

      label: 'SEO & Search Growth',

      description:
        'Technical SEO, local search, content optimization and search strategies built for durable organic visibility.',
    },

    {
      icon: Palette,

      label: 'Brand & Creative',

      description:
        'Brand identity, campaign concepts, graphic design, social content, ad creative and visual communication.',
    },

    {
      icon: Code,

      label: 'Web & Commerce',

      description:
        'Business websites, landing pages, e-commerce experiences and digital infrastructure built to support conversion.',
    },

    {
      icon: Handshake,

      label: 'Account & Growth Management',

      description:
        'Ongoing coordination, reporting, priorities and cross-channel alignment so strategy and execution stay connected.',
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

      label: 'Integrated Agency Model',

      description:
        'One team can connect strategy, creative, media, search and technology instead of treating them as separate vendors.',
    },

    {
      icon: Sparkles,

      label: 'Founder-Led Involvement',

      description:
        'The agency stays close to business context, key decisions and the quality of execution.',
    },

    {
      icon: Trophy,

      label: 'Channel-Agnostic Thinking',

      description:
        'We recommend what fits the objective, not what happens to be easiest for us to sell.',
    },

    {
      icon: Zap,

      label: 'Built Around Execution',

      description:
        'Plans are shaped by what can actually be implemented well across creative, media and technology.',
    },

    {
      icon: BarChart3,

      label: 'Measurement With Context',

      description:
        'We use data to make better decisions without reducing business performance to vanity metrics.',
    },

    {
      icon: Heart,

      label: 'Long-Term Partnership',

      description:
        'We prefer relationships where the work can compound, improve and become more valuable over time.',
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
        'We understand the business, offer, audience, competition, current marketing and the outcome you need.',
    },

    {
      number: '02',

      label: 'Strategize',

      description:
        'We define the positioning, priorities, channel mix, creative direction, deliverables and measurement plan.',
    },

    {
      number: '03',

      label: 'Create',

      description:
        'We turn the strategy into campaigns, content, design systems, websites, landing pages and communication assets.',
    },

    {
      number: '04',

      label: 'Execute',

      description:
        'We launch with coordinated media, technology, tracking and quality control across the agreed touchpoints.',
    },

    {
      number: '05',

      label: 'Optimize & Scale',

      description:
        'We learn from performance, improve the system and scale the parts that are creating meaningful business value.',
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
        'Doctors, clinics, hospitals, healthcare services, wellness and patient-acquisition programs',
    },

    {
      label: 'Real Estate',

      sublabel:
        'Developers, residential and commercial projects, property brands and lead-generation campaigns',
    },

    {
      label: 'Education',

      sublabel:
        'Institutions, courses, learning brands, admissions marketing and education businesses',
    },

    {
      label: 'E-Commerce & Retail',

      sublabel:
        'D2C brands, online stores, retail businesses, marketplaces and product-led growth',
    },

    {
      label: 'Automotive',

      sublabel:
        'Dealerships, automotive services, accessories, products and customer-acquisition campaigns',
    },

    {
      label: 'Professional Services',

      sublabel:
        'Consulting firms, B2B companies, service businesses and growth-stage enterprises',
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
          1. HERO — ABOUT INCHTOMILEZ
          PREMIUM TWO-COLUMN / ADVANTEDGE-INSPIRED LAYOUT
      ================================================================ */}

      <section className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32 md:min-h-[100vh] flex items-center">


        {/* ================================================================
            BACKGROUND OUTLINED TEXT
        ================================================================ */}

        <div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 text-[8rem] sm:text-[10rem] md:text-[13rem] lg:text-[15rem] pointer-events-none font-bold text-outlined-visible-full select-none whitespace-nowrap opacity-70"
          aria-hidden="true"
        >
          OUR STORY
        </div>


        {/* ================================================================
            AMBIENT BACKGROUND DETAILS
        ================================================================ */}

        <div
          className="absolute -left-48 top-[18%] h-[420px] w-[420px] rounded-full bg-yellow-500/[0.035] blur-[130px] pointer-events-none"
          aria-hidden="true"
        />

        <div
          className="absolute -right-48 bottom-[5%] h-[500px] w-[500px] rounded-full bg-yellow-500/[0.045] blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          aria-hidden="true"
        />


        {/* ================================================================
            CONTAINER
        ================================================================ */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

          <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-[0.93fr_1.07fr] gap-10 lg:gap-14 xl:gap-20 items-center">


              {/* ================================================================
                  LEFT COLUMN — ABOUT CONTENT
              ================================================================ */}

              <div className="relative z-20 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">


                {/* About Badge */}

                <AnimatedSection
                  animation="fadeInUp"
                  delay={0.1}
                >

                  <div className="inline-flex items-center gap-2.5 rounded-full border border-yellow-500/25 bg-yellow-500/[0.07] px-4 py-2 backdrop-blur-md mb-6">

                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" />

                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow-500">
                      About Inchtomilez
                    </span>

                  </div>

                </AnimatedSection>



                {/* ================================================================
                    MAIN H1
                ================================================================ */}

                <AnimatedSection
                  animation="fadeInUp"
                  delay={0.2}
                >

                  <h1 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[52px] xl:text-[56px] font-medium tracking-[-0.035em] leading-[1.08] text-white mb-6">

                    {seo.h1}

                  </h1>

                </AnimatedSection>



                {/* ================================================================
                    CORE POSITIONING
                ================================================================ */}

                <AnimatedSection
                  animation="fadeInUp"
                  delay={0.3}
                >

                  <p className="text-[17px] sm:text-[18px] md:text-[20px] font-semibold leading-[1.55] text-white mb-5">

                    An independent agency built to connect

                    <span className="text-yellow-500">
                      {' '}strategy, creative, media, search and technology
                    </span>

                    {' '}around one business direction.

                  </p>

                </AnimatedSection>



                {/* ================================================================
                    ABOUT COPY
                ================================================================ */}

                <AnimatedSection
                  animation="fadeInUp"
                  delay={0.4}
                >

                  <p
                    className="text-[0.9375rem] md:text-[1rem] text-gray-400 max-w-xl mx-auto lg:mx-0 mb-6"
                    style={{
                      lineHeight: 1.8
                    }}
                  >

                    Inchtomilez is a founder-led digital marketing and advertising
                    agency built in Indore. We work across brand strategy,
                    advertising, creative, performance marketing, SEO, websites
                    and digital technology — bringing the work together instead
                    of treating every channel as a separate activity.

                  </p>

                </AnimatedSection>



                {/* ================================================================
                    PRESENCE
                ================================================================ */}

                <AnimatedSection
                  animation="fadeInUp"
                  delay={0.45}
                >

                  <div className="flex items-start justify-center lg:justify-start gap-3 mb-7">

                    <div className="w-8 h-8 rounded-lg border border-yellow-500/15 bg-yellow-500/[0.06] flex items-center justify-center flex-shrink-0">

                      <MapPin className="w-4 h-4 text-yellow-500" />

                    </div>

                    <p
                      className="text-[0.8125rem] md:text-[0.875rem] text-gray-500 text-left max-w-lg"
                      style={{
                        lineHeight: 1.7
                      }}
                    >

                      Built in Indore. Expanding our presence into Pune in
                      September 2026 — operating with one connected approach
                      across both cities.

                    </p>

                  </div>

                </AnimatedSection>



                {/* ================================================================
                    CONNECTED AGENCY FRAMEWORK
                ================================================================ */}

                <AnimatedSection
                  animation="fadeInUp"
                  delay={0.5}
                >

                  <div className="border-t border-white/10 pt-6 mb-8">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500 mb-4">
                      One Connected Agency Model
                    </p>


                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2">

                      {[
                        {
                          label: 'Strategy',
                          icon: Target
                        },
                        {
                          label: 'Creative',
                          icon: Palette
                        },
                        {
                          label: 'Media',
                          icon: Megaphone
                        },
                        {
                          label: 'Search',
                          icon: Search
                        },
                        {
                          label: 'Technology',
                          icon: Code
                        }
                      ].map((item) => {

                        const Icon = item.icon;

                        return (

                          <div
                            key={item.label}
                            className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 transition-all duration-300 hover:border-yellow-500/25 hover:bg-yellow-500/[0.05]"
                          >

                            <Icon className="w-3.5 h-3.5 text-yellow-500" />

                            <span className="text-[11px] font-medium text-gray-300">
                              {item.label}
                            </span>

                          </div>

                        );

                      })}

                    </div>

                  </div>

                </AnimatedSection>



                {/* ================================================================
                    CTA
                ================================================================ */}

                <AnimatedSection
                  animation="fadeInUp"
                  delay={0.6}
                >

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">


                    <Link
                      to="/contact"
                      className="bg-yellow-500 hover:bg-yellow-400 text-black px-7 py-3.5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.875rem] font-semibold shadow-lg hover:shadow-yellow-500/30 hover:-translate-y-0.5"
                    >

                      Discuss Your Growth

                      <ArrowRight className="w-4 h-4" />

                    </Link>


                    <Link
                      to="/services"
                      className="glass-card border border-white/10 hover:border-yellow-500/25 px-7 py-3.5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.875rem] font-semibold hover:-translate-y-0.5"
                    >

                      Explore Our Services

                    </Link>


                  </div>

                </AnimatedSection>


              </div>



              {/* ================================================================
                  RIGHT COLUMN — GLOBE / ABOUT VISUAL
              ================================================================ */}

              <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[610px] flex items-center justify-center">


                {/* ================================================================
                    DECORATIVE ORBIT RINGS
                ================================================================ */}

                <div
                  className="absolute w-[310px] h-[310px] sm:w-[410px] sm:h-[410px] lg:w-[560px] lg:h-[560px] rounded-full border border-white/[0.05]"
                  aria-hidden="true"
                />

                <div
                  className="absolute w-[250px] h-[250px] sm:w-[335px] sm:h-[335px] lg:w-[470px] lg:h-[470px] rounded-full border border-yellow-500/[0.07]"
                  aria-hidden="true"
                />

                <div
                  className="absolute w-[190px] h-[190px] sm:w-[265px] sm:h-[265px] lg:w-[380px] lg:h-[380px] rounded-full border border-white/[0.035]"
                  aria-hidden="true"
                />


                {/* ================================================================
                    GLOBE
                    ORIGINAL CONFIGURATION PRESERVED
                ================================================================ */}

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">

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



                {/* ================================================================
                    TOP FLOATING CARD — FOUNDER LED
                ================================================================ */}

                <div className="absolute top-[5%] right-0 sm:right-[5%] lg:right-0 z-20">

                  <AnimatedSection
                    animation="fadeInUp"
                    delay={0.75}
                  >

                    <div className="glass-strong border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-xl shadow-2xl max-w-[220px]">

                      <div className="flex items-center gap-2 mb-2">

                        <div className="w-2 h-2 rounded-full bg-yellow-500" />

                        <p className="text-[9px] uppercase tracking-[0.17em] font-semibold text-yellow-500">
                          Founder-Led
                        </p>

                      </div>

                      <p className="text-[0.8125rem] font-medium leading-[1.6] text-white">
                        Built by Aman Panwar with a hands-on foundation in digital growth.
                      </p>

                    </div>

                  </AnimatedSection>

                </div>



                {/* ================================================================
                    BOTTOM FLOATING CARD — AGENCY SYSTEM
                ================================================================ */}

                <div className="absolute bottom-[6%] left-0 sm:left-[4%] lg:left-0 z-20">

                  <AnimatedSection
                    animation="fadeInUp"
                    delay={0.85}
                  >

                    <div className="glass-strong border border-yellow-500/15 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl w-[270px] sm:w-[300px]">


                      {/* Card copy */}

                      <div className="p-5">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center flex-shrink-0">

                            <Rocket className="w-5 h-5 text-black" />

                          </div>


                          <div>

                            <p className="text-[9px] uppercase tracking-[0.16em] font-semibold text-yellow-500 mb-1">
                              Connected by Design
                            </p>

                            <p className="text-[0.8125rem] font-semibold text-white leading-[1.55]">
                              One direction. Multiple disciplines.
                            </p>

                          </div>

                        </div>

                      </div>


                      {/* Micro system */}

                      <div className="border-t border-white/10">

                        <div className="grid grid-cols-5 divide-x divide-white/10">

                          {[
                            'Think',
                            'Create',
                            'Reach',
                            'Convert',
                            'Grow'
                          ].map((item, index) => (

                            <div
                              key={item}
                              className="px-1.5 py-3 text-center transition-colors duration-300 hover:bg-white/[0.04]"
                            >

                              <span className="block text-[8px] font-semibold text-yellow-500 mb-1">
                                0{index + 1}
                              </span>

                              <span className="block text-[8px] text-gray-400">
                                {item}
                              </span>

                            </div>

                          ))}

                        </div>

                      </div>


                    </div>

                  </AnimatedSection>

                </div>



                {/* ================================================================
                    SMALL POSITIONING LINE
                ================================================================ */}

                <div className="absolute bottom-0 right-[2%] hidden lg:block z-20">

                  <AnimatedSection
                    animation="fadeIn"
                    delay={1}
                  >

                    <div className="flex items-center gap-3">

                      <span className="w-7 h-[2px] bg-yellow-500 rounded-full" />

                      <p className="text-[10px] font-medium text-gray-600">
                        From inches of progress to miles of growth.
                      </p>

                    </div>

                  </AnimatedSection>

                </div>


              </div>


            </div>

          </div>

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

              An Integrated Agency Built Around Business Growth

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
              {' '}connecting strategy, advertising, branding, creative, search,
              performance marketing and technology under one integrated
              agency model.

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

              Four Disciplines. One Connected Growth System.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Strong digital growth is rarely created by one channel alone.
              We align
              <span className="text-yellow-500 font-semibold">
                {' '}strategy, creative, performance and technology
              </span>
              {' '}so each discipline strengthens the next and supports the same
              business objective.

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

              Clarity Before Activity. Execution With Purpose.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              We do not begin with a platform recommendation. We begin by
              understanding the business, then turn that understanding into
              <span className="text-yellow-500 font-semibold">
                {' '}focused execution and continuous improvement.
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
                {' '}in Indore after years of hands-on work across websites,
                SEO, digital marketing and business growth.

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

                          Hands-on foundation in website development, SEO and
                          digital marketing.

                        </p>


                      </div>


                      <div className="flex items-start gap-3">


                        <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                        <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                          Built the agency around practical strategy, strong execution
                          and direct client communication.

                        </p>


                      </div>


                      <div className="flex items-start gap-3">


                        <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                        <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                          Leading Inchtomilez from its Indore base into its
                          September 2026 Pune expansion.

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

                      Inchtomilez did not begin as a large agency. It began with one
                      founder doing the work — building websites, improving search
                      visibility and helping businesses understand what digital
                      marketing could actually do for them.

                    </p>


                    <p
                      className="text-[0.9375rem] leading-relaxed text-gray-300 mb-5"
                      style={{
                        lineHeight: 1.8
                      }}
                    >

                      As client needs became broader, the agency evolved beyond
                      individual services into a connected model spanning strategy,
                      advertising, branding, creative, SEO, performance marketing
                      and technology.

                    </p>


                    <p
                      className="text-[0.9375rem] leading-relaxed text-gray-300"
                      style={{
                        lineHeight: 1.8
                      }}
                    >

                      The principle is still the same — understand the business
                      first, make the strategy clear, execute with discipline and
                      improve from real market response.

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

                In September 2026, Inchtomilez expands into Pune — extending
                the same connected agency approach beyond Indore while keeping
                strategy and execution under one team.

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

                    Indore is where Inchtomilez was built. It remains the
                    foundation of our working culture, client relationships and
                    hands-on approach to strategy and execution.

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

                    Our Pune presence brings Inchtomilez closer to businesses
                    across technology, healthcare, real estate, education,
                    manufacturing and the wider western India market.

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

                  Two cities. One agency. One standard of thinking and execution.

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

              Built Differently for Connected Growth

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              There is no fixed formula for growth. The right mix depends on
              the business, market, audience and objective — so we start with
              <span className="text-yellow-500 font-semibold">
                {' '}context before channels.
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

              Capabilities That Work Better Together

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Different growth problems need different capabilities. Our
              services can work independently when needed or combine as
              <span className="text-yellow-500 font-semibold">
                {' '}one connected agency engagement.
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

              Different Markets. Different Buying Journeys.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Customer behaviour, sales cycles, trust signals and competition
              change from one industry to another. We adapt the strategy to the
              market instead of forcing every business into the same playbook.

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

              A Partner That Connects the Work

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Our role is not to add more disconnected marketing activity.
              It is to connect the right capabilities around the business and
              keep strategy, execution and learning moving in the same direction.

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

              From Business Context to Scalable Execution

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              A
              <span className="text-yellow-500 font-semibold">
                {' '}structured working process
              </span>
              {' '}keeps decisions, creative, media, technology and optimization
              connected from the first conversation onward.

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

                  Good Marketing Should Make the Business Clearer.

                </h2>


                <p
                  className="text-[0.9375rem] leading-relaxed text-gray-300 max-w-3xl mx-auto mb-8"
                  style={{
                    lineHeight: 1.7
                  }}
                >

                  We believe strong marketing becomes easier to improve when the
                  objective, reasoning and priorities are clear. Clients should
                  understand what we are doing, why it matters and what the next
                  decision depends on.

                </p>


                <p className="text-yellow-500 font-medium text-[0.9375rem]">

                  Clear thinking. Connected execution. Continuous improvement.

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

                Get Practical Marketing Insights

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
                {' '}for practical thinking on strategy, advertising, creative,
                search, technology and business growth.

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

              Build the Next Stage of Growth.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Whether you are building a brand, generating demand, improving
              your digital presence or looking for a long-term agency partner,
              the next step is the same: understand where the business needs to
              go and build the right system to help it get there.

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
