import { DollarSign, Calendar, CheckCircle, XCircle, Mail, AlertTriangle } from 'lucide-react';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema } from '../../utils/structuredData';
import { OutlinedText } from '../ui/OutlinedText';

export function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Refund & Cancellation Policy | Inchtomilez"
        description="Understand our refund and cancellation policy for digital marketing services. Fair terms for both clients and agency."
        keywords={['refund policy', 'cancellation', 'money back', 'terms']}
        canonicalUrl="/refund-policy"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Refund Policy - Inchtomilez',
        description: 'Our refund and cancellation terms.',
        slug: 'refund-policy',
      })} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 glass-yellow rounded-xl mb-6">
              <DollarSign className="w-10 h-10 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Refund & Cancellation Policy</h1>
            <p className="text-[15px] text-gray-400">
              Fair and transparent refund terms for our digital marketing services.
            </p>
          </div>
        </div>
        <OutlinedText text="REFUNDS" direction="left" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <Calendar className="w-6 h-6 text-yellow-500" />
                <h2 className="text-[20px] md:text-[22px] font-bold">Cancellation Timeline</h2>
              </div>
              <div className="space-y-4">
                <div className="glass p-6">
                  <h3 className="text-[18px] font-medium text-green-500 mb-2">Within 24 Hours</h3>
                  <p className="text-[15px] text-gray-400">80% refund of advance payment (20% administrative fee)</p>
                </div>
                <div className="glass p-6">
                  <h3 className="text-[18px] font-medium text-yellow-500 mb-2">2-7 Days</h3>
                  <p className="text-[15px] text-gray-400">50% refund of advance payment</p>
                </div>
                <div className="glass p-6">
                  <h3 className="text-[18px] font-medium text-orange-500 mb-2">8-14 Days</h3>
                  <p className="text-[15px] text-gray-400">25% refund of advance payment</p>
                </div>
                <div className="glass p-6">
                  <h3 className="text-[18px] font-medium text-red-500 mb-2">After 14 Days</h3>
                  <p className="text-[15px] text-gray-400">No refund (work in progress charged as per completion)</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h2 className="text-[20px] md:text-[22px] font-bold">Eligible for Refund</h2>
              </div>
              <ul className="space-y-3 text-[15px] text-gray-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Service not started due to agency's inability to deliver</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Double payment made by mistake (excess amount refunded)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Cancellation within eligible timeframe (as per timeline above)</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <XCircle className="w-6 h-6 text-red-500" />
                <h2 className="text-[20px] md:text-[22px] font-bold">NOT Eligible for Refund</h2>
              </div>
              <ul className="space-y-3 text-[15px] text-gray-400">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Work already completed and delivered</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Third-party expenses (Google Ads budget, stock images, licenses)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Monthly retainer services (must give 30 days notice)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Change of mind after work has commenced</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 border border-yellow-500/20">
              <div className="flex items-center gap-4 mb-6">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                <h2 className="text-[20px] md:text-[22px] font-bold">Important Notes</h2>
              </div>
              <div className="space-y-3 text-[15px] text-gray-400">
                <p>• Refunds processed within 7-10 business days to original payment method</p>
                <p>• Partial refunds calculated based on work completed (pro-rated)</p>
                <p>• All refund requests must be submitted in writing to finance@inchtomilez.com</p>
                <p>• Client retains rights to completed deliverables even after refund</p>
              </div>
            </div>

            <div className="glass-card p-8 text-center">
              <Mail className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4">Request a Refund</h2>
              <p className="text-[15px] text-gray-400 mb-6">
                To request a refund, email us with your invoice number and reason:
              </p>
              <a 
                href="mailto:finance@inchtomilez.com?subject=Refund Request" 
                className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg text-[15px] font-semibold hover:bg-yellow-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Finance Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
