import React, { useState, useMemo, useEffect } from 'react';
import { User, Shift, ShiftStatus, Role, WebsiteContent, RoleDetail, UserStatus } from '../types';
import {
    PencilSquareIcon, TrashIcon, UsersIcon, CurrencyEuroIcon, ChartBarIcon, NoSymbol, Cog6ToothIcon, DocumentMagnifyingGlassIcon, MagnifyingGlassIcon, ChevronDownIcon, HomeIcon, ChartPieIcon, ArrowUpIcon, ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon, BriefcaseIcon
} from './Icons';

type AdminView = 'Overview' | 'Shifts' | 'Job Seekers' | 'Businesses' | 'Roles' | 'Content' | 'Settings';

type NotificationSettings = {
    emailOnProfileUpdate: boolean;
    emailOnApplicationStatusChange: boolean;
};

interface AdminDashboardViewProps {
  users: User[];
  shifts: Shift[];
  websiteContent: WebsiteContent;
  notificationSettings: NotificationSettings;
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (userId: string) => void;
  onDeleteShift: (shiftId: string) => void;
  onEditUser: (user: User) => void;
  onContentChange: (newContent: WebsiteContent) => void;
  onNotificationSettingsChange: (settings: NotificationSettings) => void;
  roleDetails: RoleDetail[];
  onRoleDetailsChange: (roles: RoleDetail[]) => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; change?: number; }> = ({ title, value, icon, change }) => (
    <div className="bg-white p-5 rounded-xl shadow-md">
        <div className="flex justify-between items-center">
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{title}</p>
            <div className="text-slate-400">{icon}</div>
        </div>
        <p className="text-3xl font-bold text-primary mt-2">{value}</p>
        {change !== undefined && (
            <div className={`flex items-center text-sm mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
                <span>{Math.abs(change)}% vs last month</span>
            </div>
        )}
    </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-primary mb-4">{title}</h3>
        <div>{children}</div>
    </div>
);

const AdminDashboardView: React.FC<AdminDashboardViewProps> = (props) => {
  const [activeView, setActiveView] = useState<AdminView>('Overview');
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex items-start">
        <Sidebar activeView={activeView} onNavigate={setActiveView} />
        <main className="flex-1 p-6 lg:p-8">
            <RenderView activeView={activeView} {...props} />
        </main>
      </div>
    </div>
  );
};

const Sidebar: React.FC<{ activeView: AdminView; onNavigate: (view: AdminView) => void; }> = ({ activeView, onNavigate }) => {
    const navItems: { view: AdminView; label: string; icon: React.ReactNode }[] = [
        { view: 'Overview', label: 'Overview', icon: <HomeIcon className="w-5 h-5" /> },
        { view: 'Shifts', label: 'Shifts', icon: <DocumentMagnifyingGlassIcon className="w-5 h-5" /> },
        { view: 'Job Seekers', label: 'Job Seekers', icon: <UsersIcon className="w-5 h-5" /> },
        { view: 'Businesses', label: 'Businesses', icon: <BriefcaseIcon className="w-5 h-5" /> },
        { view: 'Roles', label: 'Roles', icon: <Cog6ToothIcon className="w-5 h-5" /> },
        { view: 'Content', label: 'Content', icon: <PencilSquareIcon className="w-5 h-5" /> },
        { view: 'Settings', label: 'Settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-64 bg-primary text-white h-screen sticky top-0 flex flex-col">
            <div className="p-6 text-center border-b border-slate-700">
                <h2 className="text-xl font-bold tracking-tight">Admin Panel</h2>
            </div>
            <nav className="flex-grow p-4">
                <ul className="space-y-2">
                    {navItems.map(({ view, label, icon }) => (
                        <li key={view}>
                            <button
                                onClick={() => onNavigate(view)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                    activeView === view
                                        ? 'bg-accent text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                {icon}
                                <span>{label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

const RenderView: React.FC<AdminDashboardViewProps & { activeView: AdminView }> = (props) => {
    switch (props.activeView) {
        case 'Overview': return <OverviewSection {...props} />;
        case 'Shifts': return <ShiftsSection {...props} />;
        case 'Job Seekers': return <JobSeekersSection {...props} />;
        case 'Businesses': return <BusinessesSection {...props} />;
        case 'Roles': return <RolesSection {...props} />;
        case 'Content': return <ContentSection {...props} />;
        case 'Settings': return <SettingsSection {...props} />;
        default: return <OverviewSection {...props} />;
    }
};

const OverviewSection: React.FC<AdminDashboardViewProps> = ({ users, shifts, roleDetails }) => {
    const jobSeekers = users.filter(u => u.userType === 'JobSeeker');
    const businesses = users.filter(u => u.userType === 'Business');
    const openShifts = shifts.filter(s => s.status === ShiftStatus.Open);
    const totalPayouts = users.reduce((acc, user) => acc + (user.totalEarnings || 0), 0);

    const shiftsLast7Days = useMemo(() => {
        const today = new Date();
        const last7Days: { day: string; count: number }[] = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' });
            last7Days.push({ day: dayStr, count: 0 });
        }
        shifts.forEach(shift => {
            const shiftDate = new Date(shift.postedAt);
            const diffDays = Math.floor((today.getTime() - shiftDate.getTime()) / (1000 * 3600 * 24));
            if (diffDays >= 0 && diffDays < 7) {
                const dayStr = shiftDate.toLocaleDateString('en-US', { weekday: 'short' });
                const dayData = last7Days.find(d => d.day === dayStr);
                if (dayData) dayData.count++;
            }
        });
        return last7Days;
    }, [shifts]);

    const userGrowth = useMemo(() => {
        const data: { date: string, seekers: number, businesses: number }[] = [];
        const sortedUsers = [...users].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        let seekerCount = 0;
        let businessCount = 0;
        sortedUsers.forEach(user => {
            if (user.userType === 'JobSeeker') seekerCount++;
            if (user.userType === 'Business') businessCount++;
            data.push({
                date: new Date(user.createdAt).toLocaleDateString(),
                seekers: seekerCount,
                businesses: businessCount,
            });
        });
        return data;
    }, [users]);
    
    const roleDistribution = useMemo(() => {
        const distribution = new Map<string, number>();
        jobSeekers.forEach(user => {
            distribution.set(user.role, (distribution.get(user.role) || 0) + 1);
        });
        return Array.from(distribution.entries()).map(([name, value]) => ({ name, value }));
    }, [jobSeekers]);

    const recentActivities = [...users, ...shifts]
      .sort((a,b) => new Date('postedAt' in b ? b.postedAt : b.createdAt).getTime() - new Date('postedAt' in a ? a.postedAt : a.createdAt).getTime())
      .slice(0, 5);

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Users" value={users.length} icon={<UsersIcon className="w-6 h-6" />} change={5.2} />
                <StatCard title="Total Businesses" value={businesses.length} icon={<BriefcaseIcon className="w-6 h-6" />} change={2.1} />
                <StatCard title="Open Shifts" value={openShifts.length} icon={<DocumentMagnifyingGlassIcon className="w-6 h-6" />} change={-1.5} />
                <StatCard title="Total Payouts" value={`€${(totalPayouts / 1000).toFixed(1)}k`} icon={<CurrencyEuroIcon className="w-6 h-6" />} change={10.8} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartCard title="User Growth">
                        {/* Dummy line chart */}
                        <div className="h-64 bg-slate-50 rounded-lg p-4 flex items-end">
                            <p className="text-slate-400 text-sm">User growth line chart placeholder</p>
                        </div>
                    </ChartCard>
                </div>
                <ChartCard title="Role Distribution">
                    {/* Dummy donut chart */}
                    <div className="h-64 bg-slate-50 rounded-lg p-4 flex items-center justify-center">
                        <p className="text-slate-400 text-sm">Role distribution donut chart placeholder</p>
                    </div>
                </ChartCard>
                <div className="lg:col-span-3">
                    <ChartCard title="Recent Activity">
                        <ul className="divide-y divide-slate-100">
                            {recentActivities.map(item => (
                                <li key={item.id} className="py-3 flex items-center gap-3">
                                    <img src={item.avatar || (item as Shift).businessLogo} className="w-8 h-8 rounded-full" />
                                    <p className="text-sm text-slate-600">
                                        {'userType' in item ? (
                                            <>
                                                <span className="font-semibold text-primary">{item.name}</span> registered as a {item.userType}.
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-semibold text-primary">{item.businessName}</span> posted a new shift for a {item.role}.
                                            </>
                                        )}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </ChartCard>
                </div>
            </div>
        </div>
    );
};
// Helper components for tables
const TableHeader: React.FC<{children: React.ReactNode}> = ({children}) => (
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{children}</th>
 );
 
 const TableCell: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
     <td className={`px-6 py-4 whitespace-nowrap text-sm ${className}`}>{children}</td>
 );

 const EmptyState: React.FC<{icon: React.ReactNode, title: string, message: string}> = ({icon, title, message}) => (
    <div className="text-center py-16 px-6 bg-slate-50 rounded-lg">
        <div className="text-slate-400 w-16 h-16 mx-auto">{icon}</div>
        <h3 className="text-xl font-semibold text-primary mt-4">{title}</h3>
        <p className="text-slate-500 mt-2">{message}</p>
    </div>
);

const Pagination: React.FC<{currentPage: number, totalPages: number, onPageChange: (page: number) => void}> = ({currentPage, totalPages, onPageChange}) => (
    <div className="py-3 flex items-center justify-between border-t border-slate-200">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50">
            Previous
        </button>
        <div className="text-sm text-slate-700">Page {currentPage} of {totalPages}</div>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50">
            Next
        </button>
    </div>
);
const usePagination = <T,>(items: T[], itemsPerPage: number = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return { currentPage, totalPages, paginatedItems, setCurrentPage };
};

// Sections for each view
const ShiftsSection: React.FC<AdminDashboardViewProps> = ({ shifts, onDeleteShift }) => {
    const [shiftSearch, setShiftSearch] = useState('');
    const [shiftStatusFilter, setShiftStatusFilter] = useState<ShiftStatus | 'All'>('All');
  
    const filteredShifts = useMemo(() => shifts.filter(shift => {
      const searchTerm = shiftSearch.toLowerCase();
      const searchMatch = shift.businessName.toLowerCase().includes(searchTerm) || shift.role.toLowerCase().includes(searchTerm) || shift.date.toLowerCase().includes(searchTerm);
      const statusMatch = shiftStatusFilter === 'All' || shift.status === shiftStatusFilter;
      return searchMatch && statusMatch;
    }), [shifts, shiftSearch, shiftStatusFilter]);

    const { currentPage, totalPages, paginatedItems, setCurrentPage } = usePagination(filteredShifts);
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-4">Manage Shifts ({filteredShifts.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
                 <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                 <input type="text" placeholder="Search by business, role, or date..." value={shiftSearch} onChange={e => setShiftSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-accent focus:border-accent" />
            </div>
            <select value={shiftStatusFilter} onChange={e => setShiftStatusFilter(e.target.value as ShiftStatus | 'All')} className="w-full border border-slate-300 rounded-lg focus:ring-accent focus:border-accent bg-white">
                <option value="All">All Statuses</option>
                {Object.values(ShiftStatus).map(status => (<option key={status} value={status}>{status}</option>))}
            </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <TableHeader>Business</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Applicants</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader><span className="sr-only">Actions</span></TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {/* FIX: Explicitly type the 'shift' parameter in the map callback to resolve type inference issues. */}
              {paginatedItems.length > 0 ? paginatedItems.map((shift: Shift) => (
                <tr key={shift.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-900">{shift.businessName}</TableCell>
                  <TableCell className="text-slate-500">{shift.role}</TableCell>
                  <TableCell className="text-slate-500">{shift.applicants.length}</TableCell>
                  <TableCell>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        shift.status === 'Open' ? 'bg-green-100 text-green-800' :
                        shift.status === 'Filled' ? 'bg-blue-100 text-blue-800' : 
                        shift.status === 'Completed' ? 'bg-slate-100 text-slate-800' : 'bg-red-100 text-red-800'
                    }`}>{shift.status}</span>
                  </TableCell>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-slate-500 hover:text-accent p-1"><PencilSquareIcon className="w-5 h-5" /></button>
                      <button onClick={() => { if (window.confirm(`Delete shift for ${shift.businessName}?`)) { onDeleteShift(shift.id); } }} className="text-slate-500 hover:text-red-600 p-1"><TrashIcon className="w-5 h-5" /></button>
                  </td>
                </tr>
              )) : (
                  <tr><td colSpan={5}><EmptyState icon={<DocumentMagnifyingGlassIcon/>} title="No Shifts Found" message="There are no shifts that match your current search and filters." /></td></tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
      </div>
    );
};

