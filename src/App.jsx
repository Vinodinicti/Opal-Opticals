import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import FrameQuickViewModal from './components/FrameQuickViewModal';
import EnquiryModal from './components/EnquiryModal';
import AdminModal from './components/AdminModal';

import HomePage from './pages/HomePage';
import FramesPage from './pages/FramesPage';
import LensesPage from './pages/LensesPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [quickViewFrame, setQuickViewFrame] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'booking',
    data: null,
  });

  const openBookingModal = (item = null) => {
    setModalState({
      isOpen: true,
      mode: 'booking',
      data: item,
    });
  };

  const openEnquiryModal = (item = null) => {
    setModalState({
      isOpen: true,
      mode: 'enquiry',
      data: item,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: 'booking',
      data: null,
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-black selection:bg-black selection:text-white">
      {/* Floating Cloud Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenBooking={() => openBookingModal()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onOpenBooking={openBookingModal}
            onQuickViewFrame={(frame) => setQuickViewFrame(frame)}
          />
        )}

        {activePage === 'frames' && (
          <FramesPage
            onQuickViewFrame={(frame) => setQuickViewFrame(frame)}
            onOpenBooking={openBookingModal}
            onSendEnquiry={openEnquiryModal}
          />
        )}

        {activePage === 'lenses' && (
          <LensesPage
            onOpenBooking={openBookingModal}
            onSendEnquiry={openEnquiryModal}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onOpenBooking={openBookingModal}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Cloud-styled Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenBooking={() => openBookingModal()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Quick View Frame Modal */}
      {quickViewFrame && (
        <FrameQuickViewModal
          frame={quickViewFrame}
          onClose={() => setQuickViewFrame(null)}
          onOpenBooking={(frame) => openBookingModal(frame)}
        />
      )}

      {/* Booking & Enquiry Modal */}
      {modalState.isOpen && (
        <EnquiryModal
          initialData={modalState.data}
          mode={modalState.mode}
          onClose={closeModal}
        />
      )}

      {/* Boutique Admin Modal & Dashboard */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
