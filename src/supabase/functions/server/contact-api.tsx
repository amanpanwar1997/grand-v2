/**
 * CONTACT FORM API WITH SECURITY
 * 
 * Features:
 * - Rate limiting
 * - Honeypot validation
 * - Email notifications
 * - Lead storage
 */

import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';
import { rateLimitMiddleware, contactFormLimiter, getClientIP } from './rate-limiter.tsx';
import { honeypotMiddleware, detectBot } from './honeypot-validator.tsx';

const app = new Hono();

// ============================================================================
// CONTACT FORM SUBMISSION
// ============================================================================

app.post('/submit',
  rateLimitMiddleware(contactFormLimiter),
  honeypotMiddleware(),
  async (c) => {
    try {
      // Get validated body from honeypot middleware
      const body = c.get('validatedBody') || await c.req.json();
      
      const { name, email, phone, message, service, company } = body;

      // Validate required fields
      if (!name || !email || !message) {
        return c.json({
          success: false,
          error: 'Name, email, and message are required'
        }, 400);
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return c.json({
          success: false,
          error: 'Invalid email address'
        }, 400);
      }

      // Additional bot detection
      const botCheck = detectBot(body, c.req.raw.headers);
      if (botCheck.isBot) {
        console.warn('🚫 Bot detected:', botCheck.reason);
        
        // Return success to fool bots
        return c.json({
          success: true,
          message: 'Thank you for contacting us! We will get back to you soon.'
        });
      }

      // Get client info
      const ip = getClientIP(c.req.raw);
      const userAgent = c.req.header('user-agent') || 'unknown';

      // Create lead ID
      const leadId = `contact_lead:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;

      // Create lead data
      const leadData = {
        id: leadId,
        name,
        email,
        phone: phone || null,
        message,
        service: service || null,
        company: company || null,
        source: 'contact_form',
        status: 'new',
        ip,
        userAgent,
        submittedAt: new Date().toISOString(),
        read: false
      };

      // Store in KV store
      await kv.set(leadId, leadData);

      // Also add to leads index for easy retrieval
      const indexKey = `contact_leads_index:${new Date().toISOString()}:${leadId}`;
      await kv.set(indexKey, {
        id: leadId,
        name,
        email,
        phone,
        service,
        submittedAt: leadData.submittedAt,
        status: 'new'
      });

      console.log('✅ Contact form submission saved:', {
        id: leadId,
        name,
        email,
        service
      });

      // TODO: Send email notification
      // This would require email service integration (SendGrid, Resend, etc.)
      // For now, just log it
      console.log('📧 Email notification would be sent to admin');

      // TODO: Send auto-reply email to user
      console.log('📧 Auto-reply would be sent to:', email);

      return c.json({
        success: true,
        leadId,
        message: 'Thank you for contacting us! We will get back to you within 24 hours.'
      });

    } catch (error: any) {
      console.error('Error processing contact form:', error);
      return c.json({
        success: false,
        error: 'An error occurred. Please try again later.'
      }, 500);
    }
  }
);

// ============================================================================
// GET ALL CONTACT LEADS (Admin)
// ============================================================================

app.get('/leads', async (c) => {
  try {
    const { status, limit = '50', offset = '0' } = c.req.query();
    
    // Get all leads from index
    let leads = await kv.getByPrefix('contact_leads_index:');
    
    // Filter by status if provided
    if (status && status !== 'all') {
      const fullLeads = await Promise.all(
        leads.map(async (l: any) => {
          const fullLead = await kv.get(l.value.id);
          return fullLead;
        })
      );
      
      leads = fullLeads.filter((l: any) => l && l.status === status);
    } else {
      leads = leads.map((l: any) => l.value);
    }

    // Sort by submission date (newest first)
    leads.sort((a: any, b: any) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    // Pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedLeads = leads.slice(startIndex, endIndex);

    return c.json({
      success: true,
      total: leads.length,
      count: paginatedLeads.length,
      offset: startIndex,
      limit: parseInt(limit),
      leads: paginatedLeads
    });

  } catch (error: any) {
    console.error('Error fetching contact leads:', error);
    return c.json({
      success: false,
      error: 'Failed to fetch leads'
    }, 500);
  }
});

// ============================================================================
// GET SINGLE LEAD
// ============================================================================

app.get('/leads/:id', async (c) => {
  try {
    const { id } = c.req.param();
    
    const lead = await kv.get(id);
    
    if (!lead) {
      return c.json({
        success: false,
        error: 'Lead not found'
      }, 404);
    }

    // Mark as read
    if (!lead.read) {
      lead.read = true;
      lead.readAt = new Date().toISOString();
      await kv.set(id, lead);
    }

    return c.json({
      success: true,
      lead
    });

  } catch (error: any) {
    console.error('Error fetching lead:', error);
    return c.json({
      success: false,
      error: 'Failed to fetch lead'
    }, 500);
  }
});

// ============================================================================
// UPDATE LEAD STATUS
// ============================================================================

app.post('/leads/:id/status', async (c) => {
  try {
    const { id } = c.req.param();
    const { status } = await c.req.json();

    const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'rejected'];
    
    if (!validStatuses.includes(status)) {
      return c.json({
        success: false,
        error: 'Invalid status'
      }, 400);
    }

    const lead = await kv.get(id);
    
    if (!lead) {
      return c.json({
        success: false,
        error: 'Lead not found'
      }, 404);
    }

    lead.status = status;
    lead.statusUpdatedAt = new Date().toISOString();
    
    await kv.set(id, lead);

    // Update index
    const indexKeys = await kv.getByPrefix('contact_leads_index:');
    const indexEntry = indexKeys.find((k: any) => k.value.id === id);
    if (indexEntry) {
      indexEntry.value.status = status;
      await kv.set(indexEntry.key, indexEntry.value);
    }

    return c.json({
      success: true,
      lead
    });

  } catch (error: any) {
    console.error('Error updating lead status:', error);
    return c.json({
      success: false,
      error: 'Failed to update status'
    }, 500);
  }
});

// ============================================================================
// DELETE LEAD
// ============================================================================

app.delete('/leads/:id', async (c) => {
  try {
    const { id } = c.req.param();

    // Delete lead
    await kv.del(id);

    // Delete from index
    const indexKeys = await kv.getByPrefix('contact_leads_index:');
    const indexEntry = indexKeys.find((k: any) => k.value.id === id);
    if (indexEntry) {
      await kv.del(indexEntry.key);
    }

    return c.json({
      success: true,
      message: 'Lead deleted successfully'
    });

  } catch (error: any) {
    console.error('Error deleting lead:', error);
    return c.json({
      success: false,
      error: 'Failed to delete lead'
    }, 500);
  }
});

// ============================================================================
// GET CONTACT STATS
// ============================================================================

app.get('/stats', async (c) => {
  try {
    const leads = await kv.getByPrefix('contact_lead:');
    
    const stats = {
      total: leads.length,
      new: 0,
      contacted: 0,
      qualified: 0,
      converted: 0,
      rejected: 0,
      unread: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0
    };

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    for (const entry of leads) {
      const lead = entry.value;
      
      // Count by status
      stats[lead.status as keyof typeof stats]++;
      
      // Count unread
      if (!lead.read) stats.unread++;
      
      // Count by time period
      const submittedAt = new Date(lead.submittedAt);
      if (submittedAt >= todayStart) stats.today++;
      if (submittedAt >= weekStart) stats.thisWeek++;
      if (submittedAt >= monthStart) stats.thisMonth++;
    }

    return c.json({
      success: true,
      stats
    });

  } catch (error: any) {
    console.error('Error fetching contact stats:', error);
    return c.json({
      success: false,
      error: 'Failed to fetch stats'
    }, 500);
  }
});

export default app;
