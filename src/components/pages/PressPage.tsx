import { Newspaper, Calendar, ArrowRight, ChevronRight, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const pressReleases = [
  {
    id: 1,
    title: 'Inchtomilez Wins Best Digital Marketing Agency Award 2025',
    date: 'November 2, 2025',
    source: 'Business Today India',
    excerpt: 'Leading digital marketing agency recognized for exceptional ROI and client satisfaction across 500+ campaigns.',
    category: 'Awards',
    link: '#'
  },
  {
    id: 2,
    title: 'Healthcare Digital Transformation: 300% Growth Case Study',
    date: 'October 15, 2025',
    source: 'Marketing Week',
    excerpt: 'How Inchtomilez helped a multi-specialty hospital achieve remarkable growth through innovative digital strategies.',
    category: 'Case Study',
    link: '#'
  },
  {
    id: 3,
    title: 'Inchtomilez Expands Team to 50+ Digital Marketing Experts',
    date: 'September 28, 2025',
    source: 'Economic Times',
    excerpt: 'Rapid expansion reflects growing demand for data-driven digital marketing services in India.',
    category: 'Company News',
    link: '#'
  }
];

const media = [
  { name: 'The Times of India', logo: '/media/toi.svg' },
  { name: 'Economic Times', logo: '/media/et.svg' },
  { name: 'Business Today', logo: '/media/bt.svg' },
  { name: 'Marketing Week', logo: '/media/mw.svg' },
  { name: 'Forbes India', logo: '/media/forbes.svg' },
  { name: 'Entrepreneur', logo: '/media/entrepreneur.svg' }
];

export function PressPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Press & Media', path: '/press' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Press & Media Coverage | Inchtomilez Digital Marketing"
        description="Latest press releases, media coverage, and news about Inchtomilez. Award-winning digital marketing agency featured in leading publications."
        keywords={['press release', 'media coverage', 'news', 'awards', 'digital marketing', 'Indore']}
        canonicalUrl="/press"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Press & Media Coverage',
        description: 'Latest news and media coverage of Inchtomilez.',
        slug: 'press',
      })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Press & Media</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 glass-yellow rounded-xl">
                <Newspaper className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">
              Press & Media
            </h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Latest news, press releases, and media coverage about Inchtomilez. Stay updated with our achievements, case studies, and industry insights.
            </p>
          </div>
        </div>

        <OutlinedText 
          text="IN THE NEWS"
          direction="left"
          delay={0}
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
        />
      </section>

      {/* Press Releases */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-8">Latest Press Releases</h2>

          <div className="space-y-6">
            {pressReleases.map(release => (
              <div key={release.id} className="glass-card p-6 hover:border-yellow-500/30 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-lg text-[13px] font-semibold">
                        {release.category}
                      </span>
                      <div className="flex items-center gap-2 text-[13px] text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {release.date}
                      </div>
                    </div>

                    <h3 className="text-[18px] font-medium mb-3">{release.title}</h3>
                    <p className="text-[15px] text-gray-400 mb-4">{release.excerpt}</p>
                    <p className="text-[13px] text-gray-500">Source: {release.source}</p>
                  </div>

                  <Link
                    to={release.link}
                    className="bg-white/5 hover:bg-yellow-500 text-white hover:text-black p-3 rounded-lg transition-all duration-300 group"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-8 text-center">Featured In</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {media.map(outlet => (
              <div key={outlet.name} className="glass p-6 flex items-center justify-center hover:border-yellow-500/30 transition-all duration-300">
                <p className="text-[15px] text-gray-400 text-center">{outlet.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Media Inquiries</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            For press inquiries, interviews, or media kit requests, please contact our PR team.
          </p>
          <Link
            to="/contact"
            className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2"
          >
            Contact PR Team
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}