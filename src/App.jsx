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
  { id: 3, category: 'Treatments', name: 'Keratin Smoothing', price: 250, duration: 150, description: 'Eliminate frizz and restore shine.' },
  { id: 4, category: 'Styling', name: 'Luxury Blowout', price: 55, duration: 45, description: 'Wash, condition, and a long-lasting style.' }
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
    <div className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-[200] w-[90%] sm:w-auto flex items-center justify-between gap-3 bg-black text-white px-6 py-4 shadow-2xl animate-toast-in">
      <div className="flex items-center gap-3">
        <CheckCircle size={16} className="text-white" />
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold">{message}</span>
      </div>
      <button onClick={onClose} className="opacity-50 hover:opacity-100"><X size={14} /></button>
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
    <button onClick={onClick} className={`px-6 py-4 sm:px-10 sm:py-5 transition-all duration-500 font-bold tracking-[0.2em] text-[9px] sm:text-[10px] uppercase relative overflow-hidden group ${variants[variant]} ${className}`}>
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
    showToast("Booking Successful");
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg overflow-hidden relative rounded-t-2xl sm:rounded-none">
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2"><X size={24} /></button>
        <div className="p-8 sm:p-12">
          {step === 1 ? (
            <div className="animate-slab-up">
              <h4 className="text-xl sm:text-2xl font-serif mb-6">Select Service</h4>
              <div className="space-y-2">
                {SERVICES.map(s => (
                  <button key={s.id} onClick={() => { setBookingData({...bookingData, service: s}); setStep(2); }} className="w-full p-4 border border-zinc-100 text-left flex justify-between items-center hover:border-black transition-all">
                    <span className="text-[10px] uppercase tracking-widest font-bold">{s.name}</span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-slab-up text-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={28} /></div>
              <h4 className="text-xl sm:text-2xl font-serif mb-2">Finalize</h4>
              <p className="text-zinc-500 text-xs mb-8">Confirming {bookingData.service?.name}</p>
              <Button onClick={handleComplete} className="w-full">Book Now</Button>
              <button onClick={() => setStep(1)} className="mt-6 text-[9px] uppercase tracking-widest font-bold opacity-40">Go Back</button>
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
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 ${isScrolled || isOpen ? 'bg-white py-4 shadow-sm' : 'bg-transparent py-6 sm:py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className={`text-lg sm:text-xl font-serif tracking-[0.4em] font-bold transition-colors ${isScrolled || isOpen ? 'text-black' : 'text-white'}`}>LUMIÈRE</a>
          
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`nav-link-grow text-[10px] uppercase tracking-[0.2em] font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>{item}</a>
            ))}
            <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'outline'}>Book Now</Button>
          </div>

          <button className={`p-2 transition-colors ${isScrolled || isOpen ? 'text-black' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[55] bg-zinc-50 flex flex-col justify-center px-8 sm:px-12 transition-all duration-700 ease-expo ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="space-y-4 sm:space-y-6">
          {navLinks.map((link, i) => (
            <div key={link} className="overflow-hidden">
              <a 
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`block text-3xl sm:text-6xl font-serif transition-all duration-700 ease-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                {link}
              </a>
            </div>
          ))}
          <div className={`pt-8 transition-all duration-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
            <Button onClick={() => { setIsOpen(false); onBookClick(); }} className="w-full sm:w-auto">Book Online</Button>
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
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  return (
    <div className="antialiased bg-white selection:bg-black selection:text-white">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} showToast={showToast} />
      <Toast isVisible={toast.visible} message={toast.message} onClose={() => setToast({ ...toast, visible: false })} />

      {/* HERO SECTION - MOBILE OPTIMIZED */}
      <section className="relative min-h-[100svh] flex items-center justify-center bg-black overflow-hidden">
        <ImageWithSkeleton 
          src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" 
          className="absolute inset-0 w-full h-full opacity-50 sm:opacity-70 scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 w-full">
          <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.5em] text-white/70 mb-6 sm:mb-10 animate-slab-up">Defining Hair Artistry</p>
          <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-serif text-white leading-[0.85] mb-10 sm:mb-14 animate-slab-up [animation-delay:200ms]">
            Atelier <br/> <span className="italic font-normal">Lumière</span>
          </h1>
          <div className="animate-slab-up [animation-delay:400ms]">
            <Button onClick={() => setIsBookingOpen(true)}>Secure Booking</Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 sm:py-40 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 sm:mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold">The Menu</span>
            <h2 className="text-3xl sm:text-6xl font-serif mt-4">Selected Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100 border-y border-zinc-100">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white p-8 sm:p-16 hover:bg-zinc-50 transition-colors group cursor-pointer" onClick={() => setIsBookingOpen(true)}>
                <h3 className="text-xl sm:text-3xl font-serif mb-4">{s.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-500 mb-8 leading-relaxed line-clamp-2">{s.description}</p>
                <span className="text-[10px] font-bold tracking-[0.2em]">R{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white text-black py-20 px-6 border-t border-zinc-100 text-center">
        <h2 className="text-[14vw] sm:text-7xl lg:text-[12rem] font-serif tracking-tighter font-bold mb-10">LUMIÈRE</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
          <p>© 2024 Atelier Lumière</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-black">Instagram</a>
            <a href="#" className="hover:text-black">Facebook</a>
          </div>
          <p>Cape Town • Sandton</p>
        </div>
      </footer>
    </div>
  );
}
