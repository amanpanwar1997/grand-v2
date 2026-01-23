import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText, CheckCircle, Calendar, Mail } from 'lucide-react';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema } from '../../utils/seo-system';
import { OutlinedText } from '../ui/OutlinedText';

export function PrivacyPolicyPage() {
  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        "Personal identification information (name, email address, phone number)",
        "Business information (company name, industry, website URL)",
        "Usage data and analytics (pages visited, time spent, device information)",
        "Cookies and tracking technologies for website optimization",
        "Communication records (emails, chat logs, support tickets)",
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "Providing and improving our digital marketing services",
        "Communicating with you about projects, updates, and offers",
        "Analyzing website performance and user behavior",
        "Personalizing your experience on our website",
        "Complying with legal obligations and preventing fraud",
      ]
    },
    {
      icon: Shield,
      title: "Data Protection & Security",
      content: [
        "SSL encryption for all data transmission",
        "Regular security audits and vulnerability assessments",
        "Restricted access to personal data (authorized personnel only)",
        "Secure cloud storage with automatic backups",
        "Compliance with GDPR, CCPA, and Indian IT Act 2000",
      ]
    },
    {
      icon: Eye,
      title: "Third-Party Sharing",
      content: [
        "We do NOT sell your personal information to third parties",
        "We share data with trusted service providers (hosting, email, analytics)",
        "Google Analytics for website traffic analysis",
        "Payment processors for secure transactions",
        "Legal authorities when required by law",
      ]
    },
    {
      icon: CheckCircle,
      title: "Your Rights",
      content: [
        "Access your personal data we hold",
        "Request correction of inaccurate data",
        "Request deletion of your data (right to be forgotten)",
        "Opt-out of marketing communications anytime",
        "Data portability - receive your data in a standard format",
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO */}
      <SEOHead 
        title="Privacy Policy | Inchtomilez Digital Marketing"
        description="Read our privacy policy to understand how Inchtomilez collects, uses, and protects your personal information. GDPR compliant. Last updated November 2025."
        keywords={['privacy policy', 'data protection', 'GDPR', 'personal information', 'Inchtomilez']}
        canonicalUrl="/privacy-policy"
      />

      {/* Structured Data */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Privacy Policy - Inchtomilez',
        description: 'Our commitment to protecting your privacy and personal data.',
        slug: 'privacy-policy',
      })} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 glass-yellow rounded-xl mb-6">
              <Shield className="w-10 h-10 text-yellow-500" />
            </div>
            
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">
              Privacy Policy
            </h1>
            
            <p className="text-[15px] text-gray-400 mb-4">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>

            <div className="flex items-center justify-center gap-6 text-[13px] text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last Updated: November 9, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Text */}
        <OutlinedText 
          text="PRIVACY"
          direction="left"
          delay={0}
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.2}
        />
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">Introduction</h2>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  Inchtomilez Digital Marketing And Advertising Agency ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p>
                  By accessing our website or using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
                <p className="text-yellow-500 font-semibold">
                  We reserve the right to update this policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="glass-card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                      <Icon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h2 className="text-[20px] md:text-[22px] font-bold">{section.title}</h2>
                  </div>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[15px] text-gray-400">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cookies Policy */}
      <section className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">Cookies & Tracking Technologies</h2>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="glass p-4">
                    <h3 className="text-[18px] font-medium text-white mb-2">Essential Cookies</h3>
                    <p className="text-[13px]">Required for website functionality</p>
                  </div>
                  <div className="glass p-4">
                    <h3 className="text-[18px] font-medium text-white mb-2">Analytics Cookies</h3>
                    <p className="text-[13px]">Help us understand user behavior</p>
                  </div>
                  <div className="glass p-4">
                    <h3 className="text-[18px] font-medium text-white mb-2">Marketing Cookies</h3>
                    <p className="text-[13px]">Track ad performance and retargeting</p>
                  </div>
                  <div className="glass p-4">
                    <h3 className="text-[18px] font-medium text-white mb-2">Preference Cookies</h3>
                    <p className="text-[13px]">Remember your settings and choices</p>
                  </div>
                </div>
                <p className="text-yellow-500 mt-6">
                  You can manage cookie preferences in your browser settings. See our <Link to="/cookie-policy" className="underline hover:text-yellow-400">Cookie Policy</Link> for detailed information.
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
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4">Questions About Privacy?</h2>
              <p className="text-[15px] text-gray-400 mb-6">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="space-y-2 text-[15px]">
                <p>
                  <strong className="text-white">Email:</strong>{' '}
                  <a href="mailto:privacy@inchtomilez.com" className="text-yellow-500 hover:text-yellow-400">
                    privacy@inchtomilez.com
                  </a>
                </p>
                <p>
                  <strong className="text-white">Address:</strong>{' '}
                  <span className="text-gray-400">123 Marketing Street, Indore, MP 452001, India</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 text-center">Related Legal Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/terms-of-service" className="glass-card group">
                <FileText className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[18px] font-medium mb-2 group-hover:text-yellow-500 transition-colors">
                  Terms of Service
                </h3>
                <p className="text-[13px] text-gray-400">
                  Read our terms and conditions for using our services.
                </p>
              </Link>
              <Link to="/cookie-policy" className="glass-card group">
                <FileText className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[18px] font-medium mb-2 group-hover:text-yellow-500 transition-colors">
                  Cookie Policy
                </h3>
                <p className="text-[13px] text-gray-400">
                  Learn how we use cookies and tracking technologies.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}