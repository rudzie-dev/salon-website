import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, Clock, Scissors, Star, 
  MapPin, Phone, Mail, Instagram, Facebook, 
  ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

/* --- LUXURY SCALES & SNAP CSS --- */
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .snap-x {
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
    .snap-center {
      scroll-snap-align: center;
    }
  `}} />
);

/* --- DATA MODELS: 2025 SA PREMIUM MARKET PRICING --- */
const SERVICES = [
  { 
    id: 1, 
    category: 'Haircuts', 
    name: 'Signature Cut & Style', 
    price: 650, 
    duration: 60, 
    description: 'A precision cut tailored to your face shape, including a luxury ritual wash and signature blowout.' 
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
  {
    id: 1,
    name: 'Zara Nkosi',
    role: 'Master Stylist',
    specialty: 'Precision Cutting',
    bio: 'With over 15 years in Sandton, Zara specializes in transformative cuts that frame the face perfectly.',
    image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png'
  },
  {
    id: 2,
    name: 'Liam Chen',
    role: 'Color Director',
    specialty: 'Balayage & Blonde',
    bio: 'Liam is renowned for "lived-in" color techniques and creating the perfect Cape Town blonde.',
    image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596671/image_1_1765596191540_b2rh1t.png'
  },
  {
    id: 3,
    name: 'Amara Dube',
    role: 'Texture Specialist',
    specialty: 'Curly Hair & Treatments',
    bio: 'Certified in global texture systems, Amara helps clients embrace and enhance their natural curl patterns.',
    image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596673/freepik__the-style-is-candid-image-photography-with-natural__8282_exxbxp.png'
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    date: "Dec 2024",
    text: "The best salon experience I've ever had. The attention to detail is unmatched.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Thorne",
    date: "Nov 2024",
    text: "Liam is a wizard with color. I wouldn't trust anyone else with my hair.",
    rating: 5
  },
  {
    id: 3,
    name: "Amara Diop",
    date: "Jan 2025",
    text: "Finally a salon that understands curly hair! Amara changed my life.",
    rating: 5
  }
];

/* --- UI COMPONENTS --- */

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-3 transition-all duration-300 font-medium tracking-wide text-sm uppercase";
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-white text-black border border-black hover:bg-zinc-50",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <h3 className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-3">{subtitle}</h3>
    <h2 className="text-3xl md:text-5xl font-serif text-zinc-900 tracking-tight">{title}</h2>
    <div className={`w-12 h-0.5 bg-zinc-900 mt-6 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: null,
    stylist: null,
    date: null,
    time: null
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const resetBooking = () => {
    setStep(1);
    setBookingData({ service: null, stylist: null, date: null, time: null });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl h-full md:h-auto md:min-h-[600px] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden md:rounded-sm">
        <div className="flex justify-between items-center p-6 border-b border-zinc-100">
          <div>
            <h3 className="font-serif text-2xl tracking-tight">Reservations</h3>
            <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest mt-1">Step {step} of 4</p>
          </div>
          <button onClick={resetBooking} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Select Service</h4>
              <div className="grid grid-cols-1 gap-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => { setBookingData({ ...bookingData, service }); handleNext(); }}
                    className="flex justify-between items-center p-5 border border-zinc-100 hover:border-black hover:bg-zinc-50 transition-all text-left group"
                  >
                    <div>
                      <p className="font-serif text-lg">{service.name}</p>
                      <p className="text-xs text-zinc-400 mt-1">{service.duration} mins • R{service.price}</p>
                    </div>
                    <ChevronRight size={16} className="text-zinc-300 group-hover:text-black transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Choose Specialist</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                   onClick={() => { setBookingData({ ...bookingData, stylist: { name: 'First Available', role: 'Professional' } }); handleNext(); }}
                   className="p-5 border border-zinc-100 hover:border-black hover:bg-zinc-50 transition-all flex items-center gap-4"
                >
                   <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center"><Scissors size={18} /></div>
                   <div><p className="font-serif text-lg">Any Stylist</p><p className="text-[10px] uppercase tracking-tighter text-zinc-400">Earliest availability</p></div>
                </button>
                {STYLISTS.map((stylist) => (
                  <button
                    key={stylist.id}
                    onClick={() => { setBookingData({ ...bookingData, stylist }); handleNext(); }}
                    className="p-5 border border-zinc-100 hover:border-black hover:bg-zinc-50 transition-all flex items-center gap-4"
                  >
                    <img src={stylist.image} alt={stylist.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0" />
                    <div><p className="font-serif text-lg">{stylist.name}</p><p className="text-[10px] uppercase tracking-tighter text-zinc-400">{stylist.role}</p></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h4 className="text-sm uppercase tracking-widest font-bold mb-2">Schedule Time</h4>
              
              {/* SNAP CAROUSEL DATE PICKER */}
              <div className="relative -mx-6">
                <div className="flex gap-4 overflow-x-auto py-8 px-6 snap-x hide-scrollbar">
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                    const d = new Date(); d.setDate(d.getDate() + i);
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                    const fullDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                    const isSelected = bookingData.date === fullDate;
                    return (
                      <button 
                        key={i} 
                        onClick={() => setBookingData({ ...bookingData, date: fullDate })}
                        className={`flex-shrink-0 w-24 h-32 snap-center transition-all duration-500 flex flex-col items-center justify-center rounded-sm border ${
                          isSelected ? 'bg-black text-white border-black scale-110 shadow-xl z-10' : 'bg-white text-zinc-400 border-zinc-100 scale-100'
                        }`}
                      >
                        <span className={`text-[10px] uppercase font-bold mb-2 tracking-tighter ${isSelected ? 'text-zinc-500' : 'text-zinc-300'}`}>{dayName}</span>
                        <span className="text-3xl font-serif">{d.getDate()}</span>
                        <div className={`w-1 h-1 rounded-full mt-4 transition-all ${isSelected ? 'bg-white' : 'bg-transparent'}`}></div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {bookingData.date && (
                <div className="grid grid-cols-3 gap-2 animate-in fade-in slide-in-from-top-2">
                  {['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'].map((time) => (
                    <button
                      key={time}
                      onClick={() => { setBookingData({ ...bookingData, time }); handleNext(); }}
                      className="py-4 text-xs font-bold border border-zinc-100 hover:bg-black hover:text-white transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 py-4">
               <div className="text-center">
                  <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={32} /></div>
                  <h4 className="text-3xl font-serif mb-2 tracking-tight">Final Details</h4>
                  <p className="text-zinc-400 text-sm">Please review your luxury appointment summary.</p>
               </div>
               <div className="bg-zinc-50 p-8 space-y-4 border border-zinc-100">
                  <div className="flex justify-between border-b border-zinc-200 pb-3 text-sm">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Service</span>
                    <span className="font-serif text-lg">{bookingData.service?.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 pb-3 text-sm">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Specialist</span>
                    <span className="font-serif text-lg">{bookingData.stylist?.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 pb-3 text-sm">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Time</span>
                    <span className="font-serif text-lg">{bookingData.date} @ {bookingData.time}</span>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Total</span>
                    <span className="font-serif text-2xl tracking-tighter">R{bookingData.service?.price}</span>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-zinc-100 bg-white flex justify-between items-center">
          {step > 1 && step < 4 ? (
            <button onClick={handleBack} className="text-xs uppercase font-bold tracking-widest text-zinc-400 hover:text-black">Back</button>
          ) : <div />}
          {step === 4 ? (
            <Button onClick={() => { alert("Booking Confirmed!"); resetBooking(); }} className="w-full sm:w-auto">Confirm Booking</Button>
          ) : <div className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">Lumière Luxury</div>}
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
    <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-4' : 'bg-transparent py-8 text-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-serif tracking-[0.4em] font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>LUMIÈRE</a>
        <div className="hidden md:flex items-center space-x-10">
          {['Services', 'Team', 'Gallery', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className={`text-[10px] uppercase tracking-[0.3em] font-bold hover:opacity-50 transition-opacity ${isScrolled ? 'text-zinc-800' : 'text-white'}`}>{link}</a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'outline'} className="text-[10px] py-3 px-6">Book Now</Button>
        </div>
        <button className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-2xl py-12 px-10 flex flex-col space-y-8 animate-in slide-in-from-top-10">
           {['Services', 'Team', 'Gallery', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-black text-2xl font-serif">{link}</a>
          ))}
          <Button onClick={() => { setMobileMenuOpen(false); onBookClick(); }} className="w-full py-5">Book Appointment</Button>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="font-sans antialiased text-zinc-900 bg-white selection:bg-zinc-200">
      <GlobalStyles />
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105 animate-pulse-slow">
          <img src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" alt="Salon" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
          <p className="text-[10px] tracking-[0.6em] uppercase mb-8 font-bold text-zinc-400">Est. 2024 • Cape Town</p>
          <h1 className="text-6xl md:text-8xl font-serif mb-10 leading-[0.9] tracking-tighter">The Pure Art <br/> of Elevation</h1>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button onClick={() => setIsBookingOpen(true)} className="min-w-[220px] py-5">Book Appointment</Button>
            <Button variant="outline" className="min-w-[220px] py-5">Discover Menu</Button>
          </div>
        </div>
      </section>

      {/* SNAP-ACTION MOBILE CAROUSEL: REVIEWS */}
      <section className="py-32 px-0 md:px-6 bg-zinc-900 text-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20 px-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-4">Journal</p>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">Client Stories</h2>
          </div>
          <div className="relative">
            {/* Mobile Vignette Fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-900 to-transparent z-10 md:hidden"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-900 to-transparent z-10 md:hidden"></div>

            <div className="flex overflow-x-auto pb-20 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:gap-16 px-10 md:px-0">
              {TESTIMONIALS.map((r) => (
                <div key={r.id} className="min-w-[85vw] md:min-w-0 mr-8 md:mr-0 snap-center flex flex-col bg-zinc-800/20 p-10 md:p-0 rounded-sm border border-white/5 md:border-none">
                  <div className="flex mb-10">
                    {[...Array(r.rating)].map((_, i) => <Star key={i} size={10} className="text-white fill-current mr-1 opacity-30" />)}
                  </div>
                  <p className="text-2xl md:text-3xl font-serif italic mb-12 leading-tight opacity-90">"{r.text}"</p>
                  <div className="mt-auto pt-8 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-widest font-bold">{r.name}</p>
                    <p className="text-[10px] text-zinc-600 mt-2 uppercase tracking-tighter font-bold">{r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="The Menu" subtitle="Bespoke Offerings" />
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {SERVICES.map((service) => (
              <div key={service.id} className="group cursor-pointer border-b border-zinc-100 pb-10 flex justify-between gap-6" onClick={() => setIsBookingOpen(true)}>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-4">
                    <h4 className="text-2xl font-serif group-hover:text-zinc-500 transition-colors tracking-tight">{service.name}</h4>
                    <span className="text-xl font-serif tracking-tighter">R{service.price}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-md">{service.description}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">{service.duration} Mins</p>
                </div>
                <div className="self-center">
                   <div className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                      <ArrowRight size={14} className="text-zinc-200 group-hover:text-white" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
           <SectionHeader title="Our Artisans" subtitle="The Experts" />
           <div className="grid md:grid-cols-3 gap-16">
              {STYLISTS.map((stylist) => (
                <div key={stylist.id} className="group text-center">
                  <div className="relative overflow-hidden mb-8 mx-auto w-full aspect-[4/5] bg-zinc-200">
                    <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
                  </div>
                  <h4 className="text-2xl font-serif mb-2 tracking-tight">{stylist.name}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">{stylist.role}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto italic">"{stylist.bio}"</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
           <div className="grid md:grid-cols-2 gap-24 items-start">
              <div className="bg-zinc-900 text-white p-12 md:p-20">
                <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-6">Concierge</p>
                <h2 className="text-4xl font-serif mb-12 tracking-tighter">Connect With Us</h2>
                <div className="space-y-10">
                  <div className="flex gap-6"><MapPin className="text-zinc-600" size={20} /><div><h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Location</h4><p className="text-lg font-serif">Shop 10, Luxe Square, Foreshore<br/>Cape Town, 8001</p></div></div>
                  <div className="flex gap-6"><Phone className="text-zinc-600" size={20} /><div><h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Phone</h4><p className="text-lg font-serif">(021) 555 0123</p></div></div>
                  <div className="flex gap-6"><Clock className="text-zinc-600" size={20} /><div><h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Hours</h4><p className="text-lg font-serif text-zinc-400">Tue - Fri: 10am - 8pm<br/>Sat: 9am - 6pm</p></div></div>
                </div>
              </div>
              <div className="py-10">
                <h3 className="text-3xl font-serif mb-10 tracking-tight">Private Inquiry</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <input type="text" placeholder="First Name" className="w-full py-4 border-b border-zinc-200 focus:border-black outline-none transition-colors" />
                    <input type="text" placeholder="Last Name" className="w-full py-4 border-b border-zinc-200 focus:border-black outline-none transition-colors" />
                  </div>
                  <input type="email" placeholder="Email Address" className="w-full py-4 border-b border-zinc-200 focus:border-black outline-none transition-colors" />
                  <textarea rows="4" placeholder="Your Message" className="w-full py-4 border-b border-zinc-200 focus:border-black outline-none transition-colors"></textarea>
                  <Button className="w-full py-5">Send Inquiry</Button>
                </form>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-24 px-6 border-t border-white/5">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-serif font-bold tracking-[0.5em] mb-12">L U M I È R E</h2>
          <div className="flex space-x-12 mb-16">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Facebook size={24} /></a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
            <a href="#" className="hover:text-white transition-colors">Press</a>
          </div>
          <p className="mt-20 text-zinc-700 text-[10px] font-bold uppercase tracking-widest">© 2025 Lumière Salon South Africa.</p>
        </div>
      </footer>
    </div>
  );
}
