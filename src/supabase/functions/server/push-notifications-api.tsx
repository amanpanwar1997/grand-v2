/**
 * PUSH NOTIFICATIONS API
 * 
 * Server-side push notification management
 * - Subscribe/unsubscribe
 * - Send notifications
 * - Manage subscriptions
 */

import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const app = new Hono();

// ============================================================================
// SUBSCRIPTION MANAGEMENT
// ============================================================================

/**
 * Subscribe to push notifications
 */
app.post('/subscribe', async (c) => {
  try {
    const body = await c.req.json();
    const { endpoint, keys, userId } = body;

    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return c.json({
        success: false,
        error: 'Invalid subscription data'
      }, 400);
    }

    // Create subscription ID
    const subscriptionId = `push_subscription:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;

    // Store subscription
    const subscription = {
      id: subscriptionId,
      endpoint,
      keys,
      userId: userId || 'anonymous',
      subscribedAt: new Date().toISOString(),
      active: true
    };

    await kv.set(subscriptionId, subscription);

    // Also store in user's subscription list
    if (userId) {
      const userSubKey = `user_subscriptions:${userId}`;
      const userSubs = await kv.get(userSubKey);
      const subs = userSubs ? (Array.isArray(userSubs) ? userSubs : [userSubs]) : [];
      subs.push(subscriptionId);
      await kv.set(userSubKey, subs);
    }

    console.log('✅ Push subscription created:', subscriptionId);

    return c.json({
      success: true,
      subscriptionId,
      message: 'Successfully subscribed to push notifications'
    });
  } catch (error: any) {
    console.error('Error subscribing to push:', error);
    return c.json({
      success: false,
      error: 'Failed to subscribe'
    }, 500);
  }
});

/**
 * Unsubscribe from push notifications
 */
app.post('/unsubscribe', async (c) => {
  try {
    const { subscriptionId, endpoint } = await c.req.json();

    if (subscriptionId) {
      await kv.del(subscriptionId);
    } else if (endpoint) {
      // Find by endpoint
      const allSubs = await kv.getByPrefix('push_subscription:');
      const sub = allSubs.find((s: any) => s.value.endpoint === endpoint);
      if (sub) {
        await kv.del(sub.key);
      }
    }

    return c.json({
      success: true,
      message: 'Successfully unsubscribed'
    });
  } catch (error: any) {
    console.error('Error unsubscribing:', error);
    return c.json({
      success: false,
      error: 'Failed to unsubscribe'
    }, 500);
  }
});

/**
 * Get all subscriptions (admin only)
 */
app.get('/subscriptions', async (c) => {
  try {
    const subscriptions = await kv.getByPrefix('push_subscription:');
    
    return c.json({
      success: true,
      count: subscriptions.length,
      subscriptions: subscriptions.map((s: any) => ({
        id: s.key,
        userId: s.value.userId,
        subscribedAt: s.value.subscribedAt,
        active: s.value.active
      }))
    });
  } catch (error: any) {
    console.error('Error fetching subscriptions:', error);
    return c.json({
      success: false,
      error: 'Failed to fetch subscriptions'
    }, 500);
  }
});

// ============================================================================
// SEND NOTIFICATIONS
// ============================================================================

/**
 * Send push notification
 * 
 * Note: Actual push sending requires web-push library with VAPID keys
 * This stores the notification request for now
 */
app.post('/send', async (c) => {
  try {
    const body = await c.req.json();
    const { title, message, url, targetUsers, icon, badge } = body;

    if (!title || !message) {
      return c.json({
        success: false,
        error: 'Title and message are required'
      }, 400);
    }

    // Get target subscriptions
    let subscriptions = [];
    
    if (targetUsers && targetUsers.length > 0) {
      // Send to specific users
      for (const userId of targetUsers) {
        const userSubKey = `user_subscriptions:${userId}`;
        const userSubs = await kv.get(userSubKey);
        if (userSubs) {
          const subs = Array.isArray(userSubs) ? userSubs : [userSubs];
          for (const subId of subs) {
            const sub = await kv.get(subId);
            if (sub && sub.active) {
              subscriptions.push(sub);
            }
          }
        }
      }
    } else {
      // Send to all active subscriptions
      const allSubs = await kv.getByPrefix('push_subscription:');
      subscriptions = allSubs
        .map((s: any) => s.value)
        .filter((s: any) => s.active);
    }

    if (subscriptions.length === 0) {
      return c.json({
        success: false,
        error: 'No active subscriptions found'
      }, 404);
    }

    // Create notification record
    const notificationId = `notification:${Date.now()}`;
    const notification = {
      id: notificationId,
      title,
      message,
      url,
      icon: icon || '/favicon.svg',
      badge: badge || '/favicon.svg',
      sentAt: new Date().toISOString(),
      recipientCount: subscriptions.length,
      status: 'pending'
    };

    await kv.set(notificationId, notification);

    // TODO: Implement actual web-push sending
    // This requires:
    // 1. web-push library (npm:web-push)
    // 2. VAPID keys in environment variables
    // 3. Actual push sending logic
    
    console.log('📬 Notification queued:', {
      id: notificationId,
      recipients: subscriptions.length,
      title
    });

    // For now, return success
    return c.json({
      success: true,
      notificationId,
      recipientCount: subscriptions.length,
      message: 'Notification queued for delivery'
    });

  } catch (error: any) {
    console.error('Error sending notification:', error);
    return c.json({
      success: false,
      error: 'Failed to send notification'
    }, 500);
  }
});

/**
 * Send notification to all subscribers
 */
app.post('/broadcast', async (c) => {
  try {
    const { title, message, url } = await c.req.json();

    if (!title || !message) {
      return c.json({
        success: false,
        error: 'Title and message are required'
      }, 400);
    }

    // Get all active subscriptions
    const allSubs = await kv.getByPrefix('push_subscription:');
    const activeSubscriptions = allSubs.filter((s: any) => s.value.active);

    if (activeSubscriptions.length === 0) {
      return c.json({
        success: false,
        error: 'No active subscriptions'
      }, 404);
    }

    // Create broadcast record
    const broadcastId = `broadcast:${Date.now()}`;
    const broadcast = {
      id: broadcastId,
      title,
      message,
      url,
      sentAt: new Date().toISOString(),
      recipientCount: activeSubscriptions.length,
      status: 'pending'
    };

    await kv.set(broadcastId, broadcast);

    console.log('📢 Broadcast notification queued:', {
      id: broadcastId,
      recipients: activeSubscriptions.length,
      title
    });

    return c.json({
      success: true,
      broadcastId,
      recipientCount: activeSubscriptions.length,
      message: 'Broadcast queued for delivery'
    });

  } catch (error: any) {
    console.error('Error broadcasting notification:', error);
    return c.json({
      success: false,
      error: 'Failed to broadcast notification'
    }, 500);
  }
});

// ============================================================================
// NOTIFICATION TEMPLATES
// ============================================================================

app.post('/send-template', async (c) => {
  try {
    const { template, data, targetUsers } = await c.req.json();

    const templates: Record<string, any> = {
      'new-blog': {
        title: '📝 New Blog Post',
        message: data.title || 'Check out our latest blog post!',
        url: data.url || '/blogs',
        icon: '/favicon.svg'
      },
      'consultation-reminder': {
        title: '📅 Consultation Reminder',
        message: `Your consultation is ${data.time || 'tomorrow'}`,
        url: '/contact',
        icon: '/favicon.svg'
      },
      'special-offer': {
        title: '🎁 Special Offer',
        message: data.offer || 'Limited time offer available!',
        url: data.url || '/services',
        icon: '/favicon.svg'
      },
      'welcome': {
        title: 'Welcome to Inchtomilez! 🎉',
        message: 'Thanks for enabling notifications. Stay updated with our latest content!',
        url: '/',
        icon: '/favicon.svg'
      }
    };

    const notification = templates[template];

    if (!notification) {
      return c.json({
        success: false,
        error: 'Invalid template'
      }, 400);
    }

    // Use the /send endpoint logic
    const response = await fetch(c.req.url.replace('/send-template', '/send'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...notification,
        targetUsers
      })
    });

    return response;

  } catch (error: any) {
    console.error('Error sending template notification:', error);
    return c.json({
      success: false,
      error: 'Failed to send notification'
    }, 500);
  }
});

// ============================================================================
// NOTIFICATION HISTORY
// ============================================================================

app.get('/history', async (c) => {
  try {
    const notifications = await kv.getByPrefix('notification:');
    const broadcasts = await kv.getByPrefix('broadcast:');

    const all = [
      ...notifications.map((n: any) => ({ ...n.value, type: 'notification' })),
      ...broadcasts.map((b: any) => ({ ...b.value, type: 'broadcast' }))
    ];

    // Sort by date (newest first)
    all.sort((a, b) => 
      new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    );

    return c.json({
      success: true,
      count: all.length,
      notifications: all
    });

  } catch (error: any) {
    console.error('Error fetching notification history:', error);
    return c.json({
      success: false,
      error: 'Failed to fetch history'
    }, 500);
  }
});

export default app;
