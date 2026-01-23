import { Briefcase, Search, Filter, TrendingUp, Heart, Eye, ExternalLink, ChevronRight, Award } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const categories = ['All', 'Web Design', 'Branding', 'Social Media', 'Video', 'SEO'];

const portfolioItems = [
  {
    id: 1,
    title: 'Prestige Healthcare - Complete Digital Transformation',
    category: 'Web Design',
    client: 'Multi-Specialty Hospital',
    services: ['Website Design', 'SEO', 'Google Ads'],
    results: '+300% patient inquiries',
    image: '/portfolio/healthcare-web.jpg',
    link: '/case-studies/healthcare-growth'
  },
  {
    id: 2,
    title: 'Elite Fashion - Brand Identity Redesign',
    category: 'Branding',
    client: 'Fashion Boutique',
    services: ['Logo Design', 'Brand Guidelines', 'Packaging'],
    results: '+500% brand recognition',
    image: '/portfolio/fashion-branding.jpg',
    link: '/case-studies/ecommerce-fashion'
  },
  {
    id: 3,
    title: 'Golden Fork - Social Media Campaign',
    category: 'Social Media',
    client: 'Restaurant Chain',
    services: ['Instagram Marketing', 'Content Creation', 'Photography'],
    results: '+350% online orders',
    image: '/portfolio/restaurant-social.jpg',
    link: '/case-studies/restaurant-online-orders'
  },
  {
    id: 4,
    title: 'TechVision - Corporate Video Production',
    category: 'Video',
    client: 'SaaS Platform',
    services: ['Brand Video', 'Product Demo', 'Testimonials'],
    results: '+180% conversions',
    image: '/portfolio/tech-video.jpg',
    link: '/case-studies/tech-b2b-leads'
  },
  {
    id: 5,
    title: 'Prestige Realty - SEO Domination',
    category: 'SEO',
    client: 'Real Estate Firm',
    services: ['Local SEO', 'Content Marketing', 'Link Building'],
    results: '#1 Google ranking',
    image: '/portfolio/realestate-seo.jpg',
    link: '/case-studies/real-estate-leads'
  },
  {
    id: 6,
    title: 'Wellness Hub - eCommerce Platform',
    category: 'Web Design',
    client: 'Fitness Center',
    services: ['eCommerce Development', 'Payment Integration', 'Mobile App'],
    results: '+275% membership sales',
    image: '/portfolio/fitness-ecommerce.jpg',
    link: '#'
  }
];

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Our Portfolio - Award-Winning Digital Work | Inchtomilez"
        description="Explore our portfolio of 500+ successful projects across web design, branding, SEO, and digital marketing. Real work, real results."
        keywords={['portfolio', 'web design', 'branding', 'digital marketing', 'case studies', 'Indore']}
        canonicalUrl="/portfolio"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Our Portfolio - Award-Winning Digital Work',
        description: '500+ successful projects showcasing excellence in digital marketing.',
        slug: 'portfolio',
      })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Portfolio</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 glass-yellow rounded-xl">
                <Briefcase className="w-8 h-8 text-yellow-500" />
              </div>
              <span className="text-[13px] text-yellow-500 font-semibold uppercase tracking-wider">
                Our Work
              </span>
            </div>

            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">
              Portfolio of Excellence
            </h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Explore 500+ successful projects that showcase our expertise in digital marketing, web design, branding, and more. Each project tells a story of transformation and growth.
            </p>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[15px] text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <OutlinedText 
          text="PORTFOLIO"
          direction="right"
          delay={0}
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
        />
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-lg text-[15px] font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Link
                key={item.id}
                to={item.link}
                className="glass-card group overflow-hidden hover:border-yellow-500/30 transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-yellow-500/10 to-transparent relative overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Eye className="w-12 h-12 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[13px] text-yellow-500 font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-[18px] font-medium mt-2 mb-3 group-hover:text-yellow-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 mb-4">{item.client}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.services.slice(0, 2).map(service => (
                      <span key={service} className="bg-white/5 text-gray-400 px-2 py-1 rounded text-[11px]">
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[13px] text-yellow-500 font-medium">{item.results}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Let's Create Something Amazing Together</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Ready to add your project to our portfolio of success stories?
          </p>
          <Link
            to="/contact"
            className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2"
          >
            Start Your Project
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}