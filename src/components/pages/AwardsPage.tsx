import { Award, Trophy, Star, ChevronRight, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const awards = [
  { year: '2025', title: 'Best Digital Marketing Agency - India', organization: 'Business Today Awards', category: 'Excellence' },
  { year: '2025', title: 'Top SEO Agency Award', organization: 'Marketing Week India', category: 'SEO' },
  { year: '2024', title: 'Innovation in Digital Marketing', organization: 'Economic Times Awards', category: 'Innovation' },
  { year: '2024', title: 'Client Satisfaction Excellence', organization: 'Forbes India', category: 'Service' },
  { year: '2023', title: 'Fastest Growing Agency - Central India', organization: 'Entrepreneur Magazine', category: 'Growth' },
  { year: '2023', title: 'Best Social Media Campaign', organization: 'Social Media Awards India', category: 'Campaign' }
];

export function AwardsPage() {
  const breadcrumbItems = [{ name: 'Home', path: '/' }, { name: 'Awards', path: '/awards' }];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Awards & Recognition | Inchtomilez Digital Marketing"
        description="Award-winning digital marketing agency. Recognized for excellence in SEO, social media, and client satisfaction across India."
        keywords={['awards', 'recognition', 'best agency', 'digital marketing awards', 'Indore']}
        canonicalUrl="/awards"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'Awards & Recognition', description: 'Industry awards and recognition.', slug: 'awards' })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Awards</span>
          </nav>

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Awards & Recognition</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Celebrating excellence in digital marketing. Our awards reflect our commitment to delivering exceptional results for clients across India.
            </p>
          </div>
        </div>

        <OutlinedText text="EXCELLENCE" direction="left" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="glass-card p-8 hover:border-yellow-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-500/10 rounded-xl">
                    <Award className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[13px] text-yellow-500 font-semibold uppercase tracking-wider">{award.year}</span>
                    <h3 className="text-[18px] font-medium mt-2 mb-2">{award.title}</h3>
                    <p className="text-[15px] text-gray-400 mb-2">{award.organization}</p>
                    <span className="bg-white/5 text-gray-400 px-3 py-1 rounded-lg text-[13px]">{award.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Star className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Experience Award-Winning Service</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Partner with an award-winning agency committed to your success.
          </p>
          <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}