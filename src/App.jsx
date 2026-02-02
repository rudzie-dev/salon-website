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

const FAQS = [
  { id: 1, question: "Do I need to book in advance?", answer: "We highly recommend booking in advance to secure your preferred time slot. You can book via WhatsApp or by calling us directly. Walk-ins are welcome based on availability." },
  { id: 2, question: "What is your cancellation policy?", answer: "We require at least 24 hours notice for cancellations or rescheduling. This allows us to offer the time slot to other clients. Late cancellations may incur a fee." },
  { id: 3, question: "What payment methods do you accept?", answer: "We accept cash, all major credit and debit cards, as well as mobile payment options like SnapScan and Zapper." },
  { id: 4, question: "Do you offer consultations?", answer: "Yes! All our services include a complimentary consultation to discuss your desired look and ensure we achieve the perfect result for you." },
  { id: 5, question: "How long will my appointment take?", answer: "Appointment duration varies by service. A simple cut takes about 60 minutes, while color treatments can take 2-3 hours. We'll confirm the exact timing when you book." }
];

/* --- COMPONENTS --- */

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
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-serif text-5xl md:text-6xl fill-transparent stroke-white/30 stroke-[0.4px] animate-draw" style={{ letterSpacing: '0.25em' }}>
              LUMIÈRE
            </text>
          </svg>
          <div className="mt-10 w-20 h-[0.5px] bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
          </div>
        </div>
      )}
    </div>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 active:scale-[0.98] disabled:bg-zinc-400",
    secondary: "bg-white/10 text-white backdrop-blur-xl border border-white/20 hover:bg-white/20 active:scale-[0.98]",
    outline: "bg-transparent text-white border border-white/30 hover:bg-white hover:text-black active:scale-[0.98]"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`px-7 py-3.5 transition-all duration-400 font-medium tracking-wide text-sm uppercase rounded-full ${variants[variant]} ${className}`} {...props}>
      {children}
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

