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

/* --- LOADING SCREEN COMPONENT --- */
const LoadingScreen = () => {
  const [shouldRender, setShouldRender] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), 3000);
    const removeTimer = setTimeout(() => setShouldRender(false), 4500);
    return () => { clearTimeout(timer); clearTimeout(removeTimer); };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none">
      {/* Background Strips */}
      <div className="absolute inset-0 flex overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 bg-zinc-900 h-full border-r border-zinc-800/20 ${isExiting ? 'exit-strip' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      {/* SVG Letter Drawing */}
      {!isExiting && (
        <div className="relative z-10 flex flex-col items-center">
          <svg width="240" height="80" viewBox="0 0 240 80" className="overflow-visible">
            <text 
              x="50%" 
              y="50%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              className="font-serif text-4xl md:text-5xl fill-transparent stroke-white/40 stroke-[0.5px] animate-draw"
              style={{ letterSpacing: '0.3em' }}
            >
              LUMIÈRE
            </text>
          </svg>
          <div className="mt-8 w-16 h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/40 animate-shimmer" />
          </div>
        </div>
      )}
    </div>
  );
};

/* --- SHARED COMPONENTS --- */
const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 border border-black",
    secondary: "bg-white text-black border border-black hover:bg-zinc-50",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black"
  };

  return (
    <button onClick={onClick} className={`px-8 py-3 transition-all duration-300 font-medium tracking-wide text-sm uppercase relative overflow-hidden group ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shimmer" />
    </button>
  );
};

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold mb-3">{subtitle}</p>
    <h2 className="text-3xl md:text-4xl font-serif text-zinc-900">{title}</h2>
    <div className={`w-16 h-0.5 bg-zinc-900 mt-6 ${centered ? 'mx-auto' : ''}`} />
  </div>
);

/* --- NAVIGATION --- */
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
        <a href="#home" onClick={() => setIsOpen(false)} className={`text-2xl font-serif tracking-widest font-bold transition-colors ${(isScrolled || isOpen) ? 'text-black' : 'text-white'}`}>L U M I È R E</a>
        
        <div className="hidden md:flex items-center space-x-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className={`text-sm uppercase tracking-wide font-medium nav-link-grow ${isScrolled ? 'text-zinc-800' : 'text-white'}`}>{l}</a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'secondary'}>Book Now</Button>
        </div>

        <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${(isScrolled || isOpen) ? 'bg-black' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${(isScrolled || isOpen) ? 'bg-black' : 'bg-white'} ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${(isScrolled || isOpen) ? 'bg-black' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div className={`fixed inset-0 bg-white z-[85] flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center space-y-8">
          {links.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setIsOpen(false)} className={`text-4xl font-serif text-black hover:text-zinc-500 ${isOpen ? `animate-link delay-${i+1}` : ''}`}>{l}</a>
          ))}
          <div className={`${isOpen ? 'animate-link delay-5' : ''} pt-6`}><Button onClick={() => { setIsOpen(false); onBookClick(); }} className="w-64">Book Now</Button></div>
        </div>
      </div>
    </nav>
  );
};

