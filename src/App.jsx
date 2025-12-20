import React, { useState, useEffect } from 'react';
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
  { id: 6, name: 'Gentlemen’s Grooming', price: 65, duration: 45, description: 'Precision clipper or scissor cut, wash, and style.' }
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

/* --- UI COMPONENTS --- */
const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-3 transition-all duration-300 font-medium tracking-wide text-sm uppercase relative overflow-hidden group";
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
    <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-semibold mb-3">{subtitle}</h3>
    <h2 className="text-3xl md:text-4xl font-serif text-zinc-900">{title}</h2>
    <div className={`w-16 h-0.5 bg-zinc-900 mt-6 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

/* --- MAIN COMPONENTS --- */
const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({ service: null, stylist: null, date: null, time: null });

  if (!isOpen) return null;

  const resetBooking = () => { setStep(1); setBookingData({ service: null, stylist: null, date: null, time: null }); onClose(); };
  const isSalonOpen = (dateObj) => dateObj.getDay() !== 0 && dateObj.getDay() !== 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
          <div><h3 className="font-serif text-2xl">Book Appointment</h3><p className="text-zinc-500 text-sm">Step {step} of 4</p></div>
          <button onClick={resetBooking} className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><X size={20} /></button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {step === 1 && (
            <div className="grid grid-cols-1 gap-3">
              {SERVICES.map((s) => (
                <button key={s.id} onClick={() => { setBookingData({ ...bookingData, service: s }); setStep(2); }} className="flex justify-between items-center p-4 border border-zinc-200 hover:border-black transition-all text-left">
                  <div><p className="font-medium">{s.name}</p><p className="text-sm text-zinc-500">{s.duration} mins • R{s.price}</p></div>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={() => { setBookingData({ ...bookingData, stylist: { name: 'First Available' } }); setStep(3); }} className="p-4 border border-zinc-200 hover:border-black flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center"><Scissors size={20} /></div>
                <div><p className="font-medium">Any Professional</p></div>
              </button>
              {STYLISTS.map((s) => (
                <button key={s.id} onClick={() => { setBookingData({ ...bookingData, stylist: s }); setStep(3); }} className="p-4 border border-zinc-200 hover:border-black flex items-center gap-4 text-left">
                  <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                  <div><p className="font-medium">{s.name}</p><p className="text-xs text-zinc-500">{s.role}</p></div>
                </button>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
                {[...Array(14)].map((_, i) => {
                  const d = new Date(); d.setDate(d.getDate() + i);
                  const open = isSalonOpen(d);
                  const fullDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                  return (
                    <button key={i} disabled={!open} onClick={() => setBookingData({ ...bookingData, date: fullDate })} className={`flex-shrink-0 w-20 py-4 border transition-all ${!open ? 'opacity-20' : bookingData.date === fullDate ? 'bg-black text-white' : 'hover:border-black'}`}>
                      <span className="text-[10px] uppercase block mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <span className="text-xl font-bold">{d.getDate()}</span>
                    </button>
                  );
                })}
              </div>
              {bookingData.date && (
                <div className="grid grid-cols-3 gap-2">
                  {['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'].map((t) => (
                    <button key={t} onClick={() => { setBookingData({ ...bookingData, time: t }); setStep(4); }} className="py-3 border border-zinc-200 hover:bg-black hover:text-white transition-colors">{t}</button>
                  ))}
                </div>
              )}
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} /></div>
              <div className="bg-zinc-50 p-6 space-y-2 text-left">
                <p><strong>Service:</strong> {bookingData.service?.name}</p>
                <p><strong>Stylist:</strong> {bookingData.stylist?.name}</p>
                <p><strong>When:</strong> {bookingData.date} at {bookingData.time}</p>
                <p className="text-xl font-bold pt-4 border-t">Total: R{bookingData.service?.price}</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t flex justify-between">
          {step > 1 && step < 4 && <button onClick={() => setStep(step - 1)} className="underline">Back</button>}
          {step === 4 ? <Button onClick={() => { alert("Confirmed!"); resetBooking(); }} className="w-full">Finalize Booking</Button> : <div />}
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const links = ['Home', 'Services', 'Stylists', 'Gallery', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-[80] transition-all duration-500 ${isScrolled || isOpen ? 'bg-white py-4 shadow-sm' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center relative z-[90]">
        <a href="#" className={`text-2xl font-serif tracking-widest font-bold transition-colors ${isScrolled || isOpen ? 'text-black' : 'text-white'}`}>L U M I È R E</a>
        
        <div className="hidden md:flex items-center space-x-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className={`text-sm uppercase tracking-wide font-medium nav-link-grow ${isScrolled ? 'text-zinc-800' : 'text-white'}`}>{l}</a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'secondary'}>Book Now</Button>
        </div>

        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      <div className={`fixed inset-0 bg-white z-[85] flex flex-col items-center justify-center transition-transform duration-700 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center space-y-8">
          {links.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setIsOpen(false)} className={`text-4xl font-serif text-black hover:text-zinc-500 ${isOpen ? `animate-link delay-${i+1}` : ''}`}>{l}</a>
          ))}
          <div className={`${isOpen ? 'animate-link delay-6' : ''} pt-6`}><Button onClick={() => { setIsOpen(false); onBookClick(); }} className="w-64">Book Now</Button></div>
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  return (
    <div className="antialiased">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center bg-zinc-900 overflow-hidden">
        <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Hero" />
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-xs uppercase tracking-[0.4em] mb-6">Beauty Redefined</p>
          <h1 className="text-5xl md:text-8xl font-serif mb-10 leading-tight">Experience the Art <br/> of Hair</h1>
          <Button onClick={() => setIsBookingOpen(true)}>Book Appointment</Button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Our Menu" subtitle="Curated Treatments" />
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white p-8 border hover:shadow-lg transition-all flex justify-between cursor-pointer group" onClick={() => setIsBookingOpen(true)}>
                <div>
                  <h4 className="text-xl font-serif mb-2">{s.name}</h4>
                  <p className="text-zinc-500 text-sm mb-4">{s.description}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">{s.duration} Mins • R{s.price}</p>
                </div>
                <ArrowRight className="self-center text-zinc-300 group-hover:text-black group-hover:translate-x-2 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stylists */}
      <section id="stylists" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Meet The Experts" subtitle="Our Team" />
          <div className="grid md:grid-cols-3 gap-12">
            {STYLISTS.map((s) => (
              <div key={s.id} className="group text-center">
                <div className="relative overflow-hidden mb-8 aspect-[3/4]">
                  <img src={s.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={s.name} />
                </div>
                <h4 className="text-2xl font-serif mb-1">{s.name}</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">{s.role}</p>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Client Experiences" subtitle="Kind Words" />
          <div className="flex overflow-x-auto pb-10 gap-6 hide-scrollbar md:grid md:grid-cols-3">
            {TESTIMONIALS.map((r) => (
              <div key={r.id} className="min-w-[85%] md:min-w-0 bg-zinc-800/40 p-10 border border-zinc-700/50 flex flex-col justify-between">
                <div>
                  <div className="flex mb-8">{[...Array(r.rating)].map((_, i) => <Star key={i} size={14} className="fill-current mr-1" />)}</div>
                  <p className="text-xl font-serif italic mb-10 leading-relaxed">"{r.text}"</p>
                </div>
                <div className="flex justify-between items-end border-t border-zinc-700 pt-8">
                  <div><p className="text-sm uppercase tracking-widest font-bold">{r.name}</p><p className="text-[10px] text-zinc-500 uppercase mt-1">Verified Client</p></div>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4">
        {["v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png", "v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png", "v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png", "v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png"].map((img, i) => (
          <div key={i} className="h-64 md:h-96 overflow-hidden">
            <img src={`https://res.cloudinary.com/dgstbaoic/image/upload/${img}`} loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Gallery" />
          </div>
        ))}
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-20">
          <div>
            <SectionHeader title="Visit Us" subtitle="Get In Touch" centered={false} />
            <div className="space-y-10 text-zinc-500">
              <div className="flex gap-6"><MapPin className="text-black" /><p>Shop 10, Luxe Square, Foreshore, Cape Town</p></div>
              <div className="flex gap-6"><Phone className="text-black" /><p>(021) 555 0123</p></div>
              <div className="flex gap-6"><Mail className="text-black" /><p>hello@lumieresalon.com</p></div>
              <div className="flex gap-6"><Clock className="text-black" /><p>Tue - Fri: 10am - 8pm | Sat: 9am - 6pm</p></div>
            </div>
          </div>
          <form className="bg-white p-10 border shadow-sm space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Sent!"); }}>
            <h3 className="text-3xl font-serif mb-8">Send a Message</h3>
            <input required placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full p-4 bg-zinc-50 outline-none focus:ring-1 focus:ring-black" />
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full p-4 bg-zinc-50 outline-none focus:ring-1 focus:ring-black" />
            <textarea required placeholder="Message" rows="4" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full p-4 bg-zinc-50 outline-none focus:ring-1 focus:ring-black" />
            <Button type="submit" className="w-full">Submit Inquiry</Button>
          </form>
        </div>
      </section>

      <footer className="bg-zinc-900 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-serif font-bold tracking-[0.3em] mb-10">L U M I È R E</h2>
        <div className="flex justify-center space-x-10 mb-16 opacity-60">
          <Instagram size={24} className="hover:opacity-100 cursor-pointer" />
          <Facebook size={24} className="hover:opacity-100 cursor-pointer" />
        </div>
        <p className="text-zinc-600 text-xs uppercase tracking-widest font-medium">© 2024 Lumière Salon Cape Town. All rights reserved.</p>
      </footer>
    </div>
  );
}
