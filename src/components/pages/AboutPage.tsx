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
        'To build brands people notice, remember and choose by connecting strategy, creative, media and technology around one clear direction.',
    },

    {
      icon: Target,

      label: 'Our Vision',

      description:
        'To build an independent Indian agency capable of thinking locally, operating nationally and creating ideas strong enough to travel across markets, mediums and cultures.',
    },

    {
      icon: Award,

      label: 'Our Approach',

      description:
        'We start with the business problem, find the idea, choose the right channels and build the experience around what the brand actually needs.',
    },

    {
      icon: Users,

      label: 'Founder-Led',

      description:
        'Founded by Aman Panwar in Indore, Inchtomilez stays close to the thinking, the client and the work that shapes every brand we touch.',
    },

    {
      icon: Globe,

      label: 'Our Presence',

      description:
        'Built in Indore and expanding through Pune in September 2026 — one connected agency, one standard of thinking, wherever the work needs to go.',
    },

    {
      icon: Trophy,

      label: 'Our Commitment',

      description:
        'We want every engagement to leave the brand clearer, stronger and more memorable than we found it — with better thinking behind every next move.',
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
        'Find what the brand needs to mean, who needs to care and where the real opportunity is. Strategy gives every next move a reason to exist.',
    },

    {
      icon: Palette,

      label: 'Creative',

      description:
        'Turn strategy into ideas, words and design people want to look at — and can still remember after the campaign is gone.',
    },

    {
      icon: TrendingUp,

      label: 'Performance',

      description:
        'Give the right idea the right audience at the right moment, then learn what earns attention, action and another look.',
    },

    {
      icon: Code,

      label: 'Technology',

      description:
        'Make the click worth it through websites, commerce and digital systems that turn attention into a useful brand experience.',
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
        'We ask what needs to change before asking where to advertise. Business, audience and context come before tactics.',
    },

    {
      icon: Shield,

      label: 'Communicate Clearly',

      description:
        'No theatre. No unnecessary jargon. What matters, what changed and what happens next should always be clear.',
    },

    {
      icon: CheckCircle,

      label: 'Launch Properly',

      description:
        'A strong idea still needs disciplined execution. Every detail, screen, placement and handoff should protect the same brand thought.',
    },

    {
      icon: BarChart3,

      label: 'Improve Continuously',

      description:
        'Launch is the beginning of learning, not the end of the work. We read the response, sharpen the system and keep moving.',
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
        'Understand what needs to change before choosing where to show up'
    },

    {
      label: 'One Brand. One Direction.',

      sublabel:
        'Every discipline works around the same central brand idea'
    },

    {
      label: 'Idea Before Format',

      sublabel:
        'Build the thought first, then let it travel across formats'
    },

    {
      label: 'Digital + Physical Thinking',

      sublabel:
        'The customer does not live in one channel; neither should the brand'
    },

    {
      label: 'Founder-Led Attention',

      sublabel:
        'Stay close to the work, the decisions and the client'
    },

    {
      label: 'Built To Evolve',

      sublabel:
        'Platforms change. Strong thinking should travel with them'
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

      label: 'Strategy & Brand Direction',

      description:
        'Positioning, market understanding and brand direction that decide what the business should say, where it should go and why people should care.',
    },

    {
      icon: Megaphone,

      label: 'Advertising & Media',

      description:
        'Paid media across search, social, video and high-intent moments — built around the audience, message and objective.',
    },

    {
      icon: Search,

      label: 'Search & Understandy',

      description:
        'Organic search, local discovery and content systems built to make the brand easier to find when people are already looking.',
    },

    {
      icon: Palette,

      label: 'Creative & Content',

      description:
        'Identity, campaigns, design, copy and content that turn brand strategy into something people can see, feel and remember.',
    },

    {
      icon: Code,

      label: 'Web & Digital Experiences',

      description:
        'Websites, commerce and digital products designed around clarity, speed and the moments between interest and action.',
    },

    {
      icon: Handshake,

      label: 'Connected Growth Management',

      description:
        'Keep strategy, creative, media and technology aligned as the work moves from launch to learning to scale.',
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
        'Strategy, creative, media, search and technology work better when they are solving the same brand problem together.',
    },

    {
      icon: Sparkles,

      label: 'Founder-Led Thinking',

      description:
        'The agency stays close to the business context, the central idea and the decisions that shape the final work.',
    },

    {
      icon: Trophy,

      label: 'Channel-Agnostic By Design',

      description:
        'The platform is never the strategy. We choose the medium because it fits the objective — not because it is easy to sell.',
    },

    {
      icon: Zap,

      label: 'Built To Launch',

      description:
        'Ideas are developed with the realities of creative, media and technology in mind, so they can survive contact with the real world.',
    },

    {
      icon: BarChart3,

      label: 'Data With Context',

      description:
        'Data should make the next decision smarter — not reduce the brand to a dashboard full of numbers without meaning.',
    },

    {
      icon: Heart,

      label: 'Long-Term Brand Building',

      description:
        'The goal is not one impressive campaign. It is a stronger brand after every campaign, launch and learning cycle.',
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
        'Business. Audience. Category. Competition. What is happening now — and what actually needs to change?',
    },

    {
      number: '02',

      label: 'Define',

      description:
        'Turn the problem into a clear objective, position, message, idea and role for every channel involved.',
    },

    {
      number: '03',

      label: 'Create',

      description:
        'Turn strategy into campaigns, content, design, websites and experiences that all feel like the same brand.',
    },

    {
      number: '04',

      label: 'Launch',

      description:
        'Put the work into the world with media, technology and execution aligned around one connected brand experience.',
    },

    {
      number: '05',

      label: 'Learn + Scale',

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

              We&apos;re Inchtomilez.

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

              Part agency. Part creative lab. Part growth engine — built in Indore
              and expanding through Pune in September 2026.

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

              Strategy gives direction. Creative earns attention. Media gives it scale.
              Technology makes the experience work. We bring all four together
              so the brand moves as one.

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

              Think. Create. Build. Amplify.

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

                Explore What We Do

                <ArrowRight className="w-5 h-5" />

              </Link>


              <Link
                to="/contact"
                className="glass-card px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold hover:scale-105"
              >

                Start Something

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

              One Brand. One Direction. Many Ways To Move It.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 max-w-4xl mx-auto mb-16 text-center"
              style={{
                lineHeight: 1.6
              }}
            >

              Inchtomilez is a
              <span className="text-yellow-500 font-semibold">
                {' '}founder-led independent agency
              </span>
              {' '}where strategy, creative, advertising, search, media and
              technology work around one brand — not six disconnected departments.

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

              HOW A BRAND MOVES

            </p>


            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">

              Four Disciplines. One Brand Experience.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              A brand is never experienced one department at a time. We connect
              <span className="text-yellow-500 font-semibold">
                {' '}strategy, creative, media and technology
              </span>
              {' '}so every touchpoint feels like part of the same idea — from
              first impression to final action.

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

              We Don't Start With A Platform.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              We begin with one question: what actually needs to change?
              Once that is clear, the idea, channel and experience have a reason to exist.
              <span className="text-yellow-500 font-semibold">
                {' '}Problem first. Platform later.
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

                Built By One Founder. Growing Beyond One City.

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
                {' '}in Indore — built from hands-on work across websites, search,
                advertising and the everyday realities of growing a business.

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

                          Hands-on foundation in websites, search, advertising and
                          digital growth.

                        </p>


                      </div>


                      <div className="flex items-start gap-3">


                        <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                        <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                          Built the agency around clear thinking, strong creative
                          and direct involvement in the work.

                        </p>


                      </div>


                      <div className="flex items-start gap-3">


                        <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />


                        <p className="text-[0.8125rem] text-gray-400 leading-relaxed">

                          Leading Inchtomilez from its Indore roots into its
                          September 2026 Pune expansion — without losing the founder-led way of working.

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

                      Inchtomilez did not begin with departments, a boardroom or a grand
                      launch. It began with one founder doing the work — building,
                      testing, learning and helping businesses understand what better
                      marketing could actually change.

                    </p>


                    <p
                      className="text-[0.9375rem] leading-relaxed text-gray-300 mb-5"
                      style={{
                        lineHeight: 1.8
                      }}
                    >

                      As the work grew, the agency moved beyond individual services into
                      a connected model — strategy shaping creative, creative shaping
                      media, media leading into digital experiences, and every part
                      learning from what happened next.

                    </p>


                    <p
                      className="text-[0.9375rem] leading-relaxed text-gray-300"
                      style={{
                        lineHeight: 1.8
                      }}
                    >

                      The principle is still the same — understand the business first,
                      find the strongest idea, execute it properly and keep improving
                      from how real people respond.

                    </p>


                  </div>


                </div>


                {/* Founder Quote */}

                <div className="mt-10 pt-10 border-t border-white/10">


                  <p className="text-[20px] md:text-[24px] font-medium text-white leading-[1.5] text-center">

                    “Duniya Brands Ke Peeche,
                    <span className="text-yellow-500">
                      {' '}Aur Brands Marketing Aur Advertising Ke!”
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

                Built In Indore. Growing Through Pune.

              </h2>


              <p
                className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto"
                style={{
                  lineHeight: 1.6
                }}
              >

                In September 2026, Inchtomilez expands into Pune — not to become
                another office on another map, but to bring the same founder-led
                thinking closer to more brands, industries and opportunities.

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

                    Indore is where the agency learned how to work — close to the
                    client, close to the idea and close to execution. It remains
                    the foundation of how Inchtomilez thinks and operates.

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

                    Pune takes the same Inchtomilez thinking into a larger business
                    ecosystem — closer to technology, healthcare, real estate,
                    education, manufacturing and the wider western India market.

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

                  Two cities. One agency. One way of thinking bigger.

                </p>


                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors text-[0.9375rem] font-medium"
                >

                  Talk To Inchtomilez

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

              Not Another Vendor. One Team Around The Brand.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              There is no universal media plan, content calendar or growth formula.
              The right answer depends on the brand, audience, market and moment —
              so we begin with
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

              Different Disciplines. One Connected Brand System.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Different brand problems need different disciplines. What matters is
              that every discipline knows the same objective and protects the same
              <span className="text-yellow-500 font-semibold">
                {' '}central brand idea.
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

              Different Markets. Different Reasons To Choose.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Healthcare needs trust. Fashion needs desire. Technology needs clarity.
              Real estate needs conviction. The category changes, the audience changes
              and the strategy should change with them.

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

              The Work Works Better When It Connects.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              Your audience never sees your departments. They see one brand. Our job is
              to make strategy, creative, media, search and technology feel like
              one connected experience from the outside too.

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

              From Question To Impact.

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-16 text-center max-w-3xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              A
              <span className="text-yellow-500 font-semibold">
                {' '}connected working process
              </span>
              {' '}keeps the question, idea, execution and learning aligned from
              the first conversation to the next stage of scale.

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

                  Not simply exist. Not simply advertise. Not simply post. A brand should
                  mean something to the person searching, watching, buying or meeting
                  it for the first time. The work should make that meaning stronger.

                </p>


                <p className="text-yellow-500 font-medium text-[0.9375rem]">

                  Strategy that moves. Creative that stays.

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

                Ideas Worth Opening

              </h2>


              <p
                className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 max-w-2xl mx-auto"
                style={{
                  lineHeight: 1.6
                }}
              >

                Occasional thinking on
                <span className="text-yellow-500 font-semibold">
                  {' '}brands, advertising and attention
                </span>
                {' '}— plus what is changing across search, creative, technology
                and the way people choose.

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

                Leave whenever you want. No hard feelings.

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

              What Do You Want People To Remember?

            </h2>


            <p
              className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto"
              style={{
                lineHeight: 1.6
              }}
            >

              A new brand. A launch. A campaign. A digital experience. Or simply an
              idea that deserves to become much bigger. Bring us the ambition.
              We will bring the thinking, the craft and the system around it.

            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center">


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

                Explore What We Do

              </Link>


            </div>


          </div>


        </div>


      </section>


    </div>

  );




}
