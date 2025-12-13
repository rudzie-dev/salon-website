import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, Clock, Scissors, Star, 
  MapPin, Phone, Mail, Instagram, Facebook, 
  ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

/* --- SUPABASE INTEGRATION (Backend) --- */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

// !!! IMPORTANT: REPLACE THESE PLACEHOLDERS WITH YOUR ACTUAL SUPABASE DETAILS !!!
const SUPABASE_URL = "YOUR_SUPABASE_URL_HERE"; 
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY_HERE"; 

let supabase;
if (SUPABASE_URL === "YOUR_SUPABASE_URL_HERE" || SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY_HERE") {
    console.error("Supabase credentials are missing. Please update SUPABASE_URL and SUPABASE_ANON_KEY.");
} else {
    try {
      // Initialize Supabase Client
      supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log("Supabase client initialized.");
    } catch (error) {
      console.error("Failed to initialize Supabase client. Check URL and Key:", error);
    }
}

// Data fetching helper function
const fetchTableData = async (tableName) => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');

    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error(`Unexpected error during ${tableName} fetch:`, e);
    return [];
  }
};

// Booking submission helper function
const createBooking = async (bookingData) => {
  if (!supabase) return { success: false, error: "Database not connected." };
  
  // Preparing data for the 'bookings' table
  const bookingRecord = {
    service_id: bookingData.service.id,
    service_name: bookingData.service.name, // Added service_name for easier tracking
    stylist_name: bookingData.stylist.name,
    appointment_date: bookingData.date,
    appointment_time: bookingData.time,
    // Add fields for customer details if needed for a real app
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingRecord])
      .select();

    if (error) {
      console.error('Error creating booking:', error);
      return { success: false, error: error.message };
    }
    console.log('Booking successfully created:', data);
    return { success: true, data: data[0] };
  } catch (e) {
    console.error('Unexpected error during booking creation:', e);
    return { success: false, error: e.message };
  }
};

/* --- IMAGE URLS & MOCK DATA --- */

// New Image URLs provided by the user
const IMAGE_URLS = {
  hero: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png',
  zara: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png',
  liam: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596671/image_1_1765596191540_b2rh1t.png',
  amara: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596673/freepik__the-style-is-candid-image-photography-with-natural__8282_exxbxp.png',
  gallery1: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png', // Main Styling Area
  gallery2: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png', // Reception/Waiting Area
  gallery3: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png', // Salon Detail/Ambiance
  gallery4: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png', // Product Display
};

// Mock Stylist Data (Used if Supabase fails to connect or fetch data)
const MOCK_STYLISTS = [
  { id: 1, name: 'Zara Nkosi', role: 'Creative Director', bio: 'Specializing in contemporary coloring and precision cuts. Zara sets the standard for style.', image: IMAGE_URLS.zara },
  { id: 2, name: 'Liam Chen', role: 'Senior Stylist', bio: 'Master of balayage and long-hair styling. Liam brings a calm, artistic approach to every client.', image: IMAGE_URLS.liam },
  { id: 3, name: 'Amara Dube', role: 'Color Specialist', bio: 'Known for bespoke color matching and dramatic, vibrant transformations. Your vision is her masterpiece.', image: IMAGE_URLS.amara },
];

const MOCK_SERVICES = [
    { id: 1, name: 'Signature Cut & Style', description: 'Personalized consultation, precision haircut, and bespoke styling.', price: 650, duration: 60 },
    { id: 2, name: 'Full Balayage', description: 'Freehand painting technique for a sun-kissed, natural look.', price: 1800, duration: 180 },
    { id: 3, name: 'Keratin Treatment', description: 'Smoothing treatment to eliminate frizz and add incredible shine.', price: 2500, duration: 120 },
    { id: 4, name: 'Deep Conditioning Mask', description: 'Intensive moisture and repair treatment tailored to your hair needs.', price: 300, duration: 30 },
];

/* --- COMPONENTS & CONSTANTS --- */

