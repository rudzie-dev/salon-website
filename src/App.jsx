import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, Clock, Scissors, Star, 
  MapPin, Phone, Mail, Instagram, Facebook, 
  ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

/* --- DATA MODELS --- */
const SERVICES = [
  { 
    id: 1, 
    category: 'Haircuts', 
    name: 'Signature Cut & Style', 
    price: 650, 
    duration: 60, 
    description: 'A precision cut tailored to your face shape, including a Kerastase ritual wash and signature blowout.' 
  },
  { 
    id: 2, 
    category: 'Color', 
    name: 'Couture Balayage', 
    price: 2450, 
    duration: 180, 
    description: 'Artisanal hand-painted highlights for a sun-kissed look. Includes glossing and metal-detox treatment.' 
  },
  { 
    id: 3, 
    category: 'Treatments', 
    name: 'Liquid Gold Keratin', 
    price: 2800, 
    duration: 150, 
    description: 'Premium smoothing therapy to eliminate frizz for up to 4 months. Price may vary by hair density.' 
  },
  { 
    id: 4, 
    category: 'Styling', 
    name: 'The Red Carpet Blowout', 
    price: 450, 
    duration: 45, 
    description: 'High-volume or sleek finish using premium Oribe styling products for lasting hold.' 
  },
  { 
    id: 5, 
    category: 'Color', 
    name: 'Full Spectrum Tint', 
    price: 1350, 
    duration: 120, 
    description: 'Rich, multi-dimensional permanent color from roots to ends with a high-shine finish.' 
  },
  { 
    id: 6, 
    category: 'Haircuts', 
    name: 'Gents Bespoke Grooming', 
    price: 450, 
    duration: 45, 
    description: 'Precision scissor/clipper work, scalp massage, and hot towel finish.' 
  }
];

const STYLISTS = [
  { id: 1, name: 'Zara Nkosi', role: 'Master Stylist', bio: 'With over 15 years in Sandton, Zara specializes in transformative cuts that frame the face perfectly.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png' },
  { id: 2, name: 'Liam Chen', role: 'Color Director', bio: 'Liam is renowned for his "lived-in" color techniques and ability to create the perfect blonde.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596671/image_1_1765596191540_b2rh1t.png' },
  { id: 3, name: 'Amara Dube', role: 'Texture Specialist', bio: 'Certified in multiple texture systems, Amara helps clients embrace and enhance their natural curl patterns.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596673/freepik__the-style-is-candid-image-photography-with-natural__8282_exxbxp.png' }
];

const TESTIMONIALS = [
  { id: 1, name: "Sarah Jenkins", text: "The most transformative salon experience I've had in Cape Town. Zara's precision with the signature cut is unparalleled.", rating: 5, date: "2 weeks ago" },
  { id: 2, name: "Marcus Thorne", text: "Liam is a visionary with color. My balayage looks incredibly natural and the gloss treatment left my hair with a mirror-like shine.", rating: 5, date: "1 month ago" },
  { id: 3, name: "Amara Diop", text: "Finally, a salon that masters curly hair. Amara treated my curls with such care and expertise.", rating: 5, date: "3 weeks ago" }
];

