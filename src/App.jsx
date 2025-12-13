import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ArrowUpRight } from 'lucide-react';

const AtelierNoir = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "Precision Cut & Style",
      subtitle: "Expert Hair Design",
      description: "Transform your look with our signature cutting technique. Our master stylists create styles that complement your face shape, lifestyle, and personal style. Walk out feeling confident and looking your absolute best.",
      duration: "90 min",
      price: "From R850"
    },
    {
      id: 2,
      title: "Premium Color Services",
      subtitle: "Beautiful, Long-Lasting Color",
      description: "Whether you want subtle highlights, full color transformation, or to cover greys, our color experts use top-quality products to achieve stunning, vibrant results that last.",
      duration: "120–180 min",
      price: "From R1,450"
    },
    {
      id: 3,
      title: "Treatment & Care",
      subtitle: "Restore Your Hair's Health",
      description: "Repair damage, add moisture, and bring back shine with our professional treatment services. Perfect for damaged, dry, or chemically treated hair. See visible results after just one session.",
      duration: "60 min",
      price: "From R650"
    },
    {
      id: 4,
      title: "Complete Makeover Package",
      subtitle: "Full Salon Experience",
      description: "Our most popular package! Includes consultation, cut, color, treatment, and professional styling. Perfect for special occasions or when you're ready for a complete transformation.",
      duration: "4–6 hours",
      price: "From R3,800"
    }
  ];

  const philosophy = [
    "We use only premium, professional products",
    "Every client receives personalized attention",
    "We guarantee you'll love your results",
    "Your satisfaction is our top priority"
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 font-light overflow-hidden">
      {/* Custom Cursor */}
      <div 
        className="fixed w-2 h-2 bg-zinc-100 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: `translate(-50%, -50%) scale(${activeService ? 2 : 1})`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <div className="text-2xl tracking-tight font-extralight">
            ATELIER <span className="font-normal">NOIR</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12 text-sm tracking-wide">
            <a href="#services" className="hover:text-zinc-400 transition-colors duration-300">Services</a>
            <a href="#philosophy" className="hover:text-zinc-400 transition-colors duration-300">Philosophy</a>
            <a href="#studio" className="hover:text-zinc-400 transition-colors duration-300">Studio</a>
            <a href="#contact" className="hover:text-zinc-400 transition-colors duration-300">Contact</a>
          </div>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden hover:text-zinc-400 transition-colors duration-300"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-zinc-950 z-30 transition-opacity duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-3xl tracking-wide font-light">
          <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-zinc-400 transition-colors duration-300">Services</a>
          <a href="#philosophy" onClick={() => setMenuOpen(false)} className="hover:text-zinc-400 transition-colors duration-300">Philosophy</a>
          <a href="#studio" onClick={() => setMenuOpen(false)} className="hover:text-zinc-400 transition-colors duration-300">Studio</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-zinc-400 transition-colors duration-300">Contact</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="overflow-hidden mb-4 md:mb-6">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter font-extralight leading-none animate-[slideUp_1s_ease-out]">
              Look amazing,
            </h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter font-extralight leading-none animate-[slideUp_1s_ease-out_0.2s_both]">
              feel confident
            </h1>
          </div>
          
          <p className="text-base md:text-lg lg:text-xl tracking-wide text-zinc-400 max-w-2xl mx-auto mb-8 md:mb-12 animate-[fadeIn_1s_ease-out_0.6s_both]">
            South Africa's premier salon for exceptional hair care and styling
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeIn_1s_ease-out_0.8s_both]">
            <a 
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-zinc-100 px-8 py-4 hover:bg-zinc-100 hover:text-zinc-950 transition-all duration-300 text-sm tracking-widest"
            >
              VIEW SERVICES
              <ChevronRight size={16} />
            </a>
            <a 
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 px-8 py-4 hover:bg-zinc-200 transition-all duration-300 text-sm tracking-widest font-normal"
            >
              BOOK NOW
            </a>
          </div>
        </div>

        <div className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 text-xs tracking-widest text-zinc-600 animate-[fadeIn_1s_ease-out_1s_both]">
          SCROLL TO DISCOVER
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <p className="text-xs tracking-widest text-zinc-600 mb-4">01 — SERVICES</p>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tight">
              Our services
            </h2>
          </div>

          <div className="grid gap-1 border-t border-zinc-800">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className="border-b border-zinc-800 py-8 md:py-12 hover:bg-zinc-900/30 transition-all duration-500 cursor-pointer group"
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-6 mb-4">
                      <span className="text-sm text-zinc-600 font-mono w-8">0{idx + 1}</span>
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-2 group-hover:text-zinc-300 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-sm tracking-wide text-zinc-500 mb-4">{service.subtitle}</p>
                        <p className="text-zinc-400 leading-relaxed max-w-2xl">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 md:min-w-[200px]">
                    <span className="text-sm text-zinc-500">{service.duration}</span>
                    <span className="text-xl font-light">{service.price}</span>
                    <ArrowUpRight 
                      className="mt-2 text-zinc-600 group-hover:text-zinc-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                      size={20} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="border border-zinc-700 px-12 py-4 hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 transition-all duration-300 text-sm tracking-widest">
              BOOK YOUR APPOINTMENT
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 lg:px-12 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-widest text-zinc-600 mb-4">02 — PHILOSOPHY</p>
              <h2 className="text-5xl md:text-6xl font-extralight tracking-tight mb-8">
                Why choose us
              </h2>
              <div className="space-y-6">
                {philosophy.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <span className="text-zinc-700 group-hover:text-zinc-100 transition-colors duration-300">—</span>
                    <p className="text-xl text-zinc-400 group-hover:text-zinc-100 transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="aspect-[4/5] bg-zinc-800/50 border border-zinc-800 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-700/20 to-transparent group-hover:scale-110 transition-transform duration-700" />
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Since 2015, Atelier Noir has been Johannesburg's trusted destination for premium hair care. Our experienced team of stylists stay current with the latest trends and techniques, ensuring you always receive the best service. We're passionate about making you look and feel amazing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section id="studio" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest text-zinc-600 mb-4">03 — STUDIO</p>
          <h2 className="text-5xl md:text-7xl font-extralight tracking-tight mb-16">
            Our salon
          </h2>

          <div className="grid md:grid-cols-3 gap-1">
            <div className="aspect-square bg-zinc-800/50 border border-zinc-800 hover:bg-zinc-800 transition-colors duration-500" />
            <div className="aspect-square bg-zinc-800/50 border border-zinc-800 hover:bg-zinc-800 transition-colors duration-500" />
            <div className="aspect-square bg-zinc-800/50 border border-zinc-800 hover:bg-zinc-800 transition-colors duration-500" />
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light mb-4">Location</h3>
              <p className="text-zinc-400 leading-relaxed">
                Conveniently located in Sandton, our modern salon features comfortable styling stations, professional-grade equipment, and a relaxing atmosphere. We've created a space where you can unwind while our expert team works their magic.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light mb-4">Experience</h3>
              <p className="text-zinc-400 leading-relaxed">
                From the moment you arrive, you'll receive VIP treatment. Enjoy complimentary refreshments, free WiFi, and plenty of parking. We schedule appointments to ensure you never feel rushed. Your comfort and satisfaction are everything to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-12 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs tracking-widest text-zinc-600 mb-4">04 — CONTACT</p>
          <h2 className="text-5xl md:text-7xl font-extralight tracking-tight mb-12">
            Book your appointment
          </h2>
          
          <p className="text-xl text-zinc-400 mb-16 max-w-2xl mx-auto">
            Ready for a transformation? Book online now or call us to schedule. New clients receive 15% off their first visit. Walk-ins welcome subject to availability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="w-full sm:w-auto bg-zinc-100 text-zinc-950 px-12 py-4 hover:bg-zinc-200 transition-all duration-300 text-sm tracking-widest font-normal">
              BOOK ONLINE NOW
            </button>
            <button className="w-full sm:w-auto border border-zinc-700 px-12 py-4 hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 transition-all duration-300 text-sm tracking-widest">
              CALL US TODAY
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-zinc-600 mb-2 tracking-wide">LOCATION</p>
              <p className="text-zinc-300">Nelson Mandela Square<br />Sandton City<br />Johannesburg, 2196</p>
            </div>
            <div>
              <p className="text-zinc-600 mb-2 tracking-wide">HOURS</p>
              <p className="text-zinc-300">Monday — Saturday<br />09:00 — 18:00<br />Sunday: 10:00 — 16:00</p>
            </div>
            <div>
              <p className="text-zinc-600 mb-2 tracking-wide">CONNECT</p>
              <p className="text-zinc-300">info@ateliernoir.co.za<br />011 123 4567<br />@atelier.noir</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-600 tracking-wide">
          <p>© 2024 Atelier Noir. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-zinc-100 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-100 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-zinc-100 transition-colors duration-300">Accessibility</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AtelierNoir;
