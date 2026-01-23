import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User roles
export type UserRole = 'admin' | 'editor' | 'viewer';

// User interface
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  status: 'active' | 'disabled';
}

// Auth context type
interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (requiredRole: UserRole) => boolean;
}

// Create context
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Role hierarchy (higher index = more permissions)
const roleHierarchy: UserRole[] = ['viewer', 'editor', 'admin'];

// Provider component
export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem('admin_user');
        const sessionExpiry = localStorage.getItem('admin_session_expiry');

        if (storedUser && sessionExpiry) {
          const expiryTime = parseInt(sessionExpiry);
          if (Date.now() < expiryTime) {
            setUser(JSON.parse(storedUser));
          } else {
            // Session expired
            localStorage.removeItem('admin_user');
            localStorage.removeItem('admin_session_expiry');
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      // Validate inputs
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      // ⚠️ MOCK AUTHENTICATION - Replace with real API in production
      // Demo users for testing
      const mockUsers: { [key: string]: AdminUser } = {
        'admin@inchtomilez.com': {
          id: '1',
          email: 'admin@inchtomilez.com',
          name: 'Admin User',
          role: 'admin',
          avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=eab308&color=000',
          lastLogin: new Date().toISOString(),
          createdAt: '2024-01-01T00:00:00Z',
          status: 'active',
        },
        'editor@inchtomilez.com': {
          id: '2',
          email: 'editor@inchtomilez.com',
          name: 'Editor User',
          role: 'editor',
          avatar: 'https://ui-avatars.com/api/?name=Editor+User&background=3b82f6&color=fff',
          lastLogin: new Date().toISOString(),
          createdAt: '2024-01-01T00:00:00Z',
          status: 'active',
        },
        'viewer@inchtomilez.com': {
          id: '3',
          email: 'viewer@inchtomilez.com',
          name: 'Viewer User',
          role: 'viewer',
          avatar: 'https://ui-avatars.com/api/?name=Viewer+User&background=6b7280&color=fff',
          lastLogin: new Date().toISOString(),
          createdAt: '2024-01-01T00:00:00Z',
          status: 'active',
        },
      };

      const mockPasswords: { [key: string]: string } = {
        'admin@inchtomilez.com': 'admin123',
        'editor@inchtomilez.com': 'editor123',
        'viewer@inchtomilez.com': 'viewer123',
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check credentials
      const user = mockUsers[email.toLowerCase()];
      const validPassword = mockPasswords[email.toLowerCase()];

      if (!user || password !== validPassword) {
        return { success: false, error: 'Invalid email or password' };
      }

      if (user.status === 'disabled') {
        return { success: false, error: 'Account is disabled. Contact administrator.' };
      }

      // Store user and session
      localStorage.setItem('admin_user', JSON.stringify(user));
      // Session expires in 24 hours
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('admin_session_expiry', expiryTime.toString());

      setUser(user);
      return { success: true };

      /* 
      // 🔧 PRODUCTION: Replace mock with real API call
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.message || 'Login failed' };
      }

      const data = await response.json();
      const adminUser: AdminUser = data.user;

      // Store user and session
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      // Session expires in 24 hours
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('admin_session_expiry', expiryTime.toString());

      setUser(adminUser);
      return { success: true };
      */
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_session_expiry');
    setUser(null);
    window.location.href = '/admin/login';
  };

  // Reset password function
  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!email) {
        return { success: false, error: 'Email is required' };
      }

      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.message || 'Reset failed' };
      }

      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Update password function
  const updatePassword = async (token: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!token || !newPassword) {
        return { success: false, error: 'Token and new password are required' };
      }

      const response = await fetch('/api/admin/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.message || 'Update failed' };
      }

      return { success: true };
    } catch (error) {
      console.error('Update password error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Permission check
  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    const userRoleIndex = roleHierarchy.indexOf(user.role);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    return userRoleIndex >= requiredRoleIndex;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        resetPassword,
        updatePassword,
        hasPermission,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}

// Protected route wrapper
export function AdminProtectedRoute({ children, requiredRole = 'viewer' }: { children: ReactNode; requiredRole?: UserRole }) {
  const { isAuthenticated, hasPermission, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-[15px]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/admin/login?redirect=' + encodeURIComponent(window.location.pathname);
    return null;
  }

  if (!hasPermission(requiredRole)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="glass p-8 rounded-xl max-w-md text-center">
          <h1 className="text-[22px] font-bold text-white mb-4">Access Denied</h1>
          <p className="text-[15px] text-white/70 mb-6">
            You don't have permission to access this page. Required role: {requiredRole}
          </p>
          <button
            onClick={() => (window.location.href = '/admin')}
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}