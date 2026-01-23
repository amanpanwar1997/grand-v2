import { BookOpen, Download, Video, Wrench, Book, FileText, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BentoGrid2 } from '../layout/BentoGrid2';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const resources = [
  { title: 'Free Downloads', description: 'Templates, checklists & guides', icon: Download, link: '/downloads' },
  { title: 'eBooks', description: 'In-depth marketing guides', icon: Book, link: '/ebooks' },
  { title: 'Webinars', description: 'Live training sessions', icon: Video, link: '/webinars' },
  { title: 'Free Tools', description: 'Marketing calculators & analyzers', icon: Wrench, link: '/tools' },
  { title: 'Glossary', description: 'Marketing terms explained', icon: FileText, link: '/glossary' },
  { title: 'Blog', description: '224+ expert articles', icon: BookOpen, link: '/blogs' }
];

export function ResourcesPage() {
  const breadcrumbItems = [{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Free Digital Marketing Resources | Inchtomilez"
        description="Free eBooks, templates, tools, webinars and guides. Everything you need to master digital marketing."
        keywords={['resources', 'free tools', 'ebooks', 'templates', 'guides', 'digital marketing']}
        canonicalUrl="/resources"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'Free Digital Marketing Resources', description: 'Free tools and resources for marketers.', slug: 'resources' })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Resources</span>
          </nav>

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <BookOpen className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Free Marketing Resources</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Access our comprehensive library of free digital marketing resources. Templates, guides, tools, and expert insights to grow your business.
            </p>
          </div>
        </div>

        <OutlinedText text="RESOURCES" direction="right" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <BentoGrid2 
            cards={resources}
            mode="asymmetric"
            showBadges={false}
            ariaLabel="Resource categories"
          />
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Need Personalized Help?</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Get expert guidance tailored to your business needs.
          </p>
          <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
            Schedule Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}