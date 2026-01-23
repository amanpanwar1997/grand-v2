import { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { useAdminAuth } from '../../utils/adminAuth';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { 
  Users as UsersIcon, 
  Plus, 
  Search, 
  Shield, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Loader2,
  X,
  Save,
  Phone,
  Mail
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  phone?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export function AdminUsersPage() {
  const { hasPermission } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'editor' as 'admin' | 'editor' | 'viewer',
    status: 'active' as 'active' | 'inactive',
    phone: ''
  });

  // Load users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/users/all`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setUsers(result.users);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create user
  const handleCreate = async () => {
    if (!formData.name || !formData.email) {
      alert('Name and email are required');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/users/create`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ User created successfully!');
        setShowCreateModal(false);
        resetForm();
        loadUsers();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('❌ Error creating user');
    } finally {
      setSaving(false);
    }
  };

  // Update user
  const handleUpdate = async () => {
    if (!editingUser) return;

    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/users/update`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: editingUser.id,
            ...formData
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ User updated successfully!');
        setEditingUser(null);
        resetForm();
        loadUsers();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('❌ Error updating user');
    } finally {
      setSaving(false);
    }
  };

  // Delete user
  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/users/delete`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: userId })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ User deleted successfully!');
        loadUsers();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('❌ Error deleting user');
    }
  };

  // Open edit modal
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone || ''
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'editor',
      status: 'active',
      phone: ''
    });
  };

  // Close modal
  const closeModal = () => {
    setShowCreateModal(false);
    setEditingUser(null);
    resetForm();
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-500';
      case 'editor':
        return 'bg-yellow-500/20 text-yellow-500';
      default:
        return 'bg-blue-500/20 text-blue-500';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout
      title="Users"
      breadcrumb={[{ label: 'Dashboard', href: '/admin' }, { label: 'Users' }]}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] md:text-[30px] font-medium text-white mb-2">Users</h1>
          <p className="text-[15px] text-white/70">
            {loading ? 'Loading...' : `${users.length} total users`}
          </p>
        </div>

        {hasPermission('admin') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New User
          </button>
        )}
      </div>

      {/* Search */}
      <div className="glass p-6 rounded-xl border border-white/10 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
          />
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="glass rounded-xl border border-white/10 p-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
        </div>
      ) : (
        <div className="glass rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-black/30 border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">NAME</th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">EMAIL</th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">ROLE</th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">STATUS</th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">LAST LOGIN</th>
                <th className="text-center p-4 text-[13px] font-semibold text-white/70">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-white/60">
                    No users found. Click "Add New User" to create one.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-[15px]">{user.name[0]}</span>
                        </div>
                        <div className="text-[15px] font-medium text-white">{user.name}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-[15px] text-white/70">{user.email}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium capitalize ${getRoleColor(
                          user.role
                        )}`}
                      >
                        <Shield className="w-3.5 h-3.5" />
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium $\{
                          user.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                        }`}
                      >
                        {user.status === 'active' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-[14px] text-white/70">{formatDate(user.lastLogin || '')}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {hasPermission('admin') && (
                          <>
                            <button
                              onClick={() => openEditModal(user)}
                              className="p-2 text-white/60 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-all"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="p-2 text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || editingUser) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] font-medium text-white">
                {editingUser ? 'Edit User' : 'Create New User'}
              </h2>
              <button onClick={closeModal} className="text-white/60 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="john@example.com"
                  disabled={!!editingUser}
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 bg-white/5 text-white px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingUser ? handleUpdate : handleCreate}
                disabled={saving}
                className="flex-1 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {editingUser ? 'Update' : 'Create'} User
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
