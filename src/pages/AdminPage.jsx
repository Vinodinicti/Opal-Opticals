import React, { useState, useEffect } from 'react';
import { 
  Glasses, 
  Lock, 
  User, 
  Calendar, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  LogOut, 
  Search, 
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Download,
  Filter,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import { getStoredBookings, updateBookingStatus, deleteBooking } from '../data/bookingStorage';

export default function AdminPage({ setActivePage }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Load bookings from localStorage
  const refreshData = () => {
    const list = getStoredBookings();
    setBookings(list);
  };

  useEffect(() => {
    // Check if session is already active
    const loggedIn = sessionStorage.getItem('opal_admin_auth') === 'true';
    if (loggedIn) {
      setIsAuthenticated(true);
      refreshData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'opal123') {
      sessionStorage.setItem('opal_admin_auth', 'true');
      setIsAuthenticated(true);
      setErrorMsg('');
      refreshData();
    } else {
      setErrorMsg('Incorrect username or password. Default is admin / opal123');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('opal_admin_auth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = updateBookingStatus(id, newStatus);
    setBookings(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this booking from local storage?')) {
      const updated = deleteBooking(id);
      setBookings(updated);
    }
  };

  const exportCSV = () => {
    if (bookings.length === 0) return;
    const headers = ['Booking ID,Patient Name,Phone,Service/Frame,Appointment Date,Status,Notes'];
    const rows = bookings.map(b => 
      `"${b.id}","${b.name}","${b.phone}","${b.service}","${b.date}","${b.status}","${b.notes || ''}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `opal_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-black flex flex-col selection:bg-black selection:text-white">
      
      {/* Top Professional Admin Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand & Page Identifier */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage && setActivePage('home')}
              className="p-2 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-black transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Return to Main Store"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Store</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-xs">
                <Glasses className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-black tracking-tight leading-none">
                    Opal Opticals Admin
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-200">
                    Boutique Portal
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium pt-0.5">
                  Indiranagar Flagship • Local Storage Engine
                </p>
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={exportCSV}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  title="Export to CSV Spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-black hover:bg-slate-900 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Authorized Personnel Only</span>
              </span>
            )}
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {!isAuthenticated ? (
          /* ================= CRISP STANDALONE LOGIN SCREEN ================= */
          <div className="min-h-[75vh] flex items-center justify-center py-10">
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 space-y-6 text-center">
              
              <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center mx-auto text-sky-950 shadow-xs">
                <Lock className="w-7 h-7 text-sky-950" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  Staff Authentication
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Sign in to access patient eye test reservations and frame consultation leads.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-medium shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-medium shadow-xs"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-black text-white hover:bg-slate-900 text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
                Default Credentials: <strong className="text-black">admin</strong> / <strong className="text-black">opal123</strong>
              </div>

            </div>
          </div>
        ) : (
          /* ================= CRISP FULL-PAGE ADMIN DASHBOARD ================= */
          <div className="space-y-6">
            
            {/* Header Title & Subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                  Appointment Reservations
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium pt-0.5">
                  Direct live stream of customer eye examinations and frame enquiries saved in local storage.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Local Storage Active</span>
                </span>
              </div>
            </div>

            {/* 4 Metric KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Inquiries</span>
                <span className="text-2xl sm:text-3xl font-bold text-black pt-1 block">{bookings.length}</span>
                <span className="text-[11px] text-slate-500 font-medium pt-1 block">Saved in browser</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Confirmed</span>
                <span className="text-2xl sm:text-3xl font-bold text-emerald-950 pt-1 block">
                  {bookings.filter(b => b.status === 'Confirmed').length}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium pt-1 block">Active appointments</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Pending</span>
                <span className="text-2xl sm:text-3xl font-bold text-amber-950 pt-1 block">
                  {bookings.filter(b => b.status === 'Pending').length}
                </span>
                <span className="text-[11px] text-amber-700 font-medium pt-1 block">Requires staff follow-up</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">Completed</span>
                <span className="text-2xl sm:text-3xl font-bold text-sky-950 pt-1 block">
                  {bookings.filter(b => b.status === 'Completed').length}
                </span>
                <span className="text-[11px] text-sky-800 font-medium pt-1 block">Fulfilled visits</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by patient name, phone number, service, or BK #..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black font-medium"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                  {['all', 'confirmed', 'pending', 'completed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setStatusFilter(tab)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                        statusFilter === tab
                          ? 'bg-white text-black shadow-xs font-bold'
                          : 'text-slate-600 hover:text-black'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <button
                  onClick={refreshData}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 text-black hover:bg-black hover:text-white transition-all shadow-xs"
                  title="Reload from local storage"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Detailed Bookings Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[11px] font-bold">
                      <th className="py-3.5 px-4">Ref ID</th>
                      <th className="py-3.5 px-4">Patient Name</th>
                      <th className="py-3.5 px-4">Phone / WhatsApp</th>
                      <th className="py-3.5 px-4">Service Requested</th>
                      <th className="py-3.5 px-4">Appt Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          <Glasses className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm font-bold text-slate-700">No appointments matching your criteria.</p>
                          <p className="text-xs text-slate-500">New patient bookings made anywhere on the site will show up here.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            {b.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block text-xs sm:text-sm">{b.name}</span>
                            <span className="text-[11px] text-slate-500">{b.notes || 'Website booking'}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <a 
                              href={`tel:${b.phone}`}
                              className="font-bold text-black hover:underline"
                            >
                              {b.phone}
                            </a>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-900 block">{b.service}</span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">
                            {b.date}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={b.status}
                              onChange={(e) => handleStatusChange(b.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                                b.status === 'Confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : b.status === 'Completed'
                                  ? 'bg-sky-50 text-sky-800 border-sky-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Hello ${b.name}! Opal Opticals here to confirm your appointment for ${b.service} on ${b.date}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-bold transition-all shadow-xs"
                                title="Open WhatsApp chat"
                              >
                                WhatsApp
                              </a>

                              <button
                                onClick={() => handleDelete(b.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Simple Admin Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 font-medium">
        Opal Opticals • Atelier Clinical Management Portal • Bengaluru, India
      </footer>

    </div>
  );
}
