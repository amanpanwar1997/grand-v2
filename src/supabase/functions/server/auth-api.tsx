/**
 * COMPLETE AUTHENTICATION API
 * Advanced authentication features
 * 
 * Features:
 * - Refresh token mechanism
 * - OTP (One-Time Password) login
 * - Password reset flow
 * - Email verification
 * - Session management
 */

import { Hono } from 'npm:hono';
import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

const authApi = new Hono();

// ============================================================
// DATA MODELS
// ============================================================

interface RefreshToken {
  token: string;
  user_id: string;
  expires_at: string;
  created_at: string;
}

interface OTPCode {
  email: string;
  code: string;
  expires_at: string;
  created_at: string;
  attempts: number;
}

interface PasswordResetToken {
  token: string;
  email: string;
  expires_at: string;
  created_at: string;
  used: boolean;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Generate random token
 */
function generateToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Generate 6-digit OTP code
 */
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Hash password (simple for demo - use bcrypt in production)
 */
function hashPassword(password: string): string {
  // NOTE: This is a simple hash for demo purposes
  // In production, use bcrypt or similar
  return btoa(password);
}

/**
 * Verify password
 */
function verifyPassword(password: string, hash: string): boolean {
  return btoa(password) === hash;
}

/**
 * Send email (mock function - integrate with real email service)
 */
async function sendEmail(to: string, subject: string, body: string): Promise<boolean> {
  console.log(`📧 EMAIL SENT TO: ${to}`);
  console.log(`   Subject: ${subject}`);
  console.log(`   Body: ${body}`);
  console.log(`   (In production, integrate with SendGrid/AWS SES/etc.)`);
  
  // TODO: Integrate with real email service
  // Example: SendGrid, AWS SES, Mailgun, etc.
  
  return true;
}

// ============================================================
// REFRESH TOKEN
// ============================================================

/**
 * Refresh access token
 * POST /auth/refresh
 */
authApi.post('/refresh', async (c: Context) => {
  try {
    const { refresh_token } = await c.req.json();
    
    if (!refresh_token) {
      return c.json({
        success: false,
        error: 'refresh_token is required'
      }, 400);
    }
    
    // Get refresh token from KV
    const tokenData = await kv.get(`refresh_token:${refresh_token}`);
    
    if (!tokenData) {
      return c.json({
        success: false,
        error: 'Invalid refresh token'
      }, 401);
    }
    
    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      await kv.del(`refresh_token:${refresh_token}`);
      return c.json({
        success: false,
        error: 'Refresh token expired'
      }, 401);
    }
    
    // Get user data
    const user = await kv.get(`user:${tokenData.user_id}`);
    
    if (!user) {
      return c.json({
        success: false,
        error: 'User not found'
      }, 404);
    }
    
    // Generate new access token
    const newAccessToken = generateToken(64);
    const accessTokenExpiry = new Date();
    accessTokenExpiry.setHours(accessTokenExpiry.getHours() + 1); // 1 hour
    
    // Store new access token
    await kv.set(`access_token:${newAccessToken}`, {
      user_id: user.id,
      expires_at: accessTokenExpiry.toISOString(),
      created_at: new Date().toISOString()
    });
    
    console.log(`✅ Token refreshed for user: ${user.email}`);
    
    return c.json({
      success: true,
      access_token: newAccessToken,
      expires_in: 3600, // 1 hour in seconds
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Error refreshing token:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Create refresh token for user
 * Internal helper function
 */
async function createRefreshToken(userId: string): Promise<string> {
  const refreshToken = generateToken(64);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days
  
  const tokenData: RefreshToken = {
    token: refreshToken,
    user_id: userId,
    expires_at: expiresAt.toISOString(),
    created_at: new Date().toISOString()
  };
  
  await kv.set(`refresh_token:${refreshToken}`, tokenData);
  
  return refreshToken;
}

// ============================================================
// OTP LOGIN
// ============================================================

/**
 * Send OTP code to email
 * POST /auth/otp/send
 */
authApi.post('/otp/send', async (c: Context) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({
        success: false,
        error: 'email is required'
      }, 400);
    }
    
    // Verify user exists
    const users = await kv.getByPrefix('user:');
    const user = users.find((u: any) => u.value?.email === email);
    
    if (!user) {
      // Don't reveal if user exists or not for security
      return c.json({
        success: true,
        message: 'If the email exists, an OTP has been sent'
      });
    }
    
    // Generate OTP code
    const otpCode = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes
    
    const otpData: OTPCode = {
      email,
      code: otpCode,
      expires_at: expiresAt.toISOString(),
      created_at: new Date().toISOString(),
      attempts: 0
    };
    
    await kv.set(`otp:${email}`, otpData);
    
    // Send OTP via email
    await sendEmail(
      email,
      'Your Login Code - Inchtomilez Admin',
      `Your one-time login code is: ${otpCode}\n\nThis code expires in 10 minutes.\n\nIf you didn't request this code, please ignore this email.`
    );
    
    console.log(`✅ OTP sent to: ${email} (Code: ${otpCode})`);
    
    return c.json({
      success: true,
      message: 'OTP sent to your email',
      expires_in: 600 // 10 minutes in seconds
    });
  } catch (error: any) {
    console.error('Error sending OTP:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Verify OTP and login
 * POST /auth/otp/verify
 */
authApi.post('/otp/verify', async (c: Context) => {
  try {
    const { email, code } = await c.req.json();
    
    if (!email || !code) {
      return c.json({
        success: false,
        error: 'email and code are required'
      }, 400);
    }
    
    // Get OTP data
    const otpData = await kv.get(`otp:${email}`);
    
    if (!otpData) {
      return c.json({
        success: false,
        error: 'Invalid or expired OTP'
      }, 401);
    }
    
    // Check if expired
    if (new Date(otpData.expires_at) < new Date()) {
      await kv.del(`otp:${email}`);
      return c.json({
        success: false,
        error: 'OTP expired'
      }, 401);
    }
    
    // Check attempts (max 5)
    if (otpData.attempts >= 5) {
      await kv.del(`otp:${email}`);
      return c.json({
        success: false,
        error: 'Too many attempts. Please request a new OTP.'
      }, 429);
    }
    
    // Verify code
    if (otpData.code !== code) {
      // Increment attempts
      otpData.attempts++;
      await kv.set(`otp:${email}`, otpData);
      
      return c.json({
        success: false,
        error: 'Invalid OTP code',
        attempts_remaining: 5 - otpData.attempts
      }, 401);
    }
    
    // OTP verified! Get user and create session
    const users = await kv.getByPrefix('user:');
    const userEntry = users.find((u: any) => u.value?.email === email);
    
    if (!userEntry) {
      return c.json({
        success: false,
        error: 'User not found'
      }, 404);
    }
    
    const user = userEntry.value;
    
    // Delete used OTP
    await kv.del(`otp:${email}`);
    
    // Generate tokens
    const accessToken = generateToken(64);
    const refreshToken = await createRefreshToken(user.id);
    
    const accessTokenExpiry = new Date();
    accessTokenExpiry.setHours(accessTokenExpiry.getHours() + 1);
    
    await kv.set(`access_token:${accessToken}`, {
      user_id: user.id,
      expires_at: accessTokenExpiry.toISOString(),
      created_at: new Date().toISOString()
    });
    
    // Update last login
    user.lastLogin = new Date().toISOString();
    await kv.set(`user:${user.id}`, user);
    
    console.log(`✅ OTP login successful: ${email}`);
    
    return c.json({
      success: true,
      message: 'Login successful',
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 3600,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// ============================================================
// PASSWORD RESET
// ============================================================

/**
 * Request password reset
 * POST /auth/forgot-password
 */
authApi.post('/forgot-password', async (c: Context) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({
        success: false,
        error: 'email is required'
      }, 400);
    }
    
    // Verify user exists
    const users = await kv.getByPrefix('user:');
    const user = users.find((u: any) => u.value?.email === email);
    
    if (!user) {
      // Don't reveal if user exists or not for security
      return c.json({
        success: true,
        message: 'If the email exists, a reset link has been sent'
      });
    }
    
    // Generate reset token
    const resetToken = generateToken(48);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour
    
    const resetData: PasswordResetToken = {
      token: resetToken,
      email,
      expires_at: expiresAt.toISOString(),
      created_at: new Date().toISOString(),
      used: false
    };
    
    await kv.set(`password_reset:${resetToken}`, resetData);
    
    // Generate reset URL
    const resetUrl = `${c.req.header('origin') || 'https://inchtomilez.com'}/admin/reset-password?token=${resetToken}`;
    
    // Send reset email
    await sendEmail(
      email,
      'Reset Your Password - Inchtomilez Admin',
      `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, please ignore this email.`
    );
    
    console.log(`✅ Password reset email sent to: ${email}`);
    console.log(`   Reset URL: ${resetUrl}`);
    
    return c.json({
      success: true,
      message: 'Password reset instructions sent to your email',
      expires_in: 3600 // 1 hour in seconds
    });
  } catch (error: any) {
    console.error('Error sending password reset:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Reset password with token
 * POST /auth/reset-password
 */
authApi.post('/reset-password', async (c: Context) => {
  try {
    const { token, new_password } = await c.req.json();
    
    if (!token || !new_password) {
      return c.json({
        success: false,
        error: 'token and new_password are required'
      }, 400);
    }
    
    // Validate password strength
    if (new_password.length < 8) {
      return c.json({
        success: false,
        error: 'Password must be at least 8 characters long'
      }, 400);
    }
    
    // Get reset token data
    const resetData = await kv.get(`password_reset:${token}`);
    
    if (!resetData) {
      return c.json({
        success: false,
        error: 'Invalid or expired reset token'
      }, 401);
    }
    
    // Check if already used
    if (resetData.used) {
      return c.json({
        success: false,
        error: 'Reset token already used'
      }, 401);
    }
    
    // Check if expired
    if (new Date(resetData.expires_at) < new Date()) {
      await kv.del(`password_reset:${token}`);
      return c.json({
        success: false,
        error: 'Reset token expired'
      }, 401);
    }
    
    // Find user
    const users = await kv.getByPrefix('user:');
    const userEntry = users.find((u: any) => u.value?.email === resetData.email);
    
    if (!userEntry) {
      return c.json({
        success: false,
        error: 'User not found'
      }, 404);
    }
    
    const user = userEntry.value;
    
    // Update password
    user.password = hashPassword(new_password);
    user.updatedAt = new Date().toISOString();
    await kv.set(`user:${user.id}`, user);
    
    // Mark token as used
    resetData.used = true;
    await kv.set(`password_reset:${token}`, resetData);
    
    // Invalidate all existing sessions for this user
    const tokens = await kv.getByPrefix('access_token:');
    for (const t of tokens) {
      if (t.value?.user_id === user.id) {
        await kv.del(t.key);
      }
    }
    
    const refreshTokens = await kv.getByPrefix('refresh_token:');
    for (const t of refreshTokens) {
      if (t.value?.user_id === user.id) {
        await kv.del(t.key);
      }
    }
    
    console.log(`✅ Password reset successful for: ${user.email}`);
    
    // Send confirmation email
    await sendEmail(
      user.email,
      'Password Changed - Inchtomilez Admin',
      `Your password has been successfully changed.\n\nIf you didn't make this change, please contact support immediately.`
    );
    
    return c.json({
      success: true,
      message: 'Password reset successful. Please login with your new password.'
    });
  } catch (error: any) {
    console.error('Error resetting password:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Verify reset token validity
 * GET /auth/verify-reset-token/:token
 */
authApi.get('/verify-reset-token/:token', async (c: Context) => {
  try {
    const token = c.req.param('token');
    
    const resetData = await kv.get(`password_reset:${token}`);
    
    if (!resetData) {
      return c.json({
        success: false,
        valid: false,
        error: 'Invalid token'
      });
    }
    
    if (resetData.used) {
      return c.json({
        success: false,
        valid: false,
        error: 'Token already used'
      });
    }
    
    if (new Date(resetData.expires_at) < new Date()) {
      return c.json({
        success: false,
        valid: false,
        error: 'Token expired'
      });
    }
    
    return c.json({
      success: true,
      valid: true,
      email: resetData.email
    });
  } catch (error: any) {
    console.error('Error verifying reset token:', error);
    return c.json({
      success: false,
      valid: false,
      error: error.message
    }, 500);
  }
});

// ============================================================
// SESSION MANAGEMENT
// ============================================================

/**
 * Logout (invalidate token)
 * POST /auth/logout
 */
authApi.post('/logout', async (c: Context) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader) {
      return c.json({
        success: false,
        error: 'No authorization header'
      }, 401);
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Delete access token
    await kv.del(`access_token:${token}`);
    
    console.log(`✅ User logged out`);
    
    return c.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error: any) {
    console.error('Error logging out:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Logout from all devices (invalidate all tokens)
 * POST /auth/logout-all
 */
authApi.post('/logout-all', async (c: Context) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader) {
      return c.json({
        success: false,
        error: 'No authorization header'
      }, 401);
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Get user from current token
    const tokenData = await kv.get(`access_token:${token}`);
    
    if (!tokenData) {
      return c.json({
        success: false,
        error: 'Invalid token'
      }, 401);
    }
    
    const userId = tokenData.user_id;
    
    // Delete all access tokens for this user
    const tokens = await kv.getByPrefix('access_token:');
    let deletedCount = 0;
    
    for (const t of tokens) {
      if (t.value?.user_id === userId) {
        await kv.del(t.key);
        deletedCount++;
      }
    }
    
    // Delete all refresh tokens for this user
    const refreshTokens = await kv.getByPrefix('refresh_token:');
    
    for (const t of refreshTokens) {
      if (t.value?.user_id === userId) {
        await kv.del(t.key);
        deletedCount++;
      }
    }
    
    console.log(`✅ User logged out from all devices (${deletedCount} sessions)`);
    
    return c.json({
      success: true,
      message: 'Logged out from all devices',
      sessions_ended: deletedCount
    });
  } catch (error: any) {
    console.error('Error logging out from all devices:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

export default authApi;
