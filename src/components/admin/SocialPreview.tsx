import { Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { useState } from 'react';

interface SocialPreviewProps {
  title: string;
  description: string;
  url: string;
  image?: string;
}

type Platform = 'facebook' | 'twitter' | 'linkedin';

/**
 * Social Media Preview
 * Shows how the page will look when shared on social platforms
 */
export function SocialPreview({ title, description, url, image }: SocialPreviewProps) {
  const [platform, setPlatform] = useState<Platform>('facebook');

  // Truncate for different platforms
  const getTruncatedTitle = () => {
    switch (platform) {
      case 'twitter':
        return title.length > 70 ? title.substring(0, 67) + '...' : title;
      case 'linkedin':
        return title.length > 200 ? title.substring(0, 197) + '...' : title;
      default: // facebook
        return title.length > 100 ? title.substring(0, 97) + '...' : title;
    }
  };

  const getTruncatedDescription = () => {
    switch (platform) {
      case 'twitter':
        return description.length > 200 ? description.substring(0, 197) + '...' : description;
      case 'linkedin':
        return description.length > 150 ? description.substring(0, 147) + '...' : description;
      default: // facebook
        return description.length > 300 ? description.substring(0, 297) + '...' : description;
    }
  };

  const displayImage = image || '/og-image.jpg';
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className="bg-black/30 border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-white/60" />
          <h3 className="text-[15px] font-semibold text-white">Social Media Preview</h3>
        </div>

        {/* Platform Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setPlatform('facebook')}
            className={`p-2 rounded-lg transition-colors ${
              platform === 'facebook'
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            title="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPlatform('twitter')}
            className={`p-2 rounded-lg transition-colors ${
              platform === 'twitter'
                ? 'bg-sky-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            title="Twitter/X"
          >
            <Twitter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPlatform('linkedin')}
            className={`p-2 rounded-lg transition-colors ${
              platform === 'linkedin'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Card */}
      <div className="border border-white/20 rounded-lg overflow-hidden bg-black/50">
        {/* Image */}
        <div className="aspect-[1.91/1] bg-gradient-to-br from-yellow-500/20 to-black flex items-center justify-center">
          {displayImage ? (
            <img
              src={displayImage}
              alt="OG Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"%3E%3Crect fill="%23000" width="1200" height="630"/%3E%3Ctext fill="%23eab308" font-size="48" font-family="Arial" x="50" y="315"%3EInchtomilez%3C/text%3E%3C/svg%3E';
              }}
            />
          ) : (
            <div className="text-white/40 text-center">
              <div className="text-[14px] font-medium mb-1">No Image</div>
              <div className="text-[12px]">1200 × 630 recommended</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-[11px] text-white/50 uppercase mb-2">
            {displayUrl}
          </div>
          <div className={`font-semibold text-white mb-2 ${
            platform === 'facebook' ? 'text-[16px]' : 
            platform === 'twitter' ? 'text-[15px]' : 
            'text-[14px]'
          }`}>
            {getTruncatedTitle() || 'Page Title'}
          </div>
          <div className={`text-white/70 ${
            platform === 'facebook' ? 'text-[14px]' : 'text-[13px]'
          }`}>
            {getTruncatedDescription() || 'Description will appear here...'}
          </div>
        </div>
      </div>

      {/* Platform-Specific Info */}
      <div className="mt-4 space-y-2">
        {platform === 'facebook' && (
          <div className="text-[12px] text-white/60">
            <strong className="text-white">Facebook:</strong> Shows up to 100 chars for title, 300 for description. Image ratio 1.91:1 (1200×630px recommended).
          </div>
        )}
        {platform === 'twitter' && (
          <div className="text-[12px] text-white/60">
            <strong className="text-white">Twitter/X:</strong> Shows up to 70 chars for title, 200 for description. Summary Card with Large Image format.
          </div>
        )}
        {platform === 'linkedin' && (
          <div className="text-[12px] text-white/60">
            <strong className="text-white">LinkedIn:</strong> Shows up to 200 chars for title, 150 for description. Professional format optimized for business sharing.
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <div className="text-[12px] text-purple-400">
          <strong>Image Tips:</strong> Use 1200×630px for best results across all platforms. Include your logo and key message in the image.
        </div>
      </div>
    </div>
  );
}
