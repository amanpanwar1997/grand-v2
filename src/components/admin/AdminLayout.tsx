import { useState, ReactNode } from 'react';
import { useAdminAuth } from '../../utils/adminAuth';
import { BackendStatus } from './BackendStatus';
import {
  LayoutDashboard,
  FileText,
  Search,
  Image,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  User,
  Shield,
  Code2,
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function AdminLayout({ children, title, breadcrumb }: AdminLayoutProps) {
  const { user, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, current: window.location.pathname === '/admin' },
    { name: 'Pages', href: '/admin/pages', icon: FileText, current: window.location.pathname.startsWith('/admin/pages') },
    { name: 'SEO', href: '/admin/seo', icon: Search, current: window.location.pathname.startsWith('/admin/seo') },
    { name: 'Media', href: '/admin/media', icon: Image, current: window.location.pathname.startsWith('/admin/media') },
    { name: 'Leads', href: '/admin/leads', icon: Users, current: window.location.pathname.startsWith('/admin/leads') },
    { name: 'Users', href: '/admin/users', icon: Shield, current: window.location.pathname.startsWith('/admin/users') },
    { name: 'Code Editor', href: '/admin/code-editor', icon: Code2, current: window.location.pathname.startsWith('/admin/code-editor') },
    { name: 'Settings', href: '/admin/settings', icon: Settings, current: window.location.pathname.startsWith('/admin/settings') },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Backend Status Indicator */}
      <BackendStatus />
      
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#0a0a0a] border-r border-white/10 z-50 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-[16px]">I</span>
              </div>
              <span className="text-white font-semibold text-[15px]">Inchtomilez</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-black font-bold text-[16px]">I</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                item.current
                  ? 'bg-yellow-500 text-black'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              } ${!sidebarOpen && 'justify-center'}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-[14px] font-medium">{item.name}</span>}
            </a>
          ))}

          {/* Logout */}
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-red-400 hover:bg-red-500/10 ${
              !sidebarOpen && 'justify-center'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-[14px] font-medium">Logout</span>}
          </button>
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-yellow-500 rounded-full items-center justify-center text-black hidden lg:flex hover:bg-yellow-400 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-90' : '-rotate-90'}`} />
        </button>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Navigation Bar */}
        <header className="h-16 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-6">
          {/* Left: Mobile Menu + Breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden text-white hover:text-yellow-500 transition-colors"
            >
              {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-2">
              {breadcrumb && breadcrumb.length > 0 ? (
                <div className="flex items-center gap-2">
                  {breadcrumb.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[14px] text-white/60 hover:text-white transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-[14px] text-white font-medium">{item.label}</span>
                      )}
                      {index < breadcrumb.length - 1 && <span className="text-white/40">/</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className="text-[18px] font-medium text-white">{title}</h1>
              )}
            </div>
          </div>

          {/* Right: Notifications + Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-white/70 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[14px] font-medium text-white">{user?.name}</div>
                  <div className="text-[12px] text-white/60 capitalize">{user?.role}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white/60" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-white/10">
                    <div className="text-[14px] font-medium text-white">{user?.name}</div>
                    <div className="text-[13px] text-white/60">{user?.email}</div>
                    <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded text-[12px] font-medium capitalize">
                      <Shield className="w-3 h-3" />
                      {user?.role}
                    </div>
                  </div>
                  <div className="p-2">
                    <a
                      href="/admin/settings/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 text-white/70 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-[14px]">Profile Settings</span>
                    </a>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-[14px]">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}