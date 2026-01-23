import { Cookie, Settings, Eye, Shield, CheckCircle, XCircle } from 'lucide-react';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema } from '../../utils/seo-system';
import { OutlinedText } from '../ui/OutlinedText';
import { Link } from 'react-router-dom';

export function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: CheckCircle,
      name: "Essential Cookies",
      purpose: "Required for website functionality",
      duration: "Session / 1 year",
      canDisable: false,
      examples: ["Session authentication", "Security tokens", "Load balancing"]
    },
    {
      icon: Eye,
      name: "Analytics Cookies",
      purpose: "Help us understand user behavior",
      duration: "2 years",
      canDisable: true,
      examples: ["Google Analytics", "Page views", "Traffic sources"]
    },
    {
      icon: Settings,
      name: "Functional Cookies",
      purpose: "Remember your preferences",
      duration: "1 year",
      canDisable: true,
      examples: ["Language selection", "Theme preferences", "Form data"]
    },
    {
      icon: Shield,
      name: "Marketing Cookies",
      purpose: "Track ad performance",
      duration: "90 days",
      canDisable: true,
      examples: ["Google Ads", "Facebook Pixel", "Retargeting"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Cookie Policy | Inchtomilez Digital Marketing"
        description="Learn how Inchtomilez uses cookies and tracking technologies. Manage your cookie preferences and understand our data collection practices."
        keywords={['cookie policy', 'cookies', 'tracking', 'privacy', 'data collection']}
        canonicalUrl="/cookie-policy"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Cookie Policy - Inchtomilez',
        description: 'How we use cookies and tracking technologies.',
        slug: 'cookie-policy',
      })} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 glass-yellow rounded-xl mb-6">
              <Cookie className="w-10 h-10 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Cookie Policy</h1>
            <p className="text-[15px] text-gray-400">
              This policy explains how we use cookies and similar technologies to improve your experience.
            </p>
          </div>
        </div>
        <OutlinedText text="COOKIES" direction="left" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">What Are Cookies?</h2>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>
                  Cookies are small text files stored on your device when you visit our website. They help us recognize your browser, remember your preferences, and improve your experience.
                </p>
                <p>
                  We use both first-party cookies (set by Inchtomilez) and third-party cookies (set by external services like Google Analytics) to analyze website performance and provide personalized content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-8 text-center">Types of Cookies We Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cookieTypes.map((cookie, index) => {
                const Icon = cookie.icon;
                return (
                  <div key={index} className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-yellow-500" />
                      <h3 className="text-[18px] font-medium">{cookie.name}</h3>
                    </div>
                    <div className="space-y-2 text-[13px] text-gray-400">
                      <p><strong className="text-white">Purpose:</strong> {cookie.purpose}</p>
                      <p><strong className="text-white">Duration:</strong> {cookie.duration}</p>
                      <p>
                        <strong className="text-white">Can Disable:</strong>{' '}
                        {cookie.canDisable ? (
                          <span className="text-green-500">Yes</span>
                        ) : (
                          <span className="text-red-500">No (Required)</span>
                        )}
                      </p>
                      <div>
                        <strong className="text-white">Examples:</strong>
                        <ul className="ml-4 mt-1 space-y-1">
                          {cookie.examples.map((ex, i) => (
                            <li key={i}>• {ex}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">How to Manage Cookies</h2>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p>You can control cookies through your browser settings:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="glass p-4">
                    <h3 className="text-[15px] font-semibold text-white mb-2">Chrome</h3>
                    <p className="text-[13px]">Settings → Privacy → Cookies</p>
                  </div>
                  <div className="glass p-4">
                    <h3 className="text-[15px] font-semibold text-white mb-2">Firefox</h3>
                    <p className="text-[13px]">Options → Privacy → Cookies</p>
                  </div>
                  <div className="glass p-4">
                    <h3 className="text-[15px] font-semibold text-white mb-2">Safari</h3>
                    <p className="text-[13px]">Preferences → Privacy → Cookies</p>
                  </div>
                  <div className="glass p-4">
                    <h3 className="text-[15px] font-semibold text-white mb-2">Edge</h3>
                    <p className="text-[13px]">Settings → Privacy → Cookies</p>
                  </div>
                </div>
                <p className="text-yellow-500 mt-6">
                  Note: Disabling essential cookies may affect website functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/privacy-policy" className="glass-card group">
                <Shield className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[18px] font-medium mb-2 group-hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </h3>
                <p className="text-[13px] text-gray-400">Read our full privacy policy</p>
              </Link>
              <Link to="/terms-of-service" className="glass-card group">
                <Settings className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-[18px] font-medium mb-2 group-hover:text-yellow-500 transition-colors">
                  Terms of Service
                </h3>
                <p className="text-[13px] text-gray-400">View our terms and conditions</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}