import { Book, Download, ChevronRight, ArrowRight, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const ebooks = [
  { title: 'Complete SEO Guide 2025', pages: 120, downloads: '5.2K', rating: 4.9, description: 'Master SEO from basics to advanced strategies', category: 'SEO' },
  { title: 'Social Media Marketing Mastery', pages: 95, downloads: '4.1K', rating: 4.8, description: 'Build engaging social media campaigns that convert', category: 'Social' },
  { title: 'PPC Advertising Handbook', pages: 85, downloads: '3.5K', rating: 4.7, description: 'Maximize ROI with expert PPC strategies', category: 'PPC' },
  { title: 'Content Marketing Blueprint', pages: 110, downloads: '4.8K', rating: 4.9, description: 'Create content that drives traffic and sales', category: 'Content' },
  { title: 'Email Marketing Excellence', pages: 75, downloads: '3.2K', rating: 4.6, description: 'Build profitable email campaigns from scratch', category: 'Email' },
  { title: 'Web Design Best Practices', pages: 90, downloads: '3.9K', rating: 4.8, description: 'Design websites that convert visitors to customers', category: 'Design' }
];

export function EbooksPage() {
  const breadcrumbItems = [{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }, { name: 'eBooks', path: '/ebooks' }];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead title="Free Digital Marketing eBooks | Inchtomilez" description="Download comprehensive digital marketing eBooks. Expert guides on SEO, PPC, social media, content marketing & more." keywords={['ebooks', 'marketing guides', 'free books', 'digital marketing']} canonicalUrl="/ebooks" />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'Free Digital Marketing eBooks', description: 'Comprehensive marketing guides and ebooks.', slug: 'ebooks' })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <Link to="/resources" className="text-gray-400 hover:text-yellow-500 transition-colors">Resources</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">eBooks</span>
          </nav>

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <Book className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Free Marketing eBooks</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              In-depth guides covering every aspect of digital marketing. Learn from industry experts with our comprehensive eBooks.
            </p>
          </div>
        </div>

        <OutlinedText text="EBOOKS" direction="right" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ebooks.map((ebook, index) => (
              <div key={index} className="glass-card p-6 hover:border-yellow-500/30 transition-all duration-300">
                <div className="aspect-[3/4] bg-gradient-to-br from-yellow-500/10 to-transparent mb-4 rounded-lg flex items-center justify-center">
                  <Book className="w-20 h-20 text-yellow-500/20" />
                </div>

                <span className="bg-white/5 text-gray-400 px-2 py-1 rounded text-[11px] uppercase">{ebook.category}</span>
                <h3 className="text-[18px] font-medium mt-3 mb-2">{ebook.title}</h3>
                <p className="text-[15px] text-gray-400 mb-4">{ebook.description}</p>

                <div className="flex items-center gap-4 mb-4 text-[13px] text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {ebook.pages} pages
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {ebook.rating}
                  </div>
                </div>

                <p className="text-[13px] text-gray-500 mb-4">{ebook.downloads} downloads</p>

                <button className="w-full bg-yellow-500 text-black px-6 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Free
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Want Personalized Training?</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Get one-on-one guidance from our digital marketing experts.
          </p>
          <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
            Schedule Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}