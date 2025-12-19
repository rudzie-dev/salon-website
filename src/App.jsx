import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, Clock, Scissors, Star, 
  MapPin, Phone, Mail, Instagram, Facebook, 
  ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

/* --- DATA MODELS (Simulating Backend Data) ---
  Based on PDF Section 4.3.1 Data Models
*/

const SERVICES = [
  {
    id: 1,
    category: 'Haircuts',
    name: 'Signature Cut & Style',
    price: 95,
    duration: 60,
    description: 'A precision cut tailored to your face shape and lifestyle, finished with a luxury blowout.'
  },
  {
    id: 2,
    category: 'Color',
    name: 'Balayage & Gloss',
    price: 210,
    duration: 180,
    description: 'Hand-painted highlights for a natural, sun-kissed look, including a shine-enhancing gloss.'
  },
  {
    id: 3,
    category: 'Treatments',
    name: 'Keratin Smoothing',
    price: 250,
    duration: 150,
    description: 'Eliminate frizz and restore shine with our premium keratin infusion therapy.'
  },
  {
    id: 4,
    category: 'Styling',
    name: 'Luxury Blowout',
    price: 55,
    duration: 45,
    description: 'Wash, condition, and a long-lasting blowout style for any occasion.'
  },
  {
    id: 5,
    category: 'Color',
    name: 'Full Spectrum Color',
    price: 130,
    duration: 120,
    description: 'Rich, single-process color from roots to ends for vibrant, lasting results.'
  },
  {
    id: 6,
    category: 'Haircuts',
    name: 'Gentlemen’s Grooming',
    price: 65,
    duration: 45,
    description: 'Precision clipper or scissor cut, wash, and style.'
  }
];

const STYLISTS = [
  {
    id: 1,
    name: 'Zara Nkosi', // UPDATED NAME
    role: 'Master Stylist',
    specialty: 'Precision Cutting',
    // Updated bio to reflect a South African context
    bio: 'With over 15 years in Sandton, Elena specializes in transformative cuts that frame the face perfectly.',
    image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png' // UPDATED IMAGE
  },
  {
    id: 2,
    name: 'Liam Chen', // UPDATED NAME
    role: 'Color Director',
    specialty: 'Balayage & Blonde',
    bio: 'Julian is renowned for his "lived-in" color techniques and ability to create the perfect blonde.',
    image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596671/image_1_1765596191540_b2rh1t.png' // UPDATED IMAGE
  },
  {
    id: 3,
    name: 'Amara Dube', // UPDATED NAME
    role: 'Texture Specialist',
    specialty: 'Curly Hair & Treatments',
    bio: 'Certified in multiple texture systems, Sophia helps clients embrace and enhance their natural curl patterns.',
    image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596673/freepik__the-style-is-candid-image-photography-with-natural__8282_exxbxp.png' // UPDATED IMAGE
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    text: "The most transformative salon experience I've had in Cape Town. Zara's precision with the signature cut is unparalleled; she truly understands how to work with face shape and hair texture.",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    text: "Liam is a visionary with color. My balayage looks incredibly natural and the gloss treatment left my hair with a mirror-like shine that has lasted for weeks. Truly a luxury service.",
    rating: 5,
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Amara Diop",
    text: "Finally, a salon that masters curly hair. Amara Dube treated my curls with such care and expertise. The atmosphere is serene, professional, and genuinely high-end.",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    text: "From the moment you walk in, you're treated like royalty. The luxury blowout is my weekly ritual now—it’s long-lasting and the attention to detail is simply unmatched.",
    rating: 5,
    date: "5 days ago"
  },
  {
    id: 5,
    name: "David Smith",
    text: "The Gentlemen’s Grooming service is top-tier. It’s not just a haircut; it’s a full sensory experience. The precision and the scalp massage are worth every cent.",
    rating: 5,
    date: "1 month ago"
  }
];

/* --- COMPONENTS ---
*/