const userStatusClasses: Record<UserStatus, string> = {
    Active: 'bg-blue-100 text-blue-800',
    Suspended: 'bg-red-100 text-red-800',
    Verified: 'bg-green-100 text-green-800',
};

const JobSeekersSection: React.FC<AdminDashboardViewProps> = ({ users, roleDetails, onEditUser, onDeleteUser }) => {
    const jobSeekers = users.filter(u => u.userType === 'JobSeeker');
    const [seekerSearch, setSeekerSearch] = useState('');
    const [seekerRoleFilter, setSeekerRoleFilter] = useState<Role | 'All'>('All');
  
    const filteredJobSeekers = useMemo(() => jobSeekers.filter(user => {
      const searchTerm = seekerSearch.toLowerCase();
      const searchMatch = user.name.toLowerCase().includes(searchTerm) || (user.email && user.email.toLowerCase().includes(searchTerm));
      const roleMatch = seekerRoleFilter === 'All' || user.role === seekerRoleFilter;
      return searchMatch && roleMatch;
    }), [jobSeekers, seekerSearch, seekerRoleFilter]);

    const { currentPage, totalPages, paginatedItems, setCurrentPage } = usePagination(filteredJobSeekers);
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-4">Manage Job Seekers ({filteredJobSeekers.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                <input type="text" placeholder="Search by name or email..." value={seekerSearch} onChange={e => setSeekerSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-accent focus:border-accent" />
            </div>
            <select value={seekerRoleFilter} onChange={e => setSeekerRoleFilter(e.target.value as Role | 'All')} className="w-full border border-slate-300 rounded-lg focus:ring-accent focus:border-accent bg-white">
                <option value="All">All Roles</option>
                {roleDetails.map(role => (<option key={role.name} value={role.name}>{role.name}</option>))}
            </select>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50"><tr><TableHeader>Name</TableHeader><TableHeader>Status</TableHeader><TableHeader><span className="sr-only">Actions</span></TableHeader></tr></thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {/* FIX: Explicitly type the 'user' parameter in the map callback to resolve type inference issues. */}
                    {paginatedItems.length > 0 ? paginatedItems.map((user: User) => {
                        const roleInfo = roleDetails.find(r => r.name === user.role);
                        return (
                        <tr key={user.id} className="hover:bg-slate-50">
                            <TableCell><div className="flex items-center"><img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} /><div className="ml-4"><div className="flex items-center gap-2 text-sm font-medium text-slate-900">{user.name} <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${roleInfo?.classes || 'bg-slate-100 text-slate-800'}`}>{roleInfo?.emoji} {user.role}</span></div><div className="text-sm text-slate-500">{user.email}</div></div></div></TableCell>
                            <TableCell><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${userStatusClasses[user.status]}`}>{user.status}</span></TableCell>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button onClick={() => onEditUser(user)} className="text-slate-500 hover:text-accent p-1"><PencilSquareIcon className="w-5 h-5" /></button><button onClick={() => { if (window.confirm(`Delete ${user.name}?`)) { onDeleteUser(user.id); } }} className="text-slate-500 hover:text-red-600 p-1"><TrashIcon className="w-5 h-5" /></button></td>
                        </tr>
                    )}) : (<tr><td colSpan={3}><EmptyState icon={<UsersIcon/>} title="No Job Seekers Found" message="There are no job seekers that match your current search and filters." /></td></tr>)}
                </tbody>
            </table>
        </div>
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
      </div>
    );
};

