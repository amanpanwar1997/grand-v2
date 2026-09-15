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
        'To turn business ambition into brand momentum by connecting strategy, creative, media, search and technology around one clear direction.',
    },

    {
      icon: Target,

      label: 'Our Vision',

      description:
        'To build an independent Indian agency capable of creating work that can move from local markets to bigger stages without losing speed, clarity or craft.',
    },

    {
      icon: Award,

      label: 'Our Approach',

      description:
        'Start with the problem. Find the opportunity. Build the idea. Choose the channels. Then make every touchpoint work together.',
    },

    {
      icon: Users,

      label: 'Founder-Led',

      description:
        'Founded by Aman Panwar in Indore, Inchtomilez stays close to the thinking, the work and the decisions that shape every engagement.',
    },

    {
      icon: Globe,

      label: 'Our Presence',

      description:
        'Born in Indore. Expanding into Pune in September 2026. One connected agency built to work across markets, industries and disciplines.',
    },

    {
      icon: Trophy,

      label: 'Our Commitment',

      description:
        'Leave every brand clearer, stronger and better equipped to move — with sharper positioning, better experiences and more effective communication.',
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
        'Find where the brand should move before deciding how loudly it should speak.',
    },

    {
      icon: Palette,

      label: 'Creative',

      description:
        'Turn strategy into ideas, identities and communication people can actually notice, understand and remember.',
    },

    {
      icon: TrendingUp,

      label: 'Performance',

      description:
        'Put the work in front of the right people, learn from real response and keep improving what earns attention and action.',
    },

    {
      icon: Code,

      label: 'Technology',

      description:
        'Build the websites, commerce and digital systems that make the experience after the click as strong as the campaign.',
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
        'Before the platform, we understand the business, the audience, the market and what actually needs to change.',
    },

    {
      icon: Shield,

      label: 'Communicate Clearly',

      description:
        'Clear thinking should stay clear in execution — the objective, priority and next move should never disappear behind jargon.',
    },

    {
      icon: CheckCircle,

      label: 'Launch Properly',

      description:
        'Good thinking means little if the details fail. Creative, media, experience, tracking and delivery all have to hold together.',
    },

    {
      icon: BarChart3,

      label: 'Improve Continuously',

      description:
        'Launch, learn, improve. We use real response to sharpen the work instead of putting the same plan on repeat.',
    },

  ];


  /*
  |--------------------------------------------------------------------------
  | WHAT MAKES US DIFFERENT
  |--------------------------------------------------------------------------
  */

  const differenceFactors = [

    {
      label: 'Problem Before Platform',

      sublabel:
        'Understand what needs to change before choosing where to advertise'
    },

    {
      label: 'One Brand. One Direction.',

      sublabel:
        'Strategy, creative, media, search and technology move together'
    },

    {
      label: 'Stay Close to the Work',

      sublabel:
        'Thinking means little if the details are left behind'
    },

    {
      label: 'Built Around the Business',

      sublabel:
        'Marketing decisions stay connected to demand, experience and growth'
    },

    {
      label: 'Clarity Over Jargon',

      sublabel:
        'You should understand the thinking, the priority and the next move'
    },

    {
      label: 'Built to Keep Moving',

      sublabel:
        'Markets change. Platforms change. The strategy evolves with them'
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
        'Positioning, audience, market and go-to-market thinking that gives the brand a clear place to move.',
    },

    {
      icon: Megaphone,

      label: 'Digital Advertising',

      description:
        'Paid media across Google, Meta and other channels — built around intent, attention and continuous optimisation.',
    },

    {
      icon: Search,

      label: 'SEO & Search Growth',

      description:
        'Organic, local and technical search systems designed to make the brand easier to discover and harder to overlook.',
    },

    {
      icon: Palette,

      label: 'Brand & Creative',

      description:
        'Identity, campaigns, design, content and communication that give the brand something recognisable to say.',
    },

    {
      icon: Code,

      label: 'Web & Commerce',

      description:
        'Websites, landing pages and commerce experiences built to turn interest into a reason to stay, explore and act.',
    },

    {
      icon: Handshake,

      label: 'Integrated Growth Management',

      description:
        'One connected view across priorities, media, creative and delivery so the work keeps moving in the same direction.',
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

      label: 'One Connected Agency',

      description:
        'Strategy, creative, advertising, search and technology work as one system around the brand.',
    },

    {
      icon: Sparkles,

      label: 'Founder-Led Thinking',

      description:
        'Senior thinking stays close to the business, the decisions and the standard of the work.',
    },

    {
      icon: Trophy,

      label: 'Idea Before Channel',

      description:
        'We choose the medium around the objective — not the service around what is easiest to sell.',
    },

    {
      icon: Zap,

      label: 'Built to Be Made',

      description:
        'The best strategy is one that survives contact with design, media, technology and the real market.',
    },

    {
      icon: BarChart3,

      label: 'Data With Context',

      description:
        'Numbers matter when they explain behaviour, sharpen decisions and improve the next move.',
    },

    {
      icon: Heart,

      label: 'Built for the Long Game',

      description:
        'We prefer work that compounds — stronger systems, better decisions and better brand memory over time.',
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

      label: 'Understand',

      description:
        'Business, market, audience, competition, current experience and the real problem behind the brief.',
    },

    {
      number: '02',

      label: 'Define',

      description:
        'Position, objective, audience, message, channel roles and the standard the work needs to meet.',
    },

    {
      number: '03',

      label: 'Create',

      description:
        'Turn the direction into ideas, campaigns, design, content and digital experiences.',
    },

    {
      number: '04',

      label: 'Launch',

      description:
        'Take the work into market with media, technology, tracking and quality control working together.',
    },

    {
      number: '05',

      label: 'Learn & Scale',

      description:
        'Read the response, improve what matters and take the strongest parts of the system further.',
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
        'Trust-led communication for doctors, clinics, hospitals, healthcare services and wellness brands',
    },

    {
      label: 'Real Estate',

      sublabel:
        'Demand, positioning and lead-generation for developers, residential and commercial property brands',
    },

    {
      label: 'Education',

      sublabel:
        'Admissions, reputation and growth communication for institutions, courses and learning brands',
    },

    {
      label: 'E-Commerce & Retail',

      sublabel:
        'Brand, performance and commerce for D2C, retail, online stores and marketplace-led businesses',
    },

    {
      label: 'Automotive',

      sublabel:
        'Brand, product and acquisition campaigns across dealerships, automotive services and products',
    },

    {
      label: 'Professional Services',

      sublabel:
        'Positioning, demand generation and digital presence for B2B, consulting and service businesses',
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

              Built for Brands That Intend to Move.

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
              {' '}connecting strategy, creative, advertising, search and technology so the brand moves through the market as one connected idea.

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

              WHAT MOVES A BRAND

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

              Four Disciplines. One Direction.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Strong brands are rarely built by one channel acting alone. We connect
              <span className="text-yellow-500 font-semibold">
                {' '}strategy, creative, performance and technology
              </span>
              {' '}so the thinking, the experience and the media all move toward the same objective.

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

              We Don't Start With a Platform. We Start With the Problem.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              We begin with what needs to change — then decide what the brand should say, build and do. From there, we turn the thinking into
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

                One Founder. One Point of View. A Bigger Canvas.

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
                {' '}in Indore, shaped by years of hands-on work across websites, SEO and digital marketing — learning what makes brands easier to find, understand and choose.

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

                          Hands-on roots in websites, search and digital marketing — where strategy meets real execution.

                        </p>


                      </div>


                      <div className="flex items-start gap-3">


                        <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                        <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                          Built the agency around clear thinking, ownership of the work and direct client relationships.

                        </p>


                      </div>


                      <div className="flex items-start gap-3">


                        <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                        <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                          Leading Inchtomilez from its Indore foundation into its September 2026 Pune expansion — without losing the hands-on approach.

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

                      Inchtomilez began with one founder doing the work himself — building websites, solving search problems and working directly with businesses. That hands-on beginning shaped the agency's bias toward clarity, ownership and execution.

                    </p>


                    <p
                      className="text-[0.9375rem] leading-relaxed text-gray-300 mb-5"
                      style={{
                        lineHeight: 1.8
                      }}
                    >

                      As the briefs grew, so did the canvas. Search connected with advertising. Advertising connected with branding. Creative connected with media. Websites connected with technology. The agency evolved into a more integrated way of moving brands.

                    </p>


                    <p
                      className="text-[0.9375rem] leading-relaxed text-gray-300"
                      style={{
                        lineHeight: 1.8
                      }}
                    >

                      The principle never changed — understand what the business needs, make the thinking clear, and build work strong enough to travel beyond the pitch.

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

                Built in Indore. Moving Into Pune.

              </h2>


              <p
                className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
                style={{
                  lineHeight: 1.6
                }}
              >

                In September 2026, Inchtomilez steps into Pune — extending the same connected way of thinking into a new market while keeping strategy, creative and execution under one agency.

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

                    Indore is where Inchtomilez learned to do the work up close. It remains the foundation of our culture, our relationships and our hands-on way of building strategy into execution.

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

                    Our Pune presence brings Inchtomilez closer to ambitious businesses across technology, healthcare, real estate, education, manufacturing and the wider western India market.

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

                  Two cities. One agency. One way of thinking.

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

              Not Another Vendor. One Connected Direction.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              There is no universal marketing formula. The right move depends on the brand, the audience, the market and the problem — so we start with
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

              Different Capabilities. One Brand Experience.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Different problems need different disciplines. Use them independently when needed — or bring them together as
              <span className="text-yellow-500 font-semibold">
                {' '}one connected brand system.
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

              Different Markets. Different Reasons to Choose.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Healthcare needs trust. Real estate needs conviction. Retail needs desire. B2B needs clarity. The category changes — so the strategy should too.

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

              Because The Work Should Connect.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Your audience does not experience strategy, creative, media and technology as separate departments. Neither should your brand. We connect the work so every touchpoint reinforces the next.

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

              Think First. Build Properly. Keep Moving.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              A
              <span className="text-yellow-500 font-semibold">
                {' '}clear working process
              </span>
              {' '}keeps the idea from getting lost between the brief and the market. We move from understanding to direction, creation, launch and learning — without disconnecting the pieces.

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

                  Brands Should Mean Something.

                </h2>


                <p
                  className="text-[0.9375rem] leading-relaxed text-gray-300 max-w-3xl mx-auto mb-8"
                  style={{
                    lineHeight: 1.7
                  }}
                >

                  We believe the strongest brands do more than occupy media. They occupy memory. That takes clear thinking, a recognisable point of view and execution that keeps the same meaning wherever the audience meets the brand.

                </p>


                <p className="text-yellow-500 font-medium text-[0.9375rem]">

                  Clear thinking. Distinctive work. One connected brand.

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

                Ideas Worth Opening.

              </h2>


              <p
                className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-2xl mx-auto"
                style={{
                  lineHeight: 1.6
                }}
              >

                Occasional
                <span className="text-yellow-500 font-semibold">
                  {' '}thinking worth opening
                </span>
                {' '}on brands, advertising, digital, creative and technology — written to be useful, not to fill your inbox.

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

                  Send Me The Good Stuff

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

              THE NEXT MOVE

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-6">

              What Should Your Brand Become Next?

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Maybe the brand needs more attention. A sharper identity. Better advertising. A stronger digital experience. Or simply a clearer direction. Bring us the ambition — we'll start with what needs to move.

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
