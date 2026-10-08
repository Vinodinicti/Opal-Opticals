import React, { useState, useEffect } from 'react';
import { 
  Glasses, 
  X, 
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
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { getStoredBookings, updateBookingStatus, deleteBooking } from '../data/bookingStorage';

export default function AdminModal({ isOpen, onClose }) {
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
    if (isOpen) {
      // Check if session is already active
      const loggedIn = sessionStorage.getItem('opal_admin_auth') === 'true';
      if (loggedIn) {
        setIsAuthenticated(true);
        refreshData();
      } else {
        setIsAuthenticated(false);
        setUsername('');
        setPassword('');
        setErrorMsg('');
      }
    }
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default admin credentials: admin / opal123
    if (username.trim().toLowerCase() === 'admin' && password === 'opal123') {
      sessionStorage.setItem('opal_admin_auth', 'true');
      setIsAuthenticated(true);
      setErrorMsg('');
      refreshData();
    } else {
      setErrorMsg('Invalid username or password. Default is admin / opal123');
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
    if (window.confirm('Are you sure you want to delete this booking entry?')) {
      const updated = deleteBooking(id);
      setBookings(updated);
    }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white/98 backdrop-blur-2xl border border-sky-100 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-8 text-black my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Eyewear Icon */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-900 shadow-xs">
              <Glasses className="w-5 h-5 text-sky-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-black leading-tight">
                  Opal Admin Atelier
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black text-white">
                  Local Store
                </span>
              </div>
              <p className="text-[11px] text-black/60 font-medium">
                {isAuthenticated ? 'Live Appointment & Consultation Manager' : 'Secure Staff Authorization'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-black hover:text-white text-black text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-black hover:text-white text-black border border-black/15 shadow-sm flex items-center justify-center transition-all"
              aria-label="Close Admin Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area: Login or Dashboard */}
        {!isAuthenticated ? (
          /* ================= LOGIN FORM ================= */
          <div className="py-6 sm:py-10 max-w-sm mx-auto w-full text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-sky-100/70 border border-sky-200 flex items-center justify-center mx-auto text-sky-900 shadow-sm">
              <Lock className="w-6 h-6 text-sky-950" />
            </div>
            
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-black">Boutique Staff Sign-In</h4>
              <p className="text-xs text-black/70 font-medium">
                Enter your credentials to inspect live appointments stored in local memory.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5 text-left pt-2">
              <div>
                <label className="block text-[11px] font-bold text-black mb-1">Username</label>
                <div className="relative">
                  <User className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-black/15 text-xs text-black focus:outline-none focus:ring-2 focus:ring-black font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-black mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-black/15 text-xs text-black focus:outline-none focus:ring-2 focus:ring-black font-medium"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-black text-white hover:bg-slate-900 text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Access Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-[11px] text-sky-950 font-medium">
              Default access: <strong>admin</strong> / <strong>opal123</strong>
            </div>
          </div>
        ) : (
          /* ================= ADMIN DASHBOARD ================= */
          <div className="flex-1 flex flex-col overflow-hidden space-y-4">
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-black/50 block">Total Records</span>
                <span className="text-xl font-bold text-black">{bookings.length}</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-800 block">Confirmed</span>
                <span className="text-xl font-bold text-emerald-950">
                  {bookings.filter(b => b.status === 'Confirmed').length}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
                <span className="text-[10px] font-bold text-amber-800 block">Pending</span>
                <span className="text-xl font-bold text-amber-950">
                  {bookings.filter(b => b.status === 'Pending').length}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-[10px] font-bold text-sky-800 block">Storage Engine</span>
                <span className="text-xs font-bold text-sky-950 block pt-1">localStorage (Sync)</span>
              </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patient, phone, service or ref #..."
                  className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-50 border border-black/10 text-xs text-black placeholder-black/40 focus:outline-none focus:ring-1 focus:ring-black font-medium"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
                  {['all', 'confirmed', 'pending', 'completed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setStatusFilter(tab)}
                      className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                        statusFilter === tab
                          ? 'bg-white text-black shadow-xs font-bold'
                          : 'text-black/60 hover:text-black'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <button
                  onClick={refreshData}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-black hover:bg-black hover:text-white transition-all shadow-xs"
                  title="Refresh localStorage records"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bookings Table / List */}
            <div className="flex-1 overflow-y-auto border border-black/10 rounded-2xl divide-y divide-black/5 bg-white">
              {filteredBookings.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <Glasses className="w-8 h-8 text-black/30 mx-auto" />
                  <p className="text-xs font-bold text-black/70">No booking records found.</p>
                  <p className="text-[11px] text-black/50">
                    Bookings made by customers on the site will automatically populate here.
                  </p>
                </div>
              ) : (
                filteredBookings.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    {/* Patient & Booking Identity */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-black">
                          {item.id}
                        </span>
                        <h5 className="font-bold text-sm text-black">{item.name}</h5>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : item.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-black/70 font-medium flex-wrap">
                        <span className="flex items-center gap-1 text-black font-semibold">
                          <Phone className="w-3 h-3 text-sky-600" />
                          <a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-black/50" />
                          Appt: <strong className="text-black">{item.date}</strong>
                        </span>
                        <span>•</span>
                        <span className="text-black/60 italic">{item.notes}</span>
                      </div>

                      <div className="text-[11px] text-sky-950 font-bold pt-0.5">
                        Service: {item.service}
                      </div>
                    </div>

                    {/* Status Changer & Delete Action */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-[11px] font-bold text-black focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <a
                        href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${item.name}! This is Opal Opticals confirming your optical appointment on ${item.date}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-bold transition-all shadow-xs"
                        title="Message customer on WhatsApp"
                      >
                        WhatsApp
                      </a>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-xl hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors"
                        title="Delete booking entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