/* --- BOOKING MODAL --- */
const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [bookingData, setBookingData] = useState({ service: null, stylist: null, date: null, time: null });

  if (!isOpen) return null;

  const reset = () => { 
    setStep(1); 
    setCustomerName("");
    setBookingData({ service: null, stylist: null, date: null, time: null }); 
    onClose(); 
  };

  const handleFinalize = () => {
    const phoneNumber = "27676862733"; 
    const sName = bookingData.service?.name || "Service not selected";
    const sPrice = bookingData.service?.price || "0";
    const stylist = bookingData.stylist?.name || "First Available";
    const bDate = bookingData.date || "Date not set";
    const bTime = bookingData.time || "Time not set";
    const cName = customerName.trim() || "Customer";

    const message = `Hi Lumière Salon! My name is ${cName}.%0A%0A` +
      `I would like to book the following appointment:%0A` +
      `Service: ${sName}%0A` +
      `Stylist: ${stylist}%0A` +
      `When: ${bDate} at ${bTime}%0A` +
      `Total Price: R${sPrice}%0A%0A` +
      `Please let me know if this slot is available!`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    reset();
  };

  const isClosed = (d) => d.getDay() === 0 || d.getDay() === 1;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h3 className="font-serif text-2xl">Book Appointment</h3>
            <p className="text-zinc-500 text-sm">Step {step} of 4</p>
          </div>
          <button onClick={reset} className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><X size={20} /></button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid gap-3">
              {SERVICES.map((s) => (
                <button key={s.id} onClick={() => { setBookingData({ ...bookingData, service: s }); setStep(2); }} className="flex justify-between items-center p-4 border border-zinc-200 hover:border-black transition-all text-left group">
                  <div><p className="font-medium">{s.name}</p><p className="text-sm text-zinc-500">{s.duration} mins • R{s.price}</p></div>
                  <ChevronRight size={16} className="text-zinc-300 group-hover:text-black" />
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid sm:grid-cols-2 gap-4">
              <button onClick={() => { setBookingData({ ...bookingData, stylist: { name: 'First Available' } }); setStep(3); }} className="p-4 border border-zinc-200 hover:border-black flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center"><Scissors size={20} /></div>
                <p className="font-medium">First Available</p>
              </button>
              {STYLISTS.map((s) => (
                <button key={s.id} onClick={() => { setBookingData({ ...bookingData, stylist: s }); setStep(3); }} className="p-4 border border-zinc-200 hover:border-black flex items-center gap-4 text-left">
                  <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                  <div><p className="font-medium">{s.name}</p><p className="text-xs text-zinc-500">{s.role}</p></div>
                </button>
              ))}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
                {[...Array(14)].map((_, i) => {
                  const d = new Date(); d.setDate(d.getDate() + i);
                  const closed = isClosed(d);
                  const fullDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                  return (
                    <button key={i} disabled={closed} onClick={() => setBookingData({ ...bookingData, date: fullDate })} className={`flex-shrink-0 w-20 py-4 border transition-all ${closed ? 'opacity-20' : bookingData.date === fullDate ? 'bg-black text-white' : 'hover:border-black'}`}>
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

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-2" />
                <h4 className="text-lg font-medium">Review Details</h4>
              </div>
              <div className="bg-zinc-50 p-4 space-y-2 text-sm border border-zinc-100 text-left">
                <p>Service: {bookingData.service?.name}</p>
                <p>Stylist: {bookingData.stylist?.name}</p>
                <p>When: {bookingData.date} at {bookingData.time}</p>
                <p className="font-bold border-t pt-2 mt-2">Total: R{bookingData.service?.price}</p>
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs uppercase tracking-widest font-bold">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 border border-zinc-200 outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t flex justify-between">
          {step > 1 && <button onClick={() => setStep(step - 1)} className="underline text-sm uppercase tracking-widest font-bold">Back</button>}
          {step === 4 && <Button onClick={handleFinalize} className="flex-1 ml-4">Finalize via WhatsApp</Button>}
        </div>
      </div>
    </div>
  );
};
/* --- TESTIMONIALS --- */
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
    }
  };

  const scrollTo = (i) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader title="Client Experiences" subtitle="Kind Words" />
        <div className="relative">
          <div ref={scrollRef} onScroll={onScroll} className="flex overflow-x-auto pb-12 gap-6 hide-scrollbar snap-x-mandatory scroll-smooth md:grid md:grid-cols-3 md:snap-none">
            {TESTIMONIALS.map((r) => (
              <div key={r.id} className="min-w-[90%] md:min-w-0 bg-zinc-800/40 p-10 border border-zinc-700/50 flex flex-col justify-between snap-center">
                <div>
                  <div className="flex mb-8">{[...Array(r.rating)].map((_, i) => <Star key={i} size={14} className="fill-current mr-1 text-white" />)}</div>
                  <p className="text-xl font-serif italic mb-10 leading-relaxed">"{r.text}"</p>
                </div>
                <div className="flex justify-between items-end border-t border-zinc-700 pt-8 mt-4">
                  <div><p className="text-sm uppercase tracking-widest font-bold">{r.name}</p><p className="text-[10px] text-zinc-500 uppercase mt-1">Verified Client</p></div>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-3 md:hidden">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => scrollTo(i)} className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-white' : 'w-2 bg-zinc-700'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- MAIN APP --- */
export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="antialiased">
      <LoadingScreen />
      
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-zinc-900 overflow-hidden">
        <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Hero" />
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-xs uppercase tracking-[0.4em] mb-6">Beauty Redefined</p>
          <h1 className="text-5xl md:text-8xl font-serif mb-10 leading-tight">Experience the Art <br/> of Hair</h1>
          <Button variant="outline" onClick={() => setIsBookingOpen(true)}>Book Appointment</Button>
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Our Menu" subtitle="Curated Treatments" />
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white p-8 border border-zinc-100 hover:shadow-lg transition-all flex justify-between cursor-pointer group" onClick={() => setIsBookingOpen(true)}>
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

      <Testimonials />

      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4">
        {["v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png", "v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png", "v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png", "v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png"].map((img, i) => (
          <div key={i} className="h-64 md:h-96 overflow-hidden">
            <img src={`https://res.cloudinary.com/dgstbaoic/image/upload/${img}`} loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Gallery" />
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
          <form className="bg-white p-10 border border-zinc-100 shadow-sm space-y-6" onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-3xl font-serif mb-8">Send a Message</h3>
            <input required placeholder="Name" className="w-full p-4 bg-zinc-50 outline-none focus:ring-1 focus:ring-black" />
            <input required type="email" placeholder="Email" className="w-full p-4 bg-zinc-50 outline-none focus:ring-1 focus:ring-black" />
            <textarea required placeholder="Message" rows="4" className="w-full p-4 bg-zinc-50 outline-none focus:ring-1 focus:ring-black" />
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
        <p className="text-zinc-600 text-[10px] uppercase tracking-widest">© 2024 Lumière Salon. Cape Town.</p>
      </footer>
    </div>
  );
}
