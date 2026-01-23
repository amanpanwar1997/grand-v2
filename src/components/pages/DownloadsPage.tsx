import { Download, FileText, CheckCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const downloads = [
  { title: 'SEO Audit Checklist', description: '50-point comprehensive SEO audit template', downloads: '2.3K', category: 'SEO', format: 'PDF' },
  { title: 'Social Media Content Calendar', description: '90-day planning template with prompts', downloads: '1.8K', category: 'Social Media', format: 'Excel' },
  { title: 'PPC Campaign Setup Guide', description: 'Step-by-step Google Ads setup checklist', downloads: '1.5K', category: 'PPC', format: 'PDF' },
  { title: 'Email Marketing Templates', description: '20 proven email templates for conversions', downloads: '2.1K', category: 'Email', format: 'HTML' },
  { title: 'Website Launch Checklist', description: '100-point pre-launch verification list', downloads: '1.2K', category: 'Web Design', format: 'PDF' },
  { title: 'Brand Style Guide Template', description: 'Professional brand guidelines template', downloads: '980', category: 'Branding', format: 'PDF' }
];

export function DownloadsPage() {
  const breadcrumbItems = [{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }, { name: 'Downloads', path: '/downloads' }];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead title="Free Downloads - Templates & Checklists | Inchtomilez" description="Download free marketing templates, checklists, and guides. SEO audits, content calendars, email templates & more." keywords={['free downloads', 'templates', 'checklists', 'marketing tools']} canonicalUrl="/downloads" />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'Free Downloads', description: 'Free marketing templates and resources.', slug: 'downloads' })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <Link to="/resources" className="text-gray-400 hover:text-yellow-500 transition-colors">Resources</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Downloads</span>
          </nav>

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <Download className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Free Downloads</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Download ready-to-use marketing templates, checklists, and guides. Professionally designed resources to accelerate your marketing efforts.
            </p>
          </div>
        </div>

        <OutlinedText text="DOWNLOADS" direction="left" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloads.map((item, index) => (
              <div key={index} className="glass-card p-6 hover:border-yellow-500/30 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <FileText className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <span className="bg-white/5 text-gray-400 px-2 py-1 rounded text-[11px] uppercase">{item.category}</span>
                  </div>
                </div>

                <h3 className="text-[18px] font-medium mb-3">{item.title}</h3>
                <p className="text-[15px] text-gray-400 mb-4">{item.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[13px] text-gray-500">{item.downloads} downloads</span>
                  <span className="text-[13px] text-yellow-500 font-medium">{item.format}</span>
                </div>

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
          <CheckCircle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Need Custom Solutions?</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Get personalized marketing strategies tailored to your business.
          </p>
          <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
            Talk to an Expert <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}