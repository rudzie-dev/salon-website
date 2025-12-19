import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Calendar, Clock, Scissors, Star, 
  MapPin, Phone, Mail, Instagram, Facebook, 
  ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

/* --- DATA MODELS --- */
const SERVICES = [
  { id: 1, category: 'Haircuts', name: 'Signature Cut & Style', price: 650, duration: 60, description: 'A precision cut tailored to your face shape, including a Kerastase ritual wash and signature blowout.' },
  { id: 2, category: 'Color', name: 'Couture Balayage', price: 2450, duration: 180, description: 'Artisanal hand-painted highlights for a sun-kissed look. Includes glossing and metal-detox treatment.' },
  { id: 3, category: 'Treatments', name: 'Liquid Gold Keratin', price: 2800, duration: 150, description: 'Premium smoothing therapy to eliminate frizz for up to 4 months.' },
  { id: 4, category: 'Styling', name: 'The Red Carpet Blowout', price: 450, duration: 45, description: 'High-volume or sleek finish using premium Oribe styling products.' }
];

const STYLISTS = [
  { id: 1, name: 'Zara Nkosi', role: 'Master Stylist', bio: 'With over 15 years in Sandton, Zara specializes in transformative cuts.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png' },
  { id: 2, name: 'Liam Chen', role: 'Color Director', bio: 'Liam is renowned for his "lived-in" color techniques.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596671/image_1_1765596191540_b2rh1t.png' },
  { id: 3, name: 'Amara Dube', role: 'Texture Specialist', bio: 'Amara helps clients embrace and enhance natural curl patterns.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596673/freepik__the-style-is-candid-image-photography-with-natural__8282_exxbxp.png' }
];

const TESTIMONIALS = [
  { id: 1, name: "Sarah Jenkins", text: "The most transformative salon experience I've had in Cape Town. Zara's precision is unparalleled.", date: "2 weeks ago" },
  { id: 2, name: "Marcus Thorne", text: "Liam is a visionary with color. My balayage looks incredibly natural and the gloss is mirror-like.", date: "1 month ago" },
  { id: 3, name: "Amara Diop", text: "Finally, a salon that masters curly hair. Amara treated my curls with such care and expertise.", date: "3 weeks ago" }
];

