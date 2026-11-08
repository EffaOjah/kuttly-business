/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const BusinessContext = createContext();

export function BusinessProvider({ children }) {
  // ── 1. Business Profile State ──
  const [profile, setProfile] = useState({
    name: "The Fade Room Lagos",
    description: "Premium grooming lounge specializing in modern fades, luxury beard sculpting, and hot towel treatments in the heart of Lekki Phase 1.",
    logo: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=300",
    coverImage: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200",
    phone: "+234 803 123 4567",
    email: "manager@thefaderoom.ng",
    address: "Plot 14 Admiralty Way",
    city: "Lekki Phase 1",
    state: "Lagos State",
    latitude: "6.4474",
    longitude: "3.4723",
    slug: "faderoom-lekki",
    instagram: "@thefaderoomlagos",
    facebook: "TheFadeRoomLagos",
    tiktok: "@thefaderoom_ng",
    twitter: "@faderoomlagos",
    onlineBookingEnabled: true,
  });

  // ── 2. Services State ──
  const [services, setServices] = useState([
    { id: 1, name: 'Low Cut', price: '₦3,000', priceNum: 3000, duration: '30 mins', category: 'Haircut', description: 'Clean classic low cut with sharp taper and neck line cleanup.', active: true, image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Haircut + Beard', price: '₦5,000', priceNum: 5000, duration: '45 mins', category: 'Combo', description: 'Skin taper or fade paired with precision razor beard sculpt and organic balm.', active: true, image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Hair Dye', price: '₦8,000', priceNum: 8000, duration: '60 mins', category: 'Color', description: 'Deep jet black tint or custom blond highlights with scalp conditioning.', active: true, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Executive Grooming Package', price: '₦12,000', priceNum: 12000, duration: '75 mins', category: 'Combo', description: 'Full haircut, beard sculpt, deep clarifying facial scrub, and stress-relief scalp massage.', active: true, image: 'https://images.unsplash.com/photo-1517832606589-7629c33971a3?auto=format&fit=crop&q=80&w=400' },
    { id: 5, name: 'Traditional Hot Towel Shave', price: '₦5,000', priceNum: 5000, duration: '40 mins', category: 'Shave', description: 'Warm lather straight razor shave finished with ice-cold mint towel and skin tonic.', active: true, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
  ]);

  // ── 3. Bookings State ──
  const [bookings, setBookings] = useState([
    {
      id: 'BK-1081',
      customer: "Emmanuel Nduka",
      phone: "+234 803 123 4567",
      email: "emmanuel.nduka@gmail.com",
      service: "Haircut + Beard",
      price: "₦5,000",
      date: "Today",
      time: "10:30 AM",
      status: "Confirmed", // Pending, Confirmed, Completed, Cancelled, Rejected
      notes: "Please use foil shaver on neck.",
      createdAt: "Today, 08:15 AM"
    },
    {
      id: 'BK-1082',
      customer: "Chukwudi Eze",
      phone: "+234 812 987 6543",
      email: "eze.chukwudi@yahoo.com",
      service: "Low Cut",
      price: "₦3,000",
      date: "Today",
      time: "11:45 AM",
      status: "Pending",
      notes: "First time client.",
      createdAt: "Today, 09:10 AM"
    },
    {
      id: 'BK-1083',
      customer: "Babatunde Lawal",
      phone: "+234 701 555 4321",
      email: "tunde.lawal@outlook.com",
      service: "Executive Grooming Package",
      price: "₦12,000",
      date: "Today",
      time: "01:15 PM",
      status: "Confirmed",
      notes: "VIP booking for special event.",
      createdAt: "Yesterday"
    },
    {
      id: 'BK-1084',
      customer: "Osas Ighodaro",
      phone: "+234 805 777 8899",
      email: "osas.ighodaro@gmail.com",
      service: "Hair Dye",
      price: "₦8,000",
      date: "Tomorrow",
      time: "02:30 PM",
      status: "Pending",
      notes: "Jet black color dye.",
      createdAt: "Yesterday"
    },
    {
      id: 'BK-1085',
      customer: "David Adeleke",
      phone: "+234 802 333 4444",
      email: "david.a@gmail.com",
      service: "Haircut + Beard",
      price: "₦5,000",
      date: "Tomorrow",
      time: "04:00 PM",
      status: "Confirmed",
      notes: "Standard weekly trim.",
      createdAt: "2 days ago"
    },
    {
      id: 'BK-1080',
      customer: "Kolawole Sanusi",
      phone: "+234 816 222 1111",
      email: "kola.sanusi@gmail.com",
      service: "Low Cut",
      price: "₦3,000",
      date: "Yesterday",
      time: "04:30 PM",
      status: "Completed",
      notes: "Completed cleanly.",
      createdAt: "3 days ago"
    },
    {
      id: 'BK-1079',
      customer: "Tope Alabi",
      phone: "+234 809 111 2233",
      email: "tope.alabi@gmail.com",
      service: "Traditional Hot Towel Shave",
      price: "₦5,000",
      date: "2 days ago",
      time: "03:00 PM",
      status: "Cancelled",
      notes: "Client rescheduled due to rain.",
      createdAt: "4 days ago"
    }
  ]);

  // ── 4. Working Hours & Availability State ──
  const [workingHours, setWorkingHours] = useState([
    { day: "Monday", open: "09:00", close: "20:00", isOpen: true },
    { day: "Tuesday", open: "09:00", close: "20:00", isOpen: true },
    { day: "Wednesday", open: "09:00", close: "20:00", isOpen: true },
    { day: "Thursday", open: "09:00", close: "20:00", isOpen: true },
    { day: "Friday", open: "09:00", close: "21:00", isOpen: true },
    { day: "Saturday", open: "08:30", close: "21:00", isOpen: true },
    { day: "Sunday", open: "12:00", close: "19:00", isOpen: false },
  ]);

  const [blockedDates, setBlockedDates] = useState([
    { id: 1, date: "2026-12-25", reason: "Christmas Day Holiday" },
    { id: 2, date: "2027-01-01", reason: "New Year Holiday" },
  ]);

  const [bookingInterval, setBookingInterval] = useState("30"); // in minutes

  // ── 5. Customers State ──
  const [customers, setCustomers] = useState([
    { id: 1, name: "Emmanuel Nduka", phone: "+234 803 123 4567", email: "emmanuel.nduka@gmail.com", bookingsCount: 14, lastBookingDate: "Today", favoriteService: "Haircut + Beard" },
    { id: 2, name: "Chukwudi Eze", phone: "+234 812 987 6543", email: "eze.chukwudi@yahoo.com", bookingsCount: 3, lastBookingDate: "Oct 12, 2026", favoriteService: "Low Cut" },
    { id: 3, name: "Babatunde Lawal", phone: "+234 701 555 4321", email: "tunde.lawal@outlook.com", bookingsCount: 8, lastBookingDate: "Oct 04, 2026", favoriteService: "Executive Package" },
    { id: 4, name: "Osas Ighodaro", phone: "+234 805 777 8899", email: "osas.ighodaro@gmail.com", bookingsCount: 1, lastBookingDate: "Oct 20, 2026", favoriteService: "Hair Dye" },
    { id: 5, name: "David Adeleke", phone: "+234 802 333 4444", email: "david.a@gmail.com", bookingsCount: 22, lastBookingDate: "Sep 28, 2026", favoriteService: "Haircut + Beard" },
    { id: 6, name: "Kolawole Sanusi", phone: "+234 816 222 1111", email: "kola.sanusi@gmail.com", bookingsCount: 5, lastBookingDate: "Sep 15, 2026", favoriteService: "Low Cut" },
  ]);

  // ── 6. Portfolio / Gallery State (Limit: 10 for Basic) ──
  const [portfolio, setPortfolio] = useState([
    { id: 1, url: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=600", title: "Clean Skin Fade with Beard Line", isCover: true, uploadedAt: "Nov 02, 2026" },
    { id: 2, url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=600", title: "Executive Low Cut & Wave Sculpt", isCover: false, uploadedAt: "Oct 28, 2026" },
    { id: 3, url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600", title: "Razor Taper & Goatee Polish", isCover: false, uploadedAt: "Oct 20, 2026" },
    { id: 4, url: "https://images.unsplash.com/photo-1517832606589-7629c33971a3?auto=format&fit=crop&q=80&w=600", title: "Textured Crop & Razor Fade", isCover: false, uploadedAt: "Oct 15, 2026" },
    { id: 5, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600", title: "Classic Beard Sculpt & Hot Towel", isCover: false, uploadedAt: "Oct 08, 2026" },
    { id: 6, url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600", title: "Lounge Interior & Stations", isCover: false, uploadedAt: "Oct 01, 2026" },
  ]);

  // ── 7. Reviews State ──
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customer: "David Adeleke",
      rating: 5,
      date: "Yesterday",
      service: "Haircut + Beard",
      comment: "Best skin fade in Lekki! The hot towel shave was soothing and Tunde paid attention to every detail.",
      verifiedBooking: true,
      businessResponse: "Thank you David! Always a pleasure having you at The Fade Room.",
      responseDate: "Today"
    },
    {
      id: 2,
      customer: "Emmanuel Nduka",
      rating: 5,
      date: "3 days ago",
      service: "Haircut + Beard",
      comment: "Clean shop, zero waiting time when you book ahead. Highly recommend for any guy who values punctuality.",
      verifiedBooking: true,
      businessResponse: null,
      responseDate: null
    },
    {
      id: 3,
      customer: "Babatunde Lawal",
      rating: 5,
      date: "1 week ago",
      service: "Executive Grooming Package",
      comment: "The facial scrub and scalp massage was worth every naira. Felt like a brand new person after leaving.",
      verifiedBooking: true,
      businessResponse: "Appreciate the review Babatunde! See you on your next visit.",
      responseDate: "6 days ago"
    },
    {
      id: 4,
      customer: "Chukwudi Eze",
      rating: 4,
      date: "2 weeks ago",
      service: "Low Cut",
      comment: "Very neat haircut. Great music and chilled AC. Would give 5 stars if parking was a bit easier.",
      verifiedBooking: true,
      businessResponse: null,
      responseDate: null
    }
  ]);

  // ── 8. Walk-in Management State ──
  const [walkins, setWalkins] = useState([
    {
      id: 'WK-501',
      customer: "Emeka Opara",
      phone: "+234 803 777 9900",
      service: "Low Cut",
      price: "₦3,000",
      time: "09:30 AM",
      status: "Completed", // In Progress, Completed
      date: "Today",
    },
    {
      id: 'WK-502',
      customer: "Sola Williams",
      phone: "+234 809 444 1122",
      service: "Haircut + Beard",
      price: "₦5,000",
      time: "10:45 AM",
      status: "In Progress",
      date: "Today",
    },
    {
      id: 'WK-503',
      customer: "Tariq Ibrahim",
      phone: "",
      service: "Low Cut",
      price: "₦3,000",
      time: "11:15 AM",
      status: "In Progress",
      date: "Today",
    }
  ]);

  // ── 9. Promotions State ──
  const [promotions, setPromotions] = useState([
    {
      id: 'PRM-201',
      package: 'Search Top Placement in Lekki',
      location: 'Lagos - Lekki Phase 1',
      duration: '7 Days',
      price: '₦8,500',
      status: 'Active', // Active, Expired
      startDate: 'Nov 04, 2026',
      endDate: 'Nov 11, 2026',
      impressions: 1420,
      clicks: 168
    },
    {
      id: 'PRM-200',
      package: 'Homepage Featured Barber',
      location: 'Lagos State (All)',
      duration: '7 Days',
      price: '₦15,000',
      status: 'Expired',
      startDate: 'Oct 20, 2026',
      endDate: 'Oct 27, 2026',
      impressions: 4890,
      clicks: 512
    }
  ]);

  // ── 10. Settings State ──
  const [settings, setSettings] = useState({
    ownerName: "Tunde Bakare",
    ownerEmail: "manager@thefaderoom.ng",
    ownerPhone: "+234 803 123 4567",
    smsBookingAlerts: true,
    emailDailySummary: true,
    smsCustomerReminders: true,
    twoFactorAuth: false,
  });

  // ── Upgrade Modal State ──
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // ── Mobile Menu State (shared between Sidebar & Header) ──
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Helper Actions ──

  // Bookings
  const updateBookingStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const addBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    // Also record customer if new
    if (!customers.some(c => c.name.toLowerCase() === newBooking.customer.toLowerCase())) {
      setCustomers(prev => [{
        id: Date.now(),
        name: newBooking.customer,
        phone: newBooking.phone || '',
        email: newBooking.email || '',
        bookingsCount: 1,
        lastBookingDate: "Today",
        favoriteService: newBooking.service
      }, ...prev]);
    }
  };

  // Services
  const addService = (service) => {
    setServices(prev => [...prev, { ...service, id: Date.now() }]);
  };

  const updateService = (id, updated) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const toggleService = (id) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  // Availability
  const updateWorkingDay = (dayName, updates) => {
    setWorkingHours(prev => prev.map(d => d.day === dayName ? { ...d, ...updates } : d));
  };

  const addBlockedDate = (dateObj) => {
    setBlockedDates(prev => [...prev, { ...dateObj, id: Date.now() }]);
  };

  const removeBlockedDate = (id) => {
    setBlockedDates(prev => prev.filter(d => d.id !== id));
  };

  const toggleOnlineBookings = () => {
    setProfile(prev => ({ ...prev, onlineBookingEnabled: !prev.onlineBookingEnabled }));
  };

  // Portfolio
  const addPortfolioImage = (img) => {
    if (portfolio.length >= 10) return false;
    setPortfolio(prev => [{ ...img, id: Date.now(), uploadedAt: 'Today' }, ...prev]);
    return true;
  };

  const deletePortfolioImage = (id) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
  };

  const setCoverImage = (id) => {
    setPortfolio(prev => prev.map(p => ({ ...p, isCover: p.id === id })));
  };

  // Reviews
  const replyToReview = (id, responseText) => {
    setReviews(prev => prev.map(r => r.id === id ? {
      ...r,
      businessResponse: responseText,
      responseDate: 'Today'
    } : r));
  };

  // Walkins
  const addWalkin = (walkinData) => {
    const newWalkin = {
      id: `WK-${Math.floor(100 + Math.random() * 900)}`,
      customer: walkinData.customer,
      phone: walkinData.phone || '',
      service: walkinData.service,
      price: walkinData.price,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'In Progress',
      date: 'Today'
    };
    setWalkins(prev => [newWalkin, ...prev]);
  };

  const updateWalkinStatus = (id, newStatus) => {
    setWalkins(prev => prev.map(w => w.id === id ? { ...w, status: newStatus } : w));
  };

  // Promotions
  const purchasePromotion = (promo) => {
    const newPromo = {
      id: `PRM-${Math.floor(100 + Math.random() * 900)}`,
      ...promo,
      status: 'Active',
      startDate: 'Today',
      impressions: 0,
      clicks: 0
    };
    setPromotions(prev => [newPromo, ...prev]);
  };

  // Profile
  const updateProfile = (updatedProfile) => {
    setProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  // Settings
  const updateSettings = (updatedSettings) => {
    setSettings(prev => ({ ...prev, ...updatedSettings }));
  };

  // ── Calculated Overview Metrics ──
  const totalBookingsCount = bookings.length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'Pending').length;
  const confirmedBookingsCount = bookings.filter(b => b.status === 'Confirmed').length;
  const completedBookingsCount = bookings.filter(b => b.status === 'Completed').length;
  const totalCustomersCount = customers.length;

  // Profile completion calculation
  const calculateProfileCompletion = () => {
    let score = 0;
    if (profile.name) score += 15;
    if (profile.description) score += 15;
    if (profile.logo) score += 15;
    if (profile.coverImage) score += 15;
    if (profile.phone && profile.email) score += 10;
    if (profile.address && profile.city) score += 10;
    if (services.length >= 3) score += 10;
    if (portfolio.length >= 1) score += 10;
    return Math.min(score, 100);
  };

  return (
    <BusinessContext.Provider
      value={{
        // State
        profile,
        services,
        bookings,
        workingHours,
        blockedDates,
        bookingInterval,
        customers,
        portfolio,
        reviews,
        walkins,
        promotions,
        settings,
        isUpgradeModalOpen,
        mobileMenuOpen,

        // Setters & Modals
        setIsUpgradeModalOpen,
        setMobileMenuOpen,
        updateProfile,
        updateSettings,

        // Actions
        updateBookingStatus,
        addBooking,
        addService,
        updateService,
        deleteService,
        toggleService,
        updateWorkingDay,
        addBlockedDate,
        removeBlockedDate,
        toggleOnlineBookings,
        setBookingInterval,
        addPortfolioImage,
        deletePortfolioImage,
        setCoverImage,
        replyToReview,
        addWalkin,
        updateWalkinStatus,
        purchasePromotion,

        // Counts
        totalBookingsCount,
        pendingBookingsCount,
        confirmedBookingsCount,
        completedBookingsCount,
        totalCustomersCount,
        profileCompletion: calculateProfileCompletion(),
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
