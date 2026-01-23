import { TrendingUp, Target, Users, DollarSign, ChevronRight, ArrowRight, Award, BarChart3, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BentoGrid2 } from '../layout/BentoGrid2';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const caseStudies = [
  {
    id: 1,
    title: 'Healthcare Group: 300% Growth in Patient Appointments',
    client: 'Multi-Specialty Hospital Chain',
    industry: 'Healthcare',
    challenge: 'Low online visibility and minimal patient inquiries through digital channels',
    solution: 'Implemented comprehensive local SEO, Google My Business optimization, and targeted Google Ads campaigns',
    results: [
      { metric: '300%', label: 'Increase in appointments' },
      { metric: '450%', label: 'Website traffic growth' },
      { metric: '#1', label: 'Google Maps ranking' },
      { metric: '85%', label: 'Cost per lead reduction' }
    ],
    timeline: '6 months',
    services: ['Local SEO', 'Google Ads', 'Website Optimization'],
    testimonial: 'Inchtomilez transformed our digital presence completely. We now get 40+ quality inquiries daily.',
    image: '/case-studies/healthcare.jpg',
    link: '/case-studies/healthcare-growth'
  },
  {
    id: 2,
    title: 'eCommerce Fashion Brand: 500% Revenue Increase',
    client: 'Premium Fashion Boutique',
    industry: 'eCommerce',
    challenge: 'High cart abandonment rate and low conversion on product pages',
    solution: 'Complete website redesign, Instagram shopping integration, and influencer marketing campaign',
    results: [
      { metric: '500%', label: 'Revenue increase' },
      { metric: '180%', label: 'Conversion rate up' },
      { metric: '75K', label: 'New Instagram followers' },
      { metric: '3.2x', label: 'ROI improvement' }
    ],
    timeline: '4 months',
    services: ['eCommerce Development', 'Social Media', 'Influencer Marketing'],
    testimonial: 'Our sales exploded! The new website and Instagram strategy were game-changers.',
    image: '/case-studies/ecommerce.jpg',
    link: '/case-studies/ecommerce-fashion'
  },
  {
    id: 3,
    title: 'Real Estate Firm: 420% Lead Generation Growth',
    client: 'Luxury Property Developer',
    industry: 'Real Estate',
    challenge: 'Struggling to generate qualified leads for premium properties',
    solution: 'Premium web design, virtual tour integration, targeted PPC campaigns, and content marketing',
    results: [
      { metric: '420%', label: 'Qualified leads' },
      { metric: '250%', label: 'Website engagement' },
      { metric: '92%', label: 'Lead quality score' },
      { metric: '₹180L', label: 'Revenue generated' }
    ],
    timeline: '5 months',
    services: ['Web Design', 'PPC', 'Content Marketing'],
    testimonial: 'The quality of leads improved dramatically. We closed 15 premium properties in 5 months.',
    image: '/case-studies/realestate.jpg',
    link: '/case-studies/real-estate-leads'
  },
  {
    id: 4,
    title: 'Restaurant Chain: 350% Online Orders Surge',
    client: 'Multi-Location Restaurant Brand',
    industry: 'Food & Beverage',
    challenge: 'Low online ordering penetration and weak social media presence',
    solution: 'Food photography campaign, Instagram/Facebook marketing, and online ordering system integration',
    results: [
      { metric: '350%', label: 'Online orders' },
      { metric: '120K', label: 'Social media reach' },
      { metric: '4.8★', label: 'Google rating' },
      { metric: '65%', label: 'Repeat customer rate' }
    ],
    timeline: '3 months',
    services: ['Social Media', 'Photography', 'Digital Strategy'],
    testimonial: 'Our Instagram became a powerful sales channel. Orders tripled in just 3 months!',
    image: '/case-studies/restaurant.jpg',
    link: '/case-studies/restaurant-online-orders'
  },
  {
    id: 5,
    title: 'Education Institute: 280% Enrollment Increase',
    client: 'Professional Training Academy',
    industry: 'Education',
    challenge: 'Low course enrollment and minimal digital presence',
    solution: 'SEO-optimized website, lead magnet strategy, email marketing automation, and webinar campaigns',
    results: [
      { metric: '280%', label: 'Course enrollments' },
      { metric: '15K', label: 'Email subscribers' },
      { metric: '45%', label: 'Webinar conversion' },
      { metric: '₹95L', label: 'Revenue increase' }
    ],
    timeline: '7 months',
    services: ['SEO', 'Email Marketing', 'Content Strategy'],
    testimonial: 'We went from struggling to fill classes to having waitlists. Incredible transformation!',
    image: '/case-studies/education.jpg',
    link: '/case-studies/education-enrollment'
  },
  {
    id: 6,
    title: 'Tech Startup: 600% B2B Lead Generation',
    client: 'SaaS Platform Provider',
    industry: 'Technology',
    challenge: 'Difficulty reaching enterprise clients and generating B2B leads',
    solution: 'LinkedIn marketing, thought leadership content, case study creation, and account-based marketing',
    results: [
      { metric: '600%', label: 'B2B leads' },
      { metric: '45', label: 'Enterprise clients' },
      { metric: '220%', label: 'LinkedIn engagement' },
      { metric: '4.5x', label: 'Sales cycle reduction' }
    ],
    timeline: '8 months',
    services: ['B2B Marketing', 'LinkedIn Ads', 'Content Marketing'],
    testimonial: 'They understood B2B marketing perfectly. We closed our biggest deals ever.',
    image: '/case-studies/tech.jpg',
    link: '/case-studies/tech-b2b-leads'
  }
];

