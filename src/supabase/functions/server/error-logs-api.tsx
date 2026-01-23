/**
 * ERROR LOGS API
 * Complete error tracking and monitoring system
 * 
 * Features:
 * - Automatic error logging
 * - Error categorization (frontend, backend, API)
 * - Severity levels
 * - Stack trace capture
 * - Context tracking (user, URL, browser, etc.)
 * - Error statistics and patterns
 */

import { Hono } from 'npm:hono';
import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

const errorLogsApi = new Hono();

// ============================================================
// DATA MODELS
// ============================================================

interface ErrorLog {
  id: string;
  type: 'frontend' | 'backend' | 'api' | 'database' | 'external';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  stack?: string;
  context: {
    url?: string;
    method?: string;
    user_id?: string;
    user_agent?: string;
    ip?: string;
    browser?: string;
    os?: string;
    device?: string;
  };
  timestamp: string;
  resolved: boolean;
  resolved_at?: string;
  resolved_by?: string;
  notes?: string;
  occurrences: number;
  first_seen: string;
  last_seen: string;
}

interface ErrorStats {
  total_errors: number;
  by_type: Record<string, number>;
  by_severity: Record<string, number>;
  recent_errors: ErrorLog[];
  top_errors: Array<{
    message: string;
    count: number;
    severity: string;
  }>;
}

// ============================================================
// ERROR CRUD
// ============================================================

/**
 * Get all error logs
 * GET /error-logs/all
 */
