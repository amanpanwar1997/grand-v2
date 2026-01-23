import { Video, Calendar, Users, ChevronRight, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const webinars = [
  { title: 'SEO in 2025: Latest Trends', date: 'Dec 15, 2025', time: '3:00 PM IST', attendees: 450, speaker: 'Ravi Kumar, SEO Director', status: 'Upcoming' },
  { title: 'Social Media Advertising Masterclass', date: 'Dec 8, 2025', time: '2:00 PM IST', attendees: 380, speaker: 'Priya Singh, Social Media Head', status: 'Upcoming' },
  { title: 'Google Ads ROI Optimization', date: 'Nov 20, 2025', time: '4:00 PM IST', attendees: 520, speaker: 'Amit Verma, PPC Specialist', status: 'Recorded' }
];

export function WebinarsPage() {
  const breadcrumbItems = [{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }, { name: 'Webinars', path: '/webinars' }];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead title="Free Digital Marketing Webinars | Inchtomilez" description="Join free live webinars on SEO, PPC, social media & digital marketing. Learn from industry experts." keywords={['webinars', 'online training', 'marketing workshops', 'free events']} canonicalUrl="/webinars" />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'Free Digital Marketing Webinars', description: 'Live training and workshops.', slug: 'webinars' })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <Link to="/resources" className="text-gray-400 hover:text-yellow-500 transition-colors">Resources</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Webinars</span>
          </nav>

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <Video className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Free Marketing Webinars</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Join live training sessions with industry experts. Learn cutting-edge strategies, ask questions, and network with other marketers.
            </p>
          </div>
        </div>

        <OutlinedText text="WEBINARS" direction="left" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.map((webinar, index) => (
              <div key={index} className="glass-card p-6 hover:border-yellow-500/30 transition-all duration-300">
                <div className={`inline-block px-3 py-1 rounded-lg text-[13px] font-semibold mb-4 ${
                  webinar.status === 'Upcoming' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-white/5 text-gray-400'
                }`}>
                  {webinar.status}
                </div>

                <h3 className="text-[18px] font-medium mb-4">{webinar.title}</h3>
                
                <div className="space-y-2 mb-6 text-[15px] text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {webinar.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {webinar.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {webinar.attendees} registered
                  </div>
                </div>

                <p className="text-[13px] text-gray-500 mb-4">Speaker: {webinar.speaker}</p>

                <button className="w-full bg-yellow-500 text-black px-6 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
                  {webinar.status === 'Upcoming' ? 'Register Free' : 'Watch Recording'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-4">Want a Custom Workshop?</h2>
          <p className="text-[15px] text-gray-400 mb-8 max-w-2xl mx-auto">
            We offer private training sessions for teams and organizations.
          </p>
          <Link to="/contact" className="bg-yellow-500 text-black px-8 py-3 text-[15px] font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
            Request Private Training <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}