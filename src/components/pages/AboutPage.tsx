import { Link } from 'react-router';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Code2,
  Globe2,
  Handshake,
  Lightbulb,
  MapPin,
  Megaphone,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

import { useEffect, useState, type FormEvent } from 'react';

import { AnimatedSection } from '../ui/AnimatedSection';
import { OutlinedText } from '../ui/OutlinedText';
import { EarthGlobe } from '../ui/EarthGlobe';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHeadSSG } from '../SEOHeadSSG';

import {
  useSEO,
  StructuredData,
  organizationSchema,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '../../utils/seo-system';

export function AboutPage() {
  const seo = useSEO();

  const [email, setEmail] = useState('');
  const [isDesktop, setIsDesktop] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | PERFORMANCE
  |--------------------------------------------------------------------------
  |
  | The previous page mounted separate mobile + desktop EarthGlobe components.
  | That is expensive because both components can initialize even when one is
  | hidden using CSS.
  |
  | We render only ONE globe and change its size based on viewport.
  |
  */

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateViewport();

    mediaQuery.addEventListener('change', updateViewport);

    return () => {
      mediaQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  /*
  |--------------------------------------------------------------------------
  | CORE CAPABILITIES
  |--------------------------------------------------------------------------
  */

  const capabilities = [
    {
      number: '01',
      icon: Target,
      title: 'Strategy',
      text:
        'Business understanding, positioning, market research, campaign planning and clear digital growth roadmaps.',
    },
    {
      number: '02',
      icon: Palette,
      title: 'Creative',
      text:
        'Brand identity, campaign ideas, social media creative, advertising assets and visual communication designed to earn attention.',
    },
    {
      number: '03',
      icon: TrendingUp,
      title: 'Performance',
      text:
        'Search, paid media, lead generation, optimization and measurable digital campaigns focused on business outcomes.',
    },
    {
      number: '04',
      icon: Code2,
      title: 'Technology',
      text:
        'Websites, landing pages, e-commerce, technical optimization and digital experiences engineered around performance.',
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | DIFFERENTIATORS
  |--------------------------------------------------------------------------
  */

  const differentiators = [
    {
      icon: Search,
      title: 'We Understand Before We Advertise',
      text:
        'We study the business, customer, competition and objective before deciding which marketing channel deserves investment.',
    },
    {
      icon: Sparkles,
      title: 'Creative With Commercial Purpose',
      text:
        'We do not separate beautiful design from business performance. Creative direction should strengthen both perception and conversion.',
    },
    {
      icon: BarChart3,
      title: 'Decisions Backed by Performance',
      text:
        'Campaigns are continuously reviewed, tested and refined using meaningful data instead of vanity metrics alone.',
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | VALUES
  |--------------------------------------------------------------------------
  */

  const values = [
    {
      icon: ShieldCheck,
      title: 'Clarity',
      text:
        'Clear communication, defined expectations and straightforward discussions about priorities and performance.',
    },
    {
      icon: CheckCircle2,
      title: 'Accountability',
      text:
        'Every recommendation should have a reason, every campaign should have an objective and every result should teach us something.',
    },
    {
      icon: Handshake,
      title: 'Partnership',
      text:
        'We work best when agency expertise and client knowledge operate as one connected growth team.',
    },
    {
      icon: Zap,
      title: 'Continuous Improvement',
      text:
        'Digital markets change quickly. We continuously learn, test, optimize and improve instead of relying on fixed formulas.',
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | TRACK RECORD
  |--------------------------------------------------------------------------
  */

  const stats = [
    { value: '96+', label: 'Clients Served' },
    { value: '100+', label: 'Brands Worked With' },
    { value: '60+', label: 'Websites Delivered' },
    { value: '74+', label: 'Marketing Campaigns' },
    { value: '12+', label: 'Industries' },
    { value: '13+', label: 'International Campaigns' },
  ];

  /*
  |--------------------------------------------------------------------------
  | INDUSTRIES
  |--------------------------------------------------------------------------
  */

  const industries = [
    'Healthcare',
    'Real Estate',
    'Education',
    'E-Commerce',
    'Automotive',
    'Hospitality',
    'Technology',
    'Retail',
    'Professional Services',
    'FMCG',
    'Jewellery',
    'Growing Businesses',
  ];

  /*
  |--------------------------------------------------------------------------
  | PROCESS
  |--------------------------------------------------------------------------
  */

  const process = [
    {
      number: '01',
      title: 'Discover',
      text:
        'Understand your business, customers, competition, challenges and growth objectives.',
    },
    {
      number: '02',
      title: 'Strategize',
      text:
        'Define priorities, channels, positioning, creative direction, KPIs and execution roadmap.',
    },
    {
      number: '03',
      title: 'Create',
      text:
        'Turn strategy into campaigns, content, design, websites and communication assets.',
    },
    {
      number: '04',
      title: 'Execute',
      text:
        'Launch systematically with strong implementation, testing and quality control.',
    },
    {
      number: '05',
      title: 'Optimize',
      text:
        'Study real performance, improve what works and eliminate what does not.',
    },
    {
      number: '06',
      title: 'Scale',
      text:
        'Expand successful systems intelligently as the business and opportunity grow.',
    },
  ];

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log('Newsletter signup:', email);

    setEmail('');
  };

  return (
    <div className="bg-black text-white overflow-hidden">

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

      <Breadcrumbs
        items={breadcrumbs}
        showHomeIcon={true}
      />


      {/* ================================================================
          HERO
      ================================================================ */}

      <section className="relative min-h-[92vh] flex items-center overflow-hidden">

        {/* AMOLED radial glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-yellow-500/[0.08] blur-[120px] pointer-events-none" />

        <div className="absolute left-[-250px] bottom-[-300px] w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[120px] pointer-events-none" />

        {/* Background outlined text */}
        <div
          className="absolute top-[6%] left-1/2 -translate-x-1/2 text-[7rem] sm:text-[10rem] md:text-[13rem] font-bold text-outlined-visible-full pointer-events-none select-none whitespace-nowrap opacity-40"
          aria-hidden="true"
        >
          ABOUT
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-4">

            {/* Hero content */}
            <div className="max-w-3xl pt-16 lg:pt-0">

              <AnimatedSection animation="fadeInUp" delay={0.05}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/25 bg-yellow-500/[0.06] text-yellow-500 text-[12px] font-medium uppercase tracking-[0.18em] mb-7">
                  <Sparkles className="w-4 h-4" />
                  About Inchtomilez
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.12}>
                <h1 className="text-[34px] sm:text-[42px] md:text-[52px] lg:text-[58px] font-semibold tracking-[-0.035em] leading-[1.08] mb-7 max-w-3xl">
                  We Don&apos;t Just Market Brands.
                  <span className="text-yellow-500">
                    {' '}We Help Move Them Forward.
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.2}>
                <p className="text-[15px] md:text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-4">
                  Inchtomilez is an independent digital marketing and
                  advertising agency bringing together strategy, creative
                  thinking, performance marketing and technology to help
                  businesses build stronger brands and create measurable
                  growth.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.28}>
                <p className="text-[14px] md:text-[15px] text-gray-500 leading-[1.8] max-w-2xl mb-9">
                  Founded by Aman Panwar in Indore and expanding our presence
                  into Pune in September 2026, we continue to grow with the
                  same principle: understand the business first, then build
                  the marketing around it.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.36}>
                <div className="flex flex-col sm:flex-row gap-3">

                  <Link
                    to="/services"
                    className="group inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-[14px] px-7 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Explore Our Services
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center gap-2 border border-white/15 hover:border-yellow-500/50 bg-white/[0.035] hover:bg-white/[0.06] text-white font-medium text-[14px] px-7 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Start a Conversation
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.44}>
                <div className="flex flex-wrap gap-x-7 gap-y-3 mt-10 text-[12px] text-gray-500">

                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-yellow-500" />
                    Indore
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-yellow-500" />
                    Pune
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-yellow-500" />
                    India + International
                  </span>

                </div>
              </AnimatedSection>

            </div>


            {/* Single optimized globe */}
            <div className="relative flex justify-center items-center min-h-[360px] md:min-h-[520px]">

              <AnimatedSection animation="fadeIn" delay={0.3}>

                <div className="relative">

                  <EarthGlobe
                    size={isDesktop ? 520 : 310}
                    particleCount={isDesktop ? 360 : 160}
                    rotationSpeed={0.00065}
                    glowIntensity={0.32}
                    className="animate-float"
                  />

                  <div className="absolute inset-0 rounded-full bg-yellow-500/[0.025] blur-[70px] -z-10" />

                </div>

              </AnimatedSection>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          IDENTITY — ASYMMETRIC LAYOUT
      ================================================================ */}

      <section className="relative py-20 md:py-28 [content-visibility:auto] [contain-intrinsic-size:800px]">

        <OutlinedText
          text="IDENTITY"
          className="absolute top-[12%] right-0 text-[8rem] md:text-[13rem] pointer-events-none"
          direction="right"
          stopPosition={30}
          parallax={true}
          parallaxSpeed={0.2}
          delay={0}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start max-w-6xl mx-auto">

            <AnimatedSection animation="fadeInUp" delay={0.05}>

              <div className="lg:sticky lg:top-28">

                <p className="text-yellow-500 text-[12px] font-medium tracking-[0.18em] uppercase mb-5">
                  Who We Are
                </p>

                <h2 className="text-[28px] md:text-[38px] font-semibold tracking-[-0.025em] leading-[1.18] mb-6">
                  A Digital Agency Built Around
                  <span className="text-yellow-500"> Business Growth.</span>
                </h2>

                <p className="text-[15px] text-gray-400 leading-[1.8]">
                  Marketing is not one advertisement, one website or one
                  platform. It is the complete experience a business creates
                  across strategy, communication, technology and customer
                  acquisition.
                </p>

              </div>

            </AnimatedSection>


            <div className="space-y-4">

              <AnimatedSection animation="fadeInUp" delay={0.1}>

                <div className="group border border-white/[0.08] hover:border-yellow-500/30 bg-white/[0.025] rounded-2xl p-7 md:p-9 transition-all duration-300">

                  <div className="flex flex-col md:flex-row md:items-start gap-6">

                    <div className="w-11 h-11 rounded-xl bg-yellow-500 text-black flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5" />
                    </div>

                    <div>

                      <h3 className="text-[19px] font-semibold mb-3">
                        Business Before Marketing
                      </h3>

                      <p className="text-[14px] text-gray-400 leading-[1.75]">
                        Before deciding whether you need SEO, paid advertising,
                        social media, branding or a new website, we first
                        understand where the business is today and where it
                        wants to go.
                      </p>

                    </div>

                  </div>

                </div>

              </AnimatedSection>


              <AnimatedSection animation="fadeInUp" delay={0.16}>

                <div className="group border border-white/[0.08] hover:border-yellow-500/30 bg-white/[0.025] rounded-2xl p-7 md:p-9 transition-all duration-300 md:ml-10">

                  <div className="flex flex-col md:flex-row md:items-start gap-6">

                    <div className="w-11 h-11 rounded-xl border border-yellow-500/30 bg-yellow-500/[0.08] text-yellow-500 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-5 h-5" />
                    </div>

                    <div>

                      <h3 className="text-[19px] font-semibold mb-3">
                        Creativity With a Reason
                      </h3>

                      <p className="text-[14px] text-gray-400 leading-[1.75]">
                        We believe design and creative communication should not
                        exist only to look impressive. Every creative decision
                        should strengthen positioning, attention, trust or
                        conversion.
                      </p>

                    </div>

                  </div>

                </div>

              </AnimatedSection>


              <AnimatedSection animation="fadeInUp" delay={0.22}>

                <div className="group border border-white/[0.08] hover:border-yellow-500/30 bg-white/[0.025] rounded-2xl p-7 md:p-9 transition-all duration-300">

                  <div className="flex flex-col md:flex-row md:items-start gap-6">

                    <div className="w-11 h-11 rounded-xl border border-yellow-500/30 bg-yellow-500/[0.08] text-yellow-500 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-5 h-5" />
                    </div>

                    <div>

                      <h3 className="text-[19px] font-semibold mb-3">
                        Performance With Perspective
                      </h3>

                      <p className="text-[14px] text-gray-400 leading-[1.75]">
                        Data matters, but context matters too. We look at
                        performance together with customer behavior, market
                        conditions, creative quality and the wider commercial
                        objective.
                      </p>

                    </div>

                  </div>

                </div>

              </AnimatedSection>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          FOUNDER — EDITORIAL LAYOUT
      ================================================================ */}

      <section className="relative py-20 md:py-28 border-y border-white/[0.06] [content-visibility:auto] [contain-intrinsic-size:700px]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-stretch">


            {/* Quote */}
            <AnimatedSection animation="fadeInUp" delay={0.05}>

              <div className="relative h-full min-h-[400px] bg-yellow-500 rounded-3xl p-8 md:p-11 text-black overflow-hidden">

                <div className="absolute -right-8 -bottom-12 text-[12rem] font-black opacity-[0.08] leading-none">
                  “
                </div>

                <p className="text-[12px] uppercase tracking-[0.18em] font-semibold opacity-70 mb-16">
                  A Thought By The Founder
                </p>

                <blockquote className="relative z-10">

                  <p className="text-[28px] md:text-[38px] font-semibold tracking-[-0.03em] leading-[1.2]">
                    “Duniya Brands Ke Peeche,
                    Aur Brands Marketing Ke Peeche.”
                  </p>

                  <footer className="mt-10">

                    <p className="font-semibold text-[15px]">
                      Aman Panwar
                    </p>

                    <p className="text-[13px] opacity-70 mt-1">
                      Founder, Inchtomilez
                    </p>

                  </footer>

                </blockquote>

              </div>

            </AnimatedSection>


            {/* Founder story */}
            <AnimatedSection animation="fadeInUp" delay={0.12}>

              <div className="h-full border border-white/[0.08] bg-white/[0.025] rounded-3xl p-8 md:p-11">

                <p className="text-yellow-500 text-[12px] font-medium tracking-[0.18em] uppercase mb-5">
                  Founder&apos;s Perspective
                </p>

                <h2 className="text-[27px] md:text-[35px] font-semibold tracking-[-0.025em] leading-[1.2] mb-7">
                  One Founder.
                  <br />
                  One Idea.
                  <br />
                  <span className="text-gray-500">
                    A Growing Agency.
                  </span>
                </h2>

                <div className="space-y-5 text-[14px] text-gray-400 leading-[1.8]">

                  <p>
                    Inchtomilez was founded by Aman Panwar in Indore with a
                    hands-on approach to digital work and a belief that
                    businesses deserve more than disconnected marketing
                    activities.
                  </p>

                  <p>
                    The agency evolved around the idea of bringing strategy,
                    marketing, creative execution and technology together so
                    every part of a brand&apos;s digital presence can support
                    the same commercial objective.
                  </p>

                  <p>
                    As Inchtomilez grows, the objective remains unchanged:
                    build intelligently, communicate clearly and keep improving
                    the work.
                  </p>

                </div>

              </div>

            </AnimatedSection>

          </div>

        </div>

      </section>


      {/* ================================================================
          CAPABILITIES — FOUR DIFFERENT BANDS
      ================================================================ */}

      <section className="relative py-20 md:py-28 [content-visibility:auto] [contain-intrinsic-size:900px]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto">

            <AnimatedSection animation="fadeInUp" delay={0.05}>

              <div className="max-w-3xl mb-12 md:mb-16">

                <p className="text-yellow-500 text-[12px] font-medium tracking-[0.18em] uppercase mb-5">
                  What We Bring Together
                </p>

                <h2 className="text-[29px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.15] mb-5">
                  Four Disciplines.
                  <br />
                  <span className="text-gray-500">
                    One Connected Growth System.
                  </span>
                </h2>

                <p className="text-[15px] text-gray-400 leading-[1.8]">
                  The strongest brands rarely grow through one channel alone.
                  We connect the disciplines that shape perception, demand,
                  conversion and digital experience.
                </p>

              </div>

            </AnimatedSection>


            <div className="border-t border-white/[0.08]">

              {capabilities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <AnimatedSection
                    key={item.title}
                    animation="fadeInUp"
                    delay={0.05 + index * 0.06}
                  >
                    <div className="group grid md:grid-cols-[90px_1fr_1.2fr_60px] items-center gap-5 py-8 md:py-9 border-b border-white/[0.08] hover:bg-white/[0.025] transition-all duration-300 px-2 md:px-5">

                      <span className="text-[12px] text-gray-600 font-medium">
                        {item.number}
                      </span>

                      <div className="flex items-center gap-4">

                        <div className="w-10 h-10 rounded-xl border border-white/10 group-hover:border-yellow-500/40 group-hover:bg-yellow-500/[0.08] flex items-center justify-center transition-all duration-300">
                          <Icon className="w-5 h-5 text-yellow-500" />
                        </div>

                        <h3 className="text-[19px] md:text-[22px] font-semibold">
                          {item.title}
                        </h3>

                      </div>

                      <p className="text-[13px] md:text-[14px] text-gray-500 leading-[1.75]">
                        {item.text}
                      </p>

                      <ArrowRight className="hidden md:block w-5 h-5 text-gray-700 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all duration-300" />

                    </div>
                  </AnimatedSection>
                );
              })}

            </div>


            <AnimatedSection animation="fadeInUp" delay={0.2}>

              <div className="mt-10">

                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 text-[14px] font-medium transition-colors"
                >
                  View All Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>

            </AnimatedSection>

          </div>

        </div>

      </section>


      {/* ================================================================
          WHY DIFFERENT — SPLIT EDITORIAL
      ================================================================ */}

      <section className="relative py-20 md:py-28 bg-white/[0.018] [content-visibility:auto] [contain-intrinsic-size:800px]">

        <OutlinedText
          text="DIFFERENT"
          className="absolute top-[10%] left-0 text-[7rem] md:text-[12rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.18}
          delay={0}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">

            <AnimatedSection animation="fadeInUp" delay={0.05}>

              <div>

                <p className="text-yellow-500 text-[12px] font-medium tracking-[0.18em] uppercase mb-5">
                  Why Inchtomilez
                </p>

                <h2 className="text-[30px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.13] mb-7">
                  We Are Not Built Like a
                  <span className="text-yellow-500">
                    {' '}Production Line.
                  </span>
                </h2>

                <p className="text-[15px] text-gray-400 leading-[1.8] max-w-xl mb-8">
                  Every business has a different market, customer, challenge
                  and stage of growth. We do not believe the same template can
                  solve all of them.
                </p>

                <div className="flex items-center gap-3 text-[13px] text-gray-500">
                  <div className="w-8 h-[1px] bg-yellow-500" />
                  Strategy before activity.
                </div>

              </div>

            </AnimatedSection>


            <div className="space-y-5">

              {differentiators.map((item, index) => {
                const Icon = item.icon;

                return (
                  <AnimatedSection
                    key={item.title}
                    animation="fadeInUp"
                    delay={0.1 + index * 0.08}
                  >
                    <div className="group grid grid-cols-[46px_1fr] gap-5 p-6 rounded-2xl border border-white/[0.08] hover:border-yellow-500/30 bg-black transition-all duration-300 hover:translate-x-1">

                      <div className="w-11 h-11 rounded-xl bg-white/[0.045] group-hover:bg-yellow-500 group-hover:text-black flex items-center justify-center text-yellow-500 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>

                        <h3 className="text-[17px] font-semibold mb-2">
                          {item.title}
                        </h3>

                        <p className="text-[13px] text-gray-500 leading-[1.7]">
                          {item.text}
                        </p>

                      </div>

                    </div>
                  </AnimatedSection>
                );
              })}

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          PRESENCE — INDORE + PUNE
      ================================================================ */}

      <section className="relative py-20 md:py-28 [content-visibility:auto] [contain-intrinsic-size:700px]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto">

            <AnimatedSection animation="fadeInUp" delay={0.05}>

              <div className="text-center max-w-3xl mx-auto mb-12">

                <p className="text-yellow-500 text-[12px] font-medium tracking-[0.18em] uppercase mb-5">
                  Our Presence
                </p>

                <h2 className="text-[29px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.15] mb-5">
                  Built in Indore.
                  <span className="text-yellow-500">
                    {' '}Expanding Into Pune.
                  </span>
                </h2>

                <p className="text-[14px] text-gray-500 leading-[1.8]">
                  September 2026 marks the next stage of our growth as we
                  expand our presence while continuing to operate as one
                  connected agency.
                </p>

              </div>

            </AnimatedSection>


            <div className="grid md:grid-cols-2 gap-5">

              <AnimatedSection animation="fadeInUp" delay={0.1}>

                <div className="group relative min-h-[320px] p-8 md:p-10 rounded-3xl border border-white/[0.08] bg-white/[0.025] hover:border-yellow-500/25 overflow-hidden transition-all duration-300">

                  <div className="absolute right-[-30px] bottom-[-55px] text-[11rem] font-black text-white/[0.018] select-none">
                    IN
                  </div>

                  <Building2 className="w-7 h-7 text-yellow-500 mb-16" />

                  <p className="text-[12px] uppercase tracking-[0.18em] text-gray-600 mb-3">
                    Our Foundation
                  </p>

                  <h3 className="text-[27px] font-semibold mb-4">
                    Indore
                  </h3>

                  <p className="text-[14px] text-gray-500 leading-[1.75] max-w-md mb-8">
                    The city where Inchtomilez was founded, built and shaped.
                    Indore remains the foundation of our agency and our
                    operations.
                  </p>

                  <div className="inline-flex items-center gap-2 text-[13px] text-gray-400">
                    <MapPin className="w-4 h-4 text-yellow-500" />
                    Vijay Nagar, Indore
                  </div>

                </div>

              </AnimatedSection>


              <AnimatedSection animation="fadeInUp" delay={0.16}>

                <div className="group relative min-h-[320px] p-8 md:p-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/[0.09] via-yellow-500/[0.025] to-transparent hover:border-yellow-500/40 overflow-hidden transition-all duration-300">

                  <div className="absolute right-[-30px] bottom-[-55px] text-[11rem] font-black text-yellow-500/[0.035] select-none">
                    PN
                  </div>

                  <Rocket className="w-7 h-7 text-yellow-500 mb-16" />

                  <p className="text-[12px] uppercase tracking-[0.18em] text-yellow-500 mb-3">
                    September 2026
                  </p>

                  <h3 className="text-[27px] font-semibold mb-4">
                    Pune
                  </h3>

                  <p className="text-[14px] text-gray-400 leading-[1.75] max-w-md mb-8">
                    Our Pune expansion places us closer to businesses across
                    one of India&apos;s most active technology, healthcare,
                    real estate, education and enterprise ecosystems.
                  </p>

                  <div className="inline-flex items-center gap-2 text-[13px] text-gray-300">
                    <MapPin className="w-4 h-4 text-yellow-500" />
                    Nashik Phata, Pimpri-Chinchwad, Pune
                  </div>

                </div>

              </AnimatedSection>

            </div>


            <AnimatedSection animation="fadeInUp" delay={0.2}>

              <div className="flex justify-center mt-8">

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-[13px] text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Contact Our Offices
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>

            </AnimatedSection>

          </div>

        </div>

      </section>


      {/* ================================================================
          TRACK RECORD — AMOLED METRICS
      ================================================================ */}

      <section className="py-20 md:py-28 border-y border-white/[0.06] [content-visibility:auto] [contain-intrinsic-size:650px]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto">

            <AnimatedSection animation="fadeInUp" delay={0.05}>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

                <div>

                  <p className="text-yellow-500 text-[12px] font-medium tracking-[0.18em] uppercase mb-4">
                    Track Record
                  </p>

                  <h2 className="text-[29px] md:text-[39px] font-semibold tracking-[-0.03em] leading-[1.15]">
                    Experience Built Through
                    <span className="text-gray-500"> Execution.</span>
                  </h2>

                </div>

                <p className="max-w-md text-[13px] text-gray-600 leading-[1.7]">
                  Numbers do not tell the entire story, but they show the
                  volume of real-world work behind our learning.
                </p>

              </div>

            </AnimatedSection>


            <div className="grid grid-cols-2 lg:grid-cols-3 border-l border-t border-white/[0.08]">

              {stats.map((stat, index) => (
                <AnimatedSection
                  key={stat.label}
                  animation="fadeInUp"
                  delay={0.04 + index * 0.04}
                >
                  <div className="group min-h-[170px] md:min-h-[200px] p-6 md:p-8 border-r border-b border-white/[0.08] hover:bg-yellow-500 transition-all duration-300">

                    <div className="text-[34px] md:text-[46px] font-semibold tracking-[-0.04em] text-yellow-500 group-hover:text-black transition-colors duration-300 mb-4">
                      {stat.value}
                    </div>

                    <p className="text-[12px] md:text-[13px] text-gray-500 group-hover:text-black/70 transition-colors duration-300">
                      {stat.label}
                    </p>

                  </div>
                </AnimatedSection>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          INDUSTRIES — TAG MATRIX
      ================================================================ */}

      <section className="py-20 md:py-28 [content-visibility:auto] [contain-intrinsic-size:650px]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">

            <AnimatedSection animation="fadeInUp" delay={0.05}>

              <div>

                <p className="text-yellow-500 text-[12px] font-medium tracking-[0.18em] uppercase mb-5">
                  Industry Experience
                </p>

                <h2 className="text-[29px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.15] mb-6">
                  Different Markets Need
                  <span className="text-yellow-500">
                    {' '}Different Thinking.
                  </span>
                </h2>

                <p className="text-[14px] text-gray-500 leading-[1.8] mb-8">
                  Customer behavior, sales cycles, competition and economics
                  differ by industry. Marketing strategy should reflect those
                  differences.
                </p>

                <Link
                  to="/industries"
                  className="group inline-flex items-center gap-2 text-[14px] font-medium text-yellow-500 hover:text-yellow-400"
                >
                  Explore Industries
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>

            </AnimatedSection>


            <AnimatedSection animation="fadeInUp" delay={0.12}>

              <div className="flex flex-wrap gap-3">

                {industries.map((industry, index) => (
                  <div
                    key={industry}
                    className={`px-5 py-3.5 rounded-full border text-[13px] transition-all duration-300 hover:-translate-y-0.5 ${
                      index % 4 === 0
                        ? 'border-yellow-500/35 text-yellow-500 bg-yellow-500/[0.05]'
                        : 'border-white/[0.1] text-gray-400 bg-white/[0.025] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {industry}
                  </div>
                ))}

              </div>

            </AnimatedSection>

          </div>

        </div>

      </section>


      {/* ================================================================
          VALUES — 2X2
      ================================================================ */}

      <section className="py-20 md:py-28 bg-white/[0.018] [content-visibility:auto] [contain-intrinsic-size:750px]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto">

            <AnimatedSection animation="fadeInUp" delay={0.05}>

              <div className="text-center max-w-3xl mx-auto mb-12">

                <p className="text-yellow-500 text-[12px] font-medium tracking-[0.18em] uppercase mb-5">
                  How We Work
                </p>

                <h2 className="text-[29px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.15]">
                  Simple Principles.
                  <span className="text-gray-500"> Serious Execution.</span>
                </h2>

              </div>

            </AnimatedSection>


            <div className="grid md:grid-cols-2 gap-4">

              {values.map((item, index) => {
                const Icon = item.icon;

                return (
                  <AnimatedSection
                    key={item.title}
                    animation="fadeInUp"
                    delay={0.08 + index * 0.05}
                  >
                    <div className="group min-h-[230px] border border-white/[0.08] bg-black rounded-2xl p-7 md:p-8 hover:border-yellow-500/30 transition-all duration-300">

                      <div className="flex justify-between items-start mb-10">

                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] group-hover:bg-yellow-500 flex items-center justify-center text-yellow-500 group-hover:text-black transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>

                        <span className="text-[11px] text-gray-700">
                          0{index + 1}
                        </span>

                      </div>

                      <h3 className="text-[19px] font-semibold mb-3">
                        {item.title}
                      </h3>

                      <p className="text-[13px] text-gray-500 leading-[1.75]">
                        {item.text}
                      </p>

                    </div>
                  </AnimatedSection>
                );
              })}

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          PROCESS — TIMELINE WITHOUT HISTORY
      ================================================================ */}

      <section className="relative py-20 md:py-28 [content-visibility:auto] [contain-intrinsic-size:850px]">

        <OutlinedText
          text="PROCESS"
          className="absolute top-[8%] right-0 text-[8rem] md:text-[13rem] pointer-events-none"
          direction="right"
          stopPosition={30}
          parallax={true}
          parallaxSpeed={0.18}
          delay={0}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="max-w-6xl mx-auto">

            <AnimatedSection animation="fadeInUp" delay={0.05}>

              <div className="max-w-3xl mb-14">

                <p className="text-yellow-500 text-[12px] font-medium tracking-[0.18em] uppercase mb-5">
                  Our Process
                </p>

                <h2 className="text-[29px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.15] mb-5">
                  From Understanding
                  <span className="text-yellow-500"> To Scale.</span>
                </h2>

                <p className="text-[14px] text-gray-500 leading-[1.8]">
                  A clear process keeps strategy, creativity, execution and
                  optimization moving in the same direction.
                </p>

              </div>

            </AnimatedSection>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.08] border border-white/[0.08]">

              {process.map((step, index) => (
                <AnimatedSection
                  key={step.number}
                  animation="fadeInUp"
                  delay={0.05 + index * 0.04}
                >
                  <div className="group relative min-h-[240px] bg-black p-7 md:p-8 hover:bg-white/[0.025] transition-all duration-300">

                    <div className="flex justify-between items-start mb-12">

                      <span className="text-yellow-500 text-[13px] font-medium">
                        {step.number}
                      </span>

                      {index < process.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-800 group-hover:text-yellow-500 transition-colors" />
                      )}

                    </div>

                    <h3 className="text-[20px] font-semibold mb-3">
                      {step.title}
                    </h3>

                    <p className="text-[13px] text-gray-500 leading-[1.7]">
                      {step.text}
                    </p>

                  </div>
                </AnimatedSection>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          AGENCY STATEMENT
      ================================================================ */}

      <section className="py-20 md:py-28 [content-visibility:auto] [contain-intrinsic-size:650px]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <AnimatedSection animation="fadeInUp" delay={0.05}>

            <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[28px] border border-yellow-500/20 bg-yellow-500 p-8 sm:p-10 md:p-14 text-black">

              <div className="absolute -right-16 -bottom-24 w-[360px] h-[360px] rounded-full border-[70px] border-black/[0.04]" />

              <div className="relative z-10 max-w-4xl">

                <p className="text-[12px] uppercase tracking-[0.18em] font-semibold opacity-60 mb-7">
                  What We Believe
                </p>

                <h2 className="text-[30px] md:text-[46px] font-semibold tracking-[-0.035em] leading-[1.12] mb-8">
                  A Great Agency Should Make the Business
                  Smarter About Marketing — Not More Dependent on Jargon.
                </h2>

                <p className="text-[14px] md:text-[15px] leading-[1.8] max-w-3xl opacity-75">
                  We believe clients should understand the strategy, the
                  opportunity, the challenge and the reason behind the work.
                  The best partnerships are built when both sides understand
                  where the business is going.
                </p>

              </div>

            </div>

          </AnimatedSection>

        </div>

      </section>


      {/* ================================================================
          NEWSLETTER — LIGHTWEIGHT
      ================================================================ */}

      <section className="py-20 md:py-24 border-t border-white/[0.06] [content-visibility:auto] [contain-intrinsic-size:450px]">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <AnimatedSection animation="fadeInUp" delay={0.05}>

            <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_0.85fr] gap-8 lg:gap-14 items-center">

              <div>

                <p className="text-yellow-500 text-[12px] uppercase tracking-[0.18em] mb-4">
                  Ideas & Insights
                </p>

                <h2 className="text-[25px] md:text-[34px] font-semibold tracking-[-0.025em] mb-4">
                  Useful Marketing Thinking.
                  <span className="text-gray-500"> Without the Noise.</span>
                </h2>

                <p className="text-[13px] text-gray-500 leading-[1.75]">
                  Insights on marketing, branding, advertising, SEO,
                  technology and digital growth.
                </p>

              </div>


              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="min-w-0 flex-1 h-12 px-5 bg-white/[0.035] border border-white/[0.1] rounded-lg text-white text-[13px] placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/60 transition-colors"
                  required
                />

                <button
                  type="submit"
                  className="h-12 px-6 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
                >
                  Subscribe
                </button>

              </form>

            </div>

          </AnimatedSection>

        </div>

      </section>


      {/* ================================================================
          FINAL CTA
      ================================================================ */}

      <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/[0.06]">

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-yellow-500/[0.06] blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="max-w-4xl mx-auto text-center">

            <AnimatedSection animation="fadeInUp" delay={0.05}>

              <p className="text-yellow-500 text-[12px] uppercase tracking-[0.18em] mb-6">
                What&apos;s Your Next Mile?
              </p>

            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.12}>

              <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.035em] leading-[1.12] mb-7">
                You Know Where You Want to Go.
                <br />
                <span className="text-gray-500">
                  Let&apos;s Build the Way There.
                </span>
              </h2>

            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>

              <p className="text-[14px] md:text-[15px] text-gray-500 leading-[1.8] max-w-2xl mx-auto mb-10">
                Whether you are building a brand, generating demand,
                improving your digital presence or looking for a long-term
                marketing partner, we would like to understand the next
                objective.
              </p>

            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.28}>

              <div className="flex flex-col sm:flex-row justify-center gap-3">

                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-7 py-3.5 rounded-lg text-[14px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start a Conversation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/services"
                  className="group inline-flex items-center justify-center gap-2 bg-white/[0.035] hover:bg-white/[0.06] border border-white/[0.1] hover:border-white/20 text-white px-7 py-3.5 rounded-lg text-[14px] font-medium transition-all duration-300 hover:-translate-y-0.5"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>

            </AnimatedSection>

          </div>

        </div>

      </section>

    </div>
  );
}
