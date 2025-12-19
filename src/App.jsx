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
  { id: 3, name: "Amara Diop", text: "Finally, a salon that masters curly hair. Amara treated my curls with such care and expertise. The atmosphere is serene.", rating: 5, date: "3 weeks ago" },
  { id: 4, name: "Elena Rodriguez", text: "From the moment you walk in, you're treated like royalty. The luxury blowout is my weekly ritual now.", rating: 5, date: "5 days ago" },
  { id: 5, name: "David Smith", text: "The Gentlemen’s Grooming service is top-tier. It’s not just a haircut; it’s a full sensory experience.", rating: 5, date: "1 month ago" }
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-zinc-100 flex-shrink-0">
          <div><h3 className="font-serif text-2xl">Book Appointment</h3><p className="text-zinc-500 text-sm mt-1">Step {step} of 4</p></div>
          <button onClick={resetBooking} className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><X size={20} /></button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium mb-4">Select a Service</h4>
              <div className="grid grid-cols-1 gap-3">
                {SERVICES.map((s) => (
                  <button key={s.id} onClick={() => { setBookingData({ ...bookingData, service: s }); handleNext(); }} className="flex justify-between items-center p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left group">
                    <div><p className="font-medium group-hover:text-black">{s.name}</p><p className="text-sm text-zinc-500">{s.duration} mins • R{s.price}</p></div>
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
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                  const d = new Date(); d.setDate(d.getDate() + i);
                  const dayNum = d.getDate();
                  const fullDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                  return (
                    <button key={i} onClick={() => setBookingData({ ...bookingData, date: fullDate })} className={`flex-shrink-0 w-16 py-3 border transition-all ${bookingData.date === fullDate ? 'border-black bg-black text-white' : 'border-zinc-200 hover:border-zinc-400'}`}>
                      <p className="text-[10px] uppercase tracking-widest opacity-60">{d.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                      <p className="text-lg font-semibold">{dayNum}</p>
                    </button>
                  );
                })}
              </div>
              {bookingData.date && (
                <div className="grid grid-cols-3 gap-2 animate-in fade-in duration-500">
                  {['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'].map((t) => (
                    <button key={t} onClick={() => { setBookingData({ ...bookingData, time: t }); handleNext(); }} className="py-3 px-2 text-sm border border-zinc-200 hover:bg-black hover:text-white transition-colors">{t}</button>
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
                <div className="flex justify-between pt-2"><span className="text-zinc-500">Total</span><span className="font-medium text-lg">R{bookingData.service?.price}</span></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-zinc-50 flex justify-between items-center">
          {step > 1 && step < 4 ? <button onClick={handleBack} className="text-sm underline">Back</button> : <div />}
          {step === 4 ? <Button onClick={() => { alert("Booking Confirmed!"); resetBooking(); }} className="w-full sm:w-auto">Confirm</Button> : <div className="text-xs text-zinc-400">Step {step} of 4</div>}
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
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-serif tracking-widest font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>L U M I È R E</a>
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Services', 'Stylists', 'Gallery', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className={`nav-link-grow text-sm uppercase tracking-wide font-medium transition-opacity ${isScrolled ? 'text-zinc-800' : 'text-white'}`}>{l}</a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'secondary'} className={isScrolled ? '' : 'bg-white text-black border-none'}>Book Now</Button>
        </div>
        <button className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
    </nav>
  );
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="font-sans antialiased text-zinc-900 selection:bg-zinc-200">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0"><img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" className="w-full h-full object-cover opacity-50" alt="Salon" /><div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight animate-in fade-in slide-in-from-bottom-10 duration-1000">Experience the Art <br/> of Hair</h1>
          <Button onClick={() => setIsBookingOpen(true)} className="min-w-[180px]">Book Appointment</Button>
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Our Menu" subtitle="Curated Treatments" />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white p-8 hover:shadow-lg transition-all border border-zinc-100 flex justify-between cursor-pointer group" onClick={() => setIsBookingOpen(true)}>
                <div><h4 className="text-lg font-serif mb-2 group-hover:text-zinc-600">{s.name}</h4><p className="text-zinc-500 text-sm mb-4">{s.description}</p><p className="text-xs text-zinc-400 uppercase tracking-wider">{s.duration} Mins • R{s.price}</p></div>
                <ArrowRight size={14} className="self-center text-zinc-300 group-hover:text-black" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Meet The Experts" subtitle="Our Team" />
          <div className="grid md:grid-cols-3 gap-12">
            {STYLISTS.map((s) => (
              <div key={s.id} className="group text-center transition-all duration-700 hover:-translate-y-2">
                <div className="relative overflow-hidden mb-6 aspect-[3/4]"><img src={s.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={s.name} /></div>
                <h4 className="text-xl font-serif">{s.name}</h4><p className="text-xs font-bold uppercase text-zinc-400 mb-3">{s.role}</p><p className="text-zinc-500 text-sm">{s.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Client Experiences" subtitle="Kind Words" />
          <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:gap-8">
            {TESTIMONIALS.map((r) => (
              <div key={r.id} className="min-w-[85%] sm:min-w-[60%] md:min-w-0 mr-6 md:mr-0 snap-center bg-zinc-800/40 p-8 border border-zinc-700/50 flex flex-col justify-between transition-all hover:bg-zinc-800/60">
                <div><div className="flex mb-6">{[...Array(r.rating)].map((_, i) => <Star key={i} size={14} className="text-white fill-current mr-1" />)}</div><p className="text-lg font-serif italic mb-8 leading-relaxed">"{r.text}"</p></div>
                <div className="flex justify-between items-end border-t border-zinc-700 pt-6"><div><p className="text-sm uppercase">{r.name}</p><p className="text-xs text-zinc-500 mt-1">Verified Client</p></div><span className="text-[10px] text-zinc-600 uppercase tracking-widest">{r.date}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4 overflow-hidden">
        {["v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png", "v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png", "v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png", "v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png"].map((img, i) => (
          <div key={i} className="h-64 md:h-96 overflow-hidden"><img src={`https://res.cloudinary.com/dgstbaoic/image/upload/${img}`} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" alt="Gallery" /></div>
        ))}
      </section>

      <section id="contact" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeader title="Visit Us" subtitle="Get In Touch" centered={false} />
            <div className="space-y-8 text-zinc-500">
              <div className="flex gap-4"><MapPin /><p>Shop 10, Luxe Square, Foreshore, Cape Town</p></div>
              <div className="flex gap-4"><Phone /><p>(021) 555 0123</p></div>
              <div className="flex gap-4"><Mail /><p>hello@lumieresalon.com</p></div>
              <div className="flex gap-4"><Clock /><p>Tue - Fri: 10am - 8pm | Sat: 9am - 6pm</p></div>
            </div>
          </div>
          <div className="bg-white p-8 border border-zinc-100"><h3 className="text-2xl font-serif mb-6">Send a Message</h3><form className="space-y-4"><input placeholder="Name" className="w-full p-3 bg-zinc-50" /><input placeholder="Email" className="w-full p-3 bg-zinc-50" /><textarea placeholder="Message" rows="4" className="w-full p-3 bg-zinc-50" /><Button className="w-full">Send</Button></form></div>
        </div>
      </section>

      <footer className="bg-zinc-900 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-serif font-bold tracking-widest mb-8">L U M I È R E</h2>
        <div className="flex justify-center space-x-8 mb-12"><Instagram /><Facebook /></div>
        <p className="text-zinc-600 text-xs">© 2024 Lumière Salon. All rights reserved.</p>
      </footer>
    </div>
  );
}