const BusinessesSection: React.FC<AdminDashboardViewProps> = ({ users, onEditUser, onDeleteUser }) => {
    const businesses = users.filter(u => u.userType === 'Business');
    const [businessSearch, setBusinessSearch] = useState('');
    const filteredBusinesses = useMemo(() => businesses.filter(user => user.name.toLowerCase().includes(businessSearch.toLowerCase()) || (user.email && user.email.toLowerCase().includes(businessSearch.toLowerCase()))), [businesses, businessSearch]);
    const { currentPage, totalPages, paginatedItems, setCurrentPage } = usePagination(filteredBusinesses);
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4">Manage Businesses ({filteredBusinesses.length})</h2>
            <div className="relative mb-4"><MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" /><input type="text" placeholder="Search by name or email..." value={businessSearch} onChange={e => setBusinessSearch(e.target.value)} className="w-full md:w-1/2 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-accent focus:border-accent" /></div>
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-200"><thead className="bg-slate-50"><tr><TableHeader>Name</TableHeader><TableHeader>Rating</TableHeader><TableHeader>Status</TableHeader><TableHeader><span className="sr-only">Actions</span></TableHeader></tr></thead><tbody className="bg-white divide-y divide-slate-200">
{/* FIX: Explicitly type the 'user' parameter in the map callback to resolve type inference issues. */}
{paginatedItems.length > 0 ? paginatedItems.map((user: User) => ((<tr key={user.id} className="hover:bg-slate-50"><TableCell><div className="flex items-center"><img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} /><div className="ml-4"><div className="text-sm font-medium text-slate-900">{user.name}</div><div className="text-sm text-slate-500">{user.email}</div></div></div></TableCell><TableCell className="text-slate-500">{user.rating.toFixed(1)} ({user.reviewCount} reviews)</TableCell><TableCell><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${userStatusClasses[user.status]}`}>{user.status}</span></TableCell><td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button onClick={() => onEditUser(user)} className="text-slate-500 hover:text-accent p-1"><PencilSquareIcon className="w-5 h-5" /></button><button onClick={() => { if (window.confirm(`Delete ${user.name}?`)) { onDeleteUser(user.id); } }} className="text-slate-500 hover:text-red-600 p-1"><TrashIcon className="w-5 h-5" /></button></td></tr>))) : (<tr><td colSpan={4}><EmptyState icon={<UsersIcon/>} title="No Businesses Found" message="There are no businesses that match your current search." /></td></tr>)}</tbody></table></div>
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
        </div>
    );
};
const RolesSection: React.FC<AdminDashboardViewProps> = ({ roleDetails, onRoleDetailsChange }) => {
    const handleRoleChange = (index: number, field: 'name' | 'emoji', value: string) => {
        const newRoles = [...roleDetails];
        newRoles[index] = { ...newRoles[index], [field]: value };
        onRoleDetailsChange(newRoles);
    };

    const handleAddRole = () => {
        onRoleDetailsChange([...roleDetails, { name: '', emoji: '', classes: 'bg-gray-100 text-gray-800' }]);
    };

    const handleDeleteRole = (index: number) => {
        if (window.confirm(`Are you sure you want to delete the role "${roleDetails[index].name}"? This cannot be undone.`)) {
            const newRoles = roleDetails.filter((_, i) => i !== index);
            onRoleDetailsChange(newRoles);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-1">Manage Roles & Emojis</h2>
            <p className="text-slate-500 mb-4">Add, edit, or remove the roles available across the platform.</p>
            <div className="space-y-3">
                {roleDetails.map((role, index) => (
                    <div key={index} className="grid grid-cols-[auto,1fr,auto] items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <input type="text" value={role.emoji} onChange={(e) => handleRoleChange(index, 'emoji', e.target.value)} className="w-16 h-10 text-xl text-center border border-slate-300 rounded-md" placeholder="😀" maxLength={2} />
                        <input type="text" value={role.name} onChange={(e) => handleRoleChange(index, 'name', e.target.value)} className="h-10 px-3 border border-slate-300 rounded-md" placeholder="Role Name" />
                        <button onClick={() => handleDeleteRole(index)} className="text-slate-400 hover:text-red-600 p-2" aria-label="Delete role"><TrashIcon className="w-5 h-5" /></button>
                    </div>
                ))}
            </div>
            <button onClick={handleAddRole} className="mt-4 bg-accent text-white font-bold py-2 px-4 rounded-full hover:bg-accent-hover transition-colors text-sm">+ Add New Role</button>
        </div>
    );
};
const ContentSection: React.FC<AdminDashboardViewProps> = ({ websiteContent, onContentChange }) => {
    // Content management logic from old component can be moved here
    return <div className="bg-white p-6 rounded-xl shadow-md"><h2 className="text-2xl font-bold text-primary mb-4">Manage Website Content</h2><p>Content management UI goes here.</p></div>;
};
const SettingsSection: React.FC<AdminDashboardViewProps> = ({ notificationSettings, onNotificationSettingsChange }) => {
    // Settings management logic from old component can be moved here
    return <div className="bg-white p-6 rounded-xl shadow-md"><h2 className="text-2xl font-bold text-primary mb-4">Platform Settings</h2><p>Settings UI goes here.</p></div>;
};

export default AdminDashboardView;