errorLogsApi.get('/all', async (c: Context) => {
  try {
    const {
      type,
      severity,
      resolved = 'all',
      limit = '100',
      offset = '0'
    } = c.req.query();
    
    let errors = await kv.getByPrefix('error_log:');
    
    // Map to values
    let errorsList = errors.map((e: any) => e.value).filter((e: any) => e);
    
    // Apply filters
    if (type && type !== 'all') {
      errorsList = errorsList.filter((e: any) => e.type === type);
    }
    
    if (severity && severity !== 'all') {
      errorsList = errorsList.filter((e: any) => e.severity === severity);
    }
    
    if (resolved !== 'all') {
      const isResolved = resolved === 'true';
      errorsList = errorsList.filter((e: any) => e.resolved === isResolved);
    }
    
    // Sort by last seen (newest first)
    errorsList.sort((a: any, b: any) => 
      new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime()
    );
    
    // Pagination
    const total = errorsList.length;
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);
    const paginatedErrors = errorsList.slice(offsetNum, offsetNum + limitNum);
    
    return c.json({
      success: true,
      errors: paginatedErrors,
      total: total,
      limit: limitNum,
      offset: offsetNum,
      has_more: offsetNum + limitNum < total
    });
  } catch (error: any) {
    console.error('Error fetching error logs:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Get single error log
 * GET /error-logs/:id
 */
errorLogsApi.get('/:id', async (c: Context) => {
  try {
    const id = c.req.param('id');
    
    const errorLog = await kv.get(`error_log:${id}`);
    
    if (!errorLog) {
      return c.json({
        success: false,
        error: 'Error log not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      error_log: errorLog
    });
  } catch (error: any) {
    console.error('Error fetching error log:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Log new error
 * POST /error-logs/log
 */
errorLogsApi.post('/log', async (c: Context) => {
  try {
    const body = await c.req.json();
    const {
      type = 'backend',
      severity = 'medium',
      message,
      stack,
      context = {}
    } = body;
    
    if (!message) {
      return c.json({
        success: false,
        error: 'message is required'
      }, 400);
    }
    
    // Get client info from headers
    const userAgent = c.req.header('user-agent') || 'unknown';
    const ip = c.req.header('x-forwarded-for') || 
               c.req.header('x-real-ip') || 
               'unknown';
    
    // Create error signature to group similar errors
    const errorSignature = createErrorSignature(message, stack);
    
    // Check if similar error exists
    const existingErrors = await kv.getByPrefix('error_log:');
    const similarError = existingErrors.find((e: any) => {
      if (!e.value) return false;
      const existingSignature = createErrorSignature(e.value.message, e.value.stack);
      return existingSignature === errorSignature;
    });
    
    const now = new Date().toISOString();
    
    if (similarError) {
      // Update existing error
      const updated: ErrorLog = {
        ...similarError.value,
        occurrences: (similarError.value.occurrences || 1) + 1,
        last_seen: now,
        severity: getHigherSeverity(similarError.value.severity, severity)
      };
      
      await kv.set(similarError.key, updated);
      
      console.log(`⚠️  Error recurred: ${message} (${updated.occurrences} times)`);
      
      return c.json({
        success: true,
        message: 'Error logged (updated existing)',
        error_log: updated,
        is_duplicate: true
      });
    } else {
      // Create new error log
      const errorId = `error_log:${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const errorLog: ErrorLog = {
        id: errorId,
        type,
        severity,
        message,
        stack,
        context: {
          ...context,
          user_agent: context.user_agent || userAgent,
          ip: context.ip || ip
        },
        timestamp: now,
        resolved: false,
        occurrences: 1,
        first_seen: now,
        last_seen: now
      };
      
      await kv.set(errorId, errorLog);
      
      console.error(`❌ NEW ERROR LOGGED [${severity.toUpperCase()}]: ${message}`);
      if (stack) {
        console.error(`   Stack: ${stack.split('\n')[0]}`);
      }
      
      return c.json({
        success: true,
        message: 'Error logged successfully',
        error_log: errorLog,
        is_duplicate: false
      });
    }
  } catch (error: any) {
    console.error('Error logging error (meta!):', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Mark error as resolved
 * POST /error-logs/resolve
 */
errorLogsApi.post('/resolve', async (c: Context) => {
  try {
    const { id, notes, resolved_by } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'id is required'
      }, 400);
    }
    
    const errorLog = await kv.get(id);
    
    if (!errorLog) {
      return c.json({
        success: false,
        error: 'Error log not found'
      }, 404);
    }
    
    const updated: ErrorLog = {
      ...errorLog,
      resolved: true,
      resolved_at: new Date().toISOString(),
      resolved_by: resolved_by || 'admin',
      notes: notes || errorLog.notes
    };
    
    await kv.set(id, updated);
    
    console.log(`✅ Error resolved: ${errorLog.message}`);
    
    return c.json({
      success: true,
      message: 'Error marked as resolved',
      error_log: updated
    });
  } catch (error: any) {
    console.error('Error resolving error log:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Delete error log
 * POST /error-logs/delete
 */
errorLogsApi.post('/delete', async (c: Context) => {
  try {
    const { id } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'id is required'
      }, 400);
    }
    
    const errorLog = await kv.get(id);
    
    if (!errorLog) {
      return c.json({
        success: false,
        error: 'Error log not found'
      }, 404);
    }
    
    await kv.del(id);
    
    console.log(`🗑️  Error log deleted: ${errorLog.message}`);
    
    return c.json({
      success: true,
      message: 'Error log deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting error log:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Clear all error logs
 * POST /error-logs/clear
 */
errorLogsApi.post('/clear', async (c: Context) => {
  try {
    const { resolved_only = false } = await c.req.json();
    
    const errors = await kv.getByPrefix('error_log:');
    
    let deletedCount = 0;
    
    for (const error of errors) {
      if (resolved_only) {
        if (error.value?.resolved) {
          await kv.del(error.key);
          deletedCount++;
        }
      } else {
        await kv.del(error.key);
        deletedCount++;
      }
    }
    
    console.log(`🗑️  Cleared ${deletedCount} error logs`);
    
    return c.json({
      success: true,
      message: `Cleared ${deletedCount} error logs`,
      deleted_count: deletedCount
    });
  } catch (error: any) {
    console.error('Error clearing error logs:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// ============================================================
// ERROR STATISTICS
// ============================================================

/**
 * Get error statistics
 * GET /error-logs/stats
 */
errorLogsApi.get('/stats', async (c: Context) => {
  try {
    const { days = '7' } = c.req.query();
    
    const errors = await kv.getByPrefix('error_log:');
    const errorsList = errors.map((e: any) => e.value).filter((e: any) => e);
    
    // Filter by date range
    const daysNum = parseInt(days);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysNum);
    
    const recentErrors = errorsList.filter((e: any) => 
      new Date(e.last_seen) >= cutoffDate
    );
    
    // Calculate statistics
    const byType: Record<string, number> = {};
    const bySeverity: Record<string, number> = {};
    const errorCounts = new Map<string, { message: string; count: number; severity: string }>();
    
    recentErrors.forEach((error: any) => {
      // By type
      byType[error.type] = (byType[error.type] || 0) + 1;
      
      // By severity
      bySeverity[error.severity] = (bySeverity[error.severity] || 0) + 1;
      
      // Top errors
      const existing = errorCounts.get(error.message) || { 
        message: error.message, 
        count: 0, 
        severity: error.severity 
      };
      existing.count += error.occurrences;
      errorCounts.set(error.message, existing);
    });
    
    // Get top 10 errors
    const topErrors = Array.from(errorCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Get recent errors (last 20)
    const recentErrorsList = recentErrors
      .sort((a: any, b: any) => 
        new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime()
      )
      .slice(0, 20);
    
    const stats: ErrorStats = {
      total_errors: recentErrors.length,
      by_type: byType,
      by_severity: bySeverity,
      recent_errors: recentErrorsList,
      top_errors: topErrors
    };
    
    return c.json({
      success: true,
      stats: stats,
      period_days: daysNum
    });
  } catch (error: any) {
    console.error('Error fetching error stats:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Create error signature for grouping similar errors
 */
function createErrorSignature(message: string, stack?: string): string {
  // Use first line of stack trace if available, otherwise just message
  const key = stack ? `${message}:${stack.split('\n')[0]}` : message;
  
  // Simple hash (in production, use a proper hash function)
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return hash.toString(36);
}

/**
 * Get higher severity between two levels
 */
function getHigherSeverity(
  severity1: string,
  severity2: string
): 'low' | 'medium' | 'high' | 'critical' {
  const levels = ['low', 'medium', 'high', 'critical'];
  const index1 = levels.indexOf(severity1);
  const index2 = levels.indexOf(severity2);
  
  return levels[Math.max(index1, index2)] as any;
}

/**
 * Bulk resolve errors
 * POST /error-logs/bulk-resolve
 */
errorLogsApi.post('/bulk-resolve', async (c: Context) => {
  try {
    const { ids, notes, resolved_by } = await c.req.json();
    
    if (!ids || !Array.isArray(ids)) {
      return c.json({
        success: false,
        error: 'ids array is required'
      }, 400);
    }
    
    let resolvedCount = 0;
    
    for (const id of ids) {
      const errorLog = await kv.get(id);
      
      if (errorLog) {
        const updated: ErrorLog = {
          ...errorLog,
          resolved: true,
          resolved_at: new Date().toISOString(),
          resolved_by: resolved_by || 'admin',
          notes: notes || errorLog.notes
        };
        
        await kv.set(id, updated);
        resolvedCount++;
      }
    }
    
    console.log(`✅ Bulk resolved ${resolvedCount} errors`);
    
    return c.json({
      success: true,
      message: `${resolvedCount} error(s) marked as resolved`,
      resolved_count: resolvedCount
    });
  } catch (error: any) {
    console.error('Error bulk resolving errors:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

export default errorLogsApi;
