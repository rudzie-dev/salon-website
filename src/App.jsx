import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  X, MapPin, Phone, Instagram, Facebook, 
  ChevronRight, ArrowRight, Clock, Calendar, Check
} from 'lucide-react';

/* --- DATA ENHANCEMENTS --- */
const CATEGORIES = ['All', 'Styling', 'Color', 'Treatments'];

const SERVICES = [
  { id: 1, cat: 'Styling', name: 'Signature Cut & Style', price: 95, duration: 60, description: 'A precision cut tailored to your face shape.' },
  { id: 2, cat: 'Color', name: 'Balayage & Gloss', price: 210, duration: 180, description: 'Hand-painted highlights for a natural look.' },
  { id: 3, cat: 'Treatments', name: 'Keratin Smoothing', price: 250, duration: 150, description: 'Eliminate frizz and restore shine.' },
  { id: 4, cat: 'Styling', name: 'Luxury Blowout', price: 55, duration: 45, description: 'Wash, condition, and a long-lasting style.' },
  { id: 5, cat: 'Color', name: 'Full Spectrum Color', price: 130, duration: 120, description: 'Rich, single-process color.' },
  { id: 6, cat: 'Styling', name: 'Gentlemen\'s Grooming', price: 65, duration: 45, description: 'Precision clipper or scissor cut.' }
];

const STYLISTS = [
  { id: 1, name: 'Zara Nkosi', role: 'Master Stylist', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png' },
  { id: 2, name: 'Liam Chen', role: 'Color Director', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596671/image_1_1765596191540_b2rh1t.png' },
  { id: 3, name: 'Amara Dube', role: 'Texture Specialist', image: 'https://res.cloudinary.com/dgstbaoic/image/upload/v1765596673/freepik__the-style-is-candid-image-photography-with-natural__8282_exxbxp.png' }
];

/* --- ANIMATION VARIANTS --- */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

/* --- COMPONENTS --- */

const SectionHeader = ({ title, subtitle, centered = true, dark = false }) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
    className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}
  >
    <p className="uppercase tracking-[0.4em] text-[10px] font-bold mb-4 text-zinc-400">{subtitle}</p>
    <h2 className={`text-4xl md:text-6xl font-serif font-light tracking-tight ${dark ? 'text-white' : 'text-zinc-900'}`}>{title}</h2>
    <div className={`w-12 h-[1px] mt-8 ${dark ? 'bg-white/20' : 'bg-zinc-200'} ${centered ? 'mx-auto' : ''}`} />
  </motion.div>
);

