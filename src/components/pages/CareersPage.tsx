import { Briefcase, Heart, TrendingUp, Users, Coffee, Award, Send, MapPin } from 'lucide-react';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema } from '../../utils/structuredData';
import { OutlinedText } from '../ui/OutlinedText';
import { BentoGrid2 } from '../layout/BentoGrid2';

export function CareersPage() {
  const benefits = [
    { title: "Competitive Salary", description: "Industry-leading compensation", icon: TrendingUp, link: "#" },
    { title: "Flexible Hours", description: "Work-life balance priority", icon: Coffee, link: "#" },
    { title: "Growth Opportunities", description: "Continuous learning & development", icon: Award, link: "#" },
    { title: "Great Team", description: "Collaborative work culture", icon: Users, link: "#" },
    { title: "Health Insurance", description: "Comprehensive medical coverage", icon: Heart, link: "#" },
    { title: "Remote Options", description: "Hybrid work arrangements", icon: MapPin, link: "#" },
  ];

  const openings = [
    {
      title: "Senior SEO Specialist",
      department: "Digital Marketing",
      type: "Full-time",
      location: "Indore / Remote",
      experience: "3-5 years"
    },
    {
      title: "PPC Campaign Manager",
      department: "Paid Advertising",
      type: "Full-time",
      location: "Indore",
      experience: "2-4 years"
    },
    {
      title: "Content Writer",
      department: "Content Marketing",
      type: "Full-time",
      location: "Remote",
      experience: "1-3 years"
    },
    {
      title: "Graphic Designer",
      department: "Creative",
      type: "Full-time",
      location: "Indore",
      experience: "2-4 years"
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Careers at Inchtomilez | Join Our Team"
        description="Join Inchtomilez digital marketing team in Indore. We're hiring SEO specialists, PPC managers, content writers, and designers. Apply now!"
        keywords={['careers', 'jobs', 'hiring', 'Indore jobs', 'digital marketing jobs', 'SEO jobs']}
        canonicalUrl="/careers"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Careers - Join Inchtomilez',
        description: 'Explore career opportunities at India\'s leading digital marketing agency.',
        slug: 'careers',
      })} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 glass-yellow rounded-xl mb-6">
              <Briefcase className="w-10 h-10 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Join Our Team</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Build your career with India's fastest-growing digital marketing agency. We're looking for talented, passionate individuals to join our team.
            </p>
            <a href="#openings" className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg text-[15px] font-semibold hover:bg-yellow-400 transition-colors">
              View Open Positions
            </a>
          </div>
        </div>
        <OutlinedText text="CAREERS" direction="left" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-8 text-center">Why Work With Us</h2>
          <BentoGrid2 cards={benefits} mode="uniform" columns={3} ariaLabel="Employee benefits" showBadges={false} />
        </div>
      </section>

      <section id="openings" className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-8 text-center">Current Openings</h2>
            <div className="space-y-6">
              {openings.map((job, index) => (
                <div key={index} className="glass-card p-6 hover:border-yellow-500/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[22px] font-medium mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-[13px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <a 
                      href={`mailto:careers@inchtomilez.com?subject=Application for ${job.title}`}
                      className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg text-[15px] font-semibold hover:bg-yellow-400 transition-colors whitespace-nowrap"
                    >
                      <Send className="w-4 h-4" />
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-6">Don't See Your Role?</h2>
            <p className="text-[15px] text-gray-400 mb-8">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <a 
              href="mailto:careers@inchtomilez.com"
              className="inline-flex items-center gap-2 glass-card px-6 py-3 text-[15px] font-semibold hover:border-yellow-500/50 transition-colors"
            >
              <Send className="w-5 h-5" />
              Send General Application
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}