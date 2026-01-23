import { AlertCircle, TrendingUp, Shield, FileText, CheckCircle } from 'lucide-react';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema } from '../../utils/structuredData';
import { OutlinedText } from '../ui/OutlinedText';

export function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Disclaimer | Inchtomilez Digital Marketing"
        description="Important disclaimers and limitations regarding Inchtomilez digital marketing services. No guarantees on rankings, traffic, or results."
        keywords={['disclaimer', 'limitations', 'no guarantees', 'SEO disclaimer']}
        canonicalUrl="/disclaimer"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Disclaimer - Inchtomilez',
        description: 'Service limitations and legal disclaimers.',
        slug: 'disclaimer',
      })} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 glass-yellow rounded-xl mb-6">
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Disclaimer</h1>
            <p className="text-[15px] text-gray-400">
              Important information about our services, limitations, and no-guarantee policy.
            </p>
          </div>
        </div>
        <OutlinedText text="NOTICE" direction="right" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <TrendingUp className="w-6 h-6 text-yellow-500" />
                <h2 className="text-[20px] md:text-[22px] font-bold">No Guarantees on Results</h2>
              </div>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  While we strive for excellence, <strong className="text-yellow-500">we cannot guarantee specific rankings, traffic numbers, leads, or sales</strong>. Digital marketing results depend on numerous factors including industry competition, budget, website quality, and market conditions.
                </p>
                <p>
                  Past performance does not guarantee future results. Case studies and testimonials represent specific client outcomes and may not be typical.
                </p>
              </div>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-6 h-6 text-yellow-500" />
                <h2 className="text-[20px] md:text-[22px] font-bold">Third-Party Dependencies</h2>
              </div>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  Our services rely on third-party platforms (Google, Facebook, Instagram, etc.). We are not responsible for changes to these platforms' algorithms, policies, or pricing that may affect campaign performance.
                </p>
                <p>
                  Search engine algorithm updates may impact rankings. Social media policy changes may affect ad delivery. We will adapt strategies accordingly but cannot control external factors.
                </p>
              </div>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <FileText className="w-6 h-6 text-yellow-500" />
                <h2 className="text-[20px] md:text-[22px] font-bold">Professional Advice</h2>
              </div>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  Information provided on our website and in consultations is for general marketing guidance only. It should not be considered legal, financial, or business advice. Consult appropriate professionals for specific matters.
                </p>
                <p>
                  Clients are responsible for their own business decisions and compliance with applicable laws and regulations.
                </p>
              </div>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <CheckCircle className="w-6 h-6 text-yellow-500" />
                <h2 className="text-[20px] md:text-[22px] font-bold">Our Commitment</h2>
              </div>
              <div className="space-y-3 text-[15px] text-gray-400">
                <p>Despite these limitations, we commit to:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Delivering high-quality work based on industry best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Transparent reporting and regular communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Continuous optimization based on data and performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Ethical, white-hat marketing practices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