// Button Component
const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-3 transition-all duration-300 font-medium tracking-wide text-sm uppercase";
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-white text-black border border-black hover:bg-zinc-50",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Section Header Component
const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-semibold mb-3">{subtitle}</h3>
    <h2 className="text-3xl md:text-4xl font-serif text-zinc-900">{title}</h2>
    <div className={`w-16 h-0.5 bg-zinc-900 mt-6 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

// Booking Modal (Simulating the functionality described in 1.2.1)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl min-h-[500px] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-100">
          <div>
            <h3 className="font-serif text-2xl">Book Appointment</h3>
            <p className="text-zinc-500 text-sm mt-1">Step {step} of 4</p>
          </div>
          <button onClick={resetBooking} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium mb-4">Select a Service</h4>
              <div className="grid grid-cols-1 gap-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setBookingData({ ...bookingData, service });
                      handleNext();
                    }}
                    className="flex justify-between items-center p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left group"
                  >
                    <div>
                      <p className="font-medium group-hover:text-black">{service.name}</p>
                      {/* Changed currency to Rand (R) */}
                      <p className="text-sm text-zinc-500">{service.duration} mins • R{service.price}</p>
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
                <button
                   onClick={() => {
                    setBookingData({ ...bookingData, stylist: { name: 'Any Stylist', role: 'First Available' } });
                    handleNext();
                  }}
                  className="p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left flex items-center gap-4"
                >
                   <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center">
                      <Scissors size={20} />
                   </div>
                   <div>
                      <p className="font-medium">Any Professional</p>
                      <p className="text-xs text-zinc-500">Earliest availability</p>
                   </div>
                </button>
                {STYLISTS.map((stylist) => (
                  <button
                    key={stylist.id}
                    onClick={() => {
                      setBookingData({ ...bookingData, stylist });
                      handleNext();
                    }}
                    className="p-4 border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all text-left flex items-center gap-4"
                  >
                    <img src={stylist.image} alt={stylist.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                    <div>
                      <p className="font-medium">{stylist.name}</p>
                      <p className="text-xs text-zinc-500">{stylist.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Select Date & Time</h4>
              <div className="p-4 border border-zinc-200 bg-zinc-50 text-center text-zinc-500 text-sm mb-4">
                Availability for {bookingData.stylist?.name}
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'].map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setBookingData({ ...bookingData, date: 'Tomorrow', time });
                      handleNext();
                    }}
                    className="py-3 px-2 text-sm border border-zinc-200 hover:bg-black hover:text-white hover:border-black transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-400 text-center mt-4">Simulated Availability View</p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
               <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-2xl font-serif mb-2">Confirm Details</h4>
                  <p className="text-zinc-500">Please review your appointment details below.</p>
               </div>

               <div className="bg-zinc-50 p-6 space-y-4 border border-zinc-100">
                  <div className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="text-zinc-500">Service</span>
                    <span className="font-medium">{bookingData.service?.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="text-zinc-500">Stylist</span>
                    <span className="font-medium">{bookingData.stylist?.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="text-zinc-500">Date & Time</span>
                    <span className="font-medium">{bookingData.date} at {bookingData.time}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-zinc-500">Total Price</span>
                    {/* Changed currency to Rand (R) */}
                    <span className="font-medium text-lg">R{bookingData.service?.price}</span>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-between items-center">
          {step > 1 && step < 4 ? (
            <button onClick={handleBack} className="text-sm text-zinc-500 hover:text-black underline">
              Back
            </button>
          ) : (
             <div></div>
          )}

          {step === 4 ? (
            // NOTE: Using a custom modal is preferred over alert() in production.
            <Button onClick={() => { alert("Booking Confirmed! (Demo)"); resetBooking(); }} className="w-full sm:w-auto">
              Confirm Appointment
            </Button>
          ) : (
            <div className="text-xs text-zinc-400">Step {step} of 4</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Stylists', href: '#team' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-serif tracking-widest font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>
          L U M I È R E
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm uppercase tracking-wide font-medium hover:opacity-70 transition-opacity ${isScrolled ? 'text-zinc-800' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <Button 
            onClick={onBookClick} 
            variant={isScrolled ? 'primary' : 'secondary'}
            className={isScrolled ? '' : 'bg-white text-black border-none hover:bg-zinc-100'}
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-lg py-8 px-6 flex flex-col space-y-4 animate-in slide-in-from-top-5">
           {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-black text-lg font-medium"
            >
              {link.name}
            </a>
          ))}
          <Button onClick={() => { setMobileMenuOpen(false); onBookClick(); }} className="w-full">
            Book Appointment
          </Button>
        </div>
      )}
    </nav>
  );
};

/* --- MAIN APP COMPONENT ---
*/

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="font-sans antialiased text-zinc-900 selection:bg-zinc-200 selection:text-black">
      
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero Section */}
<section className="relative h-screen min-h-[600px] flex items-center justify-center bg-zinc-900 overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img 
      src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" 
      alt="Salon Interior" 
      className="w-full h-full object-cover opacity-50"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
  </div>
  
  <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white animate-in fade-in slide-in-from-bottom-10 duration-1000">
    <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-medium">Beauty Redefined</p>
    <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
      Experience the Art <br/> of Hair
    </h1>
    <p className="text-lg md:text-xl text-zinc-200 mb-10 font-light max-w-2xl mx-auto">
      A sanctuary of style in the heart of the city. We blend modern techniques with timeless elegance to reveal your best self.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button onClick={() => setIsBookingOpen(true)} className="min-w-[180px]">
        Book Appointment
      </Button>
      {/* View Services CTA removed from here */}
    </div>
  </div>
</section>
      {/* USP Section (Section 1.1.1) */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scissors className="text-zinc-900" size={28} />
              </div>
              <h3 className="text-xl font-serif">Master Stylists</h3>
              <p className="text-zinc-500 leading-relaxed">
                Our team trains internationally to bring you the latest techniques in cutting and coloring.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-zinc-900" size={28} />
              </div>
              <h3 className="text-xl font-serif">Luxury Experience</h3>
              <p className="text-zinc-500 leading-relaxed">
                From our concierge service to our premium product lines, every detail is curated for you.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-zinc-900" size={28} />
              </div>
              <h3 className="text-xl font-serif">Personalized Care</h3>
              <p className="text-zinc-500 leading-relaxed">
                We take the time to listen. Your consultation is the most important part of your visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Section 1.2.2) */}
      <section id="services" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader 
            title="Our Menu" 
            subtitle="Curated Treatments" 
          />
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white p-8 hover:shadow-lg transition-shadow duration-300 border border-zinc-100 flex justify-between gap-4 group cursor-pointer" onClick={() => setIsBookingOpen(true)}>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-lg font-medium font-serif group-hover:text-zinc-600 transition-colors">{service.name}</h4>
                    {/* Changed currency to Rand (R) */}
                    <span className="text-lg font-semibold">R{service.price}</span>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">{service.description}</p>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider">{service.duration} Mins</p>
                </div>
                <div className="self-center">
                   <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-colors">
                      <ArrowRight size={14} className="text-zinc-300 group-hover:text-white" />
                   </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => setIsBookingOpen(true)} variant="primary">View Full Menu</Button>
          </div>
        </div>
      </section>

      {/* Team Section (Section 1.2.3) */}
      <section id="team" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
           <SectionHeader title="Meet The Experts" subtitle="Our Team" />
           
           <div className="grid md:grid-cols-3 gap-12">
              {STYLISTS.map((stylist) => (
                <div key={stylist.id} className="group text-center">
                  <div className="relative overflow-hidden mb-6 mx-auto w-full aspect-[3/4] max-w-sm">
                    <img 
                      src={stylist.image} 
                      alt={stylist.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-xl font-serif mb-1">{stylist.name}</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">{stylist.role}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">{stylist.bio}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

{/* Testimonials Section */}
<section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-16">
      <h3 className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Kind Words</h3>
      <h2 className="text-3xl md:text-4xl font-serif text-white">Client Experiences</h2>
    </div>

    {/* Mobile: Scroll Carousel (flex) | Desktop: Static Grid (md:grid) */}
    <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
      {TESTIMONIALS.map((review) => (
        <div 
          key={review.id} 
          className="min-w-[85%] sm:min-w-[60%] md:min-w-0 mr-6 md:mr-0 snap-center bg-zinc-800/40 p-8 border border-zinc-700/50 flex flex-col justify-between transition-all duration-300 hover:bg-zinc-800/60"
        >
          <div>
            <div className="flex mb-6">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={14} className="text-white fill-current mr-1" />
              ))}
            </div>
            <p className="text-lg font-serif italic mb-8 leading-relaxed text-zinc-200">
              "{review.text}"
            </p>
          </div>
          <div className="flex justify-between items-end border-t border-zinc-700/50 pt-6">
            <div>
              <p className="text-sm font-medium tracking-wide uppercase">{review.name}</p>
              <p className="text-xs text-zinc-500 mt-1">Verified Client</p>
            </div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{review.date}</span>
          </div>
        </div>
      ))}
    </div>
    
    {/* Visual cue for mobile users */}
    <div className="flex justify-center gap-2 mt-4 md:hidden">
      <div className="w-8 h-0.5 bg-white/30"></div>
      <div className="w-8 h-0.5 bg-white/10"></div>
      <div className="w-8 h-0.5 bg-white/10"></div>
    </div>
  </div>
</section>

{/* Gallery Teaser (Section 1.2.3) */}
      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4 overflow-hidden">
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img 
            // UPDATED GALLERY IMAGE 1 (Main Styling Area)
            src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png" 
            className="w-full h-full object-cover" 
            alt="Main Styling Area" 
          />
        </div>
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img 
            // UPDATED GALLERY IMAGE 2 (Reception/Waiting Area)
            src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png" 
            className="w-full h-full object-cover" 
            alt="Reception/Waiting Area" 
          />
        </div>
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img 
            // UPDATED GALLERY IMAGE 3 (Salon Detail/Ambiance)
            src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png" 
            className="w-full h-full object-cover" 
            alt="Salon Detail/Ambiance" 
          />
        </div>
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img 
            // UPDATED GALLERY IMAGE 4 (Product Display)
            src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png" 
            className="w-full h-full object-cover" 
            alt="Product Display" 
          />
        </div>
      </section>

      {/* Contact Section (Section 3.2.4) */}
      <section id="contact" className="py-24 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
           <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeader title="Visit Us" subtitle="Get In Touch" centered={false} />
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 text-zinc-400" />
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      {/* Updated address to Cape Town */}
                      <p className="text-zinc-500">Shop 10, Luxe Square, Foreshore<br/>Cape Town, Western Cape 8001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 text-zinc-400" />
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      {/* Updated phone number to South African format (Cape Town area code) */}
                      <p className="text-zinc-500">(021) 555 0123</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 text-zinc-400" />
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-zinc-500">hello@lumieresalon.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="mt-1 text-zinc-400" />
                    <div>
                      <h4 className="font-medium mb-1">Hours</h4>
                      <p className="text-zinc-500">Tue - Fri: 10am - 8pm<br/>Sat: 9am - 6pm<br/>Sun - Mon: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 shadow-sm border border-zinc-100">
                <h3 className="text-2xl font-serif mb-6">Send a Message</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full p-3 bg-zinc-50 border-none focus:ring-1 focus:ring-black outline-none" />
                    <input type="text" placeholder="Last Name" className="w-full p-3 bg-zinc-50 border-none focus:ring-1 focus:ring-black outline-none" />
                  </div>
                  <input type="email" placeholder="Email Address" className="w-full p-3 bg-zinc-50 border-none focus:ring-1 focus:ring-black outline-none" />
                  <textarea rows="4" placeholder="Your Message" className="w-full p-3 bg-zinc-50 border-none focus:ring-1 focus:ring-black outline-none"></textarea>
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-16 px-6">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-serif font-bold tracking-widest mb-8">L U M I È R E</h2>
          <div className="flex space-x-8 mb-12">
            <a href="#" className="hover:text-zinc-400 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-zinc-400 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-zinc-400 transition-colors" aria-label="X (formerly Twitter)">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-sm text-zinc-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
          </div>
          <p className="mt-12 text-zinc-600 text-xs">© 2024 Lumière Salon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
