/**
 * PWA INSTALLER UTILITY
 * Handles Progressive Web App installation prompt
 * Version: 1.0.0
 * 
 * Features:
 * ✅ Detects install availability
 * ✅ Manages install prompt
 * ✅ Tracks install success/failure
 * ✅ Handles install events
 */

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallHook {
  canInstall: boolean;
  isInstalled: boolean;
  installPWA: () => Promise<void>;
  dismissPrompt: () => void;
}

/**
 * CUSTOM HOOK: usePWAInstall
 * Manages PWA installation state and actions
 */
export function usePWAInstall(): PWAInstallHook {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      console.log('📱 PWA: Already installed');
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      console.log('📱 PWA: Install prompt available');
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      console.log('📱 PWA: App installed successfully');
      
      // Track installation (Google Analytics, etc.)
      if (window.gtag) {
        window.gtag('event', 'pwa_install', {
          event_category: 'PWA',
          event_label: 'App Installed',
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  /**
   * Trigger PWA installation
   */
  const installPWA = async () => {
    if (!deferredPrompt) {
      console.log('📱 PWA: No install prompt available');
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('📱 PWA: User accepted the install prompt');
      } else {
        console.log('📱 PWA: User dismissed the install prompt');
      }

      // Clear the deferredPrompt (can only be used once)
      setDeferredPrompt(null);
    } catch (error) {
      console.error('📱 PWA: Error during installation:', error);
    }
  };

  /**
   * Dismiss the install prompt
   */
  const dismissPrompt = () => {
    setDeferredPrompt(null);
    console.log('📱 PWA: Install prompt dismissed');
  };

  return {
    canInstall: !!deferredPrompt && !isInstalled,
    isInstalled,
    installPWA,
    dismissPrompt,
  };
}

/**
 * CHECK IF PWA IS INSTALLED
 */
export function isPWAInstalled(): boolean {
  // Check if running in standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }

  // Check if running in fullscreen mode
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return true;
  }

  // Check iOS standalone mode
  if ((window.navigator as any).standalone === true) {
    return true;
  }

  return false;
}

/**
 * GET PLATFORM NAME
 */
export function getPlatform(): string {
  // Check if running in browser
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'Unknown';
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes('android')) return 'Android';
  if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'iOS';
  if (userAgent.includes('mac')) return 'macOS';
  if (userAgent.includes('win')) return 'Windows';
  if (userAgent.includes('linux')) return 'Linux';

  return 'Unknown';
}

/**
 * CHECK IF BROWSER SUPPORTS PWA
 */
export function supportsPWA(): boolean {
  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  // Check if beforeinstallprompt is supported
  if (!('BeforeInstallPromptEvent' in window)) {
    // iOS doesn't support beforeinstallprompt but can still install PWAs
    const platform = getPlatform();
    if (platform === 'iOS') {
      return true;
    }
  }

  return true;
}

/**
 * REGISTER SERVICE WORKER
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  // Check if running in browser
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('📱 PWA: Service workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('📱 PWA: Service worker registered successfully');
    
    // Listen for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('📱 PWA: New version available');
            
            // Show update notification to user
            if (window.confirm('A new version is available. Reload to update?')) {
              window.location.reload();
            }
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error('📱 PWA: Service worker registration failed:', error);
    return null;
  }
}

/**
 * UNREGISTER SERVICE WORKER
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  // Check if running in browser
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const success = await registration.unregister();
    
    if (success) {
      console.log('📱 PWA: Service worker unregistered successfully');
    }
    
    return success;
  } catch (error) {
    console.error('📱 PWA: Service worker unregistration failed:', error);
    return false;
  }
}

/**
 * CHECK FOR SERVICE WORKER UPDATES
 */
export async function checkForUpdates(): Promise<void> {
  // Check if running in browser
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    console.log('📱 PWA: Checked for updates');
  } catch (error) {
    console.error('📱 PWA: Update check failed:', error);
  }
}

/**
 * USAGE EXAMPLE:
 * 
 * const { canInstall, isInstalled, installPWA } = usePWAInstall();
 * 
 * if (canInstall) {
 *   <button onClick={installPWA}>Install App</button>
 * }
 */
