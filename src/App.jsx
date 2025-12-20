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

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({ service: null, stylist: null, date: null, time: null });

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const resetBooking = () => { setStep(1); setBookingData({ service: null, stylist: null, date: null, time: null }); onClose(); };

  const isSalonOpen = (dateObj) => {
    const day = dateObj.getDay();
    return day !== 0 && day !== 1; // Closed Sun (0) and Mon (1)
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
        
        <div className="flex justify-between items-center p-6 border-b border-zinc-100 flex-shrink-0">
          <div>
            <h3 className="font-serif text-2xl">Book Appointment</h3>
            <p className="text-zinc-500 text-sm mt-1">Step {step} of 4</p>
          </div>
          <button onClick={resetBooking} className="p-2 hover:bg-zinc-100 rounded-full transition-colors" aria-label="Close booking">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium mb-4">Select a Service</h4>
              <div className="grid grid-cols-1 gap-3">
                {SERVICES.map((s) => (
                  <button key={s.id} onClick={() => { setBookingData({ ...bookingData, service: s }); handleNext(); }} className="flex justify-between items-center p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left group">
                    <div>
                      <p className="font-medium group-hover:text-black">{s.name}</p>
                      <p className="text-sm text-zinc-500">{s.duration} mins • R{s.price}</p>
                    </div>
                    <ChevronRight size={16} className="text-zinc-300 group-hover:text-black" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium mb-4">Select a Stylist</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => { setBookingData({ ...bookingData, stylist: { name: 'Any Stylist', role: 'First Available' } }); handleNext(); }} className="p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center"><Scissors size={20} /></div>
                  <div><p className="font-medium">Any Professional</p><p className="text-xs text-zinc-500">Earliest availability</p></div>
                </button>
                {STYLISTS.map((s) => (
                  <button key={s.id} onClick={() => { setBookingData({ ...bookingData, stylist: s }); handleNext(); }} className="p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left flex items-center gap-4">
                    <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                    <div><p className="font-medium">{s.name}</p><p className="text-xs text-zinc-500">{s.role}</p></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Select Date & Time</h4>
              <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
                {[...Array(14)].map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() + i);
                  const open = isSalonOpen(d);
                  const fullDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                  const isSelected = bookingData.date === fullDate;

                  return (
                    <button 
                      key={i} 
                      disabled={!open}
                      onClick={() => setBookingData({ ...bookingData, date: fullDate })}
                      className={`flex-shrink-0 w-20 py-4 border transition-all flex flex-col items-center ${
                        !open ? 'opacity-20 cursor-not-allowed bg-zinc-50' : 
                        isSelected ? 'border-black bg-black text-white' : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-tighter opacity-60 mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <span className="text-xl font-bold">{d.getDate()}</span>
                    </button>
                  );
                })}
              </div>

              {bookingData.date && (
                <div className="grid grid-cols-3 gap-2 animate-in fade-in duration-500 pt-4 border-t border-zinc-100">
                  {['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'].map((t) => (
                    <button 
                      key={t} 
                      onClick={() => { setBookingData({ ...bookingData, time: t }); handleNext(); }} 
                      className="py-3 px-2 text-sm border border-zinc-200 hover:bg-black hover:text-white transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} /></div>
                <h4 className="text-2xl font-serif mb-2">Confirm Details</h4>
              </div>
              <div className="bg-zinc-50 p-6 space-y-4 border border-zinc-100">
                <div className="flex justify-between border-b pb-2"><span className="text-zinc-500">Service</span><span className="font-medium">{bookingData.service?.name}</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-zinc-500">Stylist</span><span className="font-medium">{bookingData.stylist?.name}</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-zinc-500">Date & Time</span><span className="font-medium">{bookingData.date} at {bookingData.time}</span></div>
                <div className="flex justify-between pt-2"><span className="text-zinc-500 text-lg">Total</span><span className="font-bold text-xl">R{bookingData.service?.price}</span></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-zinc-50 flex justify-between items-center flex-shrink-0">
          {step > 1 && step < 4 ? (
            <button onClick={handleBack} className="text-sm underline font-medium">Back</button>
          ) : (
            <div />
          )}
          {step === 4 ? (
            <Button onClick={() => { alert("Booking Confirmed!"); resetBooking(); }} className="w-full sm:w-auto">Confirm Appointment</Button>
          ) : (
            <div className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Step {step} of 4</div>
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const navLinks = ['Home', 'Services', 'Stylists', 'Gallery', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isOpen ? 'bg-white/95 backdrop-blur-md py-4' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className={`text-2xl font-serif tracking-widest font-bold z-50 transition-colors duration-300 ${isScrolled || isOpen ? 'text-black' : 'text-white'}`}>
          L U M I È R E
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className={`nav-link-grow text-sm uppercase tracking-wide font-medium transition-opacity ${isScrolled ? 'text-zinc-800' : 'text-white'}`}>{l}</a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'secondary'}>Book Now</Button>
        </div>

        {/* Animated Burger Button */}
        <button 
          className="md:hidden z-50 relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 my-1 transition-all duration-300 ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>
      
      {/* Full Screen Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link, index) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className={`text-4xl font-serif text-black hover:text-zinc-500 transition-colors ${isOpen ? `animate-link delay-${index + 1}` : ''}`}
            >
              {link}
            </a>
          ))}
          <div className={`${isOpen ? 'animate-link delay-5' : ''} pt-4`}>
             <Button onClick={() => { setIsOpen(false); onBookClick(); }} className="w-64 py-5">
               Request Appointment
             </Button>
          </div>
        </div>

        {/* Social Links in Mobile Menu Footer */}
        <div className={`absolute bottom-12 flex space-x-8 transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <Instagram size={20} className="text-zinc-400 hover:text-black transition-colors" />
          <Facebook size={20} className="text-zinc-400 hover:text-black transition-colors" />
          <Mail size={20} className="text-zinc-400 hover:text-black transition-colors" />
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Message received from ${formData.name}!`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="antialiased text-zinc-900 selection:bg-zinc-200">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" className="w-full h-full object-cover opacity-50" alt="Salon Interior" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
          <p className="text-xs uppercase tracking-[0.4em] mb-6 opacity-80">Beauty Redefined</p>
          <h1 className="text-5xl md:text-8xl font-serif mb-10 leading-[1.1] animate-in fade-in slide-in-from-bottom-10 duration-1000">Experience the Art <br/> of Hair</h1>
          <Button onClick={() => setIsBookingOpen(true)} className="min-w-[200px]">Book Appointment</Button>
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Our Menu" subtitle="Curated Treatments" />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white p-8 hover:shadow-xl transition-all border border-zinc-100 flex justify-between cursor-pointer group" onClick={() => setIsBookingOpen(true)}>
                <div>
                  <h4 className="text-xl font-serif mb-2 group-hover:text-zinc-600">{s.name}</h4>
                  <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{s.description}</p>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">{s.duration} Mins • R{s.price}</p>
                </div>
                <ArrowRight size={18} className="self-center text-zinc-300 group-hover:text-black transition-transform group-hover:translate-x-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stylists" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Meet The Experts" subtitle="Our Team" />
          <div className="grid md:grid-cols-3 gap-12">
            {STYLISTS.map((s) => (
              <div key={s.id} className="group text-center">
                <div className="relative overflow-hidden mb-8 aspect-[3/4]">
                  <img src={s.image} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={s.name} />
                </div>
                <h4 className="text-2xl font-serif mb-1">{s.name}</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">{s.role}</p>
                <p className="text-zinc-500 text-sm leading-relaxed px-4">{s.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Client Experiences" subtitle="Kind Words" />
          <div className="flex overflow-x-auto pb-10 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:gap-8">
            {TESTIMONIALS.map((r) => (
              <div key={r.id} className="min-w-[85%] sm:min-w-[60%] md:min-w-0 mr-6 md:mr-0 snap-center bg-zinc-800/40 p-10 border border-zinc-700/50 flex flex-col justify-between transition-all hover:bg-zinc-800/60">
                <div>
                  <div className="flex mb-8">{[...Array(r.rating)].map((_, i) => <Star key={i} size={14} className="text-white fill-current mr-1" />)}</div>
                  <p className="text-xl font-serif italic mb-10 leading-relaxed">"{r.text}"</p>
                </div>
                <div className="flex justify-between items-end border-t border-zinc-700 pt-8">
                  <div><p className="text-sm uppercase tracking-widest font-bold">{r.name}</p><p className="text-[10px] text-zinc-500 mt-1 uppercase">Verified Client</p></div>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4 overflow-hidden">
        {["v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png", "v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png", "v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png", "v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png"].map((img, i) => (
          <div key={i} className="h-64 md:h-96 overflow-hidden">
            <img src={`https://res.cloudinary.com/dgstbaoic/image/upload/${img}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" alt="Salon Gallery" />
          </div>
        ))}
      </section>

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
          <div className="bg-white p-10 border border-zinc-100 shadow-sm">
            <h3 className="text-3xl font-serif mb-8">Send a Message</h3>
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <input required placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-zinc-50 border-none focus:ring-1 focus:ring-black transition-all outline-none" />
              <input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 bg-zinc-50 border-none focus:ring-1 focus:ring-black transition-all outline-none" />
              <textarea required placeholder="Message" rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full p-4 bg-zinc-50 border-none focus:ring-1 focus:ring-black transition-all outline-none" />
              <Button type="submit" className="w-full py-4">Submit Inquiry</Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-zinc-900 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-serif font-bold tracking-[0.3em] mb-10">L U M I È R E</h2>
        <div className="flex justify-center space-x-10 mb-16 opacity-60 hover:opacity-100 transition-opacity">
          <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
          <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
        </div>
        <p className="text-zinc-600 text-xs uppercase tracking-widest font-medium">© 2024 Lumière Salon Cape Town. All rights reserved.</p>
      </footer>
    </div>
  );
}