const Navbar = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Home', 'Services', 'Stylists', 'Gallery', 'Contact'];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = link.toLowerCase();
    const element = document.getElementById(targetId);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[90] transition-all duration-700 ${isScrolled ? 'bg-white/80 backdrop-blur-2xl py-4 shadow-sm' : 'bg-transparent py-6 text-white'}`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, 'Home')} className={`text-xl font-serif tracking-[0.3em] transition-all duration-500 ${isScrolled || isOpen ? 'text-black' : 'text-white'}`}>
            LUMIÈRE
          </a>
          
          <div className="hidden md:flex items-center space-x-10">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={(e) => handleNavClick(e, l)} className={`text-[13px] uppercase tracking-wider font-medium nav-link-grow transition-colors ${isScrolled ? 'text-zinc-700 hover:text-black' : 'text-white/90 hover:text-white'}`}>
                {l}
              </a>
            ))}
            <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'secondary'}>Book Now</Button>
          </div>

          <button className="md:hidden relative z-[110] w-8 h-8 flex flex-col justify-center items-center space-y-1.5 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            <span className={`block w-6 h-[1.5px] transition-all duration-500 ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] transition-all duration-500 ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-[1.5px] transition-all duration-500 ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Refactored Fullscreen Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-white transition-all duration-700 ease-[cubic-bezier(0.32,0,0.07,1)] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full justify-center px-12 pt-20">
          <div className="space-y-4">
            {links.map((l, i) => (
              <div key={l} className="overflow-hidden">
                <a 
                  href={`#${l.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, l)}
                  className={`block text-5xl font-serif text-black hover:text-zinc-500 transition-transform duration-700 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {l}
                </a>
              </div>
            ))}
          </div>
          <div className={`mt-20 transition-all duration-1000 delay-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <Button onClick={() => { onBookClick(); setIsOpen(false); }} className="w-full">Book Experience</Button>
            <div className="mt-12 flex space-x-8 text-zinc-400">
              <Instagram size={24} className="hover:text-black transition-colors" />
              <Facebook size={24} className="hover:text-black transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* --- BOOKING MODAL, FAQ, TESTIMONIALS (Consolidated from Original) --- */

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ service: '', stylist: '', date: '', time: '', name: '', email: '', phone: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hi! I'd like to book ${formData.service} with ${formData.stylist} on ${formData.date} at ${formData.time}. Name: ${formData.name}`);
    window.open(`https://wa.me/27619229670?text=${msg}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-scaleIn">
        <div className="sticky top-0 bg-white/95 border-b p-8 flex justify-between items-center z-10">
          <h2 className="text-2xl font-serif">Book Your Appointment</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-slideUp">
              {SERVICES.map(s => (
                <button key={s.id} type="button" onClick={() => { setFormData({...formData, service: s.name}); setStep(2); }} className="w-full text-left p-6 border rounded-2xl hover:bg-zinc-50 transition-all">
                  <h4 className="font-serif text-lg">{s.name}</h4>
                  <p className="text-sm text-zinc-500">R{s.price} • {s.duration} min</p>
                </button>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4 animate-slideUp">
              {STYLISTS.map(s => (
                <button key={s.id} type="button" onClick={() => { setFormData({...formData, stylist: s.name}); setStep(3); }} className="w-full text-left p-6 border rounded-2xl flex items-center gap-4 hover:bg-zinc-50">
                  <img src={s.image} className="w-12 h-12 rounded-full object-cover grayscale" />
                  <div><h4 className="font-serif">{s.name}</h4><p className="text-xs text-zinc-400 uppercase">{s.role}</p></div>
                </button>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6 animate-slideUp">
              <input type="date" required onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-4 bg-zinc-50 rounded-xl border" />
              <input type="text" placeholder="Full Name" required onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-zinc-50 rounded-xl border" />
              <Button type="submit" className="w-full">Confirm via WhatsApp</Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const Testimonials = () => (
  <section className="py-32 px-6 bg-zinc-900 text-white overflow-hidden">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader title="Client Experiences" subtitle="Kind Words" dark={true} />
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((r) => (
          <div key={r.id} className="bg-white/5 p-10 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
            <p className="text-lg font-serif italic mb-8 leading-relaxed">"{r.text}"</p>
            <p className="text-xs uppercase tracking-widest font-semibold">{r.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="py-32 px-6 bg-zinc-50">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader title="Frequently Asked Questions" subtitle="Good to Know" />
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={faq.id} className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-8 py-6 flex justify-between items-center text-left">
                <span className="text-lg font-serif">{faq.question}</span>
                <ChevronRight className={`transition-transform ${openIndex === index ? 'rotate-90' : ''}`} size={20} />
              </button>
              {openIndex === index && <p className="px-8 pb-6 text-zinc-600 animate-slideUp">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
    <div className="antialiased">
      <LoadingScreen />
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <section id="home" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 w-full h-full" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <img src="https://res.cloudinary.com/dgstbaoic/image/upload/w_1920,f_auto,q_auto:good/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" className="w-full h-full object-cover opacity-40" alt="Hero" />
        </div>
        <div className="relative z-10 text-center text-white px-6 animate-fadeInUp">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-8 font-medium">Beauty Redefined</p>
          <h1 className="text-5xl md:text-8xl font-serif mb-12 font-light tracking-tight">Experience the Art<br/>of Hair</h1>
          <Button variant="outline" onClick={() => setIsBookingOpen(true)}>Book Appointment</Button>
        </div>
      </section>

      <section id="services" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Our Menu" subtitle="Curated Treatments" />
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map(s => (
              <div key={s.id} onClick={() => setIsBookingOpen(true)} className="bg-zinc-50 p-10 border border-zinc-100 hover:shadow-xl transition-all cursor-pointer rounded-2xl group">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-2xl font-serif mb-2">{s.name}</h4>
                    <p className="text-zinc-500 text-sm mb-4">{s.description}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">R{s.price} • {s.duration} MIN</p>
                  </div>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform text-zinc-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stylists" className="py-32 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Meet The Experts" subtitle="Our Team" />
          <div className="grid md:grid-cols-3 gap-12">
            {STYLISTS.map(s => (
              <div key={s.id} className="text-center group">
                <div className="relative overflow-hidden mb-8 aspect-[3/4] rounded-2xl">
                  <img src={s.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={s.name} />
                </div>
                <h4 className="text-2xl font-serif font-light">{s.name}</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-400 mt-2">{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />

      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4">
        {["v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png", "v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png", "v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png", "v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png"].map((img, i) => (
          <div key={i} className="h-80 md:h-[28rem] overflow-hidden grayscale hover:grayscale-0 transition-all">
            <img src={`https://res.cloudinary.com/dgstbaoic/image/upload/w_800,f_auto,q_auto/${img}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
          </div>
        ))}
      </section>

      <section id="contact" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-20">
          <div>
            <SectionHeader title="Visit Us" subtitle="Get In Touch" centered={false} />
            <div className="space-y-8 text-zinc-600">
              <div className="flex gap-4"><MapPin size={20} /><p>21 King Street, Ladysmith, 3370</p></div>
              <div className="flex gap-4"><Phone size={20} /><p>061 922 9670</p></div>
              <div className="flex gap-4"><Clock size={20} /><p>Tue - Sat: 9am - 6pm</p></div>
            </div>
          </div>
          <form className="bg-zinc-50 p-10 rounded-3xl border space-y-4">
            <input placeholder="Name" className="w-full p-4 rounded-xl border outline-none focus:ring-1 focus:ring-black" />
            <input placeholder="Email" className="w-full p-4 rounded-xl border outline-none focus:ring-1 focus:ring-black" />
            <textarea placeholder="Message" rows="4" className="w-full p-4 rounded-xl border outline-none focus:ring-1 focus:ring-black resize-none" />
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </section>

      <footer className="bg-black text-white py-20 text-center">
        <h2 className="text-2xl font-serif tracking-[0.4em] mb-10">LUMIÈRE</h2>
        <div className="flex justify-center space-x-8 opacity-40 mb-10">
          <Instagram size={20} /><Facebook size={20} />
        </div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-600">© 2026 Lumière Salon. Demo by Arcodic.</p>
      </footer>
    </div>
  );
}
