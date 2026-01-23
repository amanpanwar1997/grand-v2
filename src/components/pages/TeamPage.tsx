import { Users, Linkedin, Mail, Award, Target, Heart } from 'lucide-react';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema } from '../../utils/structuredData';
import { OutlinedText } from '../ui/OutlinedText';

export function TeamPage() {
  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "15+ years in digital marketing, ex-Google",
      linkedin: "#"
    },
    {
      name: "Priya Sharma",
      role: "Head of SEO",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "SEO expert with 200+ successful campaigns",
      linkedin: "#"
    },
    {
      name: "Amit Patel",
      role: "PPC Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Managed ₹50Cr+ in ad spend",
      linkedin: "#"
    },
    {
      name: "Sneha Desai",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Award-winning designer & brand strategist",
      linkedin: "#"
    },
    {
      name: "Vikram Singh",
      role: "Content Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Published author & content marketing specialist",
      linkedin: "#"
    },
    {
      name: "Neha Gupta",
      role: "Social Media Lead",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
      bio: "Grew 50+ brands to 100K+ followers",
      linkedin: "#"
    },
  ];

  const values = [
    { icon: Target, title: "Results-Driven", description: "Data and performance focused" },
    { icon: Heart, title: "Client-First", description: "Your success is our success" },
    { icon: Award, title: "Excellence", description: "Industry-leading quality" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Meet Our Team | Inchtomilez Digital Marketing Experts"
        description="Meet the talented team behind Inchtomilez. Expert digital marketers, SEO specialists, designers, and strategists in Indore."
        keywords={['team', 'digital marketing team', 'SEO experts', 'Indore agency team']}
        canonicalUrl="/team"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({
        title: 'Our Team - Inchtomilez',
        description: 'Meet the experts driving digital success for our clients.',
        slug: 'team',
      })} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 glass-yellow rounded-xl mb-6">
              <Users className="w-10 h-10 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Meet Our Team</h1>
            <p className="text-[15px] text-gray-400">
              A passionate team of digital marketing experts dedicated to your success.
            </p>
          </div>
        </div>
        <OutlinedText text="TEAM" direction="left" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="glass-card group text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-yellow-500/20 group-hover:border-yellow-500/50 transition-all"
                />
                <h3 className="text-[22px] font-medium mb-2">{member.name}</h3>
                <p className="text-[15px] text-yellow-500 mb-3">{member.role}</p>
                <p className="text-[13px] text-gray-400 mb-4">{member.bio}</p>
                <div className="flex items-center justify-center gap-4">
                  <a href={member.linkedin} className="p-2 glass rounded-lg hover:bg-yellow-500/10 transition-colors">
                    <Linkedin className="w-5 h-5 text-yellow-500" />
                  </a>
                  <a href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@inchtomilez.com`} className="p-2 glass rounded-lg hover:bg-yellow-500/10 transition-colors">
                    <Mail className="w-5 h-5 text-yellow-500" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="glass-card text-center">
                  <Icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-[18px] font-medium mb-2">{value.title}</h3>
                  <p className="text-[13px] text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}