import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, GraduationCap, Home, ShoppingCart, Laptop, DollarSign, UtensilsCrossed, Car, Shirt, Briefcase, Scale, Factory, Sprout, Truck, HardHat, Store, Zap, Heart, Trophy, CheckCircle } from 'lucide-react';
import { BentoGrid2 } from '../layout/BentoGrid2';
import { AutoCarousel } from '../ui/AutoCarousel';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { useSEO, StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/seo-system';
import { OutlinedText } from '../ui/OutlinedText';

export function IndustriesPage() {
  const seo = useSEO(); // Auto-loads SEO from centralized config
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
  ];
  const industries = [
    {
      title: 'Healthcare',
      icon: Stethoscope,
      description: 'Hospitals, clinics, dental practices, and medical device companies',
      clients: 45,
      experience: 'Experience with patient acquisition and healthcare compliance',
      slug: 'healthcare',
      featured: true,
    },
    {
      title: 'Education',
      icon: GraduationCap,
      description: 'Schools, colleges, coaching institutes, and e-learning platforms',
      clients: 38,
      experience: 'Helped education providers with enrollment and brand awareness',
      slug: 'education',
      featured: true,
    },
    {
      title: 'Real Estate',
      icon: Home,
      description: 'Developers, builders, property consultants, and brokers',
      clients: 52,
      experience: 'Generated quality leads for property sales and rentals',
      slug: 'real-estate',
      featured: true,
    },
    {
      title: 'E-Commerce',
      icon: ShoppingCart,
      description: 'Online stores, marketplaces, and direct-to-consumer brands',
      clients: 67,
      experience: 'Worked on conversion optimization and customer acquisition',
    },
    {
      title: 'Technology',
      icon: Laptop,
      description: 'SaaS platforms, IT services, software companies, and startups',
      clients: 41,
      experience: 'Supported B2B and B2C tech companies with digital growth',
      slug: 'technology',
    },
    {
      title: 'Finance',
      icon: DollarSign,
      description: 'Banks, NBFCs, insurance, fintech, and investment firms',
      clients: 29,
      experience: 'Compliance-aware marketing for financial services sector',
      slug: 'finance',
    },
    {
      title: 'Hospitality',
      icon: UtensilsCrossed,
      description: 'Hotels, resorts, restaurants, cafes, and cloud kitchens',
      clients: 56,
      experience: 'Increased online orders and bookings for hospitality businesses',
      slug: 'hospitality',
    },
    {
      title: 'Automotive',
      icon: Car,
      description: 'Dealerships, service centers, and automotive accessories',
      clients: 34,
      experience: 'Generated test drive bookings and service appointments',
      slug: 'automotive',
    },
    {
      title: 'Fashion & Retail',
      icon: Shirt,
      description: 'Clothing brands, jewelry, accessories, and lifestyle products',
      clients: 48,
      experience: 'Social commerce and e-commerce growth strategies',
      slug: 'fashion',
    },
    {
      title: 'Legal',
      icon: Scale,
      description: 'Law firms, corporate legal services, and compliance consultants',
      clients: 22,
      experience: 'Professional content marketing and lead generation',
      slug: 'legal',
    },
    {
      title: 'Manufacturing',
      icon: Factory,
      description: 'Industrial manufacturing, B2B suppliers, and distributors',
      clients: 31,
      experience: 'B2B marketing and LinkedIn lead generation',
      slug: 'manufacturing',
    },
    {
      title: 'Agriculture',
      icon: Sprout,
      description: 'Agritech, farming equipment, organic products, and food processing',
      clients: 18,
      experience: 'Rural and urban market reach strategies',
      slug: 'agriculture',
    },
    {
      title: 'Logistics',
      icon: Truck,
      description: 'Shipping, courier services, warehousing, and supply chain',
      clients: 26,
      experience: 'SEO and digital marketing for logistics companies',
      slug: 'logistics',
    },
    {
      title: 'Construction',
      icon: HardHat,
      description: 'Builders, contractors, interior design, and architecture',
      clients: 35,
      experience: 'Project lead generation and brand building',
      slug: 'construction',
    },
    {
      title: 'Retail',
      icon: Store,
      description: 'Brick-and-mortar stores, franchise businesses, and local shops',
      clients: 64,
      experience: 'Local SEO and foot traffic generation strategies',
      slug: 'retail',
    },
    {
      title: 'Energy',
      icon: Zap,
      description: 'Solar, renewables, energy consultants, and utilities',
      clients: 14,
      experience: 'B2B lead generation for energy sector',
      slug: 'energy',
    },
    {
      title: 'Non-Profit',
      icon: Heart,
      description: 'NGOs, charities, foundations, and social enterprises',
      clients: 19,
      experience: 'Donor engagement and awareness campaigns',
      slug: 'non-profit',
    },
    {
      title: 'Sports & Fitness',
      icon: Trophy,
      description: 'Gyms, sports clubs, fitness coaches, and wellness centers',
      clients: 42,
      experience: 'Membership growth and community building',
      slug: 'sports',
    },
  ];

  const featuredIndustries = industries.filter(ind => ind.featured);

  const stats = [
    { number: '18+', label: 'Industries Served', sublabel: 'Diverse sector experience' },
    { number: '96+', label: 'Total Clients', sublabel: 'Across all verticals' },
    { number: '74+', label: 'Marketing Campaigns', sublabel: 'Successfully delivered' },
    { number: '7', label: 'Years Experience', sublabel: 'Industry expertise' },
  ];

  const whyIndustryExpertise = [
    {
      icon: CheckCircle,
      title: 'Industry Knowledge',
      description: 'Experience working with businesses in your sector helps us understand market dynamics and customer behavior.',
    },
    {
      icon: Trophy,
      title: 'Proven Approaches',
      description: 'We adapt strategies based on what has worked for other clients in your industry.',
    },
    {
      icon: Briefcase,
      title: 'Regulatory Awareness',
      description: 'Marketing strategies consider industry-specific guidelines and compliance requirements.',
    },
    {
      icon: ArrowRight,
      title: 'Market Insights',
      description: 'Working with multiple clients in your industry provides valuable competitive intelligence.',
    },
  ];

  const testimonials = [
    {
      quote: 'They understood healthcare marketing regulations and helped us grow patient inquiries steadily over 8 months. Appreciated their focus on compliance.',
      name: 'Dr. Rajesh Verma',
      title: 'Director, Multispecialty Clinic',
      industry: 'Healthcare',
    },
    {
      quote: 'Helped us target the right audience for our coaching institute. Student enrollments increased gradually with their digital marketing approach.',
      name: 'Priya Sharma',
      title: 'Founder, Education Institute',
      industry: 'Education',
    },
    {
      quote: 'Generated quality leads for our real estate projects. Their understanding of the property market in Indore was helpful for targeting.',
      name: 'Amit Patel',
      title: 'MD, Real Estate Developer',
      industry: 'Real Estate',
    },
    {
      quote: 'Improved our e-commerce conversion rate through website optimization and targeted advertising. Process took 3 months but results are lasting.',
      name: 'Sneha Jain',
      title: 'Owner, Fashion E-commerce',
      industry: 'E-Commerce',
    },
  ];

  return (
    <div>
      {/* ⚠️ REMOVED bg-black - Using body background with grid pattern */}
      {/* SEO Meta Tags - Auto-loaded from centralized config */}
      <SEOHeadSSG {...seo.meta} />
      
      <StructuredData 
        schema={[
          organizationSchema,
          getWebPageSchema(seo.meta.title, seo.meta.description, '/industries', breadcrumbs),
          getBreadcrumbSchema(breadcrumbs),
        ]} 
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} showHomeIcon={true} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="EXPERTISE" 
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6">INDUSTRIES WE SERVE</p>
          <h1 className="text-[30px] md:text-[36px] font-medium tracking-tight mb-8 leading-[1.3]">
            {seo.h1}
          </h1>
          <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
            We've worked with <span className="text-yellow-500 font-semibold">96+ clients</span> across diverse sectors, learning what works in each market and adapting strategies accordingly.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <BentoGrid2 
              cards={stats.map((stat) => ({
                number: stat.number,
                label: stat.label,
                sublabel: stat.sublabel,
              }))}
              mode="uniform"
              columns={4}
              ariaLabel="Industry statistics"
            />
          </div>
        </div>
      </section>

      {/* Featured Industries */}
      <section className="py-16 md:py-24 relative">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="SECTORS" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">FEATURED SECTORS</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Primary Industries We Serve
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Our most active sectors with <span className="text-yellow-500 font-semibold">significant client base</span> and proven experience.
            </p>

            <BentoGrid2 
              cards={featuredIndustries.map(industry => ({
                title: industry.title,
                description: industry.description,
                icon: industry.icon,
                link: `/industries/${industry.slug}`,
              }))}
              mode="uniform"
              columns={3}
              showCTA={true}
              ariaLabel="Featured industries"
            />
          </div>
        </div>
      </section>

      {/* All Industries Grid */}
      <section className="py-16 md:py-24 relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="MARKETS" 
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              All Industries We Serve
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Comprehensive list of sectors where we have <span className="text-yellow-500 font-semibold">active experience</span> and client relationships.
            </p>

            {/* BentoGrid2 - Universal Grid System */}
            <BentoGrid2 
              cards={industries.map(industry => ({
                title: industry.title,
                description: industry.description,
                icon: industry.icon,
                link: industry.slug ? `/industries/${industry.slug}` : '/industries'
              }))}
              showBadges={true}
              showStats={true}
            />
          </div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="py-16 md:py-24 relative">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="EXPERIENCE" 
          className="absolute top-[20%] right-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">VALUE OF EXPERIENCE</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Why Industry Experience Matters
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Working with multiple clients in your <span className="text-yellow-500 font-semibold">specific industry</span> helps us understand market dynamics better.
            </p>

            <BentoGrid2 
              cards={whyIndustryExpertise.map(reason => ({
                icon: reason.icon,
                label: reason.title,
                description: reason.description,
              }))}
              mode="uniform"
              columns={4}
              ariaLabel="Why industry expertise matters"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 overflow-hidden relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="FEEDBACK" 
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto mb-12">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">CLIENT FEEDBACK</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              What Industry Clients Say
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-8 text-center max-w-3xl mx-auto" style={{ lineHeight: 1.6 }}>
              Feedback from clients across <span className="text-yellow-500 font-semibold">different sectors</span> about their experience working with us.
            </p>
          </div>

          <AutoCarousel speed="slow">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card min-w-[300px] sm:min-w-[380px] max-w-[420px] flex-shrink-0 snap-center p-6">
                <div className="inline-block bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-lg mb-4 text-[0.8125rem] font-semibold">
                  {testimonial.industry}
                </div>
                
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-6 italic" style={{ lineHeight: 1.6 }}>
                  &quot;{testimonial.quote}&quot;
                </p>
                
                <div className="pt-4">
                  <p className="text-[0.9375rem] leading-relaxed font-semibold">{testimonial.name}</p>
                  <p className="text-[0.8125rem] text-yellow-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </AutoCarousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="CONNECT" 
          className="absolute top-[20%] right-0 text-[11rem] md:text-[15rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 leading-[1.3]">Discuss Your Industry Needs</h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
              Schedule a <span className="text-yellow-500 font-semibold">free consultation</span> to discuss how we can help your business based on our industry experience.
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
