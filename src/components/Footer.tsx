import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  ArrowRight,
  Award,
  Users,
  TrendingUp,
  Star,
  Globe
} from 'lucide-react';
import { useState } from 'react';
import logoAvatar from 'figma:asset/90948f9aa2b6ab5b4d89fb6e1fa928039c1588d3.png';
import logoText from 'figma:asset/291b7319b5121f776c225ad4d66462f7385e5e1e.png';

export function Footer() {
  const [email, setEmail] = useState('');

  const services = [
    { name: 'Digital Marketing', slug: 'digital-marketing' },
    { name: 'Advertising', slug: 'advertising' },
    { name: 'Ecommerce Marketing', slug: 'ecommerce' },
    { name: 'Branding & Identity', slug: 'branding' },
    { name: 'Website Development', slug: 'website-development' },
    { name: 'Graphic Designing', slug: 'graphic-designing' },
    { name: 'Software Development', slug: 'software-development' },
    { name: 'Media Production', slug: 'media-production' },
  ];

  const industries = [
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'Technology', slug: 'technology' },
    { name: 'Education', slug: 'education' },
    { name: 'Real Estate', slug: 'real-estate' },
    { name: 'Retail & E-Commerce', slug: 'retail' },
    { name: 'Finance', slug: 'finance' },
    { name: 'Hospitality', slug: 'hospitality' },
    { name: 'Automotive', slug: 'automotive' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-conditions' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
    { name: 'Disclaimer', path: '/disclaimer' },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://www.facebook.com/inchtomilez',
      color: 'hover:text-blue-500'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://www.instagram.com/inchtomilez',
      color: 'hover:text-pink-500'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://www.linkedin.com/company/inchtomilez',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://twitter.com/inchtomilez',
      color: 'hover:text-sky-500'
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      url: 'https://www.youtube.com/@inchtomilez',
      color: 'hover:text-red-500'
    },
  ];

  const stats = [
    { icon: Users, value: '96+', label: 'Clients Served' },
    { icon: TrendingUp, value: '74+', label: 'Marketing Campaigns' },
    { icon: Award, value: '7', label: 'Years Experience' },
    { icon: Globe, value: '13+', label: 'International Campaigns' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[var(--background)] mt-32">
      {/* Stats Bar */}
      <div className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-[var(--foreground)]" />
                  <div className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-1">
                    {stat.value}
                  </div>
                  <p className="text-[0.8125rem] text-[var(--muted-foreground)]">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12">
          
          {/* Company Info - Spans 2 columns */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {/* Logo - Avatar + TO Logo Images */}
              <Link to="/" className="flex items-center gap-3 mb-4 w-fit">
                <img 
                  src={logoAvatar}
                  alt="Inchtomilez Digital Marketing And Advertising Agency"
                  className="h-12"
                />
                <img 
                  src={logoText}
                  alt="Inchtomilez Digital Marketing And Advertising Agency"
                  className="h-12"
                />
              </Link>
              
              <p className="text-[0.9375rem] leading-relaxed text-[var(--foreground)] opacity-80 mb-4">
                Transforming Brands into Market Leaders
              </p>
              <p className="text-[0.8125rem] leading-relaxed text-[var(--muted-foreground)] mb-6">
                Leading digital marketing and advertising agency in Indore, India. We combine data-driven strategies with creative excellence to deliver exceptional results.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 text-[0.8125rem] text-[var(--muted-foreground)]">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-[var(--foreground)]" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:hello@inchtomilez.com" className="hover:text-yellow-500 transition-colors">
                    hello@inchtomilez.com
                  </a>
                  <a href="mailto:support@inchtomilez.com" className="hover:text-yellow-500 transition-colors">
                    support@inchtomilez.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-[0.8125rem] text-[var(--muted-foreground)]">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-[var(--foreground)]" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919669988666" className="hover:text-yellow-500 transition-colors">
                    +91 966-998-8666
                  </a>
                  <a href="tel:+919009970709" className="hover:text-yellow-500 transition-colors">
                    +91 900-997-0709
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-[0.8125rem] text-[var(--muted-foreground)]">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[var(--foreground)]" />
                <span>Vijay Nagar, Indore,<br />Madhya Pradesh 452010, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-[0.8125rem] font-semibold text-[var(--foreground)] opacity-90 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/70 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10`}
                      aria-label={social.name}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-medium text-[var(--foreground)] mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-[0.8125rem] text-[var(--muted-foreground)] hover:text-yellow-500 transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-lg font-medium text-[var(--foreground)] mb-6">Industries</h4>
            <ul className="space-y-3">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    to={`/industries/${industry.slug}`}
                    className="text-[0.8125rem] text-[var(--muted-foreground)] hover:text-yellow-500 transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium text-[var(--foreground)] mb-6">Quick Links</h4>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[0.8125rem] text-[var(--muted-foreground)] hover:text-yellow-500 transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-medium text-white mb-6">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-[0.8125rem] text-white/60 hover:text-yellow-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Newsletter</h4>
            <p className="text-[0.8125rem] text-white/60 mb-6 leading-relaxed">
              Subscribe to get the latest marketing insights, industry trends, and exclusive offers.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-[0.8125rem] placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors duration-200"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold group"
              >
                Subscribe
                <Send size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>

            <p className="text-[0.75rem] text-white/40 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[0.8125rem] text-white/60 text-center md:text-left">
              &copy; {new Date().getFullYear()} Inchtomilez Digital Marketing And Advertising Agency. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-[0.8125rem] text-white/60">
              <span>Made with ❤️ in Indore, India</span>
              <span className="hidden md:inline">•</span>
              <span>Trusted by 500+ Brands</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Line - Removed gradient for clean aesthetic */}
    </footer>
  );
}
