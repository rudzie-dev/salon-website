import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, Clock, Scissors, Star, 
  MapPin, Phone, Mail, Instagram, Facebook, 
  ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

/* --- DATA MODELS (Kept outside to prevent re-renders) --- */
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

const TESTIMONIALS = [
  { id: 1, name: "Sarah Jenkins", text: "The most transformative salon experience I've had in Cape Town.", rating: 5, date: "2 weeks ago" },
  { id: 2, name: "Marcus Thorne", text: "Liam is a visionary with color. My balayage looks incredibly natural.", rating: 5, date: "1 month ago" },
  { id: 3, name: "Amara Diop", text: "Finally, a salon that masters curly hair.", rating: 5, date: "3 weeks ago" }
];

/* --- UI COMPONENTS --- */

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-white text-black border border-black hover:bg-zinc-50",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black"
  };

  return (
    <button 
      onClick={onClick} 
      className={`px-8 py-3 transition-all duration-300 font-medium tracking-wide text-sm uppercase relative overflow-hidden group ${variants[variant]} ${className}`} 
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shimmer" />
    </button>
  );
};

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-semibold mb-3">{subtitle}</h3>
    <h2 className="text-3xl md:text-4xl font-serif text-zinc-900">{title}</h2>
    <div className={`w-16 h-0.5 bg-zinc-900 mt-6 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({ service: null, stylist: null, date: null, time: null });

  if (!isOpen) return null;

  const resetBooking = () => { setStep(1); setBookingData({ service: null, stylist: null, date: null, time: null }); onClose(); };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h4 className="text-lg font-medium mb-4">Select a Service</h4>
            {SERVICES.map((s) => (
              <button key={s.id} onClick={() => { setBookingData({ ...bookingData, service: s }); setStep(2); }} className="w-full flex justify-between items-center p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left group">
                <div>
                  <p className="font-medium group-hover:text-black">{s.name}</p>
                  <p className="text-sm text-zinc-500">{s.duration} mins • R{s.price}</p>
                </div>
                <ChevronRight size={16} className="text-zinc-300 group-hover:text-black" />
              </button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h4 className="text-lg font-medium mb-4">Select a Stylist</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={() => { setBookingData({ ...bookingData, stylist: { name: 'Any Stylist' } }); setStep(3); }} className="p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center"><Scissors size={20} /></div>
                <p className="font-medium">Any Professional</p>
              </button>
              {STYLISTS.map((s) => (
                <button key={s.id} onClick={() => { setBookingData({ ...bookingData, stylist: s }); setStep(3); }} className="p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left flex items-center gap-4">
                  <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                  <div><p className="font-medium">{s.name}</p><p className="text-xs text-zinc-500">{s.role}</p></div>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h4 className="text-lg font-medium">Select Date & Time</h4>
            <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
              {[...Array(7)].map((_, i) => {
                const d = new Date(); d.setDate(d.getDate() + i);
                const fullDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                return (
                  <button key={i} onClick={() => setBookingData({ ...bookingData, date: fullDate })} className={`flex-shrink-0 w-20 py-4 border transition-all flex flex-col items-center ${bookingData.date === fullDate ? 'border-black bg-black text-white' : 'border-zinc-200 hover:border-zinc-400'}`}>
                    <span className="text-[10px] uppercase opacity-60 mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="text-xl font-bold">{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
            {bookingData.date && (
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-100">
                {['10:00 AM', '1:00 PM', '4:00 PM'].map((t) => (
                  <button key={t} onClick={() => { setBookingData({ ...bookingData, time: t }); setStep(4); }} className="py-3 px-2 text-sm border border-zinc-200 hover:bg-black hover:text-white transition-colors">{t}</button>
                ))}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in zoom-in duration-300">
             <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} /></div>
                <h4 className="text-2xl font-serif mb-2">Confirm Details</h4>
              </div>
              <div className="bg-zinc-50 p-6 space-y-4 border border-zinc-100">
                <div className="flex justify-between border-b pb-2"><span className="text-zinc-500">Service</span><span className="font-medium">{bookingData.service?.name}</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-zinc-500">Stylist</span><span className="font-medium">{bookingData.stylist?.name}</span></div>
                <div className="flex justify-between pt-2"><span className="text-zinc-500 text-lg">Total</span><span className="font-bold text-xl">R{bookingData.service?.price}</span></div>
              </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
          <h3 className="font-serif text-2xl">Book Appointment</h3>
          <button onClick={resetBooking} className="p-2 hover:bg-zinc-100 rounded-full"><X size={20} /></button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">{renderStep()}</div>
        <div className="p-6 border-t bg-zinc-50 flex justify-between items-center">
          {step > 1 && step < 4 && <button onClick={() => setStep(step - 1)} className="text-sm underline font-medium">Back</button>}
          {step === 4 ? <Button onClick={() => { alert("Booking Confirmed!"); resetBooking(); }} className="w-full">Confirm Appointment</Button> : <div className="text-xs text-zinc-400">Step {step} of 4</div>}
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-sm py-4' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-serif tracking-widest font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>L U M I È R E</a>
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Services', 'Stylists', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className={`nav-link-grow text-sm uppercase font-medium ${isScrolled ? 'text-zinc-800' : 'text-white'}`}>{l}</a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'secondary'}>Book Now</Button>
        </div>
        <button className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b py-10 px-6 flex flex-col space-y-6">
           {['Home', 'Services', 'Stylists', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-black text-xl font-serif">{l}</a>
          ))}
          <Button onClick={() => { setMobileMenuOpen(false); onBookClick(); }} className="w-full">Book Now</Button>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="antialiased text-zinc-900 selection:bg-zinc-200">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" className="w-full h-full object-cover opacity-50" alt="Salon" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 text-white">
          <p className="text-xs uppercase tracking-[0.4em] mb-6 opacity-80">Beauty Redefined</p>
          <h1 className="text-5xl md:text-8xl font-serif mb-10 leading-[1.1]">Experience the Art <br/> of Hair</h1>
          <Button onClick={() => setIsBookingOpen(true)}>Book Appointment</Button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Our Menu" subtitle="Curated Treatments" />
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white p-8 hover:shadow-xl transition-all border border-zinc-100 flex justify-between cursor-pointer group" onClick={() => setIsBookingOpen(true)}>
                <div>
                  <h4 className="text-xl font-serif mb-2 group-hover:text-zinc-600">{s.name}</h4>
                  <p className="text-zinc-500 text-sm mb-4">{s.description}</p>
                  <p className="text-xs text-zinc-400 font-bold uppercase">{s.duration} Mins • R{s.price}</p>
                </div>
                <ArrowRight size={18} className="self-center text-zinc-300 group-hover:text-black transition-transform group-hover:translate-x-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-serif font-bold tracking-[0.3em] mb-10">L U M I È R E</h2>
        <div className="flex justify-center space-x-10 mb-16 opacity-60"><Instagram size={24} /><Facebook size={24} /></div>
        <p className="text-zinc-600 text-xs uppercase tracking-widest font-medium">© 2024 Lumière Salon Cape Town.</p>
      </footer>
    </div>
  );
}
