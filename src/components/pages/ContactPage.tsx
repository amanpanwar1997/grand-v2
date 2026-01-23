import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { useSEO, StructuredData, organizationSchema, localBusinessSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/seo-system';

export function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  const seo = useSEO(); // Auto-loads SEO from centralized config

  // Contact methods data for BentoGrid2
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email Us',
      description: 'hello@inchtomilez.com',
      sublabel: 'support@inchtomilez.com',
    },
    {
      icon: Phone,
      label: 'Call Us',
      description: '+91 966-998-8666',
      sublabel: '+91 900-997-0709',
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      description: 'Vijay Nagar, Indore, Madhya Pradesh 452010, India',
    },
    {
      icon: Clock,
      label: 'Business Hours',
      description: 'Mon-Sat: 10:00 AM - 7:00 PM',
      sublabel: 'Sunday: Closed',
    },
  ];

  return (
    <div>
      {/* ⚠️ REMOVED bg-black - Using body background with grid pattern */}
      {/* SEO Meta Tags - Auto-loaded from centralized config */}
      <SEOHeadSSG {...seo.meta} />
      
      {/* Structured Data */}
      <StructuredData 
        schema={[
          organizationSchema,
          localBusinessSchema,
          getWebPageSchema(seo.meta.title, seo.meta.description, '/contact', breadcrumbs),
          getBreadcrumbSchema(breadcrumbs),
        ]} 
      />
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} showHomeIcon={true} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 relative overflow-hidden">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="GET IN TOUCH" 
          className="absolute top-[20%] right-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* H1: Guidelines-compliant sizing */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <h1 className="text-[30px] md:text-[36px] font-medium tracking-tight mb-8 leading-[1.3]">
              {seo.h1}
            </h1>
          </AnimatedSection>
          {/* P: Guidelines-compliant sizing */}
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
              Schedule a free consultation to discuss your goals and see how we can help. <span className="text-yellow-500 font-semibold">No pressure, just honest conversation.</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Methods Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <BentoGrid2 
              cards={contactMethods}
              mode="uniform"
              columns={4}
              showCTA={false}
              ariaLabel="Contact methods"
            />
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              {/* H2: Animated gradient auto-applied with explicit sizing */}
              <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-8">Send Us a Message</h2>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-[0.9375rem] text-green-400 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Thank you! Your message has been sent successfully. We will respond within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    {/* Label: Guidelines-compliant */}
                    <label htmlFor="firstName" className="block mb-3 text-[0.8125rem] text-white/90">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-black border border-white/20 rounded-xl text-white text-[0.9375rem] placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors duration-200"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-3 text-[0.8125rem] text-white/90">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-black border border-white/20 rounded-xl text-white text-[0.9375rem] placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors duration-200"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-3 text-[0.8125rem] text-white/90">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-black border border-white/20 rounded-xl text-white text-[0.9375rem] placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors duration-200"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-3 text-[0.8125rem] text-white/90">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-black border border-white/20 rounded-xl text-white text-[0.9375rem] placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors duration-200"
                    placeholder="+91 999-999-9999"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block mb-3 text-[0.8125rem] text-white/90">
                    Service You're Interested In
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-black border border-white/20 rounded-xl text-white text-[0.9375rem] focus:outline-none focus:border-yellow-500 transition-colors duration-200"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="advertising">Advertising</option>
                    <option value="branding">Branding</option>
                    <option value="website-development">Website Development</option>
                    <option value="software-development">Software Development</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="media-production">Media Production</option>
                    <option value="public-relations">Public Relations</option>
                    <option value="political-campaigns">Political Campaigns</option>
                    <option value="ooh-advertising">OOH Advertising</option>
                    <option value="radio-newspapers">Radio & Newspapers</option>
                    <option value="product-marketing">Product Marketing</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-3 text-[0.8125rem] text-white/90">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-6 py-4 bg-black border border-white/20 rounded-xl text-white text-[0.9375rem] placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors duration-200 resize-none"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold shadow-xl hover:shadow-yellow-500/50 hover:scale-105"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-[0.8125rem] text-gray-500 text-center" style={{ lineHeight: 1.6 }}>
                  We typically respond within 24 hours on business days
                </p>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-6">
              <div className="glass-card p-8">
                <Clock className="mb-4 text-white" size={32} />
                <h3 className="text-[1.375rem] font-medium mb-4 leading-[1.4]">Office Hours</h3>
                <div className="space-y-3 text-[0.8125rem] text-gray-400" style={{ lineHeight: 1.6 }}>
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="text-gray-300">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-gray-300">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-gray-300">Closed</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <MessageSquare className="mb-4 text-white" size={32} />
                <h3 className="text-[1.375rem] font-medium mb-4 leading-[1.4]">What to Expect</h3>
                <ul className="space-y-3 text-[0.8125rem] text-gray-400" style={{ lineHeight: 1.6 }}>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Free initial consultation (30-45 minutes)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Detailed proposal with scope and pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Realistic timelines and expectations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Clear next steps if we're a good fit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>No pressure or obligation to proceed</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8">
                <Mail className="mb-4 text-white" size={32} />
                <h3 className="text-[1.375rem] font-medium mb-4 leading-[1.4]">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[0.8125rem] text-gray-500 mb-2">Email:</p>
                    <a href="mailto:hello@inchtomilez.com" className="text-[0.9375rem] leading-relaxed text-gray-300 hover:text-yellow-500 transition-colors">
                      hello@inchtomilez.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.8125rem] text-gray-500 mb-2">Phone:</p>
                    <a href="tel:+919669988666" className="text-[0.9375rem] leading-relaxed text-gray-300 hover:text-yellow-500 transition-colors block">
                      +91 966-998-8666
                    </a>
                    <a href="tel:+919009970709" className="text-[0.9375rem] leading-relaxed text-gray-400 hover:text-yellow-500 transition-colors block">
                      +91 900-997-0709
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.8125rem] text-gray-500 mb-2">Address:</p>
                    <p className="text-[0.9375rem] leading-relaxed text-gray-300" style={{ lineHeight: 1.6 }}>
                      Vijay Nagar, Indore<br />
                      Madhya Pradesh 452010<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="LOCATION" 
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-8 text-center">Find Us</h2>
            <div className="glass-card p-4 rounded-2xl overflow-hidden">
              <div className="aspect-[21/9] bg-gray-900 rounded-xl flex items-center justify-center">
                <p className="text-[0.9375rem] leading-relaxed text-gray-500">
                  Map location: Vijay Nagar, Indore, Madhya Pradesh 452010
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="SUPPORT" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto relative z-10">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">COMMON QUESTIONS</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center leading-[1.3]">
              Before You Reach Out
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center" style={{ lineHeight: 1.6 }}>
              Quick answers to <span className="text-yellow-500 font-semibold">frequently asked questions</span> about working with us.
            </p>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h4 className="text-lg font-medium mb-3 leading-[1.4]">How long does it take to get started?</h4>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed" style={{ lineHeight: 1.6 }}>
                  After our initial consultation and agreement on scope, most projects can start within 7-10 business days. We'll provide a detailed timeline during our first meeting.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-lg font-medium mb-3 leading-[1.4]">Do you work with businesses outside Indore?</h4>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed" style={{ lineHeight: 1.6 }}>
                  Yes, we serve clients across India and internationally. Most of our work is done remotely with regular video calls. Local clients can visit our office if preferred.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-lg font-medium mb-3 leading-[1.4]">What information should I prepare for the consultation?</h4>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed" style={{ lineHeight: 1.6 }}>
                  Think about your business goals, target audience, budget range, and timeline. Any existing marketing materials or analytics are helpful but not required.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-lg font-medium mb-3 leading-[1.4]">What if I'm not sure which service I need?</h4>
                <p className="text-[0.8125rem] text-gray-400 leading-relaxed" style={{ lineHeight: 1.6 }}>
                  That's completely normal. During our consultation, we'll discuss your goals and recommend the services that make sense for your situation and budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}