/**
 * PWA INSTALL PROMPT COMPONENT
 * Beautiful install prompt matching Inchtomilez design system
 * Version: 1.0.0
 * 
 * Design: Black + White + Yellow, Glassmorphism
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { usePWAInstall, getPlatform } from '../../utils/pwaInstaller';

export function PWAInstallPrompt() {
  const { canInstall, installPWA, dismissPrompt } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    // Show prompt after 5 seconds if can install
    if (canInstall) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      setPlatform(getPlatform());

      return () => clearTimeout(timer);
    }
  }, [canInstall]);

  const handleInstall = async () => {
    await installPWA();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    dismissPrompt();
    setIsVisible(false);
  };

  if (!canInstall) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={handleDismiss}
          />

          {/* Install Prompt Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl">
              {/* Top Border - Removed gradient for clean aesthetic */}

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-2xl mb-4 border border-yellow-500/20">
                  {platform === 'Android' || platform === 'iOS' ? (
                    <Smartphone className="w-8 h-8 text-yellow-500" />
                  ) : (
                    <Monitor className="w-8 h-8 text-yellow-500" />
                  )}
                </div>

                {/* Heading */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  Install Inchtomilez App
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Get instant access to our services, faster load times, and offline support. 
                  Works just like a native app on your {platform === 'iOS' ? 'iPhone' : 'device'}.
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {[
                    'Lightning-fast performance',
                    'Works offline',
                    'Quick access from home screen',
                    'No app store required',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  {/* Install Button */}
                  <button
                    onClick={handleInstall}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                    <span>Install Now</span>
                  </button>

                  {/* Maybe Later Button */}
                  <button
                    onClick={handleDismiss}
                    className="px-6 py-3 text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    Maybe Later
                  </button>
                </div>

                {/* Platform Info */}
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Available for {platform}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl" />
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * PWA INSTALL BUTTON COMPONENT
 * Compact button for navigation or footer
 */

export function PWAInstallButton() {
  const { canInstall, installPWA } = usePWAInstall();

  if (!canInstall) return null;

  return (
    <button
      onClick={installPWA}
      className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 text-sm font-medium group"
    >
      <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
      <span>Install App</span>
    </button>
  );
}

/**
 * iOS INSTALL INSTRUCTIONS COMPONENT
 * Special instructions for iOS users (no beforeinstallprompt)
 */

export function IOSInstallInstructions() {
  const [isVisible, setIsVisible] = useState(false);
  const platform = getPlatform();

  useEffect(() => {
    // Only show on iOS if not already installed
    if (platform === 'iOS' && !(window.navigator as any).standalone) {
      // Check if user dismissed before
      const dismissed = localStorage.getItem('ios-install-dismissed');
      if (!dismissed) {
        setTimeout(() => setIsVisible(true), 3000);
      }
    }
  }, [platform]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ios-install-dismissed', 'true');
  };

  if (platform !== 'iOS' || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 left-6 right-6 md:max-w-md md:mx-auto z-[9999]"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl p-6 shadow-2xl">
          {/* Top Bar - Removed for clean aesthetic */}

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              Install on iPhone
            </h3>
            <p className="text-sm text-gray-400">
              Add Inchtomilez to your home screen for the best experience:
            </p>
          </div>

          {/* Instructions */}
          <ol className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-xs font-bold">
                1
              </span>
              <span>Tap the <strong>Share</strong> button at the bottom of Safari</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span>Scroll and tap <strong>"Add to Home Screen"</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-xs font-bold">
                3
              </span>
              <span>Tap <strong>"Add"</strong> in the top right corner</span>
            </li>
          </ol>

          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="w-full mt-6 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            Got it, thanks!
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * USAGE:
 * 
 * // In App.tsx:
 * <PWAInstallPrompt />
 * <IOSInstallInstructions />
 * 
 * // In Navigation or Footer:
 * <PWAInstallButton />
 */
