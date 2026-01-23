import { Handshake, Award, TrendingUp, ArrowRight, ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const partners = [
  { name: 'Google Partner', category: 'Technology', tier: 'Premier', logo: '/partners/google.svg' },
  { name: 'Meta Business Partner', category: 'Social Media', tier: 'Gold', logo: '/partners/meta.svg' },
  { name: 'HubSpot Agency Partner', category: 'Marketing Automation', tier: 'Platinum', logo: '/partners/hubspot.svg' },
  { name: 'Shopify Partner', category: 'eCommerce', tier: 'Expert', logo: '/partners/shopify.svg' },
  { name: 'WordPress VIP', category: 'Web Development', tier: 'Enterprise', logo: '/partners/wordpress.svg' },
  { name: 'Adobe Solution Partner', category: 'Creative', tier: 'Gold', logo: '/partners/adobe.svg' }
];

const benefits = [
  { icon: TrendingUp, title: 'Exclusive Tools', description: 'Access to beta features and advanced platforms' },
  { icon: Users, title: 'Expert Training', description: 'Certified specialists in all partner technologies' },
  { icon: Award, title: 'Priority Support', description: 'Direct access to partner technical teams' }
];

export function PartnersPage() {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Partners', path: '/partners' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Technology & Strategic Partners | Inchtomilez"
        description="Official Google Partner, Meta Business Partner, and HubSpot Agency Partner. Premier partnerships ensuring cutting-edge solutions."
        keywords={['partners', 'Google Partner', 'Meta Business Partner', 'technology partners', 'Indore']}
        canonicalUrl="/partners"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Technology & Strategic Partners',
        description: 'Premier partnerships with industry leaders.',
        slug: 'partners',
      })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Partners</span>
          </nav>

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <Handshake className="w-8 h-8 text-yellow-500" />
            </div>

            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Our Strategic Partners</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              We partner with industry leaders to deliver cutting-edge solutions. Our certifications and partnerships ensure you get the best technology and expertise.
            </p>
          </div>
        </div>

        <OutlinedText text="PARTNERS" direction="right" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map(partner => (
              <div key={partner.name} className="glass-card p-8 text-center hover:border-yellow-500/30 transition-all duration-300">
                <div className="w-20 h-20 bg-white/5 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <p className="text-[13px] text-gray-400">{partner.name}</p>
                </div>
                <h3 className="text-[18px] font-medium mb-2">{partner.name}</h3>
                <p className="text-[13px] text-gray-400 mb-2">{partner.category}</p>
                <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-lg text-[13px] font-semibold">
                  {partner.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-8 text-center">Partnership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map(benefit => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="glass p-8 text-center">
                  <Icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-[18px] font-medium mb-3">{benefit.title}</h3>
                  <p className="text-[15px] text-gray-400">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Partner With Excellence</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience the advantage of working with a certified partner agency.
          </p>
          <Link
            to="/contact"
            className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}