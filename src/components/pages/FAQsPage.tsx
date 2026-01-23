import { Breadcrumbs } from '../ui/Breadcrumbs';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { useSEO, StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/seo-system';
import { OutlinedText } from '../ui/OutlinedText';

export function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categoryIcons = {
    'General': HelpCircle,
    'Services': Settings,
    'Pricing': DollarSign,
    'Process': MessageCircle,
  };

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What services does Inchtomilez offer?',
          answer: 'We offer a comprehensive range of digital marketing and advertising services including SEO, PPC, social media marketing, content marketing, web development, branding, graphic design, video production, and much more. Our full-service approach means you can get everything you need under one roof.',
        },
        {
          question: 'What industries do you work with?',
          answer: 'We have experience working across 21+ different industries including healthcare, technology, education, real estate, finance, retail, and many more. Our diverse industry expertise allows us to bring best practices from various sectors to every project we work on.',
        },
        {
          question: 'How long does it take to see results?',
          answer: 'The timeline varies depending on the service and your specific goals. For SEO, you can typically expect to see meaningful results in 3-6 months. PPC campaigns can drive immediate traffic. Branding and website projects usually take 4-12 weeks. We\'ll provide a detailed timeline during our initial consultation.',
        },
      ],
    },
    {
      category: 'Services',
      questions: [
        {
          question: 'Do you offer customized marketing packages?',
          answer: 'Absolutely! While we have standard service offerings, we understand that every business is unique. We create customized marketing strategies and packages tailored to your specific goals, budget, and industry requirements.',
        },
        {
          question: 'Can you help with both digital and traditional marketing?',
          answer: 'Yes! We offer both digital marketing services (SEO, social media, PPC, etc.) and traditional marketing services (print media, OOH advertising, corporate gifting, etc.). We can create integrated campaigns that leverage both digital and traditional channels for maximum impact.',
        },
        {
          question: 'Do you provide ongoing support and maintenance?',
          answer: 'Yes, we offer ongoing support and maintenance for all our services. Whether it\'s website maintenance, continuous SEO optimization, or ongoing campaign management, we\'re here to ensure your marketing efforts continue to deliver results.',
        },
      ],
    },
    {
      category: 'Pricing',
      questions: [
        {
          question: 'How much do your services cost?',
          answer: 'Our pricing varies based on the scope of work, services required, and your specific needs. We offer flexible pricing models including project-based, monthly retainers, and hourly rates. Contact us for a customized quote based on your requirements.',
        },
        {
          question: 'Do you require long-term contracts?',
          answer: 'While we offer both project-based and ongoing services, we don\'t lock you into long-term contracts that don\'t make sense for your business. For ongoing services, we typically work on a month-to-month basis after an initial engagement period.',
        },
        {
          question: 'What is included in your pricing?',
          answer: 'Our pricing is transparent and includes all necessary services, tools, and resources to execute your project or campaign. We\'ll provide a detailed breakdown of costs during the proposal phase so you know exactly what you\'re paying for.',
        },
      ],
    },
    {
      category: 'Process',
      questions: [
        {
          question: 'What is your onboarding process?',
          answer: 'Our onboarding process begins with an initial consultation to understand your goals and challenges. We then conduct research and develop a customized strategy. Once approved, we begin execution with regular check-ins and reporting to keep you informed every step of the way.',
        },
        {
          question: 'How do you measure success?',
          answer: 'We establish clear KPIs and metrics at the start of every project aligned with your business goals. These might include website traffic, conversion rates, lead generation, ROI, brand awareness, or other relevant metrics. We provide regular reports showing progress against these goals.',
        },
        {
          question: 'How often will I receive updates on my project?',
          answer: 'Communication frequency depends on your preferences and the service type. Typically, we provide weekly updates for active campaigns and monthly comprehensive reports. For website and branding projects, we schedule regular milestone check-ins. You\'ll also have direct access to your account manager for any questions.',
        },
      ],
    },
  ];

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const globalIndex = faqs
      .slice(0, categoryIndex)
      .reduce((acc, cat) => acc + cat.questions.length, 0) + questionIndex;
    setOpenIndex(openIndex === globalIndex ? null : globalIndex);
  };

  const getGlobalIndex = (categoryIndex: number, questionIndex: number) => {
    return faqs
      .slice(0, categoryIndex)
      .reduce((acc, cat) => acc + cat.questions.length, 0) + questionIndex;
  };
  
  // SEO Data
  const seo = useSEO(); // Auto-loads SEO from centralized config
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQs', path: '/faqs' },
  ];
  
  // Prepare FAQ data for structured data
  const allFaqItems = faqs.flatMap(category => 
    category.questions.map(q => ({
      question: q.question,
      answer: q.answer,
    }))
  );

  return (
    <div>
      {/* ⚠️ REMOVED bg-black - Using body background with grid pattern */}
      {/* SEO Meta Tags - Auto-loaded from centralized config */}
      <SEOHeadSSG {...seo.meta} />
      
      {/* Structured Data */}
      <StructuredData 
        schema={[
          organizationSchema,
          getWebPageSchema(seo.meta.title, seo.meta.description, '/faqs', breadcrumbs),
          getBreadcrumbSchema(breadcrumbs),
          getFAQSchema(allFaqItems),
        ]} 
      />
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} showHomeIcon={true} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 relative">
        {/* Outlined Background Text - Slides from RIGHT, stops at 25% */}
        <OutlinedText 
          text="ANSWERS" 
          className="absolute top-[20%] right-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="right"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* H1: Guidelines-compliant */}
          <h1 className="text-[30px] md:text-[36px] font-medium tracking-tight mb-8">
            {seo.h1}
          </h1>
          <p className="text-[0.9375rem] leading-relaxed text-white/60 max-w-2xl mx-auto">
            Find answers to common questions about our services and processes
          </p>
        </div>
      </section>

      {/* FAQ Categories Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <BentoGrid2 
            cards={faqs.map((category) => {
              const Icon = categoryIcons[category.category as keyof typeof categoryIcons];
              return {
                icon: Icon,
                label: category.category,
                sublabel: `${category.questions.length} Questions`,
              };
            })}
            mode="uniform"
            columns={4}
            showCTA={false}
            ariaLabel="FAQ categories"
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="QUESTIONS" 
          className="absolute top-[20%] left-0 text-[9rem] md:text-[13rem] pointer-events-none"
          direction="left"
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
          delay={0}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto relative z-10">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16">
                {/* H2: Animated gradient auto-applied */}
                <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-8">{category.category}</h2>
                <div className="space-y-4 md:space-y-6">
                  {category.questions.map((faq, questionIndex) => {
                    const globalIndex = getGlobalIndex(categoryIndex, questionIndex);
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={questionIndex}
                        className="glass rounded-xl hover:border-white/30 transition-all duration-200"
                      >
                        <button
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                        >
                          {/* P: Guidelines-compliant with font-semibold for emphasis */}
                          <span className="pr-8 text-[0.9375rem] leading-relaxed font-semibold">{faq.question}</span>
                          {isOpen ? (
                            <Minus className="flex-shrink-0 text-yellow-500" size={20} />
                          ) : (
                            <Plus className="flex-shrink-0 text-yellow-500" size={20} />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 md:px-8 pb-6 md:pb-8">
                            <p className="text-[0.9375rem] leading-relaxed text-white/60">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-6">Still Have Questions?</h2>
            <p className="text-[0.9375rem] leading-relaxed text-white/60 mb-10">
              Can't find what you're looking for? Get in touch with our team
            </p>
            <a
              href="/contact"
              className="btn-primary inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}