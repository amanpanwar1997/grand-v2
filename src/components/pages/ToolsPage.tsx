import { Wrench, Calculator, Search, TrendingUp, DollarSign, Target, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BentoGrid2 } from '../layout/BentoGrid2';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const tools = [
  { title: 'SEO Score Checker', description: 'Analyze your website SEO performance', icon: Search, link: '#seo-checker' },
  { title: 'ROI Calculator', description: 'Calculate your marketing ROI', icon: DollarSign, link: '#roi-calculator' },
  { title: 'Keyword Research Tool', description: 'Find profitable keywords', icon: Target, link: '#keyword-tool' },
  { title: 'Social Media Audit', description: 'Analyze social media performance', icon: TrendingUp, link: '#social-audit' },
  { title: 'Ad Budget Calculator', description: 'Plan your advertising budget', icon: Calculator, link: '#budget-calc' },
  { title: 'Website Speed Test', description: 'Check your site loading speed', icon: TrendingUp, link: '#speed-test' }
];

export function ToolsPage() {
  const breadcrumbItems = [{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }, { name: 'Tools', path: '/tools' }];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead title="Free Digital Marketing Tools | Inchtomilez" description="Free online marketing tools: SEO checker, ROI calculator, keyword research, social media audit & more." keywords={['free tools', 'SEO tools', 'marketing calculators', 'analyzers']} canonicalUrl="/tools" />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'Free Digital Marketing Tools', description: 'Free online tools for marketers.', slug: 'tools' })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <Link to="/resources" className="text-gray-400 hover:text-yellow-500 transition-colors">Resources</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Free Tools</span>
          </nav>

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <Wrench className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Free Marketing Tools</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Powerful online tools to analyze, optimize, and improve your digital marketing performance. All free to use.
            </p>
          </div>
        </div>

        <OutlinedText text="FREE TOOLS" direction="right" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <BentoGrid2 cards={tools} mode="uniform" columns={3} ariaLabel="Marketing tools" />
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Need Advanced Analysis?</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Get comprehensive audits and custom recommendations from our experts.
          </p>
          <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
            Request Free Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}