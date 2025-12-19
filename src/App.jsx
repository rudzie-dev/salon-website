import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Star, MapPin, Phone, Mail, Instagram, Facebook, 
  ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

/* --- DATA & STYLES --- */
const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Artists', href: '#team' },
  { name: 'Journal', href: '#journal' },
  { name: 'Contact', href: '#contact' }
];

// Reusing your previous service/stylist data...

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const scrollRef = useRef(null);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveReview(index);
    }
  };

  return (
    <div className="antialiased bg-white text-zinc-900">
      {/* --- DESKTOP & MOBILE NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[60] p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white">
        <a href="#" className="text-xl md:text-2xl font-serif tracking-[0.4em] font-bold">LUMIÈRE</a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12 text-[10px] font-bold uppercase tracking-[0.3em]">
          {NAV_LINKS.map(link => (
            <a key={link.name} href={link.href} className="hover:opacity-50 transition-opacity duration-300">
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => setIsBookingOpen(true)} 
            className="border border-white px-8 py-2 hover:bg-white hover:text-black transition-all duration-500"
          >
            Book
          </button>
        </div>

        {/* Custom Burger Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden flex flex-col justify-center items-end w-8 h-8 space-y-1.5 focus:outline-none z-[70]"
        >
          <span className={`h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? 'w-8 rotate-45 translate-y-[3.5px]' : 'w-8'}`} />
          <span className={`h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'w-5'}`} />
          <span className={`h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-[3.5px]' : 'w-8'}`} />
        </button>
      </nav>

      {/* --- CUSTOM FULL-SCREEN MOBILE MENU --- */}
      <div className={`fixed inset-0 z-[65] bg-zinc-950 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col justify-center px-10 py-20">
          <div className="space-y-8">
            {NAV_LINKS.map((link, i) => (
              <div key={link.name} className="overflow-hidden">
                <a 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ transitionDelay: `${i * 100}ms` }}
                  className={`block text-5xl font-serif text-white tracking-tighter transition-all duration-700 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div>

          <div className={`mt-20 space-y-10 transition-all duration-1000 delay-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              onClick={() => { setIsMenuOpen(false); setIsBookingOpen(true); }}
              className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-4 group"
            >
              Reserve a session <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="flex gap-8 text-zinc-600">
              <Instagram size={20} />
              <Facebook size={20} />
            </div>
          </div>
        </div>
        
        {/* Background Decorative Text */}
        <div className="absolute bottom-10 right-10 text-[15vh] font-serif text-white/5 pointer-events-none select-none">
          LUMI
        </div>
      </div>

      {/* --- PAGE SECTIONS --- */}
      {/* Hero, Services, Team, Journal etc. follow below as per your previous code */}
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
