import { BookOpen, Search, ChevronRight, Hash } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { OutlinedText } from '../ui/OutlinedText';
import { SEOHead } from '../SEOHead';
import { StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/structuredData';

const glossaryTerms = [
  { term: 'SEO', definition: 'Search Engine Optimization - The process of improving website visibility in search engine results.', category: 'SEO' },
  { term: 'PPC', definition: 'Pay-Per-Click - An advertising model where advertisers pay each time a user clicks their ad.', category: 'PPC' },
  { term: 'CTR', definition: 'Click-Through Rate - The ratio of users who click on a specific link to the number who view it.', category: 'Analytics' },
  { term: 'Conversion Rate', definition: 'The percentage of visitors who complete a desired action on your website.', category: 'Analytics' },
  { term: 'ROI', definition: 'Return on Investment - A measure of the profitability of an investment relative to its cost.', category: 'Business' },
  { term: 'SERP', definition: 'Search Engine Results Page - The page displayed by search engines in response to a query.', category: 'SEO' }
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');

  const filteredTerms = glossaryTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLetter = selectedLetter === 'All' || item.term.startsWith(selectedLetter);
    return matchesSearch && matchesLetter;
  });

  const breadcrumbItems = [{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }, { name: 'Glossary', path: '/glossary' }];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead title="Digital Marketing Glossary | Inchtomilez" description="Comprehensive glossary of digital marketing terms. Understand SEO, PPC, social media, and marketing terminology." keywords={['glossary', 'marketing terms', 'definitions', 'dictionary']} canonicalUrl="/glossary" />
      <StructuredData data={organizationSchema} />
      <StructuredData data={getWebPageSchema({ title: 'Digital Marketing Glossary', description: 'Marketing terms and definitions.', slug: 'glossary' })} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-[13px] mb-6">
            <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <Link to="/resources" className="text-gray-400 hover:text-yellow-500 transition-colors">Resources</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Glossary</span>
          </nav>

          <div className="max-w-3xl">
            <div className="p-3 glass-yellow rounded-xl inline-block mb-6">
              <BookOpen className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-[30px] md:text-[36px] font-medium mb-6">Marketing Glossary</h1>
            <p className="text-[15px] text-gray-400 mb-8">
              Comprehensive dictionary of digital marketing terms, acronyms, and definitions. Your guide to understanding marketing jargon.
            </p>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[15px] text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <OutlinedText text="GLOSSARY" direction="left" delay={0} stopPosition={25} parallax={true} parallaxSpeed={0.2} />
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedLetter('All')}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                selectedLetter === 'All' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              All
            </button>
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                  selectedLetter === letter ? 'bg-yellow-500 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredTerms.map((item, index) => (
              <div key={index} className="glass-card p-6 hover:border-yellow-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Hash className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[18px] font-medium">{item.term}</h3>
                      <span className="bg-white/5 text-gray-400 px-2 py-1 rounded text-[11px] uppercase">{item.category}</span>
                    </div>
                    <p className="text-[15px] text-gray-400">{item.definition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="glass p-12 text-center">
              <p className="text-[15px] text-gray-400">No terms found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
