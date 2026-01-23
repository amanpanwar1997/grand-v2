import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, TrendingUp, Award, Megaphone, Globe, Shield, Users, BarChart3, Search, Target, Zap, Mail, MessageSquare, MessageCircle, Video, MapPin, Star, Clock, Phone, Code, Smartphone, DollarSign, ShoppingCart, Play, Lightbulb, PenTool, Rocket, Trophy, FileText, Palette, Camera, Newspaper } from 'lucide-react';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { useSEO, StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/seo-system';

export function ServiceDetailPage() {
  const { slug } = useParams();

  const getServiceContent = () => {
    const services: Record<string, any> = {
      'digital-marketing': {
        title: 'Digital Marketing Services',
        metaDescription: 'Grow your business with smart, honest & result-driven digital marketing. SEO, PPC, Social Media, Content Marketing & more.',
        
        // SECTION 1: HERO
        hero: {
          headline: 'Grow Your Business With Smart, Honest & Result-Driven Digital Marketing',
          subheadline: 'We help brands get visible, trusted, and chosen online with strategies built for long-term growth, better engagement, and meaningful results.',
          badges: ['More Visibility', 'More Trust', 'More Customers'],
          description: "If you want marketing that feels structured, smart, and sustainable — you're in the right place.",
        },

        // SECTION 2: TRUST BAR
        trustBar: [
          '100+ Brands Supported',
          'Multi-Industry Experience',
          'Transparent Reporting',
          'Strategy + Execution in One Place',
          'Customer-First Approach',
        ],

        // SECTION 3: ALL SERVICES OVERVIEW
        servicesOverview: {
          title: 'All Digital Growth Services Under One Roof',
          services: [
            {
              icon: Search,
              title: 'Visibility & SEO',
              items: ['Technical SEO', 'On-Page SEO', 'Local SEO', 'GMB Growth', 'Content SEO'],
            },
            {
              icon: Target,
              title: 'Paid Advertising',
              items: ['Google Ads', 'Meta Ads', 'YouTube Ads', 'Shopping Ads', 'Retargeting'],
            },
            {
              icon: Users,
              title: 'Social Media Growth',
              items: ['Content Planning', 'Design & Creatives', 'Reels & Video', 'Community Management'],
            },
            {
              icon: Globe,
              title: 'Website & Conversions',
              items: ['Landing Pages', 'UI/UX Optimization', 'Funnel Building', 'CRO'],
            },
            {
              icon: Zap,
              title: 'Automation & CRM',
              items: ['Email Marketing', 'WhatsApp Marketing', 'CRM Setup', 'Chat Automation'],
            },
            {
              icon: Award,
              title: 'Brand & Reputation',
              items: ['Brand Strategy', 'ORM', 'Reviews', 'Influencer Collaboration'],
            },
            {
              icon: BarChart3,
              title: 'Analytics & Insights',
              items: ['Tracking Setup', 'GA4', 'Dashboards', 'Monthly Insights'],
            },
          ],
        },

        // SECTION 4: WHY BUSINESSES NEED HELP
        whyNeedHelp: {
          title: 'Why Businesses Look for Digital Help',
          description: 'Because having a business online is not enough anymore.',
          points: [
            'Seen by the right people',
            'Trusted enough to be shortlisted',
            'Easy to choose from',
            'Worth coming back to',
          ],
          conclusion: 'That is exactly what we build with you.',
        },

        // SECTION 5: OUR APPROACH
        approach: {
          title: 'Our Approach',
          dontBelieve: [
            'Random posting',
            'One-size-fits-all plans',
            'Confusing analytics without meaning',
          ],
          believe: [
            'Understanding your business goal',
            'Making marketing simple and structured',
            'Focusing on efforts that bring outcomes',
            'Sharing progress clearly and honestly',
          ],
        },

        // SECTION 6: HOW WE SUPPORT GROWTH
        supportGrowth: {
          title: 'How We Support Your Growth',
          steps: [
            { title: 'Build Visibility', description: 'where your audience searches' },
            { title: 'Create Engagement', description: 'with meaningful content' },
            { title: 'Generate Enquiries', description: 'through smart campaigns' },
            { title: 'Improve Conversions', description: 'using data & optimization' },
            { title: 'Track & Improve', description: 'month by month' },
          ],
          tagline: 'A smooth, stress-free, impact-focused system.',
        },

        // SECTIONS 7-20: INDIVIDUAL SERVICES
        individualServices: [
          {
            title: 'SEO (Search Engine Optimization)',
            subtitle: 'Becomes your long-term source of quality traffic.',
            icon: Search,
            benefits: [
              'Cleaner website structure',
              'Better rankings for relevant searches',
              'Content aligned with customer intent',
              'Improved local and map visibility',
            ],
          },
          {
            title: 'Local SEO & Google Business',
            subtitle: 'Ideal for businesses that want customers nearby.',
            icon: MapPin,
            benefits: [
              'Strong Google Business Profile',
              'Local search visibility',
              'More calls, visits, and enquiries',
            ],
          },
          {
            title: 'Google Ads',
            subtitle: 'Designed for faster reach and filtered audience targeting.',
            icon: Target,
            benefits: [
              'Budget used efficiently',
              'Search-based customer targeting',
              'Continuous performance improvement',
            ],
          },
          {
            title: 'Meta Ads (Facebook + Instagram)',
            subtitle: 'Used to introduce, engage, and convert your audience.',
            icon: Users,
            benefits: [
              'Interest & behavior targeting',
              'Creative ad storytelling',
              'Measured outcomes, clear tracking',
            ],
          },
          {
            title: 'YouTube & Video Ads',
            subtitle: 'To build familiarity and trust through visuals.',
            icon: Video,
            benefits: [
              'Meaningful video messaging',
              'Connect with the right viewer group',
              'Strengthen brand recall',
            ],
          },
          {
            title: 'Social Media Management',
            subtitle: 'Not just posting — building ongoing engagement.',
            icon: MessageSquare,
            benefits: [
              'Monthly content planning',
              'Professional creatives',
              'Audience interaction',
              'Trend-aligned approach',
            ],
          },
          {
            title: 'Content Creation',
            subtitle: 'Content that represents your brand clearly and confidently.',
            icon: Award,
            benefits: [
              'Posts, reels, carousels, captions',
              'Brand-focused communication',
              'Designed for real engagement',
            ],
          },
          {
            title: 'Email Marketing',
            subtitle: 'To nurture, educate, and reconnect with your audience.',
            icon: Mail,
            benefits: [
              'Automated email journeys',
              'Personalized communication',
              'Higher repeat engagement',
            ],
          },
          {
            title: 'WhatsApp & SMS Marketing',
            subtitle: 'Because direct communication still works best.',
            icon: MessageSquare,
            benefits: [
              'Quick updates',
              'Offers & reminders',
              'Higher open rates',
            ],
          },
          {
            title: 'Landing Pages & Funnels',
            subtitle: 'Pages built to guide visitors toward enquiry or purchase.',
            icon: Globe,
            benefits: [
              'Clear messaging',
              'Simple user flow',
              'Action-focused layout',
            ],
          },
          {
            title: 'Conversion Optimization',
            subtitle: 'Helping more of your visitors take action.',
            icon: TrendingUp,
            benefits: [
              'Behavior tracking',
              'Page improvements',
              'A/B testing when needed',
            ],
          },
          {
            title: 'Automation & CRM',
            subtitle: 'Less manual work, more customer care.',
            icon: Zap,
            benefits: [
              'Automated follow-ups',
              'Better lead management',
              'Faster response cycles',
            ],
          },
          {
            title: 'Online Reputation',
            subtitle: 'Building trust where it matters most.',
            icon: Shield,
            benefits: [
              'Review management',
              'Positive digital presence',
              'Brand credibility support',
            ],
          },
          {
            title: 'Influencer Support',
            subtitle: 'Collaborations that feel natural and aligned.',
            icon: Users,
            benefits: [
              'Relevant creator partnerships',
              'Authentic audience reach',
              'Brand right-fit approach',
            ],
          },
          {
            title: 'Analytics & Insights',
            subtitle: 'Simple, clear, useful reporting.',
            icon: BarChart3,
            benefits: [
              'Monthly performance overview',
              'What worked & what next',
              'Insights you can understand and trust',
            ],
          },
        ],

        // SECTION 21: WHAT YOU CAN EXPECT
        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Not hype. Just realistic outcomes from consistent work:',
          outcomes: [
            'Better reach among the right audience',
            'More relevant enquiries',
            'Stronger brand trust',
            'Steady growth month on month',
            'Clear visibility into progress',
          ],
        },

        // SECTION 22: WHO THIS WORKS FOR
        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Want structured digital growth',
            'Prefer transparency',
            'Care about long-term results',
            'Want a dependable marketing partner',
          ],
        },

        // SECTION 23: CLOSING MESSAGE
        closingMessage: {
          title: "Let's Build It Right",
          message: "Digital growth is not about being loud. It's about being present, reliable, visible, and chosen.",
          tagline: 'We help you do that step by step — confidently and consistently.',
        },
      },

      // ADVERTISING SERVICE
      'advertising': {
        title: 'Advertising Services',
        metaDescription: 'Multi-channel advertising that delivers results. Google Ads, Meta Ads, LinkedIn, YouTube & more with transparent ROI tracking.',
        
        hero: {
          headline: 'Reach The Right People At The Right Time With Smart Advertising',
          subheadline: 'We help businesses generate quality leads and sales through well-planned, budget-efficient ad campaigns across Google, Meta, LinkedIn, and YouTube.',
          badges: ['Fast Results', 'Clear ROI', 'Expert Management'],
          description: "If you want ads that work, not just ads that run — you're in the right place.",
        },

        trustBar: [
          '100+ Campaigns Managed',
          'Certified Ad Specialists',
          'Multi-Platform Expertise',
          'Daily Optimization',
          'Transparent Reporting',
        ],

        servicesOverview: {
          title: 'Complete Advertising Solutions',
          services: [
            {
              icon: Search,
              title: 'Google Ads',
              items: ['Search Ads', 'Display Ads', 'Shopping Ads', 'Performance Max', 'YouTube Ads'],
            },
            {
              icon: Users,
              title: 'Meta Advertising',
              items: ['Facebook Ads', 'Instagram Ads', 'Stories & Reels', 'Messenger Ads', 'Retargeting'],
            },
            {
              icon: Target,
              title: 'LinkedIn Ads',
              items: ['Sponsored Content', 'InMail', 'Lead Gen Forms', 'B2B Targeting', 'Account-Based Marketing'],
            },
            {
              icon: Video,
              title: 'Video Advertising',
              items: ['YouTube Ads', 'TikTok Ads', 'Instagram Reels', 'Facebook Video', 'Connected TV'],
            },
            {
              icon: TrendingUp,
              title: 'Remarketing',
              items: ['Website Visitors', 'Cart Abandoners', 'Email Lists', 'Dynamic Product Ads', 'Cross-Platform'],
            },
            {
              icon: Award,
              title: 'Creative Production',
              items: ['Ad Copywriting', 'Graphic Design', 'Video Production', 'A/B Testing', 'Landing Pages'],
            },
            {
              icon: BarChart3,
              title: 'Performance Tracking',
              items: ['Conversion Setup', 'ROI Tracking', 'Attribution', 'Real-Time Dashboards', 'Monthly Reports'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Advertising Matters',
          description: 'Organic reach takes time. When you need results faster:',
          points: [
            'Target specific audiences precisely',
            'Control your budget and spending',
            'Get measurable results quickly',
            'Scale what works profitably',
          ],
          conclusion: "That's where strategic advertising becomes essential.",
        },

        approach: {
          title: 'Our Advertising Philosophy',
          dontBelieve: [
            'Set it and forget it campaigns',
            'Wasting budget on unqualified traffic',
            'Creative guesswork without testing',
          ],
          believe: [
            'Understanding your customer journey',
            'Testing, measuring, and optimizing daily',
            'Budget efficiency over vanity metrics',
            'Clear communication and honest reporting',
          ],
        },

        supportGrowth: {
          title: 'How We Run Your Campaigns',
          steps: [
            { title: 'Understand Goals', description: 'target audience & budget' },
            { title: 'Build Campaign', description: 'ad creatives & targeting setup' },
            { title: 'Launch & Monitor', description: 'track performance daily' },
            { title: 'Optimize Continuously', description: 'improve results week by week' },
            { title: 'Scale Winners', description: 'grow what works profitably' },
          ],
          tagline: 'Professional advertising management that respects your budget.',
        },

        individualServices: [
          {
            title: 'Google Search Ads',
            subtitle: 'Capture high-intent customers searching for your solutions.',
            icon: Search,
            benefits: [
              'Target specific search terms',
              'Appear above organic results',
              'Pay only for clicks',
              'Track every conversion',
            ],
          },
          {
            title: 'Google Shopping Ads',
            subtitle: 'For e-commerce businesses selling products online.',
            icon: Target,
            benefits: [
              'Product images in search results',
              'Price and availability shown',
              'Higher conversion rates',
              'Automated inventory sync',
            ],
          },
          {
            title: 'Display Advertising',
            subtitle: 'Build awareness across millions of websites.',
            icon: Globe,
            benefits: [
              'Visual banner ads',
              'Audience targeting',
              'Remarketing to visitors',
              'Cost-effective reach',
            ],
          },
          {
            title: 'Facebook & Instagram Ads',
            subtitle: 'Engage users where they spend most of their time.',
            icon: Users,
            benefits: [
              'Detailed audience targeting',
              'Visual storytelling',
              'Stories and Reels ads',
              'Engagement and conversions',
            ],
          },
          {
            title: 'LinkedIn Advertising',
            subtitle: 'Perfect for B2B companies targeting professionals.',
            icon: Target,
            benefits: [
              'Job title targeting',
              'Company and industry filters',
              'Lead gen forms',
              'Professional audience',
            ],
          },
          {
            title: 'YouTube Advertising',
            subtitle: 'Reach engaged viewers with video storytelling.',
            icon: Video,
            benefits: [
              'In-stream video ads',
              'Bumper ads (6 seconds)',
              'Discovery ads',
              'Detailed demographics',
            ],
          },
          {
            title: 'Remarketing Campaigns',
            subtitle: 'Reconnect with people who already know you.',
            icon: TrendingUp,
            benefits: [
              'Website visitors retargeting',
              'Cart abandonment recovery',
              'Email list targeting',
              'Higher conversion rates',
            ],
          },
          {
            title: 'Ad Creative Production',
            subtitle: 'Professional creatives that stop scrolling.',
            icon: Award,
            benefits: [
              'Compelling copywriting',
              'Eye-catching designs',
              'Video production',
              'A/B testing',
            ],
          },
          {
            title: 'Conversion Tracking',
            subtitle: "Know exactly what's working.",
            icon: BarChart3,
            benefits: [
              'Pixel installation',
              'Event tracking',
              'ROI measurement',
              'Attribution modeling',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Realistic outcomes from professional ad management:',
          outcomes: [
            'Qualified leads within first few weeks',
            'Clear understanding of cost per acquisition',
            'Weekly performance updates',
            'Continuous optimization for better results',
            'Transparent ROI tracking',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Need results faster than organic growth',
            'Have a clear product or service offer',
            'Want measurable, trackable outcomes',
            'Are ready to invest in growth',
          ],
        },

        closingMessage: {
          title: "Let's Make Your Ad Budget Work Harder",
          message: "Good advertising isn't about spending more. It's about spending smarter.",
          tagline: 'We help you reach the right people, with the right message, at the right cost.',
        },
      },

      // BRANDING SERVICE
      'branding-identity': {
        title: 'Branding & Identity Services',
        metaDescription: 'Build a brand that stands out and stays remembered. Logo design, brand strategy, visual identity & complete brand guidelines.',
        
        hero: {
          headline: 'Build A Brand That Feels Right, Looks Professional & Stays Remembered',
          subheadline: 'We help businesses create clear, consistent, and professional brand identities that build trust and recognition in their market.',
          badges: ['Strategic Positioning', 'Visual Identity', 'Brand Guidelines'],
          description: "If you want a brand that represents you properly — you're in the right place.",
        },

        trustBar: [
          '100+ Brands Created',
          '7+ Years Experience',
          'Full Ownership of Assets',
          'Trademark Support',
          'Revision-Friendly Process',
        ],

        servicesOverview: {
          title: 'Complete Branding Solutions',
          services: [
            {
              icon: Award,
              title: 'Brand Strategy',
              items: ['Market Research', 'Positioning', 'Target Audience', 'Competitor Analysis', 'Value Proposition'],
            },
            {
              icon: Target,
              title: 'Logo Design',
              items: ['Multiple Concepts', 'Vector Files', 'Color Variations', 'Icon & Wordmark', 'All Formats'],
            },
            {
              icon: Users,
              title: 'Visual Identity',
              items: ['Color Palette', 'Typography', 'Design Elements', 'Patterns', 'Photography Style'],
            },
            {
              icon: Shield,
              title: 'Brand Guidelines',
              items: ['Usage Rules', 'Do\'s & Don\'ts', 'Color Codes', 'Typography System', 'Application Examples'],
            },
            {
              icon: Globe,
              title: 'Brand Collateral',
              items: ['Business Cards', 'Letterheads', 'Email Signatures', 'Presentations', 'Marketing Materials'],
            },
            {
              icon: MessageSquare,
              title: 'Brand Voice',
              items: ['Tone of Voice', 'Messaging', 'Taglines', 'Brand Story', 'Communication Guidelines'],
            },
            {
              icon: Zap,
              title: 'Brand Launch',
              items: ['Go-to-Market', 'Internal Rollout', 'Training', 'Asset Delivery', 'Ongoing Support'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Branding Matters',
          description: 'Your brand is how people remember and choose you.',
          points: [
            'Stand out in crowded markets',
            'Build instant credibility',
            'Command better pricing',
            'Create lasting customer loyalty',
          ],
          conclusion: 'A strong brand is your most valuable long-term asset.',
        },

        approach: {
          title: 'Our Branding Process',
          dontBelieve: [
            'Logo design without strategy',
            'Generic templates and shortcuts',
            'Ignoring your business goals',
          ],
          believe: [
            'Strategy before design',
            'Understanding your market deeply',
            'Creating something timeless, not trendy',
            'Full transparency and collaboration',
          ],
        },

        supportGrowth: {
          title: 'How We Build Your Brand',
          steps: [
            { title: 'Discovery', description: 'understand your business & vision' },
            { title: 'Strategy', description: 'positioning & differentiation' },
            { title: 'Design', description: 'visual identity creation' },
            { title: 'Refinement', description: 'feedback & perfection' },
            { title: 'Delivery', description: 'assets & guidelines' },
          ],
          tagline: 'A thoughtful, collaborative process from start to finish.',
        },

        individualServices: [
          {
            title: 'Brand Strategy & Positioning',
            subtitle: 'The foundation of everything else.',
            icon: Target,
            benefits: [
              'Market research & analysis',
              'Target audience definition',
              'Competitive positioning',
              'Unique value proposition',
            ],
          },
          {
            title: 'Logo Design',
            subtitle: 'Your visual identity cornerstone.',
            icon: Award,
            benefits: [
              'Multiple design concepts',
              'Unlimited revisions',
              'Vector source files',
              'All format variations',
            ],
          },
          {
            title: 'Visual Identity System',
            subtitle: 'Complete design language for consistency.',
            icon: Users,
            benefits: [
              'Color palette system',
              'Typography hierarchy',
              'Design elements & patterns',
              'Application examples',
            ],
          },
          {
            title: 'Brand Guidelines',
            subtitle: 'Your brand rulebook for consistency.',
            icon: Shield,
            benefits: [
              'Comprehensive documentation',
              'Usage rules & examples',
              'Do\'s and don\'ts',
              'Team training support',
            ],
          },
          {
            title: 'Business Collateral',
            subtitle: 'Professional materials that represent you well.',
            icon: Globe,
            benefits: [
              'Business card design',
              'Letterhead templates',
              'Email signature',
              'Presentation templates',
            ],
          },
          {
            title: 'Brand Voice & Messaging',
            subtitle: 'How you communicate matters.',
            icon: MessageSquare,
            benefits: [
              'Tone of voice definition',
              'Key messaging pillars',
              'Tagline development',
              'Brand story crafting',
            ],
          },
          {
            title: 'Social Media Branding',
            subtitle: 'Consistent presence across platforms.',
            icon: Users,
            benefits: [
              'Profile images',
              'Cover designs',
              'Story templates',
              'Post templates',
            ],
          },
          {
            title: 'Packaging Design',
            subtitle: 'For product-based businesses.',
            icon: Target,
            benefits: [
              'Product packaging',
              'Label design',
              'Box and bottle design',
              'Print-ready files',
            ],
          },
          {
            title: 'Rebranding Services',
            subtitle: "When it's time to evolve your brand.",
            icon: TrendingUp,
            benefits: [
              'Brand audit',
              'Transition strategy',
              'Asset recreation',
              'Migration support',
            ],
          },
          {
            title: 'Trademark Support',
            subtitle: 'Protect your brand legally.',
            icon: Shield,
            benefits: [
              'Trademark search',
              'Filing assistance',
              'Legal documentation',
              'Registration guidance',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Realistic outcomes from professional branding:',
          outcomes: [
            'A brand that feels authentic to your business',
            'Professional identity that builds instant credibility',
            'Clear guidelines for consistent application',
            'All source files and full ownership',
            'Support during implementation',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Want to stand out professionally',
            'Value long-term brand equity',
            'Need clarity and consistency',
            'Are ready to invest in their image',
          ],
        },

        closingMessage: {
          title: "Let's Build Your Brand Right",
          message: "Your brand is more than a logo. It's how people feel about your business.",
          tagline: 'We help you create that feeling — clearly, professionally, and memorably.',
        },
      },

      // WEBSITE DEVELOPMENT SERVICE
      'web-design-development': {
        title: 'Website & App Development',
        metaDescription: 'Fast, secure, conversion-focused websites that work perfectly on all devices. Custom development, e-commerce, apps & more.',
        
        hero: {
          headline: 'Websites That Load Fast, Look Great & Actually Help Your Business Grow',
          subheadline: 'We build professional, mobile-friendly websites designed to convert visitors into customers — with speed, security, and ongoing support.',
          badges: ['Fast Loading', 'Mobile-First', 'Conversion-Focused'],
          description: "If you want a website that works as hard as you do — you're in the right place.",
        },

        trustBar: [
          '60+ Websites Built',
          '<2s Load Time',
          'Mobile-Optimized',
          '12 Months Support',
          'Full Code Ownership',
        ],

        servicesOverview: {
          title: 'Complete Web Development Solutions',
          services: [
            {
              icon: Globe,
              title: 'Business Websites',
              items: ['Corporate Sites', 'Service Websites', 'Portfolio Sites', 'Landing Pages', 'Multi-Page Sites'],
            },
            {
              icon: Target,
              title: 'E-commerce Stores',
              items: ['Shopify', 'WooCommerce', 'Product Catalogs', 'Payment Integration', 'Inventory Management'],
            },
            {
              icon: Users,
              title: 'UI/UX Design',
              items: ['Wireframing', 'Visual Design', 'User Research', 'Prototyping', 'Usability Testing'],
            },
            {
              icon: Zap,
              title: 'Speed & Performance',
              items: ['Image Optimization', 'Code Minification', 'CDN Setup', 'Caching', 'Core Web Vitals'],
            },
            {
              icon: Search,
              title: 'SEO-Optimized',
              items: ['Clean Code', 'Schema Markup', 'Meta Tags', 'XML Sitemaps', 'Technical SEO'],
            },
            {
              icon: Shield,
              title: 'Security & Hosting',
              items: ['SSL Certificate', 'Firewall', 'Regular Backups', 'Malware Protection', 'Hosting Setup'],
            },
            {
              icon: MessageSquare,
              title: 'Support & Maintenance',
              items: ['12 Months Free', 'Updates', 'Bug Fixes', 'Content Changes', 'Technical Support'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Your Website Matters',
          description: 'Your website is often the first impression of your business.',
          points: [
            'Fast loading builds trust',
            'Mobile-friendly reaches everyone',
            'Clear design guides actions',
            'SEO-optimized attracts visitors',
          ],
          conclusion: 'A professional website is an investment that pays back consistently.',
        },

        approach: {
          title: 'Our Development Philosophy',
          dontBelieve: [
            'Slow, bloated websites',
            'Mobile-unfriendly designs',
            'Vendor lock-in with proprietary code',
          ],
          believe: [
            'Speed and performance first',
            'Mobile-first responsive design',
            'Clean code you fully own',
            'Ongoing support and training',
          ],
        },

        supportGrowth: {
          title: 'How We Build Your Website',
          steps: [
            { title: 'Planning', description: 'goals, features & structure' },
            { title: 'Design', description: 'wireframes & visual mockups' },
            { title: 'Development', description: 'coding & functionality' },
            { title: 'Testing', description: 'quality assurance & fixes' },
            { title: 'Launch & Support', description: 'deployment & training' },
          ],
          tagline: 'A transparent, collaborative process with clear milestones.',
        },

        individualServices: [
          {
            title: 'Custom Website Design',
            subtitle: 'Tailored to your brand and business goals.',
            icon: Globe,
            benefits: [
              'Unique design, not templates',
              'Brand-aligned visuals',
              'Conversion-focused layouts',
              'Professional appearance',
            ],
          },
          {
            title: 'E-commerce Development',
            subtitle: 'Sell products online seamlessly.',
            icon: Target,
            benefits: [
              'Product catalog management',
              'Shopping cart & checkout',
              'Payment gateway integration',
              'Inventory management',
            ],
          },
          {
            title: 'Mobile App Development',
            subtitle: 'Native and cross-platform apps.',
            icon: Users,
            benefits: [
              'iOS & Android apps',
              'React Native / Flutter',
              'App store submission',
              'Push notifications',
            ],
          },
          {
            title: 'Speed Optimization',
            subtitle: 'Fast loading for better user experience.',
            icon: Zap,
            benefits: [
              'Image compression',
              'Code optimization',
              'CDN implementation',
              '90+ PageSpeed scores',
            ],
          },
          {
            title: 'SEO-Optimized Development',
            subtitle: 'Built to rank on search engines.',
            icon: Search,
            benefits: [
              'Clean semantic code',
              'Schema markup',
              'Meta tags setup',
              'XML sitemaps',
            ],
          },
          {
            title: 'WordPress Development',
            subtitle: 'Easy-to-manage CMS websites.',
            icon: Globe,
            benefits: [
              'Custom themes',
              'Plugin integration',
              'WooCommerce setup',
              'Training included',
            ],
          },
          {
            title: 'Landing Page Design',
            subtitle: 'High-converting single-page sites.',
            icon: Target,
            benefits: [
              'Clear messaging',
              'Strong call-to-action',
              'Lead capture forms',
              'A/B testing ready',
            ],
          },
          {
            title: 'Website Security',
            subtitle: 'Protect your site and customer data.',
            icon: Shield,
            benefits: [
              'SSL certificate',
              'Firewall setup',
              'Regular backups',
              'Security monitoring',
            ],
          },
          {
            title: 'Payment Integration',
            subtitle: 'Accept payments securely online.',
            icon: Target,
            benefits: [
              'Stripe, Razorpay, PayPal',
              'UPI integration',
              'Secure checkout',
              'PCI compliance',
            ],
          },
          {
            title: 'Website Maintenance',
            subtitle: 'Keep your site running smoothly.',
            icon: Shield,
            benefits: [
              '12 months free support',
              'Regular updates',
              'Bug fixes',
              'Content changes',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Realistic outcomes from professional development:',
          outcomes: [
            'Fast-loading, mobile-friendly website',
            'Clear, conversion-focused design',
            'Full ownership of code and assets',
            '12 months of free support',
            'Training to manage your site',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Need a professional online presence',
            'Want to convert visitors into customers',
            'Value speed and mobile experience',
            'Want ongoing support and updates',
          ],
        },

        closingMessage: {
          title: "Let's Build Your Digital Home",
          message: "A great website isn't just about looking good. It's about working well and growing your business.",
          tagline: 'We build websites that do both — professionally and reliably.',
        },
      },

      // SOFTWARE DEVELOPMENT SERVICE
      'software-development': {
        title: 'Software Development Services',
        metaDescription: 'Custom software solutions, SaaS platforms, CRM systems & enterprise applications. Built with modern tech, scalable architecture & long-term support.',
        
        hero: {
          headline: 'Build Smart Software That Scales With Your Business',
          subheadline: 'We create custom software solutions that solve real problems, improve efficiency, and support your growth with clean code, modern technology, and reliable ongoing support.',
          badges: ['Custom Solutions', 'Scalable Architecture', 'Full Ownership'],
          description: "If you need software built right the first time with technology that lasts — you're in the right place.",
        },

        trustBar: [
          '140+ Software Projects Built',
          'Modern Tech Stack',
          'Clean Code You Own',
          'Ongoing Support & Updates',
          'Scalability Built-In',
        ],

        servicesOverview: {
          title: 'Complete Software Development Solutions',
          services: [
            {
              icon: Code,
              title: 'Custom Software',
              items: ['Business Applications', 'CRM Systems', 'ERP Solutions', 'Workflow Automation', 'Internal Tools'],
            },
            {
              icon: Globe,
              title: 'SaaS Platforms',
              items: ['Multi-Tenant Architecture', 'Subscription Management', 'API Development', 'Dashboard & Analytics'],
            },
            {
              icon: Smartphone,
              title: 'Mobile Apps',
              items: ['iOS & Android', 'React Native', 'Flutter Development', 'Cross-Platform Solutions'],
            },
            {
              icon: Target,
              title: 'Web Applications',
              items: ['Progressive Web Apps', 'Admin Dashboards', 'Customer Portals', 'Real-Time Apps'],
            },
            {
              icon: Zap,
              title: 'Integrations & APIs',
              items: ['Third-Party Integration', 'Custom API Development', 'Webhook Systems', 'Data Sync'],
            },
            {
              icon: Shield,
              title: 'Enterprise Solutions',
              items: ['Legacy System Migration', 'System Architecture', 'Cloud Infrastructure', 'Security Hardening'],
            },
            {
              icon: BarChart3,
              title: 'Support & Maintenance',
              items: ['Bug Fixes', 'Feature Updates', 'Performance Monitoring', 'Technical Support'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Businesses Need Custom Software',
          description: 'Off-the-shelf solutions don\'t always fit. You need software that:',
          points: [
            'Solves your unique business challenges',
            'Grows with your business needs',
            'Integrates with your existing systems',
            'Gives you full control and ownership',
          ],
          conclusion: 'That\'s exactly what custom software development delivers.',
        },

        approach: {
          title: 'Our Development Philosophy',
          dontBelieve: [
            'Quick hacks and shortcuts',
            'Outdated technology stacks',
            'Vendor lock-in proprietary systems',
          ],
          believe: [
            'Clean, maintainable code',
            'Modern, proven technology',
            'Full documentation and ownership',
            'Long-term support and collaboration',
          ],
        },

        supportGrowth: {
          title: 'How We Build Your Software',
          steps: [
            { title: 'Discovery', description: 'understand your goals & requirements' },
            { title: 'Planning', description: 'architecture & tech stack selection' },
            { title: 'Development', description: 'agile sprints & continuous delivery' },
            { title: 'Testing', description: 'quality assurance & bug fixes' },
            { title: 'Launch & Support', description: 'deployment & ongoing maintenance' },
          ],
          tagline: 'A transparent, collaborative development process with clear milestones.',
        },

        individualServices: [
          {
            title: 'Custom Business Software',
            subtitle: 'Solutions tailored to your exact needs.',
            icon: Code,
            benefits: [
              'Process automation',
              'Custom workflows',
              'Business logic implementation',
              'User role management',
            ],
          },
          {
            title: 'SaaS Platform Development',
            subtitle: 'Build scalable subscription-based products.',
            icon: Globe,
            benefits: [
              'Multi-tenant architecture',
              'Subscription billing',
              'User management',
              'API & webhook support',
            ],
          },
          {
            title: 'CRM & ERP Systems',
            subtitle: 'Manage customers, operations, and data.',
            icon: Target,
            benefits: [
              'Customer relationship management',
              'Sales pipeline tracking',
              'Inventory management',
              'Reporting & analytics',
            ],
          },
          {
            title: 'API Development',
            subtitle: 'Connect systems and enable integrations.',
            icon: Zap,
            benefits: [
              'RESTful & GraphQL APIs',
              'API documentation',
              'Authentication & security',
              'Rate limiting & monitoring',
            ],
          },
          {
            title: 'Mobile App Development',
            subtitle: 'Native and cross-platform mobile solutions.',
            icon: Smartphone,
            benefits: [
              'iOS & Android apps',
              'React Native / Flutter',
              'Push notifications',
              'Offline functionality',
            ],
          },
          {
            title: 'Progressive Web Apps',
            subtitle: 'Web apps that work like native apps.',
            icon: Globe,
            benefits: [
              'Offline capability',
              'Push notifications',
              'App-like experience',
              'Cross-platform compatibility',
            ],
          },
          {
            title: 'Cloud Infrastructure',
            subtitle: 'Scalable, secure cloud deployment.',
            icon: Shield,
            benefits: [
              'AWS / Azure / Google Cloud',
              'Auto-scaling',
              'Load balancing',
              'Disaster recovery',
            ],
          },
          {
            title: 'Database Design',
            subtitle: 'Efficient data architecture.',
            icon: BarChart3,
            benefits: [
              'Schema design',
              'Query optimization',
              'Data migration',
              'Backup strategies',
            ],
          },
          {
            title: 'Third-Party Integrations',
            subtitle: 'Connect with existing tools and services.',
            icon: Zap,
            benefits: [
              'Payment gateways',
              'Email services',
              'Analytics tools',
              'CRM integrations',
            ],
          },
          {
            title: 'Legacy System Migration',
            subtitle: 'Modernize outdated software.',
            icon: Code,
            benefits: [
              'Technology stack upgrade',
              'Data migration',
              'Feature preservation',
              'Minimal downtime',
            ],
          },
          {
            title: 'Automation & Workflows',
            subtitle: 'Reduce manual work with automation.',
            icon: Zap,
            benefits: [
              'Process automation',
              'Scheduled tasks',
              'Email automation',
              'Data synchronization',
            ],
          },
          {
            title: 'Security & Compliance',
            subtitle: 'Protect data and meet regulations.',
            icon: Shield,
            benefits: [
              'Security audits',
              'GDPR compliance',
              'Encryption',
              'Access control',
            ],
          },
          {
            title: 'Performance Optimization',
            subtitle: 'Fast, efficient software.',
            icon: TrendingUp,
            benefits: [
              'Code optimization',
              'Database tuning',
              'Caching strategies',
              'Load time reduction',
            ],
          },
          {
            title: 'Ongoing Support & Maintenance',
            subtitle: 'Keep your software running smoothly.',
            icon: Award,
            benefits: [
              'Bug fixes',
              'Feature updates',
              'Performance monitoring',
              'Technical support',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Realistic outcomes from professional software development:',
          outcomes: [
            'Software that actually solves your problems',
            'Clean code you fully own',
            'Scalable architecture for future growth',
            'Ongoing support and updates',
            'Clear communication throughout',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Need custom solutions, not one-size-fits-all',
            'Want software they can scale and control',
            'Value quality code and modern technology',
            'Need a long-term development partner',
          ],
        },

        closingMessage: {
          title: "Let's Build Software That Works",
          message: "Great software isn't about complexity. It's about solving problems efficiently and reliably.",
          tagline: 'We build software that does exactly that — with clarity and confidence.',
        },
      },

      // GRAPHIC DESIGN & CREATIVE SERVICE
      'graphic-design': {
        title: 'Graphic Design & Creative Services',
        metaDescription: 'Professional graphic design for social media, marketing materials, packaging, branding & more. Creative that stands out and communicates clearly.',
        
        hero: {
          headline: 'Create Visual Content That Captures Attention & Communicates Clearly',
          subheadline: 'We design graphics, animations, and visual content that help your brand look professional, stand out in feeds, and connect with your audience effectively.',
          badges: ['Professional Designs', 'Fast Turnaround', 'Unlimited Revisions'],
          description: "If you need design work that looks great and actually works for your business — you're in the right place.",
        },

        trustBar: [
          '12,000+ Designs Created',
          'Professional Design Team',
          'All File Formats Provided',
          'Brand Consistency Maintained',
          'Quick Revisions',
        ],

        servicesOverview: {
          title: 'Complete Graphic Design Solutions',
          services: [
            {
              icon: Palette,
              title: 'Social Media Graphics',
              items: ['Posts & Carousels', 'Stories & Reels', 'Cover Images', 'Ad Creatives', 'Templates'],
            },
            {
              icon: Award,
              title: 'Brand Identity',
              items: ['Logo Design', 'Business Cards', 'Letterheads', 'Brand Guidelines', 'Stationery'],
            },
            {
              icon: Globe,
              title: 'Marketing Materials',
              items: ['Brochures', 'Flyers', 'Posters', 'Banners', 'Presentations'],
            },
            {
              icon: Video,
              title: 'Motion Graphics',
              items: ['Animated Videos', 'Logo Animation', 'Social Animations', 'Explainer Videos'],
            },
            {
              icon: Target,
              title: 'Packaging Design',
              items: ['Product Packaging', 'Label Design', 'Box Design', '3D Mockups'],
            },
            {
              icon: Users,
              title: 'Digital Assets',
              items: ['Infographics', 'Ebook Covers', 'Email Templates', 'Web Graphics'],
            },
            {
              icon: MessageSquare,
              title: 'Print Design',
              items: ['Magazine Ads', 'Newspaper Ads', 'Billboards', 'Trade Show Materials'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Professional Design Matters',
          description: 'Your visuals are often the first impression. You need design that:',
          points: [
            'Stops the scroll and grabs attention',
            'Communicates your message clearly',
            'Maintains brand consistency',
            'Looks professional across all platforms',
          ],
          conclusion: 'Good design isn\'t just about aesthetics — it\'s about effectiveness.',
        },

        approach: {
          title: 'Our Design Process',
          dontBelieve: [
            'Generic templates and stock graphics',
            'One design fits all',
            'No revisions or feedback loops',
          ],
          believe: [
            'Custom design for each project',
            'Understanding your brand and audience',
            'Unlimited revisions until you\'re happy',
            'Fast turnaround without compromising quality',
          ],
        },

        supportGrowth: {
          title: 'How We Create Your Designs',
          steps: [
            { title: 'Brief', description: 'understand your requirements & style' },
            { title: 'Concept', description: 'initial design concepts' },
            { title: 'Refinement', description: 'revisions & improvements' },
            { title: 'Finalization', description: 'final polishing & approval' },
            { title: 'Delivery', description: 'all formats & source files' },
          ],
          tagline: 'A smooth, collaborative design process with unlimited revisions.',
        },

        individualServices: [
          {
            title: 'Social Media Graphics',
            subtitle: 'Stand out in crowded feeds.',
            icon: Users,
            benefits: [
              'Platform-optimized sizes',
              'On-brand visuals',
              'High engagement potential',
              'Fast turnaround',
            ],
          },
          {
            title: 'Logo Design',
            subtitle: 'Your brand\'s visual cornerstone.',
            icon: Award,
            benefits: [
              'Multiple concepts',
              'Unlimited revisions',
              'Vector source files',
              'All format variations',
            ],
          },
          {
            title: 'Marketing Collateral',
            subtitle: 'Professional printed materials.',
            icon: Globe,
            benefits: [
              'Brochures & flyers',
              'Posters & banners',
              'Print-ready files',
              'High-resolution output',
            ],
          },
          {
            title: 'Packaging Design',
            subtitle: 'Make your product shelf-ready.',
            icon: Target,
            benefits: [
              'Eye-catching designs',
              'Print specifications',
              '3D mockups',
              'Label design',
            ],
          },
          {
            title: 'Motion Graphics',
            subtitle: 'Bring your brand to life.',
            icon: Video,
            benefits: [
              'Animated logos',
              'Social media animations',
              'Explainer videos',
              'Ad animations',
            ],
          },
          {
            title: 'Infographics',
            subtitle: 'Visualize data and complex ideas.',
            icon: BarChart3,
            benefits: [
              'Data visualization',
              'Information hierarchy',
              'Shareable formats',
              'Print & digital versions',
            ],
          },
          {
            title: 'Presentation Design',
            subtitle: 'Professional pitch decks and slides.',
            icon: Globe,
            benefits: [
              'Custom templates',
              'Data visualization',
              'Brand consistency',
              'Editable source files',
            ],
          },
          {
            title: 'Email Templates',
            subtitle: 'Branded email communications.',
            icon: Mail,
            benefits: [
              'Responsive design',
              'Email client compatibility',
              'Brand guidelines',
              'Easy editing',
            ],
          },
          {
            title: 'Business Stationery',
            subtitle: 'Professional brand materials.',
            icon: Award,
            benefits: [
              'Business cards',
              'Letterheads',
              'Envelopes',
              'Print specifications',
            ],
          },
          {
            title: 'Billboard & OOH Design',
            subtitle: 'Large-format outdoor advertising.',
            icon: Megaphone,
            benefits: [
              'High-impact visuals',
              'Readability from distance',
              'Print specifications',
              'Multiple size adaptations',
            ],
          },
          {
            title: 'Product Photography Editing',
            subtitle: 'Perfect your product images.',
            icon: Camera,
            benefits: [
              'Background removal',
              'Color correction',
              'Retouching',
              'Shadow creation',
            ],
          },
          {
            title: 'Ebook & Report Design',
            subtitle: 'Professional document layout.',
            icon: FileText,
            benefits: [
              'Cover design',
              'Interior layout',
              'Typography',
              'Print & digital versions',
            ],
          },
          {
            title: 'Icon & Illustration',
            subtitle: 'Custom graphics for any need.',
            icon: PenTool,
            benefits: [
              'Custom icons',
              'Illustrations',
              'Vector graphics',
              'Brand alignment',
            ],
          },
          {
            title: 'Brand Asset Library',
            subtitle: 'Organized design resources.',
            icon: Award,
            benefits: [
              'Template library',
              'Asset organization',
              'Brand guidelines',
              'Easy team access',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from professional design:',
          outcomes: [
            'Designs that grab attention and communicate clearly',
            'Consistent brand representation across all materials',
            'Fast turnaround with unlimited revisions',
            'All source files and formats you need',
            'Designs that work across print and digital',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Need consistent, professional design work',
            'Want to stand out in crowded markets',
            'Value both aesthetics and effectiveness',
            'Need a reliable design partner',
          ],
        },

        closingMessage: {
          title: "Let's Create Something Great",
          message: "Good design isn't just about making things pretty. It's about making things work better for your business.",
          tagline: 'We create designs that do both — beautifully and effectively.',
        },
      },

      // MEDIA PRODUCTION SERVICE
      'video-media-production': {
        title: 'Media Production Services',
        metaDescription: 'Professional video production, commercial photography, drone cinematography & post-production. Cinematic quality for brands and businesses.',
        
        hero: {
          headline: 'Create Compelling Visual Stories That Connect & Convert',
          subheadline: 'We produce professional videos, photography, and visual content that help your brand tell its story, build trust, and engage your audience across all platforms.',
          badges: ['Cinematic Quality', 'Full Production', 'Fast Delivery'],
          description: "If you need visual content that looks professional and delivers results — you're in the right place.",
        },

        trustBar: [
          '195+ Production Projects',
          'Professional Equipment',
          'Complete Post-Production',
          'Commercial & Product Expertise',
          'Drone Cinematography',
        ],

        servicesOverview: {
          title: 'Complete Media Production Solutions',
          services: [
            {
              icon: Video,
              title: 'Video Production',
              items: ['Brand Videos', 'Product Videos', 'Corporate Films', 'Testimonials', 'Explainer Videos'],
            },
            {
              icon: Camera,
              title: 'Commercial Photography',
              items: ['Product Photography', 'Corporate Headshots', 'Event Coverage', 'Food Photography'],
            },
            {
              icon: Play,
              title: 'Social Media Content',
              items: ['Reels & Shorts', 'Stories', 'Behind-the-Scenes', 'User-Generated Style'],
            },
            {
              icon: Target,
              title: 'Drone Cinematography',
              items: ['Aerial Videos', 'Real Estate Tours', 'Event Coverage', 'Cinematic B-Roll'],
            },
            {
              icon: Users,
              title: 'Event Coverage',
              items: ['Corporate Events', 'Product Launches', 'Conferences', 'Live Streaming'],
            },
            {
              icon: Video,
              title: 'Post-Production',
              items: ['Video Editing', 'Color Grading', 'Motion Graphics', 'Sound Design'],
            },
            {
              icon: Globe,
              title: 'Animation & VFX',
              items: ['2D/3D Animation', 'Visual Effects', 'Title Sequences', 'Logo Animation'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Professional Media Production Matters',
          description: 'Visual content is the most engaging format. You need production that:',
          points: [
            'Captures attention in the first 3 seconds',
            'Tells your story clearly and emotionally',
            'Looks professional and builds credibility',
            'Works across all platforms and devices',
          ],
          conclusion: 'Professional production makes the difference between scrolling past and stopping to watch.',
        },

        approach: {
          title: 'Our Production Process',
          dontBelieve: [
            'Amateur-looking smartphone videos',
            'No planning or creative direction',
            'Poor sound and lighting',
          ],
          believe: [
            'Professional equipment and crew',
            'Pre-production planning and storyboarding',
            'Cinematic lighting and sound',
            'Complete post-production polish',
          ],
        },

        supportGrowth: {
          title: 'How We Produce Your Content',
          steps: [
            { title: 'Concept', description: 'creative direction & planning' },
            { title: 'Pre-Production', description: 'storyboarding & logistics' },
            { title: 'Production', description: 'filming & photography' },
            { title: 'Post-Production', description: 'editing, color, sound' },
            { title: 'Delivery', description: 'final files & formats' },
          ],
          tagline: 'A professional production process from concept to final delivery.',
        },

        individualServices: [
          {
            title: 'Brand & Corporate Videos',
            subtitle: 'Tell your brand story professionally.',
            icon: Video,
            benefits: [
              'Professional storytelling',
              'Cinematic quality',
              'Multiple platform formats',
              'Full script & direction',
            ],
          },
          {
            title: 'Product Videos',
            subtitle: 'Showcase products in action.',
            icon: Target,
            benefits: [
              'Feature demonstrations',
              'Lifestyle context',
              'E-commerce ready',
              'Multiple angles & shots',
            ],
          },
          {
            title: 'Social Media Reels & Shorts',
            subtitle: 'Quick, engaging vertical content.',
            icon: Smartphone,
            benefits: [
              'Vertical format optimization',
              'Hook within 3 seconds',
              'Platform-specific editing',
              'Trend-aware production',
            ],
          },
          {
            title: 'Testimonial & Interview Videos',
            subtitle: 'Build trust with real stories.',
            icon: Users,
            benefits: [
              'Professional interviewing',
              'Clear sound quality',
              'Natural lighting',
              'Authentic storytelling',
            ],
          },
          {
            title: 'Explainer & Tutorial Videos',
            subtitle: 'Educate and inform your audience.',
            icon: Lightbulb,
            benefits: [
              'Clear step-by-step visuals',
              'Voiceover or subtitles',
              'Screen recordings',
              'Animation integration',
            ],
          },
          {
            title: 'Drone Cinematography',
            subtitle: 'Stunning aerial perspectives.',
            icon: Play,
            benefits: [
              'Licensed drone operators',
              '4K aerial footage',
              'Real estate showcases',
              'Cinematic establishing shots',
            ],
          },
          {
            title: 'Event Coverage',
            subtitle: 'Capture your important moments.',
            icon: Camera,
            benefits: [
              'Multi-camera setup',
              'Live streaming options',
              'Highlight reels',
              'Full event documentation',
            ],
          },
          {
            title: 'Commercial Photography',
            subtitle: 'Professional images that sell.',
            icon: Camera,
            benefits: [
              'Product photography',
              'Lifestyle shots',
              'Studio & on-location',
              'High-resolution delivery',
            ],
          },
          {
            title: 'Food & Beverage Photography',
            subtitle: 'Make your food look irresistible.',
            icon: Target,
            benefits: [
              'Styled food photography',
              'Menu photography',
              'Flat lay & close-ups',
              'Social media ready',
            ],
          },
          {
            title: 'Corporate Headshots',
            subtitle: 'Professional team photography.',
            icon: Users,
            benefits: [
              'Consistent style',
              'Professional retouching',
              'Multiple backgrounds',
              'Fast turnaround',
            ],
          },
          {
            title: 'Video Editing & Post-Production',
            subtitle: 'Polish your existing footage.',
            icon: Video,
            benefits: [
              'Professional editing',
              'Color grading',
              'Sound design',
              'Motion graphics',
            ],
          },
          {
            title: 'Animation & Motion Graphics',
            subtitle: 'Bring concepts to life.',
            icon: Video,
            benefits: [
              '2D/3D animation',
              'Logo animations',
              'Explainer animations',
              'Title sequences',
            ],
          },
          {
            title: 'Live Streaming',
            subtitle: 'Broadcast events in real-time.',
            icon: Play,
            benefits: [
              'Multi-platform streaming',
              'Professional setup',
              'Chat moderation',
              'Recording provided',
            ],
          },
          {
            title: 'Content Packages',
            subtitle: 'Ongoing content creation.',
            icon: Award,
            benefits: [
              'Monthly content shoots',
              'Consistent quality',
              'Multiple formats',
              'Social media optimized',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from professional production:',
          outcomes: [
            'Cinematic quality that builds credibility',
            'Content optimized for each platform',
            'Fast turnaround with professional results',
            'All source files and multiple formats',
            'Content that actually engages and converts',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Want professional visual content',
            'Need consistent brand storytelling',
            'Value quality and attention to detail',
            'Want content that actually performs',
          ],
        },

        closingMessage: {
          title: "Let's Create Visual Stories",
          message: "Great video isn't just about cameras and equipment. It's about telling stories that resonate and drive action.",
          tagline: 'We create visual content that does both — professionally and effectively.',
        },
      },

      // PUBLIC RELATIONS SERVICE
      'public-relations': {
        title: 'Public Relations Services',
        metaDescription: 'Strategic PR, media relations, press releases, crisis management & thought leadership. Build reputation and earn media coverage.',
        
        hero: {
          headline: 'Build Reputation, Earn Trust & Shape Public Perception',
          subheadline: 'We help businesses manage their public image, secure media coverage, handle crises professionally, and position leaders as industry experts through strategic PR.',
          badges: ['Media Coverage', 'Reputation Management', 'Crisis Ready'],
          description: "If you need PR that builds credibility and protects your reputation — you're in the right place.",
        },

        trustBar: [
          '90+ PR Campaigns Managed',
          'Media Network Access',
          'Proven Crisis Protocols',
          'Thought Leadership Focus',
          'Strategic Communication',
        ],

        servicesOverview: {
          title: 'Complete Public Relations Solutions',
          services: [
            {
              icon: MessageSquare,
              title: 'Media Relations',
              items: ['Press Release Distribution', 'Media Pitching', 'Interview Coordination', 'Media Training'],
            },
            {
              icon: Shield,
              title: 'Crisis Management',
              items: ['Crisis Preparation', 'Response Strategy', 'Damage Control', 'Reputation Recovery'],
            },
            {
              icon: Award,
              title: 'Thought Leadership',
              items: ['Expert Positioning', 'Speaking Opportunities', 'Article Placement', 'Industry Awards'],
            },
            {
              icon: Users,
              title: 'Corporate Communication',
              items: ['Internal Communication', 'Stakeholder Relations', 'CSR Programs', 'Annual Reports'],
            },
            {
              icon: Target,
              title: 'Product Launch PR',
              items: ['Launch Strategy', 'Media Coverage', 'Influencer Relations', 'Event Management'],
            },
            {
              icon: Star,
              title: 'Reputation Management',
              items: ['Online Monitoring', 'Review Management', 'Brand Perception', 'Sentiment Analysis'],
            },
            {
              icon: Globe,
              title: 'Digital PR',
              items: ['Online Coverage', 'Blogger Outreach', 'Podcast Placements', 'Digital Media'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Strategic PR Matters',
          description: 'Your reputation is everything. You need PR to:',
          points: [
            'Build credibility through earned media',
            'Manage and protect your reputation',
            'Position leaders as industry experts',
            'Handle crisis situations professionally',
          ],
          conclusion: 'Strategic PR is about being proactive with your reputation, not reactive.',
        },

        approach: {
          title: 'Our PR Philosophy',
          dontBelieve: [
            'Spray and pray press releases',
            'No preparation for potential crises',
            'Ignoring negative coverage',
          ],
          believe: [
            'Strategic, targeted media relations',
            'Proactive reputation management',
            'Authentic storytelling and positioning',
            'Prepared crisis response protocols',
          ],
        },

        supportGrowth: {
          title: 'How We Manage Your PR',
          steps: [
            { title: 'Audit', description: 'current perception & opportunities' },
            { title: 'Strategy', description: 'messaging & positioning' },
            { title: 'Outreach', description: 'media & stakeholder engagement' },
            { title: 'Monitoring', description: 'coverage & sentiment tracking' },
            { title: 'Optimization', description: 'continuous improvement' },
          ],
          tagline: 'A strategic, ongoing PR approach that builds and protects reputation.',
        },

        individualServices: [
          {
            title: 'Press Release Writing & Distribution',
            subtitle: 'Get your news in front of media.',
            icon: FileText,
            benefits: [
              'Professional press release writing',
              'Strategic distribution',
              'Media database access',
              'Coverage tracking',
            ],
          },
          {
            title: 'Media Relations',
            subtitle: 'Build relationships with journalists.',
            icon: MessageSquare,
            benefits: [
              'Media list development',
              'Pitch development',
              'Follow-up coordination',
              'Interview arrangement',
            ],
          },
          {
            title: 'Crisis Management',
            subtitle: 'Handle challenging situations.',
            icon: Shield,
            benefits: [
              'Crisis communication plan',
              'Rapid response team',
              'Spokesperson training',
              'Reputation recovery',
            ],
          },
          {
            title: 'Thought Leadership',
            subtitle: 'Position executives as experts.',
            icon: Award,
            benefits: [
              'Expert article placement',
              'Speaking engagements',
              'Panel participation',
              'Industry recognition',
            ],
          },
          {
            title: 'Media Training',
            subtitle: 'Prepare for interviews and coverage.',
            icon: Users,
            benefits: [
              'Interview techniques',
              'Message development',
              'Crisis scenarios',
              'On-camera coaching',
            ],
          },
          {
            title: 'Product Launch PR',
            subtitle: 'Maximum coverage for new products.',
            icon: Rocket,
            benefits: [
              'Launch strategy',
              'Media embargo management',
              'Review unit coordination',
              'Coverage monitoring',
            ],
          },
          {
            title: 'Event PR',
            subtitle: 'Drive attendance and coverage.',
            icon: Users,
            benefits: [
              'Media invitations',
              'Press kit creation',
              'On-site media coordination',
              'Post-event coverage',
            ],
          },
          {
            title: 'Blogger & Influencer Relations',
            subtitle: 'Engage digital influencers.',
            icon: Star,
            benefits: [
              'Influencer identification',
              'Partnership coordination',
              'Content collaboration',
              'Relationship management',
            ],
          },
          {
            title: 'Awards & Recognition',
            subtitle: 'Build credibility through awards.',
            icon: Trophy,
            benefits: [
              'Award identification',
              'Submission preparation',
              'Nomination support',
              'Win amplification',
            ],
          },
          {
            title: 'CSR & Community Relations',
            subtitle: 'Build goodwill and social impact.',
            icon: Users,
            benefits: [
              'CSR program development',
              'Community engagement',
              'Social impact stories',
              'Partnership management',
            ],
          },
          {
            title: 'Online Reputation Management',
            subtitle: 'Monitor and protect digital reputation.',
            icon: Shield,
            benefits: [
              'Online monitoring',
              'Review response',
              'Negative content mitigation',
              'Positive content promotion',
            ],
          },
          {
            title: 'Internal Communications',
            subtitle: 'Keep teams informed and aligned.',
            icon: MessageSquare,
            benefits: [
              'Employee communications',
              'Change management',
              'Newsletter development',
              'Town hall support',
            ],
          },
          {
            title: 'Annual Reports & Publications',
            subtitle: 'Professional corporate communications.',
            icon: FileText,
            benefits: [
              'Report writing',
              'Design coordination',
              'Stakeholder messaging',
              'Distribution planning',
            ],
          },
          {
            title: 'Podcast Placement',
            subtitle: 'Reach audiences through audio.',
            icon: MessageSquare,
            benefits: [
              'Podcast identification',
              'Guest pitching',
              'Talking points',
              'Interview prep',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from strategic PR:',
          outcomes: [
            'Earned media coverage in relevant publications',
            'Improved brand perception and credibility',
            'Crisis preparedness and rapid response capability',
            'Positioned thought leadership',
            'Protected and enhanced reputation',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Want to build credibility through earned media',
            'Need to manage or protect their reputation',
            'Want leaders positioned as industry experts',
            'Value proactive communication strategy',
          ],
        },

        closingMessage: {
          title: "Let's Build Your Reputation",
          message: "PR isn't about spin or manipulation. It's about authentic storytelling and strategic reputation management.",
          tagline: 'We do PR that builds trust and protects what you\'ve built.',
        },
      },

      // POLITICAL CAMPAIGNS SERVICE
      'political-campaigns': {
        title: 'Political Campaign Services',
        metaDescription: 'Data-driven political campaign strategy, voter analysis, digital advocacy, messaging & ground operations. Win elections with smart strategy.',
        
        hero: {
          headline: 'Win Elections With Data-Driven Strategy & Smart Execution',
          subheadline: 'We help political candidates and parties win elections through strategic planning, voter targeting, persuasive messaging, digital campaigns, and coordinated ground operations.',
          badges: ['Strategic Planning', 'Voter Targeting', 'Multi-Channel'],
          description: "If you need a campaign that's strategic, data-driven, and results-focused — you're in the right place.",
        },

        trustBar: [
          '35+ Political Campaigns',
          'Data-Driven Targeting',
          'Multi-Channel Strategy',
          'Ground Operations Support',
          'Proven Win Rate',
        ],

        servicesOverview: {
          title: 'Complete Political Campaign Solutions',
          services: [
            {
              icon: Target,
              title: 'Campaign Strategy',
              items: ['Electoral Analysis', 'Opposition Research', 'Messaging Strategy', 'Timeline Planning'],
            },
            {
              icon: Users,
              title: 'Voter Targeting',
              items: ['Voter Database', 'Demographic Analysis', 'Micro-Targeting', 'Persuasion Modeling'],
            },
            {
              icon: MessageSquare,
              title: 'Digital Campaigns',
              items: ['Social Media Strategy', 'Digital Advertising', 'Content Creation', 'Online Advocacy'],
            },
            {
              icon: Megaphone,
              title: 'Traditional Media',
              items: ['TV Advertising', 'Radio Spots', 'Print Ads', 'Outdoor Advertising'],
            },
            {
              icon: Users,
              title: 'Ground Operations',
              items: ['Door-to-Door', 'Phone Banking', 'Volunteer Management', 'Event Coordination'],
            },
            {
              icon: BarChart3,
              title: 'Analytics & Polling',
              items: ['Opinion Polling', 'Performance Tracking', 'Sentiment Analysis', 'Real-Time Dashboards'],
            },
            {
              icon: Shield,
              title: 'Crisis & Opposition',
              items: ['Rapid Response', 'Opposition Tracking', 'Crisis Management', 'Debate Prep'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Professional Campaign Management Matters',
          description: 'Winning elections requires more than passion. You need:',
          points: [
            'Data-driven voter targeting',
            'Persuasive messaging that resonates',
            'Coordinated multi-channel campaigns',
            'Professional ground operations',
          ],
          conclusion: 'Professional campaign management is the difference between losing and winning.',
        },

        approach: {
          title: 'Our Campaign Philosophy',
          dontBelieve: [
            'Generic one-size-fits-all approaches',
            'Relying only on traditional or only digital',
            'No data, just gut feelings',
          ],
          believe: [
            'Data-driven voter targeting',
            'Integrated multi-channel campaigns',
            'Authentic candidate messaging',
            'Professional ground operations',
          ],
        },

        supportGrowth: {
          title: 'How We Run Your Campaign',
          steps: [
            { title: 'Analysis', description: 'district, voters & opposition' },
            { title: 'Strategy', description: 'messaging & targeting plan' },
            { title: 'Execution', description: 'digital, traditional & ground' },
            { title: 'Monitoring', description: 'real-time performance tracking' },
            { title: 'Optimization', description: 'continuous improvement until election day' },
          ],
          tagline: 'A strategic, integrated campaign from kickoff to victory.',
        },

        individualServices: [
          {
            title: 'Campaign Strategy Development',
            subtitle: 'Win with smart planning.',
            icon: Target,
            benefits: [
              'Electoral landscape analysis',
              'Win number calculation',
              'Resource allocation',
              'Timeline development',
            ],
          },
          {
            title: 'Voter Database & Targeting',
            subtitle: 'Reach the right voters.',
            icon: Users,
            benefits: [
              'Voter file management',
              'Demographic segmentation',
              'Persuasion scores',
              'Turnout modeling',
            ],
          },
          {
            title: 'Message Development',
            subtitle: 'Craft messages that win votes.',
            icon: MessageSquare,
            benefits: [
              'Candidate positioning',
              'Issue prioritization',
              'Talking points',
              'Opposition messaging',
            ],
          },
          {
            title: 'Digital Campaign Management',
            subtitle: 'Win online and on social media.',
            icon: Globe,
            benefits: [
              'Social media strategy',
              'Paid digital advertising',
              'Content creation',
              'Online mobilization',
            ],
          },
          {
            title: 'TV & Radio Advertising',
            subtitle: 'Reach mass audiences.',
            icon: Video,
            benefits: [
              'Commercial production',
              'Media buying',
              'Message testing',
              'Frequency optimization',
            ],
          },
          {
            title: 'Direct Mail Programs',
            subtitle: 'Targeted voter outreach.',
            icon: Mail,
            benefits: [
              'Piece design',
              'Targeting strategy',
              'Production coordination',
              'Drop timing',
            ],
          },
          {
            title: 'Field Operations',
            subtitle: 'Organize ground game.',
            icon: Users,
            benefits: [
              'Door-to-door canvassing',
              'Phone banking',
              'Volunteer recruitment',
              'GOTV operations',
            ],
          },
          {
            title: 'Opposition Research',
            subtitle: 'Know your opponent.',
            icon: Search,
            benefits: [
              'Background research',
              'Voting record analysis',
              'Weakness identification',
              'Defense preparation',
            ],
          },
          {
            title: 'Polling & Research',
            subtitle: 'Make data-driven decisions.',
            icon: BarChart3,
            benefits: [
              'Baseline polling',
              'Tracking polls',
              'Focus groups',
              'Message testing',
            ],
          },
          {
            title: 'Debate Preparation',
            subtitle: 'Perform under pressure.',
            icon: MessageSquare,
            benefits: [
              'Opposition research',
              'Mock debates',
              'Response preparation',
              'Delivery coaching',
            ],
          },
          {
            title: 'Rapid Response',
            subtitle: 'Handle attacks quickly.',
            icon: Shield,
            benefits: [
              '24/7 monitoring',
              'Fast response protocols',
              'Crisis management',
              'Media coordination',
            ],
          },
          {
            title: 'Fundraising Support',
            subtitle: 'Raise the resources you need.',
            icon: DollarSign,
            benefits: [
              'Donor identification',
              'Event coordination',
              'Online fundraising',
              'Finance compliance',
            ],
          },
          {
            title: 'Social Media Management',
            subtitle: 'Build online momentum.',
            icon: MessageSquare,
            benefits: [
              'Content calendar',
              'Community management',
              'Rapid response',
              'Paid social advertising',
            ],
          },
          {
            title: 'Get-Out-The-Vote (GOTV)',
            subtitle: 'Turn support into votes.',
            icon: CheckCircle,
            benefits: [
              'Voter identification',
              'Turnout modeling',
              'Reminder programs',
              'Election day operations',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from professional campaign management:',
          outcomes: [
            'Data-driven strategy with clear path to victory',
            'Coordinated multi-channel campaign execution',
            'Professional ground operations and volunteer management',
            'Real-time performance monitoring and optimization',
            'Maximum return on campaign investment',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Candidates and parties that:',
          criteria: [
            'Want to win with professional strategy',
            'Value data and analytics',
            'Need coordinated multi-channel campaigns',
            'Want experienced campaign professionals',
          ],
        },

        closingMessage: {
          title: "Let's Win This Election",
          message: "Winning elections isn't about luck. It's about strategic planning, disciplined execution, and professional campaign management.",
          tagline: 'We help candidates win with strategy and execution that works.',
        },
      },

      // OOH ADVERTISING SERVICE
      'ooh-advertising': {
        title: 'Out-of-Home (OOH) Advertising Services',
        metaDescription: 'Strategic outdoor advertising including billboards, transit ads, mall displays, airport branding & digital OOH. Maximum visibility in high-traffic locations.',
        
        hero: {
          headline: 'Reach Mass Audiences With Strategic Outdoor Advertising',
          subheadline: 'We help brands achieve maximum visibility through strategic out-of-home advertising placements including billboards, transit ads, mall displays, and digital outdoor advertising.',
          badges: ['High Visibility', 'Prime Locations', 'Mass Reach'],
          description: "If you want advertising that can't be skipped or blocked — you're in the right place.",
        },

        trustBar: [
          '155+ OOH Campaigns Placed',
          'Premium Location Access',
          'Nationwide Coverage',
          'Creative + Placement Support',
          'Performance Tracking',
        ],

        servicesOverview: {
          title: 'Complete Out-of-Home Advertising Solutions',
          services: [
            {
              icon: Megaphone,
              title: 'Billboards',
              items: ['Highway Billboards', 'Urban Locations', 'Lit & Unlit', 'Prime Spots'],
            },
            {
              icon: Target,
              title: 'Transit Advertising',
              items: ['Bus Advertising', 'Metro Station Ads', 'Train Wraps', 'Auto Rickshaw Branding'],
            },
            {
              icon: ShoppingCart,
              title: 'Retail & Mall Advertising',
              items: ['Mall Kiosks', 'Digital Screens', 'Food Court Ads', 'Elevator Branding'],
            },
            {
              icon: Globe,
              title: 'Airport Advertising',
              items: ['Terminal Displays', 'Baggage Claim Ads', 'Check-in Counters', 'Jetway Branding'],
            },
            {
              icon: Play,
              title: 'Digital OOH',
              items: ['Digital Billboards', 'LED Displays', 'Interactive Screens', 'Programmatic DOOH'],
            },
            {
              icon: Users,
              title: 'Street Furniture',
              items: ['Bus Shelters', 'Kiosks', 'Benches', 'Public Installations'],
            },
            {
              icon: Award,
              title: 'Specialty OOH',
              items: ['Building Wraps', 'Wallscapes', 'Stadiums', 'Event Venues'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Out-of-Home Advertising Works',
          description: 'In a world of ad blockers and skip buttons, OOH is unavoidable. You get:',
          points: [
            'Mass reach in high-traffic locations',
            'Brand visibility that can\'t be skipped',
            'Local market dominance',
            '24/7 exposure at fixed cost',
          ],
          conclusion: 'OOH builds brand awareness at scale like no other medium.',
        },

        approach: {
          title: 'Our OOH Strategy',
          dontBelieve: [
            'Random location selection',
            'Poor design that\'s hard to read',
            'No measurement of effectiveness',
          ],
          believe: [
            'Strategic location selection by traffic and demographics',
            'Bold, readable creative designed for distance',
            'Integrated with digital for maximum impact',
            'Performance tracking and optimization',
          ],
        },

        supportGrowth: {
          title: 'How We Execute Your OOH Campaign',
          steps: [
            { title: 'Planning', description: 'goals, budget & location strategy' },
            { title: 'Site Selection', description: 'premium locations & negotiation' },
            { title: 'Creative', description: 'bold designs optimized for OOH' },
            { title: 'Installation', description: 'printing, mounting & monitoring' },
            { title: 'Reporting', description: 'traffic data & campaign performance' },
          ],
          tagline: 'A strategic approach from planning to performance tracking.',
        },

        individualServices: [
          {
            title: 'Highway Billboards',
            subtitle: 'Maximum exposure to commuters.',
            icon: Megaphone,
            benefits: [
              'High-traffic highways',
              'Large format visibility',
              'Strategic positioning',
              'Lit & unlit options',
            ],
          },
          {
            title: 'Urban Billboards',
            subtitle: 'Dominate city landscapes.',
            icon: Target,
            benefits: [
              'Prime city locations',
              'Pedestrian traffic',
              'Local market focus',
              'Multiple site packages',
            ],
          },
          {
            title: 'Bus Advertising',
            subtitle: 'Mobile billboards throughout the city.',
            icon: Users,
            benefits: [
              'Full bus wraps',
              'Side panel ads',
              'Multiple routes',
              'Geographic coverage',
            ],
          },
          {
            title: 'Metro & Transit Ads',
            subtitle: 'Reach daily commuters.',
            icon: Target,
            benefits: [
              'Station platform ads',
              'Train wraps',
              'Digital screens',
              'Captive audience',
            ],
          },
          {
            title: 'Mall Advertising',
            subtitle: 'Reach shoppers at purchase point.',
            icon: ShoppingCart,
            benefits: [
              'High footfall locations',
              'Premium malls',
              'Digital & static options',
              'Food court visibility',
            ],
          },
          {
            title: 'Airport Advertising',
            subtitle: 'Reach affluent travelers.',
            icon: Globe,
            benefits: [
              'Terminal displays',
              'Arrival & departure areas',
              'Premium audience',
              'Extended dwell time',
            ],
          },
          {
            title: 'Digital Billboards',
            subtitle: 'Dynamic content rotation.',
            icon: Play,
            benefits: [
              'Multiple messages',
              'Time-based targeting',
              'Motion & animation',
              'Instant updates',
            ],
          },
          {
            title: 'Bus Shelter Advertising',
            subtitle: 'Eye-level pedestrian engagement.',
            icon: Users,
            benefits: [
              'Walking traffic',
              'Neighborhood targeting',
              'Lit displays',
              'QR code integration',
            ],
          },
          {
            title: 'Auto Rickshaw Branding',
            subtitle: 'Hyperlocal mobile advertising.',
            icon: Target,
            benefits: [
              'Local area coverage',
              'Cost-effective',
              'High frequency',
              'Geo-targeted routes',
            ],
          },
          {
            title: 'Building Wraps',
            subtitle: 'Massive brand statements.',
            icon: Award,
            benefits: [
              'Landmark visibility',
              'Huge impact',
              'Extended campaigns',
              'Premium locations',
            ],
          },
          {
            title: 'Stadium & Arena Advertising',
            subtitle: 'Reach sports fans.',
            icon: Trophy,
            benefits: [
              'Event-based exposure',
              'Passionate audience',
              'Broadcast visibility',
              'Multiple formats',
            ],
          },
          {
            title: 'Cinema Advertising',
            subtitle: 'Captive entertainment audience.',
            icon: Video,
            benefits: [
              'Pre-movie ads',
              'Lobby displays',
              'Engaged viewers',
              'Premium environment',
            ],
          },
          {
            title: 'Creative Production',
            subtitle: 'Designs optimized for OOH.',
            icon: Palette,
            benefits: [
              'Bold, readable designs',
              'Distance-optimized',
              'Brand-aligned',
              'Print-ready files',
            ],
          },
          {
            title: 'Campaign Management',
            subtitle: 'End-to-end execution.',
            icon: Award,
            benefits: [
              'Location negotiation',
              'Installation coordination',
              'Quality monitoring',
              'Performance reporting',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from OOH advertising:',
          outcomes: [
            'Maximum visibility in high-traffic locations',
            'Mass brand awareness at scale',
            'Premium placements in best available spots',
            'Professional creative and installation',
            'Traffic and performance reporting',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Want mass local market awareness',
            'Need brand visibility that can\'t be skipped',
            'Value strategic location selection',
            'Want integrated OOH + digital campaigns',
          ],
        },

        closingMessage: {
          title: "Let's Dominate The Outdoors",
          message: "OOH advertising isn't just about visibility. It's about strategic placement, bold creative, and sustained presence.",
          tagline: 'We create OOH campaigns that build awareness at scale.',
        },
      },

      // RADIO & NEWSPAPERS SERVICE
      'radio-newspapers': {
        title: 'Radio & Newspaper Advertising Services',
        metaDescription: 'Traditional media buying including radio advertising, newspaper placements, magazine features & classified ads. Reach audiences through trusted media.',
        
        hero: {
          headline: 'Reach Audiences Through Trusted Traditional Media',
          subheadline: 'We help brands connect with audiences through strategic radio advertising, newspaper placements, magazine features, and traditional media that still drives results.',
          badges: ['Trusted Media', 'Mass Reach', 'Credibility'],
          description: "If you want to reach audiences through established, trusted media channels — you're in the right place.",
        },

        trustBar: [
          '180+ Traditional Media Campaigns',
          'Media Buying Expertise',
          'Creative Production Included',
          'Prime Time Slots',
          'Multi-Market Coverage',
        ],

        servicesOverview: {
          title: 'Complete Traditional Media Solutions',
          services: [
            {
              icon: MessageSquare,
              title: 'Radio Advertising',
              items: ['Radio Spots', 'Sponsorships', 'Live Reads', 'RJ Endorsements', 'Jingles'],
            },
            {
              icon: Newspaper,
              title: 'Newspaper Advertising',
              items: ['Display Ads', 'Classifieds', 'Supplements', 'Front Page', 'Obituaries'],
            },
            {
              icon: FileText,
              title: 'Magazine Advertising',
              items: ['Full Page Ads', 'Advertorials', 'Special Features', 'Industry Publications'],
            },
            {
              icon: Video,
              title: 'TV Advertising',
              items: ['TV Commercials', 'Ticker Ads', 'Program Sponsorships', 'Prime Time Slots'],
            },
            {
              icon: Target,
              title: 'Media Planning',
              items: ['Reach & Frequency', 'Budget Optimization', 'Multi-Market Plans', 'Campaign Timing'],
            },
            {
              icon: Award,
              title: 'Creative Production',
              items: ['Radio Script Writing', 'Jingle Production', 'Print Ad Design', 'TV Commercial Production'],
            },
            {
              icon: BarChart3,
              title: 'Performance Tracking',
              items: ['Reach Metrics', 'Response Tracking', 'Brand Lift Studies', 'ROI Measurement'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Traditional Media Still Works',
          description: 'Despite digital growth, traditional media offers unique advantages:',
          points: [
            'Trusted, credible media sources',
            'Older demographics with purchasing power',
            'Local market dominance',
            'Complement to digital campaigns',
          ],
          conclusion: 'Smart brands use both traditional and digital for maximum impact.',
        },

        approach: {
          title: 'Our Traditional Media Philosophy',
          dontBelieve: [
            'Traditional media is dead',
            'One-size-fits-all media buys',
            'No tracking or measurement',
          ],
          believe: [
            'Strategic integration with digital',
            'Targeted media selection by audience',
            'Creative that works for the medium',
            'Performance tracking and optimization',
          ],
        },

        supportGrowth: {
          title: 'How We Execute Your Traditional Media Campaign',
          steps: [
            { title: 'Planning', description: 'audience, budget & media mix' },
            { title: 'Creative', description: 'scripts, designs & production' },
            { title: 'Media Buying', description: 'negotiation & scheduling' },
            { title: 'Execution', description: 'campaign launch & monitoring' },
            { title: 'Reporting', description: 'performance & optimization' },
          ],
          tagline: 'A strategic approach from planning to performance measurement.',
        },

        individualServices: [
          {
            title: 'Radio Spot Advertising',
            subtitle: 'Reach listeners during their commute.',
            icon: MessageSquare,
            benefits: [
              'Prime time slots',
              'Multiple stations',
              'Target demographics',
              'High frequency',
            ],
          },
          {
            title: 'Radio Sponsorships',
            subtitle: 'Associate with popular programs.',
            icon: Award,
            benefits: [
              'Program sponsorship',
              'Segment sponsorship',
              'Live RJ reads',
              'Brand integration',
            ],
          },
          {
            title: 'Jingle Production',
            subtitle: 'Create memorable audio branding.',
            icon: Video,
            benefits: [
              'Original composition',
              'Professional recording',
              'Catchy, memorable',
              'Multi-language options',
            ],
          },
          {
            title: 'Newspaper Display Ads',
            subtitle: 'Visibility in trusted publications.',
            icon: Newspaper,
            benefits: [
              'Full page / half page',
              'Front page jackets',
              'Supplement placement',
              'Multi-paper packages',
            ],
          },
          {
            title: 'Classified Advertising',
            subtitle: 'Targeted, cost-effective placement.',
            icon: FileText,
            benefits: [
              'Category placement',
              'Display classifieds',
              'Recruitment ads',
              'Real estate listings',
            ],
          },
          {
            title: 'Newspaper Supplements',
            subtitle: 'Special edition features.',
            icon: Newspaper,
            benefits: [
              'Festival supplements',
              'Industry features',
              'Special sections',
              'Extended shelf life',
            ],
          },
          {
            title: 'Magazine Advertising',
            subtitle: 'Premium, targeted readership.',
            icon: FileText,
            benefits: [
              'Full page placements',
              'Advertorials',
              'Cover positions',
              'Industry publications',
            ],
          },
          {
            title: 'TV Commercial Production',
            subtitle: 'Broadcast quality video ads.',
            icon: Video,
            benefits: [
              'Script to screen',
              'Professional production',
              'Multiple durations',
              'Broadcast compliance',
            ],
          },
          {
            title: 'TV Media Buying',
            subtitle: 'Strategic placement for reach.',
            icon: Target,
            benefits: [
              'Prime time slots',
              'Program selection',
              'Channel mix',
              'Reach optimization',
            ],
          },
          {
            title: 'Media Planning',
            subtitle: 'Strategic cross-media campaigns.',
            icon: Target,
            benefits: [
              'Audience research',
              'Reach & frequency planning',
              'Budget allocation',
              'Multi-market coordination',
            ],
          },
          {
            title: 'RJ Endorsements',
            subtitle: 'Authentic voice recommendations.',
            icon: Star,
            benefits: [
              'Trusted voices',
              'Natural integration',
              'Live reads',
              'Audience connection',
            ],
          },
          {
            title: 'Local News Sponsorships',
            subtitle: 'Brand association with news.',
            icon: Newspaper,
            benefits: [
              'News segment sponsorship',
              'Weather sponsorship',
              'Traffic updates',
              'High visibility',
            ],
          },
          {
            title: 'Print Creative Design',
            subtitle: 'Eye-catching newspaper & magazine ads.',
            icon: Palette,
            benefits: [
              'Professional design',
              'Print-ready files',
              'Multiple size options',
              'Brand consistency',
            ],
          },
          {
            title: 'Campaign Performance Tracking',
            subtitle: 'Measure traditional media impact.',
            icon: BarChart3,
            benefits: [
              'Reach metrics',
              'Response codes',
              'Website traffic correlation',
              'Brand lift measurement',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from traditional media:',
          outcomes: [
            'Mass reach through trusted media sources',
            'Credibility from established publications',
            'Strategic placement for maximum impact',
            'Professional creative production',
            'Performance tracking and reporting',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Want to reach older demographics',
            'Need local market penetration',
            'Value credibility and trust',
            'Want integrated traditional + digital campaigns',
          ],
        },

        closingMessage: {
          title: "Let's Leverage Traditional Media",
          message: "Traditional media isn't outdated. When used strategically alongside digital, it amplifies your message and builds trust.",
          tagline: 'We create integrated campaigns that leverage the best of both worlds.',
        },
      },

      // PRODUCT MARKETING SERVICE
      'product-marketing': {
        title: 'Product Marketing Services',
        metaDescription: 'Go-to-market strategy, product positioning, launch planning, lifecycle marketing & competitive analysis. Take products to market successfully.',
        
        hero: {
          headline: 'Launch & Grow Products With Strategic Go-To-Market Execution',
          subheadline: 'We help companies successfully bring products to market through strategic positioning, launch planning, messaging, competitive analysis, and lifecycle marketing.',
          badges: ['GTM Strategy', 'Product Launches', 'Market Positioning'],
          description: "If you need to launch a product successfully and grow it sustainably — you're in the right place.",
        },

        trustBar: [
          '95+ Product Launches Supported',
          'GTM Strategy Expertise',
          'Competitive Intelligence',
          'Cross-Functional Alignment',
          'Data-Driven Approach',
        ],

        servicesOverview: {
          title: 'Complete Product Marketing Solutions',
          services: [
            {
              icon: Rocket,
              title: 'Go-To-Market Strategy',
              items: ['Market Analysis', 'Target Audience', 'Positioning', 'Launch Planning', 'Channel Strategy'],
            },
            {
              icon: Target,
              title: 'Product Positioning',
              items: ['Value Proposition', 'Differentiation', 'Messaging Hierarchy', 'Competitive Positioning'],
            },
            {
              icon: Award,
              title: 'Product Launch',
              items: ['Launch Plans', 'Campaign Execution', 'Sales Enablement', 'Launch Events'],
            },
            {
              icon: BarChart3,
              title: 'Market Research',
              items: ['Competitive Analysis', 'Customer Research', 'Market Sizing', 'Trend Analysis'],
            },
            {
              icon: Users,
              title: 'Sales Enablement',
              items: ['Sales Decks', 'Battle Cards', 'Case Studies', 'Product Training'],
            },
            {
              icon: TrendingUp,
              title: 'Lifecycle Marketing',
              items: ['Adoption Campaigns', 'Feature Releases', 'Upsell/Cross-sell', 'Retention Programs'],
            },
            {
              icon: DollarSign,
              title: 'Pricing Strategy',
              items: ['Price Analysis', 'Packaging Options', 'Pricing Models', 'Promotional Strategy'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Product Marketing Matters',
          description: 'Having a great product isn\'t enough. You need product marketing to:',
          points: [
            'Position your product effectively in the market',
            'Launch successfully and gain early traction',
            'Enable sales teams to sell confidently',
            'Drive adoption and retention throughout the lifecycle',
          ],
          conclusion: 'Product marketing is the bridge between product development and revenue.',
        },

        approach: {
          title: 'Our Product Marketing Philosophy',
          dontBelieve: [
            'Feature lists instead of value propositions',
            'Launch once and forget',
            'Messaging that doesn\'t resonate with buyers',
          ],
          believe: [
            'Customer-centric positioning and messaging',
            'Strategic, phased launch approach',
            'Continuous lifecycle marketing',
            'Cross-functional collaboration',
          ],
        },

        supportGrowth: {
          title: 'How We Take Your Product To Market',
          steps: [
            { title: 'Research', description: 'market, competitors & customers' },
            { title: 'Positioning', description: 'unique value & differentiation' },
            { title: 'GTM Plan', description: 'launch strategy & timeline' },
            { title: 'Execution', description: 'campaigns, sales enablement & events' },
            { title: 'Optimization', description: 'performance tracking & iteration' },
          ],
          tagline: 'A strategic, data-driven approach from positioning to growth.',
        },

        individualServices: [
          {
            title: 'Go-To-Market Strategy',
            subtitle: 'Strategic plan to reach your market.',
            icon: Rocket,
            benefits: [
              'Market segmentation',
              'Target customer definition',
              'Channel strategy',
              'Success metrics',
            ],
          },
          {
            title: 'Product Positioning',
            subtitle: 'Differentiate in competitive markets.',
            icon: Target,
            benefits: [
              'Value proposition development',
              'Competitive differentiation',
              'Positioning statements',
              'Messaging framework',
            ],
          },
          {
            title: 'Competitive Analysis',
            subtitle: 'Know your competitive landscape.',
            icon: Search,
            benefits: [
              'Competitor research',
              'Feature comparison',
              'Pricing analysis',
              'Market gaps identification',
            ],
          },
          {
            title: 'Customer Research',
            subtitle: 'Understand your buyers deeply.',
            icon: Users,
            benefits: [
              'Buyer persona development',
              'Jobs-to-be-done research',
              'Customer interviews',
              'Pain point identification',
            ],
          },
          {
            title: 'Messaging & Positioning',
            subtitle: 'Craft messages that resonate.',
            icon: MessageSquare,
            benefits: [
              'Core messaging',
              'Elevator pitch',
              'Feature-benefit mapping',
              'Audience-specific messaging',
            ],
          },
          {
            title: 'Product Launch Planning',
            subtitle: 'Orchestrate successful launches.',
            icon: Rocket,
            benefits: [
              'Launch timeline',
              'Cross-functional coordination',
              'Launch checklist',
              'Risk mitigation',
            ],
          },
          {
            title: 'Launch Campaign Execution',
            subtitle: 'Generate awareness and demand.',
            icon: Megaphone,
            benefits: [
              'Multi-channel campaigns',
              'Launch events',
              'PR & media outreach',
              'Customer communications',
            ],
          },
          {
            title: 'Sales Enablement Materials',
            subtitle: 'Equip sales teams to win.',
            icon: Award,
            benefits: [
              'Sales pitch decks',
              'Battle cards',
              'Demo scripts',
              'Objection handling',
            ],
          },
          {
            title: 'Case Studies & Testimonials',
            subtitle: 'Build credibility with proof.',
            icon: Star,
            benefits: [
              'Customer interviews',
              'Success story writing',
              'Results quantification',
              'Multi-format delivery',
            ],
          },
          {
            title: 'Product Demos & Videos',
            subtitle: 'Show product value visually.',
            icon: Video,
            benefits: [
              'Demo video production',
              'Feature walkthroughs',
              'Customer testimonials',
              'Explainer videos',
            ],
          },
          {
            title: 'Pricing & Packaging Strategy',
            subtitle: 'Optimize revenue capture.',
            icon: DollarSign,
            benefits: [
              'Pricing research',
              'Packaging options',
              'Competitive pricing',
              'Promotional pricing',
            ],
          },
          {
            title: 'Feature Release Marketing',
            subtitle: 'Drive adoption of new features.',
            icon: TrendingUp,
            benefits: [
              'Release announcements',
              'In-app messaging',
              'Email campaigns',
              'Documentation',
            ],
          },
          {
            title: 'Customer Adoption Programs',
            subtitle: 'Drive product usage and value.',
            icon: Users,
            benefits: [
              'Onboarding optimization',
              'Usage campaigns',
              'Best practices education',
              'Community building',
            ],
          },
          {
            title: 'Win/Loss Analysis',
            subtitle: 'Learn from deals won and lost.',
            icon: BarChart3,
            benefits: [
              'Deal analysis',
              'Customer interviews',
              'Pattern identification',
              'Action recommendations',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from product marketing:',
          outcomes: [
            'Clear, differentiated product positioning',
            'Successful launches with strong early traction',
            'Sales teams enabled to sell confidently',
            'Higher product adoption and retention',
            'Data-driven market insights',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Companies that:',
          criteria: [
            'Are launching new products or entering new markets',
            'Need stronger product positioning',
            'Want sales teams equipped to sell better',
            'Value data-driven marketing decisions',
          ],
        },

        closingMessage: {
          title: "Let's Take Your Product To Market",
          message: "Product marketing isn't just about launching. It's about positioning, enabling sales, and driving adoption throughout the product lifecycle.",
          tagline: 'We help you bring products to market successfully and grow them sustainably.',
        },
      },

      // BTL ACTIVATIONS SERVICE
      'btl-activations': {
        title: 'BTL Activations & On-Ground Marketing Services',
        metaDescription: 'Direct consumer engagement through product sampling, mall activations, roadshows, events & experiential campaigns. Connect with customers face-to-face.',
        
        hero: {
          headline: 'Connect With Customers Through Memorable On-Ground Experiences',
          subheadline: 'We create experiential marketing campaigns that engage consumers directly through product sampling, mall activations, roadshows, events, and immersive brand experiences.',
          badges: ['500K+ Consumers Engaged', 'Face-to-Face Impact', 'Memorable Experiences'],
          description: "If you want marketing that creates real human connections and drives trials — you're in the right place.",
        },

        trustBar: [
          '90+ BTL Campaigns Executed',
          'Pan-India Execution Capability',
          'Professional Activation Teams',
          'Real-Time Reporting',
          '🔥 Core Service',
        ],

        servicesOverview: {
          title: 'Complete BTL Activation Solutions',
          services: [
            {
              icon: Users,
              title: 'Product Sampling',
              items: ['Mall Sampling', 'College Sampling', 'Society Sampling', 'Office Sampling', 'Event Sampling'],
            },
            {
              icon: ShoppingCart,
              title: 'Retail Activations',
              items: ['In-Store Promotions', 'POS Displays', 'Demo Booths', 'Store Launch Events'],
            },
            {
              icon: Target,
              title: 'Mall Activations',
              items: ['Kiosk Setup', 'Interactive Zones', 'Product Demos', 'Contest & Games'],
            },
            {
              icon: Users,
              title: 'Roadshows',
              items: ['Mobile Vans', 'City Tours', 'Multi-Location Events', 'Brand on Wheels'],
            },
            {
              icon: Award,
              title: 'Experiential Marketing',
              items: ['Brand Experiences', 'Pop-up Stores', 'Immersive Zones', 'Interactive Installations'],
            },
            {
              icon: Rocket,
              title: 'Event Marketing',
              items: ['Product Launches', 'Brand Events', 'Festival Activations', 'Sports Events'],
            },
            {
              icon: BarChart3,
              title: 'Performance Tracking',
              items: ['Real-Time Reporting', 'Consumer Data Collection', 'Lead Generation', 'ROI Measurement'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why BTL Activations Work',
          description: 'Face-to-face marketing creates impact digital can\'t match. You get:',
          points: [
            'Direct product trial and experience',
            'Immediate consumer feedback',
            'Personal brand connections',
            'Measurable consumer engagement',
          ],
          conclusion: 'BTL activations turn awareness into trial and trial into purchase.',
        },

        approach: {
          title: 'Our BTL Execution Philosophy',
          dontBelieve: [
            'Generic, one-size-fits-all activations',
            'Poorly trained brand ambassadors',
            'No tracking or measurement',
          ],
          believe: [
            'Creative, memorable consumer experiences',
            'Professional, trained activation teams',
            'Real-time data collection and reporting',
            'Strategic location and timing selection',
          ],
        },

        supportGrowth: {
          title: 'How We Execute Your BTL Campaign',
          steps: [
            { title: 'Strategy', description: 'objectives, audience & locations' },
            { title: 'Planning', description: 'creative concept & logistics' },
            { title: 'Recruitment', description: 'brand ambassadors & training' },
            { title: 'Execution', description: 'on-ground activation & management' },
            { title: 'Reporting', description: 'data collection & ROI analysis' },
          ],
          tagline: 'A professional, end-to-end BTL execution from concept to reporting.',
        },

        individualServices: [
          {
            title: 'Product Sampling Campaigns',
            subtitle: 'Drive trial through direct distribution.',
            icon: Users,
            benefits: [
              'Strategic location selection',
              'Trained sampling teams',
              'Consumer data collection',
              'Brand messaging',
            ],
          },
          {
            title: 'Mall Activations',
            subtitle: 'Engage shoppers in high-traffic malls.',
            icon: ShoppingCart,
            benefits: [
              'Premium mall locations',
              'Interactive brand zones',
              'Product demonstrations',
              'Lead generation',
            ],
          },
          {
            title: 'Roadshows',
            subtitle: 'Bring your brand to multiple locations.',
            icon: Target,
            benefits: [
              'Mobile brand presence',
              'City-wide coverage',
              'Consistent execution',
              'Multi-location tracking',
            ],
          },
          {
            title: 'College Activations',
            subtitle: 'Reach young audiences on campus.',
            icon: Users,
            benefits: [
              'Campus permissions',
              'Student engagement',
              'Trend-setting demographic',
              'Social media amplification',
            ],
          },
          {
            title: 'Society & Residential Sampling',
            subtitle: 'Door-to-door in targeted communities.',
            icon: Users,
            benefits: [
              'Gated community access',
              'Household targeting',
              'Personal interaction',
              'High conversion potential',
            ],
          },
          {
            title: 'In-Store Promotions',
            subtitle: 'Drive sales at point of purchase.',
            icon: ShoppingCart,
            benefits: [
              'Product demos',
              'Promotional offers',
              'POS materials',
              'Sales conversion',
            ],
          },
          {
            title: 'Brand Experience Zones',
            subtitle: 'Immersive brand environments.',
            icon: Award,
            benefits: [
              'Experiential setups',
              'Interactive elements',
              'Photo opportunities',
              'Memorable brand moments',
            ],
          },
          {
            title: 'Product Launch Events',
            subtitle: 'Make launches memorable.',
            icon: Rocket,
            benefits: [
              'Event conceptualization',
              'Venue management',
              'Guest engagement',
              'Media coverage',
            ],
          },
          {
            title: 'Festival & Seasonal Activations',
            subtitle: 'Leverage festive spirit.',
            icon: Star,
            benefits: [
              'Festive themes',
              'High footfall periods',
              'Gifting & contests',
              'Brand association',
            ],
          },
          {
            title: 'Brand Ambassador Programs',
            subtitle: 'Trained teams representing your brand.',
            icon: Users,
            benefits: [
              'Professional recruitment',
              'Brand training',
              'Uniform & materials',
              'Performance tracking',
            ],
          },
          {
            title: 'Contest & Games',
            subtitle: 'Engage through interactive activities.',
            icon: Trophy,
            benefits: [
              'Creative game concepts',
              'Prize management',
              'Data collection',
              'Social sharing',
            ],
          },
          {
            title: 'Kiosk & Pop-up Stores',
            subtitle: 'Temporary retail presence.',
            icon: ShoppingCart,
            benefits: [
              'Kiosk design & setup',
              'Location permissions',
              'Sales capability',
              'Brand visibility',
            ],
          },
          {
            title: 'Lead Generation Campaigns',
            subtitle: 'Collect valuable consumer data.',
            icon: Target,
            benefits: [
              'Digital data collection',
              'CRM integration',
              'Follow-up support',
              'Qualified leads',
            ],
          },
          {
            title: 'Real-Time Reporting',
            subtitle: 'Track activation performance live.',
            icon: BarChart3,
            benefits: [
              'Live dashboards',
              'Photo & video updates',
              'Consumer counts',
              'ROI measurement',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from BTL activations:',
          outcomes: [
            'Direct consumer engagement and product trial',
            'Valuable consumer data and feedback',
            'Brand awareness in targeted locations',
            'Professional execution with real-time tracking',
            'Measurable ROI and conversion metrics',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Brands that:',
          criteria: [
            'Want direct consumer engagement',
            'Need product trial to drive purchase',
            'Value face-to-face brand connections',
            'Want measurable on-ground marketing',
          ],
        },

        closingMessage: {
          title: "Let's Connect With Your Customers",
          message: "BTL activations aren't just about handing out samples. They're about creating memorable brand experiences that drive trial and loyalty.",
          tagline: 'We execute activations that engage consumers and deliver measurable results.',
        },
      },

      // CREATIVE CAMPAIGNS SERVICE
      'creative-campaigns': {
        title: 'Creative Concept & Campaign Execution Services',
        metaDescription: 'End-to-end integrated campaigns from strategy to execution across digital, traditional, experiential & PR. Big ideas, flawless execution.',
        
        hero: {
          headline: 'Create & Execute Integrated Campaigns That Drive Real Business Results',
          subheadline: 'We develop big creative ideas and execute them flawlessly across all channels - digital, traditional, experiential, and PR - to deliver campaigns that capture attention and drive action.',
          badges: ['Big Ideas', 'Multi-Channel', '⭐ Core Service'],
          description: "If you need campaigns that are strategic, creative, and results-driven — you're in the right place.",
        },

        trustBar: [
          '120+ Integrated Campaigns',
          'Award-Winning Creative',
          'Full-Service Execution',
          'Multi-Channel Expertise',
          'Results-Focused',
        ],

        servicesOverview: {
          title: 'Complete Campaign Solutions',
          services: [
            {
              icon: Lightbulb,
              title: 'Creative Concept Development',
              items: ['Big Ideas', 'Campaign Themes', 'Creative Strategy', 'Brand Storytelling'],
            },
            {
              icon: Target,
              title: 'Campaign Strategy',
              items: ['Objective Setting', 'Audience Targeting', 'Channel Planning', 'Budget Allocation'],
            },
            {
              icon: Globe,
              title: 'Digital Campaign Execution',
              items: ['Social Media', 'Paid Advertising', 'Content Creation', 'Influencer Marketing'],
            },
            {
              icon: Megaphone,
              title: 'Traditional Media',
              items: ['TV & Radio', 'Print Ads', 'OOH Advertising', 'Media Buying'],
            },
            {
              icon: Users,
              title: 'Experiential Marketing',
              items: ['Events & Activations', 'Pop-up Experiences', 'Brand Installations', 'On-Ground Engagement'],
            },
            {
              icon: MessageSquare,
              title: 'PR & Media Relations',
              items: ['Media Coverage', 'Press Releases', 'Influencer Outreach', 'Media Events'],
            },
            {
              icon: BarChart3,
              title: 'Campaign Performance',
              items: ['Real-Time Tracking', 'Multi-Channel Analytics', 'ROI Measurement', 'Optimization'],
            },
          ],
        },

        whyNeedHelp: {
          title: 'Why Integrated Campaigns Work Better',
          description: 'Siloed marketing doesn\'t cut it anymore. You need campaigns that:',
          points: [
            'Tell a consistent story across all touchpoints',
            'Reach audiences where they are',
            'Amplify messages through channel synergy',
            'Drive measurable business results',
          ],
          conclusion: 'Integrated campaigns deliver exponentially better results than single-channel efforts.',
        },

        approach: {
          title: 'Our Campaign Philosophy',
          dontBelieve: [
            'Tactical execution without strategy',
            'Siloed channel management',
            'Creative for creative\'s sake',
          ],
          believe: [
            'Strategy first, tactics second',
            'Integrated multi-channel approach',
            'Creative that serves business goals',
            'Continuous measurement and optimization',
          ],
        },

        supportGrowth: {
          title: 'How We Create & Execute Campaigns',
          steps: [
            { title: 'Brief', description: 'business goals & challenges' },
            { title: 'Strategy', description: 'audience, channels & messaging' },
            { title: 'Creative', description: 'big idea & concept development' },
            { title: 'Execution', description: 'multi-channel campaign launch' },
            { title: 'Optimization', description: 'performance tracking & improvement' },
          ],
          tagline: 'A strategic, integrated approach from concept to results.',
        },

        individualServices: [
          {
            title: 'Campaign Strategy Development',
            subtitle: 'Foundation for successful campaigns.',
            icon: Target,
            benefits: [
              'Clear objectives',
              'Audience research',
              'Channel strategy',
              'Success metrics',
            ],
          },
          {
            title: 'Creative Concept & Big Ideas',
            subtitle: 'Breakthrough creative that resonates.',
            icon: Lightbulb,
            benefits: [
              'Strategic creativity',
              'Multiple concepts',
              'Consumer insight-driven',
              'Brand-aligned',
            ],
          },
          {
            title: 'Brand Campaign Development',
            subtitle: 'Build brand equity and awareness.',
            icon: Award,
            benefits: [
              'Brand storytelling',
              'Emotional connection',
              'Long-term brand building',
              'Multi-touchpoint presence',
            ],
          },
          {
            title: 'Product Launch Campaigns',
            subtitle: 'Create buzz and drive trial.',
            icon: Rocket,
            benefits: [
              'Launch strategy',
              'Multi-channel activation',
              'Media coverage',
              'Early adopter targeting',
            ],
          },
          {
            title: 'Digital Campaign Execution',
            subtitle: 'Integrated digital marketing.',
            icon: Globe,
            benefits: [
              'Social media',
              'Paid advertising',
              'Content marketing',
              'Email & automation',
            ],
          },
          {
            title: 'Social Media Campaigns',
            subtitle: 'Viral-worthy social campaigns.',
            icon: Users,
            benefits: [
              'Platform-specific content',
              'Hashtag campaigns',
              'User-generated content',
              'Community engagement',
            ],
          },
          {
            title: 'Influencer Campaign Management',
            subtitle: 'Leverage influencer audiences.',
            icon: Star,
            benefits: [
              'Influencer selection',
              'Campaign coordination',
              'Content collaboration',
              'Performance tracking',
            ],
          },
          {
            title: 'Video Campaign Production',
            subtitle: 'Video content that performs.',
            icon: Video,
            benefits: [
              'Concept to completion',
              'Multi-format delivery',
              'Platform optimization',
              'Distribution strategy',
            ],
          },
          {
            title: 'Traditional Media Campaigns',
            subtitle: 'TV, radio, print & OOH.',
            icon: Megaphone,
            benefits: [
              'Creative production',
              'Media planning',
              'Negotiated buying',
              'Reach optimization',
            ],
          },
          {
            title: 'Experiential Campaigns',
            subtitle: 'Memorable brand experiences.',
            icon: Users,
            benefits: [
              'Event conceptualization',
              'Pop-up activations',
              'Immersive experiences',
              'Social amplification',
            ],
          },
          {
            title: 'PR & Media Campaigns',
            subtitle: 'Earn media coverage and credibility.',
            icon: MessageSquare,
            benefits: [
              'Media outreach',
              'Press events',
              'Story development',
              'Coverage tracking',
            ],
          },
          {
            title: 'Seasonal & Festival Campaigns',
            subtitle: 'Capitalize on peak periods.',
            icon: Star,
            benefits: [
              'Festive themes',
              'Time-sensitive execution',
              'Promotional campaigns',
              'Maximum ROI periods',
            ],
          },
          {
            title: 'Multi-Channel Attribution',
            subtitle: 'Understand true campaign impact.',
            icon: BarChart3,
            benefits: [
              'Cross-channel tracking',
              'Attribution modeling',
              'ROI by channel',
              'Optimization insights',
            ],
          },
          {
            title: 'Campaign Performance Optimization',
            subtitle: 'Continuous improvement.',
            icon: TrendingUp,
            benefits: [
              'Real-time monitoring',
              'A/B testing',
              'Budget reallocation',
              'Performance reporting',
            ],
          },
        ],

        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from integrated campaigns:',
          outcomes: [
            'Big creative ideas that capture attention',
            'Flawless execution across all channels',
            'Consistent messaging and brand experience',
            'Real-time performance tracking and optimization',
            'Measurable business results and ROI',
          ],
        },

        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Need breakthrough creative and execution',
            'Want integrated multi-channel campaigns',
            'Value strategic thinking with flawless execution',
            'Need a full-service campaign partner',
          ],
        },

        closingMessage: {
          title: "Let's Create Campaigns That Work",
          message: "Great campaigns aren't just creative. They're strategic, integrated, measurable, and designed to drive real business results.",
          tagline: 'We create and execute campaigns that capture attention and deliver results.',
        },
      },

      // SEO SERVICE - Redirect to digital marketing for now
      'search-engine-optimization-seo': {
        title: 'SEO Services',
        metaDescription: 'Professional SEO services to improve your search rankings and organic traffic. Technical SEO, on-page optimization, content SEO & link building.',
        hero: {
          headline: 'Rank Higher on Google with Strategic SEO Services',
          subheadline: 'We help businesses improve their search engine rankings through technical SEO, content optimization, link building, and ongoing performance tracking.',
          badges: ['Higher Rankings', 'More Traffic', 'Better Visibility'],
          description: "If you want to be found on Google when people search for your services — you're in the right place.",
        },
        trustBar: [
          '100+ Websites Optimized',
          'Proven SEO Strategies',
          'White-Hat Techniques',
          'Transparent Reporting',
          'Long-Term Results',
        ],
        servicesOverview: {
          title: 'Complete SEO Solutions',
          services: [
            {
              icon: Search,
              title: 'Technical SEO',
              items: ['Site Speed', 'Mobile Optimization', 'Schema Markup', 'XML Sitemaps', 'Robots.txt'],
            },
            {
              icon: Target,
              title: 'On-Page SEO',
              items: ['Keyword Research', 'Meta Tags', 'Header Optimization', 'Internal Linking', 'Content SEO'],
            },
            {
              icon: Globe,
              title: 'Off-Page SEO',
              items: ['Link Building', 'Guest Posting', 'Brand Mentions', 'Local Citations', 'Authority Building'],
            },
          ],
        },
        whyNeedHelp: {
          title: 'Why SEO Matters',
          description: '90% of online experiences start with a search engine.',
          points: [
            'Get found by customers actively searching',
            'Build long-term organic traffic',
            'Reduce dependency on paid ads',
            'Establish authority and trust',
          ],
          conclusion: 'SEO is the foundation of sustainable online growth.',
        },
        approach: {
          title: 'Our SEO Approach',
          dontBelieve: [
            'Quick ranking promises',
            'Black-hat techniques',
            'One-time SEO audits',
          ],
          believe: [
            'Sustainable, white-hat strategies',
            'Continuous optimization',
            'Transparent reporting',
            'Long-term partnership',
          ],
        },
        supportGrowth: {
          title: 'How We Improve Your Rankings',
          steps: [
            { title: 'SEO Audit', description: 'identify technical issues & opportunities' },
            { title: 'Strategy', description: 'keyword research & competitive analysis' },
            { title: 'Optimization', description: 'technical, on-page & content improvements' },
            { title: 'Link Building', description: 'quality backlinks & authority building' },
            { title: 'Tracking', description: 'rankings, traffic & conversions' },
          ],
          tagline: 'A proven process for sustainable search growth.',
        },
        individualServices: [],
        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from SEO:',
          outcomes: [
            'Gradual improvement in search rankings (3-6 months)',
            'Increase in organic traffic and qualified leads',
            'Better user experience and site performance',
            'Transparent monthly reports with clear metrics',
            'Long-term sustainable growth',
          ],
        },
        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Want sustainable organic growth',
            'Are willing to invest for long-term results',
            'Value quality over quick fixes',
            'Need consistent lead generation',
          ],
        },
        closingMessage: {
          title: "Let's Improve Your Search Rankings",
          message: "SEO isn't a one-time task. It's an ongoing strategy that builds compound results over time.",
          tagline: 'We help you rank higher, get more traffic, and grow sustainably.',
        },
      },

      // PPC SERVICE
      'ppc-google-ads': {
        title: 'PPC & Google Ads Services',
        metaDescription: 'Expert Google Ads management for immediate traffic and conversions. Search ads, display ads, shopping ads & remarketing campaigns.',
        hero: {
          headline: 'Get Immediate Traffic & Leads with Google Ads',
          subheadline: 'We create and manage high-performing Google Ads campaigns that drive qualified traffic, generate leads, and maximize your ROI across search, display, and shopping networks.',
          badges: ['Immediate Results', 'Targeted Traffic', 'ROI Focused'],
          description: "If you need qualified traffic and leads fast — you're in the right place.",
        },
        trustBar: [
          '₹2 Cr+ Ad Spend Managed',
          'Google Ads Certified',
          '4.2x Average ROAS',
          'Data-Driven Optimization',
          'Full Transparency',
        ],
        servicesOverview: {
          title: 'Complete Google Ads Solutions',
          services: [
            {
              icon: Search,
              title: 'Search Ads',
              items: ['Keyword Research', 'Ad Copy', 'Bid Management', 'A/B Testing', 'Conversion Tracking'],
            },
            {
              icon: Target,
              title: 'Display Ads',
              items: ['Banner Design', 'Audience Targeting', 'Remarketing', 'GDN Placement', 'Creative Testing'],
            },
            {
              icon: ShoppingCart,
              title: 'Shopping Ads',
              items: ['Product Feed', 'Smart Shopping', 'PMAX Campaigns', 'Competitor Targeting', 'Price Optimization'],
            },
          ],
        },
        whyNeedHelp: {
          title: 'Why Google Ads Work',
          description: 'Reach customers actively searching for your products/services.',
          points: [
            'Immediate visibility and traffic',
            'Pay only for clicks (cost-controlled)',
            'Target high-intent searchers',
            'Measurable ROI and conversions',
          ],
          conclusion: 'Google Ads deliver fast, measurable results when done right.',
        },
        approach: {
          title: 'Our PPC Approach',
          dontBelieve: [
            'Set-and-forget campaigns',
            'Wasting budget on broad keywords',
            'Vanity metrics without conversions',
          ],
          believe: [
            'Continuous testing and optimization',
            'Conversion-focused campaigns',
            'Detailed tracking and attribution',
            'Transparent reporting',
          ],
        },
        supportGrowth: {
          title: 'How We Maximize Your Ad ROI',
          steps: [
            { title: 'Strategy', description: 'goals, budget & targeting setup' },
            { title: 'Campaign Build', description: 'ad groups, keywords & ad copy' },
            { title: 'Launch', description: 'conversion tracking & initial optimization' },
            { title: 'Optimize', description: 'A/B testing, bid adjustments & refinement' },
            { title: 'Scale', description: 'expand winners, cut losers, grow ROI' },
          ],
          tagline: 'A systematic approach to profitable Google Ads.',
        },
        individualServices: [],
        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from Google Ads:',
          outcomes: [
            'Immediate traffic and visibility',
            'Qualified leads within days',
            '3-5x ROAS (return on ad spend)',
            'Weekly optimization and monthly reports',
            'Full control over budget and targeting',
          ],
        },
        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Need immediate traffic and leads',
            'Have budget for paid advertising',
            'Want measurable, scalable results',
            'Sell products or services online',
          ],
        },
        closingMessage: {
          title: "Let's Drive Qualified Traffic Fast",
          message: "Google Ads isn't about spending money. It's about investing in growth with clear ROI.",
          tagline: 'We help you get more traffic, leads, and sales from every rupee spent.',
        },
      },

      // SOCIAL MEDIA MARKETING
      'social-media-marketing': {
        title: 'Social Media Marketing Services',
        metaDescription: 'Full-service social media marketing including strategy, content creation, community management & paid social ads across all platforms.',
        hero: {
          headline: 'Build Your Brand & Grow Your Audience on Social Media',
          subheadline: 'We help businesses create engaging social media presence through strategic content, community management, and paid social campaigns that drive real business results.',
          badges: ['Content Creation', 'Community Growth', 'Paid Social'],
          description: "If you want a social media presence that actually drives business — you're in the right place.",
        },
        trustBar: [
          '80+ Brands Managed',
          '5M+ Monthly Reach',
          'Multi-Platform Expertise',
          'Content + Ads Integrated',
          'Community Focused',
        ],
        servicesOverview: {
          title: 'Complete Social Media Solutions',
          services: [
            {
              icon: Users,
              title: 'Content Creation',
              items: ['Photography', 'Reels & Videos', 'Graphics', 'Copywriting', 'Content Calendar'],
            },
            {
              icon: MessageCircle,
              title: 'Community Management',
              items: ['Daily Posting', 'Comment Responses', 'DM Management', 'Engagement Strategy', 'Follower Growth'],
            },
            {
              icon: Target,
              title: 'Paid Social Ads',
              items: ['Facebook Ads', 'Instagram Ads', 'LinkedIn Ads', 'Audience Targeting', 'Performance Tracking'],
            },
          ],
        },
        whyNeedHelp: {
          title: 'Why Social Media Matters',
          description: 'Your customers spend hours daily on social platforms.',
          points: [
            'Build brand awareness and trust',
            'Engage directly with your audience',
            'Drive traffic and conversions',
            'Create community around your brand',
          ],
          conclusion: 'Social media done right becomes a powerful growth channel.',
        },
        approach: {
          title: 'Our Social Media Approach',
          dontBelieve: [
            'Posting without strategy',
            'Buying fake followers',
            'One-size-fits-all content',
          ],
          believe: [
            'Strategy-first content planning',
            'Authentic engagement and growth',
            'Platform-specific optimization',
            'Results-driven campaigns',
          ],
        },
        supportGrowth: {
          title: 'How We Grow Your Social Presence',
          steps: [
            { title: 'Audit', description: 'analyze current presence & competitors' },
            { title: 'Strategy', description: 'content pillars, posting frequency & goals' },
            { title: 'Creation', description: 'professional content production' },
            { title: 'Management', description: 'posting, engagement & community building' },
            { title: 'Growth', description: 'paid ads, collaborations & optimization' },
          ],
          tagline: 'A complete system for social media success.',
        },
        individualServices: [],
        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from social media:',
          outcomes: [
            '3-5 posts per week with professional content',
            'Growing follower count and engagement',
            'Increased website traffic from social',
            'Community building and brand loyalty',
            'Monthly performance reports',
          ],
        },
        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Want professional social media presence',
            'Need consistent content creation',
            'Value community building',
            'Want integrated organic + paid strategy',
          ],
        },
        closingMessage: {
          title: "Let's Build Your Social Presence",
          message: "Social media isn't just about posting. It's about building relationships that drive business results.",
          tagline: 'We create social strategies that engage, grow, and convert.',
        },
      },

      // CONTENT MARKETING
      'content-marketing': {
        title: 'Content Marketing Services',
        metaDescription: 'Strategic content marketing including blog writing, SEO content, case studies, whitepapers & content strategy that drives traffic and conversions.',
        hero: {
          headline: 'Attract, Engage & Convert with Strategic Content Marketing',
          subheadline: 'We create valuable, SEO-optimized content that educates your audience, builds authority, and drives sustainable organic traffic and conversions.',
          badges: ['SEO Content', 'Thought Leadership', 'Lead Generation'],
          description: "If you want content that actually drives business results — you're in the right place.",
        },
        trustBar: [
          '500+ Articles Published',
          'SEO Optimized',
          'Expert Writers',
          'Multi-Format Content',
          'Results Driven',
        ],
        servicesOverview: {
          title: 'Complete Content Marketing Solutions',
          services: [
            {
              icon: FileText,
              title: 'Blog Writing',
              items: ['SEO Articles', 'Industry Insights', 'How-To Guides', 'Listicles', 'Thought Leadership'],
            },
            {
              icon: Target,
              title: 'Business Content',
              items: ['Case Studies', 'Whitepapers', 'Ebooks', 'Reports', 'Research Content'],
            },
            {
              icon: Megaphone,
              title: 'Marketing Content',
              items: ['Landing Pages', 'Email Campaigns', 'Product Descriptions', 'Ad Copy', 'Social Content'],
            },
          ],
        },
        whyNeedHelp: {
          title: 'Why Content Marketing Works',
          description: 'Content marketing costs 62% less than traditional marketing and generates 3x more leads.',
          points: [
            'Build authority and trust',
            'Drive organic traffic (SEO)',
            'Educate and nurture prospects',
            'Generate qualified leads',
          ],
          conclusion: 'Quality content is the foundation of modern digital marketing.',
        },
        approach: {
          title: 'Our Content Approach',
          dontBelieve: [
            'Generic, keyword-stuffed content',
            'Quantity over quality',
            'Content without distribution strategy',
          ],
          believe: [
            'Research-backed, valuable content',
            'SEO-optimized for discovery',
            'Multi-channel distribution',
            'Performance tracking and optimization',
          ],
        },
        supportGrowth: {
          title: 'How We Create Content That Converts',
          steps: [
            { title: 'Strategy', description: 'audience research, topics & keywords' },
            { title: 'Planning', description: 'content calendar & editorial guidelines' },
            { title: 'Creation', description: 'expert writing, editing & SEO optimization' },
            { title: 'Distribution', description: 'publish, promote & amplify' },
            { title: 'Measure', description: 'track performance & refine strategy' },
          ],
          tagline: 'A strategic approach to content that delivers results.',
        },
        individualServices: [],
        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from content marketing:',
          outcomes: [
            '4-8 high-quality articles per month',
            'Improved SEO rankings and organic traffic',
            'Growing authority and thought leadership',
            'Increased leads and conversions',
            'Detailed performance analytics',
          ],
        },
        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Want sustainable organic growth',
            'Need to establish thought leadership',
            'Have longer sales cycles (B2B)',
            'Value quality over quick wins',
          ],
        },
        closingMessage: {
          title: "Let's Create Content That Drives Results",
          message: "Content marketing isn't about churning out articles. It's about creating valuable resources that attract and convert.",
          tagline: 'We create content strategies that build authority and drive growth.',
        },
      },

      // EMAIL MARKETING
      'email-marketing': {
        title: 'Email Marketing Services',
        metaDescription: 'Professional email marketing including campaign strategy, design, automation, list management & performance optimization for higher open and conversion rates.',
        hero: {
          headline: 'Drive Sales & Nurture Leads with Strategic Email Marketing',
          subheadline: 'We create email campaigns that get opened, read, and clicked through targeted messaging, beautiful design, and smart automation.',
          badges: ['High Open Rates', 'Automation', 'ROI Driven'],
          description: "If you want email campaigns that actually drive sales — you're in the right place.",
        },
        trustBar: [
          '1M+ Emails Sent Monthly',
          '32% Average Open Rate',
          '4.5% Click Rate',
          'Full Automation Setup',
          'CRM Integration',
        ],
        servicesOverview: {
          title: 'Complete Email Marketing Solutions',
          services: [
            {
              icon: Mail,
              title: 'Campaign Management',
              items: ['Strategy', 'Design', 'Copywriting', 'Segmentation', 'A/B Testing'],
            },
            {
              icon: Zap,
              title: 'Marketing Automation',
              items: ['Welcome Series', 'Drip Campaigns', 'Cart Abandonment', 'Lead Nurturing', 'Re-engagement'],
            },
            {
              icon: BarChart3,
              title: 'Performance Optimization',
              items: ['List Management', 'Deliverability', 'Analytics', 'Conversion Tracking', 'Optimization'],
            },
          ],
        },
        whyNeedHelp: {
          title: 'Why Email Marketing Still Works',
          description: 'Email delivers $42 ROI for every $1 spent - the highest of any marketing channel.',
          points: [
            'Direct line to your customers',
            'Highly measurable and trackable',
            'Perfect for nurturing leads',
            'Automation saves time and scales',
          ],
          conclusion: 'Email marketing is still one of the most profitable channels.',
        },
        approach: {
          title: 'Our Email Approach',
          dontBelieve: [
            'Batch-and-blast to everyone',
            'Buying email lists',
            'Ignoring mobile optimization',
          ],
          believe: [
            'Segmented, targeted messaging',
            'Permission-based organic lists',
            'Mobile-first design',
            'Value-driven content',
          ],
        },
        supportGrowth: {
          title: 'How We Build Profitable Email Systems',
          steps: [
            { title: 'Strategy', description: 'goals, audience segmentation & planning' },
            { title: 'Design', description: 'branded templates & mobile optimization' },
            { title: 'Automation', description: 'workflow setup & trigger campaigns' },
            { title: 'Campaigns', description: 'newsletters, promos & nurture sequences' },
            { title: 'Optimize', description: 'A/B testing, analytics & improvements' },
          ],
          tagline: 'A systematic approach to email that drives consistent results.',
        },
        individualServices: [],
        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from email marketing:',
          outcomes: [
            '25-35% average open rates',
            '3-5% click-through rates',
            'Automated nurture sequences running 24/7',
            'Growing subscriber list',
            'Detailed performance insights',
          ],
        },
        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Have an existing customer/subscriber base',
            'Want to nurture leads systematically',
            'Sell products or services online',
            'Value direct customer communication',
          ],
        },
        closingMessage: {
          title: "Let's Build Your Email Engine",
          message: "Email marketing isn't dead. Poorly executed email marketing is dead. We do it right.",
          tagline: 'We create email strategies that engage subscribers and drive revenue.',
        },
      },

      // ECOMMERCE MARKETING
      'ecommerce-marketing': {
        title: 'eCommerce Marketing Services',
        metaDescription: 'Complete eCommerce marketing including Shopify/WooCommerce optimization, product ads, retargeting, email automation & conversion rate optimization.',
        hero: {
          headline: 'Scale Your Online Store with Proven eCommerce Marketing',
          subheadline: 'We help online stores increase sales through strategic product ads, email automation, conversion optimization, and multi-channel marketing.',
          badges: ['More Sales', 'Higher AOV', 'Better ROAS'],
          description: "If you want to scale your eCommerce business profitably — you're in the right place.",
        },
        trustBar: [
          '₹5 Cr+ Online Sales Driven',
          'Shopify & WooCommerce Experts',
          '3.8x Average ROAS',
          'Full-Funnel Strategy',
          'Data-Driven Growth',
        ],
        servicesOverview: {
          title: 'Complete eCommerce Marketing Solutions',
          services: [
            {
              icon: ShoppingCart,
              title: 'Product Advertising',
              items: ['Google Shopping', 'Facebook Catalog Ads', 'Dynamic Retargeting', 'PMAX Campaigns', 'Competitor Conquest'],
            },
            {
              icon: Zap,
              title: 'Conversion Optimization',
              items: ['CRO Audits', 'A/B Testing', 'Checkout Optimization', 'Product Page UX', 'Cart Abandonment'],
            },
            {
              icon: Mail,
              title: 'Email & Retention',
              items: ['Cart Recovery', 'Win-back Campaigns', 'Post-Purchase', 'Loyalty Programs', 'Review Requests'],
            },
          ],
        },
        whyNeedHelp: {
          title: 'Why eCommerce Marketing Is Different',
          description: 'Online stores require specialized strategies across product ads, retargeting, and lifecycle marketing.',
          points: [
            'Drive qualified traffic to products',
            'Optimize conversion rates',
            'Recover abandoned carts',
            'Build customer lifetime value',
          ],
          conclusion: 'eCommerce success requires a full-funnel, data-driven approach.',
        },
        approach: {
          title: 'Our eCommerce Approach',
          dontBelieve: [
            'Only running traffic campaigns',
            'Ignoring post-purchase experience',
            'Treating all customers the same',
          ],
          believe: [
            'Full-funnel marketing strategy',
            'Retention equals acquisition',
            'Segmentation and personalization',
            'Continuous testing and optimization',
          ],
        },
        supportGrowth: {
          title: 'How We Scale Online Stores',
          steps: [
            { title: 'Audit', description: 'store analysis & opportunity identification' },
            { title: 'Strategy', description: 'traffic, conversion & retention plans' },
            { title: 'Implementation', description: 'ads, email, CRO setup' },
            { title: 'Optimization', description: 'test, learn, improve, scale' },
            { title: 'Scale', description: 'expand channels, increase budgets' },
          ],
          tagline: 'A proven framework for profitable eCommerce growth.',
        },
        individualServices: [],
        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from eCommerce marketing:',
          outcomes: [
            '30-50% increase in online revenue',
            '3-5x ROAS on product ads',
            '15-20% of sales from email',
            'Reduced cart abandonment',
            'Higher average order value',
          ],
        },
        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Online stores that:',
          criteria: [
            'Want to scale beyond organic traffic',
            'Have product-market fit',
            'Are ready to invest in growth',
            'Value data-driven optimization',
          ],
        },
        closingMessage: {
          title: "Let's Scale Your Online Store",
          message: "eCommerce growth isn't about luck. It's about systematic optimization across every touchpoint.",
          tagline: 'We help online stores grow profitably through proven marketing strategies.',
        },
      },

      // ANALYTICS & REPORTING
      'analytics-reporting': {
        title: 'Analytics & Reporting Services',
        metaDescription: 'Professional analytics setup, tracking, dashboards & reporting. GA4, conversion tracking, attribution modeling & data-driven insights.',
        hero: {
          headline: 'Make Better Decisions with Data-Driven Analytics & Insights',
          subheadline: 'We set up comprehensive tracking, create custom dashboards, and provide actionable insights that help you understand performance and optimize for growth.',
          badges: ['GA4 Expert', 'Custom Dashboards', 'Actionable Insights'],
          description: "If you want to understand what's working and why — you're in the right place.",
        },
        trustBar: [
          'GA4 Certified Experts',
          '100+ Tracking Setups',
          'Custom Dashboards',
          'Attribution Modeling',
          'Actionable Reports',
        ],
        servicesOverview: {
          title: 'Complete Analytics Solutions',
          services: [
            {
              icon: BarChart3,
              title: 'Tracking Setup',
              items: ['GA4 Setup', 'Conversion Tracking', 'Event Tracking', 'Ecommerce Tracking', 'Cross-Domain'],
            },
            {
              icon: Target,
              title: 'Dashboards & Reporting',
              items: ['Looker Studio', 'Custom Dashboards', 'Automated Reports', 'KPI Tracking', 'Executive Summaries'],
            },
            {
              icon: TrendingUp,
              title: 'Analysis & Insights',
              items: ['Performance Analysis', 'Attribution Modeling', 'Funnel Analysis', 'User Behavior', 'Recommendations'],
            },
          ],
        },
        whyNeedHelp: {
          title: 'Why Analytics Matter',
          description: "You can't improve what you can't measure.",
          points: [
            'Understand which channels drive results',
            'Identify optimization opportunities',
            'Make data-driven decisions',
            'Prove ROI to stakeholders',
          ],
          conclusion: 'Good analytics turn data into competitive advantage.',
        },
        approach: {
          title: 'Our Analytics Approach',
          dontBelieve: [
            'Vanity metrics without context',
            'One-size-fits-all dashboards',
            'Reports without recommendations',
          ],
          believe: [
            'Focus on actionable metrics',
            'Custom tracking for your business',
            'Insights that drive decisions',
            'Regular optimization reviews',
          ],
        },
        supportGrowth: {
          title: 'How We Implement Analytics',
          steps: [
            { title: 'Audit', description: 'review current tracking & gaps' },
            { title: 'Setup', description: 'GA4, conversions, events & goals' },
            { title: 'Dashboards', description: 'custom reports for your KPIs' },
            { title: 'Analysis', description: 'monthly performance reviews' },
            { title: 'Optimize', description: 'recommendations & action items' },
          ],
          tagline: 'A complete analytics system for informed decision-making.',
        },
        individualServices: [],
        expectations: {
          title: 'What You Can Expect',
          subtitle: 'Real outcomes from analytics:',
          outcomes: [
            'Accurate tracking of all conversions',
            'Clear understanding of channel performance',
            'Custom dashboards updated in real-time',
            'Monthly insights and recommendations',
            'Data-driven optimization decisions',
          ],
        },
        idealFor: {
          title: 'Who This Works Best For',
          subtitle: 'Businesses that:',
          criteria: [
            'Run multiple marketing channels',
            'Need clear ROI visibility',
            'Want to optimize based on data',
            'Value transparency and accountability',
          ],
        },
        closingMessage: {
          title: "Let's Turn Data Into Growth",
          message: "Analytics isn't about drowning in data. It's about having the right insights to make better decisions.",
          tagline: 'We set up tracking and reporting that drives smarter marketing.',
        },
      },
    };

    return services[slug || 'digital-marketing'];
  };

  const service = getServiceContent();
  
  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[30px] font-medium mb-4">Service Not Found</h1>
          <Link to="/services" className="text-yellow-500 hover:text-yellow-400">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const seoData = useSEO(`/services/${slug}`);

  return (
    <>
      <SEOHeadSSG
        title={seoData.title}
        description={service.metaDescription}
        keywords={seoData.keywords || []}
        canonical={`https://inchtomilez.in/services/${slug}`}
      />

      <StructuredData schema={organizationSchema} />
      <StructuredData schema={getWebPageSchema(
        service.title,
        service.metaDescription,
        `https://inchtomilez.in/services/${slug}`
      )} />

      <div className="min-h-screen bg-black text-white">
        {/* SECTION 1: HERO */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-[15px] text-gray-400 hover:text-yellow-500 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>

            <h1 className="text-[30px] md:text-[42px] font-medium mb-6 max-w-4xl leading-tight">
              {service.hero.headline}
            </h1>

            <p className="text-[17px] text-gray-300 mb-6 max-w-3xl leading-relaxed">
              {service.hero.subheadline}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {service.hero.badges.map((badge: string, index: number) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[14px] bg-yellow-500/10 text-yellow-500 rounded-full border border-yellow-500/20"
                >
                  <CheckCircle className="w-4 h-4" />
                  {badge}
                </span>
              ))}
            </div>

            <p className="text-[16px] text-white mb-8 max-w-2xl">
              👉 {service.hero.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:+919669988666"
                className="inline-flex items-center gap-2 px-6 py-3 text-[15px] font-semibold bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call: +91 96699 88666
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-[15px] font-semibold bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10"
              >
                Get Your Growth Plan
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: TRUST BAR */}
        <section className="py-8 border-y border-white/10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              {service.trustBar.map((item: string, index: number) => (
                <div key={index} className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-[14px] text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: ALL SERVICES OVERVIEW (BENTO GRID) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-black to-black/50">
          <div className="container mx-auto px-6">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-12 text-center">
              {service.servicesOverview.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {service.servicesOverview.services.map((item: any, index: number) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-yellow-500 mb-4" />
                    <h3 className="text-[18px] font-medium mb-3">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.items.map((service: string, idx: number) => (
                        <li key={idx} className="text-[14px] text-gray-400 flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: WHY BUSINESSES NEED HELP */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4">
                {service.whyNeedHelp.title}
              </h2>
              <p className="text-[17px] text-gray-300 mb-8">
                {service.whyNeedHelp.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                {service.whyNeedHelp.points.map((point: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] text-gray-300">{point}</span>
                  </div>
                ))}
              </div>

              <p className="text-[17px] font-medium text-white">
                {service.whyNeedHelp.conclusion}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: OUR APPROACH */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-black/50 to-black">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-12 text-center">
                {service.approach.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Don't Believe */}
                <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                  <h3 className="text-[18px] font-medium mb-4 text-red-400">
                    We don't believe in:
                  </h3>
                  <ul className="space-y-3">
                    {service.approach.dontBelieve.map((item: string, index: number) => (
                      <li key={index} className="text-[15px] text-gray-400 flex items-start gap-2">
                        <span className="text-red-400">❌</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Believe */}
                <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
                  <h3 className="text-[18px] font-medium mb-4 text-green-400">
                    We believe in:
                  </h3>
                  <ul className="space-y-3">
                    {service.approach.believe.map((item: string, index: number) => (
                      <li key={index} className="text-[15px] text-gray-400 flex items-start gap-2">
                        <span className="text-green-400">✅</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: HOW WE SUPPORT GROWTH */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-12">
                {service.supportGrowth.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                {service.supportGrowth.steps.map((step: any, index: number) => (
                  <div key={index} className="relative">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-500/30 transition-all">
                      <div className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold mb-4 mx-auto">
                        {index + 1}
                      </div>
                      <h3 className="text-[16px] font-medium mb-2">{step.title}</h3>
                      <p className="text-[13px] text-gray-400">{step.description}</p>
                    </div>
                    {index < service.supportGrowth.steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-yellow-500/30" />
                    )}
                  </div>
                ))}
              </div>

              <p className="text-[17px] text-gray-300 italic">
                {service.supportGrowth.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* SECTIONS 7-20: INDIVIDUAL SERVICES */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-black to-black/50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.individualServices.map((item: any, index: number) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-500/20 transition-all"
                    >
                      <Icon className="w-8 h-8 text-yellow-500 mb-4" />
                      <h3 className="text-[20px] font-medium mb-2">{item.title}</h3>
                      <p className="text-[15px] text-gray-400 mb-4">{item.subtitle}</p>
                      <ul className="space-y-2">
                        {item.benefits.map((benefit: string, idx: number) => (
                          <li key={idx} className="text-[14px] text-gray-300 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 21: WHAT YOU CAN EXPECT */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4">
                {service.expectations.title}
              </h2>
              <p className="text-[16px] text-gray-400 mb-8">
                {service.expectations.subtitle}
              </p>

              <div className="grid grid-cols-1 gap-4 text-left">
                {service.expectations.outcomes.map((outcome: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                    <span className="text-[20px]">🎯</span>
                    <span className="text-[15px] text-gray-300">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 22: WHO THIS WORKS FOR */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-black/50 to-black">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-4">
                {service.idealFor.title}
              </h2>
              <p className="text-[16px] text-gray-400 mb-8">
                {service.idealFor.subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.idealFor.criteria.map((criterion: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] text-gray-300">{criterion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 23: CLOSING MESSAGE */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">
                {service.closingMessage.title}
              </h2>
              <p className="text-[17px] text-gray-300 mb-4 leading-relaxed">
                {service.closingMessage.message}
              </p>
              <p className="text-[17px] text-white font-medium">
                {service.closingMessage.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 24: FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-black to-black/50">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-[20px] md:text-[22px] font-bold mb-6">
                If you want a clear, supportive, results-focused partner:
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+919669988666"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call: +91 96699 88666
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                >
                  Request Your Growth Plan
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 25: FOOTER NOTE */}
        <section className="py-8 border-t border-white/10">
          <div className="container mx-auto px-6 text-center">
            <p className="text-[14px] text-gray-400">
              {service.title} | SEO • Ads • Social • Web • Automation
            </p>
            <p className="text-[13px] text-gray-500 mt-2">
              Helping brands grow responsibly and effectively.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