const industries = [
  { name: 'Healthcare', icon: Target },
  { name: 'eCommerce', icon: DollarSign },
  { name: 'Real Estate', icon: TrendingUp },
  { name: 'Education', icon: Users },
  { name: 'Technology', icon: BarChart3 },
  { name: 'Hospitality', icon: Award }
];

export function CaseStudiesPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO */}
      <SEOHead 
        title="Digital Marketing Case Studies & Success Stories | Inchtomilez"
        description="Explore our proven digital marketing case studies showing 300-600% growth. Real data, real results from campaigns across healthcare, eCommerce, real estate & more."
        keywords={['case studies', 'success stories', 'digital marketing results', 'ROI', 'growth', 'Indore']}
        canonicalUrl="/case-studies"
      />

      {/* Structured Data */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Digital Marketing Case Studies & Success Stories',
        description: 'Proven results from real campaigns. 300-600% growth across industries.',
        slug: 'case-studies',
      })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Case Studies</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 glass-yellow rounded-xl">
                <BarChart3 className="w-8 h-8 text-yellow-500" />
              </div>
              <span className="text-[13px] text-yellow-500 font-semibold uppercase tracking-wider">
                Proven Results
              </span>
            </div>

            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">
              Digital Marketing Case Studies
            </h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Discover how we've helped businesses achieve 300-600% growth through data-driven digital marketing strategies. Real campaigns, real numbers, real impact.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="glass p-4 rounded-lg">
                <p className="text-[22px] font-bold text-yellow-500">500+</p>
                <p className="text-[13px] text-gray-400">Successful Campaigns</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <p className="text-[22px] font-bold text-yellow-500">350%</p>
                <p className="text-[13px] text-gray-400">Average Growth</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <p className="text-[22px] font-bold text-yellow-500">₹500Cr+</p>
                <p className="text-[13px] text-gray-400">Revenue Generated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Text */}
        <OutlinedText 
          text="CASE STUDIES"
          direction="left"
          delay={0}
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
        />
      </section>

      {/* Industry Filter */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-6 h-6 text-yellow-500" />
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3]">Browse by Industry</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <button
                  key={industry.name}
                  className="glass p-6 text-center group hover:border-yellow-500/30 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                  <p className="text-[15px] font-medium group-hover:text-yellow-500 transition-colors">
                    {industry.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div key={study.id} className="glass-card p-8 hover:border-yellow-500/30 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left: Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[13px] text-yellow-500 font-semibold uppercase tracking-wider">
                        {study.industry}
                      </span>
                      <span className="text-[13px] text-gray-500">•</span>
                      <div className="flex items-center gap-1 text-[13px] text-gray-400">
                        <Clock className="w-4 h-4" />
                        {study.timeline}
                      </div>
                    </div>

                    <h3 className="text-[22px] font-medium mb-4">
                      {study.title}
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-[13px] text-gray-500 uppercase tracking-wider mb-2">Challenge</p>
                        <p className="text-[15px] text-gray-300">{study.challenge}</p>
                      </div>

                      <div>
                        <p className="text-[13px] text-gray-500 uppercase tracking-wider mb-2">Solution</p>
                        <p className="text-[15px] text-gray-300">{study.solution}</p>
                      </div>
                    </div>

                    {/* Services Used */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.services.map((service) => (
                        <span
                          key={service}
                          className="bg-white/5 text-gray-400 px-3 py-1 rounded-lg text-[13px]"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div className="glass p-4 rounded-lg mb-6 border-l-2 border-yellow-500">
                      <p className="text-[13px] text-gray-300 italic">
                        "{study.testimonial}"
                      </p>
                      <p className="text-[13px] text-gray-500 mt-2">— {study.client}</p>
                    </div>
                  </div>

                  {/* Right: Results */}
                  <div>
                    <p className="text-[13px] text-gray-500 uppercase tracking-wider mb-4">Key Results</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {study.results.map((result, i) => (
                        <div key={i} className="glass-yellow p-6 text-center">
                          <p className="text-[30px] font-bold text-yellow-500 mb-2">
                            {result.metric}
                          </p>
                          <p className="text-[13px] text-gray-300">
                            {result.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-yellow-500 mb-4">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-[15px] font-medium">Verified Results</span>
                    </div>

                    <Link
                      to={study.link}
                      className="bg-yellow-500 text-black px-6 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 w-full justify-center"
                    >
                      Read Full Case Study
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <TrendingUp className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">
            Ready to Become Our Next Success Story?
          </h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create measurable results for your business. Get a free strategy session and discover your growth potential.
          </p>
          <Link
            to="/contact"
            className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2"
          >
            Schedule Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}