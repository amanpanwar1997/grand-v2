import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, FileQuestion } from 'lucide-react';
import { SEOHeadSSG } from '../SEOHeadSSG';
import { OutlinedText } from '../ui/OutlinedText';

export function NotFoundPage() {
  return (
    <>
      <SEOHeadSSG
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Explore our services, industries, and blog content."
        noindex={true}
      />

      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        {/* Background decorative text */}
        <OutlinedText 
          text="404"
          className="absolute top-[20%] left-0 text-[20rem] md:text-[30rem] pointer-events-none"
          direction="left"
          delay={0}
          stopPosition={30}
          parallax={true}
          parallaxSpeed={0.2}
        />
        
        <OutlinedText 
          text="NOT FOUND"
          className="absolute top-[60%] right-0 text-[8rem] md:text-[12rem] pointer-events-none"
          direction="right"
          delay={0.2}
          stopPosition={25}
          parallax={true}
          parallaxSpeed={0.4}
        />

        {/* Main content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {/* Error icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <FileQuestion className="w-32 h-32 text-yellow-500 animate-pulse" />
              <div className="absolute inset-0 blur-2xl bg-yellow-500/20 rounded-full" />
            </div>
          </div>

          {/* Error code */}
          <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-br from-white to-yellow-500 bg-clip-text text-transparent">
            404
          </h1>

          {/* Error message */}
          <h2 className="text-[20px] md:text-[22px] font-bold mb-6">
            Page Not Found
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Don't worry, you can find plenty of amazing content on our website!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
            >
              <Home className="w-5 h-5" />
              Back to Home
              <div className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden">
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </div>
            </Link>

            <Link
              to="/blogs"
              className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border border-white/20 hover:border-yellow-500"
            >
              <Search className="w-5 h-5" />
              Explore Blog
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <p className="text-gray-500 mb-6 uppercase text-sm tracking-wider font-semibold">
              Popular Pages
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/services"
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 transition-all duration-300 group"
              >
                <p className="font-semibold text-white group-hover:text-yellow-500 transition-colors">
                  Services
                </p>
              </Link>
              <Link
                to="/industries"
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 transition-all duration-300 group"
              >
                <p className="font-semibold text-white group-hover:text-yellow-500 transition-colors">
                  Industries
                </p>
              </Link>
              <Link
                to="/about"
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 transition-all duration-300 group"
              >
                <p className="font-semibold text-white group-hover:text-yellow-500 transition-colors">
                  About Us
                </p>
              </Link>
              <Link
                to="/contact"
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 transition-all duration-300 group"
              >
                <p className="font-semibold text-white group-hover:text-yellow-500 transition-colors">
                  Contact
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}