
import React, { useState, useEffect } from 'react';
import LandingPageTemplate from '../components/templates/LandingPageTemplate';
import FloatingNav from '../components/organisms/FloatingNav';
import PageTransition from '../components/atoms/PageTransition';
import { TrashIcon, PencilIcon, PlusIcon, MagnifyingGlassIcon, XMarkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { authService } from '../services/authService';
import { User, UserRole, UserStatus } from '../types/types';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'User' as UserRole, status: 'Active' as UserStatus });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await authService.getAllUsers();
        setUsers(data);
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    }

    const handleDelete = async (id: number) => {
        if (window.confirm("CONFIRM DELETION: This action cannot be undone.")) {
            await authService.deleteUser(id);
            loadUsers();
        }
    };

    const openModal = (user: User | null = null) => {
        setError('');
        if (user) {
            setEditingUser(user);
            setFormData({ name: user.name, email: user.email, password: user.password || '', role: user.role, status: user.status });
        } else {
            setEditingUser(null);
            setFormData({ name: '', email: '', password: '', role: 'User', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim() || !formData.email.trim()) {
            setError('Name and Email are required.');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Invalid email format.');
            return;
        }

        if (!editingUser && formData.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        if (editingUser) {
            await authService.updateUser({ ...editingUser, ...formData });
        } else {
            await authService.addUser(formData);
        }
        setIsModalOpen(false);
        loadUsers();
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <LandingPageTemplate footer={null}>
            <FloatingNav />
            <PageTransition>
                <div className="min-h-screen bg-brand-white dark:bg-brand-black pt-24 px-4 md:px-6 pb-12 overflow-x-hidden">
                    <div className="container mx-auto max-w-6xl">

                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-slide-up">
                            <div className="flex items-center gap-4 w-full justify-between md:justify-start">
                                <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-brand-black dark:text-brand-white">
                                    User Management
                                </h1>
                                <button onClick={handleLogout} className="md:hidden border-2 border-brand-black dark:border-brand-white p-2">
                                    <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <div className="relative flex-grow md:flex-grow-0">
                                    <input
                                        type="text"
                                        placeholder="SEARCH DATABASE..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full md:w-64 pl-10 pr-4 py-3 border-2 border-brand-black dark:border-brand-white bg-transparent font-bold text-xs uppercase placeholder-gray-400 focus:outline-none focus:bg-brand-white dark:focus:bg-brand-black focus:shadow-hard dark:focus:shadow-hard-dark transition-all"
                                    />
                                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                                </div>
                                <button
                                    onClick={() => openModal()}
                                    className="bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black px-6 py-3 border-2 border-transparent font-black text-xs uppercase tracking-widest hover:opacity-80 flex items-center justify-center gap-2 active:scale-95 transition-all shadow-hard dark:shadow-hard-dark"
                                >
                                    <PlusIcon className="w-4 h-4" /> Add User
                                </button>
                            </div>
                        </div>

                        {/* CRUD Table Container - Scrollable on mobile */}
                        <div className="border-2 border-brand-black dark:border-brand-white bg-brand-white dark:bg-brand-black shadow-hard dark:shadow-hard-dark animate-slide-up [animation-delay:150ms] overflow-hidden">

                            {/* Header Row */}
                            <div className="grid grid-cols-12 gap-4 p-4 border-b-2 border-brand-black dark:border-brand-white bg-brand-black/5 dark:bg-brand-white/5 font-black text-xs uppercase tracking-widest text-brand-black dark:text-brand-white min-w-[600px] md:min-w-0">
                                <div className="col-span-1 hidden md:block">ID</div>
                                <div className="col-span-6 md:col-span-4">User Details</div>
                                <div className="col-span-2 hidden md:block">Role</div>
                                <div className="col-span-3 md:col-span-2">Status</div>
                                <div className="col-span-3 text-right">Actions</div>
                            </div>

                            {/* Data Rows */}
                            <div className="divide-y-2 divide-brand-black/10 dark:divide-brand-white/10 max-h-[60vh] overflow-y-auto overflow-x-auto">
                                {filteredUsers.length === 0 && (
                                    <div className="p-8 text-center opacity-50 font-mono text-sm">NO RECORDS FOUND</div>
                                )}
                                {filteredUsers.map((user) => (
                                    <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-brand-black/5 dark:hover:bg-brand-white/5 transition-colors group min-w-[600px] md:min-w-0">

                                        <div className="col-span-1 hidden md:block font-mono text-sm opacity-60">
                                            #{user.id.toString().slice(-3)}
                                        </div>

                                        <div className="col-span-6 md:col-span-4">
                                            <h3 className="font-bold text-brand-black dark:text-brand-white truncate">{user.name}</h3>
                                            <p className="text-xs font-mono opacity-60 truncate">{user.email}</p>
                                        </div>

                                        <div className="col-span-2 hidden md:block">
                                            <span className={`
                                    inline-block px-2 py-1 text-[10px] font-black uppercase tracking-widest border-2
                                    ${user.role === 'Admin' ? 'border-google-blue text-google-blue' : 'border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white opacity-70'}
                                `}>
                                                {user.role}
                                            </span>
                                        </div>

                                        <div className="col-span-3 md:col-span-2">
                                            <span className={`
                                    inline-flex items-center gap-2 text-xs font-bold uppercase
                                    ${user.status === 'Active' ? 'text-google-green' : 'text-google-red'}
                                `}>
                                                <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-google-green' : 'bg-google-red'}`}></span>
                                                {user.status}
                                            </span>
                                        </div>

                                        <div className="col-span-3 flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openModal(user)}
                                                className="p-2 border-2 border-brand-black dark:border-brand-white hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black transition-all active:scale-90"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 border-2 border-brand-black dark:border-brand-white hover:bg-google-red hover:text-white hover:border-google-red transition-all active:scale-90"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between text-[10px] font-mono uppercase opacity-50 animate-slide-up [animation-delay:300ms]">
                            <span>Total Records: {users.length}</span>
                            <button onClick={handleLogout} className="font-bold hover:text-google-red transition-colors hidden md:block">Log Out [ESC]</button>
                        </div>

                    </div>
                </div>

                {/* Modal - Responsive padding/width */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-black/80 backdrop-blur-sm">
                        <div className="bg-brand-white dark:bg-brand-black border-2 border-brand-black dark:border-brand-white shadow-hard dark:shadow-hard-dark w-full max-w-lg p-6 md:p-8 animate-pop-in relative">
                            {/* ... modal content (unchanged logic, styles usually fit) ... */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-1 hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>

                            <h2 className="text-xl md:text-2xl font-black uppercase mb-2 text-brand-black dark:text-brand-white">
                                {editingUser ? 'Edit User' : 'Add New User'}
                            </h2>

                            {error && (
                                <div className="mb-4 p-2 bg-google-red/10 border-2 border-google-red text-google-red text-xs font-black uppercase tracking-wide">
                                    ⚠️ {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Inputs ... */}
                                <div>
                                    <label className="block text-xs font-black uppercase mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border-2 border-brand-black dark:border-brand-white p-2 bg-transparent font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full border-2 border-brand-black dark:border-brand-white p-2 bg-transparent font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase mb-1">Password</label>
                                    <input
                                        type="text"
                                        placeholder={editingUser ? "(Unchanged)" : ""}
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full border-2 border-brand-black dark:border-brand-white p-2 bg-transparent font-bold"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black uppercase mb-1">Role</label>
                                        <select
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
                                            className="w-full border-2 border-brand-black dark:border-brand-white p-2 bg-transparent font-bold"
                                        >
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase mb-1">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={e => setFormData({ ...formData, status: e.target.value as UserStatus })}
                                            className="w-full border-2 border-brand-black dark:border-brand-white p-2 bg-transparent font-bold"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Suspended">Suspended</option>
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" className="w-full mt-4 bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black font-black py-3 border-2 border-transparent uppercase tracking-wider hover:opacity-80 active:translate-y-1 transition-all">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </PageTransition>
        </LandingPageTemplate>
    );
};

export default AdminDashboardPage;
