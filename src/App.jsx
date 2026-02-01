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
  { 
    id: 1, 
    question: "Do I need to book in advance?", 
    answer: "We highly recommend booking in advance to secure your preferred time slot. You can book via WhatsApp or by calling us directly. Walk-ins are welcome based on availability." 
  },
  { 
    id: 2, 
    question: "What is your cancellation policy?", 
    answer: "We require at least 24 hours notice for cancellations or rescheduling. This allows us to offer the time slot to other clients. Late cancellations may incur a fee." 
  },
  { 
    id: 3, 
    question: "What payment methods do you accept?", 
    answer: "We accept cash, all major credit and debit cards, as well as mobile payment options like SnapScan and Zapper." 
  },
  { 
    id: 4, 
    question: "Do you offer consultations?", 
    answer: "Yes! All our services include a complimentary consultation to discuss your desired look and ensure we achieve the perfect result for you." 
  },
  { 
    id: 5, 
    question: "How long will my appointment take?", 
    answer: "Appointment duration varies by service. A simple cut takes about 60 minutes, while color treatments can take 2-3 hours. We'll confirm the exact timing when you book." 
  }
];

/* --- LOADING SCREEN COMPONENT --- */
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
          <div className="mt-10 w-20 h-[0.5px] bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
          </div>
        </div>
      )}
    </div>
  );
};

/* --- SHARED COMPONENTS --- */
const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 active:scale-[0.98] disabled:bg-zinc-400 disabled:cursor-not-allowed",
    secondary: "bg-white/10 text-white backdrop-blur-xl border border-white/20 hover:bg-white/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "bg-transparent text-white border border-white/30 hover:bg-white hover:text-black active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`px-7 py-3.5 transition-all duration-400 font-medium tracking-wide text-sm uppercase relative overflow-hidden group rounded-full ${variants[variant]} ${className}`} 
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

