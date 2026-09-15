import { Link } from 'react-router';
import { ArrowRight, Target, TrendingUp, Users, Zap, Star, Search, Globe, ShoppingCart, Megaphone, Palette, Camera, Newspaper, FileText, PenTool, Video, Award, BarChart3, Mail, MessageSquare, CheckCircle, Rocket, Trophy, Shield, Smartphone, MonitorPlay, Brain, Lightbulb, Code, DollarSign, TrendingDown, Play } from 'lucide-react';
import { Badge } from '../ui/badge';
import { BentoGrid2 } from '../layout/BentoGrid2';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { AutoCarousel } from '../ui/AutoCarousel';
import { OutlinedText } from '../ui/OutlinedText';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { useSEO, StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/seo-system';

export function ServicesPage() {
  const seo = useSEO(); // Auto-loads SEO from centralized config
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];
  
  const featuredServices = [
    {
      title: 'Digital Marketing',
      tagline: 'Search. Social. Content. Performance.',
      description: 'Connect the moments where people search, scroll, compare and decide through one focused digital ecosystem.',
      icon: TrendingUp,
      link: '/services/digital-marketing',
      projects: 342,
      badge: 'Connected Digital',
      stats: 'Search • Social • Performance',
    },
    {
      title: 'Advertising',
      tagline: 'One Idea. Every Relevant Surface.',
      description: 'Campaign thinking and media across search, social, video, outdoor and traditional channels — built around one clear idea.',
      icon: Megaphone,
      link: '/services/advertising',
      projects: 287,
      badge: 'Integrated Media',
      stats: 'Digital • Video • OOH',
    },
    {
      title: 'Branding',
      tagline: 'Build Recognition Before Reach.',
      description: 'Positioning, identity, language and brand systems designed to make the business easier to understand and harder to confuse.',
      icon: Award,
      link: '/services/branding',
      projects: 156,
      badge: 'Brand Systems',
      stats: 'Strategy • Identity • Voice',
    },
    {
      title: 'Website & App Development',
      tagline: 'Make Every Click Worth It.',
      description: 'Websites, commerce and applications designed around clarity, speed, usability and the actions that matter to the business.',
      icon: Globe,
      link: '/services/website-development',
      projects: 365,
      badge: 'Digital Experience',
      stats: 'Web • Commerce • Apps',
    },
    {
      title: 'Software Development',
      tagline: 'Technology That Removes Friction.',
      description: 'CRM systems, dashboards, automation and custom platforms built around real workflows — not technology for technology’s sake.',
      icon: MonitorPlay,
      link: '/services/software-development',
      projects: 142,
      badge: 'Business Technology',
      stats: 'CRM • Automation • Platforms',
    },
    {
      title: 'Graphic Design & Creative',
      tagline: 'Creative That Communicates.',
      description: 'Campaign, social, print, packaging and motion design built to say something before it simply looks good.',
      icon: Palette,
      link: '/services/graphic-design',
      projects: 287,
      badge: 'Creative Studio',
      stats: 'Design • Motion • Packaging',
    },
    {
      title: 'Media Production',
      tagline: 'Some Stories Need More Than Words.',
      description: 'Films, photography, short-form content and campaign assets shaped around the idea — from concept through post-production.',
      icon: Camera,
      link: '/services/media-production',
      projects: 198,
      badge: 'Production',
      stats: 'Film • Photo • Short Form',
    },
    {
      title: 'Public Relations',
      tagline: 'Reach Can Be Bought. Trust Cannot.',
      description: 'Media communication, reputation, thought leadership and influence designed to give the brand credibility beyond its own channels.',
      icon: MessageSquare,
      link: '/services/public-relations',
      projects: 89,
      badge: 'Earned Influence',
      stats: 'Media • Reputation • PR',
    },
    {
      title: 'Political Campaigns',
      tagline: 'Communication At Public Scale.',
      description: 'Integrated campaign strategy, audience intelligence, messaging, digital outreach and ground communication for public campaigns.',
      icon: Target,
      link: '/services/political-campaigns',
      projects: 34,
      badge: 'Public Communication',
      stats: 'Strategy • Outreach • Ground',
    },
    {
      title: 'OOH Advertising',
      tagline: 'Take The Brand Into The City.',
      description: 'Hoardings, transit, mall, airport and digital outdoor media selected around audience movement, context and visibility.',
      icon: Megaphone,
      link: '/services/ooh-advertising',
      projects: 156,
      badge: 'Physical Media',
      stats: 'Hoardings • Transit • Retail',
    },
    {
      title: 'Radio & Newspapers',
      tagline: 'Mass Reach Still Has A Place.',
      description: 'Radio, print and editorial media planned when broad reach, regional relevance or cultural context makes the medium matter.',
      icon: Newspaper,
      link: '/services/radio-newspapers',
      projects: 178,
      badge: 'Mass Media',
      stats: 'Radio • Print • Editorial',
    },
    {
      title: 'Product Marketing',
      tagline: 'Build Desire Around The Product.',
      description: 'Positioning, go-to-market thinking, launch communication and channel strategy designed to help products find their market.',
      icon: Rocket,
      link: '/services/product-marketing',
      projects: 97,
      badge: 'Go-To-Market',
      stats: 'Position • Launch • Scale',
    },
    {
      title: 'BTL Activations & On-Ground Marketing',
      tagline: 'Turn Attention Into Participation.',
      description: 'Sampling, retail, events, roadshows and experiential campaigns that let people interact with the brand in the real world.',
      icon: Users,
      link: '/services/btl-activations',
      projects: 89,
      badge: 'Core Capability',
      stats: 'Events • Retail • Experiences',
    },
    {
      title: 'Creative Concept & Campaign Execution',
      tagline: 'One Idea. Many Worlds.',
      description: 'Campaign systems built from the central idea outward — across digital, outdoor, activation, PR and every relevant touchpoint.',
      icon: Lightbulb,
      link: '/services/creative-campaigns',
      projects: 120,
      badge: 'Core Capability',
      stats: 'Idea • System • Execution',
    },
  ];

  const allServices = [
    { name: 'Digital Marketing', slug: 'digital-marketing', icon: TrendingUp, clients: 'Digital Ecosystem', description: 'Search, Social, Content, Performance' },
    { name: 'Advertising', slug: 'advertising', icon: Megaphone, clients: 'Integrated Media', description: 'Search, Social, Video, OOH, Print' },
    { name: 'Branding', slug: 'branding', icon: Award, clients: 'Brand Systems', description: 'Positioning, Identity, Voice, Guidelines' },
    { name: 'Website & App Development', slug: 'website-development', icon: Globe, clients: 'Digital Experience', description: 'Web, E-commerce, Apps, UI/UX' },
    { name: 'Software Development', slug: 'software-development', icon: MonitorPlay, clients: 'Business Technology', description: 'CRM, Automation, Platforms, APIs' },
    { name: 'Graphic Design & Creative', slug: 'graphic-design', icon: Palette, clients: 'Creative Studio', description: 'Design, Motion, Print, Packaging' },
    { name: 'Media Production', slug: 'media-production', icon: Camera, clients: 'Production', description: 'Film, Photography, Short Form, Post' },
    { name: 'Public Relations', slug: 'public-relations', icon: MessageSquare, clients: 'Earned Influence', description: 'Media, Reputation, Thought Leadership' },
    { name: 'Political Campaigns', slug: 'political-campaigns', icon: Target, clients: 'Public Communication', description: 'Strategy, Outreach, Digital, Ground' },
    { name: 'OOH Advertising', slug: 'ooh-advertising', icon: Megaphone, clients: 'Physical Media', description: 'Hoardings, Transit, Retail, Digital OOH' },
    { name: 'Radio & Newspapers', slug: 'radio-newspapers', icon: Newspaper, clients: 'Mass Media', description: 'Radio, Print, Editorial' },
    { name: 'Product Marketing', slug: 'product-marketing', icon: Rocket, clients: 'Go-To-Market', description: 'Positioning, Launch, Lifecycle' },
    { name: 'BTL Activations', slug: 'btl-activations', icon: Users, clients: 'Brand Experience', description: 'Sampling, Events, Retail, Experiential' },
    { name: 'Creative Campaigns', slug: 'creative-campaigns', icon: Lightbulb, clients: 'Campaign Systems', description: 'Strategy, Creative, Multi-Channel' },
  ];

  const serviceStats = [
    { number: 'THINK', label: 'Strategy Before Media', growth: 'Start with the problem', icon: Target },
    { number: 'CREATE', label: 'Ideas Before Formats', growth: 'Build the central thought first', icon: Users },
    { number: 'BUILD', label: 'One Brand Experience', growth: 'Connect every touchpoint', icon: Rocket },
    { number: 'MOVE', label: 'From Attention To Action', growth: 'Learn, improve and scale', icon: TrendingUp },
  ];

  const successMetrics = [
    { metric: 'DISCOVER', label: 'Be Found', description: 'Search, social and media working around demand', icon: Users },
    { metric: 'REMEMBER', label: 'Build Recognition', description: 'Identity and creative working as one system', icon: Award },
    { metric: 'EXPERIENCE', label: 'Make The Click Matter', description: 'Digital journeys designed around real people', icon: CheckCircle },
    { metric: 'CONNECT', label: 'Join The Channels', description: 'Digital, physical and earned media in one direction', icon: DollarSign },
    { metric: 'LEARN', label: 'Improve Continuously', description: 'Use response and data to sharpen the next move', icon: Star },
    { metric: 'SCALE', label: 'Take What Works Further', description: 'Build systems that can travel across markets', icon: Trophy },
  ];

  const pricingData = [
    {
      question: 'How do you price an engagement?',
      answer: 'We scope around the problem, deliverables, team involvement, media requirements and timeline. A campaign, website, brand system and ongoing digital mandate should not be priced as if they are the same job. Discovery comes first, then a clear proposal.',
    },
    {
      question: 'Can multiple services work under one engagement?',
      answer: 'Yes. In many cases they should. Strategy, creative, media, development, search and production work better when they share one objective. We combine only the capabilities the brief actually needs.',
    },
    {
      question: 'What can a digital marketing engagement include?',
      answer: 'Depending on the brief, it can include search strategy, SEO, local discovery, paid media, social, content, email, analytics and optimisation. The channel mix follows the audience and business objective — not a fixed package.',
    },
    {
      question: 'Do you work on projects as well as ongoing mandates?',
      answer: 'Yes. Branding, websites, launches, films and campaign work can be project-based. Search, social, performance and broader marketing systems often work better as ongoing engagements because learning compounds over time.',
    },
    {
      question: 'How do you keep the work clear and accountable?',
      answer: 'By agreeing on the objective, scope, responsibilities and success measures before execution begins. Ongoing work is reviewed through regular communication, performance learning and clear next-step decisions.',
    },
  ];

  const serviceDetails = [
    {
      service: 'Search & SEO',
      features: ['Technical search foundation', 'Search demand and keyword mapping', 'On-page structure and content', 'Authority and relevance signals', 'Search experience improvements', 'Performance learning and refinement'],
      timeline: 'Built as an ongoing search system',
      clients: 'Scope shaped around the market and opportunity',
      pricing: 'Engagement defined after discovery',
    },
    {
      service: 'Social Media Marketing',
      features: ['Platform and audience strategy', 'Content systems and creative direction', 'Community communication', 'Paid social campaigns', 'Short-form and campaign content', 'Performance learning and iteration'],
      timeline: 'Always-on or campaign-led engagement',
      clients: 'Scope shaped around platforms and content needs',
      pricing: 'Engagement defined after discovery',
    },
    {
      service: 'Paid Search & Performance Media',
      features: ['Campaign architecture and intent mapping', 'Message and creative development', 'Audience and keyword strategy', 'Testing and optimisation', 'Conversion measurement', 'Performance reviews and scaling decisions'],
      timeline: 'Testing starts from launch',
      clients: 'Media scope shaped around objective and budget',
      pricing: 'Media and management scoped separately',
    },
    {
      service: 'Website Development',
      features: ['Responsive experience design', 'Performance and speed optimisation', 'Search-friendly structure', 'Content and interaction architecture', 'CMS or commerce integration', 'Launch support and refinement'],
      timeline: 'Timeline depends on scope and complexity',
      clients: 'Built around the business and user journey',
      pricing: 'Project scoped after discovery',
    },
    {
      service: 'Branding Services',
      features: ['Brand positioning and strategy', 'Identity direction and design', 'Visual and verbal system', 'Brand guidelines', 'Campaign and communication language', 'Launch and rollout support'],
      timeline: 'Built through discovery, direction and development',
      clients: 'Scope shaped around the brand challenge',
      pricing: 'Project scoped after discovery',
    },
    {
      service: 'Video Production',
      features: ['Concept and narrative development', 'Script and pre-production', 'Film and photography production', 'Editing and post-production', 'Motion and visual finishing', 'Multi-format campaign delivery'],
      timeline: 'Timeline depends on production scale',
      clients: 'Built around the story and campaign need',
      pricing: 'Production scoped by concept and execution',
    },
  ];

  const industries = [
    { name: 'Healthcare', clients: 'Trust & discovery' },
    { name: 'Technology & SaaS', clients: 'Clarity & adoption' },
    { name: 'Education & E-Learning', clients: 'Attention & enrolment' },
    { name: 'Real Estate', clients: 'Conviction & leads' },
    { name: 'Finance & Banking', clients: 'Trust & credibility' },
    { name: 'Retail & E-commerce', clients: 'Desire & conversion' },
    { name: 'Automotive', clients: 'Aspiration & action' },
    { name: 'Fashion & Apparel', clients: 'Culture & desire' },
    { name: 'Food & Beverage', clients: 'Recall & preference' },
    { name: 'Legal Services', clients: 'Authority & trust' },
    { name: 'Manufacturing', clients: 'Clarity & demand' },
    { name: 'Sports & Fitness', clients: 'Energy & community' },
    { name: 'Entertainment', clients: 'Attention & culture' },
    { name: 'Non-Profit', clients: 'Purpose & participation' },
    { name: 'Hospitality & Travel', clients: 'Experience & desire' },
    { name: 'Beauty & Wellness', clients: 'Trust & aspiration' },
  ];

  const whyChooseUs = [
    {
      icon: Trophy,
      title: 'Think Before We Execute',
      description: 'We start with the business problem, audience and objective — not a pre-selected platform or fashionable tactic.',
    },
    {
      icon: Users,
      title: 'One Connected Agency',
      description: 'Strategy, creative, media, development and performance work together instead of behaving like separate vendors.',
    },
    {
      icon: Target,
      title: 'Creative With A Job To Do',
      description: 'The work should look strong, but it should also communicate clearly, earn attention and move the audience somewhere.',
    },
    {
      icon: Shield,
      title: 'Clear Conversations',
      description: 'You should understand what is being built, why it matters, what we are learning and what should happen next.',
    },
    {
      icon: Rocket,
      title: 'Built To Improve',
      description: 'Launch is not the finish line. We read the response, refine the work and keep moving what deserves to scale.',
    },
    {
      icon: Award,
      title: 'One Brand. One Direction.',
      description: 'Every discipline should strengthen the same brand instead of creating disconnected pieces of marketing.',
    },
  ];

  const caseStudies = [
    {
      client: 'Discovery Problem',
      industry: 'Search & Local',
      challenge: 'A strong business can still be invisible when people search for the category.',
      solution: 'Connect local search, technical SEO, content and high-intent media around the same discovery journey.',
      result: 'The goal: make the brand easier to find, understand and choose.',
    },
    {
      client: 'Experience Problem',
      industry: 'Commerce & Digital',
      challenge: 'Traffic means very little when the website creates friction after the click.',
      solution: 'Rework hierarchy, product communication, speed, usability and conversion paths as one experience.',
      result: 'The goal: turn attention into a clearer, easier next step.',
    },
    {
      client: 'Launch Problem',
      industry: 'Campaign & Media',
      challenge: 'A launch can disappear quickly when every channel tells a different story.',
      solution: 'Build one campaign idea, then adapt it across digital, film, outdoor, social and activation.',
      result: 'The goal: make every touchpoint feel like part of the same launch.',
    },
  ];

  return (
    <div>
      {/* ⚠️ REMOVED bg-black - Using body background with grid pattern */}
      {/* SEO Meta Tags - Auto-loaded from centralized config */}
      <SEOHeadSSG {...seo.meta} />
      
      <StructuredData 
        data={[
          organizationSchema,
          getWebPageSchema(seo.meta.title, seo.meta.description, '/services', breadcrumbs),
          getBreadcrumbSchema(breadcrumbs),
        ]} 
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} showHomeIcon={true} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative overflow-hidden">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="CAPABILITIES" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6">WHAT WE DO</p>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <h1 className="text-[30px] md:text-[36px] font-medium tracking-tight mb-8 leading-[1.3]">
              One Brand. Many Ways To Move It.
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              We bring <span className="text-yellow-500 font-semibold">strategy, creative, media and technology</span> together so the brand moves as one — from first idea to final experience.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Services Grid - Bento Grid 2.0 */}
      <section className="border-t border-white/10 py-16 md:py-24 bg-white/[0.02] relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="DISCIPLINES" 
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 px-4 py-2 rounded-lg mb-4 text-xs font-semibold uppercase tracking-wide">
                CONNECTED CAPABILITIES
              </div>
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4 leading-[1.3]">
                Think. Create. Build. Amplify.
              </h2>
              <p className="text-[0.9375rem] leading-relaxed text-gray-300 max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
                Different disciplines. One brand direction. Explore the capabilities we combine around <span className="text-yellow-500 font-semibold">attention, experience and growth</span>.
              </p>
            </div>

            {/* BentoGrid2 Component - Asymmetric Mode */}
            <BentoGrid2 
              cards={featuredServices.map(service => ({
                title: service.title,
                description: service.description,
                icon: service.icon,
                link: service.link
              }))}
              mode="asymmetric"
              showBadges={true}
              showStats={true}
              ariaLabel="All services"
            />
          </div>
        </div>
      </section>

      {/* Service Stats */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <BentoGrid2
              cards={serviceStats.map(stat => ({
                icon: stat.icon,
                number: stat.number,
                label: stat.label,
                sublabel: stat.growth
              }))}
              mode="uniform"
              columns={4}
              ariaLabel="Service statistics"
            />
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="border-t border-white/10 py-16 md:py-24 relative">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="OUTCOMES" 
          className="absolute top-[20%] right-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              What The Work Is Built To Do
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Not vanity numbers. Not inflated promises. The work should help a brand become easier to <span className="text-yellow-500 font-semibold">find, remember, experience and choose</span>.
            </p>

            <BentoGrid2
              cards={successMetrics.map(metric => ({
                icon: metric.icon,
                number: metric.metric,
                label: metric.label,
                sublabel: metric.description
              }))}
              mode="uniform"
              columns={3}
              ariaLabel="Success metrics"
            />
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="border-t border-white/10 py-16 md:py-24 relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="SYSTEMS" 
          className="absolute top-[20%] left-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">HOW THE WORK COMES TOGETHER</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              More Than A List Of Deliverables
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Every engagement is shaped around the brief. These are the <span className="text-yellow-500 font-semibold">systems and disciplines</span> most often combined to solve the problem.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceDetails.map((detail) => (
                <div key={detail.service} className="glass-card p-6">
                  <h4 className="text-lg font-medium mb-4 leading-[1.4]">{detail.service}</h4>
                  <ul className="space-y-2 mb-6">
                    {detail.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[0.8125rem] text-gray-400" style={{ lineHeight: 1.6 }}>
                        <CheckCircle size={16} className="flex-shrink-0 text-yellow-500 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <p className="text-[0.8125rem] text-gray-300">{detail.timeline}</p>
                    <p className="text-[0.8125rem] text-gray-500">{detail.clients}</p>
                    <p className="text-[0.9375rem] leading-relaxed text-yellow-500 font-semibold">{detail.pricing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="border-t border-white/10 py-16 md:py-24 overflow-hidden relative">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="THINKING" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto mb-12 relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">HOW WE SOLVE</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Different Problems Need Different Systems
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Three simple examples of how we connect <span className="text-yellow-500 font-semibold">strategy, experience and media</span> around a business problem.
            </p>
          </div>

          <AutoCarousel speed="slow">
            {caseStudies.map((study, index) => (
              <div key={index} className="glass-card min-w-[300px] sm:min-w-[380px] max-w-[420px] flex-shrink-0 snap-center p-6">
                <div className="inline-block bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-lg mb-4 text-[0.8125rem] font-semibold">
                  {study.industry}
                </div>
                <h4 className="text-lg font-medium mb-4 leading-[1.4]">{study.client}</h4>
                <div className="space-y-4 text-[0.8125rem]" style={{ lineHeight: 1.6 }}>
                  <div>
                    <p className="text-yellow-500 font-medium mb-1">Situation:</p>
                    <p className="text-gray-400">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-yellow-500 font-medium mb-1">Thinking:</p>
                    <p className="text-gray-400">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-yellow-500 font-medium mb-1">Direction:</p>
                    <p className="text-gray-300">{study.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </AutoCarousel>
        </div>
      </section>

      {/* Industries Served */}
      <section className="border-t border-white/10 py-16 md:py-24 relative overflow-hidden">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="INDUSTRIES" 
          className="absolute top-[20%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Different Markets. Different Reasons To Choose.
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Healthcare needs trust. Fashion needs desire. Technology needs clarity. The category changes — <span className="text-yellow-500 font-semibold">the strategy should too</span>.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((industry, index) => (
                <div key={index} className="glass-card p-4 text-center">
                  <p className="text-[0.9375rem] leading-relaxed font-medium mb-1">{industry.name}</p>
                  <p className="text-[0.8125rem] text-yellow-500">{industry.clients}</p>
                </div>
              ))}
            </div>

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

      {/* Why Choose Us */}
      <section className="border-t border-white/10 py-16 md:py-24 relative overflow-hidden">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="DIFFERENCE" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">WHY INCHTOMILEZ</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-16 text-center leading-[1.3]">
              Not Another Vendor. One Team Around The Brand.
            </h2>

            {/* BentoGrid2 - Universal Grid System */}
            <BentoGrid2 
              cards={whyChooseUs.map(reason => ({
                title: reason.title,
                description: reason.description,
                icon: reason.icon
              }))}
              mode="uniform"
              columns={3}
              ariaLabel="Why choose us"
            />
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="border-t border-white/10 py-16 md:py-24 relative overflow-hidden">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="QUESTIONS" 
          className="absolute top-[20%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">WORKING TOGETHER</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Before We Start, A Few Useful Answers.
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center" style={{ lineHeight: 1.6 }}>
              Clear answers about <span className="text-yellow-500 font-semibold">scope, engagement models and how the work is structured</span>.
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              {pricingData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glass-card px-6 py-2 rounded-xl border-0">
                  <AccordionTrigger className="text-[0.9375rem] leading-relaxed text-left hover:no-underline py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[0.8125rem] text-gray-400 leading-relaxed pb-6" style={{ lineHeight: 1.6 }}>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">What Does The Brand Need Next?</h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
              A campaign. A website. A launch. A stronger brand system. Or simply a problem that needs better thinking. <span className="text-yellow-500 font-semibold">Start there.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold shadow-xl hover:shadow-yellow-500/50 hover:scale-105"
              >
                Start A Conversation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+919669988666"
                className="glass-card px-10 py-5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold hover:scale-105"
              >
                Call: +91 966-998-8666
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
