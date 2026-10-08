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
      setErrorMsg('Invalid username or password. Please try again.');
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
    <div className="min-h-screen text-black flex flex-col selection:bg-black selection:text-white bg-gradient-to-b from-[#A9CCE9] via-[#C7E1F4] to-[#EDF6FC]">
      
      {/* Top Professional Admin Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b bg-white/85 border-sky-200/80 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          
          {/* Brand & Page Identifier */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setActivePage && setActivePage('home')}
              className="p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-black transition-all flex items-center gap-1.5 text-xs font-bold shrink-0"
              title="Return to Main Store"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Store</span>
            </button>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-xs shrink-0">
                <Glasses className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xs sm:text-base font-bold text-black tracking-tight leading-none truncate">
                    Opal Admin
                  </h1>
                  <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-200 shrink-0">
                    Portal
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium pt-0.5 truncate hidden sm:block">
                  Indiranagar Flagship Atelier
                </p>
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {isAuthenticated ? (
              <>
                <button
                  onClick={exportCSV}
                  className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  title="Export to CSV Spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-black hover:bg-slate-900 text-white text-[11px] sm:text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="hidden sm:inline">Authorized Personnel Only</span>
                <span className="sm:hidden text-[10px]">Staff Only</span>
              </span>
            )}
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8">
        {!isAuthenticated ? (
          /* ================= COMPACT LOGIN CARD WITH SKY BLUE CANVAS ================= */
          <div className="min-h-[70vh] flex items-center justify-center py-6 sm:py-8 px-3">
            <div className="w-full max-w-[340px] bg-white rounded-3xl border border-white/90 shadow-[0_20px_50px_-12px_rgba(25,75,125,0.22)] p-5 sm:p-6 space-y-3.5 text-center animate-in fade-in duration-300">
              
              <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center mx-auto text-sky-950 shadow-xs">
                <Lock className="w-5 h-5 text-sky-950" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-200 mb-0.5">
                  <ShieldCheck className="w-3 h-3 text-sky-800" />
                  <span>Staff Portal</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-black tracking-tight leading-tight">
                  Staff Authentication
                </h2>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[260px] mx-auto">
                  Sign in to access patient reservations and consultations.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3 text-left pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter staff username"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black font-medium shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-800 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black font-medium shadow-xs"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[11px] font-semibold text-center">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-black text-white hover:bg-slate-900 text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>
          </div>
        ) : (
          /* ================= CRISP FULL-PAGE ADMIN DASHBOARD ================= */
          <div className="space-y-4 sm:space-y-6">
            
            {/* Header Title & Subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3">
              <div>
                <h2 className="text-xl sm:text-3xl font-black text-black tracking-tight">
                  Appointment Reservations
                </h2>
                <p className="text-xs sm:text-sm text-slate-800 font-medium pt-0.5">
                  Direct live stream of customer eye examinations and frame styling consultations.
                </p>
              </div>
            </div>

            {/* 4 Metric KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              <div className="p-3 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Inquiries</span>
                <span className="text-xl sm:text-3xl font-black text-black pt-0.5 sm:pt-1 block">{bookings.length}</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium pt-0.5 block">Saved in browser</span>
              </div>

              <div className="p-3 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-wider block">Confirmed</span>
                <span className="text-xl sm:text-3xl font-black text-emerald-950 pt-0.5 sm:pt-1 block">
                  {bookings.filter(b => b.status === 'Confirmed').length}
                </span>
                <span className="text-[10px] sm:text-[11px] text-emerald-700 font-medium pt-0.5 block">Active appointments</span>
              </div>

              <div className="p-3 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-wider block">Pending</span>
                <span className="text-xl sm:text-3xl font-black text-amber-950 pt-0.5 sm:pt-1 block">
                  {bookings.filter(b => b.status === 'Pending').length}
                </span>
                <span className="text-[10px] sm:text-[11px] text-amber-700 font-medium pt-0.5 block">Follow-up needed</span>
              </div>

              <div className="p-3 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold text-sky-800 uppercase tracking-wider block">Completed</span>
                <span className="text-xl sm:text-3xl font-black text-sky-950 pt-0.5 sm:pt-1 block">
                  {bookings.filter(b => b.status === 'Completed').length}
                </span>
                <span className="text-[10px] sm:text-[11px] text-sky-800 font-medium pt-0.5 block">Fulfilled visits</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by patient, phone, or service..."
                  className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black font-medium"
                />
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 justify-between sm:justify-start">
                <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[10px] sm:text-xs font-bold overflow-x-auto">
                  {['all', 'confirmed', 'pending', 'completed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setStatusFilter(tab)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg capitalize transition-all whitespace-nowrap ${
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
                  className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-black hover:bg-black hover:text-white transition-all shadow-xs shrink-0"
                  title="Reload from local storage"
                >
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* ================= MOBILE CARDS VIEW (< md) ================= */}
            <div className="md:hidden space-y-2.5">
              {filteredBookings.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
                  <Glasses className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">No appointments matching criteria</p>
                  <p className="text-xs text-slate-500 pt-1">New patient bookings made on the website will show up here.</p>
                </div>
              ) : (
                filteredBookings.map((b) => (
                  <div key={b.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                    {/* Card Top: ID, Date & Status Dropdown */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                          {b.id}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {b.date}
                        </span>
                      </div>
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
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
                    </div>

                    {/* Card Body: Patient Name, Phone, Service, Notes */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm text-black">{b.name}</span>
                        <a 
                          href={`tel:${b.phone}`}
                          className="flex items-center gap-1 text-[11px] font-bold text-slate-800 hover:text-black bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 shrink-0"
                        >
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span>{b.phone}</span>
                        </a>
                      </div>

                      <div className="pt-0.5">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Service</span>
                        <span className="font-semibold text-slate-900 text-xs block">{b.service}</span>
                      </div>

                      {b.notes && (
                        <div className="pt-0.5">
                          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Notes</span>
                          <p className="text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                            "{b.notes}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Card Actions: WhatsApp & Delete */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <a
                        href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${b.name}! Opal Opticals here to confirm your appointment for ${b.service} on ${b.date}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-black text-white hover:bg-slate-900 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>WhatsApp Patient</span>
                      </a>

                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors shrink-0"
                        title="Delete record"
                        aria-label="Delete booking"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ================= DESKTOP TABLE VIEW (>= md) ================= */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
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
                                className="px-2.5 py-1 rounded-lg bg-black hover:bg-slate-900 text-white text-[11px] font-bold transition-all shadow-xs"
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
      <footer className="bg-white/85 backdrop-blur-sm border-t border-sky-200/80 py-3.5 text-center text-[11px] sm:text-xs text-slate-700 font-medium px-4">
        Opal Opticals • Atelier Clinical Management Portal • Bengaluru, India
      </footer>

    </div>
  );
}