// Button Component
const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-3 transition-all duration-300 font-medium tracking-wide text-sm uppercase";
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-white text-black border border-black hover:bg-zinc-50",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Section Header Component
const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-semibold mb-3">{subtitle}</h3>
    <h2 className="text-3xl md:text-4xl font-serif text-zinc-900">{title}</h2>
    <div className={`w-16 h-0.5 bg-zinc-900 mt-6 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

// Booking Modal
const BookingModal = ({ isOpen, onClose, services, stylists }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    service: null,
    stylist: null,
    date: null,
    time: null
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const resetBooking = () => {
    setStep(1);
    setLoading(false);
    setError(null);
    setBookingData({ service: null, stylist: null, date: null, time: null });
    onClose();
  };
  
  const handleConfirmBooking = async () => {
    setLoading(true);
    setError(null);

    if (SUPABASE_URL === "YOUR_SUPABASE_URL_HERE") {
        setError("Supabase credentials are not configured. Cannot submit booking.");
        setLoading(false);
        return;
    }

    const result = await createBooking(bookingData);

    setLoading(false);
    if (result.success) {
        setStep(5); // Move to a confirmation view step
    } else {
        setError(result.error || "Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl min-h-[500px] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-100">
          <div>
            <h3 className="font-serif text-2xl">Book Appointment</h3>
            <p className="text-zinc-500 text-sm mt-1">
              Step {step} of 4 
              {loading && <span className="ml-2 text-xs text-blue-500">Processing...</span>}
            </p>
          </div>
          <button onClick={resetBooking} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium mb-4">Select a Service</h4>
              <div className="grid grid-cols-1 gap-3">
                {services.length === 0 ? (
                    <p className="text-center text-zinc-500">
                        {supabase ? 'Fetching services...' : 'Using mock data...'}
                    </p>
                ) : (
                  services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setBookingData({ ...bookingData, service });
                        handleNext();
                      }}
                      className="flex justify-between items-center p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left group"
                    >
                      <div>
                        <p className="font-medium group-hover:text-black">{service.name}</p>
                        <p className="text-sm text-zinc-500">{service.duration} mins • R{service.price}</p>
                      </div>
                      <ChevronRight size={16} className="text-zinc-300 group-hover:text-black" />
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium mb-4">Select a Stylist</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                   onClick={() => {
                    setBookingData({ ...bookingData, stylist: { name: 'Any Stylist', role: 'First Available' } });
                    handleNext();
                  }}
                  className="p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left flex items-center gap-4"
                >
                   <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center">
                      <Scissors size={20} />
                   </div>
                   <div>
                      <p className="font-medium">Any Professional</p>
                      <p className="text-xs text-zinc-500">Earliest availability</p>
                   </div>
                </button>
                {stylists.length === 0 ? (
                    <p className="text-center text-zinc-500 col-span-2">
                        {supabase ? 'Fetching stylists...' : 'Using mock data...'}
                    </p>
                ) : (
                  stylists.map((stylist) => (
                    <button
                      key={stylist.id}
                      onClick={() => {
                        setBookingData({ ...bookingData, stylist });
                        handleNext();
                      }}
                      className="p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left flex items-center gap-4"
                    >
                      {/* Use actual image field or fallback to a placeholder */}
                      <img 
                          src={stylist.image || `https://placehold.co/48x48/F5F5F5/333?text=${stylist.name.charAt(0)}`} 
                          alt={stylist.name} 
                          className="w-12 h-12 rounded-full object-cover grayscale" 
                      />
                      <div>
                        <p className="font-medium">{stylist.name}</p>
                        <p className="text-xs text-zinc-500">{stylist.role}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Select Date & Time</h4>
              <div className="p-4 border border-zinc-200 bg-zinc-50 text-center text-zinc-500 text-sm mb-4">
                Availability for {bookingData.stylist?.name}
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {/* Simulated Availability Data */}
                {['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'].map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setBookingData({ ...bookingData, date: '2025-12-25', time }); // Using ISO date for mock
                      handleNext();
                    }}
                    className="py-3 px-2 text-sm border border-zinc-200 hover:bg-black hover:text-white hover:border-black transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-400 text-center mt-4">Simulated Availability View</p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
               <div className="text-center">
                  {error && (
                    <div className="bg-red-100 text-red-700 p-3 mb-4 border border-red-200 text-sm rounded-lg">
                      Booking Error: {error}
                    </div>
                  )}
                  <h4 className="text-2xl font-serif mb-2">Confirm Details</h4>
                  <p className="text-zinc-500">Please review your appointment details below before confirming.</p>
               </div>

               <div className="bg-zinc-50 p-6 space-y-4 border border-zinc-100 rounded-lg">
                  <div className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="text-zinc-500">Service</span>
                    <span className="font-medium">{bookingData.service?.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="text-zinc-500">Stylist</span>
                    <span className="font-medium">{bookingData.stylist?.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="text-zinc-500">Date & Time</span>
                    <span className="font-medium">{bookingData.date} at {bookingData.time}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-zinc-500">Total Price</span>
                    <span className="font-medium text-lg">R{bookingData.service?.price}</span>
                  </div>
               </div>
            </div>
          )}
          
          {step === 5 && (
            <div className="text-center p-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} />
                </div>
                <h4 className="text-2xl font-serif mb-2">Booking Confirmed!</h4>
                <p className="text-zinc-500">Your appointment has been successfully saved to Supabase (if configured).</p>
                <Button onClick={resetBooking} className="mt-8">Close</Button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        {step < 5 && (
            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-between items-center">
              {step > 1 && step < 4 ? (
                <button onClick={handleBack} className="text-sm text-zinc-500 hover:text-black underline">
                  Back
                </button>
              ) : (
                 <div></div>
              )}
    
              {step === 4 ? (
                <Button 
                  onClick={handleConfirmBooking} 
                  className="w-full sm:w-auto"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Confirm Appointment'}
                </Button>
              ) : (
                <div className="text-xs text-zinc-400">Step {step} of 4</div>
              )}
            </div>
        )}
      </div>
    </div>
  );
};