const SectionHeader = ({ title, subtitle, centered = true, dark = false }) => (
  <div className={`mb-20 ${centered ? 'text-center' : 'text-left'}`}>
    <p className={`uppercase tracking-[0.3em] text-[11px] font-semibold mb-4 letterspacing-wide ${dark ? 'text-zinc-400' : 'text-zinc-400'}`}>{subtitle}</p>
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const links = ['Home', 'Services', 'Stylists', 'Gallery', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-[80] transition-all duration-700 ${isScrolled || isOpen ? 'bg-white/80 backdrop-blur-2xl py-4 shadow-sm border-b border-zinc-100' : 'bg-transparent py-6 text-white'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center relative z-[90]">
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
              className={`text-[13px] uppercase tracking-wider font-medium nav-link-grow transition-colors duration-300 ${isScrolled ? 'text-zinc-700 hover:text-black' : 'text-white/90 hover:text-white'}`}
            >
              {l}
            </a>
          ))}
          <Button onClick={onBookClick} variant={isScrolled ? 'primary' : 'secondary'}>Book Now</Button>
        </div>

        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-6 h-[1.5px] transition-all duration-400 ${(isScrolled || isOpen) ? 'bg-black' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] transition-all duration-400 ${(isScrolled || isOpen) ? 'bg-black' : 'bg-white'} ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-[1.5px] transition-all duration-400 ${(isScrolled || isOpen) ? 'bg-black' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      <div className={`fixed inset-0 bg-white/95 backdrop-blur-2xl z-[95] flex flex-col items-center justify-center transition-all duration-700 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex flex-col items-center space-y-10">
          {links.map((l, i) => (
            <a 
              key={l} 
              href={`#${l.toLowerCase()}`} 
              onClick={() => setIsOpen(false)} 
              className={`text-3xl font-serif text-black hover:text-zinc-600 transition-colors duration-300 ${isOpen ? 'animate-link' : ''}`}
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    service: '',
    stylist: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep(1), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create WhatsApp message with booking details
    const message = encodeURIComponent(
      `Hi! I'd like to book an appointment at Lumière Salon.\n\n` +
      `Service: ${formData.service}\n` +
      `Stylist: ${formData.stylist}\n` +
      `Date: ${formData.date}\n` +
      `Time: ${formData.time}\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}`
    );
    
    // WhatsApp business number - DEMO WEBSITE
    // Replace with actual salon's WhatsApp number when deploying for client
    const whatsappNumber = '27619229670'; // Demo WhatsApp for portfolio showcase NUMBER
    
    // Create WhatsApp deep link
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
      
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-scaleIn">
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-zinc-100 px-10 py-8 flex justify-between items-center z-10">
          <div>
            <h2 className="text-3xl font-serif font-light tracking-tight">Book Your Experience</h2>
            <p className="text-sm text-zinc-500 mt-2">Step {step} of 3</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors">
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {step === 1 && (
            <div className="space-y-6 animate-slideUp">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-4 uppercase tracking-wider">Select Service</label>
                <div className="grid gap-4">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, service: s.name })}
                      className={`text-left p-6 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                        formData.service === s.name ? 'border-black bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-serif mb-2">{s.name}</h4>
                          <p className="text-sm text-zinc-600 mb-3">{s.description}</p>
                          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{s.duration} min • R{s.price}</p>
                        </div>
                        {formData.service === s.name && <CheckCircle size={24} className="text-black ml-4" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <Button type="button" onClick={() => setStep(2)} disabled={!formData.service} className="w-full disabled:opacity-50 disabled:cursor-not-allowed">
                Continue <ChevronRight size={18} className="inline ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-slideUp">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-4 uppercase tracking-wider">Choose Your Stylist</label>
                <div className="grid gap-4">
                  {STYLISTS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, stylist: s.name })}
                      className={`text-left p-6 border-2 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-6 ${
                        formData.stylist === s.name ? 'border-black bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <img src={s.image} className="w-20 h-20 object-cover rounded-xl grayscale" alt={s.name} />
                      <div className="flex-1">
                        <h4 className="text-lg font-serif mb-1">{s.name}</h4>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">{s.role}</p>
                        <p className="text-sm text-zinc-600">{s.bio}</p>
                      </div>
                      {formData.stylist === s.name && <CheckCircle size={24} className="text-black" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Button type="button" onClick={() => setStep(1)} variant="secondary" className="flex-1">
                  Back
                </Button>
                <Button type="button" onClick={() => setStep(3)} disabled={!formData.stylist} className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                  Continue <ChevronRight size={18} className="inline ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-slideUp">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-3 uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-3 uppercase tracking-wider">Time</label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                  >
                    <option value="">Select time</option>
                    {['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-3 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-3 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-3 uppercase tracking-wider">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                    placeholder="+27 123 456 789"
                  />
                </div>
              </div>

              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 mt-8">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-700 mb-4">Booking Summary</h4>
                <div className="space-y-2 text-sm text-zinc-600">
                  <p><span className="font-medium text-zinc-900">Service:</span> {formData.service}</p>
                  <p><span className="font-medium text-zinc-900">Stylist:</span> {formData.stylist}</p>
                  <p><span className="font-medium text-zinc-900">Date & Time:</span> {formData.date} at {formData.time}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="button" onClick={() => setStep(2)} variant="secondary" className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? 'Opening WhatsApp...' : 'Book via WhatsApp'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

/* --- FAQ COMPONENT --- */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-32 px-6 bg-zinc-50">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader title="Frequently Asked Questions" subtitle="Good to Know" />
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={faq.id} className="bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-zinc-50 transition-colors"
              >
                <span className="text-lg font-serif pr-8">{faq.question}</span>
                <ChevronRight 
                  className={`flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-90' : ''}`} 
                  size={20} 
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <p className="px-8 pb-6 text-zinc-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- TESTIMONIALS CAROUSEL --- */
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
    <section className="py-32 px-6 bg-gradient-to-b from-zinc-900 to-black text-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader title="Client Experiences" subtitle="Kind Words" dark={true} />
        <div className="relative">
          <div ref={scrollRef} onScroll={onScroll} className="flex overflow-x-auto pb-12 gap-8 hide-scrollbar snap-x-mandatory scroll-smooth md:grid md:grid-cols-3 md:snap-none">
            {TESTIMONIALS.map((r) => (
              <div key={r.id} className="min-w-[90%] md:min-w-0 bg-white/5 backdrop-blur-sm p-10 border border-white/10 flex flex-col justify-between snap-center rounded-2xl hover:bg-white/10 transition-all duration-500 hover:scale-[1.02]">
                <div>
                  <div className="flex mb-6">{[...Array(r.rating)].map((_, i) => <Star key={i} size={16} className="fill-current mr-1.5 text-white/90" />)}</div>
                  <p className="text-xl font-serif italic mb-8 leading-relaxed text-white/95">"{r.text}"</p>
                </div>
                <div className="flex justify-between items-end border-t border-white/10 pt-6 mt-4">
                  <div>
                    <p className="text-sm uppercase tracking-wider font-semibold">{r.name}</p>
                    <p className="text-[10px] text-zinc-400 uppercase mt-1.5 tracking-wider">Verified Client</p>
                  </div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-3 md:hidden mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => scrollTo(i)} className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-10 bg-white' : 'w-2 bg-white/30'}`} />
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
  const [scrollY, setScrollY] = useState(0);
  const [contactFormStatus, setContactFormStatus] = useState('idle'); // idle, sending, success, error

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactFormStatus('sending');
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      // Option 1: Send via WhatsApp (recommended for immediate response)
      const whatsappMessage = encodeURIComponent(
        `New Contact Form Submission:\n\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Message: ${data.message}`
      );
      const whatsappNumber = '27619229670'; // Demo WhatsApp for portfolio
      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
      
      setContactFormStatus('success');
      e.target.reset();
      
      setTimeout(() => setContactFormStatus('idle'), 5000);
      
      // Option 2: EmailJS Integration (uncomment if you prefer email)
      // You'll need to sign up at emailjs.com and get your credentials
      /*
      const response = await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        data,
        'YOUR_PUBLIC_KEY'
      );
      if (response.status === 200) {
        setContactFormStatus('success');
        e.target.reset();
        setTimeout(() => setContactFormStatus('idle'), 5000);
      }
      */
      
    } catch (error) {
      console.error('Error sending message:', error);
      setContactFormStatus('error');
      setTimeout(() => setContactFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="antialiased">
      <LoadingScreen />
      
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero Section with Parallax */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full" 
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img 
            src="https://res.cloudinary.com/dgstbaoic/image/upload/w_1920,f_auto,q_auto:good/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" 
            className="w-full h-full object-cover opacity-40" 
            alt="Lumière Salon Interior"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 animate-fadeInUp">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-8 text-white/80 font-medium">Beauty Redefined</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-12 leading-[1.05] font-light tracking-tight">
            Experience the Art<br/>of Hair
          </h1>
          <Button variant="outline" onClick={() => setIsBookingOpen(true)}>
            Book Appointment
          </Button>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Our Menu" subtitle="Curated Treatments" />
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <div 
                key={s.id} 
                className="bg-zinc-50 p-10 border border-zinc-100 hover:shadow-2xl hover:border-zinc-200 transition-all duration-500 flex justify-between cursor-pointer group rounded-2xl hover:-translate-y-1"
                onClick={() => setIsBookingOpen(true)}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex-1">
                  <h4 className="text-2xl font-serif mb-3 font-light">{s.name}</h4>
                  <p className="text-zinc-600 text-sm mb-6 leading-relaxed">{s.description}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">{s.duration} Min • R{s.price}</p>
                </div>
                <ArrowRight className="self-center text-zinc-300 group-hover:text-black group-hover:translate-x-2 transition-all duration-500 ml-6" size={20} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stylists Section */}
      <section id="stylists" className="py-32 px-6 bg-zinc-50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Meet The Experts" subtitle="Our Team" />
          <div className="grid md:grid-cols-3 gap-16">
            {STYLISTS.map((s, i) => (
              <div key={s.id} className="group text-center" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="relative overflow-hidden mb-8 aspect-[3/4] rounded-2xl">
                  <img 
                    src={s.image} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                    alt={s.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect width="400" height="500" fill="%23e4e4e7"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="%239ca3af"%3EImage unavailable%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-700" />
                </div>
                <h4 className="text-2xl font-serif mb-2 font-light tracking-tight">{s.name}</h4>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-4">{s.role}</p>
                <p className="text-zinc-600 text-sm leading-relaxed max-w-xs mx-auto">{s.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      
      <FAQ />

      {/* Gallery Section */}
      <section id="gallery" className="grid grid-cols-2 md:grid-cols-4">
        {[
          { img: "v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png", alt: "Luxury salon interior" },
          { img: "v1765596654/freepik__the-style-is-candid-image-photography-with-natural__8284_cbgbc6.png", alt: "Natural hair styling" },
          { img: "v1765596629/freepik__the-style-is-candid-image-photography-with-natural__8286_e0zz4v.png", alt: "Professional hair treatment" },
          { img: "v1765596644/freepik__35mm-film-photography-minimalist-black-display-cab__8285_jwej9v.png", alt: "Modern hair products display" }
        ].map((item, i) => (
          <div key={i} className="h-80 md:h-[28rem] overflow-hidden group">
            <img 
              src={`https://res.cloudinary.com/dgstbaoic/image/upload/w_800,f_auto,q_auto/${item.img}`}
              loading="lazy" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out grayscale group-hover:grayscale-0" 
              alt={item.alt}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect width="400" height="500" fill="%23e4e4e7"/%3E%3C/svg%3E';
              }}
            />
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader title="Visit Us" subtitle="Get In Touch" />
          
          <div className="grid md:grid-cols-2 gap-24">
          <div>
            <SectionHeader title="Visit Us" subtitle="Get In Touch" centered={false} />
            <div className="space-y-8 text-zinc-600">
              <div className="flex gap-6 items-start group">
                <MapPin className="text-black mt-1 group-hover:scale-110 transition-transform" size={20} />
                <div>
                  <p className="text-base mb-2">21 King Street, Kingsgate Centre<br/>Ladysmith, 3370</p>
                  <a 
                    href="https://maps.google.com/?q=21+King+Street+Ladysmith+3370" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-black underline hover:no-underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <Phone className="text-black mt-1 group-hover:scale-110 transition-transform" size={20} />
                <a href="tel:+27619229670" className="text-base hover:text-black transition-colors">061 922 9670</a>
              </div>
              <div className="flex gap-6 items-start group">
                <Mail className="text-black mt-1 group-hover:scale-110 transition-transform" size={20} />
                <a href="mailto:hello@lumieresalon.com" className="text-base hover:text-black transition-colors">hello@lumieresalon.com</a>
              </div>
              <div className="flex gap-6 items-start group">
                <Clock className="text-black mt-1 group-hover:scale-110 transition-transform" size={20} />
                <p className="text-base">Tue - Fri: 10am - 8pm<br/>Sat: 9am - 6pm</p>
              </div>
            </div>
          </div>
          
          <form className="bg-zinc-50 p-12 border border-zinc-100 shadow-sm space-y-6 rounded-3xl" onSubmit={handleContactSubmit}>
            <h3 className="text-3xl font-serif mb-10 font-light tracking-tight">Send a Message</h3>
            <input 
              required 
              name="name"
              placeholder="Name" 
              className="w-full p-5 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all" 
            />
            <input 
              required 
              type="email"
              name="email" 
              placeholder="Email" 
              className="w-full p-5 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all" 
            />
            <textarea 
              required 
              name="message"
              placeholder="Message" 
              rows="5" 
              className="w-full p-5 bg-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all resize-none" 
            />
            
            {contactFormStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            
            {contactFormStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">
                ✗ Something went wrong. Please try again or contact us directly.
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={contactFormStatus === 'sending'}
            >
              {contactFormStatus === 'sending' ? 'Sending...' : 'Submit Inquiry'}
            </Button>
          </form>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-zinc-900 to-black text-white py-24 px-6 text-center">
        <h2 className="text-3xl font-serif font-light tracking-[0.3em] mb-12">LUMIÈRE</h2>
        <div className="flex justify-center space-x-12 mb-16 opacity-50">
          <a 
            href="https://instagram.com/arcodic" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit our Instagram"
            className="hover:opacity-100 cursor-pointer transition-all duration-300 hover:scale-110"
          >
            <Instagram size={22} />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit our Facebook"
            className="hover:opacity-100 cursor-pointer transition-all duration-300 hover:scale-110"
          >
            <Facebook size={22} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit our Twitter"
            className="hover:opacity-100 cursor-pointer transition-all duration-300 hover:scale-110"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
        </div>
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">© 2026 Lumière Salon. Demo by Arcodic.</p>
      </footer>
    </div>
  );
}
