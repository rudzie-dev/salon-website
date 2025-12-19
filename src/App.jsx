import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, Clock, Scissors, Star, 
  MapPin, Phone, Mail, Instagram, Facebook, 
  ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

/* --- DATA MODELS --- */
const SERVICES = [
  { id: 1, category: 'Haircuts', name: 'Signature Cut & Style', price: 95, duration: 60, description: 'A precision cut tailored to your face shape and lifestyle, finished with a luxury blowout.' },
  { id: 2, category: 'Color', name: 'Balayage & Gloss', price: 210, duration: 180, description: 'Hand-painted highlights for a natural, sun-kissed look.' },
  { id: 3, category: 'Treatments', name: 'Keratin Smoothing', price: 250, duration: 150, description: 'Eliminate frizz and restore shine with our premium keratin infusion therapy.' },
  { id: 4, category: 'Styling', name: 'Luxury Blowout', price: 55, duration: 45, description: 'Wash, condition, and a long-lasting blowout style for any occasion.' }
];

const STYLISTS = [
  { id: 1, name: 'Zara Nkosi', role: 'Master Stylist', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png' },
  { id: 2, name: 'Liam Chen', role: 'Color Director', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596671/image_1_1765596191540_b2rh1t.png' },
  { id: 3, name: 'Amara Dube', role: 'Texture Specialist', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596673/freepik__the-style-is-candid-image-photography-with-natural__8282_exxbxp.png' }
];

/* --- COMPONENTS --- */

const Toast = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-black text-white px-6 py-4 shadow-2xl animate-toast-in">
      <CheckCircle size={18} className="text-white" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{message}</span>
      <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100"><X size={14} /></button>
    </div>
  );
};

const ImageWithSkeleton = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-zinc-100 ${className}`}>
      {!isLoaded && <div className="absolute inset-0 z-10 animate-shimmer" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
      />
    </div>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-white text-black border border-black hover:bg-zinc-50",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black"
  };
  return (
    <button onClick={onClick} className={`px-8 py-4 transition-all duration-500 font-bold tracking-[0.2em] text-[10px] uppercase relative overflow-hidden group ${variants[variant]} ${className}`}>
      <span className="relative z-10">{children}</span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-20 group-hover:animate-shimmer-fast" />
    </button>
  );
};

const BookingModal = ({ isOpen, onClose, showToast }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({ service: null, stylist: null });

  if (!isOpen) return null;

  const handleComplete = () => {
    showToast("Appointment Secured");
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg overflow-hidden relative">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 hover:rotate-90 transition-transform"><X size={24} /></button>
        <div className="p-12">
          {step === 1 ? (
            <div className="animate-slab-up">
              <h4 className="text-2xl font-serif mb-8">Select Service</h4>
              <div className="space-y-3">
                {SERVICES.map(s => (
                  <button key={s.id} onClick={() => { setBookingData({...bookingData, service: s}); setStep(2); }} className="w-full p-4 border border-zinc-100 text-left flex justify-between items-center hover:border-black transition-all group">
                    <span className="text-xs uppercase tracking-widest font-bold">{s.name}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-slab-up text-center">
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6"><Scissors size={32} /></div>
              <h4 className="text-2xl font-serif mb-2">Finalize Booking</h4>
              <p className="text-zinc-500 text-sm mb-8">Confirming {bookingData.service?.name}</p>
              <Button onClick={handleComplete} className="w-full">Confirm Appointment</Button>
              <button onClick={() => setStep(1)} className="mt-6 text-[10px] uppercase tracking-widest font-bold opacity-50 hover:opacity-100">Back</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Services', 'Stylists', 'Contact'];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 ${isScrolled || isOpen ? 'bg-white py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className={`text-xl font-serif tracking-[0.5em] font-bold transition-colors ${isScrolled || isOpen ? 'text-black' : 'text-white'}`}>LUMIÈRE</a>
          
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`nav-link-grow text-[10px] uppercase tracking-[0.2em] font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>{item}</a>
            ))}
            <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'outline'}>Book Now</Button>
          </div>

          <button className={`p-2 transition-colors ${isScrolled || isOpen ? 'text-black' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <div className="flex flex-col gap-1.5"><div className="w-6 h-0.5 bg-current"></div><div className="w-4 h-0.5 bg-current"></div></div>}
          </button>
        </div>
      </nav>

      {/* MOBILE SLAB MENU */}
      <div className={`fixed inset-0 z-[55] bg-zinc-50 flex flex-col justify-center px-12 transition-all duration-700 ease-expo ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="space-y-6">
          {navLinks.map((link, i) => (
            <div key={link} className="overflow-hidden">
              <a 
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`block text-4xl sm:text-6xl font-serif transition-all duration-700 ease-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                {link}
              </a>
            </div>
          ))}
          <div className={`pt-10 transition-all duration-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
            <Button onClick={() => { setIsOpen(false); onBookClick(); }} className="w-full sm:w-auto">Reserve Session</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: '' }), 4000);
  };

  return (
    <div className="antialiased bg-white selection:bg-black selection:text-white">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} showToast={showToast} />
      <Toast isVisible={toast.visible} message={toast.message} onClose={() => setToast({ ...toast, visible: false })} />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center bg-black">
        <ImageWithSkeleton 
          src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" 
          className="absolute inset-0 w-full h-full opacity-60" 
        />
        <div className="relative z-10 text-center px-6">
          <p className="text-[10px] uppercase tracking-[0.6em] text-white/60 mb-8 animate-slab-up">Sandton • Cape Town</p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif text-white leading-[0.9] mb-12 animate-slab-up [animation-delay:200ms]">
            Pure <br/> <span className="italic font-normal">Elegance</span>
          </h1>
          <div className="animate-slab-up [animation-delay:400ms]">
            <Button onClick={() => setIsBookingOpen(true)}>Book Appointment</Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 sm:py-40 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold">Services</span>
              <h2 className="text-4xl sm:text-6xl font-serif mt-6 leading-tight">Artisanal hair design tailored to you.</h2>
            </div>
            <ArrowRight size={40} className="text-zinc-200 hidden md:block" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100 border-y border-zinc-100">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white p-10 sm:p-16 hover:bg-zinc-50 transition-colors group cursor-pointer" onClick={() => setIsBookingOpen(true)}>
                <h3 className="text-2xl sm:text-3xl font-serif mb-6">{s.name}</h3>
                <p className="text-sm text-zinc-500 mb-10 leading-relaxed max-w-sm">{s.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold tracking-[0.2em]">R{s.price}</span>
                  <div className="w-8 h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="stylists" className="py-24 bg-zinc-50 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-24">
            {STYLISTS.map((s) => (
              <div key={s.id} className="group">
                <ImageWithSkeleton src={s.image} className="aspect-[3/4] grayscale group-hover:grayscale-0 transition-all duration-700" />
                <h4 className="text-xl font-serif mt-8 mb-2">{s.name}</h4>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white text-black py-24 px-6 border-t border-zinc-100">
        <div className="container mx-auto max-w-7xl flex flex-col items-center">
          <h2 className="text-5xl sm:text-7xl lg:text-[12rem] font-serif tracking-[-0.02em] font-bold mb-20">LUMIÈRE</h2>
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">
            <p>© 2024 Atelier Noir</p>
            <div className="flex space-x-12">
              <a href="#" className="hover:text-black transition-colors">Instagram</a>
              <a href="#" className="hover:text-black transition-colors">Facebook</a>
            </div>
            <p>Cape Town • Sandton</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
