import { Search, Star } from 'lucide-react';

interface SERPPreviewProps {
  title: string;
  description: string;
  url: string;
}

/**
 * Google SERP Preview
 * Shows how the page will look in Google search results
 */
export function SERPPreview({ title, description, url }: SERPPreviewProps) {
  // Truncate title at 60 characters (Google's limit)
  const displayTitle = title.length > 60 
    ? title.substring(0, 57) + '...' 
    : title;

  // Truncate description at 160 characters
  const displayDescription = description.length > 160
    ? description.substring(0, 157) + '...'
    : description;

  // Clean URL for display
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className="bg-black/30 border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-4 h-4 text-white/60" />
        <h3 className="text-[15px] font-semibold text-white">Google Search Preview</h3>
      </div>

      {/* Google Logo Area */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-[14px]">
          I
        </div>
        <div>
          <div className="text-[13px] text-white/80">Inchtomilez</div>
          <div className="text-[11px] text-white/50">www.inchtomilez.com</div>
        </div>
      </div>

      {/* Search Result */}
      <div className="space-y-2">
        {/* Breadcrumb/URL */}
        <div className="flex items-center gap-1 text-[13px] text-white/60">
          <span>inchtomilez.com</span>
          <span>›</span>
          <span className="truncate">{displayUrl.split('/').filter(Boolean).join(' › ')}</span>
        </div>

        {/* Title */}
        <div className="text-[18px] text-[#8AB4F8] hover:underline cursor-pointer">
          {displayTitle || 'Page Title'}
        </div>

        {/* Description */}
        <div className="text-[14px] text-white/70 leading-relaxed">
          {displayDescription || 'Meta description will appear here...'}
        </div>

        {/* Additional Info (Sitelinks preview) */}
        <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div>
            <div className="text-[13px] text-[#8AB4F8] hover:underline cursor-pointer mb-1">
              Services
            </div>
            <div className="text-[12px] text-white/60">
              SEO, PPC, Social Media
            </div>
          </div>
          <div>
            <div className="text-[13px] text-[#8AB4F8] hover:underline cursor-pointer mb-1">
              Contact
            </div>
            <div className="text-[12px] text-white/60">
              Get in touch with us
            </div>
          </div>
        </div>
      </div>

      {/* Character Counters */}
      <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-white/60">Title Length:</span>
          <span className={`font-medium ${
            title.length >= 30 && title.length <= 60 
              ? 'text-green-500' 
              : title.length > 60 
              ? 'text-red-500' 
              : 'text-yellow-500'
          }`}>
            {title.length} / 60
          </span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-white/60">Description Length:</span>
          <span className={`font-medium ${
            description.length >= 120 && description.length <= 160 
              ? 'text-green-500' 
              : description.length > 160 
              ? 'text-red-500' 
              : 'text-yellow-500'
          }`}>
            {description.length} / 160
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex gap-2">
          <Star className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-[12px] text-blue-400">
            <strong>Pro Tip:</strong> Keep title 30-60 chars and description 120-160 chars for optimal display in search results.
          </div>
        </div>
      </div>
    </div>
  );
}
