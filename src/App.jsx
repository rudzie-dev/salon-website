import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Scissors, Star, MapPin, Phone, Mail, 
  Instagram, Facebook, ChevronRight, CheckCircle, ArrowRight, Clock
} from 'lucide-react';

/* --- DATA --- */
const SERVICES = [
  { id: 1, name: 'Signature Cut & Style', price: 95, duration: 60, description: 'A precision cut tailored to your face shape, finished with a luxury blowout.' },
  { id: 2, name: 'Balayage & Gloss', price: 210, duration: 180, description: 'Hand-painted highlights for a natural look, including a gloss treatment.' },
  { id: 3, name: 'Keratin Smoothing', price: 250, duration: 150, description: 'Eliminate frizz and restore shine with premium keratin infusion.' },
  { id: 4, name: 'Luxury Blowout', price: 55, duration: 45, description: 'Wash, condition, and a long-lasting blowout style.' },
  { id: 5, name: 'Full Spectrum Color', price: 130, duration: 120, description: 'Rich, single-process color for vibrant, lasting results.' },
  { id: 6, name: 'Gentlemen\'s Grooming', price: 65, duration: 45, description: 'Precision clipper or scissor cut, wash, and style.' }
];

const STYLISTS = [
  { id: 1, name: 'Zara Nkosi', role: 'Master Stylist', bio: 'Specializes in transformative cuts that frame the face perfectly.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png' },
  { id: 2, name: 'Liam Chen', role: 'Color Director', bio: 'Renowned for "lived-in" color techniques and the perfect blonde.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596671/image_1_1765596191540_b2rh1t.png' },
  { id: 3, name: 'Amara Dube', role: 'Texture Specialist', bio: 'Helping clients embrace and enhance their natural curl patterns.', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596673/freepik__the-style-is-candid-image-photography-with-natural__8282_exxbxp.png' }
];

const TESTIMONIALS = [
  { id: 1, name: "Sarah Jenkins", text: "The most transformative salon experience. Zara's precision is unparalleled.", rating: 5, date: "2 weeks ago" },
  { id: 2, name: "Marcus Thorne", text: "Liam is a visionary with color. My balayage looks incredibly natural.", rating: 5, date: "1 month ago" },
  { id: 3, name: "Amara Diop", text: "Finally, a salon that masters curly hair. Amara treated my curls with such care.", rating: 5, date: "3 weeks ago" }
];

/* --- LOADING SCREEN --- */
const LoadingScreen = () => {
  const [shouldRender, setShouldRender] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), 2500);
    const removeTimer = setTimeout(() => setShouldRender(false), 3800);
    return () => { clearTimeout(timer); clearTimeout(removeTimer); };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 flex overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 bg-gradient-to-b from-zinc-900 to-black h-full ${isExiting ? 'exit-strip' : ''}`}
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>

      {!isExiting && (
        <div className="relative z-10 flex flex-col items-center">
          <svg width="280" height="100" viewBox="0 0 280 100" className="overflow-visible">
            <text 
              x="50%" 
              y="50%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              className="font-serif text-5xl md:text-6xl fill-transparent stroke-white/30 stroke-[0.4px] animate-draw"
              style={{ letterSpacing: '0.25em' }}
            >
              LUMIÈRE
            </text>
          </svg>
        </div>
      )}
    </div>
  );
};

/* --- SHARED COMPONENTS --- */
const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 active:scale-[0.98]",
    secondary: "bg-white/10 text-white backdrop-blur-xl border border-white/20 hover:bg-white/20 active:scale-[0.98]",
    outline: "bg-transparent text-white border border-white/30 hover:bg-white hover:text-black active:scale-[0.98]"
  };

  return (
    <button 
      onClick={onClick} 
      className={`px-7 py-3.5 transition-all duration-400 font-medium tracking-wide text-sm uppercase rounded-full ${variants[variant]} ${className}`} 
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

const SectionHeader = ({ title, subtitle, centered = true, dark = false }) => (
  <div className={`mb-20 ${centered ? 'text-center' : 'text-left'}`}>
    <p className="uppercase tracking-[0.3em] text-[11px] font-semibold mb-4 text-zinc-400">{subtitle}</p>
    <h2 className={`text-4xl md:text-5xl font-serif font-light tracking-tight leading-[1.1] ${dark ? 'text-white' : 'text-zinc-900'}`}>{title}</h2>
    <div className={`w-12 h-[1px] mt-8 ${dark ? 'bg-white/30' : 'bg-zinc-300'} ${centered ? 'mx-auto' : ''}`} />
  </div>
);

/* --- NAVIGATION --- */
const Navbar = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const links = ['Home', 'Services', 'Stylists', 'Gallery', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-[200] transition-all duration-700 ${isScrolled || isOpen ? 'bg-white/90 backdrop-blur-2xl py-4 shadow-sm' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center relative z-[210]">
        <a 
          href="#home" 
          onClick={() => setIsOpen(false)} 
          className={`text-xl font-serif tracking-[0.3em] font-normal transition-all duration-500 ${(isScrolled || isOpen) ? 'text-black' : 'text-white'}`}
        >
          LUMIÈRE
        </a>
        
        <div className="hidden md:flex items-center space-x-10">
          {links.map((l) => (
            <a 
              key={l} 
              href={`#${l.toLowerCase()}`} 
              className={`text-[13px] uppercase tracking-wider font-medium transition-colors duration-300 ${isScrolled ? 'text-zinc-700 hover:text-black' : 'text-white/90 hover:text-white'}`}
            >
              {l}
            </a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'secondary'}>Book Now</Button>
        </div>

        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`block w-6 h-[1.5px] transition-all duration-400 ${(isScrolled || isOpen) ? 'bg-black' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] transition-all duration-400 ${(isScrolled || isOpen) ? 'bg-black' : 'bg-white'} ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-[1.5px] transition-all duration-400 ${(isScrolled || isOpen) ? 'bg-black' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/98 backdrop-blur-3xl z-[150] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex flex-col items-center space-y-8 pt-12">
          {links.map((l, i) => (
            <a 
              key={l} 
              href={`#${l.toLowerCase()}`} 
              onClick={() => setIsOpen(false)} 
              className={`text-3xl font-serif text-black hover:text-zinc-500 transition-all duration-300 ${isOpen ? 'animate-link' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {l}
            </a>
          ))}
          <Button onClick={() => { onBookClick(); setIsOpen(false); }} className="mt-8">Book Appointment</Button>
        </div>
      </div>
    </nav>
  );
};

/* --- BOOKING MODAL --- */
const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '', stylist: '', date: '', time: '', name: '', email: '', phone: ''
  });

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setStep(1), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Lumière Booking Request:\n\nService: ${formData.service}\nStylist: ${formData.stylist}\nDate: ${formData.date}\nTime: ${formData.time}\nClient: ${formData.name}\nPhone: ${formData.phone}`
    );
    window.open(`https://wa.me/27123456789?text=${message}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-scaleIn">
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-zinc-100 px-6 py-6 md:px-10 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-light">Book Appointment</h2>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">Step {step} of 3</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
          {step === 1 && (
            <div className="space-y-6 animate-slideUp">
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Select Service</label>
              <div className="grid gap-4">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, service: s.name })}
                    className={`text-left p-5 border rounded-2xl transition-all ${formData.service === s.name ? 'border-black bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-serif">{s.name}</h4>
                        <p className="text-xs text-zinc-400 mt-1">R{s.price} • {s.duration} min</p>
                      </div>
                      {formData.service === s.name && <CheckCircle size={20} className="text-black" />}
                    </div>
                  </button>
                ))}
              </div>
              <Button type="button" onClick={() => setStep(2)} disabled={!formData.service} className="w-full disabled:opacity-30">
                Next Step
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-slideUp">
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Select Stylist</label>
              <div className="grid gap-4">
                {STYLISTS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, stylist: s.name })}
                    className={`text-left p-4 border rounded-2xl flex items-center gap-4 transition-all ${formData.stylist === s.name ? 'border-black bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'}`}
                  >
                    <img src={s.image} className="w-14 h-14 object-cover rounded-full grayscale" alt={s.name} />
                    <div className="flex-1">
                      <h4 className="text-lg font-serif">{s.name}</h4>
                      <p className="text-xs text-zinc-400">{s.role}</p>
                    </div>
                    {formData.stylist === s.name && <CheckCircle size={20} className="text-black" />}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <Button type="button" onClick={() => setStep(1)} variant="secondary" className="flex-1">Back</Button>
                <Button type="button" onClick={() => setStep(3)} disabled={!formData.stylist} className="flex-1 disabled:opacity-30">Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-slideUp">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none"
                />
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none"
                >
                  <option value="">Time</option>
                  {['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <input
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none"
              />
              <input
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none"
              />
              <div className="flex gap-4 pt-4">
                <Button type="button" onClick={() => setStep(2)} variant="secondary" className="flex-1">Back</Button>
                <Button type="submit" className="flex-1">Confirm via WhatsApp</Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

/* --- TESTIMONIALS --- */
const Testimonials = () => (
  <section className="py-32 px-6 bg-zinc-900 text-white">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader title="Client Stories" subtitle="Testimonials" dark={true} />
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((r) => (
          <div key={r.id} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="flex mb-4 text-white/40">{[...Array(r.rating)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}</div>
            <p className="text-lg font-serif italic mb-6">"{r.text}"</p>
            <p className="text-[10px] uppercase tracking-widest font-bold">{r.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* --- MAIN APP --- */
export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="antialiased overflow-x-hidden">
      <LoadingScreen />
      
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <img 
            src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" 
            className="w-full h-full object-cover opacity-40 grayscale" 
            alt="Lumiere Hero" 
          />
        </div>
        
        <div className="relative z-0 text-center text-white px-6 animate-fadeInUp">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-8 text-white/60">Artisan Salon Experience</p>
          <h1 className="text-5xl md:text-8xl font-serif mb-12 font-light leading-tight">
            Experience the Art<br/>of Hair
          </h1>
          <Button variant="outline" onClick={() => setIsBookingOpen(true)}>
            Book Appointment
          </Button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="The Menu" subtitle="Services" />
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((s) => (
              <div 
                key={s.id} 
                className="p-8 border border-zinc-100 rounded-3xl hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => setIsBookingOpen(true)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-serif mb-2">{s.name}</h4>
                    <p className="text-zinc-500 text-sm">{s.description}</p>
                  </div>
                  <ArrowRight size={20} className="text-zinc-300 group-hover:text-black transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stylists */}
      <section id="stylists" className="py-32 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl text-center">
          <SectionHeader title="Meet The Experts" subtitle="The Team" />
          <div className="grid md:grid-cols-3 gap-12">
            {STYLISTS.map((s) => (
              <div key={s.id} className="group">
                <div className="aspect-[3/4] mb-6 overflow-hidden rounded-2xl">
                  <img src={s.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={s.name} />
                </div>
                <h4 className="text-2xl font-serif font-light">{s.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 mt-2">{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Gallery */}
      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4">
        {["v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png", "v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png", "v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png", "v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png"].map((img, i) => (
          <div key={i} className="h-64 md:h-[28rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img src={`https://res.cloudinary.com/dgstbaoic/image/upload/${img}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="Gallery" />
          </div>
        ))}
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-20">
          <div>
            <SectionHeader title="Visit Us" subtitle="Contact" centered={false} />
            <div className="space-y-6 text-zinc-500">
              <div className="flex gap-4 items-center"><MapPin size={20} className="text-black" /> Shop 10, Luxe Square, Cape Town</div>
              <div className="flex gap-4 items-center"><Phone size={20} className="text-black" /> (021) 555 0123</div>
              <div className="flex gap-4 items-center"><Clock size={20} className="text-black" /> Tue - Sat: 10am - 7pm</div>
            </div>
          </div>
          <form className="bg-zinc-50 p-10 rounded-3xl space-y-4" onSubmit={e => e.preventDefault()}>
            <input placeholder="Name" className="w-full p-4 bg-white rounded-xl outline-none border border-zinc-100" />
            <input placeholder="Email" className="w-full p-4 bg-white rounded-xl outline-none border border-zinc-100" />
            <textarea placeholder="How can we help?" rows="4" className="w-full p-4 bg-white rounded-xl outline-none border border-zinc-100" />
            <Button className="w-full">Submit</Button>
          </form>
        </div>
      </section>

      <footer className="bg-black text-white py-20 px-6 text-center">
        <h2 className="text-2xl font-serif tracking-widest mb-10">LUMIÈRE</h2>
        <div className="flex justify-center space-x-8 opacity-40 mb-10">
          <Instagram size={20} className="hover:opacity-100 cursor-pointer transition-opacity" />
          <Facebook size={20} className="hover:opacity-100 cursor-pointer transition-opacity" />
        </div>
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">© 2026 Lumière Salon. Cape Town.</p>
      </footer>
    </div>
  );
}
