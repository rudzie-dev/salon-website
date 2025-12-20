import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, Scissors, Star, MapPin, Phone, Mail, 
  Instagram, Facebook, ChevronRight, CheckCircle, ArrowRight, Clock
} from 'lucide-react';

/* --- ASSET CONFIGURATION --- */
const CRITICAL_ASSETS = [
  "https://res.cloudinary.com/dgstbaoic/image/upload/v1765596674/freepik__35mm-film-photography-cinematic-highcontrast-black__58855_ntswml.png"
];

const PREFETCH_ASSETS = [
  "https://res.cloudinary.com/dgstbaoic/image/upload/v1765596663/freepik__35mm-film-photography-luxury-modern-hair-salon-int__8283_vhnahv.png",
  "https://res.cloudinary.com/dgstbaoic/image/upload/v1765596669/image_1_1765596131656_gdrxvd.png"
];

const SERVICES = [
  { id: 1, name: 'Signature Cut & Style', price: 95, duration: 60, description: 'A precision cut tailored to your face shape, finished with a luxury blowout.' },
  { id: 2, name: 'Balayage & Gloss', price: 210, duration: 180, description: 'Hand-painted highlights for a natural look, including a gloss treatment.' },
  { id: 3, name: 'Keratin Smoothing', price: 250, duration: 150, description: 'Eliminate frizz and restore shine with premium keratin infusion.' },
  { id: 4, name: 'Luxury Blowout', price: 55, duration: 45, description: 'Wash, condition, and a long-lasting blowout style.' }
];

/* --- PROGRESSIVE LOADING SCREEN --- */
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    let loadedCount = 0;
    const total = CRITICAL_ASSETS.length + 1; // +1 for DOM ready
    
    const update = () => {
      loadedCount++;
      setProgress(Math.floor((loadedCount / total) * 100));
    };

    if (document.readyState === 'complete') update();
    else window.addEventListener('load', update, { once: true });

    CRITICAL_ASSETS.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = update;
      img.onerror = update;
    });

    // Safety fallback
    const timer = setTimeout(() => setProgress(100), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 1300);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 flex">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`flex-1 bg-zinc-900 border-r border-white/5 h-full ${isExiting ? 'exit-strip' : ''}`}
            style={{ animationDelay: prefersReducedMotion ? '0s' : `${i * 0.1}s` }} />
        ))}
      </div>

      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${isExiting ? 'opacity-0 -translate-y-12' : 'opacity-100'}`}>
        <svg width="280" height="80" viewBox="0 0 280 80" className="mb-10">
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
            className="font-serif text-4xl fill-transparent stroke-white/20 stroke-[0.5px] animate-draw"
            style={{ letterSpacing: '0.4em' }}>LUMIÈRE</text>
        </svg>

        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-white transition-all duration-700" style={{ width: `${progress}%` }} />
          <div className="animate-shimmer-progress h-full top-0" />
        </div>
        <p className="mt-6 text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-bold">{progress}% Loaded</p>
      </div>
    </div>
  );
};

/* --- SHARED BUTTON --- */
const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const styles = {
    primary: "bg-black text-white border-black hover:bg-zinc-800",
    outline: "bg-transparent text-white border-white hover:bg-white hover:text-black",
    secondary: "bg-white text-black border-zinc-200 hover:border-black"
  };
  return (
    <button onClick={onClick} className={`px-10 py-4 border transition-all duration-500 font-bold tracking-[0.2em] text-[10px] uppercase relative overflow-hidden group ${styles[variant]} ${className}`}>
      <span className="relative z-10">{children}</span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 group-hover:animate-shimmer" />
    </button>
  );
};

/* --- MAIN APP --- */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Predictive Prefetching
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        PREFETCH_ASSETS.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          document.head.appendChild(link);
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="antialiased">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <main className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 py-8 px-8 flex justify-between items-center text-white mix-blend-difference">
          <span className="text-xl font-serif tracking-[0.4em] font-bold">LUMIÈRE</span>
          <Button variant="outline" onClick={() => setIsBookingOpen(true)} className="scale-90">Book Now</Button>
        </nav>

        {/* Hero */}
        <section id="home" className="relative h-screen flex items-center justify-center bg-zinc-950">
          <img src={CRITICAL_ASSETS[0]} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Hero" />
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-6xl md:text-9xl font-serif mb-12 leading-tight">Elevated <br/> Grooming</h1>
            <p className="text-[11px] uppercase tracking-[0.5em] opacity-60 mb-12">The Zenith of Cape Town Style</p>
            <Button variant="outline" onClick={() => setIsBookingOpen(true)}>Secure Appointment</Button>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-40 px-8 bg-zinc-50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-24">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 mb-4">The Offerings</p>
              <h2 className="text-5xl font-serif">Curated Menu</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {SERVICES.map(s => (
                <div key={s.id} className="bg-white p-12 border border-zinc-100 hover:shadow-xl transition-all duration-500 group flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-serif mb-4">{s.name}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">{s.description}</p>
                    <p className="text-[10px] font-bold text-zinc-300 tracking-widest uppercase">{s.duration} MIN — R{s.price}</p>
                  </div>
                  <ArrowRight size={20} className="text-zinc-200 group-hover:text-black group-hover:translate-x-2 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className="bg-zinc-950 text-white py-24 text-center">
          <p className="text-zinc-600 text-[9px] uppercase tracking-[0.5em]">© 2025 Lumière Salon. Cape Town.</p>
        </footer>
      </main>

      {/* Booking Placeholder */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-10 text-center">
          <button onClick={() => setIsBookingOpen(false)} className="absolute top-10 right-10"><X /></button>
          <h2 className="text-4xl font-serif mb-6">Reservation</h2>
          <p className="text-zinc-400 mb-10">Our booking system is initializing. Please contact (021) 555 0123.</p>
          <Button onClick={() => setIsBookingOpen(false)}>Close</Button>
        </div>
      )}
    </div>
  );
}
