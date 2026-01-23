import { Star, Quote, Building2, TrendingUp, Award, CheckCircle, ArrowRight, Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BentoGrid2 } from '../layout/BentoGrid2';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    company: 'Sharma Healthcare Group',
    position: 'CEO',
    industry: 'Healthcare',
    rating: 5,
    text: 'Inchtomilez transformed our digital presence completely. Our patient inquiries increased by 240% in just 6 months. Their SEO strategies are phenomenal!',
    results: '+240% inquiries',
    image: '/testimonials/client-1.jpg',
    service: 'SEO & Digital Marketing'
  },
  {
    id: 2,
    name: 'Priya Patel',
    company: 'Elite Fashion Boutique',
    position: 'Founder',
    industry: 'Fashion',
    rating: 5,
    text: 'The team delivered beyond expectations. Our eCommerce sales tripled within 4 months. Their Instagram marketing strategy was a game-changer.',
    results: '+300% sales',
    image: '/testimonials/client-2.jpg',
    service: 'Social Media Marketing'
  },
  {
    id: 3,
    name: 'Amit Verma',
    company: 'TechVision Solutions',
    position: 'Marketing Director',
    industry: 'Technology',
    rating: 5,
    text: 'Professional, creative, and results-driven. Our Google Ads ROI improved by 180%. Highly recommend their PPC services!',
    results: '+180% ROI',
    image: '/testimonials/client-3.jpg',
    service: 'PPC & Google Ads'
  },
  {
    id: 4,
    name: 'Neha Gupta',
    company: 'Prestige Real Estate',
    position: 'Director',
    industry: 'Real Estate',
    rating: 5,
    text: 'Outstanding work on our website redesign. Lead generation increased by 320%. The team understood our vision perfectly.',
    results: '+320% leads',
    image: '/testimonials/client-4.jpg',
    service: 'Web Design & Development'
  },
  {
    id: 5,
    name: 'Suresh Kumar',
    company: 'Golden Fork Restaurants',
    position: 'Owner',
    industry: 'Food & Beverage',
    rating: 5,
    text: 'Their content marketing strategy brought us incredible results. Online orders increased by 210% and brand awareness skyrocketed.',
    results: '+210% orders',
    image: '/testimonials/client-5.jpg',
    service: 'Content Marketing'
  },
  {
    id: 6,
    name: 'Kavita Singh',
    company: 'Wellness Hub Fitness',
    position: 'Founder & CEO',
    industry: 'Fitness',
    rating: 5,
    text: 'The video marketing campaign was exceptional. Membership sign-ups increased by 275%. Creative excellence at its best!',
    results: '+275% sign-ups',
    image: '/testimonials/client-6.jpg',
    service: 'Video Production'
  }
];

const stats = [
  { title: '500+', description: 'Happy Clients', icon: Building2, color: 'yellow' },
  { title: '98%', description: 'Client Retention', icon: CheckCircle, color: 'yellow' },
  { title: '4.9/5', description: 'Average Rating', icon: Star, color: 'yellow' },
  { title: '250%', description: 'Avg ROI Increase', icon: TrendingUp, color: 'yellow' }
];

const industries = [
  { name: 'Healthcare', count: 85, link: '/industries/healthcare' },
  { name: 'Real Estate', count: 72, link: '/industries/real-estate' },
  { name: 'eCommerce', count: 93, link: '/industries/ecommerce' },
  { name: 'Education', count: 61, link: '/industries/education' },
  { name: 'Hospitality', count: 54, link: '/industries/hospitality' },
  { name: 'Fashion', count: 48, link: '/industries/fashion' }
];

export function TestimonialsPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Testimonials', path: '/testimonials' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO */}
      <SEOHead 
        title="Client Testimonials & Success Stories | Inchtomilez"
        description="Read success stories from 500+ satisfied clients across India. See how we helped businesses achieve 240%+ growth with digital marketing."
        keywords={['client testimonials', 'success stories', 'client reviews', 'digital marketing results', 'Indore']}
        canonicalUrl="/testimonials"
      />

      {/* Structured Data */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Client Testimonials & Success Stories',
        description: 'Read success stories from 500+ satisfied clients. Real results, real growth.',
        slug: 'testimonials',
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
            <span className="text-white">Testimonials</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 glass-yellow rounded-xl">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
                <span className="text-[15px] text-gray-400 ml-2">4.9/5 Average Rating</span>
              </div>
            </div>

            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">
              Client Success Stories
            </h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Discover how we've helped over 500+ businesses across India achieve remarkable growth through innovative digital marketing strategies. Real clients, real results, real impact.
            </p>
          </div>
        </div>

        {/* Background Text */}
        <OutlinedText 
          text="SUCCESS STORIES"
          direction="right"
          delay={0}
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
        />
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <BentoGrid2 
            cards={stats.map(stat => ({
              title: stat.title,
              description: stat.description,
              icon: stat.icon,
              link: '#testimonials'
            }))}
            mode="uniform"
            columns={4}
            ariaLabel="Client statistics"
          />
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Quote className="w-6 h-6 text-yellow-500" />
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3]">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="glass-card p-6 group hover:border-yellow-500/30 transition-all duration-300">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="w-8 h-8 text-yellow-500/20 mb-4" />
                <p className="text-[15px] text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Results Badge */}
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-lg text-[13px] font-semibold mb-6">
                  <TrendingUp className="w-4 h-4" />
                  {testimonial.results}
                </div>

                {/* Client Info */}
                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[18px] font-medium mb-1">{testimonial.name}</h3>
                      <p className="text-[13px] text-gray-400 mb-1">{testimonial.position}</p>
                      <p className="text-[13px] text-yellow-500 font-medium">{testimonial.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] text-gray-400 mb-1">{testimonial.industry}</p>
                      <p className="text-[13px] text-gray-500">{testimonial.service}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-6 h-6 text-yellow-500" />
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3]">Industries We Serve</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry) => (
              <Link
                key={industry.name}
                to={industry.link}
                className="glass p-6 text-center group hover:border-yellow-500/30 transition-all duration-300"
              >
                <p className="text-[18px] font-medium mb-2 group-hover:text-yellow-500 transition-colors">
                  {industry.name}
                </p>
                <p className="text-[13px] text-gray-400">
                  {industry.count} clients
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials CTA */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 text-center">
            <Play className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">
              Watch Our Video Testimonials
            </h2>
            <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
              Hear directly from our clients about their experience working with Inchtomilez and the results they achieved.
            </p>
            <button className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Video Stories
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create your success story together. Get a free consultation and discover how we can help your business grow.
          </p>
          <Link
            to="/contact"
            className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}