const Navbar = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuLinks = ['Home', 'Services', 'Stylists', 'Gallery', 'Contact'];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-white/70 backdrop-blur-2xl py-4 border-b border-black/5' : 'bg-transparent py-8 text-white'}`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <a href="#" className={`text-xl font-serif tracking-[0.4em] transition-colors duration-500 ${isScrolled || isOpen ? 'text-black' : 'text-white'}`}>
            LUMIÈRE
          </a>
          
          <div className="hidden md:flex items-center space-x-12">
            {menuLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className={`text-[11px] uppercase tracking-[0.2em] font-bold hover:opacity-50 transition-opacity ${isScrolled ? 'text-zinc-900' : 'text-white'}`}>
                {link}
              </a>
            ))}
            <button onClick={onBookClick} className={`px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-bold transition-all ${isScrolled ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-100'}`}>
              Book
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden relative z-[110] p-2">
            <div className={`w-6 h-[1px] mb-1.5 transition-all ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-[1px] transition-all ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-[1px] mt-1.5 transition-all ${isScrolled || isOpen ? 'bg-black' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[105] bg-white/95 backdrop-blur-2xl flex flex-col justify-center px-12"
          >
            <div className="space-y-8">
              {menuLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: i * 0.1 } }}
                  className="block text-5xl font-serif text-black hover:text-zinc-400 transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState('All');
  
  if (!isOpen) return null;

  const filteredServices = selectedCat === 'All' ? SERVICES : SERVICES.filter(s => s.cat === selectedCat);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <motion.div 
        layoutId="modal"
        className="relative bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="p-8 border-b flex justify-between items-center">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-400">Step 0{step} / 03</span>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><X size={20}/></button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-2xl font-serif mb-6">Select a Service</h3>
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
                {CATEGORIES.map(c => (
                  <button 
                    key={c} 
                    onClick={() => setSelectedCat(c)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all ${selectedCat === c ? 'bg-black text-white' : 'border-zinc-200 text-zinc-500'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {filteredServices.map(s => (
                  <button key={s.id} onClick={() => setStep(2)} className="w-full group p-5 border border-zinc-100 rounded-2xl hover:border-black transition-all flex justify-between items-center text-left">
                    <div>
                      <p className="text-sm font-serif">{s.name}</p>
                      <p className="text-[10px] text-zinc-400 uppercase mt-1">R{s.price} • {s.duration} min</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <ChevronRight size={14} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-2xl font-serif mb-6">Choose Stylist</h3>
              <div className="grid grid-cols-1 gap-3">
                {STYLISTS.map(s => (
                  <button key={s.id} onClick={() => setStep(3)} className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-zinc-50 transition-all">
                    <img src={s.image} className="w-14 h-14 rounded-full object-cover grayscale" alt="" />
                    <div className="text-left">
                      <p className="font-serif">{s.name}</p>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-400">{s.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center py-10">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} />
              </div>
              <h3 className="text-2xl font-serif mb-2">Ready to Book?</h3>
              <p className="text-zinc-500 text-sm mb-8">We'll finalize the date and time over WhatsApp.</p>
              <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                Open WhatsApp
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="bg-white selection:bg-black selection:text-white">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y }} className="absolute inset-0 opacity-50 scale-110">
          <img 
            src="https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png" 
            className="w-full h-full object-cover" 
            alt="Luxury Salon" 
          />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="text-[10px] uppercase tracking-[0.5em] mb-8 font-bold text-white/60"
          >
            Est. 2024 — Ladysmith
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.7 }}
            className="text-6xl md:text-9xl font-serif mb-12 font-light tracking-tighter leading-none"
          >
            Refining Your <br/> <span className="italic">Signature.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="group relative px-10 py-5 border border-white/30 rounded-full overflow-hidden transition-all hover:border-white"
            >
              <span className="relative z-10 text-[11px] uppercase tracking-[0.3em] font-bold">Book Experience</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <style jsx>{`.group:hover span { color: black; }`}</style>
            </button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 px-8">
        <div className="container mx-auto max-w-7xl">
          <SectionHeader title="Curated Menu" subtitle="Services" />
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-4"
          >
            {SERVICES.map(s => (
              <motion.div 
                key={s.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                onClick={() => setIsBookingOpen(true)}
                className="group p-10 bg-zinc-50 rounded-[2rem] cursor-pointer hover:bg-black hover:text-white transition-all duration-500 border border-transparent hover:border-black/10"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 bg-white group-hover:bg-zinc-800 rounded-2xl transition-colors">
                    <Clock size={18} className="text-black group-hover:text-white" />
                  </div>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </div>
                <h4 className="text-2xl font-serif mb-4">{s.name}</h4>
                <p className="text-sm opacity-60 mb-8 line-clamp-2">{s.description}</p>
                <div className="flex items-center justify-between border-t border-black/5 group-hover:border-white/10 pt-6">
                  <span className="text-[10px] uppercase tracking-widest font-bold">From R{s.price}</span>
                  <span className="text-[10px] opacity-40 uppercase tracking-widest">{s.duration} MIN</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-20 bg-zinc-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {[1,2,3,4].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-200"
            >
              <img 
                src={`https://res.cloudinary.com/dgstbaoic/image/upload/w_800,f_auto,q_auto/v176559666${i}/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png`} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-110" 
                alt="Salon Interior" 
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-32 pb-12 px-8 border-t border-zinc-100">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-20 mb-32">
            <div>
              <h2 className="text-7xl font-serif mb-12 tracking-tighter">Ready to<br/><span className="italic">transform?</span></h2>
              <button onClick={() => setIsBookingOpen(true)} className="flex items-center gap-4 group">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight />
                </div>
                <span className="text-xs uppercase tracking-[0.3em] font-bold">Start your journey</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Social</p>
                <div className="space-y-2 flex flex-col">
                  <a href="#" className="font-serif hover:text-zinc-400 transition-colors">Instagram</a>
                  <a href="#" className="font-serif hover:text-zinc-400 transition-colors">Facebook</a>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Location</p>
                <p className="font-serif leading-relaxed">21 King Street,<br/>Ladysmith, 3370</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-zinc-100 gap-8">
            <p className="text-[20px] font-serif tracking-[0.4em]">LUMIÈRE</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">© 2026 Lumière Salon. Crafted for Excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
