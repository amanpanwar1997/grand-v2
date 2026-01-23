import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, TrendingUp, Target, Users, Award, Sparkles, BarChart3, CheckCircle, Star, Shield } from 'lucide-react';
import { Badge } from '../ui/badge';
import { BentoGrid2 } from '../layout/BentoGrid2';
import { AutoCarousel } from '../ui/AutoCarousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { useSEO, StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/seo-system';

export function IndustryDetailPage() {
  const { slug } = useParams();

  const industryData: Record<string, any> = {
    'healthcare': {
      title: 'Healthcare',
      description: 'Specialized marketing solutions for healthcare providers, helping you connect with patients and build trust in a highly regulated industry.',
      tagline: 'Building Trust Through Digital Excellence',
      challenges: [
        'Patient acquisition and retention',
        'HIPAA compliance in marketing',
        'Building trust and credibility',
        'Reputation management',
      ],
      solutions: [
        'Healthcare SEO and local search optimization',
        'HIPAA-compliant digital marketing',
        'Patient engagement strategies',
        'Medical content marketing',
        'Healthcare website development',
        'Online reputation management',
      ],
      stats: [
        { metric: '300%', label: 'ROI Increase', description: 'Multi-specialty hospital campaign' },
        { metric: '2,400+', label: 'Patient Leads', description: 'Generated in 6 months' },
        { metric: '#1', label: 'Local Rankings', description: 'Average position in 90 days' },
        { metric: '4.8★', label: 'Avg Review Rating', description: 'Across 12 clinics' },
      ],
      services: [
        { name: 'Local SEO for Clinics', description: 'Dominate local search results and Google Maps', icon: Target },
        { name: 'Patient Acquisition', description: 'Drive qualified appointments through digital channels', icon: Users },
        { name: 'Healthcare Content', description: 'Medical blogs, videos, and educational content', icon: BarChart3 },
        { name: 'Reputation Management', description: 'Monitor and improve online reviews', icon: Award },
      ],
      successStories: [
        { client: 'Multi-Specialty Hospital, Indore', result: '300% ROI increase', timeframe: '6 months' },
        { client: 'Dental Clinic Network', result: '2,400 new patient leads', timeframe: '12 months' },
        { client: 'Cosmetic Surgery Center', result: '#1 ranking for 47 keywords', timeframe: '90 days' },
      ],
    },
    'education': {
      title: 'Education',
      description: 'Digital marketing strategies for educational institutions, helping you attract and enroll more students through data-driven campaigns.',
      tagline: 'Driving Student Enrollment Through Digital Innovation',
      challenges: [
        'Student acquisition and enrollment',
        'Brand differentiation in competitive markets',
        'Parent and student engagement',
        'Online reputation management',
      ],
      solutions: [
        'Education SEO and local search',
        'Social media marketing for schools',
        'Lead generation campaigns',
        'Parent-focused content marketing',
        'Admission funnel optimization',
        'Virtual campus tours',
      ],
      stats: [
        { metric: '2,000+', label: 'Enrollments', description: 'Coaching institute in 6 months' },
        { metric: '450%', label: 'Lead Growth', description: 'International school campaign' },
        { metric: '₹35L', label: 'Ad Spend ROI', description: '12X return on investment' },
        { metric: '90%', label: 'Enrollment Rate', description: 'From digital campaigns' },
      ],
      services: [
        { name: 'Enrollment Marketing', description: 'Fill seats with qualified students', icon: Users },
        { name: 'Parent Engagement', description: 'Build trust with decision-makers', icon: Award },
        { name: 'Education Content', description: 'Blogs, videos, and success stories', icon: BarChart3 },
        { name: 'Virtual Events', description: 'Webinars and online open houses', icon: Sparkles },
      ],
      successStories: [
        { client: 'Excel Coaching Institute', result: '2,000+ student enrollments', timeframe: '6 months' },
        { client: 'International School', result: '450% increase in inquiries', timeframe: '1 year' },
        { client: 'E-Learning Platform', result: '10,000+ course sign-ups', timeframe: '3 months' },
      ],
    },
    'real-estate': {
      title: 'Real Estate',
      description: 'Proven marketing strategies for real estate developers, brokers, and consultants to generate high-quality leads and accelerate property sales.',
      tagline: 'Turning Leads Into Property Sales',
      challenges: [
        'Generating high-quality leads',
        'Long sales cycles',
        'Building brand credibility',
        'Showcasing properties digitally',
      ],
      solutions: [
        'Real estate SEO and PPC',
        'Facebook and Google Lead Ads',
        'Virtual property tours',
        'Landing page optimization',
        'CRM integration',
        'Retargeting campaigns',
      ],
      stats: [
        { metric: '200+', label: 'Leads/Month', description: 'High-quality buyer leads' },
        { metric: '32%', label: 'Conversion Rate', description: 'Lead to site visit' },
        { metric: '85%', label: 'Quality Score', description: 'Qualified prospects' },
        { metric: '3x', label: 'ROI Growth', description: 'Year over year' },
      ],
      services: [
        { name: 'Lead Generation', description: 'Facebook, Google, and WhatsApp campaigns', icon: Target },
        { name: 'Virtual Tours', description: '360° property showcases', icon: Sparkles },
        { name: 'SEO for Developers', description: 'Rank for high-value property keywords', icon: TrendingUp },
        { name: 'CRM Automation', description: 'Lead nurturing and follow-up', icon: BarChart3 },
      ],
      successStories: [
        { client: 'Premier Developers', result: '200+ monthly qualified leads', timeframe: '9 months' },
        { client: 'Luxury Villas Project', result: '32% conversion rate achieved', timeframe: '6 months' },
        { client: 'Commercial Real Estate', result: '3x ROI improvement', timeframe: '1 year' },
      ],
    },
    'technology': {
      title: 'Technology',
      description: 'Strategic marketing for SaaS platforms, IT services, software companies, and tech startups. Drive user acquisition, product adoption, and sustainable growth.',
      tagline: 'Accelerating Growth for Tech Companies',
      challenges: [
        'Product adoption and user acquisition',
        'Complex product positioning',
        'Long B2B sales cycles',
        'Competitive market differentiation',
      ],
      solutions: [
        'SaaS marketing and growth strategies',
        'Product-led growth campaigns',
        'Technical content marketing',
        'B2B lead generation',
        'Product launch strategies',
        'Community building',
      ],
      stats: [
        { metric: '10,000+', label: 'Users Acquired', description: 'SaaS platform in 8 months' },
        { metric: '5x', label: 'MRR Growth', description: 'Year-over-year increase' },
        { metric: '35%', label: 'Trial to Paid', description: 'Conversion improvement' },
        { metric: '₹50L+', label: 'Pipeline Value', description: 'Generated monthly' },
      ],
      services: [
        { name: 'SaaS Marketing', description: 'User acquisition and retention strategies', icon: Target },
        { name: 'Product Launch', description: 'GTM strategy and execution', icon: Sparkles },
        { name: 'Technical Content', description: 'Developer-focused content marketing', icon: BarChart3 },
        { name: 'B2B Lead Gen', description: 'Enterprise sales pipeline', icon: Users },
      ],
      successStories: [
        { client: 'B2B SaaS Platform', result: '10,000+ users acquired', timeframe: '8 months' },
        { client: 'IT Services Company', result: '5x MRR growth achieved', timeframe: '12 months' },
        { client: 'Software Startup', result: '₹50L+ monthly pipeline', timeframe: '6 months' },
      ],
    },
    'finance': {
      title: 'Finance',
      description: 'Compliance-aware marketing for banks, NBFCs, insurance, fintech, and investment firms. Build trust while generating quality leads in a regulated industry.',
      tagline: 'Trust-Building Marketing for Financial Services',
      challenges: [
        'Regulatory compliance in marketing',
        'Building trust and credibility',
        'Complex product education',
        'High customer acquisition costs',
      ],
      solutions: [
        'Compliance-aware digital marketing',
        'Financial content marketing',
        'Trust-building strategies',
        'Educational campaigns',
        'Lead nurturing funnels',
        'Financial advisor marketing',
      ],
      stats: [
        { metric: '1,200+', label: 'Quality Leads', description: 'Insurance company in 6 months' },
        { metric: '28%', label: 'Lead to Customer', description: 'Conversion rate' },
        { metric: '4.5x', label: 'ROAS', description: 'Return on ad spend' },
        { metric: '85%', label: 'Compliance Rate', description: 'Ad approval success' },
      ],
      services: [
        { name: 'Fintech Marketing', description: 'Digital-first financial services', icon: TrendingUp },
        { name: 'Compliance Marketing', description: 'Regulatory-aware campaigns', icon: Shield },
        { name: 'Investment Lead Gen', description: 'High-value prospect acquisition', icon: Target },
        { name: 'Financial Content', description: 'Educational blogs and videos', icon: BarChart3 },
      ],
      successStories: [
        { client: 'Insurance Provider', result: '1,200+ qualified leads', timeframe: '6 months' },
        { client: 'Fintech Startup', result: '4.5x ROAS achieved', timeframe: '9 months' },
        { client: 'Investment Firm', result: '28% lead conversion rate', timeframe: '1 year' },
      ],
    },
    'hospitality': {
      title: 'Hospitality',
      description: 'Digital marketing for hotels, resorts, restaurants, cafes, and cloud kitchens. Increase bookings, online orders, and brand visibility.',
      tagline: 'Filling Tables and Rooms Through Digital Excellence',
      challenges: [
        'Seasonal booking fluctuations',
        'Online ordering competition',
        'Review and reputation management',
        'Local visibility and discovery',
      ],
      solutions: [
        'Restaurant SEO and local search',
        'Online ordering optimization',
        'Hotel booking campaigns',
        'Social media for hospitality',
        'Food photography and videography',
        'Reputation management',
      ],
      stats: [
        { metric: '400%', label: 'Online Orders', description: 'Cloud kitchen growth' },
        { metric: '85%', label: 'Occupancy Rate', description: 'Resort booking increase' },
        { metric: '4.7★', label: 'Review Rating', description: 'Average across clients' },
        { metric: '250+', label: 'Daily Orders', description: 'Restaurant during peak' },
      ],
      services: [
        { name: 'Restaurant Marketing', description: 'Drive dine-in and online orders', icon: Users },
        { name: 'Hotel Booking Ads', description: 'Direct bookings via campaigns', icon: Target },
        { name: 'Food Content', description: 'Professional photography & videos', icon: Sparkles },
        { name: 'Local SEO', description: 'Dominate local food searches', icon: TrendingUp },
      ],
      successStories: [
        { client: 'Cloud Kitchen Chain', result: '400% online order increase', timeframe: '6 months' },
        { client: 'Boutique Resort', result: '85% occupancy achieved', timeframe: '9 months' },
        { client: 'Multi-Cuisine Restaurant', result: '250+ daily orders', timeframe: '3 months' },
      ],
    },
    'automotive': {
      title: 'Automotive',
      description: 'Marketing solutions for automotive dealerships, service centers, and accessories. Generate test drives, service bookings, and parts sales.',
      tagline: 'Driving Sales and Service Appointments',
      challenges: [
        'Generating quality test drive leads',
        'Service appointment bookings',
        'Brand vs dealer marketing',
        'Long consideration cycles',
      ],
      solutions: [
        'Automotive SEO and local search',
        'Test drive lead generation',
        'Service center marketing',
        'Vehicle showcase campaigns',
        'Automotive content marketing',
        'CRM and lead nurturing',
      ],
      stats: [
        { metric: '800+', label: 'Test Drives', description: 'Dealership in 12 months' },
        { metric: '35%', label: 'Test to Sale', description: 'Conversion rate' },
        { metric: '1,500+', label: 'Service Bookings', description: 'Monthly average' },
        { metric: '4x', label: 'ROI', description: 'On digital campaigns' },
      ],
      services: [
        { name: 'Dealership Marketing', description: 'Test drive and showroom visits', icon: Target },
        { name: 'Service Marketing', description: 'Appointment and recall campaigns', icon: Users },
        { name: 'Parts & Accessories', description: 'E-commerce and retail sales', icon: Award },
        { name: 'Video Showcases', description: 'Vehicle tours and testimonials', icon: Sparkles },
      ],
      successStories: [
        { client: 'Premium Car Dealership', result: '800+ test drives booked', timeframe: '12 months' },
        { client: 'Multi-Brand Service Center', result: '1,500+ monthly bookings', timeframe: '6 months' },
        { client: 'Auto Accessories Store', result: '4x ROI on campaigns', timeframe: '9 months' },
      ],
    },
    'fashion': {
      title: 'Fashion & Retail',
      description: 'E-commerce and social commerce strategies for fashion brands, jewelry, accessories, and lifestyle products. Drive online sales and brand awareness.',
      tagline: 'Building Fashion Brands Online',
      challenges: [
        'Standing out in crowded markets',
        'Social commerce optimization',
        'Seasonal inventory management',
        'Building brand loyalty',
      ],
      solutions: [
        'Fashion e-commerce marketing',
        'Instagram and social commerce',
        'Influencer collaborations',
        'Fashion content creation',
        'Seasonal campaign planning',
        'Customer retention strategies',
      ],
      stats: [
        { metric: '300%', label: 'Online Sales', description: 'Fashion brand growth' },
        { metric: '50K+', label: 'Social Followers', description: 'Gained in 6 months' },
        { metric: '12%', label: 'Repeat Purchase', description: 'Rate improvement' },
        { metric: '₹25L', label: 'Monthly Revenue', description: 'From Instagram' },
      ],
      services: [
        { name: 'Fashion E-commerce', description: 'Shopify, WooCommerce optimization', icon: Target },
        { name: 'Social Commerce', description: 'Instagram Shop, Facebook Shop', icon: Users },
        { name: 'Fashion Content', description: 'Lookbooks, reels, product shoots', icon: Sparkles },
        { name: 'Influencer Marketing', description: 'Collaborations and campaigns', icon: Award },
      ],
      successStories: [
        { client: 'Women\'s Fashion Brand', result: '300% online sales growth', timeframe: '8 months' },
        { client: 'Jewelry E-commerce', result: '₹25L monthly Instagram revenue', timeframe: '6 months' },
        { client: 'Lifestyle Brand', result: '50K+ social followers', timeframe: '6 months' },
      ],
    },
    'legal': {
      title: 'Legal',
      description: 'Professional marketing for law firms, corporate legal services, and compliance consultants. Generate quality leads while maintaining professional standards.',
      tagline: 'Building Authority for Legal Professionals',
      challenges: [
        'Professional ethics and regulations',
        'High-value client acquisition',
        'Establishing thought leadership',
        'Long client decision cycles',
      ],
      solutions: [
        'Legal content marketing',
        'Thought leadership positioning',
        'Legal SEO and local search',
        'LinkedIn marketing for lawyers',
        'Professional website development',
        'Client testimonial campaigns',
      ],
      stats: [
        { metric: '150+', label: 'Quality Leads', description: 'Corporate law firm yearly' },
        { metric: '₹1.2Cr', label: 'Client Value', description: 'From digital marketing' },
        { metric: '#1', label: 'Local Rankings', description: 'For target practice areas' },
        { metric: '40%', label: 'Lead to Client', description: 'Conversion rate' },
      ],
      services: [
        { name: 'Legal SEO', description: 'Rank for practice area keywords', icon: TrendingUp },
        { name: 'Content Marketing', description: 'Legal blogs and whitepapers', icon: BarChart3 },
        { name: 'LinkedIn Marketing', description: 'Professional network building', icon: Users },
        { name: 'Website Development', description: 'Professional law firm sites', icon: Target },
      ],
      successStories: [
        { client: 'Corporate Law Firm', result: '150+ quality leads yearly', timeframe: '12 months' },
        { client: 'IP Law Practice', result: '₹1.2Cr client value generated', timeframe: '18 months' },
        { client: 'Litigation Practice', result: '40% lead conversion rate', timeframe: '9 months' },
      ],
    },
    'manufacturing': {
      title: 'Manufacturing',
      description: 'B2B marketing for industrial manufacturing, suppliers, and distributors. Generate quality leads and build brand authority in your industry.',
      tagline: 'Connecting Manufacturers with Buyers',
      challenges: [
        'Long B2B sales cycles',
        'Complex product specifications',
        'Limited digital presence',
        'Finding qualified buyers',
      ],
      solutions: [
        'B2B industrial marketing',
        'LinkedIn lead generation',
        'Technical content marketing',
        'Trade show digital support',
        'Manufacturing website development',
        'Buyer journey optimization',
      ],
      stats: [
        { metric: '200+', label: 'B2B Leads', description: 'Industrial supplier yearly' },
        { metric: '₹2Cr+', label: 'Pipeline Value', description: 'Generated annually' },
        { metric: '25%', label: 'Lead Quality', description: 'Enterprise-ready prospects' },
        { metric: '8x', label: 'ROI', description: 'LinkedIn campaigns' },
      ],
      services: [
        { name: 'B2B Lead Generation', description: 'LinkedIn and Google campaigns', icon: Target },
        { name: 'Technical Content', description: 'Case studies and whitepapers', icon: BarChart3 },
        { name: 'Industrial SEO', description: 'Rank for product categories', icon: TrendingUp },
        { name: 'Website Development', description: 'B2B manufacturing sites', icon: Users },
      ],
      successStories: [
        { client: 'Industrial Equipment Supplier', result: '200+ B2B leads yearly', timeframe: '12 months' },
        { client: 'Manufacturing Components', result: '2Cr+ pipeline generated', timeframe: '18 months' },
        { client: 'Auto Parts Distributor', result: '8x ROI on LinkedIn', timeframe: '9 months' },
      ],
    },
    'agriculture': {
      title: 'Agriculture',
      description: 'Digital marketing for agritech, farming equipment, organic products, and food processing. Reach both urban and rural markets effectively.',
      tagline: 'Growing Agriculture Businesses Digitally',
      challenges: [
        'Reaching rural farmer audiences',
        'Seasonal product demand',
        'Building trust in new products',
        'Distribution channel marketing',
      ],
      solutions: [
        'Agriculture marketing strategies',
        'Rural digital outreach',
        'Product education campaigns',
        'Dealer and distributor marketing',
        'Agritech app marketing',
        'Farmer community building',
      ],
      stats: [
        { metric: '50,000+', label: 'Farmers Reached', description: 'Agritech platform' },
        { metric: '250+', label: 'Dealers Onboarded', description: 'Equipment manufacturer' },
        { metric: '35%', label: 'Sales Growth', description: 'Organic products brand' },
        { metric: '10K+', label: 'App Downloads', description: 'Agriculture advisory app' },
      ],
      services: [
        { name: 'Agritech Marketing', description: 'App downloads and adoption', icon: Target },
        { name: 'Dealer Marketing', description: 'Distribution network growth', icon: Users },
        { name: 'Farmer Outreach', description: 'Rural digital campaigns', icon: Award },
        { name: 'Product Education', description: 'Video content and demos', icon: Sparkles },
      ],
      successStories: [
        { client: 'Agritech Platform', result: '50,000+ farmers onboarded', timeframe: '12 months' },
        { client: 'Farm Equipment Brand', result: '250+ dealers recruited', timeframe: '9 months' },
        { client: 'Organic Food Brand', result: '35% sales growth', timeframe: '6 months' },
      ],
    },
    'logistics': {
      title: 'Logistics',
      description: 'Marketing solutions for shipping, courier services, warehousing, and supply chain companies. Generate leads and build brand trust.',
      tagline: 'Moving Logistics Businesses Forward',
      challenges: [
        'Service differentiation in commodity market',
        'Building corporate client trust',
        'Showcasing reliability and speed',
        'B2B client acquisition',
      ],
      solutions: [
        'Logistics SEO and local search',
        'B2B lead generation',
        'Corporate website development',
        'Service explainer content',
        'Customer testimonial campaigns',
        'Quote request optimization',
      ],
      stats: [
        { metric: '300+', label: 'B2B Leads', description: 'Courier company yearly' },
        { metric: '45%', label: 'Quote Conversion', description: 'Request to booking' },
        { metric: '₹3Cr', label: 'Client Value', description: 'From digital channels' },
        { metric: '#1', label: 'Local Rankings', description: 'Logistics services' },
      ],
      services: [
        { name: 'Logistics SEO', description: 'Rank for service keywords', icon: TrendingUp },
        { name: 'B2B Lead Gen', description: 'Corporate client acquisition', icon: Target },
        { name: 'Website Development', description: 'Professional logistics sites', icon: Users },
        { name: 'Content Marketing', description: 'Service showcase content', icon: BarChart3 },
      ],
      successStories: [
        { client: 'Courier Service Company', result: '300+ B2B leads yearly', timeframe: '12 months' },
        { client: 'Warehousing Provider', result: '45% quote conversion rate', timeframe: '9 months' },
        { client: 'Supply Chain Solutions', result: '₹3Cr client value added', timeframe: '18 months' },
      ],
    },
    'construction': {
      title: 'Construction',
      description: 'Marketing strategies for builders, contractors, interior designers, and architects. Generate project leads and build portfolio visibility.',
      tagline: 'Building Construction Brands Online',
      challenges: [
        'Long project sales cycles',
        'Showcasing project portfolio',
        'Building credibility and trust',
        'High-value lead generation',
      ],
      solutions: [
        'Construction company SEO',
        'Project portfolio showcase',
        'Lead generation campaigns',
        'Before-after content marketing',
        'Video testimonials',
        'Local market domination',
      ],
      stats: [
        { metric: '120+', label: 'Project Leads', description: 'Construction company yearly' },
        { metric: '₹5Cr+', label: 'Project Value', description: 'Pipeline generated' },
        { metric: '35%', label: 'Lead Conversion', description: 'Inquiry to project' },
        { metric: '250%', label: 'Web Traffic', description: 'Growth in 12 months' },
      ],
      services: [
        { name: 'Construction SEO', description: 'Local and service keywords', icon: TrendingUp },
        { name: 'Portfolio Marketing', description: 'Project showcase websites', icon: Sparkles },
        { name: 'Lead Generation', description: 'High-value project leads', icon: Target },
        { name: 'Video Content', description: 'Project tours and testimonials', icon: Users },
      ],
      successStories: [
        { client: 'Construction Company', result: '120+ project leads', timeframe: '12 months' },
        { client: 'Interior Design Firm', result: '₹5Cr+ pipeline value', timeframe: '18 months' },
        { client: 'Architecture Studio', result: '35% lead conversion rate', timeframe: '9 months' },
      ],
    },
    'retail': {
      title: 'Retail',
      description: 'Local marketing strategies for brick-and-mortar stores, franchises, and local shops. Drive foot traffic and build community presence.',
      tagline: 'Bringing Customers to Your Store',
      challenges: [
        'Competing with online retailers',
        'Local foot traffic generation',
        'Building customer loyalty',
        'Multi-location marketing',
      ],
      solutions: [
        'Local SEO and Google My Business',
        'Geo-targeted advertising',
        'Local social media marketing',
        'In-store promotion campaigns',
        'Customer loyalty programs',
        'Multi-location management',
      ],
      stats: [
        { metric: '40%', label: 'Foot Traffic', description: 'Increase in 6 months' },
        { metric: '4.8★', label: 'Google Rating', description: 'Average store rating' },
        { metric: '2,500+', label: 'Local Searches', description: 'Monthly visibility' },
        { metric: '25%', label: 'Repeat Customers', description: 'Rate improvement' },
      ],
      services: [
        { name: 'Local SEO', description: 'Dominate local searches', icon: TrendingUp },
        { name: 'Google My Business', description: 'Optimize store profiles', icon: Target },
        { name: 'Local Advertising', description: 'Geo-targeted campaigns', icon: Users },
        { name: 'Loyalty Marketing', description: 'Repeat customer programs', icon: Award },
      ],
      successStories: [
        { client: 'Retail Chain (5 stores)', result: '40% foot traffic increase', timeframe: '6 months' },
        { client: 'Local Boutique', result: '4.8★ Google rating achieved', timeframe: '3 months' },
        { client: 'Franchise Network', result: '2,500+ monthly searches', timeframe: '9 months' },
      ],
    },
    'energy': {
      title: 'Energy',
      description: 'B2B marketing for solar, renewables, energy consultants, and utilities. Generate leads and build authority in the clean energy sector.',
      tagline: 'Powering Clean Energy Growth',
      challenges: [
        'Complex B2B sales process',
        'Technical product education',
        'Long ROI consideration cycles',
        'Government policy dependencies',
      ],
      solutions: [
        'Energy sector B2B marketing',
        'Solar lead generation',
        'Technical content marketing',
        'ROI calculators and tools',
        'Government scheme awareness',
        'Commercial client targeting',
      ],
      stats: [
        { metric: '500+', label: 'Solar Leads', description: 'Generated yearly' },
        { metric: '₹8Cr', label: 'Project Pipeline', description: 'Commercial installations' },
        { metric: '30%', label: 'Lead Conversion', description: 'Inquiry to installation' },
        { metric: '200+', label: 'B2B Clients', description: 'Acquired in 18 months' },
      ],
      services: [
        { name: 'Solar Marketing', description: 'Residential and commercial leads', icon: Target },
        { name: 'B2B Energy Marketing', description: 'Corporate client acquisition', icon: Users },
        { name: 'Technical Content', description: 'Educational blogs and videos', icon: BarChart3 },
        { name: 'ROI Tools', description: 'Savings calculators', icon: TrendingUp },
      ],
      successStories: [
        { client: 'Solar Installation Company', result: '500+ leads yearly', timeframe: '12 months' },
        { client: 'Energy Consultant', result: '₹8Cr project pipeline', timeframe: '18 months' },
        { client: 'Renewable Energy Firm', result: '30% conversion rate', timeframe: '9 months' },
      ],
    },
    'non-profit': {
      title: 'Non-Profit',
      description: 'Digital marketing for NGOs, charities, foundations, and social enterprises. Drive awareness, donations, and volunteer engagement.',
      tagline: 'Amplifying Social Impact Through Digital',
      challenges: [
        'Limited marketing budgets',
        'Donor acquisition and retention',
        'Volunteer recruitment',
        'Building trust and transparency',
      ],
      solutions: [
        'Non-profit digital strategy',
        'Donor acquisition campaigns',
        'Volunteer recruitment marketing',
        'Impact storytelling',
        'Social media for cause marketing',
        'Grant writing support',
      ],
      stats: [
        { metric: '₹2Cr+', label: 'Donations Raised', description: 'NGO in 18 months' },
        { metric: '5,000+', label: 'Volunteers', description: 'Recruited through campaigns' },
        { metric: '50K+', label: 'Social Reach', description: 'Per campaign average' },
        { metric: '35%', label: 'Donor Retention', description: 'Rate improvement' },
      ],
      services: [
        { name: 'Donor Marketing', description: 'Acquisition and retention', icon: Target },
        { name: 'Volunteer Recruitment', description: 'Campaign and community building', icon: Users },
        { name: 'Impact Storytelling', description: 'Videos and case studies', icon: Sparkles },
        { name: 'Social Media', description: 'Cause awareness campaigns', icon: Award },
      ],
      successStories: [
        { client: 'Education NGO', result: '₹2Cr+ donations raised', timeframe: '18 months' },
        { client: 'Environmental Foundation', result: '5,000+ volunteers recruited', timeframe: '12 months' },
        { client: 'Health Charity', result: '35% donor retention growth', timeframe: '9 months' },
      ],
    },
    'sports': {
      title: 'Sports & Fitness',
      description: 'Marketing strategies for gyms, sports clubs, fitness coaches, and wellness centers. Drive memberships, bookings, and community engagement.',
      tagline: 'Building Fitness Communities Online',
      challenges: [
        'Member acquisition and retention',
        'Standing out in competitive markets',
        'Seasonal membership fluctuations',
        'Class booking optimization',
      ],
      solutions: [
        'Fitness marketing strategies',
        'Membership lead generation',
        'Social media fitness content',
        'Class booking optimization',
        'Trainer personal branding',
        'Community building',
      ],
      stats: [
        { metric: '800+', label: 'Memberships', description: 'Gym chain growth' },
        { metric: '90%', label: 'Class Capacity', description: 'Average booking rate' },
        { metric: '40%', label: 'Retention Rate', description: 'Improvement in 6 months' },
        { metric: '25K+', label: 'Social Following', description: 'Fitness brand growth' },
      ],
      services: [
        { name: 'Gym Marketing', description: 'Membership lead generation', icon: Target },
        { name: 'Social Media', description: 'Fitness content and community', icon: Users },
        { name: 'Booking Optimization', description: 'Class and session bookings', icon: TrendingUp },
        { name: 'Trainer Branding', description: 'Personal brand building', icon: Award },
      ],
      successStories: [
        { client: 'Fitness Center Chain', result: '800+ new memberships', timeframe: '12 months' },
        { client: 'Yoga Studio', result: '90% class capacity achieved', timeframe: '6 months' },
        { client: 'Personal Trainer', result: '25K+ social followers', timeframe: '9 months' },
      ],
    },
  };

  const currentIndustry = industryData[slug || 'healthcare'] || industryData['healthcare'];
  
  // SEO Data - Auto-loads from centralized config
  const seo = useSEO();
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
    { name: currentIndustry.title, path: `/industries/${slug}` },
  ];

  return (
    <div className="bg-black">
      {/* SEO Meta Tags - Auto-loaded from centralized config */}
      <SEOHeadSSG {...seo.meta} />
      
      {/* Structured Data */}
      <StructuredData 
        schema={[
          organizationSchema,
          getWebPageSchema(seo.meta.title, seo.meta.description, `/industries/${slug}`, breadcrumbs),
          getBreadcrumbSchema(breadcrumbs),
        ]} 
      />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 text-[0.8125rem] text-yellow-500 hover:text-yellow-400 transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={16} />
            Back to Industries
          </Link>

          {/* H1: Guidelines-compliant */}
          <h1 className="text-[30px] md:text-[36px] font-medium tracking-tight mb-6">
            {seo.h1}
          </h1>
          <p className="text-[0.9375rem] leading-relaxed text-yellow-500 mb-6 italic">
            {currentIndustry.tagline}
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12">
            {currentIndustry.description}
          </p>

          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Get Industry-Specific Strategy
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">PROVEN RESULTS</p>
            {/* H2: Auto-styled with animated gradient */}
            <h2 className="text-[20px] md:text-[22px] font-bold mb-16 text-center">
              Industry Success Metrics
            </h2>

            <BentoGrid2 
              cards={currentIndustry.stats.map((stat: any) => ({
                number: stat.metric,
                label: stat.label,
                sublabel: stat.description,
              }))}
              mode="uniform"
              columns={4}
              ariaLabel="Industry success metrics"
            />
          </div>
        </div>
      </section>

      {/* Industry Challenges & Solutions */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Challenges */}
              <div className="relative overflow-hidden rounded-lg bg-black border border-white/10 p-6 min-h-[200px]">
                <h3 className="text-[1.375rem] font-medium mb-6">Industry Challenges</h3>
                <div className="space-y-3">
                  {currentIndustry.challenges.map((challenge: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <Shield className="flex-shrink-0 text-yellow-500 mt-0.5" size={20} />
                      <p className="text-[0.9375rem] leading-relaxed text-gray-300">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div className="relative overflow-hidden rounded-lg bg-black border border-white/10 p-6 min-h-[200px]">
                <h3 className="text-[1.375rem] font-medium mb-6">Our Solutions</h3>
                <div className="space-y-3">
                  {currentIndustry.solutions.map((solution: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="flex-shrink-0 text-yellow-500 mt-0.5" size={20} />
                      <p className="text-[0.9375rem] leading-relaxed text-gray-300">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry-Specific Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">SPECIALIZED SERVICES</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-16 text-center">
              Tailored Solutions for {currentIndustry.title}
            </h2>

            <BentoGrid2 
              cards={currentIndustry.services.map((service: any) => ({
                icon: service.icon,
                label: service.name,
                description: service.description,
              }))}
              mode="uniform"
              columns={2}
              ariaLabel={`Specialized services for ${currentIndustry.title}`}
            />
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">CLIENT SUCCESS</p>
            <h2 className="text-[20px] md:text-[22px] font-bold mb-4 text-center">
              Real Results from Real Clients
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center">
              See how we've helped {currentIndustry.title.toLowerCase()} businesses achieve extraordinary growth
            </p>

            <div className="space-y-4">
              {currentIndustry.successStories.map((story: any, index: number) => (
                <div key={index} className="glass p-6 rounded-xl transition-all duration-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2">{story.client}</h4>
                      <p className="text-[0.8125rem] text-yellow-500 font-semibold">{story.result}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[0.8125rem]">{story.timeframe}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6">Ready to Transform Your {currentIndustry.title} Business?</h2>
            <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-10">
              Let's discuss how our industry-specific expertise can drive measurable results for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Get Free Consultation
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/services"
                className="glass px-8 py-4 rounded-xl transition-colors duration-200 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}