/* --- COMPONENTS --- */

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-3 transition-all duration-500 font-medium tracking-wide text-sm uppercase relative overflow-hidden group";
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-white text-black border border-black hover:bg-zinc-50",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shimmer" />
    </button>
  );
};

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <h3 className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-3">{subtitle}</h3>
    <h2 className="text-3xl md:text-5xl font-serif text-zinc-900">{title}</h2>
    <div className={`w-12 h-[1px] bg-zinc-300 mt-6 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('next'); // For animation tracking
  const [bookingData, setBookingData] = useState({ service: null, stylist: null, date: null, time: null });

  if (!isOpen) return null;

  const handleNext = () => { setDirection('next'); setStep(step + 1); };
  const handleBack = () => { setDirection('prev'); setStep(step - 1); };
  const resetBooking = () => { 
    setStep(1); 
    setBookingData({ service: null, stylist: null, date: null, time: null }); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all duration-500">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-500 overflow-hidden rounded-sm">
        
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-zinc-100 flex-shrink-0">
          <div>
            <h3 className="font-serif text-2xl tracking-tight">Reserve Service</h3>
            <div className="flex items-center gap-2 mt-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={`h-1 w-8 transition-all duration-500 ${step >= s ? 'bg-black' : 'bg-zinc-100'}`} />
              ))}
            </div>
          </div>
          <button onClick={resetBooking} className="p-2 hover:rotate-90 transition-transform duration-300"><X size={20} /></button>
        </div>

        {/* Content with Animation Container */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative">
          <div key={step} className={`animate-in fade-in slide-in-from-${direction === 'next' ? 'right-4' : 'left-4'} duration-500`}>
            
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 mb-6">Step 01. Select Treatment</h4>
                <div className="grid grid-cols-1 gap-3">
                  {SERVICES.map((s, idx) => (
                    <button 
                      key={s.id} 
                      style={{ animationDelay: `${idx * 50}ms` }}
                      onClick={() => { setBookingData({ ...bookingData, service: s }); handleNext(); }} 
                      className="flex justify-between items-center p-5 border border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 transition-all text-left group animate-in fade-in slide-in-from-bottom-2"
                    >
                      <div>
                        <p className="font-medium text-zinc-900">{s.name}</p>
                        <p className="text-xs text-zinc-500 mt-1">{s.duration} mins • R{s.price}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <ChevronRight size={14} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 mb-6">Step 02. Select Artist</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={() => { setBookingData({ ...bookingData, stylist: { name: 'First Available', role: 'Professional' } }); handleNext(); }} className="p-6 border border-zinc-100 hover:bg-zinc-50 transition-all text-center flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center"><Scissors size={24} className="text-zinc-400" /></div>
                    <p className="font-medium">Any Professional</p>
                  </button>
                  {STYLISTS.map((s) => (
                    <button key={s.id} onClick={() => { setBookingData({ ...bookingData, stylist: s }); handleNext(); }} className="p-6 border border-zinc-100 hover:bg-zinc-50 transition-all text-center flex flex-col items-center gap-3 group">
                      <div className="relative">
                        <img src={s.image} alt={s.name} className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 rounded-full border border-black/0 group-hover:border-black/10 transition-all scale-110" />
                      </div>
                      <p className="font-medium">{s.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400">Step 03. Select Schedule</h4>
                <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                    const d = new Date(); d.setDate(d.getDate() + i);
                    const fullDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                    const isSelected = bookingData.date === fullDate;
                    return (
                      <button 
                        key={i} 
                        onClick={() => setBookingData({ ...bookingData, date: fullDate })}
                        className={`flex-shrink-0 w-20 py-5 border rounded-sm transition-all flex flex-col items-center ${
                          isSelected ? 'border-black bg-black text-white shadow-lg' : 'border-zinc-100 hover:border-zinc-300'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold mb-1 opacity-60">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xl font-serif">{d.getDate()}</span>
                      </button>
                    );
                  })}
                </div>
                {bookingData.date && (
                  <div className="grid grid-cols-3 gap-2 animate-in fade-in duration-700">
                    {['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'].map((t) => (
                      <button key={t} onClick={() => { setBookingData({ ...bookingData, time: t }); handleNext(); }} className="py-4 text-xs tracking-widest border border-zinc-100 hover:bg-black hover:text-white transition-all uppercase">{t}</button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 py-4">
                <div className="text-center animate-in zoom-in-95 duration-1000">
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} strokeWidth={1} className="text-zinc-900" /></div>
                  <h4 className="text-3xl font-serif mb-2">Final Review</h4>
                </div>
                <div className="bg-zinc-50 p-8 space-y-5 rounded-sm border border-zinc-100">
                  <div className="flex justify-between items-center"><span className="text-xs uppercase tracking-widest text-zinc-400">Service</span><span className="font-serif text-lg">{bookingData.service?.name}</span></div>
                  <div className="flex justify-between items-center"><span className="text-xs uppercase tracking-widest text-zinc-400">Expert</span><span className="font-serif text-lg">{bookingData.stylist?.name}</span></div>
                  <div className="flex justify-between items-center"><span className="text-xs uppercase tracking-widest text-zinc-400">Time</span><span className="font-serif text-lg">{bookingData.date} @ {bookingData.time}</span></div>
                  <div className="h-[1px] bg-zinc-200 w-full my-2"></div>
                  <div className="flex justify-between items-center"><span className="text-xs uppercase tracking-widest text-zinc-400">Total Investment</span><span className="font-serif text-2xl font-bold">R{bookingData.service?.price}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-zinc-100 bg-white flex justify-between items-center flex-shrink-0">
          {step > 1 && step < 4 ? <button onClick={handleBack} className="text-xs uppercase tracking-widest font-bold text-zinc-400 hover:text-black transition-colors">Go Back</button> : <div />}
          {step === 4 ? (
            <Button onClick={() => { alert("Booking Confirmed!"); resetBooking(); }} className="w-full">Secure Appointment</Button>
          ) : (
            <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-300 font-bold">Progress {step}/4</div>
          )}
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-700 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-4 border-b border-zinc-100' : 'bg-transparent py-8 text-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className={`text-2xl font-serif tracking-[0.2em] font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>LUMIÈRE</a>
        <div className="hidden md:flex items-center space-x-12">
          {['Home', 'Services', 'Team', 'Gallery', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className={`nav-link-grow text-[10px] uppercase tracking-[0.3em] font-bold transition-opacity ${isScrolled ? 'text-zinc-800' : 'text-white/80 hover:text-white'}`}>{l}</a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'outline'} className="text-[10px] py-2 px-6">Book</Button>
        </div>
        <button className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white z-50 p-12 flex flex-col justify-center space-y-12 animate-in slide-in-from-top duration-500">
           <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8"><X size={32} /></button>
           {['Home', 'Services', 'Team', 'Gallery', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-black text-4xl font-serif tracking-tight">{l}</a>
          ))}
          <Button onClick={() => { setMobileMenuOpen(false); onBookClick(); }} className="w-full py-5">Book Now</Button>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="antialiased text-zinc-900 selection:bg-zinc-200 bg-white">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 scale-105 animate-slow-zoom">
          <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" className="w-full h-full object-cover opacity-40" alt="Salon" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
          <p className="text-[10px] uppercase tracking-[0.6em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">The Sanctuary of Style</p>
          <h1 className="text-6xl md:text-9xl font-serif mb-12 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">L'essence de <br/> la Beauté</h1>
          <Button onClick={() => setIsBookingOpen(true)} variant="outline" className="min-w-[220px] py-4 animate-in fade-in zoom-in duration-1000 delay-300">Reserve Appointment</Button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="The Menu" subtitle="Services" />
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {SERVICES.map((s) => (
              <div key={s.id} className="group cursor-pointer pb-8 border-b border-zinc-100 transition-all duration-700 hover:border-zinc-900" onClick={() => setIsBookingOpen(true)}>
                <div className="flex justify-between items-baseline mb-4">
                  <h4 className="text-2xl font-serif tracking-tight group-hover:italic transition-all duration-500">{s.name}</h4>
                  <span className="text-sm font-serif italic text-zinc-400">from R{s.price}</span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-md">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-32 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="The Collective" subtitle="Our Artists" />
          <div className="grid md:grid-cols-3 gap-16">
            {STYLISTS.map((s) => (
              <div key={s.id} className="group">
                <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-zinc-200">
                  <img src={s.image} className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000" alt={s.name} />
                </div>
                <h4 className="text-2xl font-serif mb-1">{s.name}</h4>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">{s.role}</p>
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-700">{s.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-32 px-6 bg-zinc-900 text-white overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-4">Journal</p>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">Client Stories</h2>
          </div>
          <div className="flex overflow-x-auto pb-10 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:gap-12">
            {TESTIMONIALS.map((r) => (
              <div key={r.id} className="min-w-[90%] md:min-w-0 mr-8 md:mr-0 snap-center flex flex-col">
                <div className="flex mb-8">{[...Array(r.rating)].map((_, i) => <Star key={i} size={12} className="text-white fill-current mr-1 opacity-40" />)}</div>
                <p className="text-2xl font-serif italic mb-12 leading-relaxed opacity-80">"{r.text}"</p>
                <div className="mt-auto pt-8 border-t border-white/10">
                  <p className="text-xs uppercase tracking-widest font-bold">{r.name}</p>
                  <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-tighter font-bold">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4 bg-black">
        {["v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png", "v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png", "v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png", "v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png"].map((img, i) => (
          <div key={i} className="aspect-[4/5] overflow-hidden">
            <img src={`https://res.cloudinary.com/dgstbaoic/image/upload/${img}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-1000 grayscale hover:grayscale-0" alt="Gallery" />
          </div>
        ))}
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-32">
          <div>
            <SectionHeader title="The Studio" subtitle="Connect" centered={false} />
            <div className="space-y-12 text-zinc-500 mt-16">
              <div className="flex gap-8 group">
                <MapPin size={20} className="text-zinc-300 group-hover:text-black transition-colors" />
                <p className="text-sm tracking-wide">Shop 10, Luxe Square, Foreshore, <br/> Cape Town, 8001</p>
              </div>
              <div className="flex gap-8 group">
                <Phone size={20} className="text-zinc-300 group-hover:text-black transition-colors" />
                <p className="text-sm tracking-wide">(021) 555 0123</p>
              </div>
              <div className="flex gap-8 group">
                <Mail size={20} className="text-zinc-300 group-hover:text-black transition-colors" />
                <p className="text-sm tracking-wide">hello@lumieresalon.com</p>
              </div>
              <div className="flex gap-8">
                <Clock size={20} className="text-zinc-300" />
                <div className="text-sm tracking-wide space-y-2">
                  <p>Tue - Fri: 10:00 — 20:00</p>
                  <p>Sat: 09:00 — 18:00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-50 p-12 rounded-sm border border-zinc-100 shadow-sm self-start">
            <h3 className="text-2xl font-serif mb-12 tracking-tight">Digital Inquiry</h3>
            <form className="space-y-10">
              <div className="relative">
                <input placeholder="Name" className="w-full pb-3 bg-transparent border-b border-zinc-200 focus:border-black transition-all outline-none text-sm" />
              </div>
              <div className="relative">
                <input placeholder="Email" className="w-full pb-3 bg-transparent border-b border-zinc-200 focus:border-black transition-all outline-none text-sm" />
              </div>
              <div className="relative">
                <textarea placeholder="Tell us about your hair journey" rows="3" className="w-full pb-3 bg-transparent border-b border-zinc-200 focus:border-black transition-all outline-none text-sm resize-none" />
              </div>
              <Button className="w-full py-5 text-[10px] tracking-[0.4em]">Send Message</Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-zinc-100 py-32 px-6 text-center">
        <h2 className="text-5xl font-serif tracking-[0.4em] mb-12">LUMIÈRE</h2>
        <div className="flex justify-center space-x-12 mb-20">
          <Instagram size={20} className="text-zinc-400 hover:text-black transition-all cursor-pointer" />
          <Facebook size={20} className="text-zinc-400 hover:text-black transition-all cursor-pointer" />
        </div>
        <p className="text-zinc-300 text-[10px] uppercase tracking-[0.5em] font-bold">© 2025 Lumière Salon Cape Town</p>
      </footer>
    </div>
  );
}
