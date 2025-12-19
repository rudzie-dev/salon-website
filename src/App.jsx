import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, Clock, Scissors, Star, 
  MapPin, Phone, Mail, Instagram, Facebook, 
  ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

/* --- DATA MODELS --- */

const SERVICES = [
  { id: 1, category: 'Haircuts', name: 'Signature Cut & Style', price: 95, duration: 60, description: 'A precision cut tailored to your face shape and lifestyle, finished with a luxury blowout.' },
  { id: 2, category: 'Color', name: 'Balayage & Gloss', price: 210, duration: 180, description: 'Hand-painted highlights for a natural, sun-kissed look, including a shine-enhancing gloss.' },
  { id: 3, category: 'Treatments', name: 'Keratin Smoothing', price: 250, duration: 150, description: 'Eliminate frizz and restore shine with our premium keratin infusion therapy.' },
  { id: 4, category: 'Styling', name: 'Luxury Blowout', price: 55, duration: 45, description: 'Wash, condition, and a long-lasting blowout style for any occasion.' },
  { id: 5, category: 'Color', name: 'Full Spectrum Color', price: 130, duration: 120, description: 'Rich, single-process color from roots to ends for vibrant, lasting results.' },
  { id: 6, category: 'Haircuts', name: 'Gentlemen’s Grooming', price: 65, duration: 45, description: 'Precision clipper or scissor cut, wash, and style.' }
];

const STYLISTS = [
  { id: 1, name: 'Zara Nkosi', role: 'Master Stylist', bio: 'With over 15 years in Sandton, Zara specializes in transformative cuts.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png' },
  { id: 2, name: 'Liam Chen', role: 'Color Director', bio: 'Liam is renowned for his "lived-in" color techniques.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596671/image_1_1765596191540_b2rh1t.png' },
  { id: 3, name: 'Amara Dube', role: 'Texture Specialist', bio: 'Amara helps clients embrace and enhance natural curl patterns.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596673/freepik__the-style-is-candid-image-photography-with-natural__8282_exxbxp.png' }
];

/* --- UI COMPONENTS --- */

const ImageWithSkeleton = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-zinc-200 ${className}`}>
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
    <button onClick={onClick} className={`px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 font-medium tracking-widest text-[10px] sm:text-xs uppercase relative overflow-hidden group ${variants[variant]} ${className}`}>
      <span className="relative z-10">{children}</span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shimmer-fast" />
    </button>
  );
};

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('next');
  const [bookingData, setBookingData] = useState({ service: null, stylist: null, date: null, time: null });

  if (!isOpen) return null;

  const handleStepChange = (nextStep) => {
    setDirection(nextStep > step ? 'next' : 'prev');
    setStep(nextStep);
  };

  const resetBooking = () => { setStep(1); setBookingData({ service: null, stylist: null, date: null, time: null }); onClose(); };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-3">
            <h4 className="text-lg font-serif mb-4">Select Service</h4>
            {SERVICES.map((s) => (
              <button key={s.id} onClick={() => { setBookingData({ ...bookingData, service: s }); handleStepChange(2); }} className="w-full flex justify-between items-center p-4 border border-zinc-100 hover:border-black hover:bg-zinc-50 transition-all text-left">
                <div><p className="font-medium text-sm">{s.name}</p><p className="text-xs text-zinc-400">R{s.price}</p></div>
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-serif mb-4">Select Stylist</h4>
            <div className="grid grid-cols-1 gap-3">
              {STYLISTS.map((s) => (
                <button key={s.id} onClick={() => { setBookingData({ ...bookingData, stylist: s }); handleStepChange(3); }} className="flex items-center gap-4 p-3 border border-zinc-100 hover:border-black transition-all">
                  <img src={s.image} className="w-12 h-12 rounded-full object-cover grayscale" alt="" />
                  <div className="text-left"><p className="text-sm font-medium">{s.name}</p><p className="text-[10px] uppercase text-zinc-400">{s.role}</p></div>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"><CheckCircle className="text-zinc-900" /></div>
            <h4 className="text-xl font-serif mb-2">Ready to Confirm?</h4>
            <p className="text-sm text-zinc-500 mb-6">{bookingData.service?.name} with {bookingData.stylist?.name}</p>
            <Button onClick={() => { alert("Confirmed!"); resetBooking(); }} className="w-full">Confirm Booking</Button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-lg overflow-hidden shadow-2xl rounded-sm">
        <div className="p-6 border-b flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest font-bold">Step {step} / 3</span>
          <button onClick={resetBooking} className="hover:rotate-90 transition-transform"><X size={20} /></button>
        </div>
        <div className={`p-8 min-h-[400px] transition-all duration-500 transform ${direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
          {renderStepContent()}
        </div>
        {step > 1 && step < 3 && (
          <button onClick={() => handleStepChange(step - 1)} className="p-6 text-[10px] uppercase tracking-widest font-bold border-t w-full text-left hover:bg-zinc-50">← Back</button>
        )}
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

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white py-3 shadow-md' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-xl sm:text-2xl font-serif tracking-[0.3em] font-bold transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>LUMIÈRE</a>
        
        <div className="hidden lg:flex items-center space-x-10">
          {['Services', 'Stylists', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`nav-link-grow text-[10px] uppercase tracking-widest font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>{item}</a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'outline'}>Book Now</Button>
        </div>

        <button className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-black' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[-1] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex flex-col items-center space-y-8">
          {['Home', 'Services', 'Stylists', 'Contact'].map((item, i) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-serif hover:italic transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item}
            </a>
          ))}
          <Button onClick={() => { setIsOpen(false); onBookClick(); }} className="mt-4">Book Now</Button>
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="antialiased bg-white text-zinc-900 overflow-x-hidden">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ImageWithSkeleton 
          src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" 
          className="absolute inset-0 w-full h-full" 
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-white/80 mb-6 animate-fade-in-up">Artisanal Hair Design</p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-tight mb-10 animate-fade-in-up delay-100">
            Define Your <br/> <span className="italic">Lumière</span>
          </h1>
          <Button onClick={() => setIsBookingOpen(true)} className="animate-fade-in-up delay-200">Reserve Session</Button>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 sm:py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 sm:mb-24 text-center">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Services</span>
            <h2 className="text-3xl sm:text-5xl font-serif mt-4">The Selection</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-100 border border-zinc-100">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white p-8 sm:p-12 hover:bg-zinc-50 transition-colors group cursor-pointer" onClick={() => setIsBookingOpen(true)}>
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-6">{s.category}</p>
                <h3 className="text-xl sm:text-2xl font-serif mb-4 group-hover:italic transition-all">{s.name}</h3>
                <p className="text-sm text-zinc-500 mb-8 leading-relaxed line-clamp-2">{s.description}</p>
                <div className="flex justify-between items-center pt-6 border-t border-zinc-50">
                  <span className="font-bold text-sm tracking-tighter">R{s.price}</span>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-[0.4em] font-bold">LUMIÈRE</h2>
            <div className="flex space-x-8">
              <Instagram size={20} className="hover:text-zinc-400 cursor-pointer transition-colors" />
              <Facebook size={20} className="hover:text-zinc-400 cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold border-t border-zinc-900 pt-12">
            <p>© 2024 Lumière Salon</p>
            <p className="sm:text-center">Cape Town, South Africa</p>
            <p className="md:text-right">Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
