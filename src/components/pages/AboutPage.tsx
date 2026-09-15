import { Link } from 'react-router';

import {
  ArrowRight,
  Target,
  Shield,
  Users,
  TrendingUp,
  Globe,
  MapPin,
  Lightbulb,
  Rocket,
  BarChart3,
  Briefcase,
  Sparkles,
  Palette,
  Megaphone,
  Code,
  Search,
  CheckCircle,
  Building2,
  HeartHandshake,
  Layers,
  Eye,
  Zap,
} from 'lucide-react';

import { AnimatedSection } from '../ui/AnimatedSection';
import { OutlinedText } from '../ui/OutlinedText';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHeadSSG } from '../SEOHeadSSG';

import {
  useSEO,
  StructuredData,
  organizationSchema,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '../../utils/seo-system';

const systemItems = [
  { label: 'Strategy', icon: Target },
  { label: 'Creative', icon: Palette },
  { label: 'Media', icon: Megaphone },
  { label: 'Search', icon: Search },
  { label: 'Technology', icon: Code },
];

const identityHighlights = [
  {
    number: '01',
    icon: Briefcase,
    title: 'Business Before Channels',
    description:
      'We begin with the business problem, audience and opportunity — not with a platform we want to sell.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'One Connected Direction',
    description:
      'Strategy, creative, media, search and technology are built to strengthen the same brand idea.',
  },
  {
    number: '03',
    icon: Eye,
    title: 'Built for Attention',
    description:
      'The work has to earn the look, make the message clear and leave something worth remembering.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Made to Move',
    description:
      'From local launch to wider markets, we build systems and communication that can travel with the brand.',
  },
];

const beliefCards = [
  {
    number: '01',
    icon: Target,
    title: 'Strategy Before Spending',
    description:
      'Find the problem. Define the opportunity. Decide what the brand needs to change before buying attention.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=88',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Ideas Worth Remembering',
    description:
      'Creative should do more than decorate a campaign. It should give people a reason to stop, feel and remember.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Connected Execution',
    description:
      'Ads, search, social, websites, media and technology work better when they are parts of one system — not separate tasks.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=88',
  },
];

const founderExpertise = [
  'Brand & Growth Strategy',
  'Website Development',
  'SEO & Search',
  'Digital Advertising',
  'Integrated Campaigns',
  'Client Strategy',
];

const whyReasons = [
  {
    number: '01',
    icon: Target,
    title: 'Clarity Before Activity',
    description:
      'More marketing is not automatically better marketing. We focus first on what needs to change and why.',
    featured: true,
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Creative With a Job to Do',
    description:
      'Every idea, visual and message should move perception, attention or action — not just fill space.',
  },
  {
    number: '03',
    icon: HeartHandshake,
    title: 'Closer to the Work',
    description:
      'The agency stays involved in the thinking and execution instead of passing the relationship through layers.',
  },
  {
    number: '04',
    icon: Globe,
    title: 'Digital + Physical Thinking',
    description:
      'Search, social and websites can work alongside outdoor, activation, media and real-world brand experiences.',
  },
  {
    number: '05',
    icon: BarChart3,
    title: 'Learn. Improve. Scale.',
    description:
      'We use market response and performance signals to improve decisions rather than putting campaigns on autopilot.',
  },
];

const processSteps = [
  { number: '01', title: 'Understand', text: 'Business. Audience. Market. Problem.' },
  { number: '02', title: 'Define', text: 'Opportunity. Position. Objective.' },
  { number: '03', title: 'Create', text: 'Idea. Message. Experience.' },
  { number: '04', title: 'Launch', text: 'Media. Technology. Activation.' },
  { number: '05', title: 'Improve', text: 'Learn. Refine. Scale.' },
];

export function AboutPage() {
  const seo = useSEO();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="relative overflow-hidden bg-black text-white">
      <SEOHeadSSG {...seo.meta} />
      <StructuredData
        data={[
          organizationSchema,
          getWebPageSchema(
            seo.meta.title,
            seo.meta.description,
            '/about',
            breadcrumbs,
          ),
          getBreadcrumbSchema(breadcrumbs),
        ]}
      />

      <div className="relative z-30 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <Breadcrumbs items={breadcrumbs} showHomeIcon={true} />
      </div>

      {/* ================================================================
          01. HERO — ADVANTEDGE SPLIT LAYOUT / INCHTOMILEZ THEME
      ================================================================ */}
      <section className="relative overflow-hidden py-14 md:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-52 -top-52 h-[520px] w-[520px] rounded-full bg-yellow-500/10 blur-[150px]" />
          <div className="absolute -right-44 top-12 h-[460px] w-[460px] rounded-full bg-violet-600/10 blur-[150px]" />
          <div className="absolute bottom-[-220px] left-[35%] h-[440px] w-[440px] rounded-full bg-cyan-500/[0.08] blur-[150px]" />
          <div
            className="absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
              backgroundSize: '68px 68px',
            }}
          />
        </div>

        <OutlinedText
          text="ABOUT"
          className="absolute right-[-2%] top-[8%] text-[10rem] md:text-[15rem] pointer-events-none opacity-30"
          direction="right"
          stopPosition={20}
          parallax={true}
          parallaxSpeed={0.22}
          delay={0}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-12">
            <AnimatedSection animation="fadeInUp" delay={0.05}>
              <div className="max-w-xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3.5 py-2">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow-400">
                    ABOUT INCHTOMILEZ
                  </span>
                </div>

                <h1 className="text-[34px] font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-[44px] lg:text-[54px]">
                  Built for Brands
                  <span className="block text-yellow-400">That Intend to Move.</span>
                </h1>

                <p className="mt-6 text-[17px] font-medium leading-[1.65] text-white/90">
                  Inchtomilez is an independent digital marketing and advertising agency built around one belief:
                  <span className="text-yellow-400"> strong brands move when the thinking and execution move together.</span>
                </p>

                <p className="mt-4 max-w-lg text-[14px] leading-[1.8] text-white/55">
                  We connect strategy, creative, search, advertising, media and technology around the same brand direction — from the first question to the final experience.
                </p>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    One Connected Brand System
                  </p>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                    {systemItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                              <Icon className="h-4 w-4 text-yellow-400" />
                            </div>
                            <span className="text-[11px] font-semibold text-white/80">
                              {item.label}
                            </span>
                          </div>
                          {index < systemItems.length - 1 && (
                            <ArrowRight className="mx-2 hidden h-3.5 w-3.5 text-yellow-500/45 sm:block" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-[2px] w-8 rounded-full bg-yellow-400" />
                  <p className="text-[12px] font-medium leading-relaxed text-white/45">
                    One brand. One direction. Many ways to move it.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.14}>
              <div className="relative mt-2 lg:mt-0">
                <div className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-[#070707] shadow-2xl sm:min-h-[420px] lg:min-h-[470px]">
                  <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=90"
                    alt="Creative team collaborating on brand strategy"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/95" />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-violet-500/10" />

                  <div className="absolute left-5 top-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-xl">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.17em] text-white/85">
                        Connected by Design
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                      The Inchtomilez Perspective
                    </p>
                    <h2 className="mt-3 max-w-xl text-[25px] font-bold leading-[1.18] tracking-[-0.025em] text-white sm:text-[32px]">
                      Great Marketing Feels Like One Brand — Not Ten Different Departments.
                    </h2>
                    <p className="mt-4 max-w-lg text-[13px] leading-[1.75] text-white/55">
                      Strategy gives the direction. Creative earns attention. Media carries the idea. Technology makes the experience work.
                    </p>
                  </div>
                </div>

                <div className="relative -mt-7 mx-4 sm:mx-7 lg:ml-10 lg:mr-[-14px]">
                  <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#101010]/95 shadow-2xl backdrop-blur-2xl">
                    <div className="grid grid-cols-[auto_1fr] items-center gap-4 p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 shadow-lg shadow-yellow-500/20">
                        <Rocket className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-yellow-400">
                          Made to Move
                        </p>
                        <p className="mt-1 text-[14px] font-semibold leading-relaxed text-white/90">
                          Think clearly. Create memorably. Execute as one connected brand.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 divide-x divide-white/10 border-t border-white/10">
                      {systemItems.map((item, index) => (
                        <div key={item.label} className="px-2 py-3 text-center transition-colors hover:bg-white/[0.03]">
                          <span className="block text-[8px] font-bold text-yellow-500/70">0{index + 1}</span>
                          <span className="mt-1 block text-[8px] font-semibold text-white/55 sm:text-[9px]">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================
          02. WHO WE ARE — EDITORIAL + FOUR HIGHLIGHT CARDS
      ================================================================ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-48 top-0 h-[380px] w-[380px] rounded-full bg-cyan-500/[0.08] blur-[130px]" />
          <div className="absolute -right-44 bottom-[-100px] h-[380px] w-[380px] rounded-full bg-yellow-500/[0.08] blur-[130px]" />
        </div>

        <OutlinedText
          text="IDENTITY"
          className="absolute right-0 top-[16%] text-[9rem] md:text-[13rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.3}
          delay={0}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection animation="fadeInUp" delay={0.05}>
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3.5 py-2">
                  <Shield className="h-4 w-4 text-cyan-300" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                    WHO WE ARE
                  </span>
                </div>
                <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
                  More Than a <span className="text-yellow-400">Marketing Agency.</span>
                </h2>
              </div>
            </AnimatedSection>

            <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
              <AnimatedSection animation="fadeInUp" delay={0.1}>
                <div className="relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-violet-500" />
                  <span className="pointer-events-none absolute -right-2 -top-8 text-[110px] font-black leading-none tracking-[-0.08em] text-white/[0.025]">
                    02
                  </span>

                  <div className="relative z-10">
                    <p className="text-[16px] font-semibold leading-[1.75] text-white/95">
                      Inchtomilez wasn't built to add more marketing activity to a business.
                    </p>
                    <p className="mt-3 text-[16px] font-bold leading-[1.75] text-yellow-400">
                      It was built to make the activity mean something together.
                    </p>

                    <div className="my-5 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                      <span className="h-px flex-1 bg-white/10" />
                    </div>

                    <p className="text-[14px] leading-[1.85] text-white/55">
                      Search can bring discovery. Advertising can create reach. Creative can shape perception. A website can turn attention into experience. Outdoor and activation can take the brand into the real world.
                    </p>

                    <div className="my-5 h-px w-full bg-white/10" />

                    <p className="text-[15px] font-semibold leading-[1.75] text-white/90">
                      The value appears when all of it points in the same direction.
                    </p>
                    <p className="mt-3 text-[14px] leading-[1.85] text-white/55">
                      That's the agency we are building — independent, founder-led, multidisciplinary and close enough to the work to keep the idea intact from strategy through execution.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <div className="grid gap-3 sm:grid-cols-2">
                {identityHighlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <AnimatedSection key={item.title} animation="fadeInUp" delay={0.12 + index * 0.05}>
                      <article className="group relative h-full min-h-[190px] overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/20 hover:bg-white/[0.05]">
                        <div className="absolute left-0 top-0 h-1 w-10 rounded-r-full bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-500 group-hover:w-full" />
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                            <Icon className="h-4 w-4 text-yellow-400" />
                          </div>
                          <span className="text-[9px] font-bold tracking-[0.16em] text-white/20">
                            {item.number}
                          </span>
                        </div>
                        <h3 className="mt-5 text-[16px] font-semibold leading-snug text-white">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-[12px] leading-[1.75] text-white/45">
                          {item.description}
                        </p>
                      </article>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          03. WHAT WE BELIEVE — THREE IMAGE-LED CARDS
      ================================================================ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-44 top-10 h-[400px] w-[400px] rounded-full bg-violet-600/[0.09] blur-[140px]" />
          <div className="absolute -right-44 bottom-[-90px] h-[380px] w-[380px] rounded-full bg-pink-500/[0.08] blur-[140px]" />
        </div>

        <OutlinedText
          text="BELIEF"
          className="absolute left-0 top-[12%] text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.28}
          delay={0}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection animation="fadeInUp" delay={0.05}>
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-3.5 py-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                    WHAT WE BELIEVE
                  </span>
                </div>
                <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
                  Marketing Works Better When <span className="text-yellow-400">Everything Connects.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-[14px] leading-[1.8] text-white/50 sm:text-[15px]">
                  We don't see strategy, creativity, media and technology as separate services. They are different parts of the same brand experience.
                </p>
              </div>
            </AnimatedSection>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {beliefCards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <AnimatedSection key={item.title} animation="fadeInUp" delay={0.08 + index * 0.08}>
                    <article className="group relative min-h-[420px] overflow-hidden rounded-[26px] border border-white/10 bg-[#080808] shadow-2xl transition-transform duration-300 hover:-translate-y-1.5">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/95" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/8 via-transparent to-violet-500/12" />

                      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/35 backdrop-blur-xl">
                          <Icon className="h-5 w-5 text-yellow-400" />
                        </div>
                        <span className="text-[9px] font-bold tracking-[0.16em] text-white/35">
                          {item.number}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <h3 className="text-[21px] font-bold leading-tight text-white">
                          {item.title}
                        </h3>
                        <div className="mt-3 h-1 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500" />
                        <p className="mt-4 text-[13px] leading-[1.8] text-white/60">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection animation="fadeInUp" delay={0.25}>
              <div className="mt-5 overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-r from-[#101010] via-[#13100a] to-[#100b16]">
                <div className="flex items-center gap-4 px-5 py-5 sm:px-7">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                    <TrendingUp className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="text-[14px] font-semibold leading-[1.75] text-white/75 sm:text-[15px]">
                    The goal isn't to make every channel busy. It's to make the brand stronger because every channel is working toward the same idea.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================
          04. FOUNDER — ADVANTEDGE EDITORIAL PROFILE / ONE REAL FOUNDER
      ================================================================ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-36 top-0 h-[360px] w-[360px] rounded-full bg-yellow-500/[0.08] blur-[130px]" />
          <div className="absolute -right-40 bottom-[-80px] h-[360px] w-[360px] rounded-full bg-cyan-500/[0.07] blur-[130px]" />
        </div>

        <OutlinedText
          text="FOUNDER"
          className="absolute right-0 top-[12%] text-[9rem] md:text-[13rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.3}
          delay={0}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection animation="fadeInUp" delay={0.05}>
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/5 px-3.5 py-2">
                  <Users className="h-4 w-4 text-pink-300" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-pink-300">
                    THE FOUNDER
                  </span>
                </div>
                <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
                  One Founder. One Point of View. <span className="text-yellow-400">A Bigger Canvas.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-[14px] leading-[1.8] text-white/50">
                  Inchtomilez began with hands-on digital work — not a boardroom story. That closeness to the work still shapes how the agency thinks today.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.12}>
              <article className="group relative mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl">
                <div className="absolute left-0 top-0 z-20 h-1 w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-violet-500" />

                <div className="grid lg:grid-cols-[300px_1fr]">
                  <div className="relative min-h-[330px] overflow-hidden bg-[#080808] lg:min-h-[520px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.22),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(124,58,237,0.22),transparent_34%),radial-gradient(circle_at_20%_90%,rgba(6,182,212,0.16),transparent_30%)]" />
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '42px 42px',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-yellow-500/25 bg-yellow-500/[0.06] shadow-[0_0_100px_rgba(250,204,21,0.08)]">
                        <span className="text-[72px] font-black tracking-[-0.08em] text-white">AP</span>
                        <span className="absolute -bottom-4 rounded-full border border-white/10 bg-black/80 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-400 backdrop-blur-xl">
                          Founder
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 lg:hidden">
                      <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-yellow-400">
                        Founder
                      </p>
                      <h3 className="mt-1 text-[24px] font-bold text-white">Aman Panwar</h3>
                    </div>
                  </div>

                  <div className="relative p-6 sm:p-8 lg:p-10">
                    <span className="pointer-events-none absolute right-5 top-0 text-[100px] font-black leading-none text-white/[0.025]">
                      01
                    </span>

                    <div className="relative z-10">
                      <div className="hidden lg:block">
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                          Founder — Inchtomilez
                        </p>
                        <h3 className="mt-2 text-[28px] font-bold text-white">Aman Panwar</h3>
                        <p className="mt-2 text-[13px] text-white/35">
                          Digital Marketing • Advertising • Web • Search
                        </p>
                      </div>

                      <div className="mt-1 grid gap-7 lg:mt-7 lg:grid-cols-[1.2fr_0.8fr] lg:gap-9">
                        <div className="space-y-4 text-[13px] leading-[1.85] text-white/55 sm:text-[14px]">
                          <p>
                            Inchtomilez started in Indore with one founder doing the work directly — building websites, improving search visibility and helping businesses understand how digital could create real commercial movement.
                          </p>
                          <p>
                            As the problems became bigger, the agency became broader. Website work connected with SEO. SEO connected with advertising. Advertising connected with creative, social, media, branding and technology.
                          </p>
                          <p>
                            The agency is larger in scope today, but the principle hasn't changed: understand the business first, keep the thinking clear and stay close enough to execution that the idea doesn't get lost.
                          </p>
                        </div>

                        <div className="border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                            Areas of Focus
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {founderExpertise.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium text-white/55"
                              >
                                {item}
                              </span>
                            ))}
                          </div>

                          <div className="mt-7 space-y-3">
                            {[
                              'Hands-on foundation in web, SEO and digital marketing.',
                              'Founder-led involvement in strategy and quality.',
                              'Leading the agency from Indore into its Pune expansion.',
                            ].map((item) => (
                              <div key={item} className="flex items-start gap-3">
                                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                                <p className="text-[11px] leading-[1.65] text-white/45">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 border-t border-white/10 pt-7">
                        <p className="text-[20px] font-medium leading-[1.5] text-white sm:text-[24px]">
                          “Duniya Brands Ke Peeche,
                          <span className="text-yellow-400"> Aur Brands Marketing Ke Peeche.”</span>
                        </p>
                        <p className="mt-3 text-[11px] text-white/30">Aman Panwar — Founder, Inchtomilez</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================
          05. WHY INCHTOMILEZ — ASYMMETRIC EXECUTIVE BENTO
      ================================================================ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-8 h-[360px] w-[360px] rounded-full bg-yellow-500/[0.07] blur-[125px]" />
          <div className="absolute -right-40 bottom-[-100px] h-[360px] w-[360px] rounded-full bg-violet-600/[0.08] blur-[125px]" />
        </div>

        <OutlinedText
          text="DIFFERENT"
          className="absolute left-0 top-[10%] text-[8rem] md:text-[12rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.26}
          delay={0}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection animation="fadeInUp" delay={0.05}>
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-3.5 py-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                      WHY INCHTOMILEZ
                    </span>
                  </div>
                  <h2 className="mt-5 max-w-2xl text-[30px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
                    Not Another Vendor. <span className="text-yellow-400">One Connected Direction.</span>
                  </h2>
                </div>

                <div className="max-w-2xl lg:ml-auto">
                  <p className="text-[14px] leading-[1.8] text-white/50 sm:text-[15px]">
                    The strongest advantage isn't having more channels. It is making strategy, creative, media and technology reinforce each other instead of competing for attention internally.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
              {whyReasons.map((item, index) => {
                const Icon = item.icon;
                const span = index === 0 ? 'lg:col-span-7' : index === 1 ? 'lg:col-span-5' : 'lg:col-span-4';
                return (
                  <div key={item.title} className={span}>
                    <AnimatedSection animation="fadeInUp" delay={0.08 + index * 0.05}>
                    <article
                      className={`group relative h-full min-h-[220px] overflow-hidden rounded-[26px] p-6 transition-all duration-300 hover:-translate-y-1 ${
                        item.featured
                          ? 'border border-yellow-500/15 bg-[#0b0b0b] shadow-[0_24px_80px_rgba(250,204,21,0.08)]'
                          : 'border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-white/15 hover:bg-white/[0.05]'
                      }`}
                    >
                      {item.featured && (
                        <>
                          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-yellow-500/15 blur-[90px]" />
                          <div
                            className="absolute inset-0 opacity-[0.05]"
                            style={{
                              backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)',
                              backgroundSize: '42px 42px',
                            }}
                          />
                        </>
                      )}

                      <span className="absolute right-5 top-4 text-[10px] font-bold tracking-[0.16em] text-white/20">
                        {item.number}
                      </span>

                      <div className="relative z-10 flex h-full flex-col">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                          <Icon className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="mt-auto pt-9">
                          <h3 className="text-[19px] font-bold text-white">{item.title}</h3>
                          <div className="mt-3 h-1 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500" />
                          <p className="mt-4 max-w-xl text-[13px] leading-[1.75] text-white/50">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </article>
                    </AnimatedSection>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          06. PRESENCE — TWO CITY EDITORIAL CARDS
      ================================================================ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[15%] top-[-80px] h-[320px] w-[320px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
          <div className="absolute right-[10%] bottom-[-100px] h-[340px] w-[340px] rounded-full bg-pink-500/[0.07] blur-[120px]" />
        </div>

        <OutlinedText
          text="PRESENCE"
          className="absolute right-0 top-[12%] text-[8rem] md:text-[12rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.28}
          delay={0}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection animation="fadeInUp" delay={0.05}>
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3.5 py-2">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                    OUR PRESENCE
                  </span>
                </div>
                <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
                  Built in Indore. <span className="text-yellow-400">Growing Through Pune.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-[14px] leading-[1.8] text-white/50">
                  Two locations, one agency mindset — close to the work, connected across disciplines and built to travel beyond either city.
                </p>
              </div>
            </AnimatedSection>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <AnimatedSection animation="fadeInUp" delay={0.1}>
                <article className="group relative min-h-[350px] overflow-hidden rounded-[28px] border border-white/10 bg-[#090909] p-7 shadow-2xl">
                  <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-yellow-500/12 blur-[80px]" />
                  <div
                    className="absolute inset-0 opacity-[0.055]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)',
                      backgroundSize: '46px 46px',
                    }}
                  />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-black">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/20">
                        FOUNDATION
                      </span>
                    </div>
                    <div className="mt-auto pt-16">
                      <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-yellow-400">INDORE</p>
                      <h3 className="mt-2 text-[28px] font-bold text-white">Where Inchtomilez Was Built.</h3>
                      <p className="mt-4 max-w-xl text-[13px] leading-[1.8] text-white/50">
                        Indore is the foundation of the agency — where the hands-on working culture, direct client relationships and multidisciplinary approach took shape.
                      </p>
                      <div className="mt-6 flex items-start gap-3 text-[12px] text-white/35">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                        <span>Vijay Nagar, Indore, Madhya Pradesh</span>
                      </div>
                    </div>
                  </div>
                </article>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.16}>
                <article className="group relative min-h-[350px] overflow-hidden rounded-[28px] border border-white/10 bg-[#090909] p-7 shadow-2xl">
                  <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-violet-600/14 blur-[80px]" />
                  <div className="absolute -right-20 bottom-[-60px] h-52 w-52 rounded-full bg-cyan-500/10 blur-[80px]" />
                  <div
                    className="absolute inset-0 opacity-[0.055]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)',
                      backgroundSize: '46px 46px',
                    }}
                  />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
                        <Rocket className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/20">
                        SEPTEMBER 2026
                      </span>
                    </div>
                    <div className="mt-auto pt-16">
                      <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-cyan-300">PUNE</p>
                      <h3 className="mt-2 text-[28px] font-bold text-white">A Bigger Market. The Same Standard.</h3>
                      <p className="mt-4 max-w-xl text-[13px] leading-[1.8] text-white/50">
                        In September 2026, Inchtomilez expands its presence to Pune — getting closer to more businesses, industries and opportunities while keeping strategy and execution connected under one team.
                      </p>
                      <div className="mt-6 flex items-start gap-3 text-[12px] text-white/35">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-300" />
                        <span>Gera&apos;s Imperium Gateway, Nashik Phata, Pimpri-Chinchwad, Pune</span>
                      </div>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            </div>

            <AnimatedSection animation="fadeInUp" delay={0.22}>
              <div className="mt-8 text-center">
                <p className="text-[14px] font-medium text-white/45">Two cities. One agency. One direction.</p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-yellow-400 transition-colors hover:text-yellow-300"
                >
                  Contact Our Team
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================
          07. PROCESS — COMPACT CONNECTED STRIP
      ================================================================ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-150px] top-[-120px] h-[340px] w-[340px] rounded-full bg-yellow-500/[0.06] blur-[130px]" />
          <div className="absolute right-[-150px] bottom-[-120px] h-[340px] w-[340px] rounded-full bg-pink-500/[0.06] blur-[130px]" />
        </div>

        <OutlinedText
          text="PROCESS"
          className="absolute left-0 top-[10%] text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.26}
          delay={0}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection animation="fadeInUp" delay={0.05}>
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-3.5 py-2">
                  <Target className="h-4 w-4 text-yellow-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                    HOW WE WORK
                  </span>
                </div>
                <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
                  From Question to <span className="text-yellow-400">Movement.</span>
                </h2>
              </div>
            </AnimatedSection>

            <div className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <div className="grid md:grid-cols-5 md:divide-x md:divide-white/10">
                {processSteps.map((step, index) => (
                  <AnimatedSection key={step.number} animation="fadeInUp" delay={0.08 + index * 0.04}>
                    <div className="group relative min-h-[190px] border-b border-white/10 p-6 transition-colors hover:bg-white/[0.035] md:border-b-0">
                      <span className="text-[10px] font-bold tracking-[0.16em] text-yellow-500/70">{step.number}</span>
                      <h3 className="mt-6 text-[17px] font-semibold text-white">{step.title}</h3>
                      <p className="mt-3 text-[11px] leading-[1.7] text-white/40">{step.text}</p>
                      {index < processSteps.length - 1 && (
                        <ArrowRight className="absolute right-4 top-5 hidden h-4 w-4 text-white/10 md:block" />
                      )}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          08. THE NAME / PHILOSOPHY
      ================================================================ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <AnimatedSection animation="fadeInUp" delay={0.05}>
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#090909] px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <div className="absolute left-[10%] top-[-120px] h-[300px] w-[300px] rounded-full bg-yellow-500/12 blur-[100px]" />
                  <div className="absolute right-[5%] bottom-[-120px] h-[300px] w-[300px] rounded-full bg-violet-600/12 blur-[100px]" />
                  <div className="absolute bottom-[-120px] left-[40%] h-[260px] w-[260px] rounded-full bg-cyan-500/[0.08] blur-[100px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">WHY THE NAME?</p>
                  <h2 className="mt-5 text-[36px] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[50px]">
                    Big Never Starts Big.
                  </h2>
                  <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.9] text-white/50">
                    It starts with one idea. One decision. One customer. One campaign. One improvement. Then another. Then another.
                  </p>
                  <p className="mt-6 text-[24px] font-semibold leading-[1.45] text-white sm:text-[30px]">
                    Inch by inch.
                    <span className="block text-yellow-400">Until the distance starts looking like miles.</span>
                  </p>
                  <p className="mt-7 text-[13px] font-medium uppercase tracking-[0.18em] text-white/30">That's Inchtomilez.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================
          09. FINAL CTA
      ================================================================ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/[0.055] blur-[150px]" />
        </div>

        <OutlinedText
          text="NEXT"
          className="absolute right-0 top-[2%] text-[11rem] md:text-[16rem] pointer-events-none"
          direction="right"
          stopPosition={20}
          parallax={true}
          parallaxSpeed={0.22}
          delay={0}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <AnimatedSection animation="fadeInUp" delay={0.05}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">THE NEXT MOVE</p>
              <h2 className="mt-5 text-[34px] font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-[48px]">
                What Do You Want People
                <span className="block text-yellow-400">To Remember About Your Brand?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-[14px] leading-[1.85] text-white/45 sm:text-[15px]">
                A new identity. A stronger campaign. Better discovery. A digital experience that finally matches the business. Or simply a bigger ambition than the current brand can carry.
              </p>
              <p className="mt-5 text-[16px] font-semibold text-white/80">Good. That's where interesting conversations begin.</p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 text-[14px] font-semibold text-black shadow-xl shadow-yellow-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300"
                >
                  Start a Conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-14 border-t border-white/10 pt-8">
                <p className="text-[23px] font-medium leading-[1.45] text-white sm:text-[28px]">
                  Strategy that moves.
                  <span className="text-yellow-400"> Creative that stays.</span>
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/25">
                  INCHTOMILEZ • DIGITAL • CREATIVE • ADVERTISING • TECHNOLOGY
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
