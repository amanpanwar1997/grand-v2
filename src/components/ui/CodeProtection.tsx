import { useEffect } from 'react';

/**
 * 🔒 CODE PROTECTION COMPONENT
 * 
 * Prevents users from:
 * - Right-clicking (inspect element)
 * - Using keyboard shortcuts (F12, Ctrl+U, etc.)
 * - Opening DevTools
 * - Viewing page source
 * 
 * ✅ Bot-Friendly: Allows search engine crawlers full access
 * ✅ SEO Safe: Doesn't affect Googlebot, Bingbot, etc.
 */

export function CodeProtection() {
  useEffect(() => {
    // Check if running in browser (not during SSR/prerendering)
    if (typeof navigator === 'undefined') {
      return;
    }

    // Detect if visitor is a bot/crawler
    const isBot = /bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|yahoo|ecosia|ia_archiver|semrush|ahrefs|screaming frog|rogerbot|dotbot|petalbot/i.test(
      navigator.userAgent
    );

    // If bot, skip all protections
    if (isBot) {
      console.log('🤖 Bot detected - Code protection disabled for crawler access');
      return;
    }

    // === DISABLE RIGHT-CLICK ===
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // === DISABLE KEYBOARD SHORTCUTS ===
    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      // F12 (DevTools)
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+K (Firefox Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+I (Mac DevTools)
      if (e.metaKey && e.altKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+J (Mac Console)
      if (e.metaKey && e.altKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+C (Mac Inspect)
      if (e.metaKey && e.altKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }

      // Cmd+U (Mac View Source)
      if (e.metaKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
    };

    // === CONSOLE WARNING ONLY (No blocking overlay) ===
    // Just warn in console, don't block the website

    // === DISABLE TEXT SELECTION ON SPECIFIC ELEMENTS (OPTIONAL) ===
    const disableTextSelection = (e: Event) => {
      const target = e.target as HTMLElement;
      // Only disable selection for code/pre elements
      if (target.tagName === 'CODE' || target.tagName === 'PRE') {
        e.preventDefault();
        return false;
      }
    };

    // === DISABLE IMAGE DRAGGING ===
    const disableDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('keydown', disableKeyboardShortcuts);
    document.addEventListener('selectstart', disableTextSelection);
    document.addEventListener('dragstart', disableDragStart);

    // Console warning message (no blocking overlay)
    console.log('%c⚠️ PROTECTED WEBSITE', 'color: #eab308; font-size: 1.5rem; font-weight: bold;');
    console.log(
      '%cThis website is protected. Unauthorized copying is prohibited.',
      'color: #fff; font-size: 1rem;'
    );
    console.log(
      '%c© Inchtomilez Digital Marketing & Advertising Agency',
      'color: #666; font-size: 0.9rem;'
    );

    // Cleanup on unmount
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableKeyboardShortcuts);
      document.removeEventListener('selectstart', disableTextSelection);
      document.removeEventListener('dragstart', disableDragStart);
    };
  }, []);

  return null; // This component doesn't render anything
}
