/**
 * PUSH NOTIFICATIONS UTILITY
 * 
 * Features:
 * - Request permission
 * - Subscribe to push notifications
 * - Send notifications
 * - Manage subscriptions
 * - Track notification engagement
 */

// ============================================================================
// TYPES
// ============================================================================

export interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  url?: string;
  tag?: string;
  requireInteraction?: boolean;
  actions?: NotificationAction[];
}

// ============================================================================
// PERMISSION MANAGEMENT
// ============================================================================

/**
 * Check if push notifications are supported
 */
export function isPushSupported(): boolean {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

/**
 * Check current notification permission status
 */
export function getPermissionStatus(): NotificationPermission {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

/**
 * Request notification permission
 */
export async function requestPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.error('Notifications not supported');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    
    // Track permission response
    if (window.gtag) {
      window.gtag('event', 'notification_permission', {
        permission_status: permission
      });
    }
    
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
}

// ============================================================================
// SUBSCRIPTION MANAGEMENT
// ============================================================================

/**
 * Subscribe to push notifications
 */
export async function subscribeToPush(): Promise<PushSubscriptionData | null> {
  if (!isPushSupported()) {
    console.error('Push notifications not supported');
    return null;
  }

  try {
    // Get service worker registration
    const registration = await navigator.serviceWorker.ready;

    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      // Subscribe to push
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(getVAPIDPublicKey())
      });
    }

    // Convert to JSON
    const subscriptionData = subscription.toJSON();

    return {
      endpoint: subscriptionData.endpoint!,
      keys: {
        p256dh: subscriptionData.keys!.p256dh!,
        auth: subscriptionData.keys!.auth!
      }
    };
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return null;
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPush(): Promise<boolean> {
  if (!isPushSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error unsubscribing from push:', error);
    return false;
  }
}

/**
 * Check if user is subscribed
 */
export async function isSubscribed(): Promise<boolean> {
  if (!isPushSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return !!subscription;
  } catch (error) {
    return false;
  }
}

// ============================================================================
// NOTIFICATION SENDING
// ============================================================================

/**
 * Show local notification (doesn't require push service)
 */
export async function showNotification(options: NotificationOptions): Promise<void> {
  if (!('Notification' in window)) {
    console.error('Notifications not supported');
    return;
  }

  const permission = await requestPermission();
  
  if (permission !== 'granted') {
    console.warn('Notification permission denied');
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  await registration.showNotification(options.title, {
    body: options.body,
    icon: options.icon || '/favicon.svg',
    badge: options.badge || '/favicon.svg',
    image: options.image,
    tag: options.tag || 'inchtomilez-notification',
    requireInteraction: options.requireInteraction || false,
    vibrate: [200, 100, 200],
    data: {
      url: options.url || '/'
    },
    actions: options.actions || [
      { action: 'view', title: 'View' },
      { action: 'close', title: 'Close' }
    ]
  });
}

/**
 * Send push notification via server
 */
export async function sendPushNotification(
  subscriptionData: PushSubscriptionData,
  notification: NotificationOptions
): Promise<boolean> {
  try {
    const response = await fetch('/api/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscriptionData,
        notification
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending push notification:', error);
    return false;
  }
}

// ============================================================================
// NOTIFICATION TEMPLATES
// ============================================================================

export const NOTIFICATION_TEMPLATES = {
  WELCOME: {
    title: 'Welcome to Inchtomilez! 🎉',
    body: 'Thanks for enabling notifications. Stay updated with our latest blog posts and offers.',
    icon: '/favicon.svg'
  },

  NEW_BLOG: (title: string) => ({
    title: 'New Blog Post 📝',
    body: title,
    icon: '/favicon.svg',
    url: '/blogs'
  }),

  CONSULTATION_REMINDER: {
    title: 'Consultation Reminder 📅',
    body: 'Your free consultation is scheduled for tomorrow at 10 AM.',
    icon: '/favicon.svg',
    requireInteraction: true
  },

  SPECIAL_OFFER: (offer: string) => ({
    title: 'Special Offer! 🎁',
    body: offer,
    icon: '/favicon.svg',
    requireInteraction: true
  }),

  FORM_SYNCED: {
    title: 'Form Submitted ✅',
    body: 'Your message has been sent successfully!',
    icon: '/favicon.svg'
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert VAPID key from base64 to Uint8Array
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Get VAPID public key (replace with your key)
 */
function getVAPIDPublicKey(): string {
  // TODO: Replace with your actual VAPID public key
  // Generate keys at: https://web-push-codelab.glitch.me/
  return process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 
         'YOUR_VAPID_PUBLIC_KEY_HERE';
}

// ============================================================================
// REACT HOOK
// ============================================================================

import { useState, useEffect } from 'react';

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check initial status
    setPermission(getPermissionStatus());
    
    // Check if subscribed
    isSubscribed().then(setSubscribed);
  }, []);

  const request = async () => {
    setLoading(true);
    const perm = await requestPermission();
    setPermission(perm);
    setLoading(false);
    return perm;
  };

  const subscribe = async () => {
    setLoading(true);
    
    // Request permission first
    const perm = await requestPermission();
    if (perm !== 'granted') {
      setLoading(false);
      return null;
    }

    // Subscribe
    const subscription = await subscribeToPush();
    setSubscribed(!!subscription);
    setLoading(false);

    // Save subscription to backend
    if (subscription) {
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

      // Show welcome notification
      await showNotification(NOTIFICATION_TEMPLATES.WELCOME);
    }

    return subscription;
  };

  const unsubscribe = async () => {
    setLoading(true);
    const success = await unsubscribeFromPush();
    setSubscribed(!success);
    setLoading(false);
    return success;
  };

  const notify = async (options: NotificationOptions) => {
    await showNotification(options);
  };

  return {
    permission,
    subscribed,
    loading,
    supported: isPushSupported(),
    request,
    subscribe,
    unsubscribe,
    notify
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  isPushSupported,
  getPermissionStatus,
  requestPermission,
  subscribeToPush,
  unsubscribeFromPush,
  isSubscribed,
  showNotification,
  sendPushNotification,
  NOTIFICATION_TEMPLATES,
  usePushNotifications
};
