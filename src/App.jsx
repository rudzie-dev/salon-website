import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Menu, X, Calendar, Clock, Scissors, Star, 
  MapPin, Phone, Mail, Instagram, Facebook, 
  ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

// Configuration
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Data fetching helpers
const fetchTableData = async (tableName) => {
  try {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching ${tableName}:`, error);
    return null;
  }
};

const createBooking = async (bookingData) => {
  try {
    const record = {
      service_id: bookingData.service.id,
      service_name: bookingData.service.name,
      stylist_name: bookingData.stylist.name,
      appointment_date: bookingData.date,
      appointment_time: bookingData.time,
      customer_name: bookingData.customerName,
      customer_email: bookingData.customerEmail,
      customer_phone: bookingData.customerPhone,
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([record])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Mock data fallback
const MOCK_SERVICES = [
  { id: 1, name: 'Signature Cut & Style', description: 'Personalized consultation, precision haircut, and bespoke styling.', price: 650, duration: 60 },
  { id: 2, name: 'Full Balayage', description: 'Freehand painting technique for a sun-kissed, natural look.', price: 1800, duration: 180 },
  { id: 3, name: 'Keratin Treatment', description: 'Smoothing treatment to eliminate frizz and add incredible shine.', price: 2500, duration: 120 },
  { id: 4, name: 'Deep Conditioning Mask', description: 'Intensive moisture and repair treatment tailored to your hair needs.', price: 300, duration: 30 },
];

const MOCK_STYLISTS = [
  { id: 1, name: 'Zara Nkosi', role: 'Creative Director', bio: 'Specializing in contemporary coloring and precision cuts.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png' },
  { id: 2, name: 'Liam Chen', role: 'Senior Stylist', bio: 'Master of balayage and long-hair styling.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596671/image_1_1765596191540_b2rh1t.png' },
  { id: 3, name: 'Amara Dube', role: 'Color Specialist', bio: 'Known for bespoke color matching and vibrant transformations.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596673/freepik__the-style-is-candid-image-photography-with-natural__8282_exxbxp.png' },
];

// Components
const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-3 transition-all duration-300 font-medium tracking-wide text-sm uppercase";
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-white text-black border border-black hover:bg-zinc-50",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black"
  };
  return <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-semibold mb-3">{subtitle}</h3>
    <h2 className="text-3xl md:text-4xl font-serif text-zinc-900">{title}</h2>
    <div className={`w-16 h-0.5 bg-zinc-900 mt-6 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const BookingModal = ({ isOpen, onClose, services, stylists }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    service: null, stylist: null, date: null, time: null,
    customerName: '', customerEmail: '', customerPhone: ''
  });

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    const result = await createBooking(bookingData);
    setLoading(false);
    if (result.success) setStep(5);
    else setError(result.error);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl min-h-[500px] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-zinc-100">
          <div>
            <h3 className="font-serif text-2xl">Book Appointment</h3>
            <p className="text-zinc-500 text-sm mt-1">Step {step} of 5</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full"><X size={20} /></button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium mb-4">Select a Service</h4>
              <div className="grid grid-cols-1 gap-3">
                {services.map((service) => (
                  <button key={service.id} onClick={() => { setBookingData({...bookingData, service}); setStep(2); }}
                    className="flex justify-between items-center p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left group">
                    <div>
                      <p className="font-medium group-hover:text-black">{service.name}</p>
                      <p className="text-sm text-zinc-500">{service.duration} mins • R{service.price}</p>
                    </div>
                    <ChevronRight size={16} className="text-zinc-300 group-hover:text-black" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium mb-4">Your Information</h4>
              <input type="text" placeholder="Full Name" value={bookingData.customerName} onChange={e => setBookingData({...bookingData, customerName: e.target.value})} className="w-full p-3 border border-zinc-200 focus:border-black outline-none" />
              <input type="email" placeholder="Email Address" value={bookingData.customerEmail} onChange={e => setBookingData({...bookingData, customerEmail: e.target.value})} className="w-full p-3 border border-zinc-200 focus:border-black outline-none" />
              <input type="tel" placeholder="Phone Number" value={bookingData.customerPhone} onChange={e => setBookingData({...bookingData, customerPhone: e.target.value})} className="w-full p-3 border border-zinc-200 focus:border-black outline-none" />
              <Button onClick={() => setStep(3)} className="w-full" disabled={!bookingData.customerName || !bookingData.customerEmail}>Next</Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium mb-4">Select a Stylist</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => { setBookingData({...bookingData, stylist: {name: 'First Available'}}); setStep(4); }} className="p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center"><Scissors size={20} /></div>
                  <div><p className="font-medium">First Available</p><p className="text-xs text-zinc-500">Any professional</p></div>
                </button>
                {stylists.map((stylist) => (
                  <button key={stylist.id} onClick={() => { setBookingData({...bookingData, stylist}); setStep(4); }} className="p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left flex items-center gap-4">
                    <img src={stylist.image} alt={stylist.name} className="w-12 h-12 rounded-full object-cover" />
                    <div><p className="font-medium">{stylist.name}</p><p className="text-xs text-zinc-500">{stylist.role}</p></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Select Date & Time</h4>
              <input type="date" value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} className="w-full p-3 border border-zinc-200 focus:border-black outline-none" />
              <div className="grid grid-cols-3 gap-2">
                {['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'].map(time => (
                  <button key={time} onClick={() => { setBookingData({...bookingData, time}); setStep(5); }}
                    className="py-3 px-2 text-sm border border-zinc-200 hover:bg-black hover:text-white hover:border-black transition-colors">{time}</button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              {error && <div className="bg-red-100 text-red-700 p-3 border border-red-200 text-sm rounded-lg">{error}</div>}
              <h4 className="text-lg font-medium">Confirm Details</h4>
              <div className="bg-zinc-50 p-6 space-y-4 border border-zinc-100 rounded-lg">
                <div className="flex justify-between border-b border-zinc-200 pb-2"><span className="text-zinc-500">Service</span><span className="font-medium">{bookingData.service?.name}</span></div>
                <div className="flex justify-between border-b border-zinc-200 pb-2"><span className="text-zinc-500">Stylist</span><span className="font-medium">{bookingData.stylist?.name}</span></div>
                <div className="flex justify-between border-b border-zinc-200 pb-2"><span className="text-zinc-500">Date & Time</span><span className="font-medium">{bookingData.date} at {bookingData.time}</span></div>
                <div className="flex justify-between pt-2"><span className="text-zinc-500">Total</span><span className="font-medium text-lg">R{bookingData.service?.price}</span></div>
              </div>
              <Button onClick={handleConfirm} className="w-full" disabled={loading}>{loading ? 'Confirming...' : 'Confirm Booking'}</Button>
            </div>
          )}

          {step === 6 && (
            <div className="text-center p-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-2xl font-serif mb-2">Booking Confirmed!</h4>
              <p className="text-zinc-500">We've received your appointment and will send a confirmation shortly.</p>
              <Button onClick={onClose} className="mt-8">Close</Button>
            </div>
          )}
        </div>

        {step < 6 && (
          <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-between items-center">
            {step > 1 && <button onClick={() => setStep(step - 1)} className="text-sm text-zinc-500 hover:text-black underline">Back</button>}
            <div className="text-xs text-zinc-400">Step {step} of 5</div>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-serif tracking-widest font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>L U M I È R E</a>
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Services', 'Stylists', 'Gallery', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className={`text-sm uppercase tracking-wide font-medium hover:opacity-70 transition-opacity ${isScrolled ? 'text-zinc-800' : 'text-white'}`}>{link}</a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'secondary'} className={isScrolled ? '' : 'bg-white text-black border-none hover:bg-zinc-100'}>Book Now</Button>
        </div>
        <button className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-lg py-8 px-6 flex flex-col space-y-4">
          {['Home', 'Services', 'Stylists', 'Gallery', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-black text-lg font-medium">{link}</a>
          ))}
          <Button onClick={() => { setMobileMenuOpen(false); onBookClick(); }} className="w-full">Book Appointment</Button>
        </div>
      )}
    </nav>
  );
};

// Main App
export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [services, setServices] = useState(MOCK_SERVICES);
  const [stylists, setStylists] = useState(MOCK_STYLISTS);
  const [testimonials, setTestimonials] = useState([{ text: "A luxury experience tailored just for you.", name: "Happy Customer", rating: 5 }]);

  useEffect(() => {
    const loadData = async () => {
      const [servicesData, stylistsData, testimonialsData] = await Promise.all([
        fetchTableData('services'),
        fetchTableData('stylists'),
        fetchTableData('testimonials')
      ]);
      if (servicesData) setServices(servicesData);
      if (stylistsData) setStylists(stylistsData);
      if (testimonialsData?.length > 0) setTestimonials(testimonialsData);
    };
    loadData();
  }, []);

  return (
    <div className="font-sans antialiased text-zinc-900">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} services={services} stylists={stylists} />

      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" alt="Cinematic Salon" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-medium">Beauty Redefined</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">Experience the Art <br/> of Hair</h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-10 font-light max-w-2xl mx-auto">A sanctuary of style in the heart of the city.</p>
          <Button onClick={() => setIsBookingOpen(true)}>Book Appointment</Button>
        </div>
      </section>

      {/* USP */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6"><Scissors className="text-zinc-900" size={28} /></div>
              <h3 className="text-xl font-serif">Master Stylists</h3>
              <p className="text-zinc-500 leading-relaxed">Our team trains internationally to bring you the latest techniques.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6"><Star className="text-zinc-900" size={28} /></div>
              <h3 className="text-xl font-serif">Luxury Experience</h3>
              <p className="text-zinc-500 leading-relaxed">Every detail is curated for you from concierge to premium products.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6"><Clock className="text-zinc-900" size={28} /></div>
              <h3 className="text-xl font-serif">Personalized Care</h3>
              <p className="text-zinc-500 leading-relaxed">Your consultation is the most important part of your visit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Our Menu" subtitle="Curated Treatments" />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map(service => (
              <div key={service.id} className="bg-white p-8 hover:shadow-lg transition-shadow border border-zinc-100 flex justify-between gap-4 group cursor-pointer" onClick={() => setIsBookingOpen(true)}>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-lg font-medium font-serif">{service.name}</h4>
                    <span className="text-lg font-semibold">R{service.price}</span>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">{service.description}</p>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider">{service.duration} Mins</p>
                </div>
                <div className="self-center"><ArrowRight size={14} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Meet The Experts" subtitle="Our Team" />
          <div className="grid md:grid-cols-3 gap-12">
            {stylists.map(stylist => (
              <div key={stylist.id} className="group text-center">
                <div className="relative overflow-hidden mb-6 mx-auto w-full aspect-[3/4] max-w-sm">
                  <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h4 className="text-xl font-serif mb-1">{stylist.name}</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">{stylist.role}</p>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">{stylist.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-zinc-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12">
            {[...Array(testimonials[0].rating)].map((_, i) => <Star key={i} className="inline-block mx-1 text-white fill-current" size={20} />)}
          </div>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-12">"{testimonials[0].text}"</h2>
          <p className="text-lg font-medium tracking-wide">— {testimonials[0].name}</p>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4 h-64 md:h-96">
        <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png" className="w-full h-full object-cover" alt="Styling Area" />
        <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png" className="w-full h-full object-cover" alt="Reception" />
        <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png" className="w-full h-full object-cover" alt="Detail" />
        <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png" className="w-full h-full object-cover" alt="Products" />
      </section>

      {/* Contact */}
      <section id="contact" className="pt-40 pb-32 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader title="Visit Us" subtitle="Get In Touch" centered={false} />
              <div className="space-y-8">
                <div className="flex items-start gap-4"><MapPin className="mt-1 text-zinc-400" /><div><h4 className="font-medium mb-1">Location</h4><p className="text-zinc-500">Shop 10, Luxe Square, Foreshore<br/>Cape Town, 8001</p></div></div>
                <div className="flex items-start gap-4"><Phone className="mt-1 text-zinc-400" /><div><h4 className="font-medium mb-1">Phone</h4><p className="text-zinc-500">(021) 555 0123</p></div></div>
                <div className="flex items-start gap-4"><Mail className="mt-1 text-zinc-400" /><div><h4 className="font-medium mb-1">Email</h4><p className="text-zinc-500">hello@lumieresalon.com</p></div></div>
                <div className="flex items-start gap-4"><Clock className="mt-1 text-zinc-400" /><div><h4 className="font-medium mb-1">Hours</h4><p className="text-zinc-500">Tue - Fri: 10am - 8pm<br/>Sat: 9am - 6pm<br/>Sun - Mon: Closed</p></div></div>
              </div>
            </div>
            <div className="bg-white p-8 shadow-sm border border-zinc-100">
              <h3 className="text-2xl font-serif mb-6">Send a Message</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
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
