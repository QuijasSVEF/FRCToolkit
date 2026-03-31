import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, UserPlus, Trash2, KeyRound, Eye, Shield, ShieldOff,
  ChevronDown, X, AlertTriangle,
} from 'lucide-react';
import { adminApi, type AdminUser } from '../../lib/adminApi';
import { useAuth } from '../../contexts/AuthContext';

function CreateUserModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminApi.createUser(email, password, displayName);
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-steel-950/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-steel-900">Create New User</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-steel-100 text-steel-400"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="input-field"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field"
              required
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-1">Password</label>
            <input
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-field"
              required
              minLength={6}
              placeholder="Minimum 6 characters"
            />
          </div>
          {error && <p className="text-sm text-danger-600 bg-danger-50 rounded-xl px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
}

function ResetPasswordModal({ user, onClose }: { user: AdminUser; onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminApi.resetPassword(user.id, password);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-steel-950/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-steel-900">Reset Password</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-steel-100 text-steel-400"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-sm text-steel-500 mb-4">
          Reset password for <span className="font-semibold text-steel-700">{user.email}</span>
        </p>
        {success ? (
          <div className="bg-success-50 border border-success-200 rounded-xl p-4 text-center">
            <p className="text-success-700 font-medium">Password reset successfully</p>
            <button onClick={onClose} className="btn-secondary mt-3 text-sm">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-steel-700 mb-1">New Password</label>
              <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
                required
                minLength={6}
                placeholder="Minimum 6 characters"
              />
            </div>
            {error && <p className="text-sm text-danger-600 bg-danger-50 rounded-xl px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function DeleteConfirmModal({ user, onClose, onConfirm }: {
  user: AdminUser;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-steel-950/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-danger-500" />
          </div>
          <h3 className="text-lg font-bold text-steel-900">Delete User</h3>
        </div>
        <p className="text-sm text-steel-600 mb-1">
          Are you sure you want to permanently delete:
        </p>
        <p className="text-sm font-semibold text-steel-900 mb-4">{user.email}</p>
        <p className="text-xs text-steel-400 mb-5">
          This will remove the user account, their profile, all progress data, bookmarks, and notes. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1 text-sm">Cancel</button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-danger-600 text-white font-semibold rounded-xl transition-all duration-200 hover:bg-danger-700 text-sm disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [resetUser, setResetUser] = useState<AdminUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
  const [roleMenuUser, setRoleMenuUser] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const { users: data } = await adminApi.getUsers();
      setUsers(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleDelete = async () => {
    if (!deleteUser) return;
    try {
      await adminApi.deleteUser(deleteUser.id);
      setDeleteUser(null);
      fetchUsers();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      await adminApi.updateRole(userId, role);
      setRoleMenuUser(null);
      fetchUsers();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Role update failed');
    }
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (
      u.email?.toLowerCase().includes(q) ||
      u.profile?.display_name?.toLowerCase().includes(q) ||
      u.profile?.team_number?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger-50 border border-danger-200 rounded-2xl p-6 text-center">
        <p className="text-danger-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-steel-900">User Management</h1>
          <p className="text-sm text-steel-500 mt-1">{users.length} registered users</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary text-sm">
          <UserPlus className="w-4 h-4" /> Create User
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by email, name, or team..."
          className="input-field pl-11"
        />
      </div>

      <div className="bg-white rounded-2xl border border-steel-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-steel-100 bg-steel-50/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wider">User</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wider hidden md:table-cell">Team</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wider hidden lg:table-cell">Joined</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wider hidden lg:table-cell">Last Active</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wider">Progress</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wider">Role</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const isCurrentUser = u.id === currentUser?.id;
                const completionPct = u.progress.total > 0
                  ? Math.round((u.progress.completed / u.progress.total) * 100)
                  : 0;
                const role = u.profile?.role || 'mentor';

                return (
                  <tr key={u.id} className="border-b border-steel-100 last:border-b-0 hover:bg-steel-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-sm font-semibold text-steel-900">
                          {u.profile?.display_name || 'No name'}
                          {isCurrentUser && <span className="ml-1.5 text-[10px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-full">YOU</span>}
                        </p>
                        <p className="text-xs text-steel-400">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-sm text-steel-600">{u.profile?.team_number || '--'}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className="text-sm text-steel-500">
                        {new Date(u.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className="text-sm text-steel-500">
                        {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : 'Never'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className="flex-1 h-1.5 bg-steel-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-500 rounded-full"
                            style={{ width: `${completionPct}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-steel-500 w-8 text-right">{completionPct}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="relative">
                        <button
                          onClick={() => setRoleMenuUser(roleMenuUser === u.id ? null : u.id)}
                          disabled={isCurrentUser}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            role === 'admin'
                              ? 'bg-brand-50 text-brand-700'
                              : 'bg-steel-100 text-steel-600'
                          } ${isCurrentUser ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'}`}
                        >
                          {role === 'admin' ? <Shield className="w-3 h-3" /> : <ShieldOff className="w-3 h-3" />}
                          {role}
                          {!isCurrentUser && <ChevronDown className="w-3 h-3" />}
                        </button>
                        {roleMenuUser === u.id && !isCurrentUser && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setRoleMenuUser(null)} />
                            <div className="absolute top-full left-0 mt-1 bg-white border border-steel-200 rounded-xl shadow-xl z-50 overflow-hidden min-w-[120px]">
                              <button
                                onClick={() => handleRoleChange(u.id, 'mentor')}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-steel-50 transition-colors text-steel-700"
                              >
                                Mentor
                              </button>
                              <button
                                onClick={() => handleRoleChange(u.id, 'admin')}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-steel-50 transition-colors text-steel-700"
                              >
                                Admin
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => navigate(`/admin/users/${u.id}`)}
                          className="p-1.5 rounded-lg text-steel-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                          title="View Progress"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setResetUser(u)}
                          className="p-1.5 rounded-lg text-steel-400 hover:text-warning-600 hover:bg-warning-50 transition-all"
                          title="Reset Password"
                        >
                          <KeyRound className="w-4 h-4" />
                        </button>
                        {!isCurrentUser && (
                          <button
                            onClick={() => setDeleteUser(u)}
                            className="p-1.5 rounded-lg text-steel-400 hover:text-danger-600 hover:bg-danger-50 transition-all"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-steel-400">
                    {search ? 'No users match your search' : 'No users found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && <CreateUserModal onClose={() => setShowCreate(false)} onCreated={fetchUsers} />}
      {resetUser && <ResetPasswordModal user={resetUser} onClose={() => setResetUser(null)} />}
      {deleteUser && <DeleteConfirmModal user={deleteUser} onClose={() => setDeleteUser(null)} onConfirm={handleDelete} />}
    </div>
  );
}