/* --- UI COMPONENTS --- */

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-white text-black border border-black",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black"
  };
  return (
    <button onClick={onClick} className={`px-8 py-4 transition-all duration-500 font-medium tracking-widest text-[10px] uppercase ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <h3 className="text-zinc-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-4">{subtitle}</h3>
    <h2 className="text-4xl md:text-6xl font-serif text-zinc-900 tracking-tight">{title}</h2>
    <div className={`w-12 h-[1px] bg-zinc-300 mt-8 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

/* --- BOOKING MODAL --- */
const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({ service: null, stylist: null, date: null, time: null });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl h-full md:h-auto md:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden rounded-sm animate-in fade-in zoom-in-95 duration-500">
        <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
          <h3 className="font-serif text-2xl">Reservations</h3>
          <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform"><X size={20} /></button>
        </div>
        
        <div className="flex-1 p-8 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-6 font-bold">Step 01. Select Service</p>
              {SERVICES.map(s => (
                <button key={s.id} onClick={() => { setBookingData({...bookingData, service: s}); setStep(2); }} className="w-full flex justify-between items-center p-6 border border-zinc-100 hover:border-black transition-all text-left">
                  <div>
                    <p className="font-medium text-lg font-serif">{s.name}</p>
                    <p className="text-xs text-zinc-400 mt-1">R{s.price} • {s.duration} mins</p>
                  </div>
                  <ChevronRight size={16} className="text-zinc-300" />
                </button>
              ))}
            </div>
          )}
          {step === 2 && (
             <div className="text-center py-10">
                <CheckCircle size={48} className="mx-auto mb-6 text-zinc-900" strokeWidth={1} />
                <h4 className="text-2xl font-serif mb-4">Request Sent</h4>
                <p className="text-zinc-500 text-sm mb-8">This is a demonstration. In the full version, you would select your date and stylist here.</p>
                <Button onClick={onClose}>Return to Salon</Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* --- MAIN APP --- */
export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const scrollRef = useRef(null);

  // Carousel Logic: Update dots based on scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveReview(index);
    }
  };

  return (
    <div className="antialiased bg-white text-zinc-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 p-8 flex justify-between items-center mix-blend-difference text-white">
        <a href="#" className="text-2xl font-serif tracking-[0.3em] font-bold">LUMIÈRE</a>
        <div className="hidden md:flex items-center space-x-12 text-[10px] font-bold uppercase tracking-[0.3em]">
          <a href="#services" className="hover:opacity-50 transition-opacity">Services</a>
          <a href="#team" className="hover:opacity-50 transition-opacity">Artists</a>
          <Button onClick={() => setIsBookingOpen(true)} variant="outline" className="py-2 px-6">Book Now</Button>
        </div>
        <Menu className="md:hidden" size={24} />
      </nav>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" className="w-full h-full object-cover" alt="Hero" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-[10px] uppercase tracking-[0.6em] mb-8 font-bold text-zinc-400">Cape Town • Sandton</p>
          <h1 className="text-6xl md:text-9xl font-serif mb-12 tracking-tighter leading-none">The Art of <br/> Elevation</h1>
          <Button onClick={() => setIsBookingOpen(true)} variant="outline" className="min-w-[200px]">Reserve Appointment</Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 max-w-6xl mx-auto">
        <SectionHeader title="The Menu" subtitle="Bespoke Services" />
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
          {SERVICES.map(s => (
            <div key={s.id} className="group border-b border-zinc-100 pb-10 cursor-pointer" onClick={() => setIsBookingOpen(true)}>
              <div className="flex justify-between items-baseline mb-4">
                <h4 className="text-2xl font-serif group-hover:italic transition-all duration-500">{s.name}</h4>
                <span className="text-sm font-serif italic text-zinc-400">from R{s.price}</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-md">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS CAROUSEL WITH FUNCTIONAL DOTS */}
      <section className="py-32 bg-zinc-950 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Client Stories</h2>
          </div>

          <div className="relative">
            {/* Scrollable Container */}
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-10 cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TESTIMONIALS.map((review, idx) => (
                <div key={review.id} className="min-w-full md:min-w-[450px] snap-center flex flex-col py-10">
                  <div className="flex mb-8">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-white fill-current mr-1 opacity-30" />)}
                  </div>
                  <p className="text-2xl md:text-3xl font-serif italic mb-12 leading-relaxed opacity-80">
                    "{review.text}"
                  </p>
                  <div className="mt-auto pt-8 border-t border-white/5">
                    <p className="text-xs uppercase tracking-widest font-bold">{review.name}</p>
                    <p className="text-[10px] text-zinc-600 mt-2 uppercase font-bold">{review.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* PROGRESS DOTS - FUNCTIONAL */}
            <div className="flex justify-center gap-4 mt-12">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    scrollRef.current.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: 'smooth' });
                  }}
                  className={`h-1 transition-all duration-700 ${activeReview === i ? 'w-12 bg-white' : 'w-4 bg-zinc-800'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="The Collective" subtitle="Our Artists" />
          <div className="grid md:grid-cols-3 gap-12">
            {STYLISTS.map(s => (
              <div key={s.id} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-zinc-200 mb-8">
                  <img src={s.image} className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={s.name} />
                </div>
                <h4 className="text-2xl font-serif mb-1">{s.name}</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">{s.role}</p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">"{s.bio}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-100 py-32 px-6 text-center">
        <h2 className="text-4xl font-serif tracking-[0.5em] mb-12">LUMIÈRE</h2>
        <div className="flex justify-center space-x-12 mb-20 text-zinc-400">
          <Instagram size={20} className="hover:text-black cursor-pointer transition-colors" />
          <Facebook size={20} className="hover:text-black cursor-pointer transition-colors" />
        </div>
        <p className="text-zinc-400 text-[10px] uppercase tracking-[0.5em] font-bold">© 2025 Lumière Salon Cape Town</p>
      </footer>

      {/* Inline Styles for Smoothness */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
}
