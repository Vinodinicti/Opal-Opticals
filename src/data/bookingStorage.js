// Utility for saving and loading booking records in localStorage
const STORAGE_KEY = 'opal_opticals_bookings';

const initialDemoBookings = [
  {
    id: 'BK-1082',
    name: 'Rohan Verma',
    phone: '+91 98452 11980',
    service: 'Comprehensive Eye Exam (Complimentary)',
    date: '2026-10-09',
    status: 'Confirmed',
    type: 'eye-test',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: 'Requested digital autorefraction'
  },
  {
    id: 'BK-1081',
    name: 'Priya Ramaswamy',
    phone: '+91 99001 87234',
    service: '3D Centration Face Fitting',
    date: '2026-10-10',
    status: 'Pending',
    type: 'fitting',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    notes: 'Lumina Vintage Havana frame fitting'
  },
  {
    id: 'BK-1080',
    name: 'Dr. Vikram Mehta',
    phone: '+91 98860 45120',
    service: 'Prescription Lens Replacement',
    date: '2026-10-11',
    status: 'Completed',
    type: 'lenses',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: 'Freeform progressive calibration'
  }
];

export function getStoredBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDemoBookings));
      return initialDemoBookings;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialDemoBookings;
  } catch (e) {
    console.error('Error reading bookings from localStorage', e);
    return initialDemoBookings;
  }
}

export function saveBooking(booking) {
  try {
    const current = getStoredBookings();
    const newEntry = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      name: booking.name || 'Anonymous',
      phone: booking.phone || '',
      service: booking.service || 'Comprehensive Eye Exam',
      date: booking.date || new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      type: booking.type || 'booking',
      createdAt: new Date().toISOString(),
      notes: booking.notes || 'Booked via website'
    };
    const updated = [newEntry, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (e) {
    console.error('Error saving booking to localStorage', e);
    return null;
  }
}

export function updateBookingStatus(id, newStatus) {
  try {
    const current = getStoredBookings();
    const updated = current.map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error updating booking status', e);
    return [];
  }
}

export function deleteBooking(id) {
  try {
    const current = getStoredBookings();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting booking', e);
    return [];
  }
}