// Navbar Component (Unchanged)
const Navbar = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Stylists', href: '#team' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-serif tracking-widest font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>
          L U M I È R E
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm uppercase tracking-wide font-medium hover:opacity-70 transition-opacity ${isScrolled ? 'text-zinc-800' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <Button 
            onClick={onBookClick} 
            variant={isScrolled ? 'primary' : 'secondary'}
            className={isScrolled ? '' : 'bg-white text-black border-none hover:bg-zinc-100'}
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-lg py-8 px-6 flex flex-col space-y-4 animate-in slide-in-from-top-5">
           {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-black text-lg font-medium"
            >
              {link.name}
            </a>
          ))}
          <Button onClick={() => { setMobileMenuOpen(false); onBookClick(); }} className="w-full">
            Book Appointment
          </Button>
        </div>
      )}
    </nav>
  );
};

/* --- MAIN APP COMPONENT ---
*/

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // State for data fetched from Supabase, initialized with mock data as fallback
  const [services, setServices] = useState(MOCK_SERVICES);
  const [stylists, setStylists] = useState(MOCK_STYLISTS);
  const [testimonials, setTestimonials] = useState([]);

  // Fetch data from Supabase on component mount
  useEffect(() => {
    const loadData = async () => {
      // Services
      const fetchedServices = await fetchTableData('services');
      if (fetchedServices.length > 0) {
        setServices(fetchedServices);
      } else {
        console.warn("Using mock services data.");
        setServices(MOCK_SERVICES);
      }
      
      // Stylists
      const fetchedStylists = await fetchTableData('stylists');
      if (fetchedStylists.length > 0) {
        // If data is fetched, enrich it with images if the DB field is missing
        const enrichedStylists = fetchedStylists.map(s => {
          if (!s.image) {
            return { ...s, image: MOCK_STYLISTS.find(m => m.name === s.name)?.image || s.image };
          }
          return s;
        });
        setStylists(enrichedStylists);
      } else {
        console.warn("Using mock stylists data.");
        setStylists(MOCK_STYLISTS);
      }
      
      // Testimonials
      const fetchedTestimonials = await fetchTableData('testimonials');
      setTestimonials(fetchedTestimonials);
    };
    
    if (supabase) {
        loadData();
    } else {
        console.warn("Supabase client is not available. Using full mock data.");
    }
  }, []);

  // Use the first testimonial if available, otherwise use a placeholder
  const currentTestimonial = testimonials.length > 0 ? testimonials[0] : { text: "A luxury experience tailored just for you.", name: "Happy Customer", rating: 5 };

  return (
    <div className="font-sans antialiased text-zinc-900 selection:bg-zinc-200 selection:text-black">
      
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        services={services} 
        stylists={stylists}
      />

      {/* Hero Section - UPDATED IMAGE */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGE_URLS.hero} // NEW HERO IMAGE
            alt="Cinematic Salon Interior" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-medium">Beauty Redefined</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
            Experience the Art <br/> of Hair
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-10 font-light max-w-2xl mx-auto">
            A sanctuary of style in the heart of the city. We blend modern techniques with timeless elegance to reveal your best self.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setIsBookingOpen(true)} className="min-w-[180px]">
              Book Appointment
            </Button>
            <Button variant="outline" className="min-w-[180px]">
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* USP Section (Unchanged) */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scissors className="text-zinc-900" size={28} />
              </div>
              <h3 className="text-xl font-serif">Master Stylists</h3>
              <p className="text-zinc-500 leading-relaxed">
                Our team trains internationally to bring you the latest techniques in cutting and coloring.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-zinc-900" size={28} />
              </div>
              <h3 className="text-xl font-serif">Luxury Experience</h3>
              <p className="text-zinc-500 leading-relaxed">
                From our concierge service to our premium product lines, every detail is curated for you.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-zinc-900" size={28} />
              </div>
              <h3 className="text-xl font-serif">Personalized Care</h3>
              <p className="text-zinc-500 leading-relaxed">
                We take the time to listen. Your consultation is the most important part of your visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Uses mock data if Supabase fails) */}
      <section id="services" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader 
            title="Our Menu" 
            subtitle="Curated Treatments" 
          />
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service) => (
                  <div key={service.id} className="bg-white p-8 hover:shadow-lg transition-shadow duration-300 border border-zinc-100 flex justify-between gap-4 group cursor-pointer" onClick={() => setIsBookingOpen(true)}>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-lg font-medium font-serif group-hover:text-zinc-600 transition-colors">{service.name}</h4>
                        <span className="text-lg font-semibold">R{service.price}</span>
                      </div>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-4">{service.description}</p>
                      <p className="text-xs text-zinc-400 uppercase tracking-wider">{service.duration} Mins</p>
                    </div>
                    <div className="self-center">
                       <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-colors">
                          <ArrowRight size={14} className="text-zinc-300 group-hover:text-white" />
                       </div>
                    </div>
                  </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => setIsBookingOpen(true)} variant="primary">Book Now</Button>
          </div>
        </div>
      </section>

      {/* Team Section (Uses new images for mock/fallback data) */}
      <section id="team" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
           <SectionHeader title="Meet The Experts" subtitle="Our Team" />
           
           <div className="grid md:grid-cols-3 gap-12">
              {stylists.map((stylist) => (
                  <div key={stylist.id} className="group text-center">
                    <div className="relative overflow-hidden mb-6 mx-auto w-full aspect-[3/4] max-w-sm">
                      <img 
                        src={stylist.image || `https://placehold.co/400x533/F5F5F5/333?text=${stylist.name.replace(' ', '+')}`} 
                        alt={stylist.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                      />
                    </div>
                    <h4 className="text-xl font-serif mb-1">{stylist.name}</h4>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">{stylist.role}</p>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">{stylist.bio}</p>
                  </div>
              ))}
           </div>
        </div>
      </section>

      {/* Testimonials (Unchanged) */}
      <section className="py-24 px-6 bg-zinc-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12">
             {/* Render stars dynamically based on rating, ensuring rating is a number */}
             {[...Array(currentTestimonial.rating && typeof currentTestimonial.rating === 'number' ? currentTestimonial.rating : 5)].map((_, i) => (
                 <Star key={i} className="inline-block mx-1 text-white fill-current" size={20} />
             ))}
          </div>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-12">
            "{currentTestimonial.text}"
          </h2>
          <p className="text-lg font-medium tracking-wide">— {currentTestimonial.name}</p>
        </div>
      </section>

      {/* Gallery Teaser - UPDATED IMAGES */}
      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4 h-64 md:h-96">
        <img src={IMAGE_URLS.gallery1} className="w-full h-full object-cover" alt="Main Styling Area" />
        <img src={IMAGE_URLS.gallery2} className="w-full h-full object-cover" alt="Reception and Waiting Area" />
        <img src={IMAGE_URLS.gallery3} className="w-full h-full object-cover" alt="Salon Detail and Ambiance" />
        <img src={IMAGE_URLS.gallery4} className="w-full h-full object-cover" alt="Product Display" />
      </section>

      {/* Contact Section - EXTREMELY INCREASED TOP PADDING FOR MAX SEPARATION */}
      <section id="contact" className="pt-40 pb-32 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
           <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeader title="Visit Us" subtitle="Get In Touch" centered={false} />
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 text-zinc-400" />
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-zinc-500">Shop 10, Luxe Square, Foreshore<br/>Cape Town, Western Cape 8001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 text-zinc-400" />
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p className="text-zinc-500">(021) 555 0123</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 text-zinc-400" />
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-zinc-500">hello@lumieresalon.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="mt-1 text-zinc-400" />
                    <div>
                      <h4 className="font-medium mb-1">Hours</h4>
                      <p className="text-zinc-500">Tue - Fri: 10am - 8pm<br/>Sat: 9am - 6pm<br/>Sun - Mon: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 shadow-sm border border-zinc-100">
                <h3 className="text-2xl font-serif mb-6">Send a Message</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full p-3 bg-zinc-50 border-none focus:ring-1 focus:ring-black outline-none rounded-md" />
                    <input type="text" placeholder="Last Name" className="w-full p-3 bg-zinc-50 border-none focus:ring-1 focus:ring-black outline-none rounded-md" />
                  </div>
                  <input type="email" placeholder="Email Address" className="w-full p-3 bg-zinc-50 border-none focus:ring-1 focus:ring-black outline-none rounded-md" />
                  <textarea rows="4" placeholder="Your Message" className="w-full p-3 bg-zinc-50 border-none focus:ring-1 focus:ring-black outline-none rounded-md"></textarea>
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-16 px-6">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-serif font-bold tracking-widest mb-8">L U M I È R E</h2>
          <div className="flex space-x-8 mb-12">
            <a href="#" className="hover:text-zinc-400 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-zinc-400 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-zinc-400 transition-colors" aria-label="X (formerly Twitter)">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-sm text-zinc-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
          </div>
          <p className="mt-12 text-zinc-600 text-xs">© 2024 Lumière Salon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
