import { getAllBlogTopics, getBlogsByCategory, getBlogUrl } from '../data/blogData';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { useSEO, StructuredData, organizationSchema, getWebPageSchema, getBreadcrumbSchema } from '../../utils/seo-system';
import { OutlinedText } from '../ui/OutlinedText';
import { TrendingUp, Target, Sparkles, BarChart3, Globe, Award, Play, Mail, Building2, Shield, Search, Clock, ArrowRight, Grid3x3, Star, Flame, FolderOpen, Gauge, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { BentoGrid2 } from '../layout/BentoGrid2';
import { AutoCarousel } from '../ui/AutoCarousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

// Category metadata
const categoryMetadata: Record<string, { icon: any; color: string; count: number }> = {
  'SEO & Local SEO': { icon: TrendingUp, color: 'yellow', count: 24 },
  'PPC & Google Ads': { icon: Target, color: 'yellow', count: 24 },
  'Social Media Marketing': { icon: Sparkles, color: 'yellow', count: 24 },
  'Content Marketing & Blogging': { icon: BarChart3, color: 'yellow', count: 24 },
  'Web Design & Development': { icon: Globe, color: 'yellow', count: 24 },
  'Branding & Design': { icon: Award, color: 'yellow', count: 24 },
  'Video & Photography': { icon: Play, color: 'yellow', count: 24 },
  'Email Marketing': { icon: Mail, color: 'yellow', count: 24 },
  'E-Commerce Marketing': { icon: Building2, color: 'yellow', count: 24 },
  'Legal & Compliance': { icon: Shield, color: 'yellow', count: 8 },
};

export function BlogsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Get all topics from data file
  const allTopics = useMemo(() => getAllBlogTopics(), []);

  // Get categories
  const categories = useMemo(() => Object.keys(categoryMetadata), []);

  // Featured posts - Transformed for BentoGrid2
  const featuredPosts = useMemo(() => {
    return allTopics.filter(topic => topic.featured).slice(0, 12).map(topic => ({
      title: topic.title,
      description: `${topic.readTime} • ${topic.difficulty}`,
      icon: topic.icon,
      link: getBlogUrl(topic)
    }));
  }, [allTopics]);

  // Trending posts
  const trendingPosts = useMemo(() => {
    return allTopics.filter(topic => topic.trending).slice(0, 6);
  }, [allTopics]);

  // Filtered topics - works across all sections
  const filteredTopics = useMemo(() => {
    let filtered = allTopics;

    // Apply tab filter first
    if (activeTab === 'featured') {
      filtered = filtered.filter(topic => topic.featured);
    } else if (activeTab === 'trending') {
      filtered = filtered.filter(topic => topic.trending);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(topic => topic.category === selectedCategory);
    }

    // Apply difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(topic => topic.difficulty === selectedDifficulty);
    }

    return filtered;
  }, [allTopics, activeTab, searchQuery, selectedCategory, selectedDifficulty]);

  // Group topics by category for accordion - uses filtered topics
  const topicsByCategory = useMemo(() => {
    const grouped: Record<string, typeof allTopics> = {};
    categories.forEach(category => {
      grouped[category] = filteredTopics.filter(topic => topic.category === category);
    });
    return grouped;
  }, [filteredTopics, categories]);

  // Difficulty options
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

  // Stats for display
  const stats = {
    total: allTopics.length,
    filtered: filteredTopics.length,
    featured: allTopics.filter(t => t.featured).length,
    trending: allTopics.filter(t => t.trending).length,
  };

  // Newsletter subscription handler
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    
    // TODO: Integrate with email service
    alert('Thanks for subscribing! You\'ll receive our latest marketing insights.');
    e.currentTarget.reset();
  };
  
  // SEO Data
  const seo = useSEO(); // Auto-loads SEO from centralized config
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blogs' },
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
          getWebPageSchema(seo.meta.title, seo.meta.description, '/blogs', breadcrumbs),
          getBreadcrumbSchema(breadcrumbs),
        ]} 
      />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 relative">
        {/* Outlined Background Text - Slides from LEFT, stops at 25% */}
        <OutlinedText 
          text="INSIGHTS" 
          className="absolute top-[20%] left-0 text-[10rem] md:text-[14rem] pointer-events-none"
          direction="left"
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
          <p className="text-[0.9375rem] leading-relaxed text-white/60 max-w-2xl mx-auto mb-12">
            Expert guides, strategies, and actionable tips to grow your business online
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 icon-sm" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, guides, tutorials..."
              className="w-full pl-12 pr-4 py-4 bg-black border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
            />
          </div>
        </div>
      </section>

      {/* Main Tabs Navigation */}
      <section className="py-8 sticky top-0 bg-black z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 bg-black border border-white/10 p-1 rounded-xl">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Grid3x3 className="icon-xs" />
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex items-center gap-2">
                <Star className="icon-xs" />
                <span className="hidden sm:inline">Featured</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <Flame className="icon-xs" />
                <span className="hidden sm:inline">Trending</span>
              </TabsTrigger>
              <TabsTrigger value="category" className="flex items-center gap-2">
                <FolderOpen className="icon-xs" />
                <span className="hidden sm:inline">By Topic</span>
              </TabsTrigger>
              <TabsTrigger value="difficulty" className="flex items-center gap-2">
                <Gauge className="icon-xs" />
                <span className="hidden sm:inline">By Level</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-[0.8125rem] text-white/60 px-3 py-2">Category:</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-lg text-[0.8125rem] font-semibold transition-colors duration-200 ${
                  !selectedCategory
                    ? 'bg-yellow-500 text-black'
                    : 'bg-black border border-white/20 text-white hover:border-white/30'
                }`}
              >
                All
              </button>
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-[0.8125rem] font-semibold transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-yellow-500 text-black'
                      : 'bg-black border border-white/20 text-white hover:border-white/30'
                  }`}
                >
                  {category.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-[0.8125rem] text-white/60 px-3 py-2">Level:</span>
              <button
                onClick={() => setSelectedDifficulty(null)}
                className={`px-3 py-1.5 rounded-lg text-[0.8125rem] font-semibold transition-colors duration-200 ${
                  !selectedDifficulty
                    ? 'bg-yellow-500 text-black'
                    : 'bg-black border border-white/20 text-white hover:border-white/30'
                }`}
              >
                All
              </button>
              {difficultyLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-3 py-1.5 rounded-lg text-[0.8125rem] font-semibold transition-colors duration-200 ${
                    selectedDifficulty === level
                      ? 'bg-yellow-500 text-black'
                      : 'bg-black border border-white/20 text-white hover:border-white/30'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Clear Filters */}
            {(selectedCategory || selectedDifficulty || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedDifficulty(null);
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-black border border-white/20 hover:border-white/30 rounded-lg text-[0.8125rem] font-semibold text-white transition-colors duration-200 flex items-center gap-2"
              >
                <X className="icon-xs" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* All Articles Tab */}
        <TabsContent value="all" className="mt-0">
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">ALL ARTICLES</p>
                <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">Browse All {filteredTopics.length} Articles</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center">
                  {searchQuery || selectedCategory || selectedDifficulty 
                    ? 'Filtered results based on your selection' 
                    : 'Complete library of marketing guides and resources'}
                </p>

                {filteredTopics.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredTopics.map((topic) => {
                      const Icon = topic.icon;
                      return (
                        <Link
                          key={topic.id}
                          to={getBlogUrl(topic)}
                          className="glass-card group transition-all duration-200 block"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <Icon className="text-white icon-md" />
                            <span className="text-[0.8125rem] text-yellow-500 uppercase tracking-wide">
                              {topic.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-medium mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
                            {topic.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <div className="flex items-center gap-2 text-[0.8125rem] text-gray-400">
                              <Clock className="icon-xs" />
                              <span>{topic.readTime}</span>
                            </div>
                            <Badge variant="outline" className="text-[0.8125rem]">{topic.difficulty}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            {topic.featured && (
                              <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 text-[0.8125rem]">
                                Featured
                              </Badge>
                            )}
                            {topic.trending && (
                              <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 text-[0.8125rem]">
                                Trending
                              </Badge>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-[0.9375rem] text-white/60 mb-6">No articles found matching your filters.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedDifficulty(null);
                        setSearchQuery('');
                      }}
                      className="btn-primary"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Featured Articles Tab */}
        <TabsContent value="featured" className="mt-0">
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">FEATURED</p>
                <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">Top Featured Articles</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center">
                  Our most comprehensive and valuable guides
                </p>

                {filteredTopics.length > 0 ? (
                  <BentoGrid2 
                    cards={filteredTopics.map(topic => ({
                      title: topic.title,
                      description: `${topic.readTime} • ${topic.difficulty}`,
                      icon: topic.icon,
                      link: getBlogUrl(topic)
                    }))}
                    mode="asymmetric"
                    showBadges={true}
                    showStats={false}
                    ariaLabel="Featured blog articles"
                  />
                ) : (
                  <div className="text-center py-16">
                    <p className="text-[0.9375rem] text-white/60">No featured articles found matching your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Trending Articles Tab */}
        <TabsContent value="trending" className="mt-0">
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">TRENDING</p>
                <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">Popular Right Now</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center">
                  Most viewed articles this month
                </p>

                {filteredTopics.length > 0 ? (
                  <>
                    <AutoCarousel speed="normal">
                      {filteredTopics.map((post) => {
                        const Icon = post.icon;
                        return (
                          <div key={post.id} className="glass-card min-w-[280px] sm:min-w-[350px] max-w-[400px] flex-shrink-0 snap-center">
                            <div className="inline-block bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-lg mb-4 text-[0.8125rem] font-semibold">
                              Trending
                            </div>
                            <Icon className="mb-4 text-white icon-md" />
                            <h4 className="text-lg font-medium mb-3 line-clamp-2">{post.title}</h4>
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-2 text-[0.8125rem] text-gray-400">
                                <Clock className="icon-xs" />
                                <span>{post.readTime}</span>
                              </div>
                              <Badge variant="outline" className="text-[0.8125rem]">{post.difficulty}</Badge>
                            </div>
                            <Link
                              to={getBlogUrl(post)}
                              className="inline-flex items-center gap-2 text-[0.8125rem] text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
                            >
                              Read Article
                              <ArrowRight className="icon-xs" />
                            </Link>
                          </div>
                        );
                      })}
                    </AutoCarousel>
                    
                    {/* Grid View Below Carousel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12">
                      {filteredTopics.map((topic) => {
                        const Icon = topic.icon;
                        return (
                          <Link
                            key={topic.id}
                            to={getBlogUrl(topic)}
                            className="glass-card group transition-all duration-200 block"
                          >
                            <div className="inline-block bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-lg mb-4 text-[0.8125rem] font-semibold">
                              Trending
                            </div>
                            <Icon className="mb-4 text-white icon-md" />
                            <h4 className="text-lg font-medium mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
                              {topic.title}
                            </h4>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 text-[0.8125rem] text-gray-400">
                                <Clock className="icon-xs" />
                                <span>{topic.readTime}</span>
                              </div>
                              <Badge variant="outline" className="text-[0.8125rem]">{topic.difficulty}</Badge>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-[0.9375rem] text-white/60">No trending articles found matching your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </TabsContent>

        {/* By Category Tab */}
        <TabsContent value="category" className="mt-0">
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">BY CATEGORY</p>
                <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">Browse by Topic</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center">
                  224+ comprehensive guides organized by category
                </p>

                <Accordion type="single" collapsible className="space-y-4">
                  {categories.map((category) => {
                    const Icon = categoryMetadata[category].icon;
                    const categoryTopics = topicsByCategory[category];

                    if (categoryTopics.length === 0) return null;

                    return (
                      <AccordionItem
                        key={category}
                        value={category}
                        className="glass rounded-xl transition-all duration-200"
                      >
                        <AccordionTrigger className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <Icon className="text-white icon-md" />
                            <div className="text-left">
                              <h3 className="text-[1.375rem] font-medium">{category}</h3>
                              <p className="text-[0.8125rem] text-gray-400">{categoryTopics.length} Articles</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="space-y-4 mt-4">
                            {categoryTopics.map((topic) => (
                              <Link
                                key={topic.id}
                                to={getBlogUrl(topic)}
                                className="glass p-6 rounded-xl transition-all duration-200 block"
                              >
                                <h4 className="text-lg font-medium mb-3 hover:text-yellow-500 transition-colors">
                                  {topic.title}
                                </h4>
                                <div className="flex flex-wrap items-center gap-4">
                                  <div className="flex items-center gap-2 text-[0.8125rem] text-gray-400">
                                    <Clock className="icon-xs" />
                                    <span>{topic.readTime}</span>
                                  </div>
                                  <Badge variant="outline" className="text-[0.8125rem]">{topic.difficulty}</Badge>
                                  {topic.featured && (
                                    <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 text-[0.8125rem]">
                                      Featured
                                    </Badge>
                                  )}
                                  {topic.trending && (
                                    <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 text-[0.8125rem]">
                                      Trending
                                    </Badge>
                                  )}
                                  <span className="inline-flex items-center gap-2 text-[0.8125rem] text-yellow-500 hover:text-yellow-400 transition-colors duration-200 ml-auto">
                                    Read Article
                                    <ArrowRight className="icon-xs" />
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* By Difficulty Tab */}
        <TabsContent value="difficulty" className="mt-0">
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <p className="text-[13px] font-medium uppercase tracking-wide text-yellow-500 mb-6 text-center">BY DIFFICULTY</p>
                <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-4 text-center">Browse by Skill Level</h2>
                <p className="text-[0.9375rem] leading-relaxed text-gray-300 mb-12 text-center">
                  Find articles that match your expertise
                </p>

                <Accordion type="single" collapsible className="space-y-4">
                  {difficultyLevels.map((level) => {
                    const levelTopics = filteredTopics.filter(topic => topic.difficulty === level);
                    
                    if (levelTopics.length === 0) return null;

                    return (
                      <AccordionItem
                        key={level}
                        value={level}
                        className="glass rounded-xl transition-all duration-200"
                      >
                        <AccordionTrigger className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <Gauge className="text-white icon-md" />
                            <div className="text-left">
                              <h3 className="text-[1.375rem] font-medium">{level}</h3>
                              <p className="text-[0.8125rem] text-gray-400">{levelTopics.length} Articles</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="space-y-4 mt-4">
                            {levelTopics.map((topic) => {
                              const Icon = topic.icon;
                              return (
                                <Link
                                  key={topic.id}
                                  to={getBlogUrl(topic)}
                                  className="glass p-6 rounded-xl transition-all duration-200 block"
                                >
                                  <div className="flex items-center gap-3 mb-3">
                                    <Icon className="text-white icon-sm" />
                                    <span className="text-[0.8125rem] text-yellow-500 uppercase tracking-wide">
                                      {topic.category}
                                    </span>
                                  </div>
                                  <h4 className="text-lg font-medium mb-3 hover:text-yellow-500 transition-colors">
                                    {topic.title}
                                  </h4>
                                  <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2 text-[0.8125rem] text-gray-400">
                                      <Clock className="icon-xs" />
                                      <span>{topic.readTime}</span>
                                    </div>
                                    {topic.featured && (
                                      <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 text-[0.8125rem]">
                                        Featured
                                      </Badge>
                                    )}
                                    {topic.trending && (
                                      <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 text-[0.8125rem]">
                                        Trending
                                      </Badge>
                                    )}
                                    <span className="inline-flex items-center gap-2 text-[0.8125rem] text-yellow-500 hover:text-yellow-400 transition-colors duration-200 ml-auto">
                                      Read Article
                                      <ArrowRight className="icon-xs" />
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {/* Stats Summary */}
      <section className="py-12 bg-black border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-medium tracking-tight text-yellow-500 mb-2">
                  {stats.total}+
                </div>
                <p className="text-[0.8125rem] text-white/60">Total Articles</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-medium tracking-tight text-yellow-500 mb-2">
                  {stats.featured}
                </div>
                <p className="text-[0.8125rem] text-white/60">Featured Guides</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-medium tracking-tight text-yellow-500 mb-2">
                  {stats.trending}
                </div>
                <p className="text-[0.8125rem] text-white/60">Trending Now</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-medium tracking-tight text-yellow-500 mb-2">
                  {categories.length}
                </div>
                <p className="text-[0.8125rem] text-white/60">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[20px] md:text-[22px] font-bold leading-[1.3] text-white mb-6">Get Weekly Marketing Insights</h2>
            <p className="text-[0.9375rem] leading-relaxed text-white/60 mb-10">
              Subscribe to receive the latest guides, tips, and strategies in your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-black border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors duration-200"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}