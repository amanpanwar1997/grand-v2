import { Link } from 'react-router-dom';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema } from '../../utils/seo-system';
import { OutlinedText } from '../ui/OutlinedText';

export function TermsOfServicePage() {
  const terms = [
    {
      icon: FileText,
      title: "Service Agreement",
      points: [
        "By using our services, you enter into a legally binding agreement with Inchtomilez",
        "Services are provided on an 'as-is' basis with industry-standard quality guarantees",
        "Project timelines and deliverables are outlined in individual service agreements",
        "All work remains property of Inchtomilez until full payment is received",
      ]
    },
    {
      icon: CheckCircle,
      title: "Client Responsibilities",
      points: [
        "Provide accurate and complete information for project execution",
        "Respond to requests for feedback within agreed timeframes",
        "Maintain confidentiality of login credentials and access information",
        "Ensure all provided content and materials are legally owned or licensed",
        "Make timely payments according to agreed payment terms",
      ]
    },
    {
      icon: Scale,
      title: "Intellectual Property",
      points: [
        "All custom work delivered becomes client property upon full payment",
        "Inchtomilez retains rights to proprietary tools, frameworks, and methodologies",
        "Clients grant us permission to use work in our portfolio (unless otherwise agreed)",
        "Third-party licenses (stock images, fonts, plugins) remain subject to their terms",
        "We reserve the right to display client logos as part of our client list",
      ]
    },
    {
      icon: AlertCircle,
      title: "Payment Terms",
      points: [
        "50% advance payment required before project commencement (unless otherwise agreed)",
        "Remaining balance due upon project completion or as per milestone schedule",
        "Late payments may incur interest charges of 2% per month",
        "Services may be suspended for accounts with outstanding balances over 15 days",
        "All prices are in INR unless otherwise specified",
      ]
    },
    {
      icon: XCircle,
      title: "Cancellation & Refunds",
      points: [
        "Projects can be cancelled with 7 days written notice",
        "Refunds calculated based on work completed and resources invested",
        "No refunds for completed deliverables or third-party expenses incurred",
        "Cancellation within 24 hours of project start: 80% refund of advance",
        "See our Refund Policy for detailed terms",
      ]
    },
    {
      icon: Shield,
      title: "Limitation of Liability",
      points: [
        "Our liability is limited to the total amount paid for the specific service",
        "We are not liable for indirect, consequential, or incidental damages",
        "No guarantees on specific SEO rankings, traffic numbers, or conversion rates",
        "Client assumes all risk for business decisions based on our recommendations",
        "Force majeure events (natural disasters, government actions) exempt us from liability",
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO */}
      <SEOHead 
        title="Terms of Service | Inchtomilez Digital Marketing"
        description="Read the terms and conditions for using Inchtomilez digital marketing services. Legal agreements, payment terms, and client responsibilities."
        keywords={['terms of service', 'legal agreement', 'service terms', 'Inchtomilez', 'client agreement']}
        canonicalUrl="/terms-of-service"
      />

      {/* Structured Data */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Terms of Service - Inchtomilez',
        description: 'Legal terms and conditions for our digital marketing services.',
        slug: 'terms-of-service',
      })} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 glass-yellow rounded-xl mb-6">
              <Scale className="w-10 h-10 text-yellow-500" />
            </div>
            
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">
              Terms of Service
            </h1>
            
            <p className="text-[15px] text-gray-400 mb-4">
              Please read these terms carefully before using our services. By engaging with Inchtomilez, you agree to be bound by these terms.
            </p>

            <div className="flex items-center justify-center gap-6 text-[13px] text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Effective Date: November 9, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Text */}
        <OutlinedText 
          text="TERMS"
          direction="right"
          delay={0}
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
        />
      </section>

      {/* Acceptance of Terms */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client," "you," or "your") and Inchtomilez Digital Marketing And Advertising Agency ("Company," "we," "our," or "us").
                </p>
                <p>
                  By accessing our website, requesting a quote, or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please discontinue use of our services immediately.
                </p>
                <p className="text-yellow-500 font-semibold">
                  These Terms apply to all services including but not limited to: SEO, PPC advertising, social media marketing, web design, content creation, branding, and consulting services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Terms Sections */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {terms.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="glass-card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                      <Icon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h2 className="text-[20px] md:text-[22px] font-bold">{index + 2}. {section.title}</h2>
                  </div>
                  
                  <ul className="space-y-3">
                    {section.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[15px] text-gray-400">
                        <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Terms */}
      <section className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Confidentiality */}
            <div className="glass-card p-8">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">8. Confidentiality</h2>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  Both parties agree to maintain confidentiality of all proprietary information shared during the course of engagement. This includes but is not limited to business strategies, financial data, customer lists, and technical specifications.
                </p>
                <p>
                  Confidentiality obligations survive termination of the agreement and remain in effect for a period of 3 years from the date of disclosure.
                </p>
              </div>
            </div>

            {/* Termination */}
            <div className="glass-card p-8">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">9. Termination</h2>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  Either party may terminate services with 30 days written notice. Upon termination:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Client must pay for all work completed up to the termination date</li>
                  <li>All completed deliverables will be provided to the client</li>
                  <li>Work in progress may be delivered at pro-rated cost</li>
                  <li>Third-party subscriptions and licenses are non-refundable</li>
                  <li>Access credentials and materials must be returned to client within 7 days</li>
                </ul>
              </div>
            </div>

            {/* Governing Law */}
            <div className="glass-card p-8">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">10. Governing Law & Disputes</h2>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of courts in Indore, Madhya Pradesh.
                </p>
                <p>
                  Both parties agree to attempt good-faith negotiation and mediation before pursuing legal action. Arbitration may be used as an alternative dispute resolution mechanism.
                </p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="glass-card p-8">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">11. Modifications to Terms</h2>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Effective Date." Continued use of our services after changes constitutes acceptance of the modified Terms.
                </p>
                <p className="text-yellow-500">
                  For ongoing contracts, we will notify clients of material changes via email at least 15 days before they take effect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 text-center">
              <Mail className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4">Questions About Our Terms?</h2>
              <p className="text-[15px] text-gray-400 mb-6">
                If you have any questions about these Terms of Service, please contact our legal team:
              </p>
              <div className="space-y-2 text-[15px]">
                <p>
                  <strong className="text-white">Email:</strong>{' '}
                  <a href="mailto:legal@inchtomilez.com" className="text-yellow-500 hover:text-yellow-400">
                    legal@inchtomilez.com
                  </a>
                </p>
                <p>
                  <strong className="text-white">Phone:</strong>{' '}
                  <a href="tel:+919876543210" className="text-yellow-500 hover:text-yellow-400">
                    +91 98765 43210
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Documents */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 text-center">Related Legal Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/privacy-policy" className="glass-card group">
                <Shield className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[18px] font-medium mb-2 group-hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </h3>
                <p className="text-[13px] text-gray-400">
                  How we protect your data
                </p>
              </Link>
              <Link to="/refund-policy" className="glass-card group">
                <FileText className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[18px] font-medium mb-2 group-hover:text-yellow-500 transition-colors">
                  Refund Policy
                </h3>
                <p className="text-[13px] text-gray-400">
                  Cancellation and refund terms
                </p>
              </Link>
              <Link to="/disclaimer" className="glass-card group">
                <AlertCircle className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[18px] font-medium mb-2 group-hover:text-yellow-500 transition-colors">
                  Disclaimer
                </h3>
                <p className="text-[13px] text-gray-400">
                  Service limitations and disclaimers
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}