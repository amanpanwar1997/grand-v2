import { Map, ChevronRight, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema } from '../../utils/structuredData';

const sitemapSections = [
  {
    title: 'Main Pages',
    links: [
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/about' },
      { name: 'Services', url: '/services' },
      { name: 'Industries', url: '/industries' },
      { name: 'Blog', url: '/blogs' },
      { name: 'Contact', url: '/contact' },
      { name: 'FAQs', url: '/faqs' }
    ]
  },
  {
    title: 'Services',
    links: [
      { name: 'Digital Marketing', url: '/services/digital-marketing' },
      { name: 'SEO', url: '/services/search-engine-optimization-seo' },
      { name: 'PPC & Google Ads', url: '/services/ppc-google-ads' },
      { name: 'Social Media Marketing', url: '/services/social-media-marketing' },
      { name: 'Web Design & Development', url: '/services/web-design-development' },
      { name: 'Branding & Identity', url: '/services/branding-identity' }
    ]
  },
  {
    title: 'Industries',
    links: [
      { name: 'Healthcare', url: '/industries/healthcare' },
      { name: 'Real Estate', url: '/industries/real-estate' },
      { name: 'eCommerce', url: '/industries/ecommerce' },
      { name: 'Education', url: '/industries/education' },
      { name: 'Hospitality', url: '/industries/hospitality' },
      { name: 'Technology', url: '/industries/technology' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Resources Hub', url: '/resources' },
      { name: 'Free Downloads', url: '/downloads' },
      { name: 'eBooks', url: '/ebooks' },
      { name: 'Webinars', url: '/webinars' },
      { name: 'Free Tools', url: '/tools' },
      { name: 'Glossary', url: '/glossary' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'Careers', url: '/careers' },
      { name: 'Our Team', url: '/team' },
      { name: 'Testimonials', url: '/testimonials' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: 'Portfolio', url: '/portfolio' },
      { name: 'Awards', url: '/awards' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', url: '/privacy-policy' },
      { name: 'Terms of Service', url: '/terms-of-service' },
      { name: 'Cookie Policy', url: '/cookie-policy' },
      { name: 'Disclaimer', url: '/disclaimer' },
      { name: 'Refund Policy', url: '/refund-policy' }
    ]
  }
];

export function SitemapHTMLPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead title="Sitemap - All Pages | Inchtomilez" description="Complete sitemap of Inchtomilez website. Browse all pages, services, industries, blog posts and resources." keywords={['sitemap', 'site navigation', 'all pages']} canonicalUrl="/sitemap-page" />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'HTML Sitemap', description: 'Complete site navigation.', slug: 'sitemap-page' })} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Sitemap</span>
          </nav>

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <Map className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Sitemap</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Browse our complete site structure. Find all pages, services, resources, and content easily.
            </p>
          </div>
        </div>

        <OutlinedText text="SITEMAP" direction="right" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapSections.map((section, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FolderOpen className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-[18px] font-medium">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.url}
                        className="text-[15px] text-gray-400 hover:text-yellow-500 transition-colors block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[15px] text-gray-400 mb-4">
            Total Pages: 303+ | Blog Posts: 224+ | Services: 14 | Industries: 18
          </p>
          <Link to="/blogs" className="text-yellow-500 hover:text-yellow-400 transition-colors text-[15px] font-medium">
            Browse All Blog Posts →
          </Link>
        </div>
      </section>
    </div>
  );
